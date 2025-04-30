function renderNotes(notes = [], container) {
  if (!container) {
    console.error("Container element not found");
    return;
  }

  container.innerHTML = "";

  notes
    .sort(
      (a, b) =>
        new Date(b.createdAt || Date.now()) -
        new Date(a.createdAt || Date.now()),
    )
    .forEach((note) => {
      const card = document.createElement("note-card");
      card.setAttribute("data-id", note.id);
      card.setAttribute("title", note.title);
      card.setAttribute("body", note.body);
      container.appendChild(card);
    });
}

export { renderNotes };
