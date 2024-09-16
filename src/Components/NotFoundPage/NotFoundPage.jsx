import UseBackBtn from "../CustomHooks/UseBackBtn";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center flex-col gap-5">
      <h1 className="text-5xl text-white font-bold my-5">Not Found Page</h1>
      <UseBackBtn>Go Back</UseBackBtn>
    </div>
  );
};

export default NotFoundPage;
