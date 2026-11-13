/* ================================================================
   HARSHIT MISHRA — MAIN APPLICATION SCRIPT (VERIFIED REAL DATA)
   Hardware-Accelerated Three.js Universe • Physical Acrylic & Titanium Badge
   Tactile Lanyard Physics • 3D Card Tilt • 100% Authentic Resume Data
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initTypewriter();
  initFullPageSpace3D();
  initPhysicalTitaniumIDCard();
  initDynamic3DCardTilt();
  initRevealAnimations();
  initCounters();
  renderEducation();
  renderSkills();
  initSkillModal();
  renderProjects();
  renderCertificates();
  initCertificateModal();
  initContactForm();
  initThemeToggle();
});

/* ----------------------------------------------------------------
   1. SCROLL PROGRESS BAR
   ---------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ----------------------------------------------------------------
   2. NAVBAR & SCROLLSPY
   ---------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let currentId = 'hero';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ----------------------------------------------------------------
   3. MOBILE DRAWER MENU
   ---------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

/* ----------------------------------------------------------------
   4. TYPEWRITER EFFECT
   ---------------------------------------------------------------- */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  // Authentic specializations strictly from Harshit's resume
  const phrases = [
    'Machine Learning',
    'Python Architecture',
    'Neural Networks',
    'TensorFlow Modeling',
    'Computer Vision',
    'Full-Stack Systems'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 45;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 350;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ----------------------------------------------------------------
   5. FULL-PAGE THREE.JS BACKGROUND (DYNAMIC PARTICLE UNIVERSE)
   ---------------------------------------------------------------- */
function initFullPageSpace3D() {
  const canvas = document.getElementById('webglCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
  } catch (e) {
    console.warn('WebGL initialization failed for background:', e);
    return;
  }

  // Multi-tier Starfield & Quantum Nodes
  const starCount = 950;
  const starGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  const cyan = new THREE.Color(0x00d4ff);
  const violet = new THREE.Color(0x8b5cf6);
  const white = new THREE.Color(0xffffff);

  for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 450;
    starPositions[i + 1] = (Math.random() - 0.5) * 450;
    starPositions[i + 2] = (Math.random() - 0.5) * 300;

    const rnd = Math.random();
    const c = rnd > 0.6 ? cyan : (rnd > 0.3 ? violet : white);
    starColors[i] = c.r;
    starColors[i + 1] = c.g;
    starColors[i + 2] = c.b;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 1.4,
    vertexColors: true,
    transparent: true,
    opacity: 0.65
  });

  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  // Floating Cyber Geometric Rings
  const ringGeo = new THREE.TorusGeometry(32, 0.4, 8, 48);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    wireframe: true,
    transparent: true,
    opacity: 0.12
  });
  const floatingRing1 = new THREE.Mesh(ringGeo, ringMat);
  floatingRing1.position.set(-60, 20, -50);
  scene.add(floatingRing1);

  const floatingRing2 = floatingRing1.clone();
  floatingRing2.material = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.1
  });
  floatingRing2.position.set(70, -40, -60);
  scene.add(floatingRing2);

  // Mouse Parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetCamX = 0;
  let targetCamY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetCamX = mouseX * 8;
    targetCamY = mouseY * 8;
  }, { passive: true });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    camera.position.x += (targetCamX - camera.position.x) * 0.05;
    camera.position.y += (targetCamY - camera.position.y) * 0.05;

    starField.rotation.y = elapsed * 0.015;
    starField.rotation.x = elapsed * 0.008;

    floatingRing1.rotation.x = elapsed * 0.15;
    floatingRing1.rotation.y = elapsed * 0.2;
    floatingRing2.rotation.y = -elapsed * 0.18;
    floatingRing2.rotation.z = elapsed * 0.12;

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
   6. ULTRA-REALISTIC PHYSICAL ID CARD WITH ACRYLIC CASE & LANYARD
   ---------------------------------------------------------------- */
function initPhysicalTitaniumIDCard() {
  const stage = document.getElementById('idCardStage');
  const fallback = document.getElementById('idCardFallback');
  const resetBtn = document.getElementById('cardResetBtn');
  const hintBadge = document.getElementById('cardHintBadge');
  const hintText = document.getElementById('cardHintText');
  const modeDock = document.getElementById('holoModeDock');

  if (!stage) return;

  if (typeof THREE === 'undefined') {
    if (fallback) fallback.style.display = 'flex';
    return;
  }

  let width = stage.clientWidth || 380;
  let height = stage.clientHeight || 540;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0.2, 5.0);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    stage.appendChild(renderer.domElement);
  } catch (e) {
    if (fallback) fallback.style.display = 'flex';
    return;
  }

  // Realistic Studio Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(3, 5, 4);
  scene.add(keyLight);

  const cyanBaseLight = new THREE.PointLight(0x00f0ff, 3.5, 8);
  cyanBaseLight.position.set(0, -1.4, 0.8);
  scene.add(cyanBaseLight);

  const violetRim = new THREE.DirectionalLight(0xa855f7, 2.0);
  violetRim.position.set(-3, 3, -3);
  scene.add(violetRim);

  const frontAccent = new THREE.PointLight(0x00d4ff, 1.8, 6);
  frontAccent.position.set(0, 0, 2.2);
  scene.add(frontAccent);

  // Dynamic Floor Shadow Texture
  function createShadowTexture() {
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 256;
    sCanvas.height = 256;
    const sCtx = sCanvas.getContext('2d');
    const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(sCanvas);
  }

  const shadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 1.6),
    new THREE.MeshBasicMaterial({
      map: createShadowTexture(),
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    })
  );
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.set(0, -1.68, 0);
  scene.add(shadowMesh);

  // 1. BASE DOCK STATION (Anti-Gravity Magnetic Pedestal)
  const baseGroup = new THREE.Group();
  baseGroup.position.set(0, -1.45, 0);
  scene.add(baseGroup);

  const titaniumMat = new THREE.MeshPhysicalMaterial({
    color: 0x0c1220,
    metalness: 0.94,
    roughness: 0.22,
    clearcoat: 0.6
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.98,
    roughness: 0.1
  });

  // Main Pedestal Cylinder
  const baseCylGeo = new THREE.CylinderGeometry(1.4, 1.65, 0.25, 36);
  const baseCyl = new THREE.Mesh(baseCylGeo, titaniumMat);
  baseGroup.add(baseCyl);

  // Top Induction Plate
  const plateGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.04, 36);
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0x111827,
    metalness: 0.8,
    roughness: 0.3
  });
  const plate = new THREE.Mesh(plateGeo, plateMat);
  plate.position.y = 0.13;
  baseGroup.add(plate);

  // Outer Glowing Induction Ring (Cyan)
  const outerRingGeo = new THREE.TorusGeometry(1.12, 0.03, 16, 48);
  const neonCyanMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const outerRing = new THREE.Mesh(outerRingGeo, neonCyanMat);
  outerRing.rotation.x = Math.PI / 2;
  outerRing.position.y = 0.15;
  baseGroup.add(outerRing);

  // Inner Glowing Induction Ring (Violet)
  const innerRingGeo = new THREE.TorusGeometry(0.72, 0.022, 16, 36);
  const neonVioletMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
  const innerRing = new THREE.Mesh(innerRingGeo, neonVioletMat);
  innerRing.rotation.x = Math.PI / 2;
  innerRing.position.y = 0.155;
  baseGroup.add(innerRing);

  // 3 Magnetic Projector Pylons
  const pylons = [];
  const beamGeo = new THREE.CylinderGeometry(0.018, 0.028, 1.25, 12);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide
  });

  for (let i = 0; i < 3; i++) {
    const angle = i * (Math.PI * 2 / 3);
    const px = Math.cos(angle) * 1.15;
    const pz = Math.sin(angle) * 1.15;

    const pylon = new THREE.Group();
    pylon.position.set(px, 0.16, pz);

    const footMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.18), titaniumMat);
    pylon.add(footMesh);

    const emitterLens = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), neonCyanMat);
    emitterLens.position.y = 0.09;
    pylon.add(emitterLens);

    baseGroup.add(pylon);
    pylons.push(pylon);

    // Containment beam stretching to floating pod
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(px * 0.7, 0.75, pz * 0.7);
    beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-px * 0.45, 1.2, -pz * 0.45).normalize());
    baseGroup.add(beam);
  }

  // Anti-Gravity Rising Particle Motes
  const PARTICLE_COUNT = 24;
  const partGeo = new THREE.SphereGeometry(0.022, 8, 8);
  const partMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.75 });
  const fluxParticles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = new THREE.Mesh(partGeo, partMat);
    p.position.set(
      (Math.random() - 0.5) * 1.6,
      Math.random() * 2.2 - 1.2,
      (Math.random() - 0.5) * 1.6
    );
    scene.add(p);
    fluxParticles.push({
      mesh: p,
      speedY: 0.008 + Math.random() * 0.012,
      baseRadius: 0.3 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02
    });
  }

  // 2. MASTER LEVITATING CYBER-CHAMBER (Floats at y = 0.05)
  const chamberGroup = new THREE.Group();
  chamberGroup.position.set(0, 0.05, 0);
  scene.add(chamberGroup);

  // Outer Hexagonal Crown Top & Bottom Caps
  const crownGeo = new THREE.CylinderGeometry(1.08, 1.15, 0.14, 6);
  const topCrown = new THREE.Mesh(crownGeo, titaniumMat);
  topCrown.position.y = 1.32;
  chamberGroup.add(topCrown);

  const bottomCrown = new THREE.Mesh(crownGeo, titaniumMat);
  bottomCrown.position.y = -1.32;
  bottomCrown.rotation.x = Math.PI;
  chamberGroup.add(bottomCrown);

  // 6 Vertical Structural Cyber Struts
  const strutGeo = new THREE.BoxGeometry(0.05, 2.5, 0.08);
  for (let i = 0; i < 6; i++) {
    const angle = i * (Math.PI / 3);
    const strut = new THREE.Mesh(strutGeo, chromeMat);
    strut.position.set(Math.cos(angle) * 1.06, 0, Math.sin(angle) * 1.06);
    strut.rotation.y = -angle;
    chamberGroup.add(strut);
  }

  // Cylindrical Cyber-Glass Shield
  const glassGeo = new THREE.CylinderGeometry(1.05, 1.05, 2.50, 32, 1, true);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
    roughness: 0.05,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transmission: 0.9,
    depthWrite: false
  });
  const glassShield = new THREE.Mesh(glassGeo, glassMat);
  chamberGroup.add(glassShield);

  // Shockwave Energy Pulse Ring
  const pulseRingGeo = new THREE.RingGeometry(0.1, 0.22, 36);
  const pulseRingMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const pulseRing = new THREE.Mesh(pulseRingGeo, pulseRingMat);
  pulseRing.position.z = 0.05;
  chamberGroup.add(pulseRing);
  let pulseActive = false;
  let pulseScale = 0.1;
  let pulseOpacity = 0;
  let pulseRecoil = 0;

  // Master Hologram Content Group inside the chamber
  const holoContentGroup = new THREE.Group();
  chamberGroup.add(holoContentGroup);

  // ===============================================================
  // MODE 1: HOLOGRAPHIC IDENTITY PASS (Holo-ID)
  // ===============================================================
  const holoPassGroup = new THREE.Group();
  holoContentGroup.add(holoPassGroup);

  const cardW = 1.42;
  const cardH = 2.15;
  const cardR = 0.12;
  const cardThick = 0.04;

  const cardShape = new THREE.Shape();
  cardShape.moveTo(-cardW / 2 + cardR, cardH / 2);
  cardShape.lineTo(cardW / 2 - cardR, cardH / 2);
  cardShape.quadraticCurveTo(cardW / 2, cardH / 2, cardW / 2, cardH / 2 - cardR);
  cardShape.lineTo(cardW / 2, -cardH / 2 + cardR);
  cardShape.quadraticCurveTo(cardW / 2, -cardH / 2, cardW / 2 - cardR, -cardH / 2);
  cardShape.lineTo(-cardW / 2 + cardR, -cardH / 2);
  cardShape.quadraticCurveTo(-cardW / 2, -cardH / 2, -cardW / 2, -cardH / 2 + cardR);
  cardShape.lineTo(-cardW / 2, cardH / 2 - cardR);
  cardShape.quadraticCurveTo(-cardW / 2, cardH / 2, -cardW / 2 + cardR, cardH / 2);

  const passGeo = new THREE.ExtrudeGeometry(cardShape, {
    depth: cardThick,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.016,
    bevelThickness: 0.016,
    curveSegments: 16
  });
  passGeo.center();

  const passCoreMesh = new THREE.Mesh(passGeo, titaniumMat);
  holoPassGroup.add(passCoreMesh);

  // Canvas Textures for Front & Back
  const frontCanvas = document.createElement('canvas');
  frontCanvas.width = 1024;
  frontCanvas.height = 1500;
  const fCtx = frontCanvas.getContext('2d');
  const frontTexture = new THREE.CanvasTexture(frontCanvas);
  frontTexture.anisotropy = 8;

  const backCanvas = document.createElement('canvas');
  backCanvas.width = 1024;
  backCanvas.height = 1500;
  const bCtx = backCanvas.getContext('2d');
  const backTexture = new THREE.CanvasTexture(backCanvas);
  backTexture.anisotropy = 8;

  const facePlaneGeo = new THREE.PlaneGeometry(cardW - 0.03, cardH - 0.03);

  const frontMat = new THREE.MeshPhysicalMaterial({
    map: frontTexture,
    transparent: true,
    roughness: 0.18,
    metalness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    reflectivity: 0.85
  });
  const frontMesh = new THREE.Mesh(facePlaneGeo, frontMat);
  frontMesh.position.z = cardThick / 2 + 0.018;
  holoPassGroup.add(frontMesh);

  const backMat = new THREE.MeshPhysicalMaterial({
    map: backTexture,
    transparent: true,
    roughness: 0.18,
    metalness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    reflectivity: 0.85
  });
  const backMesh = new THREE.Mesh(facePlaneGeo, backMat);
  backMesh.position.z = -(cardThick / 2 + 0.018);
  backMesh.rotation.y = Math.PI;
  holoPassGroup.add(backMesh);

  // Holographic Orbiting Data Rings around the pass
  const ringHolo1 = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.012, 12, 48), neonCyanMat);
  holoPassGroup.add(ringHolo1);

  const ringHolo2 = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.009, 12, 48), neonVioletMat);
  ringHolo2.rotation.x = Math.PI / 4;
  holoPassGroup.add(ringHolo2);

  // Draw Front Face of Holo-Pass
  function drawFrontFace(avatarImg) {
    const w = 1024;
    const h = 1500;
    fCtx.save();

    // Premium Luminous Midnight Cyberpunk Gradient (Rich, vibrant & high-contrast)
    const bgGrad = fCtx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#09122c');
    bgGrad.addColorStop(0.35, '#0d183f');
    bgGrad.addColorStop(0.7, '#070f26');
    bgGrad.addColorStop(1, '#14123c');
    fCtx.fillStyle = bgGrad;
    fCtx.fillRect(0, 0, w, h);

    // Glowing Holographic Card Perimeter Rim
    fCtx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
    fCtx.lineWidth = 3.5;
    fCtx.beginPath();
    fCtx.roundRect(30, 30, w - 60, h - 60, 26);
    fCtx.stroke();

    // Corner Precision Cyber Tech Brackets
    fCtx.strokeStyle = '#00f0ff';
    fCtx.lineWidth = 5;
    fCtx.beginPath();
    fCtx.moveTo(25, 75); fCtx.lineTo(25, 25); fCtx.lineTo(75, 25);
    fCtx.moveTo(w - 75, 25); fCtx.lineTo(w - 25, 25); fCtx.lineTo(w - 25, 75);
    fCtx.moveTo(25, h - 75); fCtx.lineTo(25, h - 25); fCtx.lineTo(75, h - 25);
    fCtx.moveTo(w - 75, h - 25); fCtx.lineTo(w - 25, h - 25); fCtx.lineTo(w - 25, h - 75);
    fCtx.stroke();

    // Subtle Illuminated Cyber Circuit Grid
    fCtx.strokeStyle = 'rgba(0, 212, 255, 0.18)';
    fCtx.lineWidth = 2;
    fCtx.beginPath();
    fCtx.moveTo(60, 195); fCtx.lineTo(964, 195);
    fCtx.moveTo(60, 735); fCtx.lineTo(964, 735);
    fCtx.moveTo(60, 1045); fCtx.lineTo(964, 1045);
    fCtx.stroke();

    // Circuit solder nodes
    fCtx.fillStyle = '#00f0ff';
    [120, 512, 904].forEach(nx => {
      fCtx.beginPath();
      fCtx.arc(nx, 195, 4.5, 0, Math.PI * 2);
      fCtx.fill();
      fCtx.beginPath();
      fCtx.arc(nx, 735, 4.5, 0, Math.PI * 2);
      fCtx.fill();
    });

    // Top Header: College & AKTU
    fCtx.textAlign = 'left';
    fCtx.fillStyle = '#00f0ff';
    fCtx.font = 'bold 32px "Space Grotesk", sans-serif';
    fCtx.fillText('IIMT COLLEGE OF ENGINEERING', 80, 115);

    fCtx.fillStyle = '#94a3b8';
    fCtx.font = '600 21px "JetBrains Mono", monospace';
    fCtx.fillText('AKTU // DEPT. OF INFORMATION TECHNOLOGY', 80, 150);

    // Online Status Pill
    fCtx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    fCtx.beginPath();
    fCtx.roundRect(690, 88, 250, 46, 23);
    fCtx.fill();
    fCtx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
    fCtx.lineWidth = 2;
    fCtx.stroke();

    fCtx.fillStyle = '#10b981';
    fCtx.beginPath();
    fCtx.arc(716, 111, 7, 0, Math.PI * 2);
    fCtx.fill();

    fCtx.fillStyle = '#34d399';
    fCtx.font = 'bold 19px "JetBrains Mono", monospace';
    fCtx.fillText('ONLINE // ACTIVE', 736, 118);

    // Official Portrait Frame
    const cx = 512;
    const cy = 460;
    const r = 200;

    fCtx.save();
    fCtx.beginPath();
    fCtx.arc(cx, cy, r + 8, 0, Math.PI * 2);
    fCtx.strokeStyle = '#00d4ff';
    fCtx.lineWidth = 5;
    fCtx.shadowColor = '#00d4ff';
    fCtx.shadowBlur = 20;
    fCtx.stroke();
    fCtx.restore();

    if (avatarImg && avatarImg.complete && avatarImg.naturalWidth > 0) {
      fCtx.save();
      fCtx.beginPath();
      fCtx.arc(cx, cy, r, 0, Math.PI * 2);
      fCtx.clip();
      fCtx.drawImage(avatarImg, cx - r, cy - r, r * 2, r * 2);
      fCtx.restore();
    } else {
      fCtx.fillStyle = '#1e293b';
      fCtx.beginPath();
      fCtx.arc(cx, cy, r, 0, Math.PI * 2);
      fCtx.fill();
      fCtx.fillStyle = '#ffffff';
      fCtx.font = 'bold 110px sans-serif';
      fCtx.textAlign = 'center';
      fCtx.fillText('HM', cx, cy + 35);
      fCtx.textAlign = 'left';
    }

    // Name & Title
    fCtx.textAlign = 'center';
    fCtx.fillStyle = '#ffffff';
    fCtx.font = '900 58px "Space Grotesk", sans-serif';
    fCtx.fillText('HARSHIT MISHRA', cx, 815);

    fCtx.fillStyle = '#00d4ff';
    fCtx.font = 'bold 28px "JetBrains Mono", monospace';
    fCtx.fillText('AI / ML ENGINEER & FULL-STACK DEV', cx, 865);

    fCtx.fillStyle = '#94a3b8';
    fCtx.font = '600 23px "Inter", sans-serif';
    fCtx.fillText('B.Tech CSE (IT) • IIMT College • CGPA: 6.64', cx, 912);

    // Verified Skills Badges Row
    const badges = ['PYTHON 3', 'MACHINE LEARNING', 'TENSORFLOW', 'REACT.JS'];
    let bx = 90;
    badges.forEach((b) => {
      fCtx.fillStyle = 'rgba(0, 212, 255, 0.08)';
      fCtx.beginPath();
      fCtx.roundRect(bx, 970, 195, 46, 10);
      fCtx.fill();
      fCtx.strokeStyle = 'rgba(0, 212, 255, 0.28)';
      fCtx.lineWidth = 1.5;
      fCtx.stroke();

      fCtx.fillStyle = '#e2e8f0';
      fCtx.font = 'bold 19px "JetBrains Mono", monospace';
      fCtx.fillText(b, bx + 97, 1000);
      bx += 215;
    });

    // Authentic Gold EMV Smart Chip
    fCtx.textAlign = 'left';
    const chipX = 80;
    const chipY = 1065;
    const chipW = 135;
    const chipH = 90;
    const chipGrad = fCtx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
    chipGrad.addColorStop(0, '#f59e0b');
    chipGrad.addColorStop(0.35, '#fef08a');
    chipGrad.addColorStop(0.55, '#d97706');
    chipGrad.addColorStop(0.8, '#fef08a');
    chipGrad.addColorStop(1, '#b45309');

    fCtx.fillStyle = chipGrad;
    fCtx.beginPath();
    fCtx.roundRect(chipX, chipY, chipW, chipH, 10);
    fCtx.fill();
    fCtx.strokeStyle = '#78350f';
    fCtx.lineWidth = 2;
    fCtx.stroke();

    fCtx.strokeStyle = 'rgba(120, 53, 15, 0.75)';
    fCtx.lineWidth = 2;
    fCtx.beginPath();
    fCtx.moveTo(chipX + 8, chipY + chipH / 2);
    fCtx.lineTo(chipX + chipW - 8, chipY + chipH / 2);
    fCtx.stroke();

    // Security Clearance Text
    fCtx.fillStyle = '#64748b';
    fCtx.font = 'bold 20px "JetBrains Mono", monospace';
    fCtx.fillText('CLEARANCE: LEVEL-5 ACTIVE', 240, 1105);
    fCtx.fillStyle = '#38bdf8';
    fCtx.font = '600 19px "JetBrains Mono", monospace';
    fCtx.fillText('ID: HM-2026-IT // BATCH: 2022-2026', 240, 1138);

    // Holographic Quantum Security Verification Console (Zero Barcode)
    const footX = 80;
    const footY = 1260;
    const footW = 864;
    const footH = 120;

    fCtx.fillStyle = 'rgba(0, 212, 255, 0.07)';
    fCtx.beginPath();
    fCtx.roundRect(footX, footY, footW, footH, 16);
    fCtx.fill();
    fCtx.strokeStyle = 'rgba(0, 212, 255, 0.38)';
    fCtx.lineWidth = 2;
    fCtx.stroke();

    // Left Seal: Shield Icon & Clearance Text
    fCtx.textAlign = 'left';
    fCtx.fillStyle = '#00f0ff';
    fCtx.font = 'bold 26px "Space Grotesk", sans-serif';
    fCtx.fillText('🛡️ SECURE QUANTUM ID', footX + 32, footY + 48);

    fCtx.fillStyle = '#34d399';
    fCtx.font = 'bold 20px "JetBrains Mono", monospace';
    fCtx.fillText('● BIOMETRIC-AUTHENTICATED // LEVEL-5', footX + 32, footY + 86);

    // Right Seal: Cryptographic Signature & Validity
    fCtx.textAlign = 'right';
    fCtx.fillStyle = '#cbd5e1';
    fCtx.font = '600 20px "JetBrains Mono", monospace';
    fCtx.fillText('SHA-256: 7F8E-HM26-AKTU', footX + footW - 32, footY + 48);

    fCtx.fillStyle = '#38bdf8';
    fCtx.font = '600 18px "JetBrains Mono", monospace';
    fCtx.fillText('VALIDITY: 2022 – 2026 ACTIVE', footX + footW - 32, footY + 86);

    fCtx.fillStyle = '#64748b';
    fCtx.font = '16px "JetBrains Mono", monospace';
    fCtx.textAlign = 'center';
    fCtx.fillText('ENCRYPTED HOLOGRAPHIC CREDENTIAL MATRIX // OFFICIAL AKTU ISSUANCE', 512, 1425);

    fCtx.restore();
    frontTexture.needsUpdate = true;
  }

  // Draw Back Face of Holo-Pass
  function drawBackFace() {
    const w = 1024;
    const h = 1500;
    bCtx.save();

    // Matching Premium Luminous Midnight Cyberpunk Gradient
    const bgGrad = bCtx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#09122c');
    bgGrad.addColorStop(0.35, '#0d183f');
    bgGrad.addColorStop(0.7, '#070f26');
    bgGrad.addColorStop(1, '#14123c');
    bCtx.fillStyle = bgGrad;
    bCtx.fillRect(0, 0, w, h);

    // Glowing Holographic Card Perimeter Rim
    bCtx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
    bCtx.lineWidth = 3.5;
    bCtx.beginPath();
    bCtx.roundRect(30, 30, w - 60, h - 60, 26);
    bCtx.stroke();

    // Corner Precision Cyber Tech Brackets
    bCtx.strokeStyle = '#00f0ff';
    bCtx.lineWidth = 5;
    bCtx.beginPath();
    bCtx.moveTo(25, 75); bCtx.lineTo(25, 25); bCtx.lineTo(75, 25);
    bCtx.moveTo(w - 75, 25); bCtx.lineTo(w - 25, 25); bCtx.lineTo(w - 25, 75);
    bCtx.moveTo(25, h - 75); bCtx.lineTo(25, h - 25); bCtx.lineTo(75, h - 25);
    bCtx.moveTo(w - 75, h - 25); bCtx.lineTo(w - 25, h - 25); bCtx.lineTo(w - 25, h - 75);
    bCtx.stroke();

    // Magnetic Stripe
    bCtx.fillStyle = '#020617';
    bCtx.fillRect(0, 40, w, 110);
    bCtx.fillStyle = '#334155';
    bCtx.fillRect(0, 75, w, 40);

    bCtx.fillStyle = '#00d4ff';
    bCtx.font = 'bold 32px "Space Grotesk", sans-serif';
    bCtx.fillText('ACADEMIC & PROFESSIONAL CREDENTIALS', 80, 195);

    bCtx.fillStyle = '#94a3b8';
    bCtx.font = '600 21px "JetBrains Mono", monospace';
    bCtx.fillText('VERIFIED RECORD // HARSHIT MISHRA', 80, 230);

    // Academic Section
    bCtx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    bCtx.beginPath();
    bCtx.roundRect(70, 265, 884, 250, 14);
    bCtx.fill();
    bCtx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
    bCtx.lineWidth = 1.5;
    bCtx.stroke();

    bCtx.fillStyle = '#00d4ff';
    bCtx.font = 'bold 26px "Space Grotesk", sans-serif';
    bCtx.fillText('🎓 Verified Academic Milestones', 105, 315);

    bCtx.fillStyle = '#cbd5e1';
    bCtx.font = '500 22px "Inter", sans-serif';
    bCtx.fillText('• B.Tech in CSE (IT) — IIMT College of Engineering (CGPA: 6.64)', 105, 365);
    bCtx.fillText('• Class XII CBSE — Army Public School, Lucknow (71.6% • 2023)', 105, 415);
    bCtx.fillText('• Class X CBSE — Army Public School, Lucknow (91.4% • 2021)', 105, 465);

    // Internships Section
    bCtx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    bCtx.beginPath();
    bCtx.roundRect(70, 540, 884, 250, 14);
    bCtx.fill();
    bCtx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
    bCtx.stroke();

    bCtx.fillStyle = '#a855f7';
    bCtx.font = 'bold 26px "Space Grotesk", sans-serif';
    bCtx.fillText('💼 Verified Industrial Internships', 105, 590);

    bCtx.fillStyle = '#cbd5e1';
    bCtx.font = '500 22px "Inter", sans-serif';
    bCtx.fillText('• AI Web Developer — Inamigos Foundation (Jul 2026 – Aug 2026)', 105, 640);
    bCtx.fillText('  Engineered NGO donation portal and responsive web modules.', 105, 678);
    bCtx.fillText('• Python Programming Intern — InternPe (May 2025 – Jun 2025)', 105, 725);
    bCtx.fillText('  Built modular Python scripts, algorithms, and data structures.', 105, 763);

    // GitHub Repositories Section
    bCtx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    bCtx.beginPath();
    bCtx.roundRect(70, 815, 884, 300, 14);
    bCtx.fill();
    bCtx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
    bCtx.stroke();

    bCtx.fillStyle = '#34d399';
    bCtx.font = 'bold 26px "Space Grotesk", sans-serif';
    bCtx.fillText('🚀 Verified GitHub Repositories (@har-001 & @harshit-001-it)', 105, 865);

    bCtx.fillStyle = '#cbd5e1';
    bCtx.font = '500 20px "Inter", sans-serif';
    bCtx.fillText('• Personal Portfolio Website (3D WebGL, Physics) [LIVE DEMO]', 105, 910);
    bCtx.fillText('• NIVA AI Task & Conversational Assistant (Python, LLM)', 105, 948);
    bCtx.fillText('• Human Emotion Recognition System (CNN, OpenCV, Deep Learning)', 105, 986);
    bCtx.fillText('• Diabetes & Heart Disease Prediction Models (Scikit-Learn ML)', 105, 1024);
    bCtx.fillText('• VedoraAI Trading Market Prediction Bot & Platform (Python)', 105, 1062);

    // Frosted Translucent Cyber Signature Panel
    bCtx.fillStyle = 'rgba(0, 212, 255, 0.08)';
    bCtx.beginPath();
    bCtx.roundRect(100, 1145, 460, 60, 10);
    bCtx.fill();
    bCtx.strokeStyle = 'rgba(0, 212, 255, 0.35)';
    bCtx.lineWidth = 1.5;
    bCtx.stroke();

    bCtx.fillStyle = '#00f0ff';
    bCtx.font = 'italic bold 28px "Space Grotesk", cursive';
    bCtx.fillText('Harshit Mishra', 140, 1188);

    bCtx.fillStyle = '#64748b';
    bCtx.font = '19px "JetBrains Mono", monospace';
    bCtx.fillText('OFFICIAL GITHUB: github.com/har-001', 100, 1235);
    bCtx.fillText('SECONDARY REPO: github.com/harshit-001-it', 100, 1265);

    bCtx.fillStyle = '#94a3b8';
    bCtx.textAlign = 'center';
    bCtx.font = 'bold 23px "Space Grotesk", sans-serif';
    bCtx.fillText('Click to flip back to front face ↺', 512, 1370);

    bCtx.restore();
    backTexture.needsUpdate = true;
  }

  const avatarImg = new Image();
  avatarImg.crossOrigin = 'anonymous';
  avatarImg.src = 'image.png';
  avatarImg.onload = () => drawFrontFace(avatarImg);
  avatarImg.onerror = () => drawFrontFace(null);
  drawFrontFace(null);
  drawBackFace();

  // ===============================================================
  // MODE 2: 3D QUANTUM NEURAL AI CORE
  // ===============================================================
  const neuralCoreGroup = new THREE.Group();
  neuralCoreGroup.visible = false;
  holoContentGroup.add(neuralCoreGroup);

  // Central Pulsating Energy Singularity
  const coreSingularityGeo = new THREE.SphereGeometry(0.38, 28, 28);
  const coreSingularityMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const coreSingularity = new THREE.Mesh(coreSingularityGeo, coreSingularityMat);
  neuralCoreGroup.add(coreSingularity);

  const coreAuraGeo = new THREE.SphereGeometry(0.48, 20, 20);
  const coreAuraMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.35 });
  const coreAura = new THREE.Mesh(coreAuraGeo, coreAuraMat);
  neuralCoreGroup.add(coreAura);

  // 3D Neural Network Nodes & Synaptic Connections
  const NODE_COUNT = 28;
  const neuralNodes = [];
  const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12);
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

  for (let i = 0; i < NODE_COUNT; i++) {
    const phi = Math.acos(-1 + (2 * i) / NODE_COUNT);
    const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;
    const r = 0.95;
    const nx = Math.cos(theta) * Math.sin(phi) * r;
    const ny = Math.sin(theta) * Math.sin(phi) * r;
    const nz = Math.cos(phi) * r;

    const nMesh = new THREE.Mesh(nodeGeo, nodeMat);
    nMesh.position.set(nx, ny, nz);
    neuralCoreGroup.add(nMesh);
    neuralNodes.push({ pos: new THREE.Vector3(nx, ny, nz), mesh: nMesh });
  }

  // Synaptic Line Segments
  const linePositions = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (neuralNodes[i].pos.distanceTo(neuralNodes[j].pos) < 0.65) {
        linePositions.push(
          neuralNodes[i].pos.x, neuralNodes[i].pos.y, neuralNodes[i].pos.z,
          neuralNodes[j].pos.x, neuralNodes[j].pos.y, neuralNodes[j].pos.z
        );
      }
    }
  }
  const linesGeo = new THREE.BufferGeometry();
  linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const linesMat = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.4 });
  const synapticLines = new THREE.LineSegments(linesGeo, linesMat);
  neuralCoreGroup.add(synapticLines);

  // Orbiting Tech Badges in 3D
  const techLabels = ['Python 3', 'TensorFlow', 'OpenCV', 'Scikit-Learn', 'LLM', 'Deep Learning'];
  const techSatellites = [];
  techLabels.forEach((label, idx) => {
    const sGroup = new THREE.Group();
    const orb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.04), chromeMat);
    sGroup.add(orb);
    neuralCoreGroup.add(sGroup);
    techSatellites.push({
      group: sGroup,
      angle: idx * (Math.PI * 2 / techLabels.length),
      radius: 1.15,
      speed: 0.015 * (idx % 2 === 0 ? 1 : -1)
    });
  });

  // ===============================================================
  // MODE 3: ORBITAL SYSTEMS TELEMETRY & RADAR
  // ===============================================================
  const telemetryGroup = new THREE.Group();
  telemetryGroup.visible = false;
  holoContentGroup.add(telemetryGroup);

  // Concentric Radar Rings
  [0.4, 0.75, 1.1].forEach((rad, idx) => {
    const rRing = new THREE.Mesh(
      new THREE.RingGeometry(rad - 0.01, rad, 48),
      new THREE.MeshBasicMaterial({ color: idx === 2 ? 0x00f0ff : 0x38bdf8, transparent: true, opacity: 0.45, side: THREE.DoubleSide })
    );
    telemetryGroup.add(rRing);
  });

  // Radar Sweep Beam
  const sweepGeo = new THREE.BufferGeometry();
  sweepGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 1.1, 0, 0], 3));
  const sweepMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, linewidth: 2 });
  const sweepLine = new THREE.Line(sweepGeo, sweepMat);
  telemetryGroup.add(sweepLine);

  // 12 Orbital Project Satellites representing the 12 verified repositories
  const satGeo = new THREE.SphereGeometry(0.045, 12, 12);
  const satMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
  const projectSatellites = [];

  for (let i = 0; i < 12; i++) {
    const sat = new THREE.Mesh(satGeo, satMat);
    telemetryGroup.add(sat);
    projectSatellites.push({
      mesh: sat,
      radius: 0.45 + (i % 3) * 0.32,
      angle: i * (Math.PI * 2 / 12),
      speed: 0.01 + (i % 3) * 0.006,
      tiltY: (i % 2 === 0 ? 1 : -1) * 0.2
    });
  }

  // ===============================================================
  // INTERACTION & MODE DOCK CONTROLLER
  // ===============================================================
  let currentMode = 'holo-pass';

  function switchMode(newMode) {
    currentMode = newMode;
    holoPassGroup.visible = (newMode === 'holo-pass');
    neuralCoreGroup.visible = (newMode === 'neural-core');
    telemetryGroup.visible = (newMode === 'telemetry');

    // Trigger visual shockwave on switch
    pulseActive = true;
    pulseScale = 0.1;
    pulseOpacity = 0.95;
    pulseRecoil = 0.07;

    // Update Dock UI
    if (modeDock) {
      const btns = modeDock.querySelectorAll('.holo-mode-btn');
      btns.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-mode') === newMode);
      });
    }

    if (hintText) {
      if (newMode === 'holo-pass') {
        hintText.textContent = 'Identity Holo-Pass Active • Drag to inspect • Click to flip front/back ↻';
      } else if (newMode === 'neural-core') {
        hintText.textContent = 'Quantum Neural AI Core Active • Synaptic pathways firing ⚡';
      } else if (newMode === 'telemetry') {
        hintText.textContent = 'Radar Telemetry Active • 12 Verified GitHub repositories mapped 🛰️';
      }
    }
  }

  if (modeDock) {
    const btns = modeDock.querySelectorAll('.holo-mode-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const mode = btn.getAttribute('data-mode');
        if (mode) switchMode(mode);
      });
    });
  }

  // Pointer & Drag Interaction (Full 360° Inspection)
  let isDragging = false;
  let isFlipped = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let currentRotY = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let targetRotX = 0;
  let totalDragDist = 0;

  function onPointerDown(e) {
    if (e.target && e.target.closest('#cardResetBtn')) return;
    isDragging = true;
    totalDragDist = 0;
    dragStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
  }

  function onPointerMove(e) {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    if (isDragging) {
      const deltaX = clientX - dragStartX;
      const deltaY = clientY - dragStartY;
      totalDragDist += Math.hypot(deltaX, deltaY);

      targetRotY += deltaX * 0.012;
      targetRotX += deltaY * 0.008;

      dragStartX = clientX;
      dragStartY = clientY;
    } else {
      const rect = stage.getBoundingClientRect();
      const inProximity = (
        clientX >= rect.left - 50 &&
        clientX <= rect.right + 50 &&
        clientY >= rect.top - 50 &&
        clientY <= rect.bottom + 50
      );

      if (inProximity) {
        const relX = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width) * 2 - 1));
        const relY = Math.max(-1, Math.min(1, -(((clientY - rect.top) / rect.height) * 2 - 1)));
        targetRotX = -relY * 0.22;
        if (!isFlipped) {
          targetRotY = relX * 0.35;
        } else {
          targetRotY = Math.PI + relX * 0.35;
        }
      } else {
        targetRotX = 0;
        targetRotY = isFlipped ? Math.PI : 0;
      }
    }
  }

  function onPointerUp() {
    isDragging = false;
  }

  // Guaranteed Click Handler
  stage.addEventListener('click', (e) => {
    if (e.target && e.target.closest('#cardResetBtn')) return;
    if (totalDragDist > 18) return;

    // Trigger Energy Pulse
    pulseActive = true;
    pulseScale = 0.1;
    pulseOpacity = 0.95;
    pulseRecoil = 0.08;

    // In Holo-ID mode, also flip front/back
    if (currentMode === 'holo-pass') {
      isFlipped = !isFlipped;
      targetRotY = isFlipped ? Math.PI : 0;
      targetRotX = 0;
      if (hintText) {
        hintText.textContent = isFlipped
          ? 'Back Face: Verified Credentials • Click to flip front ↺'
          : 'Front Face: Verified Pass • Click to flip back ↻';
      }
    }
  });

  stage.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('mouseup', onPointerUp);

  stage.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isFlipped = false;
      targetRotY = 0;
      targetRotX = 0;
      switchMode('holo-pass');
    });
  }

  // ===============================================================
  // PHYSICS & ANIMATION LOOP
  // ===============================================================
  const physClock = new THREE.Clock();

  function animatePhysics() {
    requestAnimationFrame(animatePhysics);
    const elapsed = physClock.getElapsedTime();

    // 1. Magnetic Buoyancy Bobbing & Gyroscopic Precession
    const bobY = Math.sin(elapsed * 1.8) * 0.055;
    const idlePrecession = Math.sin(elapsed * 1.2) * 0.018;

    pulseRecoil *= 0.88;
    chamberGroup.position.y = 0.05 + bobY + pulseRecoil;

    // 2. Smooth 360° Rotation Easing
    currentRotY += (targetRotY - currentRotY) * 0.085;
    currentRotX += (targetRotX + idlePrecession - currentRotX) * 0.085;
    chamberGroup.rotation.y = currentRotY;
    chamberGroup.rotation.x = currentRotX;

    // 3. Shockwave Pulse Expansion
    if (pulseActive) {
      pulseScale += 0.08;
      pulseOpacity -= 0.035;
      pulseRing.scale.set(pulseScale, pulseScale, 1);
      pulseRingMat.opacity = Math.max(0, pulseOpacity);
      if (pulseOpacity <= 0) {
        pulseActive = false;
        pulseRingMat.opacity = 0;
      }
    }

    // 4. Update Rising Flux Particles
    fluxParticles.forEach(fp => {
      fp.mesh.position.y += fp.speedY;
      fp.angle += fp.rotSpeed;
      fp.mesh.position.x = Math.cos(fp.angle) * fp.baseRadius;
      fp.mesh.position.z = Math.sin(fp.angle) * fp.baseRadius;
      if (fp.mesh.position.y > 0.4) {
        fp.mesh.position.y = -1.35;
      }
    });

    // 5. Update Active Mode Subsystems
    if (currentMode === 'holo-pass') {
      ringHolo1.rotation.z = elapsed * 0.8;
      ringHolo2.rotation.y = -elapsed * 0.6;
    } else if (currentMode === 'neural-core') {
      const pulseVal = 1.0 + Math.sin(elapsed * 3.5) * 0.08;
      coreSingularity.scale.set(pulseVal, pulseVal, pulseVal);
      coreAura.scale.set(pulseVal * 1.1, pulseVal * 1.1, pulseVal * 1.1);
      techSatellites.forEach(ts => {
        ts.angle += ts.speed;
        ts.group.position.set(
          Math.cos(ts.angle) * ts.radius,
          Math.sin(ts.angle * 2) * 0.25,
          Math.sin(ts.angle) * ts.radius
        );
        ts.group.rotation.y = ts.angle;
      });
    } else if (currentMode === 'telemetry') {
      sweepLine.rotation.z = -elapsed * 1.8;
      projectSatellites.forEach(ps => {
        ps.angle += ps.speed;
        ps.mesh.position.set(
          Math.cos(ps.angle) * ps.radius,
          Math.sin(ps.angle) * ps.tiltY,
          Math.sin(ps.angle) * ps.radius
        );
      });
    }

    // Dynamic Floor Shadow
    const cosY = Math.cos(currentRotY);
    shadowMesh.scale.x = 1.0 - Math.abs(Math.sin(currentRotY)) * 0.35;
    shadowMesh.material.opacity = 0.55 - Math.abs(bobY) * 1.5;

    renderer.render(scene, camera);
  }
  animatePhysics();

  window.addEventListener('resize', () => {
    width = stage.clientWidth || 380;
    height = stage.clientHeight || 540;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

/* ----------------------------------------------------------------
   7. TACTILE 3D CARD TILT & SPECULAR GLARE (WHOLE SITE)
   ---------------------------------------------------------------- */
function initDynamic3DCardTilt() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    if (card.dataset.tiltInitialized) return;
    card.dataset.tiltInitialized = 'true';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
}

/* ----------------------------------------------------------------
   8. REVEAL ANIMATIONS ON SCROLL
   ---------------------------------------------------------------- */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------------------
   9. HERO COUNTERS
   ---------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target') || '0', 10);
        let count = 0;
        const duration = 1000;
        const step = Math.max(1, Math.floor(target / (duration / 40)));

        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            entry.target.textContent = `${target}`;
            clearInterval(timer);
          } else {
            entry.target.textContent = `${count}`;
          }
        }, 40);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ----------------------------------------------------------------
   10. RENDER EDUCATION (100% AUTHENTIC RESUME)
   ---------------------------------------------------------------- */
function renderEducation() {
  const container = document.getElementById('educationTimeline');
  if (!container) return;

  const eduList = [
    {
      degree: 'B.Tech — Computer Science & Engineering (IT)',
      institution: 'IIMT College of Engineering, Greater Noida (AKTU)',
      period: '2023 – Present',
      score: 'CGPA: 6.64',
      details: 'Specializing in Machine Learning, Deep Neural Networks, Python Software Development, and Data Structures.'
    },
    {
      degree: 'Class XII (Senior Secondary) — CBSE',
      institution: 'Army Public School, Sardar Patel Marg, Lucknow',
      period: '2022 – 2023',
      score: '71.6%',
      details: 'Higher Secondary education with rigorous foundation in Mathematics, Physics, and Computer Science.'
    },
    {
      degree: 'Class X (Secondary) — CBSE',
      institution: 'Army Public School, Sardar Patel Marg, Lucknow',
      period: '2020 – 2021',
      score: '91.4% (Distinction)',
      details: 'High academic distinction with solid analytical foundations in Mathematics, Science, and Logical Reasoning.'
    }
  ];

  container.innerHTML = eduList.map(item => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-card glass tilt-card">
        <div class="timeline-badge-row">
          <span class="company-badge">${item.institution}</span>
          <span class="date-badge">${item.period}</span>
        </div>
        <h3 class="role-title">${item.degree}</h3>
        <div class="edu-score-pill">${item.score}</div>
        <p class="role-desc">${item.details}</p>
      </div>
    </div>
  `).join('');
}

/* ----------------------------------------------------------------
   11. RENDER SKILLS & INTERACTIVE LEARNING PATHWAYS
   ---------------------------------------------------------------- */
const SKILL_ROADMAP_DATABASE = {
  'Machine Learning': {
    icon: '🧠',
    roadmap: [
      { step: '01', title: 'Mathematics & Statistical Foundations', desc: 'Master Linear Algebra (matrix operations, eigenvectors), Multivariable Calculus (gradients, chain rule), and Probability Theory & Hypothesis Testing.' },
      { step: '02', title: 'Data Science Stack in Python', desc: 'Become proficient in NumPy (vectorized array computing), Pandas (data wrangling & aggregation), and exploratory visual analytics with Matplotlib and Seaborn.' },
      { step: '03', title: 'Core ML Algorithms (Supervised & Unsupervised)', desc: 'Implement Linear & Logistic Regression, Decision Trees, Random Forests, Support Vector Machines (SVM), K-Means Clustering, and Gradient Boosting.' },
      { step: '04', title: 'Model Validation & Hyperparameter Optimization', desc: 'Prevent overfitting using K-Fold Cross-Validation, GridSearchCV / RandomizedSearchCV, ROC-AUC, Precision-Recall curves, and Confusion Matrices.' },
      { step: '05', title: 'Pipeline Architecture & Production Deployment', desc: 'Construct leak-free Scikit-Learn Pipelines, serialize models with Joblib/ONNX, package with FastAPI & Docker, and deploy to cloud runtimes.' }
    ],
    resources: [
      { name: 'Scikit-Learn Official User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', desc: 'The gold-standard reference manual for machine learning estimators, transformers, and pipelines in Python.' },
      { name: 'Machine Learning Specialization (Coursera)', url: 'https://www.coursera.org/specializations/machine-learning-introduction', desc: 'Andrew Ng\'s world-renowned introductory curriculum covering fundamental ML concepts and practice.' },
      { name: 'Kaggle Learn Interactive ML Micro-Courses', url: 'https://www.kaggle.com/learn', desc: 'Hands-on browser-based micro-courses covering real datasets, feature engineering, and model tuning.' },
      { name: 'StatQuest Machine Learning Video Series', url: 'https://www.youtube.com/results?search_query=statquest+machine+learning', desc: 'Visual, intuitive step-by-step mathematical breakdowns of machine learning algorithms by Josh Starmer.' }
    ],
    projects: [
      'Clinical Disease Vulnerability Predictor with calibrated probability scores and Streamlit interface.',
      'Customer Attrition & Churn Analysis engine evaluating multi-feature business metrics with Random Forest.'
    ]
  },
  'Neural Networks': {
    icon: '⚡',
    roadmap: [
      { step: '01', title: 'Perceptrons & Neural Foundations', desc: 'Understand biological inspiration, artificial neurons, bias & weights, and non-linear activation functions (Sigmoid, Tanh, ReLU, LeakyReLU, Softmax).' },
      { step: '02', title: 'Forward & Backpropagation Mechanics', desc: 'Master tensor dot products, computational graphs, loss formulations (MSE, Cross-Entropy), and the chain-rule gradient calculus that drives backprop.' },
      { step: '03', title: 'Optimization & Training Dynamics', desc: 'Implement Stochastic Gradient Descent (SGD), Momentum, RMSprop, and Adam optimizers; tackle vanishing/exploding gradients with Batch Normalization.' },
      { step: '04', title: 'Regularization & Generalization', desc: 'Prevent deep network overfitting using Dropout layers, L1/L2 Weight Decay, Early Stopping, and Data Augmentation techniques.' },
      { step: '05', title: 'Deep Architectures & Framework Mastery', desc: 'Construct deep Multi-Layer Perceptrons (MLPs) and residual architectures using PyTorch and TensorFlow / Keras.' }
    ],
    resources: [
      { name: '3Blue1Brown Neural Networks Series', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', desc: 'The most visually stunning and intuitive conceptual introduction to neural networks and backpropagation.' },
      { name: 'DeepLearning.AI Neural Networks Course', url: 'https://www.deeplearning.ai/courses/deep-learning-specialization/', desc: 'Master deep learning fundamentals, vectorization, and neural network optimization from Andrew Ng.' },
      { name: 'Neural Networks from Scratch (NNFS)', url: 'https://nnfs.io/', desc: 'Comprehensive textbook and video guides for building neural networks completely from scratch in pure NumPy.' },
      { name: 'Stanford CS230 Deep Learning', url: 'https://cs230.stanford.edu/', desc: 'Official Stanford lecture slides, syllabi, and practice assignments for building deep learning systems.' }
    ],
    projects: [
      'Pure NumPy Neural Network constructed without frameworks to classify handwritten digits (MNIST).',
      'Multi-Layer Deep Diagnostic Classifier for medical risk prediction with custom dropout layers.'
    ]
  },
  'TensorFlow': {
    icon: '📦',
    roadmap: [
      { step: '01', title: 'Tensors, Shapes & Graph Execution', desc: 'Master tf.Tensor creation, data types, multidimensional reshaping, slicing, GPU acceleration, and Eager vs Graph execution modes.' },
      { step: '02', title: 'Keras Sequential & Functional APIs', desc: 'Build feedforward and convolutional networks with Keras layers, specifying inputs, layer stacking, activation functions, and model summaries.' },
      { step: '03', title: 'Custom Training Loops with tf.GradientTape', desc: 'Take direct control over gradient computation, custom loss formulations, custom training steps, and metric logging.' },
      { step: '04', title: 'High-Performance tf.data Pipelines', desc: 'Stream massive datasets from disk using tf.data.Dataset with prefetching, batching, parallel mapping, and on-the-fly augmentation.' },
      { step: '05', title: 'Deployment with TFLite & TF Serving', desc: 'Quantize and optimize neural models for edge/mobile devices using TensorFlow Lite, and serve scalable REST/gRPC endpoints with TF Serving.' }
    ],
    resources: [
      { name: 'TensorFlow Official Tutorials & Guides', url: 'https://www.tensorflow.org/tutorials', desc: 'Authoritative, reproducible Google tutorials covering vision, NLP, and model optimization.' },
      { name: 'Keras.io Official API Reference', url: 'https://keras.io/', desc: 'Clean, developer-friendly documentation for the high-level neural network API running on top of TensorFlow.' },
      { name: 'FreeCodeCamp TensorFlow 2.0 Course', url: 'https://www.youtube.com/results?search_query=freecodecamp+tensorflow+2.0+course', desc: 'Comprehensive full-length video course building practical deep learning models in TensorFlow 2.' },
      { name: 'TensorFlow Developer Certificate Guide', url: 'https://www.tensorflow.org/certificate', desc: 'Official examination criteria and curriculum for verified industry TensorFlow proficiency.' }
    ],
    projects: [
      'Transfer Learning Image Classifier using pre-trained MobileNetV2 with custom dense heads.',
      'Exported lightweight TFLite model running real-time edge inference in a mobile or web sandbox.'
    ]
  },
  'Large Language Models (LLMs)': {
    icon: '🤖',
    roadmap: [
      { step: '01', title: 'Transformer Architecture & Self-Attention', desc: 'Study the mechanics of multi-head self-attention, positional encodings, feedforward sub-layers, and decoder-only vs encoder-decoder structures.' },
      { step: '02', title: 'Tokenization & Training Paradigms', desc: 'Understand Byte-Pair Encoding (BPE), vocabulary tokenizers, pre-training objectives (Causal LM), and instruction fine-tuning.' },
      { step: '03', title: 'Prompt Engineering & System Directives', desc: 'Master zero-shot, few-shot in-context learning, Chain-of-Thought (CoT) prompting, structured JSON output enforcement, and temperature controls.' },
      { step: '04', title: 'Retrieval-Augmented Generation (RAG)', desc: 'Chunk documents, generate vector embeddings, index into vector databases (ChromaDB, FAISS, Pinecone), and synthesize context-aware answers.' },
      { step: '05', title: 'Autonomous Agentic Architectures', desc: 'Build tool-calling agents, state machines (LangGraph), multi-agent swarms, and run open-weight models locally with Ollama and vLLM.' }
    ],
    resources: [
      { name: 'Hugging Face NLP & LLM Course', url: 'https://huggingface.co/learn/nlp-course/', desc: 'The industry-standard open curriculum covering transformers, tokenizers, and model fine-tuning.' },
      { name: 'DeepLearning.AI Prompt Engineering Course', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', desc: 'Created with OpenAI to teach developer-first prompting strategies and programmatic API integration.' },
      { name: 'The Illustrated Transformer by Jay Alammar', url: 'https://jalammar.github.io/illustrated-transformer/', desc: 'Clear visual guide breaking down the internal mechanics of transformers and attention mechanisms.' },
      { name: 'Andrej Karpathy: Intro to Large Language Models', url: 'https://www.youtube.com/results?search_query=andrej+karpathy+intro+to+large+language+models', desc: 'Masterclass video lectures detailing LLM pre-training, fine-tuning, and system execution.' }
    ],
    projects: [
      'Production RAG pipeline enabling conversational question-answering over local technical documentation.',
      'Autonomous multi-step research agent executing API calls and generating verified synthesized reports.'
    ]
  },
  'Computer Vision (OpenCV)': {
    icon: '👁️',
    roadmap: [
      { step: '01', title: 'Digital Image Representation & Color Spaces', desc: 'Understand pixel matrices, color channels (BGR vs RGB), Grayscale, HSV color thresholding, and geometric transformations (resize, rotate).' },
      { step: '02', title: 'Filtering, Blurring & Edge Detection', desc: 'Apply Gaussian blur, median filters, Sobel operators, and Canny edge detection to clean frames and extract topological boundaries.' },
      { step: '03', title: 'Contours, Morphological Ops & Bounding Boxes', desc: 'Erosion, dilation, contour discovery, hierarchical filtering, bounding rectangle calculation, and convex hulls.' },
      { step: '04', title: 'Real-Time Webcam Streaming & Optical Flow', desc: 'Stream video feeds with cv2.VideoCapture, process frames at 60 FPS, calculate dense/sparse optical flow, and track moving targets.' },
      { step: '05', title: 'Deep Learning Vision Integration', desc: 'Load pre-trained deep learning weights via cv2.dnn (YOLO, SSD, FaceMesh) for real-time facial expression and object classification.' }
    ],
    resources: [
      { name: 'OpenCV Official Python Tutorials', url: 'https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html', desc: 'Comprehensive step-by-step guides from the core OpenCV foundation developers.' },
      { name: 'PyImageSearch Computer Vision Guides', url: 'https://pyimagesearch.com/', desc: 'Practical, production-grade computer vision tutorials and Python implementations by Adrian Rosebrock.' },
      { name: 'FreeCodeCamp OpenCV Python Course', url: 'https://www.youtube.com/results?search_query=freecodecamp+opencv+python+course', desc: 'Full hands-on video workshop covering complete image processing and real-time detection in Python.' },
      { name: 'LearnOpenCV by Satya Mallick', url: 'https://learnopencv.com/', desc: 'Advanced tutorials covering modern OpenCV, deep learning vision models, and facial landmarking.' }
    ],
    projects: [
      'Real-Time Facial Emotion & Sentiment Recognition System with live webcam camera overlay.',
      'Automated Document Scanner utilizing edge detection and four-point perspective warp transforms.'
    ]
  },
  'Python 3': {
    icon: '🐍',
    roadmap: [
      { step: '01', title: 'Core Syntax & Control Flow', desc: 'Master primitive data types, control structures (if/elif/else, while/for loops), functions, parameters, and variable scope rules.' },
      { step: '02', title: 'Idiomatic Data Structures & Comprehensions', desc: 'Deep dive into lists, tuples, sets, dictionaries, slicing, list/dictionary comprehensions, and generator expressions.' },
      { step: '03', title: 'Object-Oriented Programming (OOP)', desc: 'Design classes, instance/class methods, encapsulation, inheritance, polymorphism, abstract base classes, and dunder methods.' },
      { step: '04', title: 'Advanced Python Capabilities', desc: 'Master function decorators, context managers (with statement), iterators/generators, type hinting, and asynchronous programming (asyncio).' },
      { step: '05', title: 'Packaging, Testing & Virtual Environments', desc: 'Isolate environments with venv/uv, write unit tests with pytest, package modules, and establish clean linting with ruff and black.' }
    ],
    resources: [
      { name: 'Python.org Official Tutorial & Reference', url: 'https://docs.python.org/3/tutorial/', desc: 'The definitive, up-to-date manual on Python syntax, standard library, and language features.' },
      { name: 'Real Python Tutorials & Guides', url: 'https://realpython.com/', desc: 'In-depth, practical Python tutorials written and reviewed by senior industry developers.' },
      { name: 'Corey Schafer Python YouTube Series', url: 'https://www.youtube.com/results?search_query=corey+schafer+python', desc: 'Legendary playlist breaking down Python fundamentals, OOP, decorators, and virtual environments.' },
      { name: 'Automate the Boring Stuff with Python', url: 'https://automatetheboringstuff.com/', desc: 'Free online book teaching practical programming for automating repetitive computing tasks.' }
    ],
    projects: [
      'Automated File Sorting & System Telemetry CLI application with modular arguments parser.',
      'Production-grade RESTful API backend built with FastAPI, Pydantic data schemas, and Pytest.'
    ]
  },
  'Java': {
    icon: '☕',
    roadmap: [
      { step: '01', title: 'JVM Architecture & Fundamental Syntax', desc: 'Understand Java Virtual Machine bytecode execution, memory stack vs heap, primitive data types, and syntax rules.' },
      { step: '02', title: 'Object-Oriented Design Principles', desc: 'Implement encapsulation with getters/setters, class inheritance, method overriding/overloading, interfaces, and abstract classes.' },
      { step: '03', title: 'Java Collections Framework', desc: 'Master List (ArrayList, LinkedList), Set (HashSet, TreeSet), and Map (HashMap, TreeMap) operations and time complexities.' },
      { step: '04', title: 'Generics, Concurrency & Multithreading', desc: 'Thread creation, synchronization primitives, thread pools (ExecutorService), race condition prevention, and generic class typing.' },
      { step: '05', title: 'Modern Java & Spring Boot Framework', desc: 'Stream API, Lambda expressions, Java Records, dependency injection, and building microservices with Spring Boot.' }
    ],
    resources: [
      { name: 'Oracle Java Official Documentation', url: 'https://docs.oracle.com/en/java/', desc: 'Authoritative JDK specifications, class documentation, and language guides.' },
      { name: 'University of Helsinki Java MOOC', url: 'https://java-programming.mooc.fi/', desc: 'World-class free university course teaching hands-on Java programming with automated test grading.' },
      { name: 'Baeldung Java Tutorials', url: 'https://www.baeldung.com/', desc: 'High-quality technical articles on core Java, Spring Framework, and concurrency patterns.' },
      { name: 'Java Programming Full Course (YouTube)', url: 'https://www.youtube.com/results?search_query=java+programming+full+course', desc: 'Comprehensive video tutorials for mastering Java from fundamentals to enterprise architectures.' }
    ],
    projects: [
      'Multi-threaded Banking Transaction Simulator with thread-safe atomic accounts handling.',
      'Spring Boot REST API managing library inventory with relational JPA / Hibernate persistence.'
    ]
  },
  'C++': {
    icon: '⚡',
    roadmap: [
      { step: '01', title: 'Compilation Pipeline & Core Syntax', desc: 'Understand preprocessing, compiling, linking, variable types, operators, control flow, and console I/O with iostream.' },
      { step: '02', title: 'Pointers, References & Memory Layout', desc: 'Direct memory addressing, pointer arithmetic, stack allocation vs dynamic heap allocation (new/delete), and avoiding leaks.' },
      { step: '03', title: 'RAII & Object-Oriented C++', desc: 'Resource Acquisition Is Initialization (RAII), constructor/destructor lifecycle, copy/move semantics, and virtual polymorphism.' },
      { step: '04', title: 'Standard Template Library (STL)', desc: 'Master std::vector, std::map, std::unordered_map, std::priority_queue, iterators, and STL algorithms (std::sort, std::find).' },
      { step: '05', title: 'Modern C++ (C++17/20 Standards)', desc: 'Smart pointers (std::unique_ptr, std::shared_ptr), lambda expressions, structured bindings, auto type deduction, and multithreading.' }
    ],
    resources: [
      { name: 'LearnCpp.com Complete Free Tutorials', url: 'https://www.learncpp.com/', desc: 'The most comprehensive, highly recommended free C++ curriculum available on the web.' },
      { name: 'CppReference.com Standard Documentation', url: 'https://en.cppreference.com/w/', desc: 'The ultimate standard library and language syntax reference for professional C++ engineers.' },
      { name: 'The Cherno C++ Series on YouTube', url: 'https://www.youtube.com/results?search_query=the+cherno+c%2B%2B+series', desc: 'Game developer breakdown of how C++ works under the hood at the binary memory level.' },
      { name: 'Harvard CS50x Computer Science', url: 'https://cs50.harvard.edu/x/', desc: 'Legendary introductory computer science course introducing foundational memory and algorithmic design.' }
    ],
    projects: [
      'Custom Dynamic Array (Vector) container implementing complete memory reallocation and iterators.',
      'High-performance 2D Physics or Particle Simulation engine utilizing modern C++ and smart pointers.'
    ]
  },
  'JavaScript (ES6+)': {
    icon: '🟨',
    roadmap: [
      { step: '01', title: 'Syntax, Data Types & Scope', desc: 'Variables (let, const), primitives vs references, type coercion, scoping (block vs function), and arrow functions.' },
      { step: '02', title: 'DOM Manipulation & Event Handling', desc: 'Selecting DOM nodes, modifying attributes, event listeners, bubbling and capturing, and dynamic UI rendering.' },
      { step: '03', title: 'Asynchronous Architecture & Event Loop', desc: 'Call stack, Task Queue, Microtask Queue, Callbacks, Promises, and modern async/await syntax with error handling.' },
      { step: '04', title: 'Modern ES6+ Language Features', desc: 'Destructuring assignment, spread/rest operators, template literals, ES modules (import/export), classes, and closures.' },
      { step: '05', title: 'Browser APIs & Hardware Acceleration', desc: 'Fetch API, LocalStorage/SessionStorage, WebGL context, Canvas 2D, IntersectionObserver, and performance tuning.' }
    ],
    resources: [
      { name: 'MDN Web Docs JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', desc: 'The industry-standard documentation for JavaScript syntax, specifications, and web platform APIs.' },
      { name: 'JavaScript.info The Modern Tutorial', url: 'https://javascript.info/', desc: 'Masterclass documentation covering everything from JavaScript fundamentals to deep engine internals.' },
      { name: 'FreeCodeCamp JS Algorithms Certification', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/', desc: 'Hands-on coding challenges to master JavaScript algorithmic problem solving and data structures.' },
      { name: 'JavaScript Mastery YouTube Channel', url: 'https://www.youtube.com/results?search_query=javascript+mastery+full+course', desc: 'Project-driven video tutorials building modern full-stack JavaScript applications.' }
    ],
    projects: [
      'Interactive 3D Hardware-Accelerated Portfolio Scene using Vanilla JavaScript and WebGL.',
      'Real-Time Asynchronous Task Management Kanban application with local persistence and drag-and-drop.'
    ]
  },
  'Pandas': {
    icon: '🐼',
    roadmap: [
      { step: '01', title: 'Series & DataFrame Foundations', desc: 'Understand 1D Series and 2D DataFrame anatomy, indices, columns, and data access with .loc[] and .iloc[].' },
      { step: '02', title: 'Data Ingestion & Inspection', desc: 'Read and write diverse formats (CSV, JSON, Parquet, SQL tables) and inspect shapes with .info(), .describe(), and .head().' },
      { step: '03', title: 'Data Cleaning & Missing Value Handling', desc: 'Detect and handle nulls with .isna(), .fillna(), .dropna(), remove duplicates, and cast data types with .astype().' },
      { step: '04', title: 'Grouping, Aggregating & Merging', desc: 'Perform complex data transformations using .groupby(), .agg(), .pivot_table(), and merge/join disparate datasets.' },
      { step: '05', title: 'Time Series & Vectorized Optimization', desc: 'Parse datetime objects, resample temporal intervals, write vectorized operations, and eliminate slow Python for-loops.' }
    ],
    resources: [
      { name: 'Pandas Official User Guide', url: 'https://pandas.pydata.org/docs/user_guide/index.html', desc: 'Comprehensive guide covering idioms, performance patterns, and official API references.' },
      { name: 'Kaggle Pandas Micro-Course', url: 'https://www.kaggle.com/learn/pandas', desc: 'Interactive hands-on tutorials for indexing, grouping, and transforming real-world datasets.' },
      { name: 'Python for Data Analysis (Wes McKinney)', url: 'https://wesmckinney.com/book/', desc: 'The foundational book written by the creator of Pandas, available free online.' },
      { name: 'Corey Schafer Pandas Series', url: 'https://www.youtube.com/results?search_query=corey+schafer+pandas+tutorial', desc: 'Crystal-clear video breakdowns explaining every major Pandas operation step-by-step.' }
    ],
    projects: [
      'Multi-Year Financial & Sales Performance Aggregator analyzing millions of raw transaction records.',
      'Automated Data Cleansing & Validation Pipeline preparing raw sensor outputs for ML models.'
    ]
  },
  'NumPy': {
    icon: '🔢',
    roadmap: [
      { step: '01', title: 'The ndarray Object & Array Creation', desc: 'Understand contiguous memory layout, array creation functions (np.zeros, np.ones, np.arange, np.linspace), and dtypes.' },
      { step: '02', title: 'Indexing, Slicing & Boolean Masking', desc: 'Multi-dimensional indexing, sub-array slicing, fancy integer indexing, and conditional boolean filtering.' },
      { step: '03', title: 'Broadcasting & Mathematical Operations', desc: 'Master broadcasting rules across mismatched dimensions, vectorized element-wise arithmetic, and universal functions (ufuncs).' },
      { step: '04', title: 'Reshaping & Matrix Manipulations', desc: 'Array transpositions, flattening, stacking (vstack/hstack), concatenation, and multi-axis reductions (sum, mean, std).' },
      { step: '05', title: 'Linear Algebra & Random Sampling', desc: 'Dot products, matrix inversion, eigenvalues with np.linalg, reproducible pseudo-random number generation with np.random.' }
    ],
    resources: [
      { name: 'NumPy Official User Guide', url: 'https://numpy.org/doc/stable/user/index.html', desc: 'The authoritative reference for high-performance scientific array computing in Python.' },
      { name: 'Stanford CS231n NumPy Tutorial', url: 'https://cs231n.github.io/python-numpy-tutorial/', desc: 'Concise, practical crash course on NumPy array operations used in computer vision and machine learning.' },
      { name: 'FreeCodeCamp NumPy Full Tutorial', url: 'https://www.youtube.com/results?search_query=freecodecamp+numpy+tutorial', desc: 'In-depth hands-on video guide covering arrays, math operations, and linear algebra routines.' },
      { name: 'Visual Introduction to NumPy (Better Explained)', url: 'https://jalammar.github.io/visual-numpy/', desc: 'Clear diagrams illustrating how arrays, broadcasting, and matrix products work visually.' }
    ],
    projects: [
      'Acoustic Signal Processing & Frequency Analyzer classifying 60-band underwater sonar readings.',
      'Custom Perceptron & Gradient Descent Optimizer implemented with raw NumPy matrix equations.'
    ]
  },
  'Scikit-Learn': {
    icon: '🔬',
    roadmap: [
      { step: '01', title: 'The Consistent Estimator Interface', desc: 'Learn the unified .fit(), .transform(), and .predict() API conventions that power all Scikit-Learn components.' },
      { step: '02', title: 'Preprocessing & Feature Engineering', desc: 'Scale numeric features with StandardScaler / RobustScaler, encode categoricals with OneHotEncoder, and impute missing values.' },
      { step: '03', title: 'Supervised Models (Regression & Classification)', desc: 'Train Linear Regression, Ridge, Lasso, Logistic Regression, Random Forests, and Support Vector Machines.' },
      { step: '04', title: 'Pipeline & ColumnTransformer Architecture', desc: 'Encapsulate feature transformations and estimators into unified Pipelines to strictly prevent data leakage.' },
      { step: '05', title: 'Model Selection & Metric Evaluation', desc: 'Run StratifiedKFold cross-validation, hyperparameter grid search, analyze classification reports, and plot precision-recall curves.' }
    ],
    resources: [
      { name: 'Scikit-Learn Official Getting Started', url: 'https://scikit-learn.org/stable/getting_started.html', desc: 'Official tutorials detailing core model fitting, prediction pipelines, and evaluation metrics.' },
      { name: 'Inria Scikit-Learn MOOC', url: 'https://inria.github.io/scikit-learn-mooc/', desc: 'World-class online course authored by the core Scikit-Learn core development team in France.' },
      { name: 'Hands-On Machine Learning (Aurélien Géron)', url: 'https://github.com/ageron/handson-ml3', desc: 'Interactive Jupyter notebooks covering Scikit-Learn pipelines from the bestselling O\'Reilly textbook.' },
      { name: 'Scikit-Learn YouTube Masterclass', url: 'https://www.youtube.com/results?search_query=scikit+learn+tutorial+python', desc: 'Structured video courses teaching practical machine learning modeling with Scikit-Learn.' }
    ],
    projects: [
      'Comprehensive Patient Diabetes Risk Assessment Pipeline with hyperparameter-tuned classifiers.',
      'Sonar Frequency Object Classification System predicting rock vs metal cylinder reflections.'
    ]
  },
  'Data Cleaning & EDA': {
    icon: '🧹',
    roadmap: [
      { step: '01', title: 'Exploratory Data Inspection', desc: 'Understand data distributions, central tendencies (mean, median, mode), variance, and data types across raw columns.' },
      { step: '02', title: 'Systematic Missing Value Handling', desc: 'Identify Missing Completely at Random (MCAR) vs MAR, apply median/mean/mode imputation, or train KNN/iterative imputers.' },
      { step: '03', title: 'Outlier Detection & Treatment', desc: 'Identify extreme anomalies using Interquartile Range (IQR) bounds, Z-scores, and Isolation Forests; decide on trimming vs winsorizing.' },
      { step: '04', title: 'Visual Statistical Exploration', desc: 'Plot histograms, KDE curves, boxplots, correlation heatmaps, and pairplots using Seaborn to unearth hidden patterns.' },
      { step: '05', title: 'Feature Transformation & Engineering', desc: 'Apply log/box-cox transformations for skewed features, create interaction terms, bin continuous variables, and select top features.' }
    ],
    resources: [
      { name: 'Kaggle Data Cleaning Micro-Course', url: 'https://www.kaggle.com/learn/data-cleaning', desc: 'Interactive tutorials covering missing values, scaling, normalization, parsing dates, and character encodings.' },
      { name: 'Seaborn Official Data Visualization Gallery', url: 'https://seaborn.pydata.org/', desc: 'High-level Python statistical data visualization library reference and code recipes.' },
      { name: 'Towards Data Science EDA Guides', url: 'https://towardsdatascience.com/', desc: 'Top industry articles sharing best practices for exploratory data analysis on messy business datasets.' },
      { name: 'Exploratory Data Analysis Python Tutorial', url: 'https://www.youtube.com/results?search_query=exploratory+data+analysis+python', desc: 'End-to-end video walkthroughs cleaning and visualizing raw messy datasets from scratch.' }
    ],
    projects: [
      'Comprehensive Healthcare Diagnostics EDA uncovering clinical correlation patterns and risk distributions.',
      'Automated Data Profiler and Quality Audit Tool generating HTML statistical summaries from any CSV.'
    ]
  },
  'React.js': {
    icon: '⚛️',
    roadmap: [
      { step: '01', title: 'JSX & Component-Driven Architecture', desc: 'Understand declarative UI syntax, functional components, props passing, and conditional rendering patterns.' },
      { step: '02', title: 'State Management & Effects', desc: 'Manage reactive state with useState, handle side effects & lifecycle events with useEffect, and avoid infinite render loops.' },
      { step: '03', title: 'Forms & Controlled Components', desc: 'Build controlled form inputs, manage complex nested form state, and validate user submissions before API dispatch.' },
      { step: '04', title: 'Custom Hooks & Performance Tuning', desc: 'Extract reusable logic into Custom Hooks, optimize re-renders using useMemo, useCallback, and React.memo.' },
      { step: '05', title: 'Modern React Frameworks & 3D Integration', desc: 'Integrate React with React Three Fiber / Three.js, React Router, Context API, and deploy with Vercel.' }
    ],
    resources: [
      { name: 'React.dev Official Documentation', url: 'https://react.dev/', desc: 'The modern, interactive official React documentation with live sandboxes and tutorials.' },
      { name: 'Scrimba Learn React Free Interactive Course', url: 'https://scrimba.com/learn/learnreact', desc: 'Hands-on interactive screencasts where you can edit code directly inside the browser.' },
      { name: 'FreeCodeCamp React 18 Full Course', url: 'https://www.youtube.com/results?search_query=freecodecamp+react+course', desc: 'Full-length video masterclass teaching React components, hooks, state, and real-world project builds.' },
      { name: 'React Three Fiber Documentation', url: 'https://r3f.docs.pmnd.rs/', desc: 'Declarative, reactive 3D graphics in React utilizing Three.js and WebGL.' }
    ],
    projects: [
      'Interactive 3D Hardware-Accelerated Portfolio and AI Launchpad dashboard.',
      'Dynamic NGO Digital Campaign Portal featuring real-time donation modules and responsive routing.'
    ]
  },
  'HTML5': {
    icon: '🌐',
    roadmap: [
      { step: '01', title: 'Semantic Document Structure', desc: 'Master semantic layout tags (header, nav, main, article, section, aside, footer) for accessible, SEO-friendly DOMs.' },
      { step: '02', title: 'Forms, Validations & Input Types', desc: 'Modern input types (email, tel, date, range), form constraints (required, pattern), and client-side form validation.' },
      { step: '03', title: 'Embedded Media & Canvas 2D', desc: 'Responsive images (picture, srcset), audio/video tags, SVG vector graphics, and drawing via the Canvas 2D API.' },
      { step: '04', title: 'Web Storage & DOM APIs', desc: 'Persist state with LocalStorage and SessionStorage, read data attributes (dataset), and query elements with querySelector.' },
      { step: '05', title: 'Accessibility (a11y) & WCAG Compliance', desc: 'Implement ARIA roles, live regions, accessible names, keyboard focus rings, and screen-reader optimizations.' }
    ],
    resources: [
      { name: 'MDN Web Docs HTML Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', desc: 'Authoritative guide to HTML elements, attributes, accessibility guidelines, and browser compatibility.' },
      { name: 'FreeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', desc: 'Verified certification course teaching semantic HTML and modern CSS through interactive projects.' },
      { name: 'W3C Web Accessibility Initiative (WAI)', url: 'https://www.w3.org/WAI/', desc: 'Essential standards and guidelines for building universally accessible, compliant web interfaces.' },
      { name: 'HTML5 Semantic Layouts Video Guide', url: 'https://www.youtube.com/results?search_query=html5+semantic+elements+tutorial', desc: 'Clear video tutorials explaining proper semantic structuring and accessibility practices.' }
    ],
    projects: [
      'Fully Accessible, WCAG-Compliant Inamigos NGO Web Platform with accessible donation forms.',
      'Interactive HTML5 Canvas 2D Drawing Board with image export and touch support.'
    ]
  },
  'CSS3': {
    icon: '🎨',
    roadmap: [
      { step: '01', title: 'Box Model, Specificity & Cascade', desc: 'Master margin, border, padding, content boxes (box-sizing), CSS specificity hierarchy, and inheritance.' },
      { step: '02', title: 'Modern Layouts: Flexbox & CSS Grid', desc: 'Flexbox alignment, flex-grow/shrink, multi-dimensional CSS Grid (grid-template-columns, minmax, gap, areas).' },
      { step: '03', title: 'Responsive Design & Fluid Typography', desc: 'Mobile-first media queries, container queries, clamp() fluid typography, and viewport relative units (vh, vw, rem).' },
      { step: '04', title: 'Hardware-Accelerated Animations & 3D Transforms', desc: 'Keyframe animations, transitions, 3D perspective transforms (rotateX/Y/Z, translate3d), and will-change optimizations.' },
      { step: '05', title: 'Glassmorphism, Tokens & Custom Properties', desc: 'Design tokens with CSS Variables, backdrop-filter blur, radiant gradients, and ultra-crisp dark-mode styling.' }
    ],
    resources: [
      { name: 'MDN Web Docs CSS Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', desc: 'Comprehensive specifications and guides for modern CSS properties, selectors, and layout engines.' },
      { name: 'CSS-Tricks Complete Guide to Flexbox & Grid', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', desc: 'The most popular visual reference posters for mastering Flexbox and Grid layouts.' },
      { name: 'Kevin Powell CSS YouTube Channel', url: 'https://www.youtube.com/results?search_query=kevin+powell+css', desc: 'Masterclass video tutorials demystifying modern CSS layouts, animations, and responsive architecture.' },
      { name: 'Web.dev Learn CSS Course (Google)', url: 'https://web.dev/learn/css/', desc: 'Structured, modern curriculum developed by Google engineers covering all aspects of modern styling.' }
    ],
    projects: [
      'High-Tech Glassmorphic 3D Card Hover & Tilt system with hardware-accelerated transforms.',
      'Fully Responsive Modern Web Interface optimized for seamless mobile and desktop browsing.'
    ]
  },
  'RESTful APIs': {
    icon: '🔌',
    roadmap: [
      { step: '01', title: 'HTTP Protocol & Architectural Principles', desc: 'Client-server separation, statelessness, HTTP methods (GET, POST, PUT, PATCH, DELETE), and HTTP status codes (2xx, 4xx, 5xx).' },
      { step: '02', title: 'Resource-Oriented URI Design', desc: 'Design clean, plural, intuitive endpoint paths (/api/v1/projects/:id), query parameters (?filter=ml&page=1), and JSON payloads.' },
      { step: '03', title: 'Authentication, Authorization & Security', desc: 'Secure endpoints using Bearer Tokens, JWT (JSON Web Tokens), API keys, CORS policies, and rate-limiting headers.' },
      { step: '04', title: 'API Documentation & OpenAPI / Swagger', desc: 'Document endpoints with OpenAPI 3.0 / Swagger specifications for automated client generation and interactive testing.' },
      { step: '05', title: 'Client Integration & Resilience', desc: 'Consume APIs using fetch / Axios, handle network retries, timeout management, pagination, and error degradation.' }
    ],
    resources: [
      { name: 'RESTful API Design Best Practices', url: 'https://restfulapi.net/', desc: 'Clear guidelines detailing resource modeling, status codes, and HTTP method idempotency.' },
      { name: 'Postman Learning Center & Tutorials', url: 'https://learning.postman.com/', desc: 'Learn how to inspect, test, mock, and automate REST API requests and automated collections.' },
      { name: 'MDN HTTP Overview & Headers', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', desc: 'Essential knowledge on HTTP requests, response headers, caching, and CORS configuration.' },
      { name: 'REST API Tutorial (YouTube)', url: 'https://www.youtube.com/results?search_query=rest+api+tutorial+for+beginners', desc: 'Comprehensive video tutorials teaching RESTful architecture and backend endpoint implementation.' }
    ],
    projects: [
      'Secure User Authentication & Resource Management API with JWT tokens and role-based permissions.',
      'Autonomous Job Aggregator API Gateway polling remote platforms and delivering parsed JSON feeds.'
    ]
  },
  'MySQL Relational DB': {
    icon: '🗄️',
    roadmap: [
      { step: '01', title: 'Relational Theory & Schema Normalization', desc: 'Understand relational algebra, entity-relationship diagrams, primary/foreign keys, and 1NF, 2NF, 3NF normalization.' },
      { step: '02', title: 'Data Definition (DDL) & Manipulation (DML)', desc: 'CREATE, ALTER, DROP tables with constraints (NOT NULL, UNIQUE, CHECK), and INSERT, UPDATE, DELETE records.' },
      { step: '03', title: 'Advanced Querying & Joins', desc: 'Query data with INNER JOIN, LEFT JOIN, RIGHT JOIN, subqueries, GROUP BY, HAVING, and aggregate functions (COUNT, SUM, AVG).' },
      { step: '04', title: 'Indexing & Performance Optimization', desc: 'Create B-Tree and Composite indexes, optimize slow queries using EXPLAIN execution plans, and reduce table scans.' },
      { step: '05', title: 'Transactions (ACID) & Programmatic Connectors', desc: 'Enforce Atomicity, Consistency, Isolation, and Durability (ACID) with COMMIT/ROLLBACK, and connect via Python (mysql-connector).' }
    ],
    resources: [
      { name: 'MySQL Official Reference Manual', url: 'https://dev.mysql.com/doc/', desc: 'The comprehensive official manual covering MySQL architecture, SQL syntax, and optimization engines.' },
      { name: 'Mode Analytics SQL Tutorial', url: 'https://mode.com/sql-tutorial/', desc: 'Interactive, beginner-to-advanced SQL course with real business analytics scenarios.' },
      { name: 'SQLZoo Interactive SQL Platform', url: 'https://sqlzoo.net/', desc: 'Free interactive browser playground with instant automated feedback on SQL queries and joins.' },
      { name: 'MySQL Full Course for Beginners (YouTube)', url: 'https://www.youtube.com/results?search_query=mysql+full+course', desc: 'End-to-end video tutorial building relational databases, tables, and complex queries from scratch.' }
    ],
    projects: [
      'Comprehensive Library Management Database managing book catalogs, students, loans, and fines.',
      'Scalable E-Commerce Inventory & Order Processing relational database schema with ACID transactions.'
    ]
  },
  'Linux Environment': {
    icon: '🐧',
    roadmap: [
      { step: '01', title: 'File System Hierarchy & Core Navigation', desc: 'Navigate directories (cd, ls, pwd), understand root hierarchy (/etc, /var, /home, /bin), and manipulate files (cp, mv, rm, mkdir).' },
      { step: '02', title: 'File Permissions & User Management', desc: 'Understand read, write, execute permissions for user, group, and others; manage access with chmod, chown, and sudo.' },
      { step: '03', title: 'Stream Redirection & Text Processing', desc: 'Harness stdin/stdout/stderr pipes (|), redirection (>, >>), and command-line text filters (grep, awk, sed, cut, sort, uniq).' },
      { step: '04', title: 'Process Monitoring & System Telemetry', desc: 'Inspect active workloads with ps, top, htop, terminate processes with kill/killall, and manage systemd services (systemctl).' },
      { step: '05', title: 'Bash Scripting & Remote SSH Administration', desc: 'Write automated bash scripts with loops and arguments, schedule tasks via cron, and administer remote servers with SSH keys.' }
    ],
    resources: [
      { name: 'Linux Journey Interactive Guide', url: 'https://linuxjourney.com/', desc: 'A beautiful, free interactive platform teaching Linux from fundamentals to kernel configuration.' },
      { name: 'The Linux Command Line by William Shotts', url: 'https://linuxcommand.org/', desc: 'The quintessential free book for mastering terminal navigation, utilities, and shell scripting.' },
      { name: 'OverTheWire: Bandit Security Wargame', url: 'https://overthewire.org/wargames/bandit/', desc: 'Gamified challenge series where you practice essential Linux commands to solve security levels.' },
      { name: 'Linux for Beginners Full Course (YouTube)', url: 'https://www.youtube.com/results?search_query=linux+for+beginners+course', desc: 'Full video walkthrough covering the terminal, file systems, permissions, and bash automation.' }
    ],
    projects: [
      'Automated Server Health Monitor & Backup Bash script logging system telemetry and archiving logs.',
      'Hardened Production Remote Server setup with automated firewall (ufw), SSH keys, and systemd services.'
    ]
  },
  'Git & GitHub': {
    icon: '🐙',
    roadmap: [
      { step: '01', title: 'Version Control Fundamentals', desc: 'Understand working directory, staging area, commit history, and essential commands (git init, status, add, commit, log).' },
      { step: '02', title: 'Branching & Collaborative Merging', desc: 'Create feature branches (git branch, checkout, switch), merge branches (git merge), and resolve merge conflicts cleanly.' },
      { step: '03', title: 'Remote Repositories & Collaboration', desc: 'Connect to remotes (git remote), sync code (git push, pull, fetch, clone), and manage GitHub Pull Requests and code reviews.' },
      { step: '04', title: 'History Manipulation & Recovery', desc: 'Stash dirty working states (git stash), cherry-pick commits, rebase interactive (git rebase -i), and recover lost commits with git reflog.' },
      { step: '05', title: 'Automated CI/CD with GitHub Actions', desc: 'Configure YAML workflow pipelines to automate test suites, linting, build checks, and continuous deployment to GitHub Pages.' }
    ],
    resources: [
      { name: 'Pro Git Book (Free by Scott Chacon)', url: 'https://git-scm.com/book/en/v2', desc: 'The definitive, officially recommended reference manual detailing all Git internals and commands.' },
      { name: 'GitHub Skills Interactive Courses', url: 'https://skills.github.com/', desc: 'Interactive hands-on repositories on GitHub that teach Git workflows through pull requests.' },
      { name: 'Learn Git Branching Interactive Visualizer', url: 'https://learngitbranching.js.org/', desc: 'The most popular visual interactive game for mastering Git branches, rebasing, and HEAD pointers.' },
      { name: 'Git & GitHub Tutorial for Beginners (YouTube)', url: 'https://www.youtube.com/results?search_query=git+and+github+tutorial+for+beginners', desc: 'Step-by-step video guide mastering Git commits, branches, pull requests, and GitHub collaboration.' }
    ],
    projects: [
      'Production Multi-Branch Repository with automated GitHub Actions CI/CD deploying static sites on push.',
      'Open Source Pull Request contribution following industry branch etiquette and commit conventions.'
    ]
  },
  'Analytical Thinking': {
    icon: '🔍',
    roadmap: [
      { step: '01', title: 'First Principles Deconstruction', desc: 'Break down complex engineering systems into foundational truths rather than relying on analogies or surface assumptions.' },
      { step: '02', title: 'Hypothesis-Driven Problem Framing', desc: 'Formulate quantifiable hypotheses, isolate confounding variables, and design empirical tests to validate design choices.' },
      { step: '03', title: 'Algorithmic Complexity & Trade-Off Analysis', desc: 'Analyze computational Big-O time and space complexity, evaluating trade-offs between latency, memory, and scalability.' },
      { step: '04', title: 'Root Cause Analysis (5 Whys & Ishikawa)', desc: 'Conduct systematic post-mortems for software failures by drilling down to foundational root causes rather than symptoms.' },
      { step: '05', title: 'Data-Driven Architectural Decision Making', desc: 'Utilize empirical benchmarks and telemetry metrics to make defensible engineering and infrastructure decisions.' }
    ],
    resources: [
      { name: 'Farnam Street: First Principles Thinking', url: 'https://fs.blog/first-principles/', desc: 'Frameworks and mental models for deconstructing problems to fundamental truths.' },
      { name: 'Khan Academy Logic & Critical Reasoning', url: 'https://www.khanacademy.org/', desc: 'Foundational coursework in deductive logic, statistical reasoning, and structured problem solving.' },
      { name: 'Harvard Business Review on Analytical Thinking', url: 'https://hbr.org/', desc: 'Case studies and frameworks on strategic evaluation, cognitive biases, and systematic analysis.' },
      { name: 'Analytical Thinking for Software Engineers (YouTube)', url: 'https://www.youtube.com/results?search_query=analytical+thinking+skills+software+engineer', desc: 'Video lectures on sharpening technical deduction, problem decomposition, and critical thinking.' }
    ],
    projects: [
      'Algorithmic Complexity Comparison benchmark comparing 3 classification models under varying data sizes.',
      'System Architecture Trade-off Analysis document balancing scraping latency vs server memory.'
    ]
  },
  'Problem Solving': {
    icon: '🧩',
    roadmap: [
      { step: '01', title: 'Problem Definition & Constraint Identification', desc: 'Clarify input/output formats, boundary conditions, edge cases, and time/space constraints before writing any code.' },
      { step: '02', title: 'Modular Decomposition & Sub-Tasking', desc: 'Deconstruct complex multi-faceted systems into independent, testable sub-problems with clear interface contracts.' },
      { step: '03', title: 'Pattern Recognition & Data Structure Mapping', desc: 'Recognize underlying problem structures and map them to appropriate data structures (HashMaps, Graphs, Heaps, Trees).' },
      { step: '04', title: 'Iterative Prototyping & Incremental Refinement', desc: 'Build a minimal viable working solution first, verify its correctness, and then iteratively optimize performance.' },
      { step: '05', title: 'Defensive Engineering & Stress Testing', desc: 'Design comprehensive test suites covering malformed inputs, edge values, race conditions, and graceful degradation.' }
    ],
    resources: [
      { name: 'LeetCode Problem Solving Platform', url: 'https://leetcode.com/', desc: 'The industry-standard coding platform for practicing data structures and algorithmic challenge patterns.' },
      { name: 'NeetCode Structured Roadmap', url: 'https://neetcode.io/roadmap', desc: 'Curated visual roadmap organizing core algorithmic patterns into structured problem sets.' },
      { name: 'How to Solve It by George Pólya (Summary)', url: 'https://en.wikipedia.org/wiki/How_to_Solve_It', desc: 'The legendary four-stage problem-solving heuristic framework: Understand, Plan, Carry Out, Look Back.' },
      { name: 'How to Think Like a Programmer (YouTube)', url: 'https://www.youtube.com/results?search_query=how+to+think+like+a+programmer', desc: 'Inspiring lectures on breaking down difficult programming problems into conquerable pieces.' }
    ],
    projects: [
      'Solving 50+ Core Algorithmic Challenges covering Arrays, Binary Trees, and Dynamic Programming on LeetCode.',
      'Diagnosing and resolving a subtle concurrency race condition in a multi-threaded Python script.'
    ]
  },
  'Communication': {
    icon: '🗣️',
    roadmap: [
      { step: '01', title: 'Technical Precision & Conciseness', desc: 'Articulate intricate architecture clearly without unnecessary fluff; choose precise technical terminology.' },
      { step: '02', title: 'Active Listening & Requirement Alignment', desc: 'Confirm understanding before replying, ask clarifying questions, and ensure alignment with project goals.' },
      { step: '03', title: 'Structured Written Documentation', desc: 'Write comprehensive READMEs, clear pull request descriptions, actionable bug reports, and API documentation.' },
      { step: '04', title: 'Visual Architecture Presentation', desc: 'Use architectural diagrams (Mermaid, flowcharts, data schemas) to convey system relationships at a glance.' },
      { step: '05', title: 'Cross-Functional Stakeholder Alignment', desc: 'Translate complex technical trade-offs into plain business impacts for non-technical stakeholders and clients.' }
    ],
    resources: [
      { name: 'Google Technical Writing Courses', url: 'https://developers.google.com/tech-writing', desc: 'Free online courses by Google engineers on communicating complex software concepts with clarity.' },
      { name: 'Write the Docs Community Resources', url: 'https://www.writethedocs.org/', desc: 'Global community focused on best practices for software documentation and technical communication.' },
      { name: 'Toastmasters Public Speaking Resources', url: 'https://www.toastmasters.org/', desc: 'Time-tested techniques for clear oral presentation, speech structuring, and impromptu speaking.' },
      { name: 'Technical Communication for Engineers (YouTube)', url: 'https://www.youtube.com/results?search_query=technical+communication+for+engineers', desc: 'Video masterclasses on presenting engineering projects confidently to team members and leaders.' }
    ],
    projects: [
      'Complete Technical System Architecture Whitepaper documenting portfolio 3D & AI subsystems.',
      'Recorded 5-minute video presentation and screen demo walking through an AI project architecture.'
    ]
  },
  'Pressure Handling': {
    icon: '🛡️',
    roadmap: [
      { step: '01', title: 'Cognitive Prioritization & Triage', desc: 'Triage incoming demands under strict deadlines using the Eisenhower matrix; address blocking fires first.' },
      { step: '02', title: 'Emotional Regulation & Composure', desc: 'Maintain objective clarity during production outages, avoiding panic and focusing on methodical diagnostic logs.' },
      { step: '03', title: 'Blameless Incident Management', desc: 'Follow structured incident recovery protocols, isolate fault boundaries, and conduct constructive post-mortems.' },
      { step: '04', title: 'Deep Work & Timebox Discipline', desc: 'Eliminate contextual interruptions through timeboxed focus sessions (Pomodoro) to deliver critical code.' },
      { step: '05', title: 'Stress Inoculation via Mock Outages', desc: 'Simulate high-stakes production breaks and timed competitive hackathons to build calm resilience.' }
    ],
    resources: [
      { name: 'Google SRE Book: Managing Incidents', url: 'https://sre.google/sre-book/managing-incidents/', desc: 'Official Google Site Reliability Engineering guide on handling critical production emergencies.' },
      { name: 'Deep Work by Cal Newport (Concepts)', url: 'https://calnewport.com/books/deep-work/', desc: 'Actionable frameworks for intense focus and peak productivity in distracting environments.' },
      { name: 'MindTools Stress Management Frameworks', url: 'https://www.mindtools.com/', desc: 'Proven strategies for cognitive resilience, cognitive reframing, and peak pressure performance.' },
      { name: 'Handling Pressure in Tech (YouTube)', url: 'https://www.youtube.com/results?search_query=handling+pressure+as+a+software+engineer', desc: 'Experienced tech leads discussing how to navigate tight release dates and production outages calmly.' }
    ],
    projects: [
      '24-Hour Hackathon delivery building a working MVP under tight time and scope constraints.',
      'Disaster Recovery Runbook documenting step-by-step restoration procedures for cloud services.'
    ]
  },
  'Adaptive Nature': {
    icon: '🌊',
    roadmap: [
      { step: '01', title: 'Rapid Technology Onboarding', desc: 'Read official documentation and API references quickly to grasp core mental models of unfamiliar libraries.' },
      { step: '02', title: 'Continuous Learning Mindset', desc: 'Stay hungry for emerging advances in AI, large language models, autonomous agents, and web technologies.' },
      { step: '03', title: 'Graceful Architectural Pivoting', desc: 'Refactor codebases without frustration when project specifications or client requirements shift unexpectedly.' },
      { step: '04', title: 'Cross-Disciplinary Bridge Building', desc: 'Connect disparate fields — machine learning modeling, frontend hardware-accelerated 3D, and cloud pipelines.' },
      { step: '05', title: 'Unlearning Obsolete Paradigms', desc: 'Willingness to retire deprecated patterns in favor of modern, robust, and performant industry best practices.' }
    ],
    resources: [
      { name: 'MIT OpenCourseWare Computer Science', url: 'https://ocw.mit.edu/', desc: 'Free access to cutting-edge university curriculum across modern computing disciplines.' },
      { name: 'Hacker News & GitHub Trending Feeds', url: 'https://news.ycombinator.com/', desc: 'Daily pulses of developer breakthroughs, new tools, and architectural paradigm shifts.' },
      { name: 'ArXiv Machine Learning Preprints', url: 'https://arxiv.org/list/cs.LG/recent', desc: 'The frontline of scientific and AI research papers published daily by global researchers.' },
      { name: 'How to Learn New Tech Fast (YouTube)', url: 'https://www.youtube.com/results?search_query=how+to+learn+new+technologies+fast', desc: 'Proven study systems used by senior engineers to pick up new frameworks in record time.' }
    ],
    projects: [
      'Self-directed integration of Three.js 3D WebGL physics engine into an existing web codebase.',
      'Rapid migration from classical Scikit-Learn workflows to autonomous n8n agentic pipelines.'
    ]
  },
  'Collaboration': {
    icon: '🤝',
    roadmap: [
      { step: '01', title: 'Git & Version Control Etiquette', desc: 'Write clean atomic commits, maintain branch hygiene, write descriptive commit messages, and rebase cleanly.' },
      { step: '02', title: 'Empathetic & Rigorous Code Reviews', desc: 'Review peer pull requests thoroughly, provide actionable and respectful feedback, and welcome constructive critiques.' },
      { step: '03', title: 'Agile Ceremonies & Transparent Status', desc: 'Participate actively in sprint standups, backlog refinement, retrospectives, and communicate blockers early.' },
      { step: '04', title: 'Shared Knowledge & Documentation', desc: 'Build shared team wikis and setup scripts to eradicate knowledge silos and empower smooth teammate onboarding.' },
      { step: '05', title: 'Pair Programming & Synchronous Problem Solving', desc: 'Collaborate live with peers to navigate complex algorithmic bottlenecks and architectural refactors.' }
    ],
    resources: [
      { name: 'Atlassian Git Team Workflows Guide', url: 'https://www.atlassian.com/git/tutorials/comparing-workflows', desc: 'Industry-standard guidelines on Gitflow, feature branching, and collaborative development.' },
      { name: 'Thoughtbot Code Review Guides', url: 'https://github.com/thoughtbot/guides/tree/main/code-review', desc: 'Exemplary principles for conducting constructive, humble, and thorough code reviews.' },
      { name: 'FreeCodeCamp Open Source Guide', url: 'https://www.freecodecamp.org/news/how-to-contribute-to-open-source/', desc: 'Detailed walkthrough on how to collaborate and contribute effectively to open source repositories.' },
      { name: 'How to Collaborate on GitHub (YouTube)', url: 'https://www.youtube.com/results?search_query=how+to+collaborate+on+github', desc: 'Video masterclass explaining team forks, pull requests, branch protection, and collaborative review.' }
    ],
    projects: [
      'Multi-Contributor Open Source contribution via tested, reviewed pull request with CI pass.',
      'Paired collaboration on a multi-module NGO portal with shared git branches and issue tracking.'
    ]
  }
};

function renderSkills() {
  const container = document.getElementById('skillsGrid');
  if (!container) return;

  // Strict categories directly from Harshit's resume
  const categories = [
    {
      title: 'AI & Machine Learning',
      icon: '🧠',
      tagline: 'Core Modeling & Neural Architectures',
      skills: [
        'Machine Learning',
        'Neural Networks',
        'TensorFlow',
        'Large Language Models (LLMs)',
        'Computer Vision (OpenCV)'
      ]
    },
    {
      title: 'Programming Languages',
      icon: '💻',
      tagline: 'Algorithmic Software Engineering',
      skills: [
        'Python 3',
        'Java',
        'C++',
        'JavaScript (ES6+)'
      ]
    },
    {
      title: 'Data & Libraries',
      icon: '📊',
      tagline: 'Exploratory & Quantitative Analytics',
      skills: [
        'Pandas',
        'NumPy',
        'Scikit-Learn',
        'Data Cleaning & EDA'
      ]
    },
    {
      title: 'Web Technologies',
      icon: '🌐',
      tagline: 'Interactive Full-Stack Applications',
      skills: [
        'React.js',
        'HTML5',
        'CSS3',
        'RESTful APIs'
      ]
    },
    {
      title: 'Database & Systems',
      icon: '🗄️',
      tagline: 'Data Persistence & Environment',
      skills: [
        'MySQL Relational DB',
        'Linux Environment',
        'Git & GitHub'
      ]
    },
    {
      title: 'Soft Skills & Mindset',
      icon: '⚡',
      tagline: 'Professional Engineering Standards',
      skills: [
        'Analytical Thinking',
        'Problem Solving',
        'Communication',
        'Pressure Handling',
        'Adaptive Nature',
        'Collaboration'
      ]
    }
  ];

  container.innerHTML = categories.map(cat => `
    <div class="skill-category-card glass tilt-card reveal">
      <div class="category-header">
        <div class="category-icon">${cat.icon}</div>
        <div>
          <h3 class="category-title">${cat.title}</h3>
          <span class="category-tagline">${cat.tagline}</span>
        </div>
      </div>
      <div class="skill-badge-cloud">
        ${cat.skills.map(s => `
          <button class="skill-badge-pill" data-skill="${s}" data-category="${cat.title}" data-icon="${cat.icon}" aria-label="Explore learning pathway for ${s}" title="Click to view step-by-step roadmap and free resources">
            <span class="badge-dot"></span>
            <span class="skill-pill-name">${s}</span>
            <span class="skill-learn-hint">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              <span>Learn ↗</span>
            </span>
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Wire up click event handlers for skill pills
  const skillPills = container.querySelectorAll('.skill-badge-pill');
  skillPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const skillName = pill.getAttribute('data-skill');
      const category = pill.getAttribute('data-category');
      const icon = pill.getAttribute('data-icon');
      openSkillModal(skillName, category, icon);
    });
  });

  initDynamic3DCardTilt();
}

/* ----------------------------------------------------------------
   SKILL LEARNING MODAL CONTROLLER
   ---------------------------------------------------------------- */
function openSkillModal(skillName, category, defaultIcon) {
  const overlay = document.getElementById('skillModalOverlay');
  const iconEl = document.getElementById('modalSkillIcon');
  const titleEl = document.getElementById('modalSkillTitle');
  const catEl = document.getElementById('modalSkillCategory');
  const timelineEl = document.getElementById('modalRoadmapTimeline');
  const resourcesEl = document.getElementById('modalResourcesGrid');
  const projectsEl = document.getElementById('modalProjectsList');

  if (!overlay || !timelineEl || !resourcesEl || !projectsEl) return;

  const data = SKILL_ROADMAP_DATABASE[skillName] || {
    icon: defaultIcon || '💡',
    roadmap: [
      { step: '01', title: 'Core Principles & Foundational Theory', desc: `Master the essential syntax, architecture, and theoretical foundations of ${skillName}.` },
      { step: '02', title: 'Tools & Standard Practices', desc: `Configure modern development environments, learn idiomatic paradigms, and study official references.` },
      { step: '03', title: 'Practical Hands-on Implementation', desc: `Build isolated algorithmic solutions and integrate ${skillName} into modular workflows.` },
      { step: '04', title: 'Optimization & Testing Architecture', desc: `Refactor for peak performance, profile memory and execution speed, and implement unit tests.` },
      { step: '05', title: 'Production Engineering & Deployment', desc: `Deploy robust solutions to production with monitoring, telemetry, and automated CI/CD.` }
    ],
    resources: [
      { name: `${skillName} Official Documentation`, url: `https://google.com/search?q=${encodeURIComponent(skillName + ' official documentation')}`, desc: `Authoritative specifications and developer reference manual.` },
      { name: 'FreeCodeCamp Interactive Curriculum', url: 'https://www.freecodecamp.org/', desc: 'Free verified certifications and interactive developer coursework.' },
      { name: 'Coursera & University MOOCs', url: `https://www.coursera.org/search?query=${encodeURIComponent(skillName)}`, desc: 'Academic and industry courses taught by top global professors.' },
      { name: `${skillName} Tutorials on YouTube`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skillName + ' tutorial course')}`, desc: 'Top curated visual video walkthroughs and programming guides.' }
    ],
    projects: [
      `End-to-end practical application utilizing ${skillName} deployed with a responsive interface.`,
      `Performance-benchmarked solution testing algorithmic boundary conditions in ${skillName}.`
    ]
  };

  iconEl.textContent = data.icon || defaultIcon || '💡';
  titleEl.textContent = skillName;
  catEl.textContent = category || 'Verified Competency';

  // Render 5-Step Roadmap
  timelineEl.innerHTML = data.roadmap.map(item => `
    <div class="roadmap-step-item">
      <div class="step-num-badge">${item.step}</div>
      <div class="step-info">
        <div class="step-title">${item.title}</div>
        <p class="step-desc">${item.desc}</p>
      </div>
    </div>
  `).join('');

  // Render Curated Free Resources
  resourcesEl.innerHTML = data.resources.map(res => `
    <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="resource-card-link">
      <div class="resource-card-title-row">
        <span class="resource-card-name">${res.name}</span>
        <span class="resource-card-icon">↗</span>
      </div>
      <p class="resource-card-desc">${res.desc}</p>
    </a>
  `).join('');

  // Render Hands-on Project Ideas
  projectsEl.innerHTML = data.projects.map(idea => `
    <li>
      <span class="idea-marker">✓</span>
      <span>${idea}</span>
    </li>
  `).join('');

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function initSkillModal() {
  const overlay = document.getElementById('skillModalOverlay');
  const closeBtn = document.getElementById('skillModalClose');
  const footerCloseBtn = document.getElementById('skillModalCloseFooter');

  if (!overlay) return;

  const closeModal = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ----------------------------------------------------------------
   12. RENDER FEATURED PROJECTS (PORTFOLIO #1 WITH LIVE DEMO + ALL VERIFIED PROJECTS)
   ---------------------------------------------------------------- */
function renderProjects() {
  const filtersContainer = document.getElementById('projectFilters');
  const gridContainer = document.getElementById('projectsGrid');
  if (!gridContainer) return;

  // Complete roster of 12 authentic projects from BOTH GitHub accounts (@har-001 & @harshit-001-it)
  // ONLY Personal Portfolio Website has a live link, as requested
  const resumeProjects = [
    {
      name: 'Personal Portfolio Website',
      description: 'Hardware-accelerated 3D portfolio powered by Three.js WebGL cosmos, realistic dual-layer titanium & acrylic ID badge with lanyard physics, interactive skill learning pathways, and autonomous AI workstations. Deployed live with GitHub Pages & Vercel.',
      category: 'Web & 3D',
      tags: ['Three.js', 'WebGL', 'JavaScript', 'Physics Engine', 'Vercel'],
      url: 'https://github.com/har-001/Personal-Portfolio-Website',
      liveUrl: 'https://har-001.github.io/Personal-Portfolio-Website/',
      featured: true,
      icon: '🌐'
    },
    {
      name: 'NIVA AI Assistant',
      description: 'Intelligent conversational and task automation assistant engineered to streamline user workflows, execute commands, and deliver structured AI intelligence.',
      category: 'AI & ML',
      tags: ['Python', 'AI Assistant', 'Automation', 'LLM'],
      url: 'https://github.com/har-001/NIVA',
      liveUrl: null,
      featured: false,
      icon: '🤖'
    },
    {
      name: 'Human Emotion Recognition System',
      description: 'Real-time facial expression and emotional sentiment detection engine utilizing Deep Learning Convolutional Neural Networks (CNN) and OpenCV for live webcam and video inference.',
      category: 'AI & ML',
      tags: ['Python', 'CNN', 'OpenCV', 'Deep Learning'],
      url: 'https://github.com/harshit-001-it/Human-Emotion-Recognition-System',
      liveUrl: null,
      featured: false,
      icon: '🧠'
    },
    {
      name: 'Diabetes Prediction System',
      description: 'Predictive clinical diagnostic engine where users input health data metrics to calculate diabetes risk vulnerability powered by an optimized Scikit-Learn classifier.',
      category: 'AI & ML',
      tags: ['Python', 'Scikit-Learn', 'Classification', 'Healthcare'],
      url: 'https://github.com/harshit-001-it/Diabetes-Prediction',
      liveUrl: null,
      featured: false,
      icon: '🩺'
    },
    {
      name: 'Heart Disease Prediction',
      description: 'Supervised machine learning risk assessment classifier evaluating clinical diagnostic indicators to predict cardiovascular condition vulnerability.',
      category: 'AI & ML',
      tags: ['Python', 'Machine Learning', 'Healthcare', 'EDA'],
      url: 'https://github.com/harshit-001-it/Heart-Disease-Prediction',
      liveUrl: null,
      featured: false,
      icon: '❤️'
    },
    {
      name: 'Fake News Prediction',
      description: 'Natural language processing classifier that evaluates article contents and linguistic patterns using TF-IDF vectorization and Logistic Regression to identify authentic versus fabricated news.',
      category: 'AI & ML',
      tags: ['Python', 'NLP', 'TF-IDF', 'Machine Learning'],
      url: 'https://github.com/harshit-001-it/Fake-News-Prediction',
      liveUrl: null,
      featured: false,
      icon: '📰'
    },
    {
      name: 'Rock and Stone Prediction with Sonar',
      description: 'Acoustic signal classification system analyzing 60-band underwater sonar frequency reflections to accurately discriminate between submerged metal cylinders and seabed rock formations.',
      category: 'AI & ML',
      tags: ['Python', 'NumPy', 'Signal Processing', 'ML Classifier'],
      url: 'https://github.com/harshit-001-it/Rock-and-Stone-Prediction-With-Sonar',
      liveUrl: null,
      featured: false,
      icon: '🌊'
    },
    {
      name: 'VedoraAI Trading Prediction Bot',
      description: 'Quantitative algorithmic trading bot designed to analyze live financial chart data and forecast market direction using predictive AI modeling.',
      category: 'AI & ML',
      tags: ['Python', 'Financial Analytics', 'Trading Bot', 'AI Modeling'],
      url: 'https://github.com/har-001/VedoraAI-Bot',
      liveUrl: null,
      featured: false,
      icon: '📈'
    },
    {
      name: 'VedoraAI Platform',
      description: 'Modern financial analytics platform empowering traders with algorithmic market insights and AI-driven trade execution pipelines.',
      category: 'Web & 3D',
      tags: ['Full-Stack', 'AI Trading', 'Python', 'Web Architecture'],
      url: 'https://github.com/har-001/VedoraAI',
      liveUrl: null,
      featured: false,
      icon: '💼'
    },
    {
      name: 'Library Management System',
      description: 'Administrative relational database application engineered with Python and MySQL to handle book cataloging, student issues, and circulation records.',
      category: 'Systems & DB',
      tags: ['Python', 'MySQL', 'Relational DB', 'CRUD'],
      url: 'https://github.com/harshit-001-it/Library-Management-System',
      liveUrl: null,
      featured: false,
      icon: '📚'
    },
    {
      name: 'QR Code Generator Automation',
      description: 'Automated utility script generating customized high-density QR codes for web links, documents, and network configurations.',
      category: 'Systems & DB',
      tags: ['Python', 'Automation', 'Utility', 'QR Encoding'],
      url: 'https://github.com/har-001/Qr-Generator',
      liveUrl: null,
      featured: false,
      icon: '📱'
    },
    {
      name: 'NextGen AI Solutions',
      description: 'Exploratory artificial intelligence repository containing neural model experiments, algorithm architectures, and next-generation AI tools.',
      category: 'AI & ML',
      tags: ['AI Modeling', 'Neural Networks', 'Python', 'Innovation'],
      url: 'https://github.com/har-001/NextGen-AI-Solutions',
      liveUrl: null,
      featured: false,
      icon: '⚡'
    }
  ];

  const categories = ['All', 'AI & ML', 'Systems & DB', 'Web & 3D'];
  if (filtersContainer) {
    filtersContainer.innerHTML = categories.map((c, i) => `
      <button class="filter-btn ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>
    `).join('');

    const btns = filtersContainer.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const selected = btn.getAttribute('data-cat');
        renderCards(selected);
      });
    });
  }

  function renderCards(filterCat) {
    const filtered = filterCat === 'All'
      ? resumeProjects
      : resumeProjects.filter(p => p.category === filterCat || p.tags.includes(filterCat));

    gridContainer.innerHTML = filtered.map(p => `
      <div class="project-card glass tilt-card reveal ${p.featured ? 'featured-project' : ''}">
        ${p.featured ? '<div class="project-featured-badge">⭐ #1 Featured Project • Live Demo</div>' : ''}
        <div class="project-card-header">
          <div class="project-icon-box">${p.icon || '🚀'}</div>
          <div class="project-links-row">
            ${p.liveUrl ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-live-preview" title="Open Live Site">
                <span class="live-pulse-dot"></span>
                <span>Live Demo</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            ` : ''}
            <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="icon-link" title="View Source Code on GitHub" aria-label="GitHub Repository">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
          </div>
        </div>
        <h3 class="project-title">${p.name}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');

    initDynamic3DCardTilt();
  }

  renderCards('All');
}

/* ----------------------------------------------------------------
   13. RENDER AUTHENTIC CERTIFICATES (MATCHING CERTIFICATES FOLDER)
   ---------------------------------------------------------------- */
const certificateData = [
  {
    id: 1,
    title: 'AI Web Development Internship Letter 1',
    issuer: 'Inamigos Foundation',
    date: 'Jul 2026',
    icon: '🌐',
    desc: 'Official Certificate of Internship for successful completion of the AI Web Development Internship at Inamigos Foundation.',
    skills: ['AI Web Development', 'Frontend Architecture', 'NGO Donation Portal'],
    file: 'Certificates/Inamigos Completion letter 1.pdf'
  },
  {
    id: 2,
    title: 'AI Web Development Internship Letter 2',
    issuer: 'Inamigos Foundation',
    date: 'Aug 2026',
    icon: '📜',
    desc: 'Advanced Phase Certificate of Internship acknowledging completion of core web modules and full-stack integration.',
    skills: ['Full-Stack Integration', 'Responsive UI', 'Production Workflow'],
    file: 'Certificates/Inamigos Completion letter 2.pdf'
  },
  {
    id: 3,
    title: 'Python Programming Internship Certificate',
    issuer: 'InternPe',
    date: 'Jun 2025',
    icon: '🐍',
    desc: 'Official Certificate of Completion awarded for one-month intensive Python Programming Internship.',
    skills: ['Python 3', 'Data Structures', 'Algorithmic Problem Solving', 'Modular Code'],
    file: 'Certificates/InternPe Completion Letter.png'
  },
  {
    id: 4,
    title: 'Advance Internet of Things (IoT) Training',
    issuer: 'Technoledge Eduresearch & IIMT',
    date: 'Academic Workshop',
    icon: '📡',
    desc: 'Certificate of Completion for fulfilling all requirements of the Advance Internet of Things training program.',
    skills: ['Internet of Things (IoT)', 'Sensors', 'Embedded Systems', 'Telemetry'],
    file: 'Certificates/PrintMerge1 373.pdf'
  },
  {
    id: 5,
    title: 'Technical Training Program Completion',
    issuer: 'Technoledge Eduresearch / IIMT',
    date: 'May Batch',
    icon: '🏆',
    desc: 'Technical competency recognition from Technoledge Eduresearch Pvt. Ltd. and IIMT College.',
    skills: ['Applied Engineering', 'Hardware-Software Interfacing', 'Systems Architecture'],
    file: 'Certificates/IIMT May batch 99.pdf'
  },
  {
    id: 6,
    title: 'Technical Certification Matrix',
    issuer: 'AKTU / IIMT Verification Record',
    date: 'May 2025',
    icon: '💻',
    desc: 'Verified academic and technical achievement record certified for Harshit Mishra.',
    skills: ['Machine Learning', 'Python Solutions', 'Applied IT Systems'],
    file: 'Certificates/1746987610367.pdf'
  },
  {
    id: 7,
    title: 'Professional Workshop & Training Credentials',
    issuer: 'Softpro India / Tech Training',
    date: 'Technical Program',
    icon: '⚙️',
    desc: 'Hands-on practical training credential in modern software technologies and engineering frameworks.',
    skills: ['Software Engineering', 'System Tools', 'Practical Frameworks'],
    file: 'Certificates/1746506117256.jpeg'
  }
];

function renderCertificates() {
  const container = document.getElementById('certificatesGrid');
  if (!container) return;

  container.innerHTML = certificateData.map(cert => `
    <div class="cert-card glass tilt-card reveal" data-cert-id="${cert.id}">
      <div>
        <div class="cert-header">
          <div class="cert-icon">${cert.icon}</div>
          <span class="cert-date">${cert.date}</span>
        </div>
        <h3 class="cert-title">${cert.title}</h3>
        <p class="cert-issuer">${cert.issuer}</p>
        <p class="cert-desc">${cert.desc}</p>
      </div>
      <div class="cert-actions">
        <a href="${cert.file}" target="_blank" rel="noopener" class="cert-btn-verify">
          <span>View Document</span> ↗
        </a>
      </div>
    </div>
  `).join('');

  initDynamic3DCardTilt();
}

/* ----------------------------------------------------------------
   14. CERTIFICATE MODAL
   ---------------------------------------------------------------- */
function initCertificateModal() {
  const overlay = document.getElementById('certModalOverlay');
  const closeBtn = document.getElementById('certModalClose');
  const title = document.getElementById('certModalTitle');
  const issuer = document.getElementById('certModalIssuer');
  const skillsList = document.getElementById('certModalSkills');
  const verifyLink = document.getElementById('certModalVerifyLink');

  if (!overlay || !closeBtn) return;

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

/* ----------------------------------------------------------------
   15. CONTACT FORM SUBMISSION
   ---------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    status.innerHTML = `<span style="color:var(--accent-cyan);">Preparing message dispatch...</span>`;

    // Construct mailto fallback
    const mailtoLink = `mailto:harshitmishra1208@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      status.innerHTML = `<span style="color:#34d399;">Opening your mail client to send message to harshitmishra1208@gmail.com ✓</span>`;
      form.reset();
    }, 600);
  });
}

/* ----------------------------------------------------------------
   16. THEME TOGGLE
   ---------------------------------------------------------------- */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    toggle.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
  });
}
