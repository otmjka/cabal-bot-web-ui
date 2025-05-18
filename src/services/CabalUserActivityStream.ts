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

type MessageHandler = (
  message: CabalServiceMessages,
  ...args: unknown[]
) => void;

class CabalUserActivityStream {
  client: ReturnType<typeof createGRPCCabalClient>;
  userActivityStream: AsyncIterable<UserResponse> | undefined;
  reconnect: boolean = false;
  private onMessage: MessageHandler;
  private pingUserTimeout: number | undefined;
  private isPinging = false;

  constructor({
    client,
    onMessage,
  }: {
    client: ReturnType<typeof createGRPCCabalClient>;
    onMessage: MessageHandler;
  }) {
    this.client = client;
    this.onMessage = onMessage;
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
      this.onMessage(CabalServiceMessages.userActivityConnected);
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

export default CabalUserActivityStream;
