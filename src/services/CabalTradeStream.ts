import { ConnectError } from '@connectrpc/connect';

import { createGRPCCabalClient } from './cabal';
import { TradeEventResponse } from './cabal/CabalRpc/cabal_pb';
import { CabalConfig } from './cabalEnums';

export enum CabalTradeStreamMessages {
  tradeConnected = 'tradeConnected',
  tradeDisconnected = 'tradeDisconnected',

  streamMessage = 'streamMessage',

  tradePong = 'tradePong',
  tradeError = 'tradeError',
}

export type CabalTradeMessageHandler = (
  message: CabalTradeStreamMessages,
  messagePayload?: unknown,
) => void;

class CabalTradeStream {
  client: ReturnType<typeof createGRPCCabalClient>;
  tradesStream: AsyncIterable<TradeEventResponse> | undefined;
  reconnect: boolean = true;
  private onMessage: CabalTradeMessageHandler;
  private pingUserTimeout: number | undefined;
  private isPinging = false;

  constructor({
    client,
    onMessage,
  }: {
    client: ReturnType<typeof createGRPCCabalClient>;
    onMessage: CabalTradeMessageHandler;
  }) {
    this.client = client;
    this.onMessage = onMessage;
  }

  start() {
    console.log('start cabal trades stream');
    this.connectTradesUni();
    this.listenTradeEvents();
  }

  stop() {
    console.log('stop cabal trades stream');
    this.isPinging = false;
    clearTimeout(this.pingUserTimeout);
  }

  async connectTradesUni() {
    try {
      this.tradesStream = this.client.tradesUni({});
      this.onMessage(CabalTradeStreamMessages.tradeConnected);
      setTimeout(() => this.pingTrade(), 0);
    } catch (error) {
      console.log('Error while connecting to [tradesUni]');
    }
  }

  async listenTradeEvents() {
    if (!this.tradesStream) {
      throw new Error('[tradesUni] stream is undefined');
    }

    try {
      for await (const response of this.tradesStream) {
        console.log('TRADE', response);
        this.onMessage(CabalTradeStreamMessages.streamMessage, response);
      }
    } catch (error) {
      console.error('Stream error:', error);
      this.onMessage(CabalTradeStreamMessages.tradeError, error);
    }
  }

  async pingTrade() {
    this.isPinging = true;

    try {
      const count = BigInt(Date.now());

      await this.client.tradePing({
        count,
      });

      if (this.isPinging) {
        this.pingUserTimeout = setTimeout(
          () => this.pingTrade(),
          CabalConfig.pingTradeInterval,
        );
      }
    } catch (error) {
      console.error('Ping error:', error);
      if (error instanceof ConnectError) {
        this.onMessage(CabalTradeStreamMessages.tradeDisconnected);
        if (this.reconnect) {
          console.error('reconnecting');
          this.connectTradesUni();
        }
      }
    }
  }
}

export default CabalTradeStream;
