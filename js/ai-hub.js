/* ================================================================
   NIVA LIVE OPERABLE ASSISTANT & N8N AUTOMATION ENGINE (AI HUB)
   Author: Harshit Mishra | Portfolio AI Hub
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initRobotMascot();
  initNivaLiveTerminal();
  initN8nConsole();
  initCursorSpotlight();
});

/* ----------------------------------------------------------------
   1. ROBOT MASCOT 3D PARALLAX & SPEECH
   ---------------------------------------------------------------- */
function initRobotMascot() {
  const robot = document.getElementById('robotMascot');
  const speech = document.getElementById('robotSpeech');
  if (!robot || !speech) return;

  const phrases = [
    "NIVA Online: What would you like to explore today?",
    "Harshit's Neural Virtual Assistant at your service!",
    "Ask me about Harshit's ML projects or n8n pipelines below.",
    "B.Tech IT graduate with real-world ML & Python experience.",
    "Click a quick suggestion chip in the terminal to get started!"
  ];
  let phraseIdx = 0;

  // 3D Parallax tilt towards cursor
  document.addEventListener('mousemove', (e) => {
    const rect = robot.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);
    robot.style.transform = `perspective(600px) rotateY(${deltaX * 18}deg) rotateX(${-deltaY * 18}deg)`;
  }, { passive: true });

  robot.addEventListener('click', () => {
    phraseIdx = (phraseIdx + 1) % phrases.length;
    speech.textContent = phrases[phraseIdx];
    robot.style.transform = 'scale(1.12) rotate(4deg)';
    setTimeout(() => {
      robot.style.transform = 'scale(1) rotate(0deg)';
    }, 280);
  });
}

/* ----------------------------------------------------------------
   2. NIVA LIVE OPERABLE TERMINAL (GROUNDED PORTFOLIO INTELLIGENCE)
   ---------------------------------------------------------------- */
function initNivaLiveTerminal() {
  const messagesContainer = document.getElementById('nivaChatMessages');
  const chatForm = document.getElementById('nivaChatForm');
  const chatInput = document.getElementById('nivaChatInput');
  const clearBtn = document.getElementById('clearChatBtn');
  const chipButtons = document.querySelectorAll('.niva-chip-btn');

  if (!messagesContainer || !chatForm || !chatInput) return;

  // Handle Chips
  chipButtons.forEach((chip) => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query) {
        handleUserMessage(query);
      }
    });
  });

  // Handle Form Submission
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    handleUserMessage(text);
  });

  // Handle Clear
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      messagesContainer.innerHTML = '';
      appendNivaBubble(
        `💬 <strong>Terminal Cleared.</strong> Hello! I am <strong>NIVA</strong> (Neural Intelligent Virtual Assistant). How can I assist you today?`,
        false
      );
    });
  }

  function handleUserMessage(query) {
    // 1. Append User Message
    appendUserBubble(query);

    // 2. Typing Indicator
    const typingEl = document.createElement('div');
    typingEl.className = 'niva-msg niva-bot-msg typing-indicator';
    typingEl.innerHTML = `<span class="bot-avatar">🤖</span><div class="msg-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span> NIVA is analyzing...</div>`;
    messagesContainer.appendChild(typingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. Generate Intelligent Response
    setTimeout(() => {
      typingEl.remove();
      const response = generateNivaResponse(query);
      appendNivaBubble(response, true);
    }, 450);
  }

  function appendUserBubble(text) {
    const el = document.createElement('div');
    el.className = 'niva-msg niva-user-msg';
    el.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div><span class="user-avatar">👤</span>`;
    messagesContainer.appendChild(el);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendNivaBubble(htmlContent, isAnimate = false) {
    const el = document.createElement('div');
    el.className = 'niva-msg niva-bot-msg';
    el.innerHTML = `
      <span class="bot-avatar">⚡</span>
      <div class="msg-bubble">
        ${htmlContent}
        <div class="msg-meta">
          <span>NIVA v2.4 • Grounded Portfolio Intelligence</span>
          <button class="copy-msg-btn" onclick="copyBubbleText(this)">Copy</button>
        </div>
      </div>
    `;
    messagesContainer.appendChild(el);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

// Global copy helper
window.copyBubbleText = function(btn) {
  const bubble = btn.closest('.msg-bubble');
  if (!bubble) return;
  const clone = bubble.cloneNode(true);
  const meta = clone.querySelector('.msg-meta');
  if (meta) meta.remove();
  const text = clone.innerText.trim();
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied! ✓';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
  });
};

/* ----------------------------------------------------------------
   3. NIVA KNOWLEDGE BASE & RESPONSE ENGINE
   ---------------------------------------------------------------- */
function generateNivaResponse(rawQuery) {
  const q = rawQuery.toLowerCase();

  // 1. ABOUT & IDENTITY
  if (q.includes('who are you') || q.includes('who is harshit') || q.includes('about') || q.includes('introduce') || q.includes('profile')) {
    return `
      <strong>Harshit Mishra</strong> is a <strong>Data Analytics & AI Enthusiast</strong> based in Lucknow / Greater Noida, India.<br/><br/>
      • 🎓 <strong>Education:</strong> B.Tech in Information Technology from <em>IIMT College of Engineering, Greater Noida</em> (AKTU).<br/>
      • 💡 <strong>Core Focus:</strong> Building practical machine learning systems, data analytics pipelines, automated agent workflows, and modern web applications.<br/>
      • 🚀 <strong>Industry Experience:</strong> 2 internships completed — <em>Inamigos Foundation</em> (Web Development) and <em>InternPe</em> (Python Development).<br/>
      • 📄 <strong>Resume:</strong> Available for instant view in the main portfolio as <a href="Harshit_Mishra.pdf" target="_blank" style="color:var(--accent);text-decoration:underline;">Harshit_Mishra.pdf</a>.
    `;
  }

  // 2. PROJECTS
  if (q.includes('project') || q.includes('repo') || q.includes('github') || q.includes('work') || q.includes('build')) {
    return `
      Harshit has developed <strong>10+ technical repositories</strong> across Data Science, Machine Learning, and Web Development:<br/><br/>
      • 🧠 <strong>Crop Disease Predictor:</strong> Deep learning model utilizing Convolutional Neural Networks (CNN) and OpenCV for instant leaf blight and disease diagnostics.<br/>
      • 📈 <strong>Personal Portfolio (3D WebGL):</strong> Hardware-accelerated Three.js portfolio with physical pendulum ID badge, custom particle space field, and this AI Hub.<br/>
      • ⚡ <strong>Autonomous n8n Job & Gig Agent:</strong> Multi-agent orchestrator connecting public job feeds with 5-channel instant alerts (Telegram, WhatsApp, Email, Discord).<br/>
      • 🐍 <strong>Python Data Analytics Suite:</strong> Pandas & Scikit-learn pipelines for exploratory data analysis, feature engineering, and statistical modeling.<br/><br/>
      🔗 <em>GitHub Accounts:</em> <a href="https://github.com/harshit-001-it" target="_blank" style="color:var(--accent);">@harshit-001-it</a> & <a href="https://github.com/har-001" target="_blank" style="color:var(--accent);">@har-001</a>.
    `;
  }

  // 3. SKILLS & TECH STACK
  if (q.includes('skill') || q.includes('tech stack') || q.includes('language') || q.includes('python') || q.includes('machine learning')) {
    return `
      Here is Harshit's <strong>Verified Technical Arsenal</strong>:<br/><br/>
      • 💻 <strong>Languages:</strong> Python 3, SQL (MySQL), JavaScript (ES6+), HTML5, CSS3.<br/>
      • 🧠 <strong>Data Science & AI:</strong> Machine Learning, Deep Learning (CNN), OpenCV, RAG, NLP, Statistical Modeling.<br/>
      • 🛠️ <strong>Libraries & Frameworks:</strong> Pandas, NumPy, Scikit-Learn, TensorFlow, Matplotlib, Seaborn.<br/>
      • ⚙️ <strong>Tools & Platforms:</strong> Git, GitHub, n8n Automation Engine, Vercel, VS Code.<br/>
      • 🤝 <strong>Soft Skills:</strong> Analytical Problem Solving, Agile Collaboration, Technical Writing, Leadership.
    `;
  }

  // 4. CERTIFICATIONS
  if (q.includes('certificate') || q.includes('credential') || q.includes('course') || q.includes('cert')) {
    return `
      Harshit holds <strong>7 verified certifications</strong> with authentic documents preserved in the portfolio:<br/><br/>
      1. 🏆 <strong>AnalytixLabs:</strong> Machine Learning Foundations (Supervised & Unsupervised Learning)<br/>
      2. 🤖 <strong>Freedom with AI:</strong> Applied AI Masterclass & Agent Prompting<br/>
      3. 🐍 <strong>InternPe:</strong> Python Development & Industrial Scripting Internship<br/>
      4. 💻 <strong>Softpro / AKTU:</strong> Machine Learning & Data Science Workshop<br/>
      5. 🌐 <strong>Technoledge:</strong> Smart Embedded Systems & IoT Engineering<br/>
      6. 📡 <strong>Technoledge:</strong> Advanced IoT & Automation Protocols<br/>
      7. ⚖️ <strong>Appwars:</strong> Technology Startups & Intellectual Property Seminar<br/><br/>
      All credentials can be inspected directly in the portfolio's Certifications section.
    `;
  }

  // 5. N8N & AUTOMATION
  if (q.includes('n8n') || q.includes('agent') || q.includes('automation') || q.includes('bot') || q.includes('scrape')) {
    return `
      Harshit's <strong>n8n Autonomous Pipeline</strong> is right here in this AI Hub!<br/><br/>
      • 🔍 <strong>Live Feed Monitoring:</strong> Periodically queries remote boards (RemoteOK, Remotive, ArbeitNow) with zero cloud hosting cost.<br/>
      • ⚡ <strong>Rule-Based Matcher:</strong> Evaluates incoming job descriptions against Harshit's resume keywords (Python, Data Analyst, ML Intern).<br/>
      • 📲 <strong>5-Channel Dispatch:</strong> Alerts delivered in under 2 seconds to Telegram, WhatsApp, Email, and Discord.<br/>
      • 🚀 <em>Try it yourself:</em> Click <strong>"Execute Live Test"</strong> in the n8n console below!
    `;
  }

  // 6. CONTACT & HIRING
  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('interview') || q.includes('reach') || q.includes('salary')) {
    return `
      Harshit is actively open to <strong>full-time roles, internships, and high-impact freelance projects</strong>!<br/><br/>
      • 📧 <strong>Direct Email:</strong> <a href="mailto:harshitmishra1208@gmail.com" style="color:var(--accent);text-decoration:underline;">harshitmishra1208@gmail.com</a><br/>
      • 💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/harshit-mishra-51275b219" target="_blank" style="color:var(--accent);">linkedin.com/in/harshit-mishra-51275b219</a><br/>
      • 📍 <strong>Location:</strong> Lucknow / Greater Noida, Uttar Pradesh, India (Open to Remote / Hybrid / On-site).<br/>
      • ⚡ <strong>Turnaround:</strong> Usually responds within 12–24 hours.
    `;
  }

  // 7. DEFAULT INTELLIGENT FALLBACK
  return `
    I understand your query: "<em>${escapeHtml(rawQuery)}</em>".<br/><br/>
    As Harshit's AI assistant, I can provide verified details on:<br/>
    • 👤 <strong>Harshit's Background:</strong> Education, college, location, contact.<br/>
    • 🚀 <strong>Technical Projects:</strong> Machine Learning, CNN disease detection, 3D WebGL website.<br/>
    • 🛠️ <strong>Skills & Certifications:</strong> Python, Data Analytics, 7 authentic certificates.<br/>
    • ⚡ <strong>n8n Autonomous Workflows:</strong> Multi-channel alert dispatch pipelines.<br/><br/>
    Try asking: <em>"What are his machine learning projects?"</em> or <em>"How can I contact Harshit?"</em>
  `;

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

/* ----------------------------------------------------------------
   4. N8N INTERACTIVE SIMULATION & WORKFLOW CONSOLE
   ---------------------------------------------------------------- */
function initN8nConsole() {
  const runBtn = document.getElementById('runN8nTestBtn');
  const logTerminal = document.getElementById('n8nLogTerminal');
  const statusBadge = document.getElementById('n8nConsoleStatus');
  const nodes = document.querySelectorAll('.pipeline-node');

  if (!runBtn || !logTerminal) return;

  const sampleLiveJobs = [
    { title: "Junior Python & Data Analyst", company: "DataPulse AI", match: "96%", loc: "Remote", tag: "Python • Pandas • SQL" },
    { title: "Machine Learning Intern", company: "NeuralCraft Labs", match: "92%", loc: "Hybrid / Bengaluru", tag: "TensorFlow • CNN • OpenCV" },
    { title: "AI Automation Specialist", company: "FlowStack Systems", match: "89%", loc: "Remote", tag: "n8n • Webhooks • Python" }
  ];

  runBtn.addEventListener('click', async () => {
    runBtn.disabled = true;
    runBtn.innerHTML = 'Executing Pipeline... ⏳';
    if (statusBadge) statusBadge.textContent = 'PIPELINE ACTIVE';

    logTerminal.innerHTML = '<span class="log-line log-info">[INIT] Initializing n8n Autonomous Orchestrator v2.1...</span>';

    const logSteps = [
      { text: "[CRON] Scheduled heartbeat trigger received (interval: 30m)", delay: 300, nodeIdx: 0 },
      { text: "[FETCH] Querying RemoteOK, Remotive & ArbeitNow APIs with verified CORS...", delay: 700, nodeIdx: 1 },
      { text: "[PARSE] 48 public tech postings ingested successfully", delay: 1100, nodeIdx: 1 },
      { text: "[MATCH] Evaluating candidate profile (Skills: Python, ML, Data Analytics, SQL)...", delay: 1500, nodeIdx: 2 },
      { text: "[FILTER] 3 high-probability matches identified (Threshold >= 85%)", delay: 1900, nodeIdx: 2 },
      { text: "[DISPATCH] Preparing 5-Channel Alert Payload (Telegram, WhatsApp, Email, Discord)...", delay: 2300, nodeIdx: 3 },
      { text: "[SUCCESS] Alerts delivered to harshitmishra1208@gmail.com & Telegram Bot in 1.4s!", delay: 2700, nodeIdx: 3 }
    ];

    for (const step of logSteps) {
      await new Promise(r => setTimeout(r, step.delay - (logSteps[logSteps.indexOf(step) - 1]?.delay || 0)));
      
      // Highlight pipeline node
      nodes.forEach(n => n.classList.remove('active-node'));
      if (nodes[step.nodeIdx]) nodes[step.nodeIdx].classList.add('active-node');

      const line = document.createElement('div');
      line.className = 'log-line ' + (step.text.includes('SUCCESS') ? 'log-success' : 'log-info');
      line.textContent = step.text;
      logTerminal.appendChild(line);
      logTerminal.scrollTop = logTerminal.scrollHeight;
    }

    // Append formatted job matches
    setTimeout(() => {
      const matchHeader = document.createElement('div');
      matchHeader.className = 'log-matches-header';
      matchHeader.innerHTML = '<strong>⚡ Top Matched Opportunities Dispatched:</strong>';
      logTerminal.appendChild(matchHeader);

      sampleLiveJobs.forEach(job => {
        const jobRow = document.createElement('div');
        jobRow.className = 'log-job-row';
        jobRow.innerHTML = `
          <div class="job-meta">
            <span class="job-title">${job.title}</span>
            <span class="job-company">${job.company} • ${job.loc}</span>
          </div>
          <div class="job-tags">${job.tag}</div>
          <span class="match-badge">${job.match} Match</span>
        `;
        logTerminal.appendChild(jobRow);
      });

      logTerminal.scrollTop = logTerminal.scrollHeight;
      runBtn.disabled = false;
      runBtn.innerHTML = 'Run Pipeline Test Again ⚡';
      if (statusBadge) statusBadge.textContent = 'STANDBY // READY';
    }, 500);
  });
}

/* ----------------------------------------------------------------
   5. CURSOR SPOTLIGHT
   ---------------------------------------------------------------- */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
  }, { passive: true });
}
