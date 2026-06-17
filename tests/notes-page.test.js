import { describe, it, expect, beforeEach, vi } from "vitest";
import { notes } from "../js/data.js";

describe("notes-page rendering", () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = `<div id="allNoteList"></div>`;
  });

  it("renders all notes into the container", async () => {
    await import("../js/notes-page.js");
    const container = document.querySelector("#allNoteList");
    const entries = container.querySelectorAll(".note-entry");
    expect(entries.length).toBe(notes.length);
  });

  it("renders correct note type badges", async () => {
    await import("../js/notes-page.js");
    const types = document.querySelectorAll(".note-type");
    expect(types[0].textContent).toBe("Paper");
    expect(types[1].textContent).toBe("Video");
    expect(types[2].textContent).toBe("Paper");
    expect(types[3].textContent).toBe("Post");
  });

  it("renders correct note titles", async () => {
    await import("../js/notes-page.js");
    const titles = document.querySelectorAll(".note-title");
    expect(titles[0].textContent).toBe(
      "Toolformer: LLMs Can Learn to Use Tools"
    );
    expect(titles[3].textContent).toBe(
      "Vercel AI SDK — Streaming Text Generation"
    );
  });

  it("renders note summaries", async () => {
    await import("../js/notes-page.js");
    const summaries = document.querySelectorAll(".note-summary");
    expect(summaries.length).toBe(notes.length);
    summaries.forEach((summary) => {
      expect(summary.textContent.length).toBeGreaterThan(0);
    });
  });

  it("each note entry has proper structure", async () => {
    await import("../js/notes-page.js");
    const entries = document.querySelectorAll(".note-entry");
    entries.forEach((entry) => {
      expect(entry.querySelector(".note-head")).not.toBeNull();
      expect(entry.querySelector(".note-type")).not.toBeNull();
      expect(entry.querySelector(".note-title")).not.toBeNull();
      expect(entry.querySelector(".note-summary")).not.toBeNull();
    });
  });
});
