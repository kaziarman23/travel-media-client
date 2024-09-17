import { useNavigate } from "react-router-dom";

const UseBackBtn = ({ children, color }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={handleGoBack}
      className={`text-center w-48 rounded-2xl h-14 relative text-${
        color ? color : "black"
      } text-xl font-semibold group`}
      type="button"
    >
      <div className="rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:bg-red-800 group-hover:w-[184px] z-10 duration-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          height="25px"
          width="25px"
        >
          <path
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            fill="#000000"
          />
          <path
            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            fill="#000000"
          />
        </svg>
      </div>
      <p className="translate-x-2 group-hover:opacity-0">{children}</p>
    </button>
  );
};

export default UseBackBtn;