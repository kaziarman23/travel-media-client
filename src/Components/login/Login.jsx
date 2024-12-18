import { Link, useLocation, useNavigate } from "react-router-dom";
import google from "../../assets/Icons/GoogleColorfullIcons.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, createUserWithGoogle } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setLoginError("");
    // Check if password length is at least 6 characters
    if (password.length < 6) {
      return setLoginError("Password must be at least 6 characters long.");
    }

    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return setLoginError(
        "Password must contain at least one uppercase letter."
      );
    }

    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return setLoginError(
        "Password must contain at least one lowercase letter."
      );
    }

    loginUser(email, password)
      .then(() => {
        clearingForm();
        navigate(location?.state ? location?.state : "/");

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
      })
      .catch((error) => console.log(error));
  };

  // Register with Google
  const handleGoogleLogin = (e) => {
    e.preventDefault();

    createUserWithGoogle().then(() => {
      clearingForm();
      navigate(location?.state ? location?.state : "/");

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
        title: "Signed in successfully",
      });
      setLoginError("");
    });
  };

  const clearingForm = () => {
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <>
        <div className="w-full h-[600px] overflow-hidden bg-black">
          <div className="w-4/5 my-20 py-3 mx-auto lg:w-80 xl:w-96">
            <form
              onSubmit={handleLogin}
              className="relative px-4 py-10 bg-gray-900  mx-auto md:mx-0 shadow rounded-3xl "
            >
              <div className="flex items-center mb-5 ml-5">
                <span className="text-blue-500 loading loading-ring loading-lg"></span>
                <h1 className="text-2xl text-left ml-2 font-bold text-white">
                  Please Login
                </h1>
              </div>
              <div className="w-full mx-auto text-white lg:w-60 xl:w-72">
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
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center rounded-xl p-2 w-full bg-white text-black hover:text-white hover:bg-slate-800"
                  >
                    <img src={google} alt="goolge icon" className="w-5 h-5" />
                    <span className="ml-2">Login with Google</span>
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
                {loginError && (
                  <p className="text-red-500 text-md">{loginError}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default Login;
