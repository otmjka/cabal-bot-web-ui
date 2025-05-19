import { Show, type Component } from 'solid-js';

import { useCabalService } from './services/useCabalService';
import { WelcomeScreen } from './widgets/WelcomeScreen';
import { AppLayout } from './uiKit/AppLayout';
import { TokenScreen } from './Token';
import { userSettings } from './stores/userSettings';

const App: Component = () => {
  useCabalService();
  return (
    <AppLayout>
      <WelcomeScreen />
      <Show when={!!userSettings.apiKey}>
        <TokenScreen />
      </Show>
    </AppLayout>
  );
};

export default App;
