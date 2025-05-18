import { createGRPCCabalClient } from './cabal';
import { UserResponse } from './cabal/CabalRpc/cabal_pb';
import { ConnectError } from '@connectrpc/connect';
import { CabalConfig } from './cabalEnums';

export enum CabalUserActivityStreamMessages {
  userActivityConnected = 'userActivityConnected',
  userActivityDisconnected = 'userActivityDisconnected',

  streamMessage = 'streamMessage',

  userActivityPong = 'userActivityPong',
  userActivityError = 'userActivityError',
}

export type CabalUserActivityMessageHandler = (
  message: CabalUserActivityStreamMessages,
  messagePayload?: unknown,
) => void;

class CabalUserActivityStream {
  client: ReturnType<typeof createGRPCCabalClient>;
  userActivityStream: AsyncIterable<UserResponse> | undefined;
  reconnect: boolean = false;
  private onMessage: CabalUserActivityMessageHandler;
  private pingUserTimeout: number | undefined;
  private isPinging = false;

  constructor({
    client,
    onMessage,
  }: {
    client: ReturnType<typeof createGRPCCabalClient>;
    onMessage: CabalUserActivityMessageHandler;
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
      this.onMessage(CabalUserActivityStreamMessages.userActivityConnected);
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
        this.onMessage(CabalUserActivityStreamMessages.streamMessage, response);
      }
    } catch (error) {
      console.error('Stream error:', error);
      this.onMessage(CabalUserActivityStreamMessages.userActivityError, error);
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
        this.onMessage(
          CabalUserActivityStreamMessages.userActivityDisconnected,
        );
        if (this.reconnect) {
          console.error('reconnecting');
          this.connectUserActivityUni();
        }
      }
    }
  }
}

export default CabalUserActivityStream;
