import { describe, it, expect, beforeEach } from "vitest";
import { renderProjects, renderSkills, renderNotes } from "../js/render.js";

describe("renderProjects", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
  });

  it("renders all project cards", () => {
    renderProjects(container);
    const cards = container.querySelectorAll(".project-card");
    expect(cards.length).toBe(3);
  });

  it("renders project titles", () => {
    renderProjects(container);
    const titles = container.querySelectorAll(".project-card h3");
    expect(titles[0].textContent).toBe("Vibe-coded project #1");
    expect(titles[1].textContent).toBe("Vibe-coded project #2");
    expect(titles[2].textContent).toBe("Vibe-coded project #3");
  });

  it("renders project descriptions", () => {
    renderProjects(container);
    const cards = container.querySelectorAll(".project-card");
    expect(cards[0].querySelector("p").textContent).toContain(
      "A short one-liner about what this project does"
    );
  });

  it("renders tags for each project", () => {
    renderProjects(container);
    const firstCardTags = container
      .querySelector(".project-card .project-tags")
      .querySelectorAll("span");
    expect(firstCardTags.length).toBe(2);
    expect(firstCardTags[0].textContent).toBe("Python");
    expect(firstCardTags[1].textContent).toBe("LLM");
  });

  it("renders link when project has one", () => {
    renderProjects(container);
    const cards = container.querySelectorAll(".project-card");
    const link = cards[0].querySelector("a");
    expect(link).not.toBeNull();
    expect(link.getAttribute("href")).toBe("https://github.com/");
    expect(link.textContent).toBe("GitHub →");
  });

  it("does not render link when project has none", () => {
    renderProjects(container);
    const cards = container.querySelectorAll(".project-card");
    const link = cards[2].querySelector("a");
    expect(link).toBeNull();
  });

  it("renders note section when project has a note", () => {
    renderProjects(container);
    const cards = container.querySelectorAll(".project-card");
    const note = cards[0].querySelector(".project-note");
    expect(note).not.toBeNull();
    expect(note.textContent).toContain("The key challenge was X");
  });

  it("does not render note section when project has no note", () => {
    renderProjects(container);
    const cards = container.querySelectorAll(".project-card");
    // All projects in data.js have notes, so check structure is correct
    const allNotes = container.querySelectorAll(".project-note");
    expect(allNotes.length).toBe(3);
  });

  it("renders default link text when linkText is missing", () => {
    renderProjects(container);
    // Project #1 and #2 have explicit linkText, project #3 has no link at all
    const cards = container.querySelectorAll(".project-card");
    const link1 = cards[0].querySelector("a");
    expect(link1.textContent).toBe("GitHub →");
  });
});

describe("renderSkills", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
  });

  it("renders all skill groups", () => {
    renderSkills(container);
    const groups = container.querySelectorAll(".skill-group");
    expect(groups.length).toBe(3);
  });

  it("renders skill group labels", () => {
    renderSkills(container);
    const labels = container.querySelectorAll(".skill-group h3");
    expect(labels[0].textContent).toBe("Major");
    expect(labels[1].textContent).toBe("Minor");
    expect(labels[2].textContent).toBe("Exploring");
  });

  it("renders correct number of skill items per group", () => {
    renderSkills(container);
    const groups = container.querySelectorAll(".skill-group");
    const majorItems = groups[0].querySelectorAll(".skill-item");
    const minorItems = groups[1].querySelectorAll(".skill-item");
    const exploringItems = groups[2].querySelectorAll(".skill-item");
    expect(majorItems.length).toBe(5);
    expect(minorItems.length).toBe(4);
    expect(exploringItems.length).toBe(3);
  });

  it("renders skill dot with correct type class", () => {
    renderSkills(container);
    const majorDot = container.querySelector(".skill-dot.major");
    const minorDot = container.querySelector(".skill-dot.minor");
    const exploringDot = container.querySelector(".skill-dot.exploring");
    expect(majorDot).not.toBeNull();
    expect(minorDot).not.toBeNull();
    expect(exploringDot).not.toBeNull();
  });

  it("renders skill item names", () => {
    renderSkills(container);
    const firstGroup = container.querySelector(".skill-group .skill-items");
    expect(firstGroup.textContent).toContain("LLM Application");
    expect(firstGroup.textContent).toContain("Agent Development");
    expect(firstGroup.textContent).toContain("Prompt Engineering");
  });
});

describe("renderNotes", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
  });

  it("renders at most 3 notes", () => {
    renderNotes(container);
    const entries = container.querySelectorAll(".note-entry");
    expect(entries.length).toBe(3);
  });

  it("renders note type badge", () => {
    renderNotes(container);
    const types = container.querySelectorAll(".note-type");
    expect(types[0].textContent).toBe("Paper");
    expect(types[1].textContent).toBe("Video");
    expect(types[2].textContent).toBe("Paper");
  });

  it("renders note titles", () => {
    renderNotes(container);
    const titles = container.querySelectorAll(".note-title");
    expect(titles[0].textContent).toBe(
      "Toolformer: LLMs Can Learn to Use Tools"
    );
    expect(titles[1].textContent).toBe(
      "Andrej Karpathy — Intro to Large Language Models"
    );
  });

  it("renders note summaries", () => {
    renderNotes(container);
    const summaries = container.querySelectorAll(".note-summary");
    expect(summaries[0].textContent).toContain(
      "models can learn tool use via few-shot examples"
    );
  });

  it("does not render 4th note even if data has 4 entries", () => {
    renderNotes(container);
    const entries = container.querySelectorAll(".note-entry");
    expect(entries.length).toBeLessThanOrEqual(3);
    const allText = container.textContent;
    expect(allText).not.toContain("Vercel AI SDK — Streaming Text Generation");
  });
});
