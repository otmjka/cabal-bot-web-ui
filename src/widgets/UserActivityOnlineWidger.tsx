import { Show } from 'solid-js';
import cn from 'classnames';

import { cabalUserActivity } from '../stores/cabalUserActivity';
import { Card } from '../uiKit';

export const UserActivityOnlineWidger = () => (
  <Card className="w-36">
    <div class="flex items-center">
      <span
        class={cn('relative w-4 h-4 p-2 rounded-full', {
          'bg-green-500': cabalUserActivity.connected,
          'bg-red-500': !cabalUserActivity.connected,
        })}
      />
      <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
        <Show when={cabalUserActivity.connected} fallback={'offline'}>
          {' '}
          online
        </Show>
      </p>
    </div>
    <div class="flex items-center">
      <p class="ml-2 text-gray-700 text-md dark:text-gray-50">Connected</p>
    </div>
  </Card>
);
