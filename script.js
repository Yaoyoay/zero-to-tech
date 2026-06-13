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

const notes = [
    {
        type: "Paper",
        title: "Toolformer: LLMs Can Learn to Use Tools",
        summary: "Showed that models can learn tool use via few-shot examples — search engine, calculator, calendar. Made me rethink how agents should be built."
    },
    {
        type: "Video",
        title: "Andrej Karpathy — Intro to Large Language Models",
        summary: "Best high-level walkthrough of the LLM stack: tokenization → pretraining → finetuning → inference. Clarified a lot of vague concepts."
    },
    {
        type: "Paper",
        title: "ReAct: Synergizing Reasoning and Acting in LLMs",
        summary: "Interleaving reasoning traces with action steps improves both. The foundation of modern agent frameworks."
    },
    {
        type: "Post",
        title: "Vercel AI SDK — Streaming Text Generation",
        summary: "Understood how streaming works under the hood — chunked responses, SSE, and how to handle them in the frontend."
    }
];

const projectGrid = document.querySelector("#projectGrid");
const skillGrid = document.querySelector("#skillGrid");
const noteList = document.querySelector("#noteList");
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

function renderNotes() {
    noteList.innerHTML = notes.slice(0, 3).map((n) => `
        <div class="note-entry">
            <div class="note-head">
                <span class="note-type">${n.type}</span>
                <strong class="note-title">${n.title}</strong>
            </div>
            <p class="note-summary">${n.summary}</p>
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
renderNotes();
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
