import alertContext from "../Context/Alert/alertContext.jsx";
import { useContext } from "react";
function Alert() {
  const context = useContext(alertContext);
  const { alertData } = context;
  return (
    <div
      className={`font-regular relative mb-4 block w-full rounded-lg bg-${alertData.color}-500 p-4 text-base leading-5 text-white opacity-100`}
    >
      {alertData.msg}
    </div>
  );
}
export default Alert;
