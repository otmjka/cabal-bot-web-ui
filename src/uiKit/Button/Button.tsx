import { JSX } from 'solid-js';

import cn from 'classnames';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button = (props: ButtonProps) => (
  <button
    type={props.type ?? 'button'}
    class={cn(
      'py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ',
      props.className,
    )}
    {...props}
  />
);

export default Button;
