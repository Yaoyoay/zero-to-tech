const ESC_MAP = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
};

export function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (ch) => ESC_MAP[ch]);
}

export function sanitizeUrl(url) {
    try {
        const parsed = new URL(url, window.location.href);
        if (parsed.protocol === "http:" || parsed.protocol === "https:" || parsed.protocol === "mailto:") {
            return parsed.href;
        }
    } catch {
        /* invalid URL */
    }
    return "";
}
