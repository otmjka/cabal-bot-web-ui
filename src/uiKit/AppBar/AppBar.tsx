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
            <div class="block"></div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppBar;
