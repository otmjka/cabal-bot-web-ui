import cn from 'classnames';
import { cabalUserActivity } from '../../stores/cabalUserActivity';
import { Show } from 'solid-js';

export const Card = () => (
  <div class="p-4 bg-white shadow-lg rounded-2xl w-36 dark:bg-gray-800">
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
  </div>
);
