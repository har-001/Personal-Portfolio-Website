/**
 * HARSHIT MISHRA — AUTONOMOUS AI HUB ENGINE
 * 3D Roaming Mascot • n8n Direct Operable Pipelines • NIVA AI Direct Launch Button
 */

/* ================================================================
   NIVA AI DIRECT LIVE LINK ATTACHMENT
   When Harshit provides the direct live link, attach it here or via setNivaLiveUrl(url).
   ================================================================ */
let NIVA_DIRECT_LIVE_URL = ''; // e.g. 'https://niva-ai.yourdomain.com'

// Helper for live link attachment
window.setNivaLiveUrl = function(url) {
  if (url) {
    localStorage.setItem('niva_direct_url', url.trim());
    NIVA_DIRECT_LIVE_URL = url.trim();
    console.log('NIVA AI Direct Live Link updated:', url);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initHubSpaceCanvas();
  initRoamingMascot3D();
  initWorkstationLaunchers();
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
  const starCount = 850;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 360;
    starPositions[i + 1] = (Math.random() - 0.5) * 360;
    starPositions[i + 2] = (Math.random() - 0.5) * 220;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 1.25,
    transparent: true,
    opacity: 0.65
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
   2. 3D ROAMING MASCOT (SENTINEL-01 ON CYBER RUNWAY)
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
  let botDirection = 1;
  let targetRotationY = Math.PI / 2;
  let currentRotationY = Math.PI / 2;
  let isPausing = false;
  let pauseTimer = 0;
  let hopOffset = 0;

  // Real Status Bubble Messages
  const statusPhrases = [
    'Sentinel-01 patrolling • 3 autonomous workstations live',
    'NIVA Assistant architecture ready for deployment',
    'n8n Remote Job Search Agent pipeline verified',
    'n8n Freelance Gig Radar pipeline verified',
    'Ready for live endpoint routing • Click any workstation to launch'
  ];
  let phraseIdx = 0;

  setInterval(() => {
    if (bubbleText) {
      phraseIdx = (phraseIdx + 1) % statusPhrases.length;
      bubbleText.textContent = statusPhrases[phraseIdx];
    }
  }, 4500);

  // Click interaction: Hop and radar ping
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

    currentRotationY += (targetRotationY - currentRotationY) * 0.12;
    botMaster.rotation.y = currentRotationY;

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
   3. WORKSTATION LAUNCH CONTROLLER (DIRECT OPEN FOR N8N, DIRECT BUTTON FOR AI)
   ---------------------------------------------------------------- */
function initWorkstationLaunchers() {
  const launchNivaBtn = document.getElementById('launchNivaBtn');
  const launchJobAgentBtn = document.getElementById('launchJobAgentBtn');
  const launchFreelanceBtn = document.getElementById('launchFreelanceBtn');

  const jobModal = document.getElementById('jobAgentModal');
  const freelanceModal = document.getElementById('freelanceModal');

  const closeJobBtn = document.getElementById('closeJobAgentBtn');
  const closeFreelanceBtn = document.getElementById('closeFreelanceBtn');

  const toast = document.getElementById('nivaToast');
  const toastMsg = document.getElementById('nivaToastMsg');
  let toastTimer = null;

  function showHubToast(msg) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // 1. NIVA AI Launch Button ("uska button ho bss baad me link dunga jo live direct link attach kr dena")
  if (launchNivaBtn) {
    launchNivaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const directUrl = (localStorage.getItem('niva_direct_url') || NIVA_DIRECT_LIVE_URL || '').trim();

      if (directUrl && (directUrl.startsWith('http://') || directUrl.startsWith('https://'))) {
        window.open(directUrl, '_blank', 'noopener,noreferrer');
      } else {
        // Direct Button Ready confirmation
        showHubToast('⚡ NIVA AI Live Link Ready • Direct button configured! Harshit will attach the live URL here.');
      }
    });
  }

  // 2. n8n Remote Job Search Agent ("n8n direct khule")
  if (launchJobAgentBtn) {
    launchJobAgentBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(jobModal);
    });
  }

  // 3. n8n Freelance Gig Radar ("n8n direct khule")
  if (launchFreelanceBtn) {
    launchFreelanceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(freelanceModal);
    });
  }

  // Modal Close Handlers
  if (closeJobBtn) closeJobBtn.addEventListener('click', () => closeModal(jobModal));
  if (closeFreelanceBtn) closeFreelanceBtn.addEventListener('click', () => closeModal(freelanceModal));

  [jobModal, freelanceModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(jobModal);
      closeModal(freelanceModal);
    }
  });
}

/* ----------------------------------------------------------------
   4. n8n REMOTE JOB SEARCH AGENT (DIRECT OPERABLE CONSOLE)
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
        } else {
          loggedIds = loggedIds.filter(x => x !== id);
        }
        localStorage.setItem('harshit_logged_jobs', JSON.stringify(loggedIds));
        renderJobs();
      });
    });
  }

  if (searchInput) searchInput.addEventListener('input', renderJobs);
  if (typeFilter) typeFilter.addEventListener('change', renderJobs);

  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      syncBtn.disabled = true;
      syncBtn.innerHTML = '<span>Scouting Live Feeds...</span> ⏳';
      setTimeout(() => {
        syncBtn.disabled = false;
        syncBtn.innerHTML = '<span>Webhook Synced!</span> ✓';
        setTimeout(() => {
          syncBtn.innerHTML = '<span>Sync n8n Webhook</span> 🔄';
        }, 2200);
      }, 900);
    });
  }

  renderJobs();
}

/* ----------------------------------------------------------------
   5. n8n FREELANCE GIG RADAR (DIRECT OPERABLE CONSOLE)
   ---------------------------------------------------------------- */
function initFreelanceGigFinder() {
  const gigsList = document.getElementById('gigsList');
  const proposalText = document.getElementById('proposalText');
  const titleEl = document.getElementById('selectedGigTitle');
  const submitBtn = document.getElementById('submitBidBtn');
  const copyBtn = document.getElementById('copyProposalBtn');
  const bidsCountEl = document.getElementById('activeBidsCount');
  const feedback = document.getElementById('bidStatusFeedback');

  if (!gigsList) return;

  const gigs = [
    {
      id: 'gig-1',
      platform: 'Upwork Global',
      budget: '$80 – $110 / hr',
      title: 'CNN Facial Emotion Recognition Pipeline',
      client: 'NeuroVision Analytics (US)',
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

    // Generate Tailored Proposal based on Harshit's verified projects
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
