import { Show } from 'solid-js';
import { userSettings } from '../../stores/userSettings';
import Greeting from './Greeting';
import ApiKeyWidget from './ApiKeyWidget';

const WelcomeScreen = () => (
  <Show when={!userSettings.apiKey}>
    <div class="flex w-screen justify-center pt-20">
      <div class="max-w-3xl w-screen">
        <Greeting />
        <ApiKeyWidget />
      </div>
    </div>
  </Show>
);

export default WelcomeScreen;
