import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  // states
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // context api
  const { loginUser, createUserWithGoogle } = useContext(AuthContext);

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
        <div className="w-full h-full overflow-hidden bg-black xl:h-screen">
          <div className="w-11/12 h-full py-3 mx-auto sm:w-4/5 md:w-1/2">
            <form
              onSubmit={handleLogin}
              className="p-5 bg-gray-900 shadow rounded-3xl"
            >
              <div className="flex items-center justify-center">
                <span className="text-blue-500 loading loading-ring loading-lg"></span>
                <h1 className="text-2xl text-left ml-2 font-bold text-white">
                  Please Login
                </h1>
              </div>
              <div className="w-full mx-auto ">
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

                <button className="w-full flex items-center justify-center gap-2 rounded-2xl p-2 hover:bg-white hover:text-black bg-black text-white">
                  Login
                </button>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl p-2 hover:bg-white hover:text-black bg-black text-white"
                >
                  <FaGoogle />
                  Login with Google
                </button>
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
