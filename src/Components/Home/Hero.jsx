import HeroBg from "../../assets/HomePageImages/HeroBg.jpg";

const Hero = () => {
  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: `url(${HeroBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-1/2 h-full flex justify-center relative">
        <div className="absolute bottom-1/4 text-white">
          <h1 className="text-3xl font-bold">Travel Media</h1>
          <h4 className="text-xl">Travel with purpose, live with passion</h4>
        </div>
      </div>
    </div>
  );
};

export default Hero;
