import NoteInput from "./components/note-input.js";
import "./components/note-card.js";
import "./components/note-modal.js";
import { getNotes, addNotes, deleteNotes } from "./data/remote/note-api.js";
import { initLoading, showLoading, hideLoading } from "./utils/loading.js";
import { renderNotes } from "./utils/render.js";
import Swal from 'sweetalert2'

let notes = [];
const container = document.getElementById("notes-container");

// Add new note
document.addEventListener("add-note", async (e) => {
    const notePayload = {
        title: e.detail.title,
        body: e.detail.body,
    };
    try {
        const newNote = await addNotes(notePayload);
        notes.push(newNote);
        renderNotes(notes, container);
        Swal.fire({
            title: "New Note added successfully!",
            icon: "success",
            draggable: true
        });
    } catch (error) {
        console.error("Failed to add note:", error);
    }
});

// Update note
document.addEventListener("update-note", async (e) => {

    const noteUpdate = notes.find((n) => n.id === e.detail.id);
    if (noteUpdate) {
        noteUpdate.body = e.detail.body;
        noteUpdate.updatedAt = new Date().toISOString();
        initLoading(container);
        renderNotes(notes, container);
        Swal.fire({
            title: 'update successfully!',
            icon: "success",
            draggable: true
        });
    }
});

// Delete note
document.addEventListener("delete-note", async (e) => {
    const noteId = e.detail.id;

    try {
        await deleteNotes(noteId);
        notes = notes.filter((note) => note.id !== noteId);
        renderNotes(notes, container);
        Swal.fire({
            title: 'Deleted successfully!',
            icon: "success",
            draggable: true
        });
    } catch (error) {
        console.error("Failed to delete note:", error);
        alert("Gagal menghapus catatan.");
    }
});

document.addEventListener("show-loading", showLoading);
document.addEventListener("hide-loading", hideLoading);

window.addEventListener("resize", () => {
});


export async function initApp() {
    initLoading(container);

    try {
        const result = await getNotes();
        notes = result;
        renderNotes(notes, container);
    } catch (error) {
        console.error("Failed to get notes:", error);
    }
}
