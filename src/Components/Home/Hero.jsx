import Earth from "../CustomHooks/Earth";

const Hero = () => {
  return (
    <div className="w-full h-full bg-black overflow-hidden lg:h-screen">
      <div id="Hero" className="w-4/5 h-full mx-auto flex justify-center items-center gap-5 my-10 flex-col-reverse lg:flex-row lg:my-0">
        <div className="w-full space-y-5 text-white">
          <h1 className="text-xl font-bold text-left mt-10">Travel Media</h1>
          <p className=" text-sm text-left lg:text-base">
            At Travel Media, we bring the world closer to you. Whether
            you&#39;re seeking breathtaking adventures, serene escapes, or
            cultural discoveries, our expert team curates personalized travel
            experiences to suit your every desire. From iconic landmarks to
            hidden gems, we help you explore the world&#39;s most captivating
            destinations with ease and confidence. Let us turn your travel
            dreams into reality because every journey with Travel Media is an
            unforgettable adventure.
          </p>
        </div>
        <div className="w-4/5 flex justify-center items-center">
          <Earth />
        </div>
      </div>
    </div>
  );
};

export default Hero;
