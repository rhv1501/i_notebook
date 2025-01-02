import PropTypes from "prop-types";
function Alert(props) {
  return (
    <div className="font-regular relative mb-4 block w-full rounded-lg bg-blue-500 p-4 text-base leading-5 text-white opacity-100">
      {props.message}
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Alert;
