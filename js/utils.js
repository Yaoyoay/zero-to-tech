/**
 * Shared rendering utilities.
 */

export function renderNoteEntry(note) {
    return `
        <div class="note-entry">
            <div class="note-head">
                <span class="note-type">${note.type}</span>
                <strong class="note-title">${note.title}</strong>
            </div>
            <p class="note-summary">${note.summary}</p>
        </div>`;
}
