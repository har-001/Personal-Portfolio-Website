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

  if (!stage) return;

  if (typeof THREE === 'undefined') {
    if (fallback) fallback.style.display = 'flex';
    return;
  }

  let width = stage.clientWidth || 380;
  let height = stage.clientHeight || 540;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(0, 0, 5.0);

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

  // Realistic Studio Lighting Setup
  const ambient = new THREE.AmbientLight(0xffffff, 1.35);
  scene.add(ambient);

  // Key directional light creating specular sheen on card clearcoat
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(3, 5, 5);
  scene.add(keyLight);

  // Cyan fill from left
  const cyanFill = new THREE.DirectionalLight(0x00d4ff, 1.2);
  cyanFill.position.set(-4, -1, 3);
  scene.add(cyanFill);

  // Violet rim from back/right
  const violetRim = new THREE.DirectionalLight(0x8b5cf6, 1.2);
  violetRim.position.set(2, -4, -3);
  scene.add(violetRim);

  // Dynamic Drop Shadow onto wall plane
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
    new THREE.PlaneGeometry(3.2, 4.2),
    new THREE.MeshBasicMaterial({
      map: createShadowTexture(),
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    })
  );
  shadowMesh.position.set(0, 0, -0.4);
  scene.add(shadowMesh);

  // Lanyard Anchor at Top
  const lanyardMaster = new THREE.Group();
  lanyardMaster.position.set(0, 1.48, 0);
  scene.add(lanyardMaster);

  // Braided Fabric Strap Texture (Procedural Canvas)
  function createStrapTexture() {
    const strapCanvas = document.createElement('canvas');
    strapCanvas.width = 64;
    strapCanvas.height = 256;
    const sCtx = strapCanvas.getContext('2d');

    sCtx.fillStyle = '#101626';
    sCtx.fillRect(0, 0, 64, 256);

    // Diagonal herringbone weave pattern
    sCtx.strokeStyle = 'rgba(0, 212, 255, 0.25)';
    sCtx.lineWidth = 2;
    for (let y = -64; y < 320; y += 8) {
      sCtx.beginPath();
      sCtx.moveTo(0, y);
      sCtx.lineTo(32, y + 16);
      sCtx.lineTo(64, y);
      sCtx.stroke();
    }

    // Edge seams
    sCtx.strokeStyle = '#00d4ff';
    sCtx.lineWidth = 3;
    sCtx.beginPath();
    sCtx.moveTo(2, 0); sCtx.lineTo(2, 256);
    sCtx.moveTo(62, 0); sCtx.lineTo(62, 256);
    sCtx.stroke();

    const tex = new THREE.CanvasTexture(strapCanvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 2);
    return tex;
  }

  const strapMat = new THREE.MeshStandardMaterial({
    map: createStrapTexture(),
    roughness: 0.8,
    metalness: 0.15
  });

  const strapGeo = new THREE.BoxGeometry(0.14, 1.6, 0.02);
  const strapL = new THREE.Mesh(strapGeo, strapMat);
  strapL.position.set(-0.25, 0.45, 0);
  strapL.rotation.z = -0.16;
  lanyardMaster.add(strapL);

  const strapR = new THREE.Mesh(strapGeo, strapMat);
  strapR.position.set(0.25, 0.45, 0);
  strapR.rotation.z = 0.16;
  lanyardMaster.add(strapR);

  // Metallic Hardware (Chrome Finish)
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.98,
    roughness: 0.1
  });

  // Crimp clamp sleeve
  const crimpSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 0.08), chromeMat);
  crimpSleeve.position.set(0, 0.15, 0);
  lanyardMaster.add(crimpSleeve);

  // Swivel barrel
  const swivelBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.22, 16), chromeMat);
  swivelBarrel.position.set(0, 0.02, 0);
  lanyardMaster.add(swivelBarrel);

  // Carabiner Swivel Hook
  const carabinerHook = new THREE.Mesh(
    new THREE.TorusGeometry(0.13, 0.038, 12, 24, Math.PI * 1.55),
    chromeMat
  );
  carabinerHook.position.set(0, -0.16, 0);
  carabinerHook.rotation.z = Math.PI / 4;
  lanyardMaster.add(carabinerHook);

  // Card Pendulum Group (Centered vertically at world y = 0.0)
  const cardGroup = new THREE.Group();
  cardGroup.position.set(0, -1.48, 0);
  lanyardMaster.add(cardGroup);

  const cardW = 1.95;
  const cardH = 2.95;
  const cardR = 0.14;
  const thickness = 0.045;

  // Beveled Titanium / Composite Card Body
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

  // Slot Punch Hole
  const slotW = 0.42;
  const slotH = 0.085;
  const slotY = cardH / 2 - 0.16;
  const slotHole = new THREE.Path();
  slotHole.moveTo(-slotW / 2, slotY - slotH / 2);
  slotHole.lineTo(slotW / 2, slotY - slotH / 2);
  slotHole.lineTo(slotW / 2, slotY + slotH / 2);
  slotHole.lineTo(-slotW / 2, slotY + slotH / 2);
  slotHole.closePath();
  cardShape.holes.push(slotHole);

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

  // Dark Titanium Core Material with Specular Sheen
  const titaniumMat = new THREE.MeshPhysicalMaterial({
    color: 0x111625,
    metalness: 0.92,
    roughness: 0.22,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, titaniumMat);
  cardGroup.add(bodyMesh);

  // Clear Acrylic Protective Sleeve (Adds true physical glass/plastic casing)
  const casingShape = new THREE.Shape();
  const cW = cardW + 0.06;
  const cH = cardH + 0.08;
  const cR = 0.16;
  casingShape.moveTo(-cW / 2 + cR, cH / 2);
  casingShape.lineTo(cW / 2 - cR, cH / 2);
  casingShape.quadraticCurveTo(cW / 2, cH / 2, cW / 2, cH / 2 - cR);
  casingShape.lineTo(cW / 2, -cH / 2 + cR);
  casingShape.quadraticCurveTo(cW / 2, -cH / 2, cW / 2 - cR, -cH / 2);
  casingShape.lineTo(-cW / 2 + cR, -cH / 2);
  casingShape.quadraticCurveTo(-cW / 2, -cH / 2, -cW / 2, -cH / 2 + cR);
  casingShape.lineTo(-cW / 2, cH / 2 - cR);
  casingShape.quadraticCurveTo(-cW / 2, cH / 2, -cW / 2 + cR, cH / 2);
  casingShape.holes.push(slotHole);

  const casingGeo = new THREE.ExtrudeGeometry(casingShape, {
    depth: thickness + 0.025,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.012,
    bevelThickness: 0.012,
    curveSegments: 16
  });
  casingGeo.center();

  const acrylicMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.28,
    roughness: 0.08,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transmission: 0.85,
    depthWrite: false
  });
  const casingMesh = new THREE.Mesh(casingGeo, acrylicMat);
  cardGroup.add(casingMesh);

  // Corner Chrome Rivets
  const rivetGeo = new THREE.CylinderGeometry(0.04, 0.04, thickness + 0.045, 12);
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

  // FRONT & BACK HIGH-DPI CANVAS TEXTURES (1024 x 1600)
  const frontCanvas = document.createElement('canvas');
  frontCanvas.width = 1024;
  frontCanvas.height = 1600;
  const fCtx = frontCanvas.getContext('2d');
  const frontTexture = new THREE.CanvasTexture(frontCanvas);
  frontTexture.anisotropy = 8;

  const faceW = cardW - 0.06;
  const faceH = cardH - 0.06;
  const facePlaneGeo = new THREE.PlaneGeometry(faceW, faceH);

  // MeshPhysicalMaterial with clearcoat for glossy laminated card look!
  const frontMat = new THREE.MeshPhysicalMaterial({
    map: frontTexture,
    transparent: true,
    roughness: 0.2,
    metalness: 0.15,
    clearcoat: 0.95,
    clearcoatRoughness: 0.08
  });
  const frontMesh = new THREE.Mesh(facePlaneGeo, frontMat);
  frontMesh.position.z = thickness / 2 + 0.028;
  cardGroup.add(frontMesh);

  // Back Face
  const backCanvas = document.createElement('canvas');
  backCanvas.width = 1024;
  backCanvas.height = 1600;
  const bCtx = backCanvas.getContext('2d');
  const backTexture = new THREE.CanvasTexture(backCanvas);
  backTexture.anisotropy = 8;

  const backMat = new THREE.MeshPhysicalMaterial({
    map: backTexture,
    transparent: true,
    roughness: 0.2,
    metalness: 0.15,
    clearcoat: 0.95,
    clearcoatRoughness: 0.08
  });
  const backMesh = new THREE.Mesh(facePlaneGeo, backMat);
  backMesh.position.z = -(thickness / 2 + 0.028);
  backMesh.rotation.y = Math.PI;
  cardGroup.add(backMesh);

  // RENDER FRONT FACE (100% VERIFIED AUTHENTIC RESUME CREDENTIALS)
  function drawFrontFace(avatarImg) {
    const w = 1024;
    const h = 1600;

    fCtx.save();
    fCtx.textAlign = 'left';
    fCtx.textBaseline = 'alphabetic';

    // Premium Cyber Dark Card Stock
    const bgGrad = fCtx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#0c101d');
    bgGrad.addColorStop(0.4, '#070a14');
    bgGrad.addColorStop(1, '#0e1526');
    fCtx.fillStyle = bgGrad;
    fCtx.fillRect(0, 0, w, h);

    // Subtle Metallic Grid Circuit Lines
    fCtx.strokeStyle = 'rgba(0, 212, 255, 0.14)';
    fCtx.lineWidth = 2.5;
    fCtx.beginPath();
    fCtx.moveTo(60, 210); fCtx.lineTo(964, 210);
    fCtx.moveTo(60, 780); fCtx.lineTo(964, 780);
    fCtx.moveTo(60, 1340); fCtx.lineTo(964, 1340);
    fCtx.stroke();

    // Top Header: Official College & Affiliation
    fCtx.fillStyle = '#00d4ff';
    fCtx.font = 'bold 34px "Space Grotesk", sans-serif';
    fCtx.fillText('IIMT COLLEGE OF ENGINEERING', 80, 120);

    fCtx.fillStyle = '#94a3b8';
    fCtx.font = '600 22px "JetBrains Mono", monospace';
    fCtx.fillText('AKTU // DEPT. OF INFORMATION TECHNOLOGY', 80, 155);

    // Active Clearance Status Pill
    fCtx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    fCtx.beginPath();
    fCtx.roundRect(690, 92, 250, 48, 24);
    fCtx.fill();
    fCtx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    fCtx.lineWidth = 2;
    fCtx.stroke();

    fCtx.fillStyle = '#10b981';
    fCtx.beginPath();
    fCtx.arc(718, 116, 7, 0, Math.PI * 2);
    fCtx.fill();

    fCtx.fillStyle = '#34d399';
    fCtx.font = 'bold 20px "JetBrains Mono", monospace';
    fCtx.fillText('ONLINE // ACTIVE', 738, 123);

    // Circular Portrait Cyber Frame (Centered at 512, 485)
    const cx = 512;
    const cy = 485;
    const r = 210;

    fCtx.save();
    fCtx.beginPath();
    fCtx.arc(cx, cy, r + 10, 0, Math.PI * 2);
    fCtx.strokeStyle = '#00d4ff';
    fCtx.lineWidth = 6;
    fCtx.shadowColor = '#00d4ff';
    fCtx.shadowBlur = 24;
    fCtx.stroke();
    fCtx.restore();

    // Draw Harshit's Authentic Photo
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

    // Name & Official Designation
    fCtx.textAlign = 'center';
    fCtx.fillStyle = '#ffffff';
    fCtx.font = '900 60px "Space Grotesk", sans-serif';
    fCtx.fillText('HARSHIT MISHRA', cx, 865);

    fCtx.fillStyle = '#00d4ff';
    fCtx.font = 'bold 30px "JetBrains Mono", monospace';
    fCtx.fillText('AI / ML ENGINEER & FULL-STACK DEV', cx, 920);

    fCtx.fillStyle = '#94a3b8';
    fCtx.font = '600 24px "Inter", sans-serif';
    fCtx.fillText('B.Tech CSE (IT) • IIMT College • CGPA: 6.64', cx, 968);

    // Verified Skills Badges Row (Strictly from resume)
    const badges = ['PYTHON 3', 'MACHINE LEARNING', 'TENSORFLOW', 'REACT.JS'];
    let bx = 90;
    badges.forEach((b) => {
      fCtx.fillStyle = 'rgba(0, 212, 255, 0.08)';
      fCtx.beginPath();
      fCtx.roundRect(bx, 1030, 195, 48, 10);
      fCtx.fill();
      fCtx.strokeStyle = 'rgba(0, 212, 255, 0.28)';
      fCtx.lineWidth = 1.5;
      fCtx.stroke();

      fCtx.fillStyle = '#e2e8f0';
      fCtx.font = 'bold 20px "JetBrains Mono", monospace';
      fCtx.fillText(b, bx + 97, 1061);
      bx += 215;
    });

    // Security Holographic Chip
    fCtx.textAlign = 'left';
    fCtx.fillStyle = '#d97706';
    fCtx.beginPath();
    fCtx.roundRect(80, 1135, 140, 95, 14);
    fCtx.fill();
    fCtx.strokeStyle = '#fef3c7';
    fCtx.lineWidth = 2;
    fCtx.stroke();

    fCtx.fillStyle = '#1e293b';
    fCtx.font = 'bold 18px "JetBrains Mono", monospace';
    fCtx.fillText('SECURITY CHIP', 150, 1190);

    // Clearance and Credentials Matrix Details
    fCtx.fillStyle = '#64748b';
    fCtx.font = '600 22px "JetBrains Mono", monospace';
    fCtx.fillText('STUDENT ID: #HM-2026-IIMT-IT', 250, 1165);
    fCtx.fillText('AFFILIATION: DR. A.P.J. ABDUL KALAM TECH UNIV', 250, 1200);
    fCtx.fillStyle = '#00d4ff';
    fCtx.fillText('STATUS: AUTHENTIC VERIFIED PASS', 250, 1235);

    // High-Density Code-128 Barcode Pattern
    const barStartX = 80;
    const barY = 1310;
    const barH = 75;
    fCtx.fillStyle = '#f8fafc';
    for (let x = barStartX; x < 944; x += 9) {
      const wBar = (x % 27 === 0 || x % 63 === 0) ? 6 : 2.5;
      fCtx.fillRect(x, barY, wBar, barH);
    }

    fCtx.fillStyle = '#64748b';
    fCtx.font = '20px "JetBrains Mono", monospace';
    fCtx.textAlign = 'center';
    fCtx.fillText('OFFICIAL IDENTITY CREDENTIAL • IIMT COLLEGE OF ENGINEERING', cx, 1440);

    fCtx.restore();
    frontTexture.needsUpdate = true;
  }

  // RENDER BACK FACE (VERIFIED EDUCATION, INTERNSHIPS, PROJECTS)
  function drawBackFace() {
    const w = 1024;
    const h = 1600;

    bCtx.save();
    bCtx.textAlign = 'left';
    bCtx.textBaseline = 'alphabetic';

    const bgGrad = bCtx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#0c101d');
    bgGrad.addColorStop(0.5, '#070a14');
    bgGrad.addColorStop(1, '#0e1526');
    bCtx.fillStyle = bgGrad;
    bCtx.fillRect(0, 0, w, h);

    // Top Magnetic Stripe
    bCtx.fillStyle = '#020617';
    bCtx.fillRect(0, 40, w, 110);
    bCtx.fillStyle = '#334155';
    bCtx.fillRect(0, 75, w, 40);

    // Header
    bCtx.fillStyle = '#00d4ff';
    bCtx.font = 'bold 34px "Space Grotesk", sans-serif';
    bCtx.fillText('ACADEMIC & PROFESSIONAL CREDENTIALS', 80, 200);

    bCtx.fillStyle = '#94a3b8';
    bCtx.font = '600 22px "JetBrains Mono", monospace';
    bCtx.fillText('VERIFIED RESUME RECORD // HARSHIT MISHRA', 80, 235);

    // Section 1: Academic Milestones
    bCtx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    bCtx.beginPath();
    bCtx.roundRect(70, 280, 884, 270, 16);
    bCtx.fill();
    bCtx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
    bCtx.lineWidth = 1.5;
    bCtx.stroke();

    bCtx.fillStyle = '#00d4ff';
    bCtx.font = 'bold 28px "Space Grotesk", sans-serif';
    bCtx.fillText('🎓 Verified Academic Milestones', 105, 335);

    bCtx.fillStyle = '#cbd5e1';
    bCtx.font = '500 23px "Inter", sans-serif';
    bCtx.fillText('• B.Tech in CSE (IT) — IIMT College of Engineering (CGPA: 6.64)', 105, 385);
    bCtx.fillText('• Class XII CBSE — Army Public School, Lucknow (71.6% • 2023)', 105, 435);
    bCtx.fillText('• Class X CBSE — Army Public School, Lucknow (91.4% • 2021)', 105, 485);

    // Section 2: Industrial Internships
    bCtx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    bCtx.beginPath();
    bCtx.roundRect(70, 580, 884, 270, 16);
    bCtx.fill();
    bCtx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
    bCtx.stroke();

    bCtx.fillStyle = '#a855f7';
    bCtx.font = 'bold 28px "Space Grotesk", sans-serif';
    bCtx.fillText('💼 Verified Industrial Internships', 105, 635);

    bCtx.fillStyle = '#cbd5e1';
    bCtx.font = '500 23px "Inter", sans-serif';
    bCtx.fillText('• AI Web Developer — Inamigos Foundation (Jul 2026 – Aug 2026)', 105, 685);
    bCtx.fillText('  Engineered NGO donation portal and responsive full-stack modules.', 105, 725);
    bCtx.fillText('• Python Programming Intern — InternPe (May 2025 – Jun 2025)', 105, 775);
    bCtx.fillText('  Built modular Python scripts, algorithms, and data structures.', 105, 815);

    // Section 3: Verified Projects List
    bCtx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    bCtx.beginPath();
    bCtx.roundRect(70, 880, 884, 330, 16);
    bCtx.fill();
    bCtx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
    bCtx.stroke();

    bCtx.fillStyle = '#34d399';
    bCtx.font = 'bold 28px "Space Grotesk", sans-serif';
    bCtx.fillText('🚀 6 Documented Portfolio Projects', 105, 935);

    bCtx.fillStyle = '#cbd5e1';
    bCtx.font = '500 22px "Inter", sans-serif';
    bCtx.fillText('1. Human Emotion Recognition System (Python, OpenCV, AI/ML)', 105, 980);
    bCtx.fillText('2. Diabetes Prediction System (Python, Scikit-Learn, Web)', 105, 1025);
    bCtx.fillText('3. Fake News Prediction Model (Python, NLP, TF-IDF)', 105, 1070);
    bCtx.fillText('4. Rock and Stone Prediction with Sonar (Python, ML Classifier)', 105, 1115);
    bCtx.fillText('5. Library Management System (Python, MySQL Relational DB)', 105, 1160);

    // Official Signature Strip & Verification Footer
    bCtx.fillStyle = '#f8fafc';
    bCtx.fillRect(100, 1250, 480, 65);
    bCtx.fillStyle = '#1e293b';
    bCtx.font = 'italic bold 28px "Space Grotesk", cursive';
    bCtx.fillText('Harshit Mishra', 140, 1294);

    bCtx.fillStyle = '#64748b';
    bCtx.font = '20px "JetBrains Mono", monospace';
    bCtx.fillText('AUTHORIZED HOLDER SIGNATURE', 100, 1345);
    bCtx.fillText('OFFICIAL REPOSITORY: github.com/harshit-001-it', 100, 1380);

    bCtx.fillStyle = '#94a3b8';
    bCtx.textAlign = 'center';
    bCtx.font = 'bold 24px "Space Grotesk", sans-serif';
    bCtx.fillText('Click badge again to flip to front face', 512, 1480);

    bCtx.restore();
    backTexture.needsUpdate = true;
  }

  // Load Authentic Photo
  const avatarImg = new Image();
  avatarImg.crossOrigin = 'anonymous';
  avatarImg.src = 'image.png';
  avatarImg.onload = () => drawFrontFace(avatarImg);
  avatarImg.onerror = () => drawFrontFace(null);
  drawFrontFace(null);
  drawBackFace();

  // Physics, Drag & Elastic Pull-Down Mechanics
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
  const pullDownThreshold = 90;

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

      if (deltaY > 0) {
        targetPullY = Math.min(deltaY * 0.0028, 0.45);
        if (deltaY > pullDownThreshold && hintBadge && hintText) {
          hintBadge.style.borderColor = 'var(--accent-cyan)';
          hintText.textContent = 'Release to launch About section ↓';
        }
      }

      dragStartX = clientX;
      dragStartY = clientY;
    } else {
      const rect = stage.getBoundingClientRect();
      const relX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const relY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      if (!isFlipped) {
        targetRotY = relX * 0.42;
        targetRotX = -relY * 0.32;
      }
    }
  }

  function onPointerUp() {
    if (isDragging) {
      isDragging = false;
      if (targetPullY > 0.25) {
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

  // Click to Flip (180 deg)
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

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isFlipped = false;
      targetRotY = 0;
      targetRotX = 0;
      targetPullY = 0;
    });
  }

  // Animation Loop with Harmonic Spring Physics
  const physClock = new THREE.Clock();

  function animatePhysics() {
    requestAnimationFrame(animatePhysics);
    const elapsed = physClock.getElapsedTime();

    // Natural Pendulum Sway when idle
    const idleSway = isDragging ? 0 : Math.sin(elapsed * 1.5) * 0.045;

    currentRotY += (targetRotY + idleSway - currentRotY) * 0.085;
    currentRotX += (targetRotX - currentRotX) * 0.085;

    // Harmonic spring tension for lanyard pull
    const springForce = (targetPullY - currentPullY) * 0.18;
    pullVelocity = (pullVelocity + springForce) * 0.78;
    currentPullY += pullVelocity;

    cardGroup.rotation.y = currentRotY;
    cardGroup.rotation.x = currentRotX;
    cardGroup.position.y = -1.48 - currentPullY;

    // Elastic lanyard strap stretch
    const stretchFactor = 1.0 + currentPullY * 1.8;
    strapL.scale.y = stretchFactor;
    strapR.scale.y = stretchFactor;
    swivelBarrel.position.y = 0.02 - (currentPullY * 0.4);

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
   11. RENDER SKILLS (VERIFIED RESUME CATEGORIES, NO FAKE NUMBERS)
   ---------------------------------------------------------------- */
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
          <span class="skill-badge-pill">
            <span class="badge-dot"></span>
            <span>${s}</span>
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');

  initDynamic3DCardTilt();
}

/* ----------------------------------------------------------------
   12. RENDER FEATURED PROJECTS (100% REAL FROM RESUME, NO FAKE STARS)
   ---------------------------------------------------------------- */
function renderProjects() {
  const filtersContainer = document.getElementById('projectFilters');
  const gridContainer = document.getElementById('projectsGrid');
  if (!gridContainer) return;

  // Exactly the 6 authentic projects from Harshit's resume
  const resumeProjects = [
    {
      name: 'Human Emotion Recognition System',
      description: 'Designed a real-time facial expression and sentiment detection system using computer vision techniques and trained machine learning models.',
      category: 'Machine Learning',
      tags: ['Python', 'AI/ML', 'OpenCV', 'CNN'],
      url: 'https://github.com/harshit-001-it'
    },
    {
      name: 'Diabetes Prediction',
      description: 'Built a predictive web application where users input clinical diagnostic metrics to calculate diabetes vulnerability powered by an optimized machine learning classifier.',
      category: 'Machine Learning',
      tags: ['Python', 'Scikit-Learn', 'Classification', 'Healthcare'],
      url: 'https://github.com/harshit-001-it'
    },
    {
      name: 'Fake News Prediction',
      description: 'Developed a natural language processing classifier that evaluates article contents and linguistic patterns to classify news reports as authentic or fabricated.',
      category: 'Machine Learning',
      tags: ['Python', 'NLP', 'TF-IDF', 'Machine Learning'],
      url: 'https://github.com/harshit-001-it'
    },
    {
      name: 'Rock and Stone Prediction with Sonar',
      description: 'Built a machine learning system that collects and analyzes sonar frequency signals to accurately classify underwater objects as rock or stone.',
      category: 'Machine Learning',
      tags: ['Python', 'NumPy', 'Signal Classification', 'ML'],
      url: 'https://github.com/harshit-001-it'
    },
    {
      name: 'Library Management System',
      description: 'Engineered an administrative relational database application to manage complete library operations — adding books, issuing to students, and tracking circulation records.',
      category: 'Systems',
      tags: ['Python', 'MySQL', 'Relational DB', 'CRUD'],
      url: 'https://github.com/har-001/Personal-Portfolio-Website'
    },
    {
      name: 'Personal Portfolio Website',
      description: 'Built and deployed this personal portfolio to showcase verified skills, machine learning projects, and contact credentials with 3D hardware-accelerated graphics.',
      category: 'Web Dev',
      tags: ['React.js', 'Python', 'Three.js', 'WebGL'],
      url: 'https://github.com/har-001/Personal-Portfolio-Website'
    }
  ];

  const categories = ['All', 'Machine Learning', 'Systems', 'Web Dev'];
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
      <div class="project-card glass tilt-card reveal">
        <div class="project-card-header">
          <div class="project-icon-box">🚀</div>
          <div class="project-links-row">
            <a href="${p.url}" target="_blank" rel="noopener" class="icon-link" title="View Source Code on GitHub" aria-label="GitHub Repository">
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
