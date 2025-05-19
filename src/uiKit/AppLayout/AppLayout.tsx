import { Component, JSX, Show } from 'solid-js';

import { userSettings } from '../../stores/userSettings';
import { OnlineStatusWidged } from '../../widgets/OnlineStatusWidged';

import { AppBar } from '../AppBar';
import { AppFooter } from '../AppFooter';

type AppLayoutProps = {
  children: JSX.Element;
};

const AppLayout: Component<AppLayoutProps> = (props) => (
  <div class="h-screen">
    <Show when={userSettings.apiKey}>
      <AppBar />
    </Show>
    {props.children}
    <Show when={userSettings.apiKey}>
      <AppFooter>
        <OnlineStatusWidged />
      </AppFooter>
    </Show>
  </div>
);

export default AppLayout;
