export const projects = [
    {
        title: "Vibe-coded project #1",
        desc: "A short one-liner about what this project does and why you built it.",
        tags: ["Python", "LLM"],
        link: "https://github.com/",
        linkText: "GitHub →",
        note: "The key challenge was X. I solved it by Y. This taught me Z about building with LLMs."
    },
    {
        title: "Vibe-coded project #2",
        desc: "What does this Agent / RAG / tool demo do? Keep it to one sentence.",
        tags: ["TypeScript", "Agent"],
        link: "https://github.com/",
        linkText: "GitHub →",
        note: "I ran into an unexpected issue with tool calling. Here's how I debugged it."
    },
    {
        title: "Vibe-coded project #3",
        desc: "Another focused project — small scope, real learning.",
        tags: ["Python", "RAG"],
        note: "Still planning this one. Space holder for the next thing I build."
    }
];

export const skillGroups = [
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

export const notes = [
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
