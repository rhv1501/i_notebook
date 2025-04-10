import noteContext from "./noteContext";
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import AlertContext from "../Alert/alertContext";
const NoteState = (props) => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const [Note, setNote] = useState([]);
  const fetchnotes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/notes/fetchnotes", {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      setNote(data);
      showAlert("Notes Fetched Successfully", "green");
      if (data.error) {
        showAlert(data.error, "red");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const deletenote = async (id) => {
    try {
      const deleted = Note.filter((note) => note._id !== id);
      setNote(deleted);
      const res = await fetch(
        `http://localhost:8080/api/notes/deletenote/${id}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      res.json();
      showAlert("Note Deleted Successfully", "success");
    } catch (e) {
      console.log(e);
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const res = await fetch(`http://localhost:8080/api/notes/createnote`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const note = await res.json();
      setNote((prevNotes) => [...prevNotes, note]);
      showAlert("Note Added Successfully", "green");
    } catch (e) {
      console.log(e);
    }
  };
  const editNote = async (note) => {
    try {
      const res = fetch(
        `http://localhost:8080/api/notes/updatenote/${note._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            title: note.etitle,
            tag: note.etag,
            description: note.edescription,
          }),
        }
      );
      showAlert("Note Edited Successfully", "green");
      fetchnotes();
      (await res).json;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <noteContext.Provider
      value={{ Note, addNote, deletenote, fetchnotes, editNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
NoteState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoteState;
