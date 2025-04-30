// ============================
// TEMPLATE HTML UNTUK KOMPONEN NOTE CARD
// ============================

/*
   Membuat elemen <template> yang berisi struktur HTML dan CSS
   untuk menampilkan kartu catatan. Komponen ini akan dipakai
   oleh custom element <note-card>.

   Template ini meliputi:
   - Style CSS untuk tampilan kartu.
   - Elemen HTML <h3> untuk judul catatan.
   - Elemen <p> untuk isi catatan.
   - Elemen <div class="meta"> untuk menampilkan metadata (seperti tanggal).
*/
const cardTmpl = document.createElement("template");
cardTmpl.innerHTML = `
<style>
    .card {
        cursor: pointer;
        margin: 10px 0;
        border-radius: 8px;
        border: 2px solid #e0e0e0;
        padding: 1.2rem;
        height: 100%;
        gap: 1.5rem;
        background: #fff;
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card:hover {
        transform: translateY(-25px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    h3 {
      margin: 0 0 0.8rem;
      color: #333;
      font-size: 1.25rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    p {
      flex: 1;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      color: #555;
      margin: 0 0 1rem;
      line-height: 1.5;
    }

    .meta {
      font-size: 0.8rem;
      color: #888;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgb(0, 0, 0);
      padding-top: 0.8rem;
    }

    @media (max-width: 768px) {
      .card {
        padding: 1rem;
      }
    }
  </style>

  <div class="card">
    <h3></h3>
    <p></p>
    <div class="meta"></div>
  </div>
`;

// ============================
// DEFINISI CUSTOM ELEMENT: <note-card>
// ============================

export class NoteCard extends HTMLElement {
  constructor() {
    super();

    // Membuat shadow DOM agar komponen terisolasi dari DOM utama
    this.attachShadow({ mode: "open" });

    // Menyalin isi template ke dalam shadow DOM
    this.shadowRoot.append(cardTmpl.content.cloneNode(true));

    // Menyimpan referensi elemen penting
    this.$title = this.shadowRoot.querySelector("h3");
    this.$body = this.shadowRoot.querySelector("p");
    this.$meta = this.shadowRoot.querySelector(".meta");

    // Mengatur warna latar belakang kartu secara acak
    this.cardColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 85%)`;
  }

  // Callback ketika elemen dimasukkan ke dalam DOM
  connectedCallback() {
    this._render();

    // Menambahkan event saat kartu diklik untuk membuka modal
    this.shadowRoot
      .querySelector(".card")
      .addEventListener("click", () => this._openModal());
    // Mengatur warna latar belakang kartu
    this.shadowRoot.querySelector(".card").style.backgroundColor =
      this.cardColor;
  }

  // Menentukan atribut apa saja yang perlu diamati perubahannya
  static get observedAttributes() {
    return ["title", "body", "data-id"];
  }

  // Callback ketika atribut yang diamati mengalami perubahan
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._render();
    }
  }

  // ============================
  // FUNGSI RENDER: Menampilkan isi catatan ke elemen HTML
  // ============================
  _render() {
    this.$title.textContent = this.getAttribute("title") || "Untitled";
    this.$body.textContent = this.getAttribute("body") || "";

    // Menampilkan tanggal dan waktu saat ini sebagai metadata
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    this.$meta.textContent = now.toLocaleDateString("id-ID", options);
  }

  // ============================
  // FUNGSI UNTUK MEMBUKA MODAL
  // ============================

  /*
       Saat kartu diklik, komponen akan mencari elemen <note-modal>,
       lalu mengisi detailnya (id, title, body) dan membuka modal tersebut.
    */
  _openModal() {
    const modal = document.querySelector("note-modal");
    modal.setAttribute("open", "");
    modal.detail = {
      id: this.getAttribute("data-id"),
      title: this.getAttribute("title"),
      body: this.getAttribute("body"),
    };
    modal._fill(); // Memanggil method _fill() untuk mengisi konten modal
  }
}

// Mendaftarkan custom element <note-card>
customElements.define("note-card", NoteCard);
