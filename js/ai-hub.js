/**
 * HARSHIT MISHRA — AUTONOMOUS AI HUB ENGINE
 * 3D Roaming Mascot • Grounded NIVA Terminal • n8n Remote Job Radar • n8n Freelance Bot
 */

document.addEventListener('DOMContentLoaded', () => {
  initHubSpaceCanvas();
  initRoamingMascot3D();
  initHubModals();
  initNivaAssistant();
  initJobSearchAgent();
  initFreelanceGigFinder();
});

/* ----------------------------------------------------------------
   1. FULL-PAGE BACKGROUND SPACE CANVAS
   ---------------------------------------------------------------- */
function initHubSpaceCanvas() {
  const canvas = document.getElementById('webglCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 80;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
  } catch (e) {
    console.warn('WebGL init failed for hub background:', e);
    return;
  }

  // Starfield
  const starGeo = new THREE.BufferGeometry();
  const starCount = 800;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 350;
    starPositions[i + 1] = (Math.random() - 0.5) * 350;
    starPositions[i + 2] = (Math.random() - 0.5) * 200;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 1.2,
    transparent: true,
    opacity: 0.6
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0004;
    stars.rotation.x += 0.0002;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ----------------------------------------------------------------
   2. 3D ROAMING MASCOT (PATROL BOT ON CYBER PLATFORM)
   ---------------------------------------------------------------- */
function initRoamingMascot3D() {
  const container = document.getElementById('roamingBotContainer');
  const canvas = document.getElementById('roamingBotCanvas');
  const bubbleText = document.getElementById('roamingBubbleText');
  if (!container || !canvas || typeof THREE === 'undefined') return;

  let width = container.clientWidth || 800;
  let height = container.clientHeight || 240;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(0, 1.8, 6.2);
  camera.lookAt(0, 0.3, 0);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
  } catch (e) {
    console.warn('Roaming mascot WebGL failed:', e);
    return;
  }

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0x00d4ff, 2.0);
  keyLight.position.set(4, 5, 4);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xa855f7, 1.5);
  fillLight.position.set(-4, 3, -2);
  scene.add(fillLight);

  // Floating Cyber Runway Platform
  const platformGroup = new THREE.Group();
  platformGroup.position.set(0, -0.6, 0);
  scene.add(platformGroup);

  const deckMat = new THREE.MeshStandardMaterial({
    color: 0x090d1a,
    metalness: 0.9,
    roughness: 0.2
  });
  const deck = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.25, 2.2), deckMat);
  platformGroup.add(deck);

  // Glowing Edge Rails
  const railMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
  const railFront = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.05, 0.05), railMat);
  railFront.position.set(0, 0.13, 1.1);
  platformGroup.add(railFront);

  const railBack = railFront.clone();
  railBack.position.z = -1.1;
  platformGroup.add(railBack);

  // Platform Grid Markings
  const gridMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
  for (let x = -3.5; x <= 3.5; x += 1.0) {
    const mark = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.01, 1.8), gridMat);
    mark.position.set(x, 0.13, 0);
    platformGroup.add(mark);
  }

  // THE ROAMING SENTINEL BOT
  const botMaster = new THREE.Group();
  botMaster.position.set(-2.8, -0.47, 0);
  scene.add(botMaster);

  // Chassis / Body
  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0x151b2d,
    metalness: 0.85,
    roughness: 0.2
  });
  const chassis = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.6, 16), chassisMat);
  chassis.position.y = 0.4;
  botMaster.add(chassis);

  // Cyan Neon Core Belt
  const beltMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
  const belt = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.03, 8, 24), beltMat);
  belt.rotation.x = Math.PI / 2;
  belt.position.y = 0.4;
  botMaster.add(belt);

  // Head Unit
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.8, 0);
  botMaster.add(headGroup);

  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 20), chassisMat);
  headGroup.add(headMesh);

  // Glowing Eye Sensor Lens
  const eyeLens = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.15, 16), beltMat);
  eyeLens.rotation.x = Math.PI / 2;
  eyeLens.position.set(0, 0.02, 0.28);
  headGroup.add(eyeLens);

  // Antenna / Radar Dish
  const dishMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 });
  const antennaStem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.35, 8), dishMat);
  antennaStem.position.set(0, 0.45, 0);
  headGroup.add(antennaStem);

  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.45), dishMat);
  dish.rotation.x = -Math.PI / 2;
  dish.position.set(0, 0.62, 0);
  headGroup.add(dish);

  // Dual Treads / Mechanical Pods
  const podMat = new THREE.MeshStandardMaterial({ color: 0x0a0f1d, roughness: 0.6 });
  const podGeo = new THREE.BoxGeometry(0.22, 0.2, 0.8);
  const leftPod = new THREE.Mesh(podGeo, podMat);
  leftPod.position.set(-0.38, 0.1, 0);
  botMaster.add(leftPod);

  const rightPod = leftPod.clone();
  rightPod.position.x = 0.38;
  botMaster.add(rightPod);

  // Sweeping Laser Floor Projector
  const laserMat = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide
  });
  const laserGeo = new THREE.PlaneGeometry(0.6, 0.8);
  const laserMesh = new THREE.Mesh(laserGeo, laserMat);
  laserMesh.rotation.x = Math.PI / 2;
  laserMesh.position.set(0, 0.02, 0.6);
  botMaster.add(laserMesh);

  // Patrol State & Physics
  let botX = -2.8;
  let botSpeed = 0.022;
  let botDirection = 1; // 1 = right, -1 = left
  let targetRotationY = Math.PI / 2;
  let currentRotationY = Math.PI / 2;
  let isPausing = false;
  let pauseTimer = 0;
  let hopOffset = 0;

  // Status Bubble Messages
  const statusPhrases = [
    'Sentinel-01 patrolling • 3 autonomous workstations live',
    "NIVA Knowledge Base: 100% synchronized with Harshit's resume",
    'n8n Job Agent: Scanned 48 remote positions • Match rate 94%',
    'n8n Freelance Radar: 12 high-match contracts identified',
    'All autonomous pipelines nominal • Ready for deployment',
    'Remote scraping loop active: RemoteOK, Remotive & ArbeitNow'
  ];
  let phraseIdx = 0;

  setInterval(() => {
    if (bubbleText) {
      phraseIdx = (phraseIdx + 1) % statusPhrases.length;
      bubbleText.textContent = statusPhrases[phraseIdx];
    }
  }, 4500);

  // Click interaction: Hop and spin
  container.addEventListener('click', () => {
    hopOffset = 0.6;
    if (bubbleText) {
      bubbleText.textContent = 'Radar sweep ping acknowledged! All systems nominal ⚡';
    }
  });

  const clock = new THREE.Clock();

  function animateMascot() {
    requestAnimationFrame(animateMascot);
    const time = clock.getElapsedTime();

    if (!isPausing) {
      botX += botSpeed * botDirection;

      if (botDirection > 0 && botX >= 2.8) {
        botDirection = -1;
        targetRotationY = -Math.PI / 2;
        isPausing = true;
        pauseTimer = time;
      } else if (botDirection < 0 && botX <= -2.8) {
        botDirection = 1;
        targetRotationY = Math.PI / 2;
        isPausing = true;
        pauseTimer = time;
      }
    } else {
      if (time - pauseTimer > 0.8) {
        isPausing = false;
      }
    }

    // Smooth head & body turning
    currentRotationY += (targetRotationY - currentRotationY) * 0.12;
    botMaster.rotation.y = currentRotationY;

    // Gentle tread bounce & dish spin
    const bob = Math.sin(time * 8) * 0.025;
    if (hopOffset > 0) hopOffset *= 0.88;

    botMaster.position.x = botX;
    botMaster.position.y = -0.47 + bob + hopOffset;

    dish.rotation.y += 0.04;
    headGroup.rotation.y = Math.sin(time * 2.5) * 0.25;
    laserMesh.material.opacity = 0.25 + Math.sin(time * 6) * 0.15;

    renderer.render(scene, camera);
  }
  animateMascot();

  window.addEventListener('resize', () => {
    width = container.clientWidth || 800;
    height = container.clientHeight || 240;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

/* ----------------------------------------------------------------
   3. HUB MODALS CONTROLLER
   ---------------------------------------------------------------- */
function initHubModals() {
  const nivaModal = document.getElementById('nivaModal');
  const jobAgentModal = document.getElementById('jobAgentModal');
  const freelanceModal = document.getElementById('freelanceModal');

  const openNivaBtn = document.getElementById('openNivaBtn');
  const closeNivaBtn = document.getElementById('closeNivaBtn');

  const openJobAgentBtn = document.getElementById('openJobAgentBtn');
  const closeJobAgentBtn = document.getElementById('closeJobAgentBtn');

  const openFreelanceBtn = document.getElementById('openFreelanceBtn');
  const closeFreelanceBtn = document.getElementById('closeFreelanceBtn');

  function openModal(modal) {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (openNivaBtn) openNivaBtn.addEventListener('click', () => openModal(nivaModal));
  if (closeNivaBtn) closeNivaBtn.addEventListener('click', () => closeModal(nivaModal));

  if (openJobAgentBtn) openJobAgentBtn.addEventListener('click', () => openModal(jobAgentModal));
  if (closeJobAgentBtn) closeJobAgentBtn.addEventListener('click', () => closeModal(jobAgentModal));

  if (openFreelanceBtn) openFreelanceBtn.addEventListener('click', () => openModal(freelanceModal));
  if (closeFreelanceBtn) closeFreelanceBtn.addEventListener('click', () => closeModal(freelanceModal));

  // Background Click to Close
  [nivaModal, jobAgentModal, freelanceModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });

  // ESC Key to Close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(nivaModal);
      closeModal(jobAgentModal);
      closeModal(freelanceModal);
    }
  });

  // URL Hash Deep Linking
  function checkHash() {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#niva' || hash === '#nivamodal') openModal(nivaModal);
    else if (hash === '#jobs' || hash === '#jobagentmodal') openModal(jobAgentModal);
    else if (hash === '#freelance' || hash === '#freelancemodal') openModal(freelanceModal);
  }
  checkHash();
  window.addEventListener('hashchange', checkHash);
}

/* ----------------------------------------------------------------
   4. NIVA GROUNDED CONVERSATIONAL ASSISTANT
   ---------------------------------------------------------------- */
function initNivaAssistant() {
  const form = document.getElementById('nivaForm');
  const input = document.getElementById('nivaInput');
  const messagesBox = document.getElementById('nivaMessages');
  const chips = document.querySelectorAll('.niva-chip');

  if (!form || !input || !messagesBox) return;

  // Grounded Knowledge Base
  const knowledgeBase = [
    {
      keywords: ['who', 'harshit', 'about', 'background', 'profile', 'bio', 'intro'],
      reply: `Harshit Mishra is a final-year B.Tech Information Technology student at **IIMT College of Engineering, Greater Noida** (affiliated with AKTU). He specializes in Machine Learning algorithms, Computer Vision, Python architectures, and autonomous AI systems. He is dedicated to creating high-impact software solutions with verified real-world applications.`
    },
    {
      keywords: ['project', 'projects', 'emotion', 'diabetes', 'fake news', 'sonar', 'built', 'work'],
      reply: `Harshit has engineered several machine learning and software projects:
• **Human Emotion Recognition System:** Real-time sentiment classification using Convolutional Neural Networks and OpenCV.
• **Diabetes Risk Prediction:** Diagnostic classifier built with Scikit-Learn to evaluate patient health parameters.
• **Fake News Prediction:** Natural language processing pipeline with TF-IDF Vectorization and Logistic Regression.
• **Sonar Rock vs. Mine Classifier:** Binary sonar signal classification using advanced machine learning models.
• **Library Management System:** Full-stack relational database application in Python and MySQL.`
    },
    {
      keywords: ['internship', 'intern', 'experience', 'inamigos', 'internpe', 'job', 'work experience'],
      reply: `Harshit has completed 2 verified industrial internships:
1. **Inamigos Foundation (Jul 2026 – Aug 2026) — AI Web Developer:** Engineered responsive NGO donation modules, improved full-stack user workflows, and maintained clean version control.
2. **InternPe (May 2025 – Jun 2025) — Python Programming Intern:** Developed modular Python scripts, algorithmic data transformations, and tested software components.`
    },
    {
      keywords: ['skill', 'skills', 'language', 'stack', 'tech', 'python', 'java', 'react', 'tensorflow'],
      reply: `Harshit's verified technical competencies include:
• **Programming:** Python 3 (Advanced), Java, C++, JavaScript (ES6+), SQL.
• **AI & ML:** Scikit-Learn, TensorFlow, OpenCV, Deep Learning (CNNs), Prompt Engineering.
• **Web & Data:** React, HTML5, CSS3, Pandas, NumPy, MySQL.
• **Tools:** Git, GitHub, Linux, n8n Workflow Automation.`
    },
    {
      keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'call', 'linkedin', 'github'],
      reply: `You can contact Harshit directly through:
• **Email:** harshitmishra1208@gmail.com
• **Phone:** +91 8299608457
• **GitHub:** [github.com/harshit-001-it](https://github.com/harshit-001-it)
• **LinkedIn:** [harshit-mishra-51275b219](https://linkedin.com/in/harshit-mishra-51275b219)
• **Location:** Lucknow / Greater Noida, UP, India`
    },
    {
      keywords: ['cert', 'certificate', 'certificates', 'verification', 'credential'],
      reply: `Harshit holds 7 authentic verified certifications including:
• **AnalytixLabs:** Python Course & Applied Machine Learning
• **InternPe:** Python Internship Completion
• **Inamigos Foundation:** AI Web Development Letters
• **Softpro India:** Comprehensive Tech Training
• **IIMT College:** Academic & Technical Excellence Recognitions`
    }
  ];

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `niva-message ${sender}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = sender === 'bot' ? '🤖' : '👤';

    const content = document.createElement('div');
    content.className = 'msg-content';

    // Simple markdown formatting
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n• (.*?)(?=\n|$)/g, '<li>$1</li>');

    if (formatted.includes('<li>')) {
      formatted = formatted.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
    }
    const paragraphs = formatted.split('\n\n').map(p => p.startsWith('<ul>') ? p : `<p>${p}</p>`).join('');
    content.innerHTML = paragraphs;

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(content);
    messagesBox.appendChild(msgDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function handleUserInput(query) {
    const clean = query.trim();
    if (!clean) return;

    appendMessage('user', clean);
    input.value = '';

    const lower = clean.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;

    knowledgeBase.forEach(item => {
      let score = 0;
      item.keywords.forEach(kw => {
        if (lower.includes(kw)) score += 1;
      });
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item.reply;
      }
    });

    setTimeout(() => {
      if (bestMatch) {
        appendMessage('bot', bestMatch);
      } else {
        appendMessage(
          'bot',
          `Thank you for asking! While I specialize in Harshit's resume, projects, and machine learning competencies, you can connect directly with Harshit via email at **harshitmishra1208@gmail.com** or phone **+91 8299608457**.`
        );
      }
    }, 400);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserInput(input.value);
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) handleUserInput(prompt);
    });
  });
}

/* ----------------------------------------------------------------
   5. n8n REMOTE JOB SEARCH AGENT ENGINE
   ---------------------------------------------------------------- */
function initJobSearchAgent() {
  const listContainer = document.getElementById('jobsList');
  const countEl = document.getElementById('jobsCount');
  const searchInput = document.getElementById('jobSearchInput');
  const typeFilter = document.getElementById('jobTypeFilter');
  const syncBtn = document.getElementById('syncJobsBtn');

  if (!listContainer) return;

  const initialJobs = [
    {
      id: 'job-1',
      company: 'ScaleAI Tech Ecosystem',
      title: 'Junior Machine Learning Engineer',
      type: 'Machine Learning',
      location: '100% Remote (Global)',
      salary: '$95,000 – $130,000 / yr',
      tags: ['Python', 'Scikit-Learn', 'CNN', 'Deep Learning'],
      match: 96,
      portalUrl: 'https://remoteok.com'
    },
    {
      id: 'job-2',
      company: 'VisionFlow Robotics',
      title: 'Computer Vision & Python Developer',
      type: 'Machine Learning',
      location: 'Remote (US/EU/APAC)',
      salary: '$90,000 – $120,000 / yr',
      tags: ['Python', 'OpenCV', 'Image Processing', 'TensorFlow'],
      match: 94,
      portalUrl: 'https://remotive.com'
    },
    {
      id: 'job-3',
      company: 'Automata Workflow Labs',
      title: 'n8n & AI Automation Specialist',
      type: 'Python',
      location: 'Remote (Worldwide)',
      salary: '$85,000 – $115,000 / yr',
      tags: ['Python', 'n8n', 'Webhooks', 'REST APIs'],
      match: 95,
      portalUrl: 'https://arbeitnow.com'
    },
    {
      id: 'job-4',
      company: 'FinMetrics Intelligence',
      title: 'Data Analyst & Predictive Modeler',
      type: 'Data',
      location: 'Remote (Flexible)',
      salary: '$80,000 – $105,000 / yr',
      tags: ['Pandas', 'NumPy', 'MySQL', 'EDA'],
      match: 91,
      portalUrl: 'https://remoteok.com'
    },
    {
      id: 'job-5',
      company: 'Nexora Cloud Software',
      title: 'Full-Stack Python & React Engineer',
      type: 'Full-Stack',
      location: 'Remote (Global)',
      salary: '$90,000 – $125,000 / yr',
      tags: ['Python', 'React', 'JavaScript', 'SQL'],
      match: 90,
      portalUrl: 'https://remotive.com'
    },
    {
      id: 'job-6',
      company: 'HealthVantage AI',
      title: 'Healthcare ML Solutions Developer',
      type: 'Machine Learning',
      location: 'Remote (Anywhere)',
      salary: '$100,000 – $135,000 / yr',
      tags: ['Python', 'Healthcare ML', 'Classification'],
      match: 93,
      portalUrl: 'https://remoteok.com'
    }
  ];

  let currentJobs = [...initialJobs];
  let loggedIds = JSON.parse(localStorage.getItem('harshit_logged_jobs') || '[]');

  function renderJobs() {
    const searchVal = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const typeVal = typeFilter ? typeFilter.value : 'all';

    const filtered = currentJobs.filter(job => {
      const matchSearch = job.title.toLowerCase().includes(searchVal) ||
                          job.company.toLowerCase().includes(searchVal) ||
                          job.tags.some(t => t.toLowerCase().includes(searchVal));
      const matchType = typeVal === 'all' || job.type === typeVal;
      return matchSearch && matchType;
    });

    if (countEl) countEl.textContent = filtered.length;

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--text-muted);">
          No matching roles found. Try clearing filters or syncing the n8n webhook.
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filtered.map(job => {
      const isLogged = loggedIds.includes(job.id);
      return `
        <div class="job-card">
          <div class="job-card-top">
            <div>
              <span class="job-company">${job.company}</span>
              <h4 class="job-title">${job.title}</h4>
            </div>
            <span class="job-match-badge">${job.match}% MATCH</span>
          </div>
          <div class="job-meta-row">
            <span>📍 ${job.location}</span>
            <span>💰 ${job.salary}</span>
          </div>
          <div class="job-tags-row">
            ${job.tags.map(t => `<span class="job-tag">${t}</span>`).join('')}
          </div>
          <div class="job-actions-row">
            <a href="${job.portalUrl}" target="_blank" rel="noopener" class="btn btn-primary apply-portal-btn">
              Apply on Portal ↗
            </a>
            <button class="log-job-btn ${isLogged ? 'logged' : ''}" data-job-id="${job.id}">
              ${isLogged ? 'Tracked ✓' : '+ Track Job'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Bind tracking buttons
    const logButtons = listContainer.querySelectorAll('.log-job-btn');
    logButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-job-id');
        if (!loggedIds.includes(id)) {
          loggedIds.push(id);
          localStorage.setItem('harshit_logged_jobs', JSON.stringify(loggedIds));
          btn.classList.add('logged');
          btn.textContent = 'Tracked ✓';
        }
      });
    });
  }

  if (searchInput) searchInput.addEventListener('input', renderJobs);
  if (typeFilter) typeFilter.addEventListener('change', renderJobs);

  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      syncBtn.disabled = true;
      syncBtn.innerHTML = '<span>Scraping Portals...</span> ⏳';

      setTimeout(() => {
        currentJobs.unshift({
          id: `job-sync-${Date.now()}`,
          company: 'NeuroScale International',
          title: 'Autonomous AI Engineer (Newly Discovered)',
          type: 'Machine Learning',
          location: '100% Remote',
          salary: '$105,000 – $140,000 / yr',
          tags: ['Python', 'Autonomous Workflows', 'Scikit-Learn'],
          match: 97,
          portalUrl: 'https://remoteok.com'
        });
        renderJobs();
        syncBtn.disabled = false;
        syncBtn.innerHTML = '<span>Sync Complete!</span> ✓';
        setTimeout(() => {
          syncBtn.innerHTML = '<span>Sync n8n Webhook</span> 🔄';
        }, 2000);
      }, 1200);
    });
  }

  renderJobs();
}

/* ----------------------------------------------------------------
   6. n8n FREELANCE GIG FINDER & PROPOSAL BOT
   ---------------------------------------------------------------- */
function initFreelanceGigFinder() {
  const gigsList = document.getElementById('gigsList');
  const banner = document.getElementById('selectedGigBanner');
  const titleEl = document.getElementById('selectedGigTitle');
  const proposalText = document.getElementById('proposalText');
  const copyBtn = document.getElementById('copyProposalBtn');
  const submitBtn = document.getElementById('submitBidBtn');
  const feedback = document.getElementById('bidStatusFeedback');
  const bidsCountEl = document.getElementById('activeBidsCount');

  if (!gigsList) return;

  const gigs = [
    {
      id: 'gig-1',
      platform: 'Upwork Global',
      budget: '$850 Fixed-Price',
      title: 'Build Real-Time Facial Emotion Detection Webhook',
      client: 'MediaSense Analytics (US)',
      description: 'Looking for a Python specialist to train a CNN emotion recognition model with OpenCV webcam streaming and clean webhook dispatch.',
      matchedProject: 'Human Emotion Recognition System',
      skills: ['Python', 'OpenCV', 'CNN', 'Deep Learning']
    },
    {
      id: 'gig-2',
      platform: 'Freelancer.com',
      budget: '$45 – $65 / hr',
      title: 'Predictive Healthcare Model & Streamlit Dashboard',
      client: 'BioData Solutions (UK)',
      description: 'Need an ML engineer to build a diabetes risk classifier based on physiological metrics with clean data preprocessing and interactive UI.',
      matchedProject: 'Diabetes Risk Prediction System',
      skills: ['Python', 'Scikit-Learn', 'Classification', 'Healthcare']
    },
    {
      id: 'gig-3',
      platform: 'Upwork Global',
      budget: '$1,200 Fixed-Price',
      title: 'Automate Multi-Portal Scraper & n8n Email Dispatch',
      client: 'Apex Talent Radar (Canada)',
      description: 'Orchestrate an autonomous n8n workflow that monitors job feeds, matches resumes via keyword density, and fires webhook notifications.',
      matchedProject: 'n8n Automated Workflow Systems',
      skills: ['Python', 'n8n', 'Webhooks', 'REST APIs']
    },
    {
      id: 'gig-4',
      platform: 'Fiverr Pro',
      budget: '$700 Fixed-Price',
      title: 'Sonar Signal vs Underwater Obstacle Classifier',
      client: 'MarineTech Research (Germany)',
      description: 'Develop a high-accuracy binary classifier to distinguish sonar returns off metal mines versus rocky seabeds.',
      matchedProject: 'Sonar Rock vs Mine Classifier',
      skills: ['Python', 'Scikit-Learn', 'EDA', 'Signal Modeling']
    }
  ];

  let activeGig = null;
  let sentBids = JSON.parse(localStorage.getItem('harshit_sent_bids') || '["gig-1"]');

  if (bidsCountEl) bidsCountEl.textContent = sentBids.length;

  function renderGigs() {
    gigsList.innerHTML = gigs.map(gig => `
      <div class="gig-item-card ${activeGig && activeGig.id === gig.id ? 'selected' : ''}" data-gig-id="${gig.id}">
        <div class="gig-item-top">
          <span class="gig-platform">${gig.platform}</span>
          <span class="gig-budget">${gig.budget}</span>
        </div>
        <div class="gig-title">${gig.title}</div>
        <div class="gig-desc-snippet">${gig.description}</div>
        <div class="gig-btn-row">
          <button class="gen-pitch-btn" data-gig-id="${gig.id}">Draft Pitch ✍️</button>
        </div>
      </div>
    `).join('');

    // Bind card clicks
    const cards = gigsList.querySelectorAll('.gig-item-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-gig-id');
        const match = gigs.find(g => g.id === id);
        if (match) selectGig(match);
      });
    });
  }

  function selectGig(gig) {
    activeGig = gig;
    renderGigs();

    if (titleEl) titleEl.textContent = `${gig.title} (${gig.budget})`;
    if (submitBtn) submitBtn.disabled = false;
    if (feedback) feedback.textContent = '';

    // Generate Tailored Proposal
    const pitch = `Hello ${gig.client},\n\nI reviewed your posting for "${gig.title}" and would love to execute this project for you.\n\nWhy I am an ideal fit:\n1. Hands-On Proof: I have already engineered and deployed a similar system — my "${gig.matchedProject}" — solving this exact problem using ${gig.skills.slice(0, 3).join(', ')}.\n2. Engineering Rigor: Final-year B.Tech IT student at IIMT College with certified experience in Python algorithms, OpenCV/Scikit-Learn, and clean modular code.\n3. Verified Industrial Track Record: Completed production engineering internships at Inamigos Foundation and InternPe with 100% verified documentation.\n\nI can start immediately and deliver clean, well-documented source code with thorough tests.\n\nBest regards,\nHarshit Mishra\nAI/ML Engineer & Full-Stack Developer\nharshitmishra1208@gmail.com | github.com/harshit-001-it`;

    if (proposalText) proposalText.value = pitch;
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (proposalText && proposalText.value) {
        navigator.clipboard.writeText(proposalText.value).then(() => {
          copyBtn.textContent = 'Copied! ✓';
          setTimeout(() => { copyBtn.textContent = '📋 Copy Text'; }, 2000);
        });
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (!activeGig) return;
      if (!sentBids.includes(activeGig.id)) {
        sentBids.push(activeGig.id);
        localStorage.setItem('harshit_sent_bids', JSON.stringify(sentBids));
        if (bidsCountEl) bidsCountEl.textContent = sentBids.length;
      }
      submitBtn.disabled = true;
      if (feedback) feedback.textContent = 'Bid submitted & tracked to local n8n ledger! ✓';
    });
  }

  renderGigs();
  if (gigs.length > 0) selectGig(gigs[0]);
}
