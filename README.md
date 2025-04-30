# 📝 Note App – Aplikasi Catatan Web

Aplikasi web sederhana untuk menulis, menyimpan, dan mengelola catatan. Dibuat menggunakan JavaScript modular, Web Components, dan Webpack. Cocok untuk latihan pengembangan frontend modern.

## 🚀 Demo Live
👉 https://note-app-rinaldi-mulya-pratamas-projects.vercel.app/

---

## 🛠️ Tech Stack

- ⚙️ **JavaScript (Modular)**
- 📦 **Webpack** – Build & Bundle
- 🌐 **HTML5 & CSS3**
- 🧱 **Web Components** (Custom Elements)

---

## ✨ Fitur

- Tambah dan hapus catatan
- Antarmuka berbasis komponen:
  - `note-input`
  - `note-card`
  - `note-modal`
- Build otomatis dengan Webpack
- Struktur file yang rapi dan terpisah

---

## 📁 Struktur Proyek

```bash
├── src/
│   ├── script/
│   │   ├── app.js
│   │   ├── main.js
│   │   └── components/
│   │       ├── index.js
│   │       ├── note-card.js
│   │       ├── note-input.js
│   │       └── note-modal.js
│   └── index.html
├── dist/
│   ├── bundle.js
│   └── index.html
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
└── package.json
