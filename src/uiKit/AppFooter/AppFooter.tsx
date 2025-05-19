import { JSX } from 'solid-js';

const AppFooter = (props: { children: JSX.Element }) => (
  <footer class="w-full bg-gray-700 text-white p-2 fixed bottom-0 left-0">
    {props.children}
  </footer>
);

export default AppFooter;
