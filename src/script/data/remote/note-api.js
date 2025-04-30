// file: note-api.js
const BASE_URL = "https://notes-api.dicoding.dev/v2";

export async function getNotes() {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return responseJson.data;
  } catch (error) {
    console.error("Error getting notes:", error.message);
    throw error;
  }
}

export async function addNotes(note) {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return responseJson.data;
  } catch (error) {
    console.error("Error adding note:", error.message);
    throw error;
  }
}

export async function updateNotes(note) {
  try {
    const response = await fetch(`${BASE_URL}/notes/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return responseJson.data;
  } catch (error) {
    console.error("Error updating note:", error.message);
    throw error;
  }
}

export async function deleteNotes(noteId) {
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return responseJson.data;
  } catch (error) {
    console.error("Error deleting note:", error.message);
    throw error;
  }
}
