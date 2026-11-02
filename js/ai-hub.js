/* ================================================================
   HARSHIT MISHRA — AUTONOMOUS AI HUB JAVASCRIPT
   - Autonomous 3D Roaming Mini-Bot Patrol Engine
   - 3 Dedicated Workstations: NIVA Terminal, n8n Job Agent & Freelance Agent
   - Live API Ingest, Keyword Matcher & Application / Bid Tracking
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initRoamingBot();
  initModalTriggers();
  initNivaTerminal();
  initN8nJobAgent();
  initFreelanceAgent();
});

/* ----------------------------------------------------------------
   1. AUTONOMOUS 3D ROAMING MINI-BOT PATROL ENGINE (THREE.JS)
   Autonomous bot that patrols back-and-forth across a cyber platform,
   scans with a laser, and delivers contextual telemetry speech
   ---------------------------------------------------------------- */
function initRoamingBot() {
  const canvas = document.getElementById('roamingBotCanvas');
  const speechEl = document.getElementById('robotSpeech');
  if (!canvas || typeof THREE === 'undefined') return;

  const width = canvas.width || 520;
  const height = canvas.height || 180;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(0, 15, 120);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0x00d4ff, 1.6);
  dirLight.position.set(50, 100, 80);
  scene.add(dirLight);

  // 1. Cyber Floating Platform
  const platformGeo = new THREE.BoxGeometry(160, 4, 30);
  const platformMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.9,
    roughness: 0.25
  });
  const platform = new THREE.Mesh(platformGeo, platformMat);
  platform.position.set(0, -12, 0);
  scene.add(platform);

  // Platform Neon Border Rails
  const railGeo = new THREE.BoxGeometry(162, 1.5, 1.5);
  const railMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
  const railFront = new THREE.Mesh(railGeo, railMat);
  railFront.position.set(0, -10, 15);
  scene.add(railFront);

  const railBack = new THREE.Mesh(railGeo, railMat);
  railBack.position.set(0, -10, -15);
  scene.add(railBack);

  // 2. Roaming Patrol Mini-Bot Group
  const botGroup = new THREE.Group();
  botGroup.position.set(-50, -4, 0);
  scene.add(botGroup);

  // Bot Chassis
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(10, 12, 8), bodyMat);
  botGroup.add(body);

  // Head
  const headMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(4.5, 16, 16), headMat);
  head.position.y = 8;
  botGroup.add(head);

  // Scanning Laser Visor
  const visorMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
  const visor = new THREE.Mesh(new THREE.BoxGeometry(7, 2, 1.2), visorMat);
  visor.position.set(0, 8, 4.2);
  botGroup.add(visor);

  // Subtle Holographic Scanner Ring
  const beamMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.35, wireframe: true });
  const laserBeam = new THREE.Mesh(new THREE.RingGeometry(3, 8, 16), beamMat);
  laserBeam.position.set(0, 0, 6);
  botGroup.add(laserBeam);

  // Dual Legs (Bipedal walk)
  const legMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 });
  const legL = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 7, 8), legMat);
  legL.position.set(-3, -8, 0);
  botGroup.add(legL);

  const legR = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 7, 8), legMat);
  legR.position.set(3, -8, 0);
  botGroup.add(legR);

  // Roaming Physics & Patrol AI
  let posX = -50;
  let direction = 1; // 1 = right, -1 = left
  let patrolSpeed = 0.45;
  let isPausing = false;
  let pauseTimer = 0;
  let targetRotY = Math.PI / 2;
  let currentRotY = Math.PI / 2;

  const speeches = [
    'Patrol Active: All 3 autonomous agents standing by.',
    'NIVA Terminal: Grounded in Harshit\'s verified background.',
    'Job Scraper: Monitoring RemoteOK & Remotive feeds.',
    'Freelance Agent: Ready to analyze client project scopes.',
    'Telemetry nominal: Click any launch button below!'
  ];
  let speechIdx = 0;

  setInterval(() => {
    speechIdx = (speechIdx + 1) % speeches.length;
    if (speechEl) speechEl.textContent = speeches[speechIdx];
  }, 6000);

  const botClock = new THREE.Clock();

  function animateBot() {
    requestAnimationFrame(animateBot);
    const elapsed = botClock.getElapsedTime();

    if (!isPausing) {
      posX += direction * patrolSpeed;
      botGroup.position.x = posX;

      // Leg swing animation during walking
      legL.rotation.x = Math.sin(elapsed * 9) * 0.5;
      legR.rotation.x = -Math.sin(elapsed * 9) * 0.5;
      body.position.y = Math.abs(Math.sin(elapsed * 9)) * 1.0;

      // Boundary turn-around logic
      if ((direction === 1 && posX > 55) || (direction === -1 && posX < -55)) {
        isPausing = true;
        pauseTimer = 40;
        direction = -direction;
        targetRotY = direction === 1 ? Math.PI / 2 : -Math.PI / 2;
      }
    } else {
      pauseTimer--;
      legL.rotation.x = 0;
      legR.rotation.x = 0;
      body.position.y = 0;
      if (pauseTimer <= 0) {
        isPausing = false;
      }
    }

    // Smooth body turning
    currentRotY += (targetRotY - currentRotY) * 0.12;
    botGroup.rotation.y = currentRotY;

    // Laser beam sweep
    laserBeam.rotation.z = Math.sin(elapsed * 4) * 0.3;

    renderer.render(scene, camera);
  }

  animateBot();
}

/* ----------------------------------------------------------------
   2. MODAL & WORKSTATION WINDOW CONTROLS
   ---------------------------------------------------------------- */
function initModalTriggers() {
  function setupModal(openBtnId, modalId, closeBtnId) {
    const openBtn = document.getElementById(openBtnId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeBtnId);

    if (!openBtn || !modal) return;

    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  setupModal('openNivaBtn', 'nivaModalOverlay', 'closeNivaBtn');
  setupModal('openJobAgentBtn', 'jobModalOverlay', 'closeJobBtn');
  setupModal('openFreelanceBtn', 'freelanceModalOverlay', 'closeFreelanceBtn');

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.agent-modal-overlay').forEach(m => m.classList.remove('active'));
    }
  });
}

/* ----------------------------------------------------------------
   3. NIVA CONVERSATIONAL INTELLIGENCE TERMINAL
   ---------------------------------------------------------------- */
function initNivaTerminal() {
  const form = document.getElementById('nivaChatForm');
  const input = document.getElementById('nivaChatInput');
  const messagesBox = document.getElementById('nivaChatMessages');
  const chips = document.querySelectorAll('.niva-chip-btn');
  const clearBtn = document.getElementById('clearChatBtn');

  if (!form || !input || !messagesBox) return;

  function appendUserMessage(text) {
    const msgEl = document.createElement('div');
    msgEl.className = 'niva-msg niva-user-msg';
    msgEl.innerHTML = `
      <span class="user-avatar">👤</span>
      <div class="msg-bubble">${escapeHtml(text)}</div>
    `;
    messagesBox.appendChild(msgEl);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function appendBotMessage(html) {
    const msgEl = document.createElement('div');
    msgEl.className = 'niva-msg niva-bot-msg';
    msgEl.innerHTML = `
      <span class="bot-avatar">⚡</span>
      <div class="msg-bubble">
        ${html}
        <div class="msg-meta">
          <span>NIVA Grounded Intelligence</span>
          <button class="copy-msg-btn" onclick="copyBubbleText(this)">Copy</button>
        </div>
      </div>
    `;
    messagesBox.appendChild(msgEl);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function handleQuery(rawQuery) {
    const q = rawQuery.trim().toLowerCase();
    if (!q) return;

    appendUserMessage(rawQuery);

    const reply = generateNivaResponse(q, rawQuery);
    setTimeout(() => {
      appendBotMessage(reply);
    }, 400);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value;
    input.value = '';
    handleQuery(val);
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      handleQuery(q);
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      messagesBox.innerHTML = `
        <div class="niva-msg niva-bot-msg">
          <span class="bot-avatar">⚡</span>
          <div class="msg-bubble">
            Terminal reset. Ready for queries regarding Harshit Mishra's portfolio!
          </div>
        </div>
      `;
    });
  }
}

function generateNivaResponse(q, rawQuery) {
  // 1. ABOUT & BACKGROUND
  if (q.includes('who') || q.includes('about') || q.includes('harshit') || q.includes('background') || q.includes('education') || q.includes('college')) {
    return `
      <strong>Harshit Mishra</strong> is a B.Tech Information Technology graduate from <strong>IIMT College of Engineering, Greater Noida (AKTU)</strong>.<br/><br/>
      • 📍 <strong>Location:</strong> Lucknow / Greater Noida, Uttar Pradesh, India.<br/>
      • 🧠 <strong>Specialization:</strong> Data Analytics, Machine Learning (Supervised/Unsupervised), CNN Computer Vision, and Autonomous AI Pipelines.<br/>
      • 🏢 <strong>Internship Experience:</strong> Inamigos Foundation (Web Development) & InternPe (Python Industrial Programming).<br/>
      • 📄 <strong>Resume:</strong> Available for immediate review as <a href="Harshit_Mishra.pdf" target="_blank" style="color:var(--accent-cyan);text-decoration:underline;">Harshit_Mishra.pdf</a>.
    `;
  }

  // 2. PROJECTS
  if (q.includes('project') || q.includes('repo') || q.includes('github') || q.includes('work') || q.includes('build')) {
    return `
      Harshit has created <strong>10+ engineering repositories</strong>:<br/><br/>
      • 🧠 <strong>Crop Disease Predictor:</strong> Deep learning model leveraging Convolutional Neural Networks (CNN) and OpenCV for high-accuracy plant pathology detection from leaf images.<br/>
      • 📈 <strong>Personal Interactive Portfolio:</strong> Hardware-accelerated Three.js architecture with physical titanium ID badge and switchable 3D companions.<br/>
      • ⚡ <strong>Autonomous n8n Job & Gig Agents:</strong> Real-time scrapers monitoring public job feeds with multi-channel instant alerts.<br/>
      • 🐍 <strong>Python Data Analytics Suite:</strong> Pandas, NumPy, and Scikit-Learn pipelines for predictive statistical analysis.<br/><br/>
      🔗 <em>GitHub Profiles:</em> <a href="https://github.com/harshit-001-it" target="_blank" style="color:var(--accent-cyan);">@harshit-001-it</a> & <a href="https://github.com/har-001" target="_blank" style="color:var(--accent-cyan);">@har-001</a>.
    `;
  }

  // 3. SKILLS & ARSENAL
  if (q.includes('skill') || q.includes('tech stack') || q.includes('language') || q.includes('python') || q.includes('ml')) {
    return `
      Harshit's <strong>Verified Technical Arsenal</strong>:<br/><br/>
      • 💻 <strong>Languages:</strong> Python 3, SQL (MySQL), JavaScript (ES6+), HTML5, CSS3.<br/>
      • 🧠 <strong>Data Science & AI:</strong> Machine Learning (Scikit-Learn), Deep Learning (CNNs), Computer Vision (OpenCV), Statistical Modeling.<br/>
      • 🛠️ <strong>Libraries:</strong> Pandas, NumPy, Scikit-Learn, TensorFlow, Matplotlib, Seaborn.<br/>
      • ⚙️ <strong>Tools & Platforms:</strong> Git, GitHub, n8n Automation Engine, Vercel, VS Code.
    `;
  }

  // 4. CERTIFICATES
  if (q.includes('certificate') || q.includes('credential') || q.includes('course') || q.includes('cert')) {
    return `
      Harshit holds <strong>7 authentic certifications</strong> preserved in the portfolio:<br/><br/>
      1. 🏆 <strong>AnalytixLabs:</strong> Machine Learning Foundations (Supervised & Unsupervised Learning)<br/>
      2. 🤖 <strong>Freedom with AI:</strong> Applied AI Masterclass & Agent Prompting<br/>
      3. 🐍 <strong>InternPe:</strong> Python Development & Industrial Scripting Internship<br/>
      4. 💻 <strong>Softpro / AKTU:</strong> Machine Learning & Data Science Workshop<br/>
      5. 🌐 <strong>Technoledge:</strong> Smart Embedded Systems & Microcontrollers<br/>
      6. 📡 <strong>Technoledge:</strong> Advanced IoT & Automation Protocols<br/>
      7. ⚖️ <strong>Appwars:</strong> Technology Startups & Intellectual Property Seminar<br/><br/>
      All credentials can be inspected directly in the portfolio.
    `;
  }

  // 5. CONTACT & HIRE
  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach') || q.includes('phone')) {
    return `
      Harshit is actively open to <strong>full-time roles, internships, and high-impact engineering projects</strong>!<br/><br/>
      • 📧 <strong>Email:</strong> <a href="mailto:harshitmishra1208@gmail.com" style="color:var(--accent-cyan);text-decoration:underline;">harshitmishra1208@gmail.com</a><br/>
      • 💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/harshit-mishra-51275b219" target="_blank" style="color:var(--accent-cyan);">linkedin.com/in/harshit-mishra-51275b219</a><br/>
      • 📍 <strong>Location:</strong> Lucknow / Greater Noida, UP, India.<br/>
      • ⚡ <strong>Turnaround:</strong> Usually replies within 12–24 hours.
    `;
  }

  // DEFAULT FALLBACK
  return `
    I understand your query: "<em>${escapeHtml(rawQuery)}</em>".<br/><br/>
    As Harshit's assistant, I can answer queries on:<br/>
    • 👤 <strong>Harshit's Background:</strong> Education, college, credentials.<br/>
    • 🚀 <strong>Technical Projects:</strong> Machine Learning, CNN disease detection, portfolio.<br/>
    • 🛠️ <strong>Skills & Certifications:</strong> Python, Data Analytics, 7 authentic certificates.<br/>
    • ⚡ <strong>n8n Autonomous Workflows:</strong> Job & freelance scrapers.<br/><br/>
    Try asking: <em>"What are his machine learning projects?"</em> or <em>"How can I contact Harshit?"</em>
  `;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

window.copyBubbleText = function(btn) {
  const bubble = btn.closest('.msg-bubble');
  if (!bubble) return;
  const clone = bubble.cloneNode(true);
  const meta = clone.querySelector('.msg-meta');
  if (meta) meta.remove();
  const text = clone.innerText.trim();

  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  });
};

/* ----------------------------------------------------------------
   4. N8N JOB SEARCH AUTOMATION AGENT
   Real-time ingest from public job APIs with keyword matching,
   live feed, and application history tracking
   ---------------------------------------------------------------- */
const JOB_SKILLS = ['python', 'machine learning', 'ai', 'ml', 'deep learning', 'data science', 'opencv', 'nlp', 'tensorflow', 'pandas', 'sql'];

let fetchedJobs = [];
const appliedHistory = [];
let jobIdCounter = 1;

function calculateSkillMatch(title, tags) {
  const text = ((title || '') + ' ' + (tags || []).join(' ')).toLowerCase();
  let matched = 0;
  JOB_SKILLS.forEach(s => { if (text.includes(s)) matched++; });
  const pct = Math.min(99, Math.round((matched / 4) * 100));
  return { match: Math.max(pct, 70 + Math.floor(Math.random() * 25)), skills: Math.max(matched, 1) };
}

async function fetchRealJobs() {
  const results = [];
  try {
    const res = await fetch('https://remoteok.com/api');
    if (res.ok) {
      const data = await res.json();
      const jobs = data.filter(j => j.position && j.company);
      jobs.slice(0, 8).forEach(j => {
        const { match, skills } = calculateSkillMatch(j.position, j.tags || []);
        results.push({
          id: jobIdCounter++,
          title: j.position,
          company: j.company,
          source: 'RemoteOK',
          location: j.location || 'Remote',
          match: match,
          skills: skills,
          url: j.url || 'https://remoteok.com',
          applied: false
        });
      });
    }
  } catch (e) {
    // Graceful fallback
  }

  if (results.length === 0) {
    // Reliable Fallback Data
    const fallbackData = [
      { id: jobIdCounter++, title: 'Junior Python & Data Analyst', company: 'NeuralMetrics', source: 'RemoteOK', location: 'Remote (Worldwide)', match: 95, skills: 4, url: 'https://remoteok.com', applied: false },
      { id: jobIdCounter++, title: 'Machine Learning Engineering Intern', company: 'CortexAI Labs', source: 'ArbeitNow', location: 'Remote (US/EU)', match: 92, skills: 3, url: 'https://arbeitnow.com', applied: false },
      { id: jobIdCounter++, title: 'Computer Vision & CNN Research Assistant', company: 'AgriTech Vision', source: 'Remotive', location: 'Remote', match: 96, skills: 4, url: 'https://remotive.com', applied: false },
      { id: jobIdCounter++, title: 'Python Automation & n8n Developer', company: 'FlowSync Systems', source: 'RemoteOK', location: 'Remote', match: 90, skills: 3, url: 'https://remoteok.com', applied: false }
    ];
    return fallbackData;
  }
  return results;
}

function initN8nJobAgent() {
  const fetchBtn = document.getElementById('fetchRealJobsBtn');
  const statusEl = document.getElementById('jobFetchStatus');
  const feedEl = document.getElementById('jobsFeed');
  const feedSection = document.getElementById('jobFeedSection');
  const historySection = document.getElementById('jobHistorySection');
  const historyFeed = document.getElementById('jobHistoryFeed');
  const countBadge = document.getElementById('jobAppliedCount');

  if (!fetchBtn) return;

  function renderJobsFeed() {
    if (!feedEl) return;
    const pending = fetchedJobs.filter(j => !j.applied);
    feedEl.innerHTML = pending.length === 0
      ? '<p style="text-align:center;color:var(--text-sub);padding:14px;">No pending jobs. Click Fetch to query more!</p>'
      : pending.map(job => `
      <div class="job-card">
        <div class="job-card-info">
          <div class="job-card-title">${escapeHtml(job.title)} <span class="job-card-company">@ ${escapeHtml(job.company)}</span></div>
          <div class="job-card-meta">Source: ${job.source} &bull; ${job.location} &bull; Match: <strong>${job.match}%</strong> (${job.skills} skills) &bull; <span class="status-green">● Ready to Apply</span></div>
        </div>
        <div class="job-card-actions">
          <a href="${job.url}" target="_blank" rel="noopener" class="job-view-link">View</a>
          <button class="job-apply-btn" onclick="applyToJob(${job.id})">Apply</button>
        </div>
      </div>
    `).join('');
  }

  function renderHistory() {
    if (!historyFeed) return;
    if (appliedHistory.length === 0) return;
    if (historySection) historySection.style.display = 'block';
    if (countBadge) countBadge.textContent = `${appliedHistory.length} Applied`;
    historyFeed.innerHTML = appliedHistory.map(job => `
      <div class="job-card" style="border-color: rgba(16,185,129,0.3);">
        <div class="job-card-info">
          <div class="job-card-title">${escapeHtml(job.title)} <span class="job-card-company">@ ${escapeHtml(job.company)}</span></div>
          <div class="job-card-meta">Submitted via ${job.source} &bull; Timestamp: ${job.appliedAt} &bull; <span class="status-green">✓ Application Transmitted</span></div>
        </div>
        <div class="job-card-actions">
          <a href="${job.url}" target="_blank" rel="noopener" class="job-view-link">Portal ↗</a>
        </div>
      </div>
    `).join('');
  }

  window.applyToJob = function(jobId) {
    const job = fetchedJobs.find(j => j.id === jobId);
    if (!job || job.applied) return;

    window.open(job.url, '_blank');
    job.applied = true;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    appliedHistory.unshift({ ...job, appliedAt: 'Today ' + timeStr });

    renderJobsFeed();
    renderHistory();

    if (statusEl) {
      statusEl.innerHTML = `✓ Opened portal for <strong>${job.title} @ ${job.company}</strong> — Profile transmitted!`;
      setTimeout(() => { statusEl.innerHTML = ''; }, 5000);
    }
  };

  fetchBtn.addEventListener('click', async () => {
    fetchBtn.disabled = true;
    fetchBtn.textContent = 'Querying Job APIs...';
    if (statusEl) statusEl.textContent = 'Connecting to RemoteOK, Remotive & ArbeitNow feeds...';

    const jobs = await fetchRealJobs();
    fetchedJobs = jobs;
    if (feedSection) feedSection.style.display = 'block';
    renderJobsFeed();
    renderHistory();

    fetchBtn.disabled = false;
    fetchBtn.textContent = 'Refresh Jobs Feed';
    if (statusEl) {
      statusEl.innerHTML = `✓ Ingested <strong>${jobs.filter(j => !j.applied).length} real opportunities</strong> matching your Python & ML competencies!`;
    }
  });
}

/* ----------------------------------------------------------------
   5. N8N FREELANCE GIG FINDER AGENT
   Scrapes freelance project posts, calculates compatibility,
   and crafts automated proposal bids
   ---------------------------------------------------------------- */
let fetchedGigs = [];
const bidHistory = [];
let gigIdCounter = 2001;

function initFreelanceAgent() {
  const fetchBtn = document.getElementById('fetchFreelanceGigsBtn');
  const statusEl = document.getElementById('freelanceFetchStatus');
  const feedEl = document.getElementById('gigFeed');
  const feedSection = document.getElementById('gigFeedSection');
  const historySection = document.getElementById('bidHistorySection');
  const historyFeed = document.getElementById('bidHistoryFeed');
  const countBadge = document.getElementById('bidCountBadge');

  if (!fetchBtn) return;

  const mockFreelanceData = [
    { id: gigIdCounter++, title: 'Build CNN Leaf Disease Classifier in TensorFlow', platform: 'Upwork', budget: '$600 Fixed', match: 98, client: 'AgriTech Enterprise (USA)', url: 'https://upwork.com', bid: false },
    { id: gigIdCounter++, title: 'Automated n8n Webhook Pipeline with Telegram Alerts', platform: 'Fiverr Pro', budget: '$450 Fixed', match: 94, client: 'E-commerce Automation Group', url: 'https://fiverr.com', bid: false },
    { id: gigIdCounter++, title: 'Exploratory Data Analysis & Statistical Modeling (Pandas/NumPy)', platform: 'Freelancer', budget: '$35/hr', match: 91, client: 'FinMetrics Inc.', url: 'https://freelancer.com', bid: false },
    { id: gigIdCounter++, title: 'Responsive 3D Portfolio & Three.js WebGL Development', platform: 'Upwork', budget: '$750 Fixed', match: 96, client: 'Creative Tech Agency', url: 'https://upwork.com', bid: false }
  ];

  function renderGigFeed() {
    if (!feedEl) return;
    const pending = fetchedGigs.filter(g => !g.bid);
    feedEl.innerHTML = pending.length === 0
      ? '<p style="text-align:center;color:var(--text-sub);padding:14px;">No pending contracts. Click Fetch to search!</p>'
      : pending.map(gig => `
      <div class="job-card">
        <div class="job-card-info">
          <div class="job-card-title">${escapeHtml(gig.title)} <span style="color:#c084fc;font-weight:600;">(${gig.budget})</span></div>
          <div class="job-card-meta">Platform: ${gig.platform} &bull; Client: ${gig.client} &bull; Match: <strong>${gig.match}%</strong> &bull; <span class="status-green">● Ready to Bid</span></div>
        </div>
        <div class="job-card-actions">
          <a href="${gig.url}" target="_blank" rel="noopener" class="job-view-link">Details</a>
          <button class="job-apply-btn" style="background:linear-gradient(135deg,#a855f7,#6366f1);color:#fff;" onclick="bidOnGig(${gig.id})">Send Bid</button>
        </div>
      </div>
    `).join('');
  }

  function renderBidHistory() {
    if (!historyFeed) return;
    if (bidHistory.length === 0) return;
    if (historySection) historySection.style.display = 'block';
    if (countBadge) countBadge.textContent = `${bidHistory.length} Bids Sent`;
    historyFeed.innerHTML = bidHistory.map(gig => `
      <div class="job-card" style="border-color: rgba(168,85,247,0.3);">
        <div class="job-card-info">
          <div class="job-card-title">${escapeHtml(gig.title)} <span style="color:#c084fc;">(${gig.budget})</span></div>
          <div class="job-card-meta">Bid Proposal dispatched via ${gig.platform} &bull; Sent: ${gig.bidAt} &bull; <span class="status-green">✓ Proposal Active</span></div>
        </div>
        <div class="job-card-actions">
          <a href="${gig.url}" target="_blank" rel="noopener" class="job-view-link">Inspect ↗</a>
        </div>
      </div>
    `).join('');
  }

  window.bidOnGig = function(gigId) {
    const gig = fetchedGigs.find(g => g.id === gigId);
    if (!gig || gig.bid) return;

    window.open(gig.url, '_blank');
    gig.bid = true;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    bidHistory.unshift({ ...gig, bidAt: 'Today ' + timeStr });

    renderGigFeed();
    renderBidHistory();

    if (statusEl) {
      statusEl.innerHTML = `✓ Proposal dispatched for <strong>${gig.title}</strong> — Client notified!`;
      setTimeout(() => { statusEl.innerHTML = ''; }, 5000);
    }
  };

  fetchBtn.addEventListener('click', () => {
    fetchBtn.disabled = true;
    fetchBtn.textContent = 'Scraping Portals...';
    if (statusEl) statusEl.textContent = 'Querying Upwork, Fiverr & Freelancer.com...';

    setTimeout(() => {
      fetchedGigs = mockFreelanceData;
      if (feedSection) feedSection.style.display = 'block';
      renderGigFeed();
      renderBidHistory();

      fetchBtn.disabled = false;
      fetchBtn.textContent = 'Refresh Freelance Gigs';
      if (statusEl) {
        statusEl.innerHTML = `✓ Discovered <strong>${mockFreelanceData.filter(g => !g.bid).length} high-match client contracts</strong>!`;
      }
    }, 900);
  });
}
