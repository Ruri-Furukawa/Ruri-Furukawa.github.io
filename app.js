import {
  PROFILE,
  EDUCATION,
  EMPLOYMENT,
  OUTPUTS,
  PINNED,
  SKILLS,
  AWARDS,
  OTHERS,
  INTERESTS,
  LINKS,
} from "./data.js";
import { t, applyStaticTranslations } from "./i18n.js";

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function renderHero() {
  document.getElementById("hero-name").textContent = PROFILE.name;
  document.getElementById("hero-intro").textContent = PROFILE.intro;
}

function renderTimeline(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  for (const item of items) {
    const entry = el(
      "div",
      "timeline-entry",
      `<div class="timeline-period">${item.period}</div>
       <div class="timeline-body">
         <div class="timeline-title">${item.title}</div>
         <div class="timeline-place">${item.place}</div>
       </div>`
    );
    container.appendChild(entry);
  }
}

// limit=null renders every matching item. Passing a number here (plus a
// "show more" button that bumps it, capped at 10) is the whole change needed
// to turn on the later 5-then-10 pagination behavior.
function renderOutputs(filter = "all", limit = null) {
  const grid = document.getElementById("outputs-grid");
  grid.innerHTML = "";
  const items = OUTPUTS.filter((o) => filter === "all" || o.type === filter);
  const shown = limit ? items.slice(0, limit) : items;

  if (shown.length === 0) {
    grid.appendChild(el("p", "empty-state", t("outputs.empty")));
    return;
  }

  for (const item of shown) {
    const card = el(
      "article",
      "card output-card",
      `<div class="card-type">${item.type}</div>
       <h3 class="card-title">${item.title}</h3>
       <p class="card-meta">${item.meta}</p>
       <div class="card-date">${item.date}</div>
       ${item.url ? `<a class="card-link" href="${item.url}" target="_blank" rel="noopener">view →</a>` : ""}`
    );
    grid.appendChild(card);
  }
}

function setupOutputsFilter() {
  const bar = document.getElementById("outputs-filter");
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderOutputs(btn.dataset.filter);
  });
  renderOutputs("all");
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";
  for (const item of PINNED) {
    const card = el(
      "article",
      "card project-card",
      `<div class="project-image-placeholder" style="background-image:url('${item.image}')"></div>
       <h3 class="card-title">${item.title}</h3>
       <p class="card-meta">${item.subtitle}</p>`
    );
    card.addEventListener("click", () => openProjectModal(item));
    grid.appendChild(card);
  }
}

function openProjectModal(item) {
  const overlay = document.getElementById("modal-overlay");
  const modalBox = document.getElementById("modal-box");

  function closeModal() {
    overlay.classList.remove("visible");
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", onKeydown);
  }
  function onKeydown(e) {
    if (e.key === "Escape") closeModal();
  }

  modalBox.innerHTML = `
    <button type="button" class="modal-close" aria-label="${t("modal.close")}">×</button>
    <div class="modal-image-placeholder" style="background-image:url('${item.image}')"></div>
    <h3 class="modal-title">${item.title}</h3>
    <p class="modal-detail">${item.detail}</p>
    ${item.url ? `<a class="card-link" href="${item.url}" target="_blank" rel="noopener">view →</a>` : ""}
  `;
  modalBox.querySelector(".modal-close").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  }, { once: true });
  document.addEventListener("keydown", onKeydown);

  overlay.classList.add("visible");
  document.body.classList.add("modal-open");
}

function renderSkills() {
  const container = document.getElementById("skills-list");
  container.innerHTML = "";
  for (const [group, items] of Object.entries(SKILLS)) {
    const block = el("div", "kv-group");
    block.appendChild(el("div", "kv-group-label", group));
    const list = el("ul", "plain-list");
    for (const item of items) list.appendChild(el("li", null, item));
    block.appendChild(list);
    container.appendChild(block);
  }
}

function renderPlainList(containerId, items) {
  const list = document.getElementById(containerId);
  list.innerHTML = "";
  for (const item of items) {
    const text = typeof item === "string" ? item : item.text;
    const url = typeof item === "string" ? null : item.url;
    list.appendChild(
      el("li", null, url ? `${text} — <a href="${url}" target="_blank" rel="noopener">link</a>` : text)
    );
  }
}

function renderInterests() {
  const container = document.getElementById("interests-tags");
  container.innerHTML = "";
  for (const item of INTERESTS) {
    container.appendChild(el("span", "tag", item));
  }
}

// Custom-drawn, not copied brand marks: safe to reuse without fidelity to
// any platform's actual logo. Badge letters (Qiita/Zenn/note/Wikimedia Diff)
// keep the row visually consistent without needing precise logo artwork.
const ICONS = {
  X: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>`,
  GitHub: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><g transform="translate(3.6,3.6) scale(0.7)"><path d="M9 19c-4 1.2-4-2-6-2m12 4v-3.2c0-.9.3-1.5.7-1.8-2.5-.3-5-1.2-5-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.1 1.1a10.7 10.7 0 015.6 0c2.1-1.4 3.1-1.1 3.1-1.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3 0 4.3-2.5 5.2-5 5.5.4.3.8 1 .8 2v3"/></g></svg>`,
  LinkedIn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10v6.5M7.5 7.2v.1M12 16.5V13c0-1.4 1-2.5 2.3-2.5s2.2 1 2.2 2.5v3.5"/></svg>`,
  Qiita: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/><text x="12" y="16" text-anchor="middle" font-size="11" fill="currentColor" font-family="inherit">Q</text></svg>`,
  Zenn: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/><text x="12" y="16" text-anchor="middle" font-size="11" fill="currentColor" font-family="inherit">Z</text></svg>`,
  note: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/><text x="12" y="16" text-anchor="middle" font-size="11" fill="currentColor" font-family="inherit">N</text></svg>`,
  "Wikimedia Diff": `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/><text x="12" y="16" text-anchor="middle" font-size="11" fill="currentColor" font-family="inherit">W</text></svg>`,
  Email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/></svg>`,
};

function renderFooterLinks() {
  const container = document.getElementById("footer-links");
  container.innerHTML = "";
  for (const link of LINKS) {
    const text = link.label === "Email" ? `${link.label} <span class="footer-link-value">${link.value}</span>` : link.label;
    const a = el(
      "a",
      "footer-link",
      `<span class="footer-link-icon" aria-hidden="true">${ICONS[link.label] ?? ""}</span>
       <span class="footer-link-text">${text}</span>`
    );
    a.href = link.url;
    if (!link.url.startsWith("mailto:")) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    container.appendChild(a);
  }
}

function setupHamburger() {
  const btn = document.getElementById("hamburger");
  const panel = document.getElementById("nav-panel");
  const scrim = document.getElementById("nav-scrim");

  function closeNav() {
    panel.classList.remove("open");
    scrim.classList.remove("visible");
    btn.setAttribute("aria-expanded", "false");
  }
  function toggleNav() {
    const open = panel.classList.toggle("open");
    scrim.classList.toggle("visible", open);
    btn.setAttribute("aria-expanded", String(open));
  }

  btn.addEventListener("click", toggleNav);
  scrim.addEventListener("click", closeNav);
  panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
}

// Inert for now: wires the button up to a toast instead of a real backend.
// Swapping this for a call to /api/chat.js later is the only change needed.
function initChatWidget() {
  const btn = document.getElementById("chat-widget-btn");
  const toast = document.getElementById("toast");
  let hideTimer = null;
  btn.addEventListener("click", () => {
    toast.textContent = t("chat.toast");
    toast.classList.add("visible");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => toast.classList.remove("visible"), 2500);
  });
}

function init() {
  applyStaticTranslations();
  renderHero();
  renderTimeline("education-timeline", EDUCATION);
  renderTimeline("employment-timeline", EMPLOYMENT);
  setupOutputsFilter();
  renderProjects();
  renderSkills();
  renderPlainList("awards-list", AWARDS);
  renderPlainList("others-list", OTHERS);
  renderInterests();
  renderFooterLinks();
  setupHamburger();
  initChatWidget();
}

init();
