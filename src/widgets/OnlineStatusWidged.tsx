import { createEffect, createSignal, Show } from 'solid-js';
import cn from 'classnames';

import { cabalUserActivity } from '../stores/cabalUserActivity';
import { cabalTradeStream } from '../stores/cabalTradeSreamStore';

export const OnlineStatusWidged = () => {
  const [isPulsingUA, setIsPulsingUA] = createSignal(false);
  const [isPulsingTrade, setIsPulsingTrade] = createSignal(false);

  // Отслеживаем обновление `pong`
  let lastCountUA: bigint | undefined = cabalUserActivity.pong?.count;
  let lastCountTrade: bigint | undefined = cabalUserActivity.pong?.count;

  createEffect(() => {
    const currentCount = cabalUserActivity.pong?.count;
    if (currentCount !== undefined && currentCount !== lastCountUA) {
      lastCountUA = currentCount;
      // Триггерим мигание
      setIsPulsingUA(true);
      // Через 600мс отключаем
      setTimeout(() => setIsPulsingUA(false), 600);
    }
  });

  createEffect(() => {
    const currentCount = cabalTradeStream.pong?.count;
    if (currentCount !== undefined && currentCount !== lastCountTrade) {
      lastCountTrade = currentCount;
      // Триггерим мигание
      setIsPulsingTrade(true);
      // Через 600мс отключаем
      setTimeout(() => setIsPulsingTrade(false), 600);
    }
  });

  return (
    <div class="flex gap-4">
      <div class="flex items-center">
        <span
          class={cn('relative w-4 h-4 p-2 rounded-full', {
            'bg-green-500': cabalUserActivity.connected,
            'bg-red-500': !cabalUserActivity.connected,
            'animate-pulse-once': isPulsingUA(),
          })}
        />
        <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
          <Show when={cabalUserActivity.connected} fallback={'offline'}>
            {' '}
            user
          </Show>
        </p>
      </div>

      <div class="flex items-center">
        <span
          class={cn('relative w-4 h-4 p-2 rounded-full', {
            'bg-green-500': cabalTradeStream.connected,
            'bg-red-500': !cabalTradeStream.connected,
            'animate-pulse-once': isPulsingTrade(),
          })}
        />
        <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
          <Show when={cabalTradeStream.connected} fallback={'offline'}>
            {' '}
            trades
          </Show>
        </p>
      </div>
    </div>
  );
};
