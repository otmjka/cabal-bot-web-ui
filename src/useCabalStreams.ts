// src/hooks/useCabalStreams.ts
import { createStore } from 'solid-js/store';
import { onCleanup } from 'solid-js';
import CabalService from './services/CabalService';
import {
  UserResponse,
  TradeResponse,
  TokenStatus,
} from './services/cabal/CabalRpc/cabal_pb';

interface StreamState {
  userActivity: UserResponse[];
  tradeStream: TradeResponse[];
  tokenStatusList: TokenStatus[];
  error: Error | null;
}

export function useCabalStreams(cabal: CabalService) {
  // Создаём Store для хранения данных стримов
  const [state, setState] = createStore<StreamState>({
    userActivity: [],
    tradeStream: [],
    tokenStatusList: [],
    error: null,
  });

  // Обработчики событий
  const handleUserActivity = (data: UserResponse) => {
    setState('userActivity', (prev) => [...prev, data]);
  };

  const handleTradeStream = (data: TradeResponse) => {
    setState('tradeStream', (prev) => [...prev, data]);
  };

  const handleTokenStatusList = (data: TokenStatus) => {
    setState('tokenStatusList', (prev) => [...prev, data]);
  };

  const handleError = (err: Error) => {
    setState('error', err);
  };

  // Подписка на события
  cabal.on('userActivity', handleUserActivity);
  cabal.on('tradeStream', handleTradeStream);
  cabal.on('tradeStream:tokenStatus', handleTokenStatusList);

  cabal.on('error', handleError);

  // Очистка подписок при размонтировании
  onCleanup(() => {
    cabal.off('userActivity', handleUserActivity);
    cabal.off('tradeStream', handleTradeStream);
    cabal.off('tradeStream:tokenStatus', handleTokenStatusList);
    cabal.off('error', handleError);
  });

  return { state, setState };
}
