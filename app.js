// ===== Helpers =====
const $ = (sel) => document.querySelector(sel);

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ===== Theme =====
const THEME_KEY = "techforge_theme";
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return setTheme(saved);
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(prefersLight ? "light" : "dark");
}

// ===== Mobile menu =====
function initMenu() {
  const btn = $("#menuBtn");
  const nav = $("#nav");
  btn?.addEventListener("click", () => nav.classList.toggle("open"));
  nav?.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.tagName === "A") nav.classList.remove("open");
  });
}

// ===== Render events =====
function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("fr-FR", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
}

function eventCard(e) {
  const trackLabel = ({
    web: "Web",
    data: "Data & IA",
    cyber: "Cyber",
    mobile: "Mobile",
  })[e.track] || e.track;

  return `
    <article class="panel">
      <div class="panel-top">
        <span class="badge">${trackLabel}</span>
        <span class="muted">${formatDate(e.date)} • ${e.time}</span>
      </div>
      <h3 style="margin:0 0 6px;">${e.title}</h3>
      <p class="muted" style="margin:0 0 10px;">${e.desc}</p>
      <div class="muted tiny">📍 ${e.location}</div>
    </article>
  `;
}

function renderEvents() {
  const q = ($("#eventSearch").value || "").trim().toLowerCase();
  const track = $("#eventTrack").value;

  const list = TECHFORGE.events
    .filter(e => track === "all" ? true : e.track === track)
    .filter(e => {
      if (!q) return true;
      return (e.title + " " + e.desc + " " + e.location).toLowerCase().includes(q);
    })
    .sort((a,b) => a.date.localeCompare(b.date));

  $("#eventsList").innerHTML = list.map(eventCard).join("") || `
    <div class="panel">
      <h3 style="margin:0 0 6px;">Aucun résultat</h3>
      <p class="muted" style="margin:0;">Change la recherche ou le filtre.</p>
    </div>
  `;
}

// ===== Next event widget =====
function initNextEvent() {
  const today = new Date();
  const upcoming = TECHFORGE.events
    .map(e => ({...e, _date: new Date(e.date + "T00:00:00")}))
    .filter(e => e._date >= new Date(today.toDateString()))
    .sort((a,b) => a._date - b._date)[0] || TECHFORGE.events[0];

  $("#nextEventDate").textContent = `${formatDate(upcoming.date)} • ${upcoming.time}`;
  $("#nextEventTitle").textContent = upcoming.title;
  $("#nextEventDesc").textContent = `${upcoming.location} — ${upcoming.desc}`;

  $("#addToCalendarBtn")?.addEventListener("click", () => {
    // Démo : on génère un petit fichier .ics à télécharger
    const dt = upcoming.date.replaceAll("-", "");
    const start = `${dt}T${upcoming.time.replace(":", "")}00`;
    const end = `${dt}T${String(Number(upcoming.time.slice(0,2))+2).padStart(2,"0")}${upcoming.time.slice(3,5)}00`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TechForge FST//FR",
      "BEGIN:VEVENT",
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${upcoming.title}`,
      `LOCATION:${upcoming.location}`,
      `DESCRIPTION:${upcoming.desc}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "techforge-event.ics";
    a.click();
    URL.revokeObjectURL(url);

    showToast("Fichier calendrier téléchargé ✅");
  });
}

// ===== Join form (demo) =====
function initJoinForm() {
  $("#joinForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#fullName").value.trim();
    const track = $("#track").value;
    showToast(`Bienvenue ${name} 🎉 (pôle: ${track})`);
    e.target.reset();
  });
}

function initNewsletter() {
  $("#newsletterForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Inscription enregistrée (démo) ✅");
    e.target.reset();
  });
}

// ===== Links + stats =====
function initContent() {
  $("#membersCount").textContent = String(TECHFORGE.stats.membersDemo);
  $("#eventsCount").textContent = String(TECHFORGE.stats.eventsPerSemester);

  $("#githubLink").href = TECHFORGE.links.github;
  $("#whatsappLink").href = TECHFORGE.links.whatsapp;
  $("#emailLink").href = TECHFORGE.links.email;
}

// ===== Boot =====
initTheme();
initMenu();
initContent();
initNextEvent();
renderEvents();
initJoinForm();
initNewsletter();

$("#year").textContent = String(new Date().getFullYear());

$("#themeBtn")?.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme || "dark";
  setTheme(current === "dark" ? "light" : "dark");
  showToast(`Theme: ${document.documentElement.dataset.theme}`);
});

$("#eventSearch")?.addEventListener("input", renderEvents);
$("#eventTrack")?.addEventListener("change", renderEvents);
