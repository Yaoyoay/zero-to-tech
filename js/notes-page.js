import { notes } from "./data.js";
import { escapeHtml } from "./sanitize.js";

document.querySelector("#allNoteList").innerHTML = notes.map((n) => `
    <div class="note-entry">
        <div class="note-head">
            <span class="note-type">${escapeHtml(n.type)}</span>
            <strong class="note-title">${escapeHtml(n.title)}</strong>
        </div>
        <p class="note-summary">${escapeHtml(n.summary)}</p>
    </div>
`).join("");
