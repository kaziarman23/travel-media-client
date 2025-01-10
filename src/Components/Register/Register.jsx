import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  // states
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
        // clearing the form
        clearingForm();

        // navigating the user
        navigate(location?.state ? location?.state : "/");

        // showing alert
        toast.success("Signed in successfully");
      });
    });
  };

  // Register with Google
  const handleGoogleRegister = (e) => {
    e.preventDefault();

    createUserWithGoogle(name).then(() => {
      // clearing the form
      clearingForm();
      setRegisterError("");

      // navigating the user
      navigate(location?.state ? location?.state : "/");

      // showing alert
      toast.success("Signed in successfully");
    });
  };

  const clearingForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="w-full h-full overflow-hidden bg-black xl:h-screen">
        <div className="w-11/12 h-full py-3 mx-auto sm:w-4/5 md:w-1/2">
          <form
            onSubmit={handleRegister}
            className="p-5 bg-gray-900 shadow rounded-3xl"
          >
            <div className="flex items-center justify-center">
              <span className="text-blue-500 loading loading-ring loading-lg"></span>
              <h1 className="text-2xl ml-2 font-bold text-white">
                Register Now
              </h1>
            </div>
            <div className="w-full mx-auto text-white">
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

              <button className="w-full flex items-center justify-center gap-2 rounded-2xl p-2 hover:bg-white hover:text-black bg-black text-white">
                Register
              </button>
              <button
                type="button"
                onClick={handleGoogleRegister}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl p-2 hover:bg-white hover:text-black bg-black text-white"
              >
                <FaGoogle />
                Register with Google
              </button>
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
