import logo from '../../assets/cabal_logo.svg';
import SubscribeToken from '../../TokenSpotLight/SubscribeToken';
const AppBar = () => {
  return (
    <div>
      <nav class="bg-white dark:bg-black">
        <div class="px-8 mx-auto">
          <div class="flex items-center justify-between h-16">
            <div class=" flex items-center">
              <a class="flex-shrink-0" href="/">
                <img class="w-8 h-8" src={logo} alt="Workflow" />
              </a>

              <div class="hidden md:block">
                <div class="flex items-baseline ml-10 space-x-4">
                  <SubscribeToken />
                </div>
              </div>
            </div>
            <div class="block">
              <div class="flex items-center ml-4 md:ml-6 text-white">!!!</div>
            </div>
            <div class="flex -mr-2 md:hidden">
              <button class="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="w-8 h-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppBar;
