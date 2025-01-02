import propTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import noteContext from "../Context/Notes/noteContext";
function Modal(props) {
  const [Button_visible, setButton_visible] = useState("invisible");
  const context = useContext(noteContext);
  const { editNote } = context;
  const [Note, setNote] = useState({
    _id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    editNote(Note);
    props.close();
  };
  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
    setButton_visible("visible");
  };
  useEffect(() => {
    setNote({
      _id: props.data._id,
      etitle: props.data.etitle || "",
      edescription: props.data.edescription || "",
      etag: props.data.etag || "",
    });
  }, [props.data]);

  return (
    <>
      {/* Main modal */}
      {props.status && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden={!props.status}
          className="fixed inset-0 flex z-50 overflow-y-auto justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal content */}
            <div className="relative">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Your Note Here
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={props.close}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <div className="flex-col justify-center">
                <div className="flex-col items-center justify-center">
                  <div className="mx-auto w-full max-w-[550px] my-auto">
                    <form>
                      <div className="mb-5">
                        <label
                          htmlFor="etitle"
                          className=" mt-3 mb-3 block text-base font-medium text-white"
                        >
                          Note Title
                        </label>
                        <input
                          value={Note.etitle}
                          onChange={onChange}
                          type="text"
                          name="etitle"
                          id="etitle"
                          placeholder="Note Title"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="etag"
                          className="mb-3 block text-base font-medium text-white"
                        >
                          Note Tag
                        </label>
                        <input
                          value={Note.etag}
                          onChange={onChange}
                          type="text"
                          name="etag"
                          id="etag"
                          placeholder="Note Title"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="edescription"
                          className="mb-3 block text-base font-medium text-white"
                        >
                          Description
                        </label>
                        <textarea
                          value={Note.edescription}
                          onChange={onChange}
                          rows="4"
                          name="edescription"
                          id="edescription"
                          placeholder="Type your message"
                          className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          onClick={handleClick}
                          className={`${Button_visible} hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none`}
                        >
                          Update Note
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
Modal.propTypes = {
  open: propTypes.func.isRequired,
  close: propTypes.func.isRequired,
  status: propTypes.bool.isRequired,
  data: propTypes.object.isRequired,
};
export default Modal;
