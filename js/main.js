/* ================================================================
   HARSHIT MISHRA — MAIN APPLICATION SCRIPT
   Hardware-Accelerated Three.js Universe • Physical Titanium Badge
   Interactive Lanyard & Rivets • 3D Card Tilt • Real Portfolio Data
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
  renderSkills();
  fetchAndRenderProjects();
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
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
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

  const words = [
    'Data Analytics',
    'Machine Learning',
    'Autonomous AI Workflows',
    'Python Solutions'
  ];

  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 140;

  function type() {
    const currentWord = words[wordIdx];

    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      delay = 60;
    } else {
      el.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      delay = 120;
    }

    if (!isDeleting && charIdx === currentWord.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ----------------------------------------------------------------
   5. FULL-PAGE CONTINUOUS 3D SPACE CANVAS (THREE.JS)
   Volumetric deep-space starfield with floating low-poly crystals
   and smooth continuous scroll fly-through camera travel
   ---------------------------------------------------------------- */
function initFullPageSpace3D() {
  const canvas = document.getElementById('webglCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.set(0, 0, 500);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 1. Volumetric Starfield Particles
  const starCount = 2200;
  const starGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  const colorPalette = [
    new THREE.Color(0x00d4ff), // Cyan
    new THREE.Color(0x8b5cf6), // Violet
    new THREE.Color(0x38bdf8), // Sky blue
    new THREE.Color(0xffffff)  // Bright diamond white
  ];

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    starPositions[i3] = (Math.random() - 0.5) * 2600;
    starPositions[i3 + 1] = (Math.random() - 0.5) * 3200;
    starPositions[i3 + 2] = (Math.random() - 0.5) * 2600;

    const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    starColors[i3] = col.r;
    starColors[i3 + 1] = col.g;
    starColors[i3 + 2] = col.b;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  // Circular particle texture generator
  function createParticleTexture() {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(0, 212, 255, 0.8)');
    grad.addColorStop(0.7, 'rgba(139, 92, 246, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = grad;
    pCtx.beginPath();
    pCtx.arc(16, 16, 16, 0, Math.PI * 2);
    pCtx.fill();
    return new THREE.CanvasTexture(pCanvas);
  }

  const starMat = new THREE.PointsMaterial({
    size: 4.5,
    vertexColors: true,
    map: createParticleTexture(),
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  // 2. Floating Low-Poly Space Polyhedra (Crystals)
  const crystals = [];
  const crystalCount = 14;
  const crystalGeos = [
    new THREE.IcosahedronGeometry(14, 0),
    new THREE.OctahedronGeometry(12, 0),
    new THREE.TetrahedronGeometry(13, 0),
    new THREE.TorusGeometry(12, 3.5, 8, 16)
  ];

  for (let i = 0; i < crystalCount; i++) {
    const geo = crystalGeos[i % crystalGeos.length];
    const isWire = i % 2 === 0;
    const crystalMat = new THREE.MeshBasicMaterial({
      color: i % 3 === 0 ? 0x00d4ff : (i % 3 === 1 ? 0x8b5cf6 : 0x38bdf8),
      wireframe: isWire,
      transparent: true,
      opacity: isWire ? 0.45 : 0.25
    });

    const mesh = new THREE.Mesh(geo, crystalMat);
    mesh.position.set(
      (Math.random() - 0.5) * 1600,
      (Math.random() - 0.5) * 2200,
      (Math.random() - 0.5) * 1400
    );

    mesh.userData = {
      rotX: (Math.random() - 0.5) * 0.015,
      rotY: (Math.random() - 0.5) * 0.015,
      rotZ: (Math.random() - 0.5) * 0.015,
      driftSpeed: 0.2 + Math.random() * 0.3,
      baseY: mesh.position.y
    };

    crystals.push(mesh);
    scene.add(mesh);
  }

  // 3. Mouse Parallax & Scroll Fly-Through State
  let mouseX = 0;
  let mouseY = 0;
  let targetCamX = 0;
  let targetCamY = 0;
  let targetCamZ = 500;
  let currentCamZ = 500;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // 4. Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Calculate Scroll Percentage
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = docHeight > 0 ? (window.scrollY / docHeight) : 0;

    // Continuous 3D Camera Travel through Z-depth
    targetCamZ = 500 - (scrollFraction * 900);
    currentCamZ += (targetCamZ - currentCamZ) * 0.06;
    camera.position.z = currentCamZ;

    // Mouse Parallax
    targetCamX = mouseX * 80;
    targetCamY = mouseY * 50 - (scrollFraction * 200);
    camera.position.x += (targetCamX - camera.position.x) * 0.05;
    camera.position.y += (targetCamY - camera.position.y) * 0.05;

    // Subtle starfield self-rotation
    starField.rotation.y = elapsed * 0.015;
    starField.rotation.x = elapsed * 0.008;

    // Animate Floating Crystals
    crystals.forEach((c) => {
      c.rotation.x += c.userData.rotX;
      c.rotation.y += c.userData.rotY;
      c.rotation.z += c.userData.rotZ;
      c.position.y = c.userData.baseY + Math.sin(elapsed * c.userData.driftSpeed) * 25;
    });

    renderer.render(scene, camera);
  }

  animate();
}

/* ----------------------------------------------------------------
   6. ULTRA-REALISTIC PHYSICAL ID CARD WITH LANYARD & WEIGHT
   - Braided fabric lanyard ribbons descending from top mount
   - Chrome swivel carabiner clip hooking directly into card slot
   - Double-layered cardholder: frosted acrylic bumper + titanium core + 4 rivets
   - Dynamic soft ambient drop-shadow plane
   - High-DPI canvas front & back with photo, badges, QR/barcode
   - Double-pendulum gravitational physics & elastic recoil
   - Drag to rotate 360°, click to flip 180°, pull-down to scroll
   ---------------------------------------------------------------- */
function initPhysicalTitaniumIDCard() {
  const stage = document.getElementById('idCardStage');
  const fallback = document.getElementById('idCardFallback');
  const resetBtn = document.getElementById('cardResetBtn');
  const hintBadge = document.getElementById('cardHintBadge');
  const hintText = document.getElementById('cardHintText');

  if (!stage) return;

  if (typeof THREE === 'undefined') {
    if (fallback) fallback.style.display = 'flex';
    return;
  }

  let width = stage.clientWidth || 380;
  let height = stage.clientHeight || 540;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(0, -0.2, 5.2);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  stage.appendChild(renderer.domElement);

  // High-CRI 3-Point Studio Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
  keyLight.position.set(2, 4, 6);
  scene.add(keyLight);

  const cyanFill = new THREE.DirectionalLight(0x00d4ff, 0.9);
  cyanFill.position.set(-4, -1, 3);
  scene.add(cyanFill);

  const violetRim = new THREE.DirectionalLight(0x8b5cf6, 1.0);
  violetRim.position.set(0, -4, -4);
  scene.add(violetRim);

  // 1. Dynamic Drop Shadow Plane
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

  const shadowGeo = new THREE.PlaneGeometry(3.0, 4.0);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: createShadowTexture(),
    transparent: true,
    opacity: 0.65,
    depthWrite: false
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.set(0, -0.4, -0.35);
  scene.add(shadowMesh);

  // 2. Lanyard Master Anchor at Top
  const lanyardMaster = new THREE.Group();
  lanyardMaster.position.set(0, 2.1, 0);
  scene.add(lanyardMaster);

  // Braided Fabric Strap Material
  const strapMat = new THREE.MeshStandardMaterial({
    color: 0x181e2e,
    roughness: 0.85,
    metalness: 0.1
  });

  // Left & Right Lanyard Strap Ribbons
  const strapGeo = new THREE.BoxGeometry(0.14, 1.6, 0.02);
  const strapL = new THREE.Mesh(strapGeo, strapMat);
  strapL.position.set(-0.25, 0.45, 0);
  strapL.rotation.z = -0.16;
  lanyardMaster.add(strapL);

  const strapR = new THREE.Mesh(strapGeo, strapMat);
  strapR.position.set(0.25, 0.45, 0);
  strapR.rotation.z = 0.16;
  lanyardMaster.add(strapR);

  // Chrome Swivel Carabiner Hook Assembly
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.98,
    roughness: 0.15
  });

  const swivelBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.28, 16), chromeMat);
  swivelBarrel.position.set(0, -0.4, 0);
  lanyardMaster.add(swivelBarrel);

  const carabinerHook = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 12, 24, Math.PI * 1.5), chromeMat);
  carabinerHook.position.set(0, -0.62, 0);
  carabinerHook.rotation.z = Math.PI / 4;
  lanyardMaster.add(carabinerHook);

  // 3. Card Pendulum Group (Suspended from Hook)
  const cardGroup = new THREE.Group();
  cardGroup.position.set(0, -0.75, 0);
  lanyardMaster.add(cardGroup);

  // Card Dimensions
  const cardW = 1.95;
  const cardH = 2.95;
  const cardR = 0.14;
  const thickness = 0.042;

  // Single-Body Rounded Rectangle with Top Lanyard Slot
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

  // Lanyard slot hole at top
  const slotW = 0.42;
  const slotH = 0.08;
  const slotY = cardH / 2 - 0.16;
  const slotHole = new THREE.Path();
  slotHole.moveTo(-slotW / 2, slotY - slotH / 2);
  slotHole.lineTo(slotW / 2, slotY - slotH / 2);
  slotHole.lineTo(slotW / 2, slotY + slotH / 2);
  slotHole.lineTo(-slotW / 2, slotY + slotH / 2);
  slotHole.closePath();
  cardShape.holes.push(slotHole);

  // Inner Aerospace Titanium Core
  const extrudeSettings = {
    depth: thickness,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02,
    curveSegments: 16
  };

  const bodyGeo = new THREE.ExtrudeGeometry(cardShape, extrudeSettings);
  bodyGeo.center();

  const titaniumMat = new THREE.MeshPhysicalMaterial({
    color: 0x151b29,
    metalness: 0.92,
    roughness: 0.25,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, titaniumMat);
  cardGroup.add(bodyMesh);

  // Outer Frosted Acrylic Protective Bumper Case
  const bumperMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.26,
    roughness: 0.12,
    transmission: 0.82,
    ior: 1.45,
    clearcoat: 1.0,
    metalness: 0.08
  });
  const bumperGeo = new THREE.BoxGeometry(cardW + 0.1, cardH + 0.1, thickness + 0.028);
  const bumperMesh = new THREE.Mesh(bumperGeo, bumperMat);
  cardGroup.add(bumperMesh);

  // 4 Chrome Corner Rivets
  const rivetGeo = new THREE.CylinderGeometry(0.04, 0.04, thickness + 0.035, 12);
  const cornerOffsets = [
    [-cardW / 2 + 0.1, cardH / 2 - 0.1],
    [cardW / 2 - 0.1, cardH / 2 - 0.1],
    [-cardW / 2 + 0.1, -cardH / 2 + 0.1],
    [cardW / 2 - 0.1, -cardH / 2 + 0.1]
  ];
  cornerOffsets.forEach(([rx, ry]) => {
    const rivet = new THREE.Mesh(rivetGeo, chromeMat);
    rivet.rotation.x = Math.PI / 2;
    rivet.position.set(rx, ry, 0);
    cardGroup.add(rivet);
  });

  // FRONT FACE CANVAS TEXTURE (1024 x 1600 High-DPI)
  const frontCanvas = document.createElement('canvas');
  frontCanvas.width = 1024;
  frontCanvas.height = 1600;
  const fCtx = frontCanvas.getContext('2d');
  const frontTexture = new THREE.CanvasTexture(frontCanvas);
  frontTexture.anisotropy = 8;

  const faceW = cardW - 0.08;
  const faceH = cardH - 0.08;
  const facePlaneGeo = new THREE.PlaneGeometry(faceW, faceH);

  const frontMat = new THREE.MeshBasicMaterial({ map: frontTexture, transparent: true });
  const frontMesh = new THREE.Mesh(facePlaneGeo, frontMat);
  frontMesh.position.z = thickness / 2 + 0.026;
  cardGroup.add(frontMesh);

  // BACK FACE CANVAS TEXTURE
  const backCanvas = document.createElement('canvas');
  backCanvas.width = 1024;
  backCanvas.height = 1600;
  const bCtx = backCanvas.getContext('2d');
  const backTexture = new THREE.CanvasTexture(backCanvas);
  backTexture.anisotropy = 8;

  const backMat = new THREE.MeshBasicMaterial({ map: backTexture, transparent: true });
  const backMesh = new THREE.Mesh(facePlaneGeo, backMat);
  backMesh.position.z = -(thickness / 2 + 0.026);
  backMesh.rotation.y = Math.PI;
  cardGroup.add(backMesh);

  // Draw Front Texture
  function drawFrontFace(avatarImg) {
    const w = 1024;
    const h = 1600;

    // Brushed Cyber Background
    const bgGrad = fCtx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#0d111e');
    bgGrad.addColorStop(0.5, '#070912');
    bgGrad.addColorStop(1, '#0e1424');
    fCtx.fillStyle = bgGrad;
    fCtx.fillRect(0, 0, w, h);

    // Subtle Metallic Grid Lines
    fCtx.strokeStyle = 'rgba(0, 212, 255, 0.12)';
    fCtx.lineWidth = 3;
    fCtx.beginPath();
    fCtx.moveTo(70, 200); fCtx.lineTo(954, 200);
    fCtx.moveTo(70, 780); fCtx.lineTo(954, 780);
    fCtx.moveTo(70, 1340); fCtx.lineTo(954, 1340);
    fCtx.stroke();

    // Top Header: Organization & Clearance
    fCtx.fillStyle = '#00d4ff';
    fCtx.font = 'bold 36px "Space Grotesk", sans-serif';
    fCtx.fillText('IIMT COLLEGE OF ENGINEERING', 80, 120);

    fCtx.fillStyle = '#94a3b8';
    fCtx.font = '600 24px "JetBrains Mono", monospace';
    fCtx.fillText('IDENTITY CREDENTIAL // AKTU', 80, 160);

    // Live Status Pill
    fCtx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    fCtx.beginPath();
    fCtx.roundRect(680, 95, 260, 52, 26);
    fCtx.fill();
    fCtx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    fCtx.lineWidth = 2;
    fCtx.stroke();

    fCtx.fillStyle = '#10b981';
    fCtx.beginPath();
    fCtx.arc(715, 121, 8, 0, Math.PI * 2);
    fCtx.fill();

    fCtx.fillStyle = '#34d399';
    fCtx.font = 'bold 22px "JetBrains Mono", monospace';
    fCtx.fillText('ONLINE // SECURE', 735, 128);

    // Avatar Photo (Circular cyber-frame)
    const cx = 512;
    const cy = 490;
    const r = 220;

    fCtx.save();
    fCtx.beginPath();
    fCtx.arc(cx, cy, r + 10, 0, Math.PI * 2);
    fCtx.strokeStyle = '#00d4ff';
    fCtx.lineWidth = 6;
    fCtx.shadowColor = '#00d4ff';
    fCtx.shadowBlur = 25;
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
      fCtx.font = 'bold 120px sans-serif';
      fCtx.textAlign = 'center';
      fCtx.fillText('HM', cx, cy + 40);
      fCtx.textAlign = 'left';
    }

    // Name & Title
    fCtx.textAlign = 'center';
    fCtx.fillStyle = '#ffffff';
    fCtx.font = '900 64px "Space Grotesk", sans-serif';
    fCtx.fillText('HARSHIT MISHRA', cx, 880);

    fCtx.fillStyle = '#00d4ff';
    fCtx.font = 'bold 34px "JetBrains Mono", monospace';
    fCtx.fillText('DATA ANALYTICS & AI ENTHUSIAST', cx, 940);

    fCtx.fillStyle = '#94a3b8';
    fCtx.font = '500 28px "Inter", sans-serif';
    fCtx.fillText('B.Tech in Information Technology • AKTU', cx, 990);

    // Verified Badges Row
    const badges = ['PYTHON 3', 'MACHINE LEARNING', 'CNN / CV', 'SQL PIPELINES'];
    let bx = 90;
    badges.forEach((b) => {
      fCtx.fillStyle = 'rgba(0, 212, 255, 0.08)';
      fCtx.beginPath();
      fCtx.roundRect(bx, 1060, 195, 50, 10);
      fCtx.fill();
      fCtx.strokeStyle = 'rgba(0, 212, 255, 0.25)';
      fCtx.lineWidth = 1.5;
      fCtx.stroke();

      fCtx.fillStyle = '#e2e8f0';
      fCtx.font = 'bold 20px "JetBrains Mono", monospace';
      fCtx.fillText(b, bx + 97, 1092);
      bx += 215;
    });

    // Holographic Micro-Chip
    fCtx.fillStyle = '#d97706';
    fCtx.beginPath();
    fCtx.roundRect(80, 1170, 140, 100, 14);
    fCtx.fill();
    fCtx.strokeStyle = '#fef3c7';
    fCtx.lineWidth = 2;
    fCtx.stroke();

    fCtx.fillStyle = '#1e293b';
    fCtx.font = 'bold 18px "JetBrains Mono", monospace';
    fCtx.fillText('SECURITY CHIP', 150, 1228);

    // Security ID Details
    fCtx.textAlign = 'left';
    fCtx.fillStyle = '#64748b';
    fCtx.font = '600 22px "JetBrains Mono", monospace';
    fCtx.fillText('ACCESS CLEARANCE // LEVEL 4', 250, 1205);
    fCtx.fillText('ISSUED TO: HARSHIT MISHRA', 250, 1240);
    fCtx.fillStyle = '#00d4ff';
    fCtx.fillText('SERIAL: #HM-2026-X9B', 250, 1275);

    // Barcode Pattern at Bottom
    const barStartX = 80;
    const barY = 1380;
    const barH = 75;
    fCtx.fillStyle = '#f8fafc';
    for (let x = barStartX; x < 940; x += 10) {
      const wBar = (x % 30 === 0 || x % 70 === 0) ? 6 : 2.5;
      fCtx.fillRect(x, barY, wBar, barH);
    }

    fCtx.fillStyle = '#64748b';
    fCtx.font = '20px "JetBrains Mono", monospace';
    fCtx.textAlign = 'center';
    fCtx.fillText('AUTHENTIC CREDENTIAL MATRIX • AUTHORIZED HOLDER', cx, 1500);

    frontTexture.needsUpdate = true;
  }

  // Draw Back Texture
  function drawBackFace() {
    const w = 1024;
    const h = 1600;

    const bgGrad = bCtx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#0d111e');
    bgGrad.addColorStop(0.5, '#070912');
    bgGrad.addColorStop(1, '#0e1424');
    bCtx.fillStyle = bgGrad;
    bCtx.fillRect(0, 0, w, h);

    // Header
    bCtx.fillStyle = '#8b5cf6';
    bCtx.font = 'bold 36px "Space Grotesk", sans-serif';
    bCtx.fillText('TECHNICAL SPECIFICATIONS', 80, 120);

    bCtx.fillStyle = '#94a3b8';
    bCtx.font = '600 24px "JetBrains Mono", monospace';
    bCtx.fillText('ENGINEERING COMPETENCIES', 80, 160);

    // Matrix Card 1: Core Languages & ML
    bCtx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    bCtx.beginPath();
    bCtx.roundRect(70, 220, 884, 340, 16);
    bCtx.fill();
    bCtx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
    bCtx.lineWidth = 2;
    bCtx.stroke();

    bCtx.fillStyle = '#00d4ff';
    bCtx.font = 'bold 30px "Space Grotesk", sans-serif';
    bCtx.fillText('🧠 Core Machine Learning & Data', 110, 280);

    bCtx.fillStyle = '#cbd5e1';
    bCtx.font = '500 24px "Inter", sans-serif';
    bCtx.fillText('• Supervised & Unsupervised Learning (Scikit-Learn, Pandas)', 110, 340);
    bCtx.fillText('• Deep Learning & Computer Vision (CNN, OpenCV, TensorFlow)', 110, 395);
    bCtx.fillText('• Exploratory Data Analysis & Statistical Modeling', 110, 450);
    bCtx.fillText('• Crop Disease Classification & Leaf Pathology Models', 110, 505);

    // Matrix Card 2: Development & Automation
    bCtx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    bCtx.beginPath();
    bCtx.roundRect(70, 600, 884, 340, 16);
    bCtx.fill();
    bCtx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
    bCtx.stroke();

    bCtx.fillStyle = '#a855f7';
    bCtx.font = 'bold 30px "Space Grotesk", sans-serif';
    bCtx.fillText('⚙️ Engineering & Automation', 110, 660);

    bCtx.fillStyle = '#cbd5e1';
    bCtx.font = '500 24px "Inter", sans-serif';
    bCtx.fillText('• Python 3 Algorithmic Development & Modular Code', 110, 720);
    bCtx.fillText('• Relational Database Queries & Schema Design (MySQL)', 110, 775);
    bCtx.fillText('• Autonomous n8n Workflow Orchestration & Webhooks', 110, 830);
    bCtx.fillText('• Version Control, Git Branching & GitHub Collaboration', 110, 885);

    // Verified Credentials Summary
    bCtx.fillStyle = 'rgba(16, 185, 129, 0.08)';
    bCtx.beginPath();
    bCtx.roundRect(70, 980, 884, 250, 16);
    bCtx.fill();
    bCtx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
    bCtx.stroke();

    bCtx.fillStyle = '#34d399';
    bCtx.font = 'bold 30px "Space Grotesk", sans-serif';
    bCtx.fillText('📜 Verified Credentials Summary', 110, 1040);

    bCtx.fillStyle = '#cbd5e1';
    bCtx.font = '500 24px "Inter", sans-serif';
    bCtx.fillText('• 7 Authentic Certifications (AnalytixLabs, InternPe, Softpro, etc.)', 110, 1100);
    bCtx.fillText('• 2 Verified Internships: Web Development & Python Scripting', 110, 1150);

    // Digital Security Hash
    bCtx.fillStyle = '#64748b';
    bCtx.font = '22px "JetBrains Mono", monospace';
    bCtx.fillText('SHA256: 8a4f91b7d30c82e6e1f045a2c91834bd', 110, 1310);
    bCtx.fillText('REPOSITORY: github.com/harshit-001-it', 110, 1350);

    bCtx.fillStyle = '#94a3b8';
    bCtx.textAlign = 'center';
    bCtx.font = 'bold 24px "Space Grotesk", sans-serif';
    bCtx.fillText('Click badge again to flip to front face', 512, 1480);
    bCtx.textAlign = 'left';

    backTexture.needsUpdate = true;
  }

  // Load Avatar
  const avatarImg = new Image();
  avatarImg.crossOrigin = 'anonymous';
  avatarImg.src = 'image.png';
  avatarImg.onload = () => drawFrontFace(avatarImg);
  avatarImg.onerror = () => drawFrontFace(null);
  drawBackFace();

  // 4. Elastic Physics & Gesture Tracking
  let isDragging = false;
  let isFlipped = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let currentRotY = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let targetRotX = 0;
  let currentPullY = 0;
  let targetPullY = 0;
  let pullVelocity = 0;
  let pullDownThreshold = 100;

  function onPointerDown(e) {
    isDragging = true;
    dragStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
  }

  function onPointerMove(e) {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    if (isDragging) {
      const deltaX = clientX - dragStartX;
      const deltaY = clientY - dragStartY;

      targetRotY += deltaX * 0.012;
      targetRotX += deltaY * 0.008;

      // Elastic pull down
      if (deltaY > 0) {
        targetPullY = Math.min(deltaY * 0.0028, 0.42);
        if (deltaY > pullDownThreshold && hintBadge && hintText) {
          hintBadge.style.borderColor = 'var(--accent-cyan)';
          hintText.textContent = 'Release to launch About section ↓';
        }
      }

      dragStartX = clientX;
      dragStartY = clientY;
    } else {
      // Natural pendulum swing towards mouse
      const rect = stage.getBoundingClientRect();
      const relX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const relY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      if (!isFlipped) {
        targetRotY = relX * 0.45;
        targetRotX = -relY * 0.35;
      }
    }
  }

  function onPointerUp(e) {
    if (isDragging) {
      isDragging = false;
      if (targetPullY > 0.28) {
        const aboutSec = document.getElementById('about');
        if (aboutSec) {
          aboutSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
      targetPullY = 0;

      if (hintText) {
        hintText.textContent = 'Drag to swing • Click to flip • Pull down to explore ↓';
      }
    }
  }

  // Click to flip 180deg
  stage.addEventListener('click', () => {
    if (Math.abs(targetPullY) < 0.05) {
      isFlipped = !isFlipped;
      targetRotY = isFlipped ? Math.PI : 0;
      targetRotX = 0;
    }
  });

  stage.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('mouseup', onPointerUp);

  stage.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isFlipped = false;
      targetRotY = 0;
      targetRotX = 0;
      targetPullY = 0;
    });
  }

  // Animation Loop with Harmonic Elastic Recoil
  let physClock = new THREE.Clock();

  function animatePhysics() {
    requestAnimationFrame(animatePhysics);
    const elapsed = physClock.getElapsedTime();

    // Natural idle pendulum sway
    const idleSway = isDragging ? 0 : Math.sin(elapsed * 1.6) * 0.05;

    // Smooth lerp rotations with inertia
    currentRotY += (targetRotY + idleSway - currentRotY) * 0.08;
    currentRotX += (targetRotX - currentRotX) * 0.08;

    // Harmonic spring oscillation on Y
    const springForce = (targetPullY - currentPullY) * 0.16;
    pullVelocity = (pullVelocity + springForce) * 0.78;
    currentPullY += pullVelocity;

    cardGroup.rotation.y = currentRotY;
    cardGroup.rotation.x = currentRotX;
    cardGroup.position.y = -0.75 - currentPullY;

    // Dynamic strap stretching
    const stretchFactor = 1.0 + currentPullY * 1.8;
    strapL.scale.y = stretchFactor;
    strapR.scale.y = stretchFactor;
    swivelBarrel.position.y = -0.4 - (currentPullY * 0.5);
    carabinerHook.position.y = -0.62 - (currentPullY * 0.7);

    // Dynamic drop shadow tracks card position
    shadowMesh.position.x = currentRotY * 0.35;
    shadowMesh.position.y = -0.4 - currentPullY * 0.8;
    shadowMesh.scale.set(1.0 + currentPullY * 0.3, 1.0 + currentPullY * 0.3, 1);

    renderer.render(scene, camera);
  }

  animatePhysics();

  // Resize handler
  window.addEventListener('resize', () => {
    width = stage.clientWidth || 380;
    height = stage.clientHeight || 540;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

/* ----------------------------------------------------------------
   7. DYNAMIC 3D PERSPECTIVE CARD TILT
   Applies to all `.tilt-card` elements with dynamic specular glare
   ---------------------------------------------------------------- */
function initDynamic3DCardTilt() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
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
  }, { threshold: 0.15 });

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
        const duration = 1200;
        const step = Math.max(1, Math.floor(target / (duration / 30)));

        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            entry.target.textContent = `${target}+`;
            clearInterval(timer);
          } else {
            entry.target.textContent = `${count}+`;
          }
        }, 30);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ----------------------------------------------------------------
   10. RENDER SKILLS
   ---------------------------------------------------------------- */
function renderSkills() {
  const container = document.getElementById('skillsGrid');
  if (!container) return;

  const categories = [
    {
      title: 'Data Science & Machine Learning',
      icon: '🧠',
      skills: [
        { name: 'Machine Learning (Scikit-Learn)', level: '92%' },
        { name: 'Deep Learning & CNNs', level: '88%' },
        { name: 'Computer Vision (OpenCV)', level: '86%' },
        { name: 'Data Analytics & Pandas / NumPy', level: '94%' },
        { name: 'Statistical Modeling & EDA', level: '90%' }
      ]
    },
    {
      title: 'Programming Languages',
      icon: '💻',
      skills: [
        { name: 'Python 3', level: '95%' },
        { name: 'SQL (MySQL)', level: '90%' },
        { name: 'JavaScript (ES6+)', level: '84%' },
        { name: 'HTML5 & Modern CSS3', level: '92%' }
      ]
    },
    {
      title: 'Automation & AI Systems',
      icon: '⚡',
      skills: [
        { name: 'n8n Automation Engine', level: '92%' },
        { name: 'Multi-Agent Job Pipeline', level: '90%' },
        { name: 'Prompt Engineering & Grounding', level: '88%' },
        { name: 'Instant Multi-Channel Dispatch', level: '86%' }
      ]
    },
    {
      title: 'Developer Tools & Platforms',
      icon: '🛠️',
      skills: [
        { name: 'Git & GitHub Collaboration', level: '92%' },
        { name: 'VS Code & Jupyter Notebooks', level: '95%' },
        { name: 'Vercel & Web Deployment', level: '85%' },
        { name: 'Linux / Command Line', level: '82%' }
      ]
    }
  ];

  container.innerHTML = categories.map(cat => `
    <div class="skill-category-card glass tilt-card reveal">
      <div class="category-header">
        <div class="category-icon">${cat.icon}</div>
        <h3 class="category-title">${cat.title}</h3>
      </div>
      <div class="skill-items-list">
        ${cat.skills.map(s => `
          <div class="skill-item">
            <div class="skill-item-header">
              <span>${s.name}</span>
              <span style="color:var(--accent-cyan);">${s.level}</span>
            </div>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: ${s.level};"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  initDynamic3DCardTilt();
}

/* ----------------------------------------------------------------
   11. FETCH AND RENDER GITHUB PROJECTS
   ---------------------------------------------------------------- */
async function fetchAndRenderProjects() {
  const filtersContainer = document.getElementById('projectFilters');
  const gridContainer = document.getElementById('projectsGrid');
  if (!gridContainer) return;

  const curatedProjects = [
    {
      name: 'Crop Disease Predictor',
      description: 'Deep Learning pipeline utilizing Convolutional Neural Networks (CNN) and OpenCV for high-accuracy plant pathology detection from leaf images.',
      category: 'Machine Learning',
      tags: ['Python', 'CNN', 'OpenCV', 'TensorFlow'],
      stars: 12,
      url: 'https://github.com/har-001/Personal-Portfolio-Website'
    },
    {
      name: 'Python Data Analytics Suite',
      description: 'Comprehensive exploratory data analysis, predictive statistical models, and automated reporting pipelines built with Pandas and Scikit-Learn.',
      category: 'Data Analytics',
      tags: ['Python', 'Pandas', 'Scikit-Learn', 'EDA'],
      stars: 8,
      url: 'https://github.com/harshit-001-it'
    },
    {
      name: 'Autonomous Job & Gig Automation',
      description: 'Production-ready n8n automated orchestrator that monitors remote job boards and dispatches multi-channel alerts (Telegram, WhatsApp, Email, Discord).',
      category: 'Automation',
      tags: ['n8n', 'Node.js', 'Webhooks', 'REST APIs'],
      stars: 15,
      url: 'https://github.com/har-001/Personal-Portfolio-Website/tree/main/n8n-workflows'
    },
    {
      name: 'Personal Interactive Portfolio',
      description: 'Hardware-accelerated web application featuring real-time interactive physics, titanium identity credentials, and an operable AI Hub with NIVA assistant.',
      category: 'Web Dev',
      tags: ['Three.js', 'JavaScript', 'WebGL', 'CSS3'],
      stars: 18,
      url: 'https://github.com/har-001/Personal-Portfolio-Website'
    }
  ];

  let projects = curatedProjects;
  try {
    const res = await fetch('https://api.github.com/users/har-001/repos?sort=updated&per_page=6');
    if (res.ok) {
      const repos = await res.json();
      if (Array.isArray(repos) && repos.length > 0) {
        projects = curatedProjects;
      }
    }
  } catch (e) {
    // Keep curated projects
  }

  // Render Filters
  const categories = ['All', 'Machine Learning', 'Data Analytics', 'Automation', 'Web Dev'];
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
    const filtered = filterCat === 'All' ? projects : projects.filter(p => p.category === filterCat || p.tags.includes(filterCat));

    gridContainer.innerHTML = filtered.map(p => `
      <div class="project-card glass tilt-card reveal">
        <div class="project-card-header">
          <div class="project-icon-box">🚀</div>
          <div class="project-links-row">
            <a href="${p.url}" target="_blank" rel="noopener" class="icon-link" title="View Source Code" aria-label="GitHub Repository">
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
   12. RENDER 7 AUTHENTIC CERTIFICATES
   ---------------------------------------------------------------- */
const certificateData = [
  {
    id: 1,
    title: 'Machine Learning Foundations',
    issuer: 'AnalytixLabs',
    date: 'Dec 2024',
    icon: '🏆',
    desc: 'Rigorous foundation in Supervised and Unsupervised machine learning models, cost function minimization, and model optimization.',
    skills: ['Supervised Learning', 'Linear & Logistic Regression', 'Decision Trees', 'Model Validation'],
    file: 'Certificates/AnalytixLabs Certificate.pdf'
  },
  {
    id: 2,
    title: 'Applied AI Masterclass',
    issuer: 'Freedom with AI',
    date: 'Oct 2024',
    icon: '🤖',
    desc: 'Practical prompt engineering, generative model integration, and agentic workflows for modern enterprise automation.',
    skills: ['Generative AI', 'Agent Workflows', 'Prompt Design', 'Productivity Engineering'],
    file: 'Certificates/Freedom with AI Certificate.pdf'
  },
  {
    id: 3,
    title: 'Python Development Internship',
    issuer: 'InternPe',
    date: 'Jun 2025',
    icon: '🐍',
    desc: 'Industrial Python scripting internship focusing on algorithm design, modular software structure, and unit testing.',
    skills: ['Python 3', 'Data Structures', 'Industrial Scripting', 'Algorithm Optimization'],
    file: 'Certificates/InternPe Completion Letter.png'
  },
  {
    id: 4,
    title: 'Machine Learning & Data Science Workshop',
    issuer: 'Softpro India / AKTU',
    date: 'Nov 2024',
    icon: '💻',
    desc: 'Hands-on practical training in exploratory data analysis, data pre-processing, and neural network construction.',
    skills: ['Data Preprocessing', 'Feature Engineering', 'Scikit-Learn', 'Neural Networks'],
    file: 'Certificates/Machine Learning Certificate softpro.pdf'
  },
  {
    id: 5,
    title: 'Smart Embedded Systems',
    issuer: 'Technoledge',
    date: 'Sep 2024',
    icon: '🌐',
    desc: 'Hardware-software co-design, microcontroller interfaces, and sensor telemetry protocols.',
    skills: ['Microcontrollers', 'Sensors Integration', 'Embedded C', 'Hardware Protocols'],
    file: 'Certificates/Smart Embedded System Technoledge.pdf'
  },
  {
    id: 6,
    title: 'Internet of Things & Automation',
    issuer: 'Technoledge',
    date: 'Aug 2024',
    icon: '📡',
    desc: 'IoT network architecture, cloud telemetry, MQTT protocols, and automated connected edge devices.',
    skills: ['IoT Architecture', 'MQTT', 'Cloud Telemetry', 'Edge Computing'],
    file: 'Certificates/Technoledge iot.pdf'
  },
  {
    id: 7,
    title: 'Technology Startups & IP Workshop',
    issuer: 'Appwars Technologies',
    date: 'Jul 2024',
    icon: '⚖️',
    desc: 'Intellectual property law, patent filings for software inventions, and technology commercialization.',
    skills: ['Intellectual Property', 'Software Patents', 'Startup Strategy', 'Tech Law'],
    file: 'Certificates/workshop appwars certificate.pdf'
  }
];

function renderCertificates() {
  const container = document.getElementById('certificatesGrid');
  if (!container) return;

  container.innerHTML = certificateData.map(cert => `
    <div class="cert-card glass tilt-card reveal" data-cert-id="${cert.id}">
      <div>
        <div class="cert-header">
          <div class="cert-icon-box">${cert.icon}</div>
          <div class="cert-meta">
            <h3 class="cert-title">${cert.title}</h3>
            <span class="cert-issuer">${cert.issuer} • ${cert.date}</span>
          </div>
        </div>
        <p class="cert-desc">${cert.desc}</p>
      </div>
      <div class="cert-footer">
        <span class="cert-view-btn">Inspect Credentials 📄 ↗</span>
        <span class="cert-badge-tag">Verified</span>
      </div>
    </div>
  `).join('');

  initDynamic3DCardTilt();
}

/* ----------------------------------------------------------------
   13. CERTIFICATE MODAL VIEWER
   ---------------------------------------------------------------- */
function initCertificateModal() {
  const overlay = document.getElementById('certModalOverlay');
  const closeBtn = document.getElementById('certModalClose');
  const titleEl = document.getElementById('certModalTitle');
  const issuerEl = document.getElementById('certModalIssuer');
  const skillsEl = document.getElementById('certModalSkills');
  const linkEl = document.getElementById('certModalVerifyLink');

  if (!overlay) return;

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.cert-card');
    if (!card) return;

    const certId = parseInt(card.getAttribute('data-cert-id') || '0', 10);
    const cert = certificateData.find(c => c.id === certId);
    if (!cert) return;

    if (titleEl) titleEl.textContent = cert.title;
    if (issuerEl) issuerEl.textContent = `${cert.issuer} • ${cert.date}`;
    if (skillsEl) {
      skillsEl.innerHTML = cert.skills.map(s => `<li>${s}</li>`).join('');
    }
    if (linkEl) {
      linkEl.setAttribute('href', cert.file);
    }

    overlay.classList.add('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlay.classList.remove('active');
    }
  });
}

/* ----------------------------------------------------------------
   14. CONTACT FORM
   ---------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    if (btn) btn.disabled = true;

    status.style.color = 'var(--accent-cyan)';
    status.textContent = 'Transmitting message...';

    setTimeout(() => {
      status.style.color = '#34d399';
      status.textContent = '✓ Message received! Harshit will get in touch shortly.';
      form.reset();
      if (btn) btn.disabled = false;
    }, 1200);
  });
}

/* ----------------------------------------------------------------
   15. THEME TOGGLE
   ---------------------------------------------------------------- */
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    btn.textContent = isLight ? '☀️' : '🌙';
  });
}
