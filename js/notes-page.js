import { notes } from "./data.js";
import { renderNoteEntry } from "./utils.js";

document.querySelector("#allNoteList").innerHTML = notes.map(renderNoteEntry).join("");
