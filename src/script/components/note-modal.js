import Swal from 'sweetalert2'

// Membuat template HTML untuk modal
const modalTmpl = document.createElement("template");
modalTmpl.innerHTML = `
  <style>
    /* Gaya untuk elemen host */
    :host {
      display: none; /* Modal tidak terlihat secara default */
    }
    
    :host([open]) {
      display: block; /* Modal terlihat jika atribut 'open' ada */
    }
    
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5); /* Hitam transparan */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999; /* Pastikan di atas semua elemen */
  }


    /* Gaya untuk dialog modal */
    .dialog {
      pointer-events: auto;
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      animation: fadeIn 0.3s ease; /* Animasi fade-in saat modal muncul */
    }
    
    /* Animasi fade-in */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Gaya untuk header modal */
    header { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
    }
    
    header h2 { 
      margin: 0; 
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 400px; /* Membatasi panjang teks judul */
    }
    
    /* Tombol close */
    #close {
      background: #eee;
      color: #333;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    
    #close:hover {
      background: #ddd; /* Warna berubah saat hover */
    }
    
    /* Gaya untuk textarea */
    textarea {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      resize: vertical;
      min-height: 150px;
    }
    
    textarea:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3); /* Efek fokus */
    }
    
    /* Gaya untuk footer modal */
    footer {
      display: flex;
      justify-content: flex-end;
      gap: 5px;
    }
    
    /* Tombol save */
    #save {
      pointer-events: auto !important;
      position: relative;
      z-index: 1;
      padding: 0.6rem 1.5rem;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.2s;
    }
    
    #save:hover {
      background: #2980b9; /* Warna berubah saat hover */
    }
    /* Tombol Delete */
    #delete {
      pointer-events: auto !important;
      position: relative;
      z-index: 1;
      padding: 0.6rem 1.5rem;
      background:rgb(219, 52, 52);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.2s;
    }
    
    #delete:hover {
      background:rgb(185, 41, 41); /* Warna berubah saat hover */
    }
    
    /* Responsif untuk layar kecil */
    @media (max-width: 480px) {
      .dialog {
        width: 95%;
        padding: 1rem;
      }
      
      header h2 {
        font-size: 1.3rem;
        max-width: 200px;
      }
    }
  </style>
  
  <!-- Struktur HTML modal -->
  <div class="overlay">
    <div class="dialog">
      <header>
        <h2 id="m-title"></h2> <!-- Judul modal -->
        <button id="close">X</button> <!-- Tombol untuk menutup modal -->
      </header>
        <textarea id="m-body" rows="6"></textarea> <!-- Area teks untuk isi -->
      <footer>
        <button id="save">Simpan</button> <!-- Tombol untuk menyimpan -->
        <button id="delete">Hapus</button> <!-- Tombol untuk menghapus -->
      </footer>
    </div>
  </div>
`;

// Mendefinisikan custom element 'note-modal'
export class NoteModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Menggunakan shadow DOM
    this.shadowRoot.append(modalTmpl.content.cloneNode(true)); // Menambahkan template ke shadow DOM
    this.detail = {
      id: "", // ID catatan
      title: "", // Judul catatan
      body: "", // Isi catatan
    };
  }

  connectedCallback() {
    // Menambahkan event listener untuk tombol close
    this.shadowRoot
      .getElementById("close")
      .addEventListener("click", () => this.removeAttribute("open"));

    // Menambahkan event listener untuk tombol save
    this.shadowRoot
      .getElementById("save")
      .addEventListener("click", () => this._save());
    this.shadowRoot
      .getElementById("delete")
      .addEventListener("click", () => this._delete());

    // Menutup modal jika klik terjadi di luar dialog
    this.shadowRoot.querySelector(".overlay").addEventListener("click", (e) => {

      const dialog = this.shadowRoot.querySelector(".dialog");
      if (!dialog.contains(e.target)) {
        this.removeAttribute("open");
      }
    });

    // Menutup modal jika tombol Escape ditekan
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.hasAttribute("open")) {
        this.removeAttribute("open");
      }
    });
  }

  // Mengisi modal dengan data catatan
  _fill() {
    this.shadowRoot.getElementById("m-title").textContent = this.detail.title; // Mengisi judul
    this.shadowRoot.getElementById("m-body").value = this.detail.body; // Mengisi isi catatan

    // Fokus pada textarea setelah modal terbuka
    setTimeout(() => {
      this.shadowRoot.getElementById("m-body").focus();
    }, 100);
  }

  // Menyimpan perubahan catatan
  _save() {
    const updated = this.shadowRoot.getElementById("m-body").value.trim(); // Mengambil isi textarea
    if (!updated) {
      alert("Isi tidak boleh kosong"); // Validasi jika kosong
      return;
    }

    // Memicu event 'update-note' dengan detail catatan yang diperbarui
    document.dispatchEvent(
      new CustomEvent("update-note", {
        detail: {
          id: this.detail.id,
          body: updated,
        },
      }),
    );

    // Menutup modal dengan sedikit delay
    setTimeout(() => {
      this.removeAttribute("open");
    }, 50);
  }

  _delete() {
    // Memicu event 'delete-note' dengan ID catatan yang akan dihapus
    if (!this.detail || !this.detail.id) {
      alert("ID catatan tidak ditemukan.");
      return;
    }

    document.dispatchEvent(
      new CustomEvent("delete-note", {
        detail: {
          id: this.detail.id,
        },
      }),
    );

    this.removeAttribute("open");
  }
}

// Mendaftarkan custom element
customElements.define("note-modal", NoteModal);
