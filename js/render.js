import { projects, skillGroups, notes } from "./data.js";
import { escapeHtml, sanitizeUrl } from "./sanitize.js";

export function renderProjects(container) {
    container.innerHTML = projects.map((p) => `
        <article class="project-card">
            <h3>${escapeHtml(p.title)}</h3>
            <p>${escapeHtml(p.desc)}</p>
            <div class="project-tags">
                ${p.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}
            </div>
            ${p.note ? `<div class="project-note"><p class="note-label">What I learned</p><p>${escapeHtml(p.note)}</p></div>` : ""}
            ${p.link ? `<a href="${sanitizeUrl(p.link)}" rel="noopener noreferrer">${escapeHtml(p.linkText || "View →")}</a>` : ""}
        </article>
    `).join("");
}

export function renderSkills(container) {
    container.innerHTML = skillGroups.map((g) => `
        <div class="skill-group">
            <h3>${escapeHtml(g.label)}</h3>
            <div class="skill-items">
                ${g.items.map((s) => `<span class="skill-item"><span class="skill-dot ${escapeHtml(g.type)}"></span>${escapeHtml(s)}</span>`).join("")}
            </div>
        </div>
    `).join("");
}

export function renderNotes(container) {
    container.innerHTML = notes.slice(0, 3).map((n) => `
        <div class="note-entry">
            <div class="note-head">
                <span class="note-type">${escapeHtml(n.type)}</span>
                <strong class="note-title">${escapeHtml(n.title)}</strong>
            </div>
            <p class="note-summary">${escapeHtml(n.summary)}</p>
        </div>
    `).join("");
}
