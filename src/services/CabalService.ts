import { EventEmitter } from 'events';
import { createGRPCCabalClient } from './cabal';
import {
  UserResponse,
  TradeEventResponse,
  TradeResponse,
} from './cabal/CabalRpc/cabal_pb';

import CabalUserActivityStream, {
  CabalUserActivityMessageHandler,
  CabalUserActivityStreamMessages,
} from './CabalUserActivityStream';

import CabalTradeStream, {
  CabalTradeMessageHandler,
  CabalTradeStreamMessages,
} from './CabalTradeStream';

class CabalService extends EventEmitter {
  client: ReturnType<typeof createGRPCCabalClient>;
  userActivityStream: CabalUserActivityStream;
  tradesStream: CabalTradeStream;

  constructor({ apiKey, apiUrl }: { apiKey: string; apiUrl: string }) {
    super();
    this.client = createGRPCCabalClient({
      apiKey,
      apiUrl,
    });

    this.handleUserActivityMessage = this.handleUserActivityMessage.bind(this);

    this.userActivityStream = new CabalUserActivityStream({
      client: this.client,
      onMessage: this.handleUserActivityMessage,
    });

    this.handleTradeMessage = this.handleTradeMessage.bind(this);

    this.tradesStream = new CabalTradeStream({
      client: this.client,
      onMessage: this.handleTradeMessage,
    });
  }

  start() {
    this.userActivityStream.start();
    setTimeout(() => this.tradesStream.start(), 10);
  }

  stop() {
    this.userActivityStream.stop();
    this.tradesStream.stop();
  }

  // CabalRpc -> UserPing
  pingUser() {
    return this.userActivityStream.pingUser();
  }

  // CabalRpc -> TradePing
  pingTrade() {
    return this.tradesStream.pingTrade();
  }

  // TODO: https://stackoverflow.com/questions/71200948/how-can-i-validate-a-solana-wallet-address-with-web3js
  // CabalRpc -> SubscribeToken(TokenTradeEventSub) returns (TradeResponse) {}
  async subscribeToken(mint: string): Promise<TradeResponse | undefined> {
    try {
      const result = await this.client.subscribeToken({
        mint,
      });
      console.log('subscribeToken', result);
      return result;
    } catch (error) {
      console.error('subscribeToken', error);
    }
  }
  // CabalRpc -> MarketSell
  // CabalRpc -> MarketBuy
  // CabalRpc -> GetTokenLimitOrders
  // CabalRpc -> PlaceLimitOrders
  // CabalRpc -> DeleteLimitOrders

  /* 
    private 
  */

  handleTradeMessage: CabalTradeMessageHandler = (
    messageType,
    messagePayload,
  ) => {
    switch (messageType) {
      case CabalTradeStreamMessages.tradeConnected:
        this.emit(CabalTradeStreamMessages.tradeConnected);
        break;
      case CabalTradeStreamMessages.tradeError:
        this.emit(CabalTradeStreamMessages.tradeError);
        break;
      case CabalTradeStreamMessages.streamMessage:
        this.processTradeMessage(messagePayload as TradeEventResponse);
        break;
      case CabalTradeStreamMessages.tradeDisconnected:
        this.emit(CabalTradeStreamMessages.tradeDisconnected);
        break;
      default:
        console.log(
          `[handleUserActivityMessage]: unknown message type ${messageType}`,
        );
    }
  };

  handleUserActivityMessage: CabalUserActivityMessageHandler = (
    messageType,
    messagePayload,
  ) => {
    switch (messageType) {
      case CabalUserActivityStreamMessages.userActivityConnected:
        this.emit(CabalUserActivityStreamMessages.userActivityConnected);
        break;
      case CabalUserActivityStreamMessages.userActivityError:
        this.emit(CabalUserActivityStreamMessages.userActivityError);
        break;
      case CabalUserActivityStreamMessages.streamMessage:
        this.processUserActivityMessage(messagePayload as UserResponse);
        break;
      case CabalUserActivityStreamMessages.userActivityDisconnected:
        this.emit(CabalUserActivityStreamMessages.userActivityDisconnected);
        break;
      default:
        console.log(
          `[handleUserActivityMessage]: unknown message type ${messageType}`,
        );
    }
  };

  processUserActivityMessage(message: UserResponse) {
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
        this.emit(CabalUserActivityStreamMessages.userActivityPong, {
          count: message.userResponseKind.value,
        });
        break;
      default:
        console.log(
          `[handleUserActivityMessage]: unknown case message: ${messageCase}`,
        );
    }
  }

  processTradeMessage(message: TradeEventResponse) {
    const messageCase = message.tradeEventResponseKind.case;
    switch (messageCase) {
      case 'tradeEvent':
        break;
      case 'tokenStatus':
        break;
      case 'ping':
        break;
      case 'pong':
        console.log('TRADE PONG', message.tradeEventResponseKind.value);
        this.emit(CabalTradeStreamMessages.tradePong, {
          count: message.tradeEventResponseKind.value,
        });
        break;
      default:
        console.log(
          `[processTradeMessage]: unknown case message: ${messageCase}`,
        );
    }
  }
}

export default CabalService;
