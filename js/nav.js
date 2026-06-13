export function initNav() {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("#navMenu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const sections = document.querySelectorAll("main section[id]");
    const tabButtons = document.querySelectorAll(".nav-tab");
    const tabPanels = {
        learning: document.querySelector("#tab-learning"),
        life: document.querySelector("#tab-life")
    };

    function closeMobileNav() {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
    }

    function setActiveLink() {
        const scrollPosition = window.scrollY + 120;

        sections.forEach((section) => {
            const link = document.querySelector(`.nav-menu a[href="#${section.id}"]`);
            if (!link) return;

            const isActive = scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight;
            link.classList.toggle("active", isActive);
        });
    }

    function switchTab(tab) {
        tabButtons.forEach((b) => b.classList.remove("active"));
        document.querySelector(`.nav-tab[data-tab="${tab}"]`).classList.add("active");

        Object.entries(tabPanels).forEach(([key, panel]) => {
            panel.classList.toggle("active", key === tab);
        });

        navLinks.forEach((link) => {
            link.style.display = tab === "learning" ? "" : "none";
        });
    }

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

    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            switchTab(btn.dataset.tab);
        });
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const activeTab = document.querySelector(".nav-tab.active");
            if (activeTab && activeTab.dataset.tab === "life") {
                e.preventDefault();
                switchTab("learning");
                const href = link.getAttribute("href");
                if (href) {
                    document.querySelector(href).scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });
}
