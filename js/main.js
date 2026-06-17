import { renderProjects, renderSkills, renderNotes } from "./render.js";
import { initNav } from "./nav.js";

try {
    const projectGrid = document.querySelector("#projectGrid");
    const skillGrid = document.querySelector("#skillGrid");
    const noteList = document.querySelector("#noteList");

    renderProjects(projectGrid);
    renderSkills(skillGrid);
    renderNotes(noteList);
    initNav();
} catch (err) {
    console.error("[main] Initialization failed:", err);
}
