// Modifie ce fichier pour personnaliser le site du club.
const TECHFORGE = {
  links: {
    github: "https://github.com/",     // ← remplace par ton lien
    whatsapp: "#",                      // ← remplace par ton groupe WhatsApp
    email: "mailto:techforge.fst@example.com" // ← remplace par votre email
  },
  stats: {
    membersDemo: 120,     // nombre affiché en démo
    eventsPerSemester: 8
  },
  events: [
    {
      title: "Bootcamp Git & GitHub (bases + workflow)",
      track: "web",
      date: "2026-01-17",
      time: "16:00",
      location: "FST — Salle informatique",
      desc: "Branches, PR, bonnes pratiques, mini-projet en équipe."
    },
    {
      title: "React Essentials : components, hooks, routing",
      track: "web",
      date: "2026-01-24",
      time: "16:00",
      location: "FST — Amphi",
      desc: "Construire une mini-app propre et responsive."
    },
    {
      title: "Introduction à FastAPI (API REST + docs Swagger)",
      track: "web",
      date: "2026-01-31",
      time: "16:00",
      location: "FST — Salle informatique",
      desc: "Endpoints, validation, tests simples."
    },
    {
      title: "Python Data : nettoyage + visualisation",
      track: "data",
      date: "2026-02-07",
      time: "16:00",
      location: "FST — Salle informatique",
      desc: "Pandas, graphiques, interprétation et storytelling."
    },
    {
      title: "Sécurité Web : OWASP Top 10 (démos + prévention)",
      track: "cyber",
      date: "2026-02-14",
      time: "16:00",
      location: "FST — Amphi",
      desc: "XSS, SQLi, CSRF, auth, headers, bonnes pratiques."
    },
    {
      title: "Flutter : UI + navigation + API",
      track: "mobile",
      date: "2026-02-21",
      time: "16:00",
      location: "FST — Salle informatique",
      desc: "Créer une page, gérer l'état, consommer une API."
    }
  ]
};
