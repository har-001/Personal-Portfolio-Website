/**
 * HARSHIT MISHRA — AUTONOMOUS AI HUB ENGINE
 * 3D Roaming Mascot • 3 Dedicated Workstation Launchpads • Direct Deployment Links
 */

/* ================================================================
   SERVICE LAUNCH CONFIGURATION
   Add your live deployed webhook or app URLs here whenever ready.
   ================================================================ */
const LAUNCH_CONFIG = {
  'niva': {
    title: 'NIVA Autonomous Assistant',
    subtitle: 'Conversational Knowledge Terminal Grounded in Resume',
    icon: '🤖',
    desc: 'Grounded conversational AI assistant trained on Harshit Mishra\'s verified resume credentials, machine learning models, and engineering capabilities.',
    url: '' // Add your deployed NIVA URL here, e.g. 'https://niva.yourdomain.com'
  },
  'n8n-jobs': {
    title: 'n8n Remote Job Search Agent',
    subtitle: 'Autonomous Remote Career Radar Pipeline',
    icon: '⚡',
    desc: 'Automated multi-portal scraping workflow executing continuous job evaluations across RemoteOK, Remotive, and ArbeitNow with resume-keyword match scoring and webhook dispatch.',
    url: '' // Add your deployed n8n Job Agent URL here, e.g. 'https://n8n.yourdomain.com/webhook/job-agent'
  },
  'n8n-freelance': {
    title: 'n8n Freelance Gig Radar',
    subtitle: 'Client Contract Scanner & Automated Proposal Bot',
    icon: '💼',
    desc: 'Continuous market scanner monitoring Upwork, Freelancer, and Fiverr for Python, Computer Vision, and Data Engineering gigs with automated AI proposal drafting.',
    url: '' // Add your deployed n8n Freelance Radar URL here, e.g. 'https://n8n.yourdomain.com/webhook/freelance-radar'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initHubSpaceCanvas();
  initRoamingMascot3D();
  initWorkstationLaunchers();
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
   3. WORKSTATION LAUNCH CONTROLLER
   ---------------------------------------------------------------- */
function initWorkstationLaunchers() {
  const launchBtns = document.querySelectorAll('.hub-launch-btn');
  const modal = document.getElementById('launchConfigModal');
  const closeBtn = document.getElementById('closeLaunchModalBtn');
  const cancelBtn = document.getElementById('cancelLaunchBtn');
  const modalTitle = document.getElementById('launchModalTitle');
  const modalSub = document.getElementById('launchModalSub');
  const modalIcon = document.getElementById('launchModalIcon');
  const modalDesc = document.getElementById('launchModalDesc');
  const urlInput = document.getElementById('launchUrlInput');
  const saveBtn = document.getElementById('saveUrlBtn');
  const proceedBtn = document.getElementById('launchProceedBtn');

  let activeSystemKey = null;

  function getEffectiveUrl(key) {
    const stored = localStorage.getItem(`hub_url_${key}`);
    if (stored && stored.trim().length > 0) return stored.trim();
    if (LAUNCH_CONFIG[key] && LAUNCH_CONFIG[key].url && LAUNCH_CONFIG[key].url.trim().length > 0) {
      return LAUNCH_CONFIG[key].url.trim();
    }
    return '';
  }

  function openLaunchModal(key) {
    activeSystemKey = key;
    const config = LAUNCH_CONFIG[key];
    if (!config || !modal) return;

    const currentUrl = getEffectiveUrl(key);

    if (modalTitle) modalTitle.textContent = config.title;
    if (modalSub) modalSub.textContent = config.subtitle;
    if (modalIcon) modalIcon.textContent = config.icon;
    if (modalDesc) modalDesc.textContent = config.desc;
    if (urlInput) urlInput.value = currentUrl;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLaunchModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Handle Launch Button Clicks
  launchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-system');
      if (!key) return;

      const effectiveUrl = getEffectiveUrl(key);

      // If a valid URL has already been set, open it directly!
      if (effectiveUrl && (effectiveUrl.startsWith('http://') || effectiveUrl.startsWith('https://'))) {
        window.open(effectiveUrl, '_blank', 'noopener,noreferrer');
      } else {
        // Otherwise, open the sleek endpoint modal so the user can enter/save it or test!
        openLaunchModal(key);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLaunchModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeLaunchModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLaunchModal();
    });
  }

  // Save Endpoint Button
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (!activeSystemKey) return;
      const val = (urlInput ? urlInput.value : '').trim();
      localStorage.setItem(`hub_url_${activeSystemKey}`, val);
      saveBtn.textContent = 'Saved! ✓';
      setTimeout(() => { saveBtn.textContent = 'Save Endpoint'; }, 1800);
    });
  }

  // Proceed / Open Link Button
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      if (!activeSystemKey) return;
      let val = (urlInput ? urlInput.value : '').trim();

      if (val) {
        if (!val.startsWith('http://') && !val.startsWith('https://')) {
          val = 'https://' + val;
        }
        localStorage.setItem(`hub_url_${activeSystemKey}`, val);
        window.open(val, '_blank', 'noopener,noreferrer');
        closeLaunchModal();
      } else {
        // Fallback alert toast if no URL is provided
        urlInput.focus();
        urlInput.placeholder = 'Please enter a URL or update CONFIG in js/ai-hub.js';
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLaunchModal();
  });
}
