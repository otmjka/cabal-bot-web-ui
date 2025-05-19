import { Show, type Component } from 'solid-js';
import Greeting from './Greeting';
import { UserSettings } from './UserSettings';

import { userSettings } from './stores/userSettings';
import { trades } from './stores/trades';
import { UserActivityOnlineWidger } from './widgets/UserActivityOnlineWidger';
import { Button } from './uiKit';
import { useCabalPing, useCabalService } from './services/useCabalService';
import SubscribeToken from './TokenSpotLight/SubscribeToken';
import TradesTable from './TradesTable/TradesTable';
import TradesShowDebug from './Debug/TradesShowDebug';
import TokenStatusListShowDebug from './Debug/TokenStatusListShowDebug';
import TokenTradeStatsShowDebug from './Debug/TokenTradeStatsShowDebug';

const App: Component = () => {
  useCabalService();
  const userPing = useCabalPing();
  return (
    <div class="h-screen">
      <Greeting />
      <Button onClick={() => userPing()}>userPing</Button>
      <SubscribeToken />
      <UserActivityOnlineWidger />
      <Show when={userSettings.apiKey} fallback={<UserSettings />}>
        <div>!!!</div>
      </Show>
      <Show when={trades.trades.length > 0}>
        <TradesTable />
      </Show>
      <div class="flex">
        <TradesShowDebug />
        <div>
          <TokenStatusListShowDebug />
          <TokenTradeStatsShowDebug />
        </div>
      </div>
    </div>
  );
};

export default App;
