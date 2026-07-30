# Harshit Mishra — Personal Portfolio Website

A premium, single-page portfolio website built with vanilla HTML5, CSS3, and JavaScript ES6+. Zero framework dependencies.

## Live Demo

Deploy to Vercel or GitHub Pages (see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)).

---

## ⚡ Core Features

- **Cyber-Glass Dark Theme** — Particle background, glassmorphism, responsive UI
- **24 Interactive Skill Roadmaps** — 5-step learning roadmaps with free YouTube resources
- **AI Assistant Chatbot** — Interview tutor engine covering Python, ML/DL, RAG, Computer Vision, Web Dev, SQL, and DSA
- **7 Authentic Certificates** — Interactive viewer with direct document access
- **n8n Autonomous Job Agent** — Multi-source job scraper (LinkedIn, Indeed, Naukri, Internshala, Wellfound, RemoteOK, Glassdoor) with one-click apply & Mail/WhatsApp alerts
- **Freelance Gig Finder Agent** — Multi-platform project scraper (Upwork, Fiverr, Freelancer, Toptal, PeoplePerHour, Guru, 99designs, FlexJobs) with one-click bid submission
- **Dynamic GitHub Repositories** — Auto-fetches repos from GitHub API
- **Live Contact Form** — EmailJS integration with mailto fallback
- **Dual GitHub Profiles** — Dropdown for `@harshit-001-it` and `@har-001`

---

## 📁 Clean Directory Structure

```
Personal-Portfolio-Website/
├── index.html                    # Main portfolio HTML
├── css/                          # CSS design system & styles
│   └── styles.css
├── js/                           # Main JavaScript logic & agents
│   └── main.js
├── Certificates/                 # Authentic certificate files
├── docs/                         # Clean documentation directory
│   ├── DEPLOYMENT.md             # Free live deployment guide
│   ├── N8N_AGENT_SETUP.md        # n8n workflow setup guide
│   ├── NOTIFICATION_SETUP_GUIDE.md # Email & WhatsApp notification guide
│   └── MEMORY.md                 # Complete project architecture memory
├── n8n-workflows/                # n8n JSON workflow exports
├── scripts/                      # Standalone Python CLI agents
│   └── job_agent.py
├── .env.example                  # Secret API keys & environment template
├── .gitignore                    # Protects .env & private keys from GitHub
├── Harshit Mishra Resume.pdf     # Resume PDF file
├── vercel.json                   # Vercel deployment config
└── README.md                     # Main repository README
```

---

## 🔐 Security & Secret Management

All sensitive credentials and API keys are protected:
1. Never commit private keys to GitHub.
2. Copy `.env.example` to `.env` for local credentials setup:
   ```bash
   cp .env.example .env
   ```
3. `.env` is automatically ignored by `.gitignore`.

---

## 📚 Documentation Links

- 🚀 **[Deployment Guide](docs/DEPLOYMENT.md)**
- 🤖 **[n8n Agent Setup](docs/N8N_AGENT_SETUP.md)**
- 🔔 **[Email & WhatsApp Setup](docs/NOTIFICATION_SETUP_GUIDE.md)**
- 📝 **[Project Architecture Memory](docs/MEMORY.md)**

---

## 📬 Contact

- **Email**: harshitmishra1208@gmail.com
- **LinkedIn**: [linkedin.com/in/harshit-mishra-51275b219](https://linkedin.com/in/harshit-mishra-51275b219)
- **GitHub**: [github.com/harshit-001-it](https://github.com/harshit-001-it)