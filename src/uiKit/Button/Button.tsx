import { JSX } from 'solid-js';
import { Button as KobalteButton } from '@kobalte/core/button';
import cn from 'classnames';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button = (props: ButtonProps) => (
  <KobalteButton
    type={props.type ?? 'button'}
    class={cn(
      'py-2 px-4  bg-green-400 hover:bg-green-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ',
      'disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed',
      props.className,
    )}
    {...props}
  />
);

export default Button;
