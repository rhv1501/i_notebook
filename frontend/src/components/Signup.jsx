import { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../Context/Alert/alertContext";
const Signup = () => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const Navigate = useNavigate();
  const [signup, setsignup] = useState({ email: "", password: "", name: "" });
  const onChange = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });
  };
  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const result = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signup),
      });
      const data = await result.json();
      if (data.authtoken) {
        localStorage.setItem("token", data.authtoken);
        showAlert("Signup Successfull", "green");
        Navigate("/");
      }
      if (data.error) {
        showAlert(data.error, "red");
        setsignup({ email: "", password: "", name: "" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    document.title = "Login - KeepNote";
  }, []);
  return (
    <>
      <form onSubmit={handleSignup}>
        <div className="bg-grey-lighter flex flex-col">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-gray-700 px-6 py-8 rounded shadow-md text-white w-full">
              <input
                value={signup.name}
                onChange={onChange}
                type="text"
                className="text-black block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                placeholder="Full Name"
                required
                minLength={3}
              />

              <input
                value={signup.email}
                onChange={onChange}
                type="text"
                className="text-black block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                required
              />

              <input
                value={signup.password}
                onChange={onChange}
                type="password"
                className="text-black block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                required
                minLength={8}
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>

              <div className="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            <div className="text-grey-dark mt-6">
              Already have an account?
              <a className="no-underline text-indigo-500" href="/login">
                Log in
              </a>
              .
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;
