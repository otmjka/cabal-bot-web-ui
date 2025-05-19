import { createEffect, createSignal, onCleanup } from 'solid-js';
import { userSettings } from '../stores/userSettings';
import CabalService from '../services/CabalService';
import { setCabalUserActivity } from '../stores/cabalUserActivity';
import { CabalUserActivityStreamMessages } from './CabalUserActivityStream';
import { CabalTradeStreamMessages } from './CabalTradeStream';
import {
  TokenStatus,
  TokenTradeStats,
  TradeEvent,
} from './cabal/CabalRpc/cabal_pb';
import { addTrade } from '../stores/trades';
import { addTokenStatus } from '../stores/tokenStatusStore';
import { addTokenTradeStats } from '../stores/tokenTradeStatsStore';

let cabal: CabalService | null = null;

const config = {
  apiUrl: 'https://cabalbot.tech:11111',
};

const [cabalInstance, setCabalInstance] = createSignal<CabalService | null>(
  null,
);

export function useCabalService() {
  createEffect(() => {
    if (userSettings.apiKey) {
      cabal = new CabalService({
        apiKey: userSettings.apiKey,
        apiUrl: config.apiUrl,
      });

      const handleUserActivityConnected = () => {
        setCabalUserActivity('connected', true);
      };

      const handleUserActivityDisconnected = () => {
        setCabalUserActivity('connected', false);
      };

      const handleUserActivityTradeStats = (event: TokenTradeStats) => {
        const tokenTradeStats = event.value as TokenTradeStats;
        addTokenTradeStats(tokenTradeStats);
      };

      const handleTradeEvent = (eventValue: TradeEvent) => {
        addTrade({
          tradeEvent: {
            value: eventValue.value.value,
            type: eventValue.value.case,
          },
        });
      };

      const handleTradeTokenStatus = (eventValue: TokenStatus) => {
        const tokenStatus = eventValue.value.value as TokenStatus;
        addTokenStatus(tokenStatus);
      };

      cabal.on(
        CabalUserActivityStreamMessages.userActivityConnected,
        handleUserActivityConnected,
      );

      cabal.on(
        CabalUserActivityStreamMessages.userActivityDisconnected,
        handleUserActivityDisconnected,
      );

      cabal.on(
        CabalUserActivityStreamMessages.tradeStats,
        handleUserActivityTradeStats,
      );

      cabal.on(CabalTradeStreamMessages.tradeEvent, handleTradeEvent);
      cabal.on(CabalTradeStreamMessages.tokenStatus, handleTradeTokenStatus);
      cabal.start();
      setCabalInstance(cabal);

      onCleanup(() => {
        cabal?.off(CabalTradeStreamMessages.tradeEvent, handleTradeEvent);
        cabal?.on(CabalTradeStreamMessages.tokenStatus, handleTradeTokenStatus);

        cabal?.off(
          CabalUserActivityStreamMessages.userActivityConnected,
          handleUserActivityConnected,
        );
        cabal?.off(
          CabalUserActivityStreamMessages.userActivityDisconnected,
          handleUserActivityDisconnected,
        );
        cabal?.on(
          CabalUserActivityStreamMessages.tradeStats,
          handleUserActivityTradeStats,
        );
        cabal?.stop?.();
        cabal = null;
      });
    }
  });
}

export function useCabalPing() {
  return () => cabalInstance()?.pingUser();
}

export function useSubscribeToken() {
  return (mint: string) => cabalInstance()?.subscribeToken(mint);
}
