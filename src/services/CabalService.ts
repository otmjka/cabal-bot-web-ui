import { EventEmitter } from 'events';
import { createGRPCCabalClient } from './cabal';
import { UserResponse } from './cabal/CabalRpc/cabal_pb';
import { ConnectError } from '@connectrpc/connect';

export enum CabalServiceMessages {
  userActivityConnected = 'userActivityConnected',
  userActivityDisconnected = 'userActivityDisconnected',

  userActivityPong = 'userActivityPong',
}

enum CabalConfig {
  pingUserInterval = 8000,
}

class CabalService extends EventEmitter {
  client: ReturnType<typeof createGRPCCabalClient>;
  userActivityStream: AsyncIterable<UserResponse> | undefined;
  reconnect: boolean = false;

  private pingUserTimeout: number | undefined;
  private isPinging = false;

  constructor({ apiKey, apiUrl }: { apiKey: string; apiUrl: string }) {
    super();
    this.client = createGRPCCabalClient({
      apiKey,
      apiUrl,
    });
  }

  start() {
    console.log('start cabal service');
    this.connectUserActivityUni();
    this.listenUserActivity();
  }

  stop() {
    console.log('stop cabal service');
    this.isPinging = false;
    clearTimeout(this.pingUserTimeout);
  }

  async connectUserActivityUni() {
    try {
      this.userActivityStream = this.client.userActivityUni({});
      this.emit(CabalServiceMessages.userActivityConnected);
      setTimeout(() => this.pingUser(), 0);
    } catch (error) {
      console.log('Error while connecting to [userActivityUni]');
    }
  }

  async listenUserActivity() {
    if (!this.userActivityStream) {
      throw new Error('[userActivityUni] stream is undefined');
    }

    try {
      for await (const response of this.userActivityStream) {
        console.log('UA', response);
        this.handleUserActivityMessage(response);
      }
    } catch (err) {
      console.error('Stream error:', err);
      this.emit('error', err);
    }
  }

  handleUserActivityMessage(message: UserResponse) {
    const messageCase = message.userResponseKind.case;
    switch (messageCase) {
      case 'tradeStatus':
        break;
      case 'tradeStats':
        break;
      case 'txnCb':
        break;
      case 'ping':
        break;
      case 'pong':
        console.log('UA PONG', message.userResponseKind.value);
        this.emit(CabalServiceMessages.userActivityPong, {
          count: message.userResponseKind.value,
        });
        break;
      default:
        console.log(
          `[handleUserActivityMessage]: unknown case message: ${messageCase}`,
        );
    }
  }

  async pingUser() {
    this.isPinging = true;

    try {
      const count = BigInt(Date.now());

      await this.client.userPing({
        count,
      });

      if (this.isPinging) {
        this.pingUserTimeout = setTimeout(
          () => this.pingUser(),
          CabalConfig.pingUserInterval,
        );
      }
    } catch (error) {
      console.error('Ping error:', error);
      if (error instanceof ConnectError) {
        this.emit(CabalServiceMessages.userActivityDisconnected);
        if (this.reconnect) {
          console.error('reconnecting');
          this.connectUserActivityUni();
        }
      }
    }
  }
}

// class CabalService extends EventEmitter {
//   client: ReturnType<typeof createGRPCCabalClient>;
//   userActivityStream: AsyncIterable<UserResponse> | undefined;
//   pingInterval: number | undefined;
//   pingTradeInterval: number | undefined;
//   constructor({ apiKey, apiUrl }: { apiKey: string; apiUrl: string }) {
//     super();
//     this.client = createGRPCCabalClient({
//       apiKey,
//       apiUrl,
//     });
//   }

//   async connectToUserActivityUni() {
//     try {
//       this.userActivityStream = this.client.userActivityUni({});
//     } catch (error) {}
//   }

//   async startStreams() {
//     try {
//       // 1. Open UserActivityUni stream
//       console.log('connect to cababl');

//       const userStream: AsyncIterable<UserResponse> =
//         this.client.userActivityUni({});

//       console.log('userStream', userStream);

//       for await (const response of userStream) {
//         console.log('UserActivity:', response);
//         this.emit('userActivity', response);
//       }
//     } catch (err) {
//       console.error('Stream error:', err);
//       this.emit('error', err);
//     }
//   }

//   // Function to maintain keep-alive pings
//   startKeepAlive(): number {
//     const pingInterval = setInterval(async () => {
//       try {
//         const userPingResponse = await this.client.userPing({
//           count: BigInt(Date.now()),
//         });
//         console.log('UserPing:', userPingResponse);
//       } catch (err) {
//         console.error('Ping error:', err);
//       }
//     }, 8000); // Ping every 8 seconds to stay under 10-second requirement

//     // Return the interval ID for cleanup if needed
//     return pingInterval;
//   }

//   async startTradeStream() {
//     try {
//       // 1. Open UserActivityUni stream
//       const tradeStream = this.client.tradesUni({});
//       for await (const response of tradeStream) {
//         console.log('tradeStream:', response.tradeEventResponseKind);
//         switch (response.tradeEventResponseKind.case) {
//           case 'tokenStatus':
//             this.emit(
//               'tradeStream:tokenStatus',
//               response.tradeEventResponseKind.value,
//             );
//           default:
//             this.emit('tradeStream', response.tradeEventResponseKind);
//         }
//       }
//     } catch (err) {
//       console.error('tradeStream error:', err);
//       this.emit('error', err);
//     }
//   }

//   // Function to maintain keep-alive pings
//   startTradeKeepAlive(): number {
//     const pingInterval = setInterval(async () => {
//       try {
//         const userPingResponse = await this.client.tradePing({
//           count: BigInt(Date.now()),
//         });
//         console.log('TradePing:', userPingResponse);
//       } catch (err) {
//         console.error('Ping error:', err);
//       }
//     }, 8000); // Ping every 8 seconds to stay under 10-second requirement

//     // Return the interval ID for cleanup if needed
//     return pingInterval;
//   }
//   // 7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr
//   // 9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump
//   async subscribeToken({ mint }: { mint: string }) {
//     const result = await this.client.subscribeToken({
//       mint,
//     });

//     console.log('$$$', result);
//     return result;
//   }

//   start() {
//     this.startStreams();
//     this.startTradeStream();
//     this.pingInterval = this.startKeepAlive();
//     this.pingTradeInterval = this.startTradeKeepAlive();
//   }

//   stop() {
//     if (this.pingInterval) {
//       clearInterval(this.pingInterval);
//     }
//     if (this.pingTradeInterval) {
//       clearInterval(this.pingTradeInterval);
//     }
//     this.emit('stopped');
//   }
// }

export default CabalService;
