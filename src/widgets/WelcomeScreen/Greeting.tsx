import img from '../../assets/cabal_logo.svg';
const Greeting = () => {
  return (
    <div>
      <div class="flex justify-center">
        <img src={img} alt="asd" class="h-[300px]" />
      </div>
      <div class="flex justify-center mb-10">
        <div class="text-center text-4xl font-bold">
          Welcome to
          <br /> Cabal Bot Web UI
        </div>
      </div>
    </div>
  );
};

export default Greeting;
