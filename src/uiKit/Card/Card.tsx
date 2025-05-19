import { JSX } from 'solid-js';

import cn from 'classnames';

type CardProps = {
  children: JSX.Element;
  className?: string;
};

const Card = (props: CardProps) => (
  <div
    class={cn(
      'p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800',
      props.className,
    )}
  >
    {props.children}
  </div>
);

export default Card;
