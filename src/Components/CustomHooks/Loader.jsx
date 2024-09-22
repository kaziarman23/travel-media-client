const Loader = ({ children, color }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="w-96 h-52">
          <span className="w-full h-full loading loading-infinity"></span>
          <h1
            className={`font-bold text-2xl ${
              color ? color : "text-white"
            } text-center p-5`}
          >
            {!children ? "Loading Data" : children}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loader;
