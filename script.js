const projects = [
    {
        title: "个人主页 Portfolio",
        description: "用于展示个人背景、技术栈、项目链接和学习记录的长期维护主页，也是前端基础能力的第一个作品。",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "#top",
        linkText: "查看当前页面"
    },
    {
        title: "全栈练习项目",
        description: "预留给后续完整项目：从页面、接口、数据库到部署，记录一次完整的工程实践过程。",
        tags: ["Frontend", "Backend", "Database"],
        link: "#contact",
        linkText: "Coming soon"
    },
    {
        title: "学习记录系统",
        description: "计划整理学习笔记、阶段复盘和项目日志，后续可以升级为 Markdown 驱动的个人知识库。",
        tags: ["Learning", "Blog", "GitHub Pages"],
        link: "#learning",
        linkText: "查看记录"
    }
];

const learningLogs = [
    {
        date: "2026.05",
        title: "Git 与静态页面基础",
        content: "完成本地 HTML、CSS、JavaScript 项目的创建与版本管理，开始把学习过程沉淀到仓库中。"
    },
    {
        date: "Next",
        title: "前端页面与响应式布局",
        content: "继续练习语义化 HTML、CSS Grid、Flexbox、移动端适配和基础交互。"
    },
    {
        date: "Soon",
        title: "全栈项目实践",
        content: "规划一个带接口、数据库和部署流程的完整项目，逐步补充到作品集。"
    }
];

const projectGrid = document.querySelector("#projectGrid");
const learningTimeline = document.querySelector("#learningTimeline");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");

function renderProjects() {
    projectGrid.innerHTML = projects.map((project) => `
        <article class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <a href="${project.link}">${project.linkText}</a>
        </article>
    `).join("");
}

function renderLearningLogs() {
    learningTimeline.innerHTML = learningLogs.map((item) => `
        <article class="timeline-item">
            <time>${item.date}</time>
            <h3>${item.title}</h3>
            <p>${item.content}</p>
        </article>
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
renderLearningLogs();
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
