import noteContext from "./noteContext";
import { useState } from "react";
import PropTypes from "prop-types";
const NoteState = (props) => {
  const [Note, setNote] = useState([]);
  const fetchnotes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/notes/fetchnotes", {
        method: "GET",
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2YThkOGM5OTdkM2NlOGVjZmNmN2U4In0sImlhdCI6MTczNTAzNjQyNH0.Uy8zANhJemW6iKayu5Al6eZIt13IRZf1vR3SZTSDHJ8",
        },
      });
      const data = await res.json();
      setNote(data);
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
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2YThkOGM5OTdkM2NlOGVjZmNmN2U4In0sImlhdCI6MTczNTAzNjQyNH0.Uy8zANhJemW6iKayu5Al6eZIt13IRZf1vR3SZTSDHJ8",
          },
        }
      );
      res.json();
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
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2YThkOGM5OTdkM2NlOGVjZmNmN2U4In0sImlhdCI6MTczNTAzNjQyNH0.Uy8zANhJemW6iKayu5Al6eZIt13IRZf1vR3SZTSDHJ8",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const note = await res.json();
      setNote((prevNotes) => [...prevNotes, note]);
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
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2YThkOGM5OTdkM2NlOGVjZmNmN2U4In0sImlhdCI6MTczNTAzNjQyNH0.Uy8zANhJemW6iKayu5Al6eZIt13IRZf1vR3SZTSDHJ8",
          },
          body: JSON.stringify({
            title: note.etitle,
            tag: note.etag,
            description: note.edescription,
          }),
        }
      );
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
