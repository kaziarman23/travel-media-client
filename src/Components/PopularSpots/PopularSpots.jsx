import FlatEarth from "../CustomHooks/FlatEarth";
import CountryCards from "./CountryCards";

const PopularSpots = () => {
  return (
    <div className="w-full h-auto bg-black">
      <div className="w-full h-full xl:h-[550px]">
        <div className="w-11/12 h-full mx-auto flex justify-center items-center gap-5 flex-col">
          <div className="w-full h-full mt-5 flex justify-center items-center">
            <FlatEarth />
          </div>
          <div className="w-full space-y-5 text-white sm:mt-10 lg:mt-0">
            <h1 className="text-base font-bold text-left md:text-xl xl:text-2xl">
              Discover Your Next Adventure with Travel Media
            </h1>
            <p className="text-left text-sm xl:text-base">
              At Travel Media, we&#39;re passionate about turning your travel
              dreams into reality. Whether you&#39;re seeking a tranquil
              getaway, a thrilling adventure, or a cultural deep dive, our
              expert team is here to craft unforgettable experiences tailored to
              your desires. From pristine beaches to bustling city escapes, we
              connect you with the world&#39;s most iconic destinations and
              hidden gems. With our personalized service, your perfect vacation
              is just a click away. Let Travel Media be your gateway to the
              extraordinary because every journey should be as unique as you
              are.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-full bg-gradient-to-r from-[#141E30] to-[#243B55] mt-10 overflow-hidden">
        <CountryCards />
      </div>
    </div>
  );
};

export default PopularSpots;
