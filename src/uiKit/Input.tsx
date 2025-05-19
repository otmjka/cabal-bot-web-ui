import cn from 'classnames';
import { JSX } from 'solid-js/jsx-runtime';

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  cn?: string;
};

const Input = (props: InputProps) => (
  <input
    class={cn(
      'rounded-lg appearance-none border border-gray-600 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
      { [`${props.cn}`]: !!props.cn },
    )}
    {...props}
  />
);

export default Input;
