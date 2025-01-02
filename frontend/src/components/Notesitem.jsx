import { useContext, useState } from "react";
import noteContext from "../Context/Notes/noteContext";
import { useEffect } from "react";
import Modal from "./Modal";
const Notesitem = () => {
  const context = useContext(noteContext);
  const { Note, deletenote, fetchnotes } = context;
  async function handleCopy(title, description) {
    const text =
      "Title - " + "" + title + "\nDescription - " + "" + description;
    await navigator.clipboard.writeText(text);
  }
  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle opening the modal
  const [Update, setUpdate] = useState({});
  const openModal = (note) => {
    setIsOpen(true);
    setUpdate({
      _id: note._id,
      etitle: note.title,
      etag: note.tag,
      edescription: note.description,
    });
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    fetchnotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal
        status={isOpen}
        open={openModal}
        close={closeModal}
        data={Update}
      />
      <div className="font-bold text-center text-2xl mb-4">Your Notes</div>
      <div className="flex flex-row flex-wrap justify-center">
        {Note.map((data) => {
          return (
            <div className="my-5 mx-2" key={data._id}>
              <div className="py-4 bg-gray-800 rounded-xl w-full  p-10">
                <p className="w-full text-2xl font-semibold text-white">
                  {data.title}
                </p>
                <p className="w-full pb-2 text-sm tracking-wide leading-tight text-white">
                  {data.description}
                </p>
                <div className="flex gap-3 justify-center text-white">
                  <button
                    onClick={() => {
                      deletenote(data._id);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    onClick={() => {
                      openModal(data);
                    }}
                  >
                    <i className="fa-solid fa-file-pen"></i>
                  </button>
                  <button
                    onClick={() => {
                      handleCopy(data.title, data.description);
                    }}
                  >
                    <i className="fa-solid fa-copy"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Notesitem;
