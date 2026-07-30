# 🤖 n8n Autonomous Job & Internship Search Agent Setup Guide

This n8n AI Agent automatically:
1. **Scrapes Job Portals** (LinkedIn, RemoteOK, Indeed, Lever, Greenhouse) for Python, Machine Learning & IT Engineering roles.
2. **Scores Skill Alignment** against Harshit's resume (B.Tech IT degree, Python, ML, CNN, OpenCV, RAG, 7 Certifications).
3. **Auto-Generates Personalized Cover Letters & Applications**.
4. **Emails HR/Recruiters Directly** from `harshitmishra1208@gmail.com` with resume attached.
5. **Sends Instant Discord/Telegram Notifications** to Harshit on every application!

---

## 🚀 How to Import & Run in n8n (Takes 2 Minutes)

### Step 1: Open n8n
- Open your n8n dashboard (either on **n8n Cloud** or self-hosted via Docker `npx n8n`).

### Step 2: Import Workflow
- Click **Workflows** ➔ **Import from File**.
- Select the pre-configured file:
  `n8n-workflows/job_internship_auto_agent.json`

### Step 3: Configure Credentials & Activate
- **Gmail / SMTP Node**: Connect your Gmail `harshitmishra1208@gmail.com` credential.
- **Discord / Telegram Node**: (Optional) Add your Discord Webhook URL for instant phone notifications.
- Click **Activate Workflow**!

---

## ⚡ Live Webhook Trigger from Portfolio
- Visitors or Harshit can click the **n8n Job Agent 🤖** button in the **About Me** section of the portfolio to trigger an on-demand job search webhook!
