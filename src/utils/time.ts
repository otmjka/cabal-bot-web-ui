import { format, fromUnixTime, formatDistanceToNow } from 'date-fns';

function formatShortDistance(timestamp: number) {
  const date = new Date(timestamp);
  const now = Date.now();
  const diffInSeconds: number = Math.floor((now - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`; // Секунды, например, "1s"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m+`; // Минуты, например, "2m+"
  }

  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  if (minutes > 0) {
    return `${hours}h${minutes}m+`; // Часы и минуты, например, "1h2m+"
  }
  return `${hours}h`; // Только часы, например, "1h"
}

export const formatAgo = (timestamp: number) => {
  const date = new Date(timestamp);

  const customFormat = format(date, 'HH:mm');

  // Получение строки "ago" (например, "около 2 дней назад")
  const ago = formatShortDistance(timestamp);

  return `${customFormat} ${ago}`;
};
