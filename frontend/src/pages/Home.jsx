import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then(setNotes)
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    if (editingNoteId) {
      updateNote(editingNoteId);
    } else {
      api
        .post("/api/notes/", { content, title })
        .then((res) => {
          if (res.status === 201) alert("Note created!");
          else alert("Failed to make note.");
          resetForm();
          getNotes();
        })
        .catch((err) => alert(err));
    }
  };

  const updateNote = (id) => {
    api
      .put(`/api/notes/update/${id}/`, { content, title })
      .then((res) => {
        if (res.status === 200) alert("Note updated!");
        else alert("Failed to update note.");
        resetForm();
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const onEdit = (id) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setEditingNoteId(note.id);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingNoteId(null);
  };

  return (
    <div className="home-container">
      <div className="notes-form-container">
        <div className="form-section">
          <h2>Create a Note</h2>
          <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <input
              type="submit"
              value={editingNoteId ? "Update Note" : "Add Note"}
            />
          </form>
        </div>

        <div className="notes-section">
          <h2>All Notes</h2>
          {notes.length === 0 ? (
            <p>No notes yet.</p>
          ) : (
            notes.map((note) => (
              <Note
                note={note}
                onDelete={deleteNote}
                onEdit={onEdit}
                key={note.id}
              />
            ))
          )}
        </div>
      </div>

      {editingNoteId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Note</h2>
            <form onSubmit={createNote}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input type="submit" value="Update Note" />
                <button
                  type="button"
                  className="cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
