// Minimal i18n for a static single-page site: the chosen language is stored
// in localStorage so it would carry across a future reload/toggle. Only
// "en" is populated for now; a "ja" block gets added here later, at which
// point a visible language toggle can be turned on in the header.

const STORAGE_KEY = "lang";
const DEFAULT_LANG = "en";

const translations = {
  en: {
    "nav.home": "Home",
    "nav.education": "Education",
    "nav.employment": "Employment",
    "nav.outputs": "Outputs",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.awards": "Awards",
    "nav.others": "Others",
    "nav.interests": "Interests",
    "nav.contact": "Contact",

    "hero.role": "Undergraduate Researcher",

    "section.education": "Education",
    "section.employment": "Employment",
    "section.outputs": "Outputs",
    "section.projects": "Pinned Projects",
    "section.skills": "Skills",
    "section.awards": "Awards",
    "section.others": "Others",
    "section.interests": "Interested In",
    "section.contact": "Links",

    "outputs.filter.all": "All",
    "outputs.filter.paper": "Papers",
    "outputs.filter.talk": "Talks",
    "outputs.filter.poster": "Posters",
    "outputs.filter.blog": "Blog",
    "outputs.empty": "No entries yet.",

    "modal.close": "Close",

    "chat.label": "Ask me — coming soon",
    "chat.toast": "Chat isn't set up yet — check back soon.",

    "footer.builtWith": "Thanks for stopping by.",
  },
};

export function getLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : DEFAULT_LANG;
}

export function setLang(lang) {
  localStorage.setItem(STORAGE_KEY, translations[lang] ? lang : DEFAULT_LANG);
}

export function t(key, vars) {
  const lang = getLang();
  let str = translations[lang]?.[key] ?? translations[DEFAULT_LANG][key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(`{${k}}`, v);
    }
  }
  return str;
}

export function applyStaticTranslations(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.documentElement.lang = getLang();
}
