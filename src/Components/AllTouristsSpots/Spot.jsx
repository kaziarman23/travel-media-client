import { Link } from "react-router-dom";
import BackBtn from "../CustomHooks/BackBtn";
import Loader from "../CustomHooks/Loader";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Spot = () => {
  const { spotCards } = useContext(AuthContext);

  // setting loaders to load the data properly
  if (!spotCards.length) {
    return <Loader />;
  }

  return (
    <div
      className="w-full h-screen flex justify-center items-center flex-col"
      style={{
        backgroundColor: "#111111",
        backgroundImage:
          "linear-gradient(32deg,rgba(8, 8, 8, 0.74) 30pxtransparent)",
        backgroundSize: "60px 60px",
        backgroundPosition: "-5px -5px",
      }}
    >
      <div className="w-4/5 my-10 mx-auto bg-gray-900 shadow-xl shadow-black flex justify-center items-center gap-5">
        <div className="w-1/2 flex justify-center items-center">
          {/* <img src={} alt={} className="w-full h-full object-cover"/> */}
        </div>

        <div className="w-1/2 text-white text-left ml-5 my-10 space-y-5">
          <h1>Spot name : </h1>
          <h3>Country name : </h3>
          <h3>Avarage cost : </h3>
          <h3>Visitors per year : </h3>
          <h3>Travel time : </h3>
          <h3>Seasonality : </h3>
        </div>
      </div>
      <div className="w-4/5 h-20 mx-auto">
        <Link to="/AllTouristsSpots">
          <BackBtn>Go Back</BackBtn>
        </Link>
      </div>
    </div>
  );
};

export default Spot;
