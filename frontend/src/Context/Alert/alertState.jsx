import AlertContext from "./alertContext";
import PropTypes from "prop-types";
import { useState } from "react";
const AlertState = (props) => {
  const [alertData, setalertData] = useState({
    show: false,
    msg: "Welcome To i_Notebook",
    color: "blue",
  });
  return (
    <AlertContext.Provider value={{ alertData, setalertData }}>
      {props.children}
    </AlertContext.Provider>
  );
};

AlertState.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AlertState;
