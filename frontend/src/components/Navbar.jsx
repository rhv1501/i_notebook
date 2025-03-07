import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  let location = useLocation();
  const [isChecked, setIsChecked] = useState(" ");
  useEffect(() => {}, [location]);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  if (isChecked) {
    document.body.style.background = "black";
    document.body.style.color = "white";
  } else if (!isChecked) {
    document.body.style.background = "white";
    document.body.style.color = "black";
  }
  const Navigate = useNavigate();
  const LoginControler = () => {
    Navigate("/login");
  };
  const SignupController = () => {
    Navigate("/signup");
  };
  const logoutController = () => {
    localStorage.removeItem("token");
    setInterval(() => {
      Navigate("/signup");
    }, 2000);
  };
  return (
    <>
      <div className="switch flex justify-end mr-10 mt-2 mb-2">
        <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <span className="label flex items-center text-sm font-medium text-indigo-500">
            Light
          </span>
          <span
            className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
              isChecked ? "bg-[#212b36]" : "bg-[#CCCCCE]"
            }`}
          >
            <span
              className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                isChecked ? "translate-x-[28px]" : ""
              }`}
            ></span>
          </span>
          <span className="label flex items-center text-sm font-medium text-indigo-500">
            Dark
          </span>
        </label>
      </div>
      <nav className="bg-black-200 shadow shadow-indigo-300 w-100 px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          <div className="text-indigo-500 md:order-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
          <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
              <li
                className={`md:px-4 md:py-2 ${
                  location.pathname === "/"
                    ? "text-indigo-500"
                    : "hover:text-indigo-400"
                }`}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className={`md:px-4 md:py-2 ${
                  location.pathname === "/about"
                    ? "text-indigo-500"
                    : "hover:text-indigo-400"
                }`}
              >
                <Link to="/about">About</Link>
              </li>
              {/* <li className="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">Explore</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">About</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">Contact</a>
              </li> */}
            </ul>
          </div>
          <div className="order-2 md:order-3 flex flex-row gap-2">
            {!localStorage.getItem("token") ? (
              <button
                onClick={LoginControler}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
              >
                <span>Login</span>
              </button>
            ) : (
              <button
                onClick={logoutController}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
              >
                <span>Logout</span>
              </button>
            )}
            {!localStorage.getItem("token") ? (
              <button
                onClick={SignupController}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
              >
                <span>sign up</span>
              </button>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
