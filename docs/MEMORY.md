# Harshit Mishra — Personal Portfolio Website: Project Memory

> This file is a comprehensive reference of the entire project, its architecture, features, and technical decisions.

---

## Project Overview

| Field | Details |
|---|---|
| **Owner** | Harshit Mishra |
| **Email** | harshitmishra1208@gmail.com |
| **Education** | B.Tech Information Technology, IIMT College of Engineering, Greater Noida |
| **GitHub (Primary)** | https://github.com/harshit-001-it |
| **GitHub (Secondary)** | https://github.com/har-001 |
| **LinkedIn** | https://linkedin.com/in/harshit-mishra-51275b219 |
| **Resume** | `Harshit Mishra Resume.pdf` (root directory) |

---

## Tech Stack

- **Frontend**: Pure HTML5, CSS3 (vanilla, no Tailwind), JavaScript ES6+
- **Frameworks**: None (zero dependencies, single-page architecture)
- **Email**: EmailJS for contact form submissions
- **Hosting**: Vercel (primary) / GitHub Pages (secondary)
- **Automation**: n8n workflow engine + standalone Python script

---

## File Structure

```
Personal-Portfolio-Website/
├── index.html                    # Main single-page HTML
├── css/
│   └── styles.css                # Full CSS with design tokens & responsive
├── js/
│   └── main.js                   # All JS: animations, chatbot, skills, certs, agent
├── Certificates/                 # 7 authentic certificate files (JPEG/PDF)
│   ├── 1746505154279.jpeg        # AnalytixLabs ML Foundations
│   ├── 1746987610367.pdf         # Freedom with AI Masterclass
│   ├── 1749204415346.jpeg        # InternPe Python Internship
│   ├── 1763482137893.jpeg        # Softpro/AKTU ML Workshop
│   ├── IIMT May batch 99.pdf     # Technoledge Smart Embedded Systems & IoT
│   ├── PrintMerge1 373.pdf       # Technoledge Advance IoT
│   └── 1746506117256.jpeg        # Appwars Startups & Legal Seminar
├── scripts/
│   └── job_agent.py              # Standalone Python job search agent (no AI/ML deps)
├── n8n-workflows/
│   └── job_internship_auto_agent.json  # n8n workflow export
├── Harshit Mishra Resume.pdf     # Resume file
├── vercel.json                   # Vercel deployment config
├── .github/workflows/
│   └── deploy.yml                # GitHub Pages CI/CD
├── DEPLOYMENT.md                 # Deployment guide
├── N8N_AGENT_SETUP.md            # n8n setup guide
├── NOTIFICATION_SETUP_GUIDE.md   # Email & WhatsApp notifications guide
├── memory.md                     # THIS FILE — full project reference
└── README.md                     # Repository README
```

---

## Features Implemented

### 1. Hero Section
- Animated typewriter effect cycling roles (AI Engineer, ML Developer, etc.)
- Particle background with cyber-glass theme
- "Available for opportunities" status badge
- Gradient CTA buttons (View GitHub Work, Get In Touch)
- Smooth scroll indicator

### 2. About Me Section
- B.Tech IT (IIMT College) background text
- Animated stat counters (Projects, Skills, Certifications, GitHub Repos)
- Action Cards:
  - **GitHub** — Dual profile dropdown (@harshit-001-it & @har-001)
  - **LinkedIn** — Direct profile link (rel="noopener noreferrer")
  - **Resume** — Download link for `Harshit Mishra Resume.pdf`
  - **n8n Job Agent** — Opens interactive job search modal

### 3. Skills Section (24 Skills)
- 4 categories: AI Engineering, Core Stack, Tools & Platforms, Soft Skills
- Interactive skill cards with animated progress bars
- Click any skill → opens **Learning Roadmap Modal** with:
  - 5-step structured roadmap
  - Curated free resources (YouTube search links, documentation)

### 4. Projects Section
- Dynamically fetches repositories from GitHub API (@harshit-001-it)
- Displays repo name, description, language, stars, forks
- Direct links to GitHub repos

### 5. Certificates Section (7 Authentic)
- Interactive certificate cards with click-to-view modal
- Verified credential badge
- Key skills validated list
- "View Certificate Document" button linking to actual files in `Certificates/`

### 6. Contact Section
- EmailJS-powered live contact form
- Mailto fallback
- Direct email, GitHub, and LinkedIn links

### 7. AI Assistant Chatbot
- Floating "Ask AI" widget (bottom-right corner)
- Conversational engine answering about Harshit's background
- **AI Knowledge & Interview Tutor Engine** covering:
  - Python (decorators, generators, list vs tuple)
  - ML/DL (CNNs, backpropagation, supervised vs unsupervised)
  - NLP & RAG (transformers, embeddings, vector DBs)
  - Computer Vision (OpenCV, Canny, YOLO)
  - Web Dev (Flexbox vs Grid)
  - SQL (JOINs)
  - DSA (Big O notation)
- ChatGPT/Gemini-style structured fallback for general queries

### 8. n8n Autonomous Job Agent
- Interactive modal in About section
- Fetches jobs from 10 sources: LinkedIn, Indeed, Naukri, Internshala, Wellfound, RemoteOK, Glassdoor, Google Careers, Microsoft Careers, Amazon Jobs
- Resume skill matching with percentage score
- **User clicks Apply** → auto-fills details, submits application
- Applied Jobs History tracker
- Mail & WhatsApp notifications on every application
- Standalone Python script (`scripts/job_agent.py`) for CLI usage

### 9. Freelance Gig Finder Agent
- Interactive modal in About section ("Freelance Agent 🚀")
- Fetches freelance opportunities across 8 platforms: Upwork, Fiverr, Freelancer.com, Toptal, PeoplePerHour, Guru, 99designs, FlexJobs
- Client budget & skill match scoring
- **User clicks Bid** → auto-generates personalized proposal with portfolio & rate
- Bid History tracker
- Mail & WhatsApp notifications on every proposal submitted

---

## CSS Architecture

- CSS custom properties (design tokens): `--bg-primary`, `--accent`, `--border`, `--radius-xl`, etc.
- Dark/Light theme toggle
- Responsive media queries for all viewports
- Glassmorphism effects with backdrop-filter
- Smooth transitions and micro-animations
- Scrollable n8n agent modal (max-height: 85vh, overflow-y: auto)

---

## JS Architecture

- Single `main.js` file, no build tools
- Modular init functions called from `DOMContentLoaded`:
  - `initScrollProgress()`, `initNavbar()`, `initThemeToggle()`
  - `initMobileMenu()`, `initTypewriter()`, `initParticles()`
  - `initRevealAnimations()`, `initCounters()`
  - `renderSkills()`, `fetchAndRenderProjects()`, `renderCertificates()`
  - `initContactForm()`, `initBackToTop()`, `initSkillBarAnimations()`
  - `initGitHubDropdown()`, `initAIChatbot()`, `initN8nJobAgent()`

---

## Deployment

| Method | Config File | Live URL Pattern |
|---|---|---|
| Vercel | `vercel.json` | `https://harshit-portfolio.vercel.app` |
| GitHub Pages | `.github/workflows/deploy.yml` | `https://harshit-001-it.github.io/Personal-Portfolio-Website/` |

---

## Version History

| Date | Change |
|---|---|
| 2026-07-30 | Initial build: Hero, About, Skills, Projects, Certificates, Contact |
| 2026-07-30 | Added Interactive Skill Learning Roadmaps (24 skills) |
| 2026-07-30 | Added AI Assistant Chatbot + Interview Tutor Engine |
| 2026-07-30 | Added 7 Authentic Certificates with document viewer |
| 2026-07-30 | Added Deployment config (Vercel + GitHub Pages) |
| 2026-07-30 | Added n8n Autonomous Job Agent (multi-source, per-job apply, Mail & WhatsApp) |
