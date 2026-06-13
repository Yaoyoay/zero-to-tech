const projects = [
    {
        title: "Vibe-coded project #1",
        desc: "A short one-liner about what this project does and why you built it.",
        tags: ["Python", "LLM"],
        link: "https://github.com/",
        linkText: "GitHub \u2192",
        note: "The key challenge was X. I solved it by Y. This taught me Z about building with LLMs."
    },
    {
        title: "Vibe-coded project #2",
        desc: "What does this Agent / RAG / tool demo do? Keep it to one sentence.",
        tags: ["TypeScript", "Agent"],
        link: "https://github.com/",
        linkText: "GitHub \u2192",
        note: "I ran into an unexpected issue with tool calling. Here's how I debugged it."
    },
    {
        title: "Vibe-coded project #3",
        desc: "Another focused project — small scope, real learning.",
        tags: ["Python", "RAG"],
        note: "Still planning this one. Space holder for the next thing I build."
    }
];

const skillGroups = [
    {
        label: "Major",
        type: "major",
        items: ["LLM Application", "Agent Development", "Prompt Engineering", "RAG", "Function Calling"]
    },
    {
        label: "Minor",
        type: "minor",
        items: ["Python", "TypeScript", "React", "Node.js"]
    },
    {
        label: "Exploring",
        type: "exploring",
        items: ["LangChain", "CrewAI", "Vercel AI SDK"]
    }
];

const papers = [
    {
        title: "Paper title #1",
        insight: "What problem does this paper solve and what's the core idea? One sentence.",
        learned: "Relevant to my projects because... I want to try X in my next build."
    },
    {
        title: "Paper title #2",
        insight: "Key method or finding in one line.",
        learned: "This changed how I think about Y."
    },
    {
        title: "Paper title #3",
        insight: "Another paper I read and took notes on."
    }
];

const journal = [
    { date: "2026.06", event: "Rebuilt portfolio with cleaner structure and new sections." },
    { date: "2026.05", event: "Started learning TypeScript and React for full-stack projects." },
    { date: "2026.05", event: "Explored LangChain and built a simple RAG pipeline." },
    { date: "2026.04", event: "Read Toolformer paper — started thinking about tool use in LLMs." },
    { date: "2026.04", event: "Set up this site and began tracking learning progress." }
];

const projectGrid = document.querySelector("#projectGrid");
const skillGrid = document.querySelector("#skillGrid");
const paperGrid = document.querySelector("#paperGrid");
const journalList = document.querySelector("#journalList");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");

function renderProjects() {
    projectGrid.innerHTML = projects.map((p) => `
        <article class="project-card">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="project-tags">
                ${p.tags.map((t) => `<span>${t}</span>`).join("")}
            </div>
            ${p.note ? `<div class="project-note"><p class="note-label">What I learned</p><p>${p.note}</p></div>` : ""}
            ${p.link ? `<a href="${p.link}">${p.linkText || "View \u2192"}</a>` : ""}
        </article>
    `).join("");
}

function renderSkills() {
    skillGrid.innerHTML = skillGroups.map((g) => `
        <div class="skill-group">
            <h3>${g.label}</h3>
            <div class="skill-items">
                ${g.items.map((s) => `<span class="skill-item"><span class="skill-dot ${g.type}"></span>${s}</span>`).join("")}
            </div>
        </div>
    `).join("");
}

function renderPapers() {
    paperGrid.innerHTML = papers.map((p) => `
        <article class="paper-entry">
            <h3>${p.title}</h3>
            <p class="paper-insight">${p.insight}</p>
            ${p.learned ? `<p class="paper-learned"><strong>Learned:</strong> ${p.learned}</p>` : ""}
        </article>
    `).join("");
}

function renderJournal() {
    journalList.innerHTML = journal.map((j) => `
        <div class="journal-entry">
            <span class="journal-date">${j.date}</span>
            <p class="journal-event">${j.event}</p>
        </div>
    `).join("");
}

function closeMobileNav() {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
}

function setActiveLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
        const link = document.querySelector(`.nav-menu a[href="#${section.id}"]`);
        if (!link) {
            return;
        }

        const isActive = scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight;
        link.classList.toggle("active", isActive);
    });
}

renderProjects();
renderSkills();
renderPapers();
renderJournal();
setActiveLink();

navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
});

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
        closeMobileNav();
    }
});
