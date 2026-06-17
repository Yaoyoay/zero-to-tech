import { describe, it, expect, beforeEach, vi } from "vitest";
import { initNav } from "../js/nav.js";

function setupDOM() {
  document.body.innerHTML = `
    <button class="nav-toggle" aria-expanded="false">Menu</button>
    <nav id="navMenu" class="nav-menu">
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#notes">Notes</a>
    </nav>
    <div class="nav-tab active" data-tab="learning">Learning</div>
    <div class="nav-tab" data-tab="life">Life</div>
    <div id="tab-learning" class="active">Learning content</div>
    <div id="tab-life">Life content</div>
    <main>
      <section id="projects" style="height: 500px;">Projects</section>
      <section id="skills" style="height: 500px;">Skills</section>
      <section id="notes" style="height: 500px;">Notes</section>
    </main>
  `;
}

describe("initNav", () => {
  beforeEach(() => {
    setupDOM();
  });

  it("initializes without errors", () => {
    expect(() => initNav()).not.toThrow();
  });

  it("toggles mobile nav on click", () => {
    initNav();
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("#navMenu");

    navToggle.click();
    expect(navMenu.classList.contains("open")).toBe(true);
    expect(navToggle.getAttribute("aria-expanded")).toBe("true");
    expect(document.body.classList.contains("nav-open")).toBe(true);
  });

  it("closes mobile nav on second toggle click", () => {
    initNav();
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("#navMenu");

    navToggle.click();
    navToggle.click();
    expect(navMenu.classList.contains("open")).toBe(false);
    expect(navToggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.body.classList.contains("nav-open")).toBe(false);
  });

  it("closes mobile nav when a nav link is clicked", () => {
    initNav();
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("#navMenu");
    const link = navMenu.querySelector("a");

    navToggle.click();
    expect(navMenu.classList.contains("open")).toBe(true);

    link.click();
    expect(navMenu.classList.contains("open")).toBe(false);
  });

  it("switches tabs when tab button is clicked", () => {
    initNav();
    const lifeTab = document.querySelector('.nav-tab[data-tab="life"]');
    const learningTab = document.querySelector('.nav-tab[data-tab="learning"]');
    const learningPanel = document.querySelector("#tab-learning");
    const lifePanel = document.querySelector("#tab-life");

    lifeTab.click();
    expect(lifeTab.classList.contains("active")).toBe(true);
    expect(learningTab.classList.contains("active")).toBe(false);
    expect(lifePanel.classList.contains("active")).toBe(true);
    expect(learningPanel.classList.contains("active")).toBe(false);
  });

  it("hides nav links when life tab is active", () => {
    initNav();
    const lifeTab = document.querySelector('.nav-tab[data-tab="life"]');
    const navLinks = document.querySelectorAll(".nav-menu a");

    lifeTab.click();
    navLinks.forEach((link) => {
      expect(link.style.display).toBe("none");
    });
  });

  it("shows nav links when learning tab is active", () => {
    initNav();
    const lifeTab = document.querySelector('.nav-tab[data-tab="life"]');
    const learningTab = document.querySelector('.nav-tab[data-tab="learning"]');
    const navLinks = document.querySelectorAll(".nav-menu a");

    lifeTab.click();
    learningTab.click();
    navLinks.forEach((link) => {
      expect(link.style.display).toBe("");
    });
  });

  it("closes mobile nav on resize above 720px", () => {
    initNav();
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("#navMenu");

    navToggle.click();
    expect(navMenu.classList.contains("open")).toBe(true);

    Object.defineProperty(window, "innerWidth", { value: 1024, writable: true });
    window.dispatchEvent(new Event("resize"));
    expect(navMenu.classList.contains("open")).toBe(false);
  });

  it("does not close mobile nav on resize below 720px", () => {
    initNav();
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("#navMenu");

    navToggle.click();
    expect(navMenu.classList.contains("open")).toBe(true);

    Object.defineProperty(window, "innerWidth", { value: 500, writable: true });
    window.dispatchEvent(new Event("resize"));
    expect(navMenu.classList.contains("open")).toBe(true);
  });

  it("switches to learning tab and scrolls when link clicked in life tab", () => {
    initNav();
    const lifeTab = document.querySelector('.nav-tab[data-tab="life"]');
    const learningTab = document.querySelector('.nav-tab[data-tab="learning"]');
    const link = document.querySelector('.nav-menu a[href="#projects"]');

    // Mock scrollIntoView
    const section = document.querySelector("#projects");
    section.scrollIntoView = vi.fn();

    lifeTab.click();
    expect(lifeTab.classList.contains("active")).toBe(true);

    link.click();
    expect(learningTab.classList.contains("active")).toBe(true);
    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("sets active link based on scroll position", () => {
    initNav();
    const sections = document.querySelectorAll("main section[id]");

    // Mock section positions
    Object.defineProperty(sections[0], "offsetTop", { value: 0 });
    Object.defineProperty(sections[0], "offsetHeight", { value: 500 });
    Object.defineProperty(sections[1], "offsetTop", { value: 500 });
    Object.defineProperty(sections[1], "offsetHeight", { value: 500 });
    Object.defineProperty(sections[2], "offsetTop", { value: 1000 });
    Object.defineProperty(sections[2], "offsetHeight", { value: 500 });

    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    window.dispatchEvent(new Event("scroll"));

    const projectsLink = document.querySelector('.nav-menu a[href="#projects"]');
    expect(projectsLink.classList.contains("active")).toBe(true);
  });

  it("updates active link when scrolled to a different section", () => {
    initNav();
    const sections = document.querySelectorAll("main section[id]");

    Object.defineProperty(sections[0], "offsetTop", { value: 0 });
    Object.defineProperty(sections[0], "offsetHeight", { value: 500 });
    Object.defineProperty(sections[1], "offsetTop", { value: 500 });
    Object.defineProperty(sections[1], "offsetHeight", { value: 500 });
    Object.defineProperty(sections[2], "offsetTop", { value: 1000 });
    Object.defineProperty(sections[2], "offsetHeight", { value: 500 });

    Object.defineProperty(window, "scrollY", { value: 500, writable: true });
    window.dispatchEvent(new Event("scroll"));

    const skillsLink = document.querySelector('.nav-menu a[href="#skills"]');
    expect(skillsLink.classList.contains("active")).toBe(true);
  });

  it("does not crash when section has no matching link", () => {
    // Add a section without a matching nav link
    const main = document.querySelector("main");
    const extraSection = document.createElement("section");
    extraSection.id = "no-link-section";
    main.appendChild(extraSection);

    initNav();
    expect(() => {
      window.dispatchEvent(new Event("scroll"));
    }).not.toThrow();
  });
});
