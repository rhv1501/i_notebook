import AlertContext from "./alertContext";
import PropTypes from "prop-types";
import { useState } from "react";
const AlertState = (props) => {
  const [alertData, setalertData] = useState({
    show: false,
    msg: "Welcome To i_Notebook",
    color: "blue",
  });
  const showAlert = (msg, color) => {
    setalertData({
      show: true,
      msg,
      color,
    });
    setTimeout(() => {
      setalertData({
        show: false,
        msg: "",
        color: "",
      });
    }, 2000);
  };
  return (
    <AlertContext.Provider value={{ alertData, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

AlertState.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AlertState;
