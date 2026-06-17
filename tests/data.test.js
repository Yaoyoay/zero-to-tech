import { describe, it, expect } from "vitest";
import { projects, skillGroups, notes } from "../js/data.js";

describe("projects data", () => {
  it("exports an array of projects", () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project has required fields", () => {
    projects.forEach((project) => {
      expect(project).toHaveProperty("title");
      expect(project).toHaveProperty("desc");
      expect(project).toHaveProperty("tags");
      expect(typeof project.title).toBe("string");
      expect(typeof project.desc).toBe("string");
      expect(Array.isArray(project.tags)).toBe(true);
    });
  });

  it("each project has at least one tag", () => {
    projects.forEach((project) => {
      expect(project.tags.length).toBeGreaterThan(0);
    });
  });

  it("projects with links have valid link properties", () => {
    projects.filter((p) => p.link).forEach((project) => {
      expect(typeof project.link).toBe("string");
      expect(project.link).toMatch(/^https?:\/\//);
    });
  });

  it("all tags are non-empty strings", () => {
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        expect(typeof tag).toBe("string");
        expect(tag.length).toBeGreaterThan(0);
      });
    });
  });
});

describe("skillGroups data", () => {
  it("exports an array of skill groups", () => {
    expect(Array.isArray(skillGroups)).toBe(true);
    expect(skillGroups.length).toBeGreaterThan(0);
  });

  it("each group has label, type, and items", () => {
    skillGroups.forEach((group) => {
      expect(group).toHaveProperty("label");
      expect(group).toHaveProperty("type");
      expect(group).toHaveProperty("items");
      expect(typeof group.label).toBe("string");
      expect(typeof group.type).toBe("string");
      expect(Array.isArray(group.items)).toBe(true);
    });
  });

  it("each group has at least one skill item", () => {
    skillGroups.forEach((group) => {
      expect(group.items.length).toBeGreaterThan(0);
    });
  });

  it("group types are unique", () => {
    const types = skillGroups.map((g) => g.type);
    expect(new Set(types).size).toBe(types.length);
  });

  it("contains expected group types", () => {
    const types = skillGroups.map((g) => g.type);
    expect(types).toContain("major");
    expect(types).toContain("minor");
    expect(types).toContain("exploring");
  });
});

describe("notes data", () => {
  it("exports an array of notes", () => {
    expect(Array.isArray(notes)).toBe(true);
    expect(notes.length).toBeGreaterThan(0);
  });

  it("each note has type, title, and summary", () => {
    notes.forEach((note) => {
      expect(note).toHaveProperty("type");
      expect(note).toHaveProperty("title");
      expect(note).toHaveProperty("summary");
      expect(typeof note.type).toBe("string");
      expect(typeof note.title).toBe("string");
      expect(typeof note.summary).toBe("string");
    });
  });

  it("note types are from valid set", () => {
    const validTypes = ["Paper", "Video", "Post", "Book", "Course"];
    notes.forEach((note) => {
      expect(validTypes).toContain(note.type);
    });
  });

  it("notes have non-empty titles and summaries", () => {
    notes.forEach((note) => {
      expect(note.title.length).toBeGreaterThan(0);
      expect(note.summary.length).toBeGreaterThan(0);
    });
  });
});
