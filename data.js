// All portfolio content lives here so it can double as the future chatbot's
// knowledge source and so Japanese translations can be layered on later
// without touching markup or rendering logic.

export const PROFILE = {
  name: "Ruri Furukawa",
  photo: "images/profile.jpg",
  intro:
    "I am an undergraduate student engaging research on the application of technology on humanities and society. Interested in NLP, ontology, digital archives, digital humanities, and OSS. Loves cooking and cats.",
};

export const EDUCATION = [
  {
    period: "2023.4 – 2027.4",
    title: "Bachelor of International Liberal Studies",
    place: "School of International Liberal Studies, Waseda University",
  },
  {
    period: "2024.9 – 2025.5",
    title: "Exchange student",
    place: "College of Science and Engineering, University of Edinburgh",
  },
];

export const EMPLOYMENT = [
  {
    period: "2023.12 – 2024.8",
    title: "Student intern",
    place: "ELYZA, Inc.",
  },
  {
    period: "2025.8 – present",
    title: "Part-time staff",
    place: "Wikimedians of Japan User Group",
  },
];

// type: "paper" | "talk" | "poster" | "blog"
export const OUTPUTS = [
  {
    type: "paper",
    date: "2024",
    title: "An Influence of Reference Group on the Cooking Habit of University Students",
    summary: null,
    meta: "Furukawa, R., SWAN, S., and Yuhashi, H. (2024). The 2024 Annual Meeting of the Society of Smart Life.",
    url: "https://drive.google.com/file/d/1-xdRhcXc8H5x4aR08piXZgOZxmrWVR83/view",
  },
  {
    type: "paper",
    date: "2026",
    title:
      "OZemi at SemEval-2026 Task 9: A Cross-Lingual Approach to Online Text Polarization Classification Using Multilingual Models and Adaptive Loss Formulation",
    summary: null,
    meta: "Takahashi, H., Tee, E. N., Yu, A., Furukawa, R., Kim, S., Niinomi, S., Zhang, D., and Ohman, E. (2026). In Proceedings of the 20th International Workshop on Semantic Evaluation (2026), pages 182–192, San Diego, California, USA. Association for Computational Linguistics.",
    url: "https://aclanthology.org/2026.semeval-1.27/",
  },
  {
    type: "talk",
    date: "2024",
    title: "An Influence of Reference Group on the Cooking Habit of University Students",
    summary: null,
    meta: "Furukawa, R., SWAN, S., and Yuhashi, H. (2024). The 2024 Annual Meeting of the Society of Smart Life. (Oral presentation)",
    url: "https://drive.google.com/file/d/1-xdRhcXc8H5x4aR08piXZgOZxmrWVR83/view",
  },
  {
    type: "talk",
    date: "2025",
    title: "Editing Wikipedia as a volunteer: my experience at the UK and insights for Japan",
    summary: null,
    meta: "Furukawa, R. (2025). (Oral presentation)",
    url: null,
  },
  {
    type: "talk",
    date: "2026",
    title: "My international experience as a university student Wikipedian",
    summary: null,
    meta: "Furukawa, R. (2026). ESEAP Conference 2026. (Oral presentation)",
    url: "https://docs.google.com/presentation/d/1f_KZXXTaVTVcwFkym_gKMYd-xqlgrVkHF-EiwXFu51M/edit?slide=id.g3dea71b0df2_0_34#slide=id.g3dea71b0df2_0_34",
  },
  {
    type: "poster",
    date: "2026",
    title: "Cross-cultural understanding of Japanese and English Wikipedia experience as an exchange student",
    summary: null,
    meta: "Furukawa, R. (2026). Wikimania 2026. (Poster)",
    url: "https://commons.wikimedia.org/wiki/File:Cross-cultural_understanding_of_Japanese_and_English_Wikipedia_experience_as_an_exchange_student.pdf",
  },
  {
    type: "blog",
    date: "2026.8",
    title: "Perhaps, the most important skill in the age of AI agent might be communication",
    summary: null,
    meta: "Qiita",
    url: "https://qiita.com/java_wocky/items/f7e7bdca979d0ac4c434",
  },
  {
    type: "blog",
    date: "2026.8",
    title: "LLM Wiki vs arscontexta: comparison of two manuals on myself",
    summary: null,
    meta: "Qiita",
    url: "https://qiita.com/java_wocky/items/d2ac63da2f7933819c79",
  },
  {
    type: "blog",
    date: "2026.8",
    title: "Creating a user manual on myself with LLM Wiki",
    summary: null,
    meta: "Qiita",
    url: "https://qiita.com/java_wocky/items/92cad7e3e8f3ef000f9a",
  },
  {
    type: "blog",
    date: "2026.8",
    title: "I asked AI to suggest recipes and ended up with a dystopia",
    summary: null,
    meta: "Qiita",
    url: "https://qiita.com/java_wocky/items/69880415a5e14a40fe4b",
  },
  {
    type: "blog",
    date: "2026.8",
    title: "The error reason of Claude Code was a file name, unexpectedly",
    summary: null,
    meta: "Qiita",
    url: "https://qiita.com/java_wocky/items/22103b65af69f238731a",
  },
  {
    type: "blog",
    date: "2026.8",
    title: "Let's create a twitter-like note-taking tool: connecting Obsidian with Discord",
    summary: null,
    meta: "Qiita",
    url: "https://qiita.com/java_wocky/items/2c88920423fd7c495e55",
  },
  {
    type: "blog",
    date: "2026.4",
    title: "Managing college life with OR-Tools",
    summary: null,
    meta: "Qiita",
    url: "https://qiita.com/java_wocky/items/3811f5a92b4ba7e5797f",
  },
  {
    type: "blog",
    date: "2025.10",
    title: "Editing narratives with object-oriented programming",
    summary: null,
    meta: "Qiita",
    url: "https://qiita.com/java_wocky/items/5e575d45be5c8805e262",
  },
  {
    type: "blog",
    date: "2025.10",
    title: "Summary of informatics studies I saw while studying in the UK",
    summary: null,
    meta: "Qiita",
    url: "https://qiita.com/java_wocky/items/493b813a01f25b4ca26d",
  },
  {
    type: "blog",
    date: "2025.9",
    title: "Shift-scheduling problem with Python for beginners",
    summary: null,
    meta: "Qiita",
    url: "https://qiita.com/java_wocky/items/3187540d3a570ac802bc",
  },
];

export const PINNED = [
  {
    id: "sosl-cooking",
    title: "An Influence of Reference Group on the Cooking Habit of University Students",
    subtitle: "First paper, written in my first year — The Society of Smart Life, 2024",
    image: "images/projects/sosl-cooking.jpg",
    detail:
      "Furukawa, R., SWAN, S., and Yuhashi, H. (2024). An Influence of Reference Group on the Cooking Habit of University Students. The 2024 Annual Meeting of the Society of Smart Life.",
    url: "https://drive.google.com/file/d/1-xdRhcXc8H5x4aR08piXZgOZxmrWVR83/view",
  },
  {
    id: "acl-semeval",
    title: "OZemi at SemEval-2026 Task 9",
    subtitle: "A Cross-Lingual Approach to Online Text Polarization Classification — ACL Anthology, 2026",
    image: "images/projects/acl-semeval.png",
    detail:
      "Takahashi, H., Tee, E. N., Yu, A., Furukawa, R., Kim, S., Niinomi, S., Zhang, D., and Ohman, E. (2026). OZemi at SemEval-2026 Task 9: A Cross-Lingual Approach to Online Text Polarization Classification Using Multilingual Models and Adaptive Loss Formulation. In Proceedings of the 20th International Workshop on Semantic Evaluation (2026), pages 182–192, San Diego, California, USA. Association for Computational Linguistics.",
    url: "https://aclanthology.org/2026.semeval-1.27/",
  },
  {
    id: "daily-routines",
    title: "Daily Routines of Creatives",
    subtitle: "A timeline of what great figures were doing throughout the day — 2026.8",
    image: "images/projects/daily-routines.jpg",
    detail:
      "A vertical timeline site visualizing the daily routines of historical and creative figures.",
    url: "https://daily-routines-viewer.vercel.app/",
  },
];

export const SKILLS = {
  "Natural languages": [
    "Japanese — Native language",
    "English — Academic level. TOEIC 940, TOEFL iBT 105.",
  ],
  "Programming languages": [
    "Python3 — 2023–present",
    "R and SQL — statistical hypothesis testing and analysis",
    "HTML/CSS, JavaScript — website development, 2024–present",
  ],
  "AI tools": ["Claude Code"],
};

export const AWARDS = [
  "Dean's list (2023 Spring / Autumn, 2024 Spring)",
  "Gyomu Super Japan Dream Foundation — Scholarship recipient, 2024",
];

export const OTHERS = [
  {
    text: "Supported booth exhibition at the Open Source Conference 2025 Tokyo/Fall (2025.10) and West-Japan Wikimedia Conference 2025 (2025.12)",
    url: null,
  },
  {
    text: "Completed the University of Tokyo Global Consumer Intelligence Endowed Course (2024.9)",
    url: null,
  },
  {
    text: "Contributed to the administration of Waseda AI community as a committee (2024)",
    url: null,
  },
  {
    text: "Currently enrolled in the Course on Deep Generative Model from Matsuo-Iwasawa Laboratory (2026.7–9)",
    url: null,
  },
  {
    text: "Created Daily Routines of Creatives (2026.8)",
    url: "https://daily-routines-viewer.vercel.app/",
  },
];

export const INTERESTS = [
  "Natural Language Processing: transformer models including BERT, LLM-related services",
  "Ontology",
  "Productivity services, tools and thinking",
  "Open Source Software",
  "International activities",
];

export const LINKS = [
  { label: "X", value: "@java_wocky", url: "https://x.com/java_wocky" },
  { label: "GitHub", value: "Ruri-Furukawa", url: "https://github.com/Ruri-Furukawa" },
  {
    label: "LinkedIn",
    value: "ruri-furukawa",
    url: "https://www.linkedin.com/in/ruri-furukawa-28935523a/",
  },
  { label: "Qiita", value: "java_wocky", url: "https://qiita.com/java_wocky" },
  { label: "Zenn", value: "deepblue_3", url: "https://zenn.dev/deepblue_3" },
  { label: "note", value: "lazulite_13", url: "https://note.com/lazulite_13" },
  {
    label: "Wikimedia Diff",
    value: "ga2by",
    url: "https://diff.wikimedia.org/ja/%E8%91%97%E8%80%85/ga2by/",
  },
  { label: "Email", value: "runrunpie@gmail.com", url: "mailto:runrunpie@gmail.com" },
];
