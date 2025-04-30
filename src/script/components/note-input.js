// ============================
// TEMPLATE HTML UNTUK KOMPONEN INPUT CATATAN
// ============================

/*
  Template ini berisi:
  - CSS untuk styling form input.
  - Struktur HTML: input untuk judul, textarea untuk isi catatan,
    dan tombol untuk menambahkan catatan.
*/
const template = document.createElement("template");
template.innerHTML = `
  <style>
    .form-container {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    input, textarea, button {
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ccc;
      font-size: 1rem;
    }
    textarea {
        padding: 1.5rem;
        overflow: hidden;
        transition: height 0.2s ease;
    }
    button { 
        cursor: pointer; 
    }
    button:hover {
        background:rgb(142, 119, 61);
        color: white;
    }
 
  </style>
 
  <div class="form-container">
    <input type="text" id="title" placeholder="Judul catatan..." required />
    <textarea id="body" rows="1" placeholder="Isi catatan..." required></textarea>
    <button id="add">Add Note</button>
  </div>

`;

// ============================
// DEFINISI CUSTOM ELEMENT: <note-input>
// ============================

export class NoteInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Menyalin isi template ke dalam shadow DOM
    this.shadowRoot.append(template.content.cloneNode(true));
  }

  // Callback ketika elemen dimasukkan ke dalam DOM
  connectedCallback() {
    const addButton = this.shadowRoot.getElementById("add");
    const titleInput = this.shadowRoot.getElementById("title");
    const bodyInput = this.shadowRoot.getElementById("body");

    // Ketika tombol "Add Note" diklik
    addButton.addEventListener("click", (e) => this._onAdd(e));

    // Ketika pengguna menekan Enter di input judul
    titleInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this._onAdd(e);
    });

    // Membersihkan error (jika ada validasi input sebelumnya)
    titleInput.addEventListener("input", () => {
      this.shadowRoot.getElementById("title-error")?.classList.remove("show");
    });

    bodyInput.addEventListener("input", () => {
      this.shadowRoot.getElementById("body-error")?.classList.remove("show");
    });
  }

  // ============================
  // FUNGSI UNTUK MENAMBAHKAN CATATAN
  // ============================

  _onAdd(e) {
    e.preventDefault();

    // Ambil dan trim nilai dari input
    const title = this.shadowRoot.getElementById("title").value.trim();
    const body = this.shadowRoot.getElementById("body").value.trim();
    let isValid = true;

    // Validasi input: pastikan judul dan isi tidak kosong
    if (!title) {
      this.shadowRoot.getElementById("title-error")?.classList.add("show");
      isValid = false;
    }

    if (!body) {
      this.shadowRoot.getElementById("body-error")?.classList.add("show");
      isValid = false;
    }

    if (!isValid) return;

    // Tampilkan indikator loading
    document.dispatchEvent(new CustomEvent("show-loading"));

    // Simulasi delay 1 detik untuk efek loading, lalu kirim event add-note
    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent("add-note", {
          detail: { title, body },
          bubbles: true,
          composed: true,
        }),
      );

      // Kosongkan input setelah sukses menambahkan
      this.shadowRoot.getElementById("title").value = "";
      this.shadowRoot.getElementById("body").value = "";

      // Sembunyikan indikator loading
      document.dispatchEvent(new CustomEvent("hide-loading"));
    }, 1000);
  }
}

// Mendaftarkan custom element <note-input>
customElements.define("note-input", NoteInput);