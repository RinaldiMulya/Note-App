import "./components/index.js";
import "../style/style.css";
import "./data/remote/note-api.js";
import "./utils/loading.js";
import "./utils/render.js";
import { initApp } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
