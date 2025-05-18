import { Show, type Component } from 'solid-js';
import Greeting from './Greeting';
import { UserSettings } from './UserSettings';

import { userSettings } from './stores/userSettings';
import { Card } from './uiKit/Card/Card';
import { Button } from './uiKit';
import { useCabalPing, useCabalService } from './services/useCabalService';

const App: Component = () => {
  useCabalService();
  const userPing = useCabalPing();
  return (
    <div class="h-screen">
      <Greeting />
      <Button onClick={() => userPing()}>userPing</Button>
      <Card />
      <Show when={userSettings.apiKey} fallback={<UserSettings />}>
        <div>!!!</div>
      </Show>
    </div>
  );
};

export default App;
