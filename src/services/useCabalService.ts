import { createEffect, createSignal, onCleanup } from 'solid-js';
import { userSettings } from '../stores/userSettings';
import CabalService, { CabalServiceMessages } from '../services/CabalService';
import { setCabalUserActivity } from '../stores/cabalUserActivity';

let cabal: CabalService | null = null;
const config = {
  // apiKey: '427P1H3rc68obQQfoUPYA8Gw16qR81v7AMoAJaRkkA7C',
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

      cabal.on(
        CabalServiceMessages.userActivityConnected,
        handleUserActivityConnected,
      );

      cabal.on(
        CabalServiceMessages.userActivityDisconnected,
        handleUserActivityDisconnected,
      );

      cabal.start();
      setCabalInstance(cabal);

      onCleanup(() => {
        cabal?.off(
          CabalServiceMessages.userActivityConnected,
          handleUserActivityConnected,
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
