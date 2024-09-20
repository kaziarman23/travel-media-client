import { Link } from "react-router-dom";
import google from "../../assets/Icons/GoogleColorfullIcons.png";
import github from "../../assets/Icons/githubColorfullIcons.png";
const Register = () => {
  return (
    <>
      <div className="w-full h-auto overflow-hidden bg-black">
        <div className="my-20 w-96 relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-gray-900 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="flex items-center">
              <span className="text-blue-500 loading loading-ring loading-lg"></span>
              <h1 className="text-2xl text-left ml-2 font-bold text-white ">
                Register Now
              </h1>
            </div>
            <div className="w-72 mx-auto text-white">
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5"></div>
              <div>
                <label
                  className="font-semibold text-sm text-gray-400 pb-1 block"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="name"
                  required
                />
              </div>
              <div>
                <label
                  className="font-semibold text-sm text-gray-400 pb-1 block"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="email"
                  id="email"
                  required
                />
              </div>
              <div>
                <label
                  className="font-semibold text-sm text-gray-400 pb-1 block"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="password"
                  id="password"
                  required
                />
              </div>

              <div className="flex flex-col justify-center items-center gap-5">
                <button className="flex items-center justify-center rounded-xl p-2 w-full bg-white text-black hover:text-white hover:bg-slate-800">
                  <img src={google} alt="goolge icon" className="w-5 h-5" />
                  <span className="ml-2">Sign up with Google</span>
                </button>
                <button className="flex items-center justify-center rounded-xl p-2 w-full bg-white text-black hover:text-white hover:bg-slate-800">
                  <img src={github} alt="goolge icon" className="w-5 h-5" />
                  <span className="ml-2">Sign up with Apple</span>
                </button>
              </div>
              <div className="mt-5">
                <button className="w-full p-2 rounded-xl bg-blue-500 hover:text-black hover:bg-blue-800">
                  Register
                </button>
              </div>
              <div className="flex items-center justify-center mt-4">
                <Link>
                  <p className="text-gray-500  dark:text-gray-400 ">
                    Have an Account?{" "}
                    <span className="ml-2 text-blue-500 hover:underline">
                      Log in
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
