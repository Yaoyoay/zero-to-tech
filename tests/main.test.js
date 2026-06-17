import { describe, it, expect, beforeEach, vi } from "vitest";

describe("main.js entry point", () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = `
      <div id="projectGrid"></div>
      <div id="skillGrid"></div>
      <div id="noteList"></div>
      <button class="nav-toggle" aria-expanded="false">Menu</button>
      <nav id="navMenu" class="nav-menu">
        <a href="#projects">Projects</a>
      </nav>
      <div class="nav-tab active" data-tab="learning">Learning</div>
      <div class="nav-tab" data-tab="life">Life</div>
      <div id="tab-learning" class="active"></div>
      <div id="tab-life"></div>
      <main>
        <section id="projects"></section>
      </main>
    `;
  });

  it("renders projects into projectGrid", async () => {
    await import("../js/main.js");
    const grid = document.querySelector("#projectGrid");
    expect(grid.querySelectorAll(".project-card").length).toBeGreaterThan(0);
  });

  it("renders skills into skillGrid", async () => {
    await import("../js/main.js");
    const grid = document.querySelector("#skillGrid");
    expect(grid.querySelectorAll(".skill-group").length).toBeGreaterThan(0);
  });

  it("renders notes into noteList", async () => {
    await import("../js/main.js");
    const list = document.querySelector("#noteList");
    expect(list.querySelectorAll(".note-entry").length).toBeGreaterThan(0);
  });

  it("initializes navigation", async () => {
    await import("../js/main.js");
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector("#navMenu");
    toggle.click();
    expect(menu.classList.contains("open")).toBe(true);
  });
});
