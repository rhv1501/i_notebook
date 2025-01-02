import { useContext } from "react";
import noteContext from "../Context/Notes/noteContext";
import { useState } from "react";
const Addnote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [Note, setNote] = useState({ title: "", tag: "", description: "" });
  const [Btn_visibility, setBtn_visiblity] = useState("invisible");
  const handleClick = (e) => {
    e.preventDefault();
    addNote(Note.title, Note.description, Note.tag);
    setNote({ title: "", tag: "", description: "" });
    setBtn_visiblity("invisible");
  };
  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
    if (Note.title.length >= 3 && Note.description.length >= 3) {
      setBtn_visiblity("visible");
    }
  };
  return (
    <>
      <h1 className="text-center text-2xl">Add A Note +</h1>
      <div className="flex-col justify-center">
        <div className="flex-col items-center justify-center p-10">
          <div className="mx-auto w-full max-w-[550px]">
            <form>
              <div className="mb-5">
                <label
                  htmlFor="title"
                  className="mb-3 block text-base font-medium"
                >
                  Note Title
                </label>
                <input
                  value={Note.title}
                  onChange={onChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Note Title"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="tag"
                  className="mb-3 block text-base font-medium"
                >
                  Note Tag
                </label>
                <input
                  value={Note.tag}
                  onChange={onChange}
                  type="text"
                  name="tag"
                  id="tag"
                  placeholder="Note Title"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="mb-3 block text-base font-medium"
                >
                  Description
                </label>
                <textarea
                  value={Note.description}
                  onChange={onChange}
                  rows="4"
                  name="description"
                  id="description"
                  placeholder="Type your message"
                  className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                ></textarea>
              </div>
              <div>
                <button
                  onClick={handleClick}
                  className={`${Btn_visibility} hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none`}
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addnote;
