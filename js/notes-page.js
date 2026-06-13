import { notes } from "./data.js";

document.querySelector("#allNoteList").innerHTML = notes.map((n) => `
    <div class="note-entry">
        <div class="note-head">
            <span class="note-type">${n.type}</span>
            <strong class="note-title">${n.title}</strong>
        </div>
        <p class="note-summary">${n.summary}</p>
    </div>
`).join("");
