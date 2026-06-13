import { projects, skillGroups, notes } from "./data.js";

export function renderProjects(container) {
    container.innerHTML = projects.map((p) => `
        <article class="project-card">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="project-tags">
                ${p.tags.map((t) => `<span>${t}</span>`).join("")}
            </div>
            ${p.note ? `<div class="project-note"><p class="note-label">What I learned</p><p>${p.note}</p></div>` : ""}
            ${p.link ? `<a href="${p.link}">${p.linkText || "View →"}</a>` : ""}
        </article>
    `).join("");
}

export function renderSkills(container) {
    container.innerHTML = skillGroups.map((g) => `
        <div class="skill-group">
            <h3>${g.label}</h3>
            <div class="skill-items">
                ${g.items.map((s) => `<span class="skill-item"><span class="skill-dot ${g.type}"></span>${s}</span>`).join("")}
            </div>
        </div>
    `).join("");
}

export function renderNotes(container) {
    container.innerHTML = notes.slice(0, 3).map((n) => `
        <div class="note-entry">
            <div class="note-head">
                <span class="note-type">${n.type}</span>
                <strong class="note-title">${n.title}</strong>
            </div>
            <p class="note-summary">${n.summary}</p>
        </div>
    `).join("");
}
