import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../Context/Alert/alertContext";
import { useContext } from "react";
const Login = () => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const Navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });
  useEffect(() => {
    document.title = "Login - KeepNote";
    if (localStorage.getItem("token")) {
      showAlert("Login Already Found Redirecting to App", "blue");
      setInterval(() => {
        Navigate("/");
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLogin = async () => {
    try {
      const result = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(login),
      });
      const data = await result.json();
      localStorage.setItem("token", data.authtoken);
      showAlert("Login Successfull", "green");
      if(data.error){
        showAlert(data.error, "red");
      }
      Navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <div className="flex justify-center text-2xl mt-10">
          Login Already Found Redirecting to App
        </div>
      ) : (
        <div className="relative flex items-center antialiased flex-col justify-center overflow-hidden py-6 sm:py-12">
          <div className="relative py-3 sm:w-96 mx-auto text-center">
            <span className="text-2xl font-light ">Login to your account</span>
            <div className="mt-4 bg-gray-700 shadow-md rounded-lg text-left text-white">
              <div className="h-2 bg-indigo-400 rounded-t-md"></div>
              <div className="px-8 py-6 ">
                <label className="block font-semibold">Email </label>
                <input
                  onChange={(e) => {
                    setLogin({ ...login, email: e.target.value });
                  }}
                  type="text"
                  placeholder="Email"
                  className="text-black border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md"
                />
                <label className="block mt-3 font-semibold">Password</label>
                <input
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                  type="password"
                  placeholder="Password"
                  className="text-black border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md"
                />
                <div className="flex justify-between items-baseline">
                  <button
                    onClick={handleLogin}
                    type="submit"
                    className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 "
                  >
                    Login
                  </button>
                </div>
                Dont have an account?{" "}
                <a href="/signup" className="text-indigo-500">
                  Signup
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
