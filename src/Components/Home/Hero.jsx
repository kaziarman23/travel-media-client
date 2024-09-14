import Earth from "../CustomHooks/Earth";

const Hero = () => {
  return (
    <div className="w-full h-screen bg-BlackBg">
      <div className="w-4/5 h-full mx-auto my-10 flex justify-center items-center gap-5">
        <div className="w-1/2 space-y-5 text-white">
          <h1 className="text-xl  font-bold text-left">Travel Media</h1>
          <p className="text-left">Travel with purpose, live with passion</p>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <Earth />
        </div>
      </div>
    </div>
  );
};

export default Hero;

