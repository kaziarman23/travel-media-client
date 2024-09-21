import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/Icons/GoogleColorfullIcons.png";
import github from "../../assets/Icons/githubColorfullIcons.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then(() => {
        clearingForm();
        navigate("/");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Login successfull",
        });
        navigate("/");
      })
      .catch((error) => console.log(error));

    const clearingForm = () => {
      setEmail("");
      setPassword("");
    };
  };

  return (
    <>
      <>
        <div className="w-full h-auto overflow-hidden bg-black">
          <div className="my-20 w-96  py-3 mx-auto  sm:mx-auto">
            <form
              onSubmit={handleLogin}
              className="relative px-4 py-10 bg-gray-900  mx-auto md:mx-0 shadow rounded-3xl "
            >
              <div className="flex items-center mb-5">
                <span className="text-blue-500 loading loading-ring loading-lg"></span>
                <h1 className="text-2xl text-left ml-2 font-bold text-white">
                  Please Login
                </h1>
              </div>
              <div className="w-72 mx-auto text-white">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-5">
                  <button className="flex items-center justify-center rounded-xl p-2 w-full bg-white text-black hover:text-white hover:bg-slate-800">
                    <img src={google} alt="goolge icon" className="w-5 h-5" />
                    <span className="ml-2">Login with Google</span>
                  </button>
                  <button className="flex items-center justify-center rounded-xl p-2 w-full bg-white text-black hover:text-white hover:bg-slate-800">
                    <img src={github} alt="goolge icon" className="w-5 h-5" />
                    <span className="ml-2">Login with Github</span>
                  </button>
                </div>
                <div className="mt-5">
                  <button className="w-full p-2 rounded-xl bg-blue-500 hover:text-black hover:bg-blue-800">
                    Login
                  </button>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <p className="text-gray-500  dark:text-gray-400 ">
                    Did&#39;t Have an Account? Please
                    <Link to="/register">
                      <span className="ml-2 text-blue-500 hover:underline">
                        Register
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default Login;
