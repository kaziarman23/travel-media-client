import FlatEarth from "../CustomHooks/FlatEarth";
import CountryCards from "./CountryCards";

const AllTouristsSpots = () => {
  return (
    <div className="w-full h-auto">
      <div className="w-full h-screen">
        <div className="w-4/5 h-full mx-auto my-10 flex justify-center items-center gap-5">
          <div className="w-1/2 flex justify-center items-center">
            {/* <FlatEarth /> */}
          </div>
          <div className="w-1/2 space-y-5 text-white">
            <h1 className="text-xl  font-bold text-center">
              Discover Your Next Adventure with Travel Media
            </h1>
            <p className="text-left ">
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

      <div className="w-full h-full bg-gradient-to-r from-[#141E30] to-[#243B55] my-10 overflow-hidden">
        <CountryCards />
      </div>
    </div>
  );
};

export default AllTouristsSpots;
