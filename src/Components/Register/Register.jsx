import { Link, useLocation, useNavigate } from "react-router-dom";
import google from "../../assets/Icons/GoogleColorfullIcons.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  // context api
  const { createUser, updateUser, createUserWithGoogle } =
    useContext(AuthContext);

  // handle register
  const handleRegister = (e) => {
    e.preventDefault();

    setRegisterError("");
    // Check if password length is at least 6 characters
    if (password.length < 6) {
      return setRegisterError("Password must be at least 6 characters long.");
    }

    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return setRegisterError(
        "Password must contain at least one uppercase letter."
      );
    }

    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return setRegisterError(
        "Password must contain at least one lowercase letter."
      );
    }

    // Register with Email
    createUser(email, password).then(() => {
      updateUser(name).then(() => {
        // clearing the form and navigating the user
        clearingForm();
        navigate(location?.state ? location?.state : "/");

        // showing alert
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
      });
    });
  };

  // Register with Google
  const handleGoogleRegister = (e) => {
    e.preventDefault();

    createUserWithGoogle(name).then(() => {
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
      setRegisterError("");
    });
  };

  const clearingForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="w-full h-[700px] overflow-hidden bg-black">
        <div className="w-4/5 my-20 py-3 mx-auto lg:w-80 xl:w-96">
          <form
            onSubmit={handleRegister}
            className="px-4 py-10 bg-gray-900 sm:p-10 sm:mx-auto md:mx-0 shadow rounded-3xl "
          >
            <div className="flex items-center">
              <span className="text-blue-500 loading loading-ring loading-lg"></span>
              <h1 className="text-2xl text-left ml-2 font-bold text-white">
                Register Now
              </h1>
            </div>
            <div className="w-full mx-auto text-white lg:w-60 xl:w-72">
              <div className="mt-5">
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onClick={handleGoogleRegister}
                  className="flex items-center justify-center rounded-xl p-2 w-full bg-white text-black hover:text-white hover:bg-slate-800"
                >
                  <img src={google} alt="goolge icon" className="w-5 h-5" />
                  <span className="ml-2">Sign up with Google</span>
                </button>
              </div>
              <div className="mt-5">
                <button className="w-full p-2 rounded-xl bg-blue-500 hover:text-black hover:bg-blue-800">
                  Register
                </button>
              </div>
              <div className="flex items-center justify-center mt-4">
                <p className="text-gray-500  dark:text-gray-400 ">
                  Already Have an Account? Please
                  <Link to="/login">
                    <span className="ml-2 text-blue-500 hover:underline">
                      Log in
                    </span>
                  </Link>
                </p>
              </div>
              {registerError && (
                <p className="text-red-500 text-md">{registerError}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
