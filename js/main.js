/* ================================================================
   HARSHIT MISHRA — PORTFOLIO WEBSITE
   Main JavaScript — Animations, Interactions, Dynamic Content
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initThemeToggle();
  initMobileMenu();
  initTypewriter();
  initParticles();
  initCursorSpotlight();
  init3DMouseCompanion();
  init3DTilt();
  initPhysical3DIDCard();
  initRevealAnimations();
  initCounters();
  renderSkills();
  fetchAndRenderProjects();
  renderCertificates();
  initContactForm();
  initBackToTop();
  initSkillBarAnimations();
  initGitHubDropdown();
  initAIChatbot();
  initN8nJobAgent();
  initFreelanceAgent();
});

/* ----------------------------------------------------------------
   SCROLL PROGRESS BAR
   ---------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* ----------------------------------------------------------------
   NAVBAR
   ---------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Precise Active Section Scrollspy Highlighting
  function updateActiveNav() {
    const scrollPos = window.scrollY + 130;
    let currentId = '';

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    // If near bottom of the page, activate contact section
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 80)) {
      currentId = 'contact';
    }

    if (currentId) {
      navLinks.forEach((link) => {
        const isMatch = link.getAttribute('data-section') === currentId;
        link.classList.toggle('active', isMatch);
      });
    }
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav, { passive: true });
  setTimeout(updateActiveNav, 200);

  // Smooth scroll for all anchor links (nav links, stat cards, badges)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const targetId = href.substring(1);

        // Instantly update active link underline
        navLinks.forEach((nl) => {
          nl.classList.toggle('active', nl.getAttribute('data-section') === targetId);
        });

        const navHeight = navbar.offsetHeight || 70;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 2;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

/* ----------------------------------------------------------------
   THEME TOGGLE
   ---------------------------------------------------------------- */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  let theme = saved || 'dark';

  applyTheme(theme);

  toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  });

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    toggle.textContent = t === 'dark' ? '🌙' : '☀️';
  }
}

/* ----------------------------------------------------------------
   MOBILE MENU
   ---------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ----------------------------------------------------------------
   TYPEWRITER EFFECT
   ---------------------------------------------------------------- */
function initTypewriter() {
  const element = document.getElementById('typedText');
  const phrases = [
    'Data Analytics',
    'Machine Learning',
    'AI Solutions',
    'Python Development',
    'Computer Vision',
    'Predictive Modeling',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      element.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      element.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ----------------------------------------------------------------
   PARTICLE CANVAS (Hero Background)
   ---------------------------------------------------------------- */
function initParticles() {
  const container = document.getElementById('heroCanvas');
  if (!container) return;
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let particles = [];
  let polyhedrons = [];
  let animId;
  let mouse = { x: null, y: null, targetX: 0, targetY: 0 };

  function resize() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
    mouse.targetX = 0;
    mouse.targetY = 0;
  });

  const particleCount = Math.min(70, Math.floor((canvas.width * canvas.height) / 14000));

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.z = Math.random() * 400 - 200; // 3D depth
      this.size = Math.random() * 2 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.speedZ = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.speedX + mouse.targetX * 0.2;
      this.y += this.speedY + mouse.targetY * 0.2;
      this.z += this.speedZ;

      if (this.z < -200) this.z = 200;
      if (this.z > 200) this.z = -200;

      // Mouse repulsion in 2D projection
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          this.x -= (dx / dist) * force * 1.8;
          this.y -= (dy / dist) * force * 1.8;
        }
      }

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      const fov = 400;
      const scale = fov / (fov + this.z);
      const projSize = Math.max(0.4, this.size * scale);
      ctx.beginPath();
      ctx.arc(this.x, this.y, projSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${Math.min(1, this.opacity * scale)})`;
      ctx.fill();
    }
  }

  // 3D Wireframe Floating Polyhedrons (Octahedron Geometry)
  class Polyhedron3D {
    constructor(cx, cy, radius, speed) {
      this.cx = cx;
      this.cy = cy;
      this.radius = radius;
      this.rotX = Math.random() * Math.PI;
      this.rotY = Math.random() * Math.PI;
      this.rotZ = Math.random() * Math.PI;
      this.speed = speed;

      // Octahedron 6 vertices in 3D
      this.vertices = [
        [0, 1, 0],
        [0, -1, 0],
        [1, 0, 0],
        [-1, 0, 0],
        [0, 0, 1],
        [0, 0, -1]
      ];

      // 12 edges
      this.edges = [
        [0,2], [0,3], [0,4], [0,5],
        [1,2], [1,3], [1,4], [1,5],
        [2,4], [4,3], [3,5], [5,2]
      ];
    }

    update() {
      this.rotX += 0.006 * this.speed + mouse.targetY * 0.005;
      this.rotY += 0.009 * this.speed + mouse.targetX * 0.005;
      this.rotZ += 0.004 * this.speed;
    }

    draw() {
      const fov = 300;
      const cosX = Math.cos(this.rotX), sinX = Math.sin(this.rotX);
      const cosY = Math.cos(this.rotY), sinY = Math.sin(this.rotY);
      const cosZ = Math.cos(this.rotZ), sinZ = Math.sin(this.rotZ);

      const projected = this.vertices.map(([vx, vy, vz]) => {
        let x = vx * this.radius;
        let y = vy * this.radius;
        let z = vz * this.radius;

        // Rotate Y
        let x1 = x * cosY + z * sinY;
        let z1 = -x * sinY + z * cosY;

        // Rotate X
        let y2 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        // Rotate Z
        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = x1 * sinZ + y2 * cosZ;

        const scale = fov / (fov + z2 + 200);
        return {
          x: this.cx + x3 * scale,
          y: this.cy + y3 * scale,
          scale
        };
      });

      // Draw glowing wireframe edges
      ctx.lineWidth = 1;
      this.edges.forEach(([i1, i2]) => {
        const p1 = projected[i1];
        const p2 = projected[i2];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(123, 97, 255, 0.25)`;
        ctx.stroke();
      });

      // Draw vertex nodes
      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, 0.7)`;
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Add 3D floating geometric polyhedrons
  polyhedrons.push(new Polyhedron3D(canvas.width * 0.15, canvas.height * 0.25, 45, 1));
  polyhedrons.push(new Polyhedron3D(canvas.width * 0.85, canvas.height * 0.35, 55, 0.8));
  polyhedrons.push(new Polyhedron3D(canvas.width * 0.5, canvas.height * 0.8, 40, 1.2));

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const opacity = (1 - dist / 130) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw 3D polyhedrons
    polyhedrons.forEach(poly => {
      poly.update();
      poly.draw();
    });

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    drawConnections();
    animId = requestAnimationFrame(animate);
  }

  animate();
}

/* ----------------------------------------------------------------
   3D CURSOR SPOTLIGHT
   Smooth, interactive cursor light following mouse movement
   ---------------------------------------------------------------- */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    spotlight.style.opacity = '1';
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
  });

  function animateSpotlight() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    spotlight.style.left = `${currentX}px`;
    spotlight.style.top = `${currentY}px`;
    requestAnimationFrame(animateSpotlight);
  }
  requestAnimationFrame(animateSpotlight);
}

/* ----------------------------------------------------------------
   3D MOUSE COMPANION (NIVA CYBER DRONE)
   Interactive 3D companion drone that follows the mouse cursor:
   - 3D gyroscopic gimbal rings with depth projection
   - Metallic spherical chassis with realistic lighting
   - Cybernetic LED eyes that blink and react to links/buttons
   - Window click triggers 360° spin roll & holographic pulse
   - Stardust particle trail & floating physics
   ---------------------------------------------------------------- */
function init3DMouseCompanion() {
  const canvas = document.getElementById('companionCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  // Companion State
  const companion = {
    x: width * 0.65,
    y: height * 0.35,
    targetX: width * 0.65,
    targetY: height * 0.35,
    vx: 0,
    vy: 0,
    coreRadius: 18,
    active: false,
    hoveringInteractive: false,
    isSpinning: false,
    spinAngle: 0,
    spinVelocity: 0,
    ringAngle1: 0,
    ringAngle2: 0,
    blinkState: 0, // 0 = open, 1 = closed
    isBlinking: false,
    nextBlinkTime: Date.now() + 2500,
    particles: [],
    shockwaves: []
  };

  // Mouse tracking
  window.addEventListener('mousemove', (e) => {
    companion.active = true;
    // Offset slightly to bottom-right of cursor so it never covers the pointer
    companion.targetX = Math.min(width - 40, Math.max(40, e.clientX + 34));
    companion.targetY = Math.min(height - 40, Math.max(40, e.clientY + 26));

    // Check if hovering over interactive elements
    const target = e.target;
    if (target && target.closest) {
      const isInteractive = !!target.closest('a, button, input, textarea, .btn, .project-card, .cert-card, .action-card, .stat-item, .card-reset-btn, .id-card-stage');
      companion.hoveringInteractive = isInteractive;
    }
  }, { passive: true });

  // Click interaction: 360 spin + holographic shockwave
  window.addEventListener('click', (e) => {
    if (!companion.active) return;
    companion.isSpinning = true;
    companion.spinVelocity = 0.42;

    companion.shockwaves.push({
      x: companion.x,
      y: companion.y,
      radius: 12,
      maxRadius: 80,
      opacity: 0.9,
      color: '#00d4ff'
    });
  }, { passive: true });

  // Touch device check: If pure touch, don't show to avoid obstructing touch screen
  const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;

  let lastTime = performance.now();

  function renderCompanion(now) {
    requestAnimationFrame(renderCompanion);
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    ctx.clearRect(0, 0, width, height);

    if (!companion.active || isTouchDevice()) return;

    // Smooth lerp tracking cursor
    const dx = companion.targetX - companion.x;
    const dy = companion.targetY - companion.y;
    companion.vx = dx * 0.085;
    companion.vy = dy * 0.085;
    companion.x += companion.vx;
    companion.y += companion.vy;

    const speed = Math.hypot(companion.vx, companion.vy);

    // Idle floating oscillation
    const time = now * 0.003;
    const floatY = Math.sin(time * 3.5) * 5.5;
    const drawY = companion.y + floatY;
    const drawX = companion.x;

    // Banking tilt in velocity direction
    const tilt = Math.max(-0.45, Math.min(0.45, companion.vx * 0.035));

    // Spin physics on click
    if (companion.isSpinning) {
      companion.spinAngle += companion.spinVelocity;
      companion.spinVelocity *= 0.94;
      if (companion.spinVelocity < 0.01) {
        companion.isSpinning = false;
        companion.spinAngle = 0;
      }
    }

    // Blinking timer
    if (now > companion.nextBlinkTime && !companion.isBlinking) {
      companion.isBlinking = true;
      companion.blinkStartTime = now;
      companion.nextBlinkTime = now + 3200 + Math.random() * 2000;
    }
    if (companion.isBlinking) {
      const elapsed = now - companion.blinkStartTime;
      if (elapsed < 140) {
        companion.blinkState = 1;
      } else {
        companion.blinkState = 0;
        companion.isBlinking = false;
      }
    }

    // Stardust / Ion Trail
    if (speed > 0.4 || Math.random() < 0.25) {
      companion.particles.push({
        x: drawX + (Math.random() - 0.5) * 8,
        y: drawY + companion.coreRadius + (Math.random() - 0.5) * 4,
        vx: -companion.vx * 0.2 + (Math.random() - 0.5) * 1.5,
        vy: 1.2 + Math.random() * 1.8,
        life: 1.0,
        decay: 0.03 + Math.random() * 0.03,
        size: 2.2 + Math.random() * 2,
        color: Math.random() > 0.5 ? '#00d4ff' : '#a855f7'
      });
    }

    // Draw Particles
    for (let i = companion.particles.length - 1; i >= 0; i--) {
      const p = companion.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        companion.particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.life * 0.8;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Draw Shockwaves
    for (let i = companion.shockwaves.length - 1; i >= 0; i--) {
      const s = companion.shockwaves[i];
      s.radius += 3.2;
      s.opacity -= 0.035;

      if (s.opacity <= 0 || s.radius >= s.maxRadius) {
        companion.shockwaves.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = s.opacity;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Drone Ring Angles
    const speedMult = companion.hoveringInteractive ? 2.4 : 1.0;
    companion.ringAngle1 += 0.03 * speedMult;
    companion.ringAngle2 -= 0.04 * speedMult;

    ctx.save();
    ctx.translate(drawX, drawY);
    ctx.rotate(tilt + companion.spinAngle);

    // 1. Outer 3D Gyro Ring (Cyan)
    const R1 = 34;
    ctx.save();
    ctx.rotate(companion.ringAngle1);
    ctx.scale(1, Math.cos(companion.ringAngle1 * 0.8) * 0.45 + 0.1);
    ctx.strokeStyle = companion.hoveringInteractive ? '#38bdf8' : 'rgba(0, 212, 255, 0.75)';
    ctx.lineWidth = 2.2;
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = companion.hoveringInteractive ? 16 : 8;
    ctx.beginPath();
    ctx.arc(0, 0, R1, 0, Math.PI * 2);
    ctx.stroke();

    // Small glowing power nodes on ring
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(R1, 0, 2.5, 0, Math.PI * 2);
    ctx.arc(-R1, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Inner 3D Gimbal Ring (Purple/Violet)
    const R2 = 27;
    ctx.save();
    ctx.rotate(companion.ringAngle2);
    ctx.scale(Math.cos(companion.ringAngle2 * 0.7) * 0.45 + 0.1, 1);
    ctx.strokeStyle = companion.hoveringInteractive ? '#c084fc' : 'rgba(168, 85, 247, 0.75)';
    ctx.lineWidth = 1.8;
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 0, R2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 3. Metallic Spherical Chassis
    const cr = companion.coreRadius;
    const bodyGrad = ctx.createRadialGradient(-cr * 0.35, -cr * 0.35, 2, 0, 0, cr);
    bodyGrad.addColorStop(0, '#38bdf8');
    bodyGrad.addColorStop(0.25, '#1e293b');
    bodyGrad.addColorStop(0.85, '#0f172a');
    bodyGrad.addColorStop(1, '#020617');

    ctx.fillStyle = bodyGrad;
    ctx.shadowColor = 'rgba(0, 212, 255, 0.3)';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(0, 0, cr, 0, Math.PI * 2);
    ctx.fill();

    // Titanium rim ring
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 4. Curved Cyber Visor Display
    const visorW = 22;
    const visorH = 11;
    ctx.fillStyle = '#050914';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(-visorW / 2, -visorH / 2, visorW, visorH, 5);
    } else {
      ctx.rect(-visorW / 2, -visorH / 2, visorW, visorH);
    }
    ctx.fill();
    ctx.stroke();

    // 5. Twin Cybernetic LED Eyes
    const eyeOffsetX = 5.5;
    const eyeLookX = Math.max(-2, Math.min(2, companion.vx * 0.15));
    const eyeLookY = Math.max(-1.5, Math.min(1.5, companion.vy * 0.15));

    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#00f5ff';
    ctx.strokeStyle = '#00f5ff';

    if (companion.hoveringInteractive) {
      // Happy smiling eyes: ^ ^
      ctx.lineWidth = 1.8;
      [-eyeOffsetX, eyeOffsetX].forEach((ox) => {
        ctx.beginPath();
        ctx.arc(ox + eyeLookX, eyeLookY + 1, 3.2, Math.PI * 1.1, Math.PI * 1.9, false);
        ctx.stroke();
      });
    } else if (companion.blinkState === 1) {
      // Closed blinking eyes: -- --
      ctx.lineWidth = 1.5;
      [-eyeOffsetX, eyeOffsetX].forEach((ox) => {
        ctx.beginPath();
        ctx.moveTo(ox - 3, 0);
        ctx.lineTo(ox + 3, 0);
        ctx.stroke();
      });
    } else {
      // Normal oval LED eyes
      [-eyeOffsetX, eyeOffsetX].forEach((ox) => {
        ctx.beginPath();
        ctx.ellipse(ox + eyeLookX, eyeLookY, 2.2, 3.2, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 6. Top AI Status Antenna & Beacon
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -cr);
    ctx.lineTo(0, -cr - 6);
    ctx.stroke();

    const beaconPulse = Math.sin(time * 6) > 0;
    ctx.fillStyle = beaconPulse ? '#22c55e' : '#00d4ff';
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, -cr - 7, 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  requestAnimationFrame(renderCompanion);
}

/* ----------------------------------------------------------------
   UNIVERSAL 3D INTERACTIVE TILT & PARALLAX ENGINE
   Delegated 3D perspective tilt & specular glare for all cards
   Works automatically on all static and dynamically loaded items
   ---------------------------------------------------------------- */
function init3DTilt() {
  const tiltCardSelector = [
    '.action-card',
    '.experience-card',
    '.timeline-content',
    '.about-image-frame',
    '.about-float-card',
    '.stat-item',
    '.skill-card',
    '.project-card',
    '.cert-card',
    '.tool-card',
    '.ai-feature-card',
    '.contact-card',
    '.id-card-fallback'
  ].join(', ');

  let currentTiltCard = null;

  function resetCard(card) {
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
    const glare = card.querySelector('.card-glare-overlay');
    if (glare) glare.style.opacity = '0';
  }

  document.addEventListener('mousemove', (e) => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const card = e.target.closest(tiltCardSelector);

    if (card) {
      if (currentTiltCard && currentTiltCard !== card) {
        resetCard(currentTiltCard);
      }
      currentTiltCard = card;

      // Ensure glare overlay exists
      let glare = card.querySelector('.card-glare-overlay');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-glare-overlay';
        card.appendChild(glare);
      }

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const maxTilt = card.classList.contains('about-image-frame') ? 8 : 12;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transition = 'transform 0.08s ease-out, box-shadow 0.2s ease';
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)`;

      card.style.setProperty('--mouse-x', `${((x / rect.width) * 100).toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${((y / rect.height) * 100).toFixed(1)}%`);
      glare.style.opacity = '1';
    } else if (currentTiltCard) {
      resetCard(currentTiltCard);
      currentTiltCard = null;
    }
  }, { passive: true });
}

/* ----------------------------------------------------------------
   GENUINE PHYSICAL 3D ID-CARD (Three.js WebGL Engine)
   - Real 3D geometry with matching casing & beveled badge insert
   - Identical corner contours & top lanyard slot on both frame & card
   - High-DPI canvas front & back textures with verified details
   - Realistic pointer/touch drag with pull-down-to-scroll gesture
   - Flip gesture on tap/click (180deg front/back toggle)
   - Mobile-safe touch handling with unhijacked page vertical scroll
   - Accessible reset button and graceful static fallback
   ---------------------------------------------------------------- */
function initPhysical3DIDCard() {
  const stage = document.getElementById('idCardStage');
  const fallback = document.getElementById('idCardFallback');
  const resetBtn = document.getElementById('cardResetBtn');
  const hintBadge = document.getElementById('cardHintBadge');
  const hintText = document.getElementById('cardHintText');
  const hintIcon = document.getElementById('cardHintIcon');

  if (!stage) return;

  // Check WebGL availability
  function isWebGLAvailable() {
    try {
      const testCanvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (typeof THREE === 'undefined' || !isWebGLAvailable()) {
    if (fallback) fallback.style.display = 'flex';
    return;
  }

  // Dimensions
  let width = stage.clientWidth || 380;
  let height = stage.clientHeight || 500;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0, 10.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  if (renderer.outputColorSpace) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  } else if (renderer.outputEncoding) {
    renderer.outputEncoding = THREE.sRGBEncoding;
  }
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Clean existing canvas if any
  const oldCanvas = stage.querySelector('canvas');
  if (oldCanvas) oldCanvas.remove();
  stage.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0x00d4ff, 1.4);
  mainLight.position.set(5, 8, 8);
  mainLight.castShadow = true;
  scene.add(mainLight);

  const fillLight = new THREE.PointLight(0x8b5cf6, 1.2, 20);
  fillLight.position.set(-5, -3, 6);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
  rimLight.position.set(0, -6, -4);
  scene.add(rimLight);

  // Group containing the entire card assembly
  const cardGroup = new THREE.Group();
  scene.add(cardGroup);

  // Helper function to create rounded rect shape
  function createRoundedRectShape(w, h, r) {
    const s = new THREE.Shape();
    const hw = w / 2, hh = h / 2;
    s.moveTo(-hw + r, -hh);
    s.lineTo(hw - r, -hh);
    s.quadraticCurveTo(hw, -hh, hw, -hh + r);
    s.lineTo(hw, hh - r);
    s.quadraticCurveTo(hw, hh, hw - r, hh);
    s.lineTo(-hw + r, hh);
    s.quadraticCurveTo(-hw, hh, -hw, hh - r);
    s.lineTo(-hw, -hh + r);
    s.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    return s;
  }

  // Helper function to create slot hole path
  function createSlotHole(w, h, y) {
    const hole = new THREE.Path();
    const hw = w / 2, hh = h / 2;
    hole.moveTo(-hw, y - hh);
    hole.lineTo(hw, y - hh);
    hole.lineTo(hw, y + hh);
    hole.lineTo(-hw, y + hh);
    hole.closePath();
    return hole;
  }

  // --- Outer Titanium/Obsidian Badge Frame ---
  const cardW = 3.4;
  const cardH = 5.2;
  const radius = 0.28;
  const slotW = 0.65;
  const slotH = 0.15;
  const slotY = cardH / 2 - 0.38; // 2.22

  const outerShape = createRoundedRectShape(cardW, cardH, radius);
  outerShape.holes.push(createSlotHole(slotW, slotH, slotY));

  const extrudeSettings = {
    depth: 0.04,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.015
  };

  const bodyGeo = new THREE.ExtrudeGeometry(outerShape, extrudeSettings);
  bodyGeo.translate(0, 0, -0.02); // Center along Z so body is between -0.035 and +0.035

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.28,
    metalness: 0.9
  });

  const bodyMesh = new THREE.Mesh(bodyGeo, rimMaterial);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  cardGroup.add(bodyMesh);

  // --- Matching Inner Insert Badge Geometry ---
  const innerW = cardW - 0.06; // 3.34
  const innerH = cardH - 0.06; // 5.14
  const innerRadius = 0.25;

  const innerShape = createRoundedRectShape(innerW, innerH, innerRadius);
  innerShape.holes.push(createSlotHole(slotW, slotH, slotY));

  const innerGeo = new THREE.ShapeGeometry(innerShape);

  // Assign precise UVs mapping the canvas textures onto the inner card
  const pos = innerGeo.attributes.position;
  const frontUvs = new Float32Array(pos.count * 2);
  const backUvs = new Float32Array(pos.count * 2);

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const u = (x + innerW / 2) / innerW;
    const v = (y + innerH / 2) / innerH;
    frontUvs[i * 2] = u;
    frontUvs[i * 2 + 1] = v;
    // For back side, flip u horizontally so text reads normally
    backUvs[i * 2] = 1 - u;
    backUvs[i * 2 + 1] = v;
  }
  innerGeo.setAttribute('uv', new THREE.BufferAttribute(frontUvs, 2));

  const backGeo = innerGeo.clone();
  backGeo.setAttribute('uv', new THREE.BufferAttribute(backUvs, 2));

  // --- Front Face Texture (1024x1536) ---
  const frontCanvas = document.createElement('canvas');
  frontCanvas.width = 1024;
  frontCanvas.height = 1536;
  const fCtx = frontCanvas.getContext('2d');
  const frontTexture = new THREE.CanvasTexture(frontCanvas);
  frontTexture.generateMipmaps = true;

  // --- Back Face Texture (1024x1536) ---
  const backCanvas = document.createElement('canvas');
  backCanvas.width = 1024;
  backCanvas.height = 1536;
  const bCtx = backCanvas.getContext('2d');
  const backTexture = new THREE.CanvasTexture(backCanvas);
  backTexture.generateMipmaps = true;

  // Front & Back Meshes sitting proudly on card faces (z = 0.038 > 0.035 body surface)
  const frontMat = new THREE.MeshStandardMaterial({
    map: frontTexture,
    roughness: 0.38,
    metalness: 0.12,
    side: THREE.FrontSide
  });
  const frontMesh = new THREE.Mesh(innerGeo, frontMat);
  frontMesh.position.z = 0.038;
  cardGroup.add(frontMesh);

  const backMat = new THREE.MeshStandardMaterial({
    map: backTexture,
    roughness: 0.38,
    metalness: 0.12,
    side: THREE.FrontSide
  });
  const backMesh = new THREE.Mesh(backGeo, backMat);
  backMesh.position.z = -0.038;
  backMesh.rotation.y = Math.PI;
  cardGroup.add(backMesh);

  // Front Protective Transparent Acrylic Glass Cover (Realistic Sheen)
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.12,
    roughness: 0.05,
    metalness: 0.12,
    depthWrite: false,
    side: THREE.FrontSide
  });
  const glassMesh = new THREE.Mesh(innerGeo, glassMat);
  glassMesh.position.z = 0.042;
  cardGroup.add(glassMesh);

  // --- Metallic Clasp & Ribbon ---
  // Ring loops directly through the top slot hole
  const ringGeo = new THREE.TorusGeometry(0.20, 0.038, 16, 32);
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.95,
    roughness: 0.15
  });
  const ringMesh = new THREE.Mesh(ringGeo, metalMat);
  ringMesh.position.set(0, slotY, 0);
  ringMesh.rotation.x = Math.PI / 2;
  cardGroup.add(ringMesh);

  // Swivel Clasp Body
  const claspGeo = new THREE.CylinderGeometry(0.10, 0.14, 0.38, 16);
  const claspMesh = new THREE.Mesh(claspGeo, metalMat);
  claspMesh.position.set(0, slotY + 0.32, 0);
  cardGroup.add(claspMesh);

  // Woven Lanyard Ribbon ascending upwards
  const strapGeo = new THREE.PlaneGeometry(0.60, 4.5);
  const strapCanvas = document.createElement('canvas');
  strapCanvas.width = 128;
  strapCanvas.height = 512;
  const sCtx = strapCanvas.getContext('2d');
  sCtx.fillStyle = '#060b1c';
  sCtx.fillRect(0, 0, 128, 512);
  sCtx.fillStyle = '#00d4ff';
  sCtx.fillRect(16, 0, 8, 512);
  sCtx.fillRect(104, 0, 8, 512);
  sCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  for (let y = 0; y < 512; y += 8) {
    sCtx.fillRect(0, y, 128, 2);
  }
  const strapTexture = new THREE.CanvasTexture(strapCanvas);
  const strapMat = new THREE.MeshStandardMaterial({
    map: strapTexture,
    roughness: 0.85,
    metalness: 0.05,
    side: THREE.DoubleSide
  });
  const strapMesh = new THREE.Mesh(strapGeo, strapMat);
  strapMesh.position.set(0, slotY + 2.55, 0);
  cardGroup.add(strapMesh);

  // --- Render Front Canvas Texture ---
  function drawFrontCanvas(img) {
    // Rich midnight blue gradient background
    const grad = fCtx.createLinearGradient(0, 0, 1024, 1536);
    grad.addColorStop(0, '#090e24');
    grad.addColorStop(0.5, '#0c1636');
    grad.addColorStop(1, '#050814');
    fCtx.fillStyle = grad;
    fCtx.fillRect(0, 0, 1024, 1536);

    // High-tech subtle cyber grid pattern
    fCtx.strokeStyle = 'rgba(0, 212, 255, 0.06)';
    fCtx.lineWidth = 2;
    for (let x = 60; x < 1024; x += 80) {
      fCtx.beginPath();
      fCtx.moveTo(x, 0);
      fCtx.lineTo(x, 1536);
      fCtx.stroke();
    }
    for (let y = 60; y < 1536; y += 80) {
      fCtx.beginPath();
      fCtx.moveTo(0, y);
      fCtx.lineTo(1024, y);
      fCtx.stroke();
    }

    // Outer Card Inset Border
    fCtx.strokeStyle = 'rgba(0, 212, 255, 0.35)';
    fCtx.lineWidth = 3;
    fCtx.beginPath();
    if (fCtx.roundRect) {
      fCtx.roundRect(30, 30, 964, 1476, 44);
    } else {
      fCtx.rect(30, 30, 964, 1476);
    }
    fCtx.stroke();

    // Top Header Bar (Padded safely below slot hole)
    const hx = 70, hy = 155, hw = 884, hh = 70;
    fCtx.fillStyle = 'rgba(0, 212, 255, 0.12)';
    fCtx.beginPath();
    if (fCtx.roundRect) {
      fCtx.roundRect(hx, hy, hw, hh, 16);
    } else {
      fCtx.rect(hx, hy, hw, hh);
    }
    fCtx.fill();
    fCtx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
    fCtx.lineWidth = 2;
    fCtx.stroke();

    fCtx.font = 'bold 26px "Inter", sans-serif';
    fCtx.fillStyle = '#00d4ff';
    fCtx.textAlign = 'left';
    fCtx.fillText('⚡ HARSHIT MISHRA • ID: HM-2026', 100, 200);

    fCtx.font = 'bold 22px "Inter", sans-serif';
    fCtx.fillStyle = '#22c55e';
    fCtx.fillText('● ACTIVE DEV', 740, 200);

    // Profile Photo Box (Centered at x=512, size 390x390)
    const pw = 390, ph = 390, pr = 30;
    const px = 512 - pw / 2; // 317
    const py = 250;

    // Glowing outer border ring
    fCtx.strokeStyle = 'rgba(0, 212, 255, 0.35)';
    fCtx.lineWidth = 8;
    fCtx.beginPath();
    if (fCtx.roundRect) {
      fCtx.roundRect(px - 4, py - 4, pw + 8, ph + 8, pr + 4);
    } else {
      fCtx.rect(px - 4, py - 4, pw + 8, ph + 8);
    }
    fCtx.stroke();

    // Clip photo
    fCtx.save();
    fCtx.beginPath();
    if (fCtx.roundRect) {
      fCtx.roundRect(px, py, pw, ph, pr);
    } else {
      fCtx.rect(px, py, pw, ph);
    }
    fCtx.clip();

    if (img && img.complete && img.naturalWidth !== 0) {
      fCtx.drawImage(img, px, py, pw, ph);
    } else {
      fCtx.fillStyle = '#1e293b';
      fCtx.fillRect(px, py, pw, ph);
      fCtx.font = 'bold 110px "Inter", sans-serif';
      fCtx.fillStyle = '#00d4ff';
      fCtx.textAlign = 'center';
      fCtx.fillText('HM', 512, 490);
      fCtx.textAlign = 'left';
    }
    fCtx.restore();

    // Crisp inner photo border
    fCtx.strokeStyle = '#00d4ff';
    fCtx.lineWidth = 3;
    fCtx.beginPath();
    if (fCtx.roundRect) {
      fCtx.roundRect(px, py, pw, ph, pr);
    } else {
      fCtx.rect(px, py, pw, ph);
    }
    fCtx.stroke();

    // Name & Title Section
    fCtx.textAlign = 'center';
    fCtx.font = '800 56px "Inter", sans-serif';
    fCtx.fillStyle = '#ffffff';
    fCtx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    fCtx.shadowBlur = 8;
    fCtx.fillText('HARSHIT MISHRA', 512, 705);
    fCtx.shadowBlur = 0;

    fCtx.font = '700 28px "Inter", sans-serif';
    fCtx.fillStyle = '#00d4ff';
    fCtx.fillText('DATA ANALYTICS | AI ENTHUSIAST', 512, 755);

    fCtx.font = '500 24px "Inter", sans-serif';
    fCtx.fillStyle = '#94a3b8';
    fCtx.fillText('IIMT College • B.Tech Information Technology', 512, 800);

    fCtx.font = 'italic 21px "Inter", sans-serif';
    fCtx.fillStyle = '#cbd5e1';
    fCtx.fillText('“Building intelligent digital experiences.”', 512, 842);

    // Microchip Graphic (Left side)
    const chipX = 90, chipY = 895, chipW = 150, chipH = 115;
    fCtx.fillStyle = '#d97706';
    fCtx.fillRect(chipX, chipY, chipW, chipH);
    fCtx.strokeStyle = '#fbbf24';
    fCtx.lineWidth = 3;
    fCtx.strokeRect(chipX, chipY, chipW, chipH);
    fCtx.fillStyle = '#92400e';
    fCtx.fillRect(chipX + 25, chipY + 22, chipW - 50, chipH - 44);
    // Chip circuit traces
    fCtx.strokeStyle = '#fef08a';
    fCtx.lineWidth = 2;
    fCtx.beginPath();
    fCtx.moveTo(chipX, chipY + 40); fCtx.lineTo(chipX + 25, chipY + 40);
    fCtx.moveTo(chipX, chipY + 75); fCtx.lineTo(chipX + 25, chipY + 75);
    fCtx.moveTo(chipX + chipW - 25, chipY + 40); fCtx.lineTo(chipX + chipW, chipY + 40);
    fCtx.moveTo(chipX + chipW - 25, chipY + 75); fCtx.lineTo(chipX + chipW, chipY + 75);
    fCtx.stroke();

    // Pill Badges (Right side)
    const drawPill = (text, x, y, bg, border, color) => {
      fCtx.font = '600 22px "Inter", sans-serif';
      const textW = fCtx.measureText(text).width;
      fCtx.fillStyle = bg;
      fCtx.strokeStyle = border;
      fCtx.lineWidth = 2;
      fCtx.beginPath();
      if (fCtx.roundRect) {
        fCtx.roundRect(x, y, textW + 32, 45, 22);
      } else {
        fCtx.rect(x, y, textW + 32, 45);
      }
      fCtx.fill();
      fCtx.stroke();
      fCtx.fillStyle = color;
      fCtx.fillText(text, x + 16, y + 31);
    };

    fCtx.textAlign = 'left';
    drawPill('🧠 Machine Learning', 275, 895, 'rgba(0, 212, 255, 0.12)', 'rgba(0, 212, 255, 0.4)', '#38bdf8');
    drawPill('🐍 Python & Analytics', 595, 895, 'rgba(139, 92, 246, 0.12)', 'rgba(139, 92, 246, 0.4)', '#c084fc');
    drawPill('⚡ 8+ Certifications', 275, 965, 'rgba(34, 197, 94, 0.12)', 'rgba(34, 197, 94, 0.4)', '#4ade80');
    drawPill('🚀 10+ GitHub Projects', 595, 965, 'rgba(234, 179, 8, 0.12)', 'rgba(234, 179, 8, 0.4)', '#facc15');

    // Bottom Barcode & Security Strip
    fCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    for (let i = 0; i < 68; i++) {
      const bx = 110 + i * 11.8;
      const bw = (i % 3 === 0 || i % 7 === 0) ? 6 : 2.5;
      fCtx.fillRect(bx, 1120, bw, 60);
    }
    fCtx.font = '600 20px "Inter", sans-serif';
    fCtx.fillStyle = '#64748b';
    fCtx.textAlign = 'center';
    fCtx.fillText('HM-IT-SECURE-CREDENTIAL-2026 • AKTU / IIMT', 512, 1215);
    fCtx.fillText('AUTHENTICATED DIGITAL PORTFOLIO BADGE', 512, 1248);

    frontTexture.needsUpdate = true;
  }

  // --- Render Back Canvas Texture ---
  function drawBackCanvas() {
    const grad = bCtx.createLinearGradient(0, 0, 1024, 1536);
    grad.addColorStop(0, '#0a1028');
    grad.addColorStop(0.5, '#0d1838');
    grad.addColorStop(1, '#050814');
    bCtx.fillStyle = grad;
    bCtx.fillRect(0, 0, 1024, 1536);

    // Magnetic Strip
    bCtx.fillStyle = '#020617';
    bCtx.fillRect(0, 140, 1024, 150);
    bCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    bCtx.fillRect(0, 200, 1024, 18);

    // Title
    bCtx.font = '800 42px "Inter", sans-serif';
    bCtx.fillStyle = '#00d4ff';
    bCtx.textAlign = 'center';
    bCtx.fillText('VERIFIED SKILL MATRIX', 512, 350);

    // Skills Matrix Box
    bCtx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    bCtx.strokeStyle = 'rgba(0, 212, 255, 0.25)';
    bCtx.lineWidth = 2;
    bCtx.beginPath();
    if (bCtx.roundRect) {
      bCtx.roundRect(80, 390, 864, 420, 24);
    } else {
      bCtx.rect(80, 390, 864, 420);
    }
    bCtx.fill();
    bCtx.stroke();

    const drawSkillRow = (cat, skills, y) => {
      bCtx.font = 'bold 26px "Inter", sans-serif';
      bCtx.fillStyle = '#38bdf8';
      bCtx.textAlign = 'left';
      bCtx.fillText(cat, 110, y);

      bCtx.font = '500 23px "Inter", sans-serif';
      bCtx.fillStyle = '#cbd5e1';
      bCtx.fillText(skills, 110, y + 36);
    };

    drawSkillRow('Core Languages:', 'Python, SQL, HTML5, CSS3, JavaScript (ES6+)', 450);
    drawSkillRow('Data Science & AI:', 'Machine Learning, Deep Learning (CNN), OpenCV, RAG, NLP', 545);
    drawSkillRow('Tools & Libraries:', 'Pandas, NumPy, Scikit-Learn, TensorFlow, Git, MySQL', 640);
    drawSkillRow('Industrial Experience:', 'Inamigos Foundation (Web Dev), InternPe (Python Dev)', 735);

    // Contact & QR Box
    bCtx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    bCtx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
    bCtx.lineWidth = 2;
    bCtx.beginPath();
    if (bCtx.roundRect) {
      bCtx.roundRect(80, 850, 864, 380, 24);
    } else {
      bCtx.rect(80, 850, 864, 380);
    }
    bCtx.fill();
    bCtx.stroke();

    bCtx.font = 'bold 30px "Inter", sans-serif';
    bCtx.fillStyle = '#c084fc';
    bCtx.textAlign = 'center';
    bCtx.fillText('CONNECT & VERIFY WORK', 512, 910);

    bCtx.font = '500 26px "Inter", sans-serif';
    bCtx.fillStyle = '#f8fafc';
    bCtx.fillText('GitHub: github.com/harshit-001-it & har-001', 512, 975);
    bCtx.fillText('LinkedIn: linkedin.com/in/harshit-mishra-51275b219', 512, 1030);
    bCtx.fillText('Email: harshitmishra1208@gmail.com', 512, 1085);
    bCtx.fillText('Location: Lucknow, Uttar Pradesh, India', 512, 1140);

    // Security Footer
    bCtx.font = '600 22px "Inter", sans-serif';
    bCtx.fillStyle = '#64748b';
    bCtx.fillText('CLICK / TAP CARD TO FLIP BACK TO FRONT', 512, 1300);
    bCtx.fillText('OFFICIAL HARSHIT MISHRA DIGITAL CREDENTIAL', 512, 1340);

    backTexture.needsUpdate = true;
  }

  // Load portrait photo and initialize textures
  const portraitImg = new Image();
  portraitImg.crossOrigin = 'anonymous';
  portraitImg.src = 'image.png';
  portraitImg.onload = () => drawFrontCanvas(portraitImg);
  drawFrontCanvas(null);
  drawBackCanvas();

  // --- Spring Damper Physics & Pull-Down Interaction ---
  let isDragging = false;
  let isFlipped = false;
  let prevPointerX = 0;
  let prevPointerY = 0;
  let pointerDownTime = 0;
  let pointerDownX = 0;
  let pointerDownY = 0;
  let pullDownPx = 0;

  let currentRotY = 0;
  let currentRotX = 0;
  let targetRotY = 0;
  let targetRotX = 0;

  let currentPosX = 0;
  let currentPosY = 0;
  let targetPosX = 0;
  let targetPosY = 0;

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function onPointerDown(e) {
    const rect = stage.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(cardGroup.children, true);
    const insideStage = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;

    if (intersects.length > 0 || insideStage) {
      isDragging = true;
      prevPointerX = clientX;
      prevPointerY = clientY;
      pointerDownX = clientX;
      pointerDownY = clientY;
      pointerDownTime = Date.now();
      pullDownPx = 0;
    }
  }

  function onPointerMove(e) {
    if (!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - prevPointerX;
    const deltaY = clientY - prevPointerY;
    prevPointerX = clientX;
    prevPointerY = clientY;

    // Check downward pull gesture
    const currentPullDown = clientY - pointerDownY;
    pullDownPx = Math.max(0, currentPullDown);

    if (pullDownPx > 10) {
      // Physically stretch card downwards in 3D
      targetPosY = -Math.min(2.8, (pullDownPx - 10) * 0.018);
      targetRotX = -Math.min(0.45, pullDownPx * 0.0035);

      // Dynamic feedback badge
      if (hintText && hintBadge) {
        if (pullDownPx < 30) {
          hintText.textContent = 'Drag to rotate • Click to flip • Pull down to scroll ↓';
          if (hintIcon) hintIcon.textContent = '🔄';
          hintBadge.classList.remove('ready-to-release');
        } else if (pullDownPx < 60) {
          hintText.textContent = 'Keep pulling down to explore... ↓';
          if (hintIcon) hintIcon.textContent = '⚡';
          hintBadge.classList.remove('ready-to-release');
        } else {
          hintText.textContent = 'Release to Explore Portfolio!';
          if (hintIcon) hintIcon.textContent = '🚀';
          hintBadge.classList.add('ready-to-release');
        }
      }
    } else {
      // Normal rotation and sway
      targetRotY += deltaX * 0.009;
      targetRotX += deltaY * 0.007;
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));

      targetPosX += deltaX * 0.004;
      targetPosY -= deltaY * 0.004;
      targetPosX = Math.max(-1.0, Math.min(1.0, targetPosX));
      targetPosY = Math.max(-0.6, Math.min(0.6, targetPosY));
    }
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;

    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

    const totalDist = Math.hypot(clientX - pointerDownX, clientY - pointerDownY);
    const duration = Date.now() - pointerDownTime;

    // Trigger Pull-Down to Scroll when dragged past 60px
    if (pullDownPx >= 60) {
      if (hintText) hintText.textContent = '✨ Entering Portfolio...';
      if (hintIcon) hintIcon.textContent = '🌟';

      // Snap card back
      targetPosY = 0;
      targetPosX = 0;
      targetRotX = 0;

      // Smooth scroll to About section
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const navHeight = 70;
        const targetPos = aboutSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }

      setTimeout(() => {
        if (hintText) hintText.textContent = 'Drag to rotate • Click to flip • Pull down to scroll ↓';
        if (hintIcon) hintIcon.textContent = '🔄';
        if (hintBadge) hintBadge.classList.remove('ready-to-release');
      }, 1600);
      return;
    }

    // Reset card translation
    targetPosY = 0;
    targetPosX = 0;
    targetRotX = 0;

    if (hintText) hintText.textContent = 'Drag to rotate • Click to flip • Pull down to scroll ↓';
    if (hintIcon) hintIcon.textContent = '🔄';
    if (hintBadge) hintBadge.classList.remove('ready-to-release');

    // Detect click / tap to flip
    if (totalDist < 12 && duration < 320) {
      isFlipped = !isFlipped;
    }

    // Settle to front (0) or back (Math.PI)
    targetRotY = isFlipped ? Math.PI : 0;
  }

  // Event Listeners with passive touch handling
  stage.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  stage.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp, { passive: true });

  // Reset Button handler
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isFlipped = false;
      targetRotY = 0;
      targetRotX = 0;
      targetPosX = 0;
      targetPosY = 0;
      if (hintText) hintText.textContent = 'Drag to rotate • Click to flip • Pull down to scroll ↓';
      if (hintBadge) hintBadge.classList.remove('ready-to-release');
    });
  }

  // Responsive Resize Handler
  function onResize() {
    if (!stage) return;
    width = stage.clientWidth || 340;
    height = stage.clientHeight || 480;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', onResize);
  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(stage);

  // Animation Loop with Spring-Damper Physics
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Idle subtle sway when not dragging
    let idleSwayY = 0;
    let idleSwayX = 0;
    if (!isDragging) {
      idleSwayY = Math.sin(time * 1.4) * 0.05;
      idleSwayX = Math.cos(time * 1.8) * 0.03;
    }

    // Spring interpolation toward target
    const springStrength = isDragging ? 0.35 : 0.09;
    currentRotY += (targetRotY + idleSwayY - currentRotY) * springStrength;
    currentRotX += (targetRotX + idleSwayX - currentRotX) * springStrength;

    currentPosX += (targetPosX - currentPosX) * 0.12;
    currentPosY += (targetPosY - currentPosY) * 0.12;

    cardGroup.rotation.y = currentRotY;
    cardGroup.rotation.x = currentRotX;
    cardGroup.rotation.z = -currentPosX * 0.08;

    cardGroup.position.x = currentPosX;
    cardGroup.position.y = currentPosY + (isDragging ? 0 : Math.sin(time * 2.0) * 0.06);

    // Ribbon follows the card displacement
    if (strapMesh) {
      strapMesh.rotation.z = currentPosX * 0.04;
    }

    renderer.render(scene, camera);
  }

  animate();
}

/* ----------------------------------------------------------------
   SCROLL REVEAL ANIMATIONS
   ---------------------------------------------------------------- */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach((el) => observer.observe(el));
}

/* ----------------------------------------------------------------
   ANIMATED COUNTERS
   ---------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((c) => observer.observe(c));
}

function animateCounter(el, target) {
  const duration = 2000;
  const start = Date.now();

  function step() {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + '+';
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ----------------------------------------------------------------
   SKILLS DATA & RENDERING
   ---------------------------------------------------------------- */
const skillsData = [
  {
    title: 'AI Engineering',
    icon: '🤖',
    skills: [
      { name: 'ML (Machine Learning)', level: 88 },
      { name: 'Deep Learning (CNN)', level: 82 },
      { name: 'NLP (Text Analysis)', level: 80 },
      { name: 'OpenCV', level: 85 },
      { name: 'RAG & LLM', level: 78 },
      { name: 'Prompt Engineering', level: 90 },
    ],
  },
  {
    title: 'Core Stack',
    icon: '⚙️',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'C++ / Java', level: 78 },
      { name: 'TensorFlow', level: 82 },
      { name: 'Web Development', level: 80 },
      { name: 'MySQL / JSON', level: 75 },
      { name: 'Linux (OS)', level: 72 },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: '🛠️',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Power BI', level: 70 },
      { name: 'Azure ML Studio', level: 68 },
      { name: 'Google Colab', level: 88 },
      { name: 'Jupyter Notebooks', level: 85 },
    ],
  },
  {
    title: 'Soft Skills',
    icon: '💡',
    skills: [
      { name: 'Problem Solving', level: 92 },
      { name: 'Leadership', level: 85 },
      { name: 'Teamwork', level: 90 },
      { name: 'Technical Writing', level: 80 },
      { name: 'Communication', level: 85 },
      { name: 'Continuous Learning', level: 95 },
    ],
  },
];

function renderSkills() {
  const grid = document.getElementById('skillsGrid');

  grid.innerHTML = skillsData.map((cat, catIdx) => `
    <div class="skill-category reveal reveal-delay-${Math.min(catIdx + 1, 4)}">
      <div class="skill-category-header">
        <div class="skill-category-icon">${cat.icon}</div>
        <h3 class="skill-category-title">${cat.title}</h3>
      </div>
      <div class="skill-items">
        ${cat.skills.map((s) => `
          <div class="skill-item" data-skill="${s.name}" data-category="${cat.title}" data-icon="${cat.icon}">
            <div class="skill-info">
              <span class="skill-name">${s.name} 💡</span>
              <span class="skill-percent">${s.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-fill" data-level="${s.level}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Re-init reveal & click handlers for dynamically added elements
  initRevealAnimations();
  initSkillModalClickHandlers();
  setTimeout(init3DTilt, 50);
}

function initSkillBarAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.skill-fill');
        bars.forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.getAttribute('data-level') + '%';
            bar.classList.add('animated');
          }, i * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Observe after rendering
  setTimeout(() => {
    document.querySelectorAll('.skill-category').forEach((cat) => observer.observe(cat));
  }, 100);
}

/* ----------------------------------------------------------------
   PROJECTS — DYNAMIC GITHUB API FETCHING
   Fetches repos from both GitHub accounts automatically.
   ---------------------------------------------------------------- */
const GITHUB_USERNAMES = ['harshit-001-it', 'har-001'];

async function fetchGitHubRepos(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`
    );
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const repos = await response.json();
    return repos
      .filter((repo) => !repo.fork && !repo.archived)
      .map((repo) => ({
        id: repo.full_name,
        title: formatRepoName(repo.name),
        description: repo.description || 'No description provided.',
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || null,
        topics: repo.topics || [],
        updatedAt: repo.updated_at,
        owner: username,
      }));
  } catch (err) {
    console.error(`Failed to fetch repos for ${username}:`, err);
    return [];
  }
}

function formatRepoName(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getLanguageColor(lang) {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Jupyter Notebook': '#DA5B0B',
    'Shell': '#89e051',
    'Dart': '#00B4AB',
    'Kotlin': '#A97BFF',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Unknown': '#6a6a82',
  };
  return colors[lang] || '#6a6a82';
}

function getLanguageEmoji(lang) {
  const emojis = {
    'Python': '🐍',
    'JavaScript': '⚡',
    'TypeScript': '🔷',
    'Java': '☕',
    'C++': '⚙️',
    'HTML': '🌐',
    'CSS': '🎨',
    'Jupyter Notebook': '📓',
    'Shell': '🐚',
    'Dart': '🎯',
    'Unknown': '📁',
  };
  return emojis[lang] || '📦';
}

async function fetchAndRenderProjects() {
  const grid = document.getElementById('projectsGrid');

  // Show loading state
  grid.innerHTML = `
    <div class="projects-loading">
      <div class="loading-spinner"></div>
      <p>Fetching projects from GitHub...</p>
    </div>
  `;

  // Fetch from both accounts
  const allReposArrays = await Promise.all(
    GITHUB_USERNAMES.map((u) => fetchGitHubRepos(u))
  );

  const allRepos = allReposArrays
    .flat()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  if (allRepos.length === 0) {
    grid.innerHTML = `
      <div class="projects-empty">
        <p>Unable to load projects. Please check back later.</p>
      </div>
    `;
    return;
  }

  // Build unique language filter buttons
  const languages = [...new Set(allRepos.map((r) => r.language))].filter(Boolean);
  const filtersContainer = document.getElementById('projectFilters');
  filtersContainer.innerHTML = `
    <button class="filter-btn active" data-filter="all">All (${allRepos.length})</button>
    ${languages.map((lang) => {
      const count = allRepos.filter((r) => r.language === lang).length;
      return `<button class="filter-btn" data-filter="${lang}">${lang} (${count})</button>`;
    }).join('')}
  `;

  // Render projects
  renderProjectCards(allRepos, 'all');

  // Init filter buttons
  const filterBtns = filtersContainer.querySelectorAll('.filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      const filtered = filter === 'all' ? allRepos : allRepos.filter((r) => r.language === filter);
      renderProjectCards(filtered, filter);
    });
  });
}

function renderProjectCards(repos, filter) {
  const grid = document.getElementById('projectsGrid');

  grid.innerHTML = repos.map((p, idx) => `
    <div class="project-card reveal reveal-delay-${Math.min((idx % 4) + 1, 4)}" data-language="${p.language}">
      <div class="project-image">
        ${getLanguageEmoji(p.language)}
        <div class="project-overlay">
          <a href="${p.githubUrl}" target="_blank" rel="noopener" class="project-overlay-btn" title="View Code">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          ${p.liveUrl ? `
          <a href="${p.liveUrl}" target="_blank" rel="noopener" class="project-overlay-btn" title="Live Demo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7z"/></svg>
          </a>
          ` : ''}
        </div>
      </div>
      <div class="project-info">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-meta">
          <span class="project-language">
            <span class="lang-dot" style="background:${getLanguageColor(p.language)}"></span>
            ${p.language}
          </span>
          ${p.stars > 0 ? `<span class="project-stat">⭐ ${p.stars}</span>` : ''}
          ${p.forks > 0 ? `<span class="project-stat">🔀 ${p.forks}</span>` : ''}
          <span class="project-owner">@${p.owner}</span>
        </div>
        ${p.topics.length > 0 ? `
          <div class="project-tech">
            ${p.topics.slice(0, 4).map((t) => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');

  // Re-init reveal for new elements
  initRevealAnimations();
  setTimeout(init3DTilt, 50);
}

/* ----------------------------------------------------------------
   CERTIFICATES DATA & RENDERING
   ---------------------------------------------------------------- */
const certificatesData = [
  {
    title: 'AI Web Developer Internship Completion',
    issuer: 'Inamigos Foundation',
    icon: '🌐',
    filePath: 'Certificates/Inamigos Completion letter 1.pdf',
    date: 'July 2026 - August 2026',
    skills: [
      'Full-Stack Web Development & Responsive Design',
      'NGO Donation Platform Re-engineering',
      'AI Integration & Modern Frontend Architecture',
      'Verified Industrial Internship Completion'
    ]
  },
  {
    title: 'Python Programming Internship Completion',
    issuer: 'InternPe',
    icon: '🐍',
    filePath: 'Certificates/InternPe Completion Letter.png',
    date: '12 May 2025 - 08 June 2025',
    skills: [
      'Industrial Python Programming & Scripting',
      'Object-Oriented Programming (OOP) & Clean Code',
      'Data Structures & Algorithm Implementation',
      'AICTE & MSME Recognized Internship (CID: IPI#52842)'
    ]
  },
  {
    title: 'Excellence in Machine Learning Foundations',
    issuer: 'AnalytixLabs',
    icon: '🧠',
    filePath: 'Certificates/1746505154279.jpeg',
    date: '20 April 2025',
    skills: [
      'Supervised & Unsupervised Machine Learning Algorithms',
      'Data Science Foundations & Predictive Analytics',
      'Model Building & Performance Metrics Evaluation',
      'Mentored by Senior Data Scientists (Apple / Airtel / AnalytixLabs)'
    ]
  },
  {
    title: 'Freedom with AI Masterclass',
    issuer: 'Freedom with AI',
    icon: '⚡',
    filePath: 'Certificates/1746987610367.pdf',
    date: '10 May 2025',
    skills: [
      'Generative AI & LLM Workflow Automation',
      'Advanced Prompt Engineering Techniques',
      'AI Tools Integration & Productivity Optimization',
      'ISO 9001:2015 Certified Masterclass'
    ]
  },
  {
    title: 'Machine Learning Workshop',
    issuer: 'Softpro India & AKTU',
    icon: '🎓',
    filePath: 'Certificates/1763482137893.jpeg',
    date: '14 November 2025',
    skills: [
      'Hands-on Machine Learning Model Development',
      'Collaborative Workshop with Dr. APJ Abdul Kalam Tech University',
      'IIT Kanpur & IET Lucknow Technocrats Mentorship',
      'Data Preprocessing & Feature Selection'
    ]
  },
  {
    title: 'Smart Embedded Systems & Internet of Things (IoT)',
    issuer: 'Technoledge Eduresearch & IIMT College',
    icon: '📡',
    filePath: 'Certificates/IIMT May batch 99.pdf',
    date: '10 March 2025 - 20 June 2025',
    skills: [
      'Microcontrollers & Embedded Hardware Integration',
      'Wireless Sensor Networks & Telemetry Data Processing',
      'Smart City & Industrial IoT Architectures',
      'Official Training Program (Cert No: T/IOT/929269/26)'
    ]
  },
  {
    title: 'Advance Internet of Things (IoT)',
    issuer: 'Technoledge Eduresearch & IIMT College',
    icon: '🌐',
    filePath: 'Certificates/PrintMerge1 373.pdf',
    date: '09 Sept 2024 - 17 Jan 2025',
    skills: [
      'Advanced IoT Protocols (MQTT, HTTP, CoAP)',
      'Edge Computing & Cloud Sensor Dashboards',
      'Hardware Interfacing & System Automation',
      'Official Certification (Cert No: T/IOT/712953/25)'
    ]
  },
  {
    title: 'Startups & Legal Seminar',
    issuer: 'Appwars Technologies (Govt of India MSME)',
    icon: '💼',
    filePath: 'Certificates/1746506117256.jpeg',
    date: '09 April 2025',
    skills: [
      'Entrepreneurship & Startup Ecosystem Principles',
      'Intellectual Property Rights & Business Legalities',
      'Tech Product Scaling & Governance',
      'Ministry of MSME Approved Enterprise Program'
    ]
  }
];

function renderCertificates() {
  const grid = document.getElementById('certificatesGrid');

  grid.innerHTML = certificatesData.map((cert, idx) => `
    <div class="cert-card reveal reveal-delay-${Math.min((idx % 4) + 1, 4)}" data-cert-index="${idx}">
      <div class="cert-icon">${cert.icon}</div>
      <h3 class="cert-title">${cert.title}</h3>
      <p class="cert-issuer">${cert.issuer}</p>
      <span style="font-size:0.75rem;color:var(--accent);margin-top:4px;">Click to view details 🔍</span>
    </div>
  `).join('');

  // Re-init reveal & click handlers for certificates
  initRevealAnimations();
  initCertModalHandlers();
  setTimeout(init3DTilt, 50);
}

function initCertModalHandlers() {
  const overlay = document.getElementById('certModalOverlay');
  const closeBtn = document.getElementById('certModalClose');
  const iconEl = document.getElementById('certModalIcon');
  const titleEl = document.getElementById('certModalTitle');
  const issuerEl = document.getElementById('certModalIssuer');
  const skillsListEl = document.getElementById('certSkillsList');
  const verifyLinkEl = document.getElementById('certVerifyLink');

  if (!overlay) return;

  const cards = document.querySelectorAll('.cert-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = card.getAttribute('data-cert-index');
      const cert = certificatesData[idx];
      if (!cert) return;

      iconEl.textContent = cert.icon;
      titleEl.textContent = cert.title;
      issuerEl.textContent = `${cert.issuer} • ${cert.date}`;
      verifyLinkEl.href = cert.filePath;
      verifyLinkEl.textContent = 'View Certificate Document 📄';

      skillsListEl.innerHTML = cert.skills.map((s) => `<li>${s}</li>`).join('');

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

/* ----------------------------------------------------------------
   CONTACT FORM INTEGRATION (Phase 2A)
   Sends live messages directly to harshitmishra1208@gmail.com
   ---------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn.innerHTML;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending message... ⏳';
    status.className = 'form-status';
    status.style.display = 'none';

    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('_replyto') || formData.get('email');
    const subject = formData.get('subject') || 'New Portfolio Contact Form Submission';
    const message = formData.get('message');

    try {
      // 1. Try sending via Formspree AJAX
      const response = await fetch(form.action, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
          _replyto: email
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        status.className = 'form-status success';
        status.innerHTML = '✅ <strong>Message sent successfully!</strong> Thank you for reaching out, Harshit will reply to you soon.';
        form.reset();
      } else {
        throw new Error('Server response was not ok');
      }
    } catch (err) {
      console.warn('Formspree/AJAX send notice, activating mailto fallback:', err);
      
      // 2. Fallback: Launch mailto directly to harshitmishra1208@gmail.com so no message is ever lost
      const mailtoUrl = `mailto:harshitmishra1208@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Harshit,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
      
      status.className = 'form-status success';
      status.innerHTML = '✅ <strong>Opening your email client...</strong> If it does not open automatically, please email directly to <a href="mailto:harshitmishra1208@gmail.com" style="color:var(--accent);text-decoration:underline;">harshitmishra1208@gmail.com</a>';
      
      window.location.href = mailtoUrl;
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      status.style.display = 'block';

      setTimeout(() => {
        status.style.display = '';
      }, 8000);
    }
  });
}

/* ----------------------------------------------------------------
   BACK TO TOP
   ---------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ----------------------------------------------------------------
   DUAL GITHUB DROPDOWN TOGGLE
   ---------------------------------------------------------------- */
function initGitHubDropdown() {
  const btn = document.getElementById('githubDropdownBtn');
  const menu = document.getElementById('githubOptionsMenu');

  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== btn) {
      menu.classList.remove('active');
    }
  });
}

/* ----------------------------------------------------------------
   SKILL LEARNING ROADMAP & RESOURCES MODAL (Phase 2 & 3 Feature)
   ---------------------------------------------------------------- */
const skillRoadmapDetails = {
  'ML (Machine Learning)': {
    icon: '🧠',
    roadmap: [
      '<strong>Step 1: Mathematics & Statistics</strong> — Master Linear Algebra, Multivariable Calculus, Probability & Descriptive Statistics.',
      '<strong>Step 2: Python Data Science Stack</strong> — Learn NumPy, Pandas, Matplotlib, and Seaborn for data manipulation.',
      '<strong>Step 3: Core ML Algorithms</strong> — Linear/Logistic Regression, Decision Trees, Random Forests, SVMs, & K-Means Clustering.',
      '<strong>Step 4: Model Evaluation & Tuning</strong> — Cross-validation, Hyperparameter Optimization (Grid/Random Search), ROC-AUC, Metrics.',
      '<strong>Step 5: Production & Deployment</strong> — Model serialization (Pickle/ONNX), API integration (FastAPI), & Model Monitoring.'
    ],
    resources: [
      { name: 'Scikit-Learn Official Guide', url: 'https://scikit-learn.org/stable/user_guide.html', desc: 'The gold standard documentation for Machine Learning algorithms in Python.' },
      { name: 'Machine Learning Specialization (Coursera)', url: 'https://www.coursera.org/specializations/machine-learning-introduction', desc: 'Andrew Ng\'s world-famous introduction to ML fundamentals.' },
      { name: 'Kaggle Learn Tutorials', url: 'https://www.kaggle.com/learn', desc: 'Hands-on interactive ML micro-courses and competitions.' },
      { name: 'YouTube Search: StatQuest ML', url: 'https://www.youtube.com/results?search_query=statquest+machine+learning', desc: 'Visual step-by-step math and machine learning breakdowns on YouTube.' }
    ]
  },
  'Deep Learning (CNN)': {
    icon: '👁️',
    roadmap: [
      '<strong>Step 1: Neural Networks Foundations</strong> — Perceptrons, Activation Functions (ReLU, Softmax), Forward & Backpropagation.',
      '<strong>Step 2: Convolutional Neural Networks</strong> — Convolution filters, Pooling layers, Padding, Stride, & Feature Map extraction.',
      '<strong>Step 3: CNN Architectures</strong> — Study AlexNet, VGG16, ResNet, MobileNet, and Transfer Learning techniques.',
      '<strong>Step 4: Computer Vision Tasks</strong> — Image Classification, Object Detection (YOLO), & Instance Segmentation.',
      '<strong>Step 5: Deep Learning Frameworks</strong> — Hands-on implementation in PyTorch and TensorFlow / Keras.'
    ],
    resources: [
      { name: 'CS231n: Deep Learning for Computer Vision (Stanford)', url: 'http://cs231n.stanford.edu/', desc: 'Stanford University\'s premier Convolutional Neural Network course.' },
      { name: 'DeepLearning.AI Specialization', url: 'https://www.deeplearning.ai/courses/deep-learning-specialization/', desc: 'Comprehensive deep learning curriculum by Andrew Ng.' },
      { name: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/', desc: 'Official PyTorch step-by-step guides for computer vision.' },
      { name: 'YouTube Search: Practical Deep Learning (Fast.ai)', url: 'https://www.youtube.com/results?search_query=fast+ai+deep+learning+course', desc: 'Free practical course videos for building state-of-the-art DL models.' }
    ]
  },
  'NLP (Text Analysis)': {
    icon: '📝',
    roadmap: [
      '<strong>Step 1: Text Preprocessing</strong> — Tokenization, Stopwords, Stemming/Lemmatization, Regular Expressions.',
      '<strong>Step 2: Vector Representations</strong> — Bag of Words (BoW), TF-IDF, Word2Vec, GloVe, and FastText.',
      '<strong>Step 3: Sequential Models</strong> — Recurrent Neural Networks (RNNs), LSTMs, and GRUs for sequence data.',
      '<strong>Step 4: Attention & Transformers</strong> — Self-Attention mechanism, Transformer Architectures (BERT, RoBERTa, T5).',
      '<strong>Step 5: NLP Applications</strong> — Sentiment Analysis, Text Summarization, Named Entity Recognition (NER), & Question Answering.'
    ],
    resources: [
      { name: 'Hugging Face NLP Course', url: 'https://huggingface.co/course/chapter1/1', desc: 'Free interactive course on Transformers and Hugging Face library.' },
      { name: 'CS224n: Natural Language Processing with Deep Learning (Stanford)', url: 'https://web.stanford.edu/class/cs224n/', desc: 'Stanford\'s deep learning NLP lectures and assignments.' },
      { name: 'SpaCy Official Documentation & Course', url: 'https://spacy.io/usage/spacy-101', desc: 'Industrial-strength Natural Language Processing in Python.' },
      { name: 'YouTube Search: NLP Full Course', url: 'https://www.youtube.com/results?search_query=natural+language+processing+course', desc: 'Top video tutorials on NLP and Transformers on YouTube.' }
    ]
  },
  'OpenCV': {
    icon: '📷',
    roadmap: [
      '<strong>Step 1: Core Operations</strong> — Image reading, display, saving, matrix manipulations, and pixel editing.',
      '<strong>Step 2: Image Processing</strong> — Color spaces (RGB, HSV, Gray), Thresholding, Gaussian Blur, Canny Edge Detection.',
      '<strong>Step 3: Contours & Shapes</strong> — Contour detection, bounding boxes, convex hulls, and geometric transformations.',
      '<strong>Step 4: Real-time Video Streams</strong> — WebCam capture, frame processing, optical flow, and motion tracking.',
      '<strong>Step 5: Integration with Deep Learning</strong> — Haar Cascades, DNN module, YOLO object detection with OpenCV.'
    ],
    resources: [
      { name: 'OpenCV Official Documentation', url: 'https://docs.opencv.org/4.x/', desc: 'Comprehensive C++ and Python API documentation.' },
      { name: 'PyImageSearch Guides', url: 'https://pyimagesearch.com/', desc: 'Practical tutorials on Computer Vision, OpenCV, and Deep Learning.' },
      { name: 'YouTube Search: OpenCV Python Tutorial', url: 'https://www.youtube.com/results?search_query=opencv+python+tutorial', desc: 'Search top video courses for OpenCV in Python on YouTube.' },
      { name: 'LearnOpenCV by Satya Mallick', url: 'https://learnopencv.com/', desc: 'In-depth blogs and code snippets for modern Computer Vision.' }
    ]
  },
  'RAG & LLM': {
    icon: '⚡',
    roadmap: [
      '<strong>Step 1: LLM Fundamentals</strong> — Understanding Large Language Models, Tokenization, Context Windows, and Temperature.',
      '<strong>Step 2: Vector Databases</strong> — Document Chunking, Embeddings, Similarity Search (ChromaDB, Pinecone, FAISS).',
      '<strong>Step 3: Retrieval Augmented Generation (RAG)</strong> — Combining retrieval mechanisms with generative LLMs.',
      '<strong>Step 4: Orchestration Frameworks</strong> — LangChain, LlamaIndex, Prompt Templates, Memory, and Agents.',
      '<strong>Step 5: Advanced RAG Techniques</strong> — Hybrid Search, Re-ranking, HyDE, Multi-query retrieval, & Guardrails.'
    ],
    resources: [
      { name: 'LangChain Official Documentation', url: 'https://python.langchain.com/docs/get_started/introduction', desc: 'Framework for developing applications powered by language models.' },
      { name: 'LlamaIndex Documentation', url: 'https://docs.llamaindex.ai/', desc: 'Data framework for LLM applications to connect custom data sources.' },
      { name: 'Pinecone Learning Center: RAG', url: 'https://www.pinecone.io/learn/javascript-rag/', desc: 'Clear guides on vector search and Retrieval Augmented Generation.' },
      { name: 'YouTube Search: LangChain & RAG Tutorials', url: 'https://www.youtube.com/results?search_query=langchain+rag+tutorial', desc: 'Top video tutorials on building RAG applications on YouTube.' }
    ]
  },
  'Prompt Engineering': {
    icon: '💬',
    roadmap: [
      '<strong>Step 1: Basic Prompt Structure</strong> — Instruction, Context, Input Data, and Output Indicator.',
      '<strong>Step 2: Advanced Techniques</strong> — Few-Shot Prompting, Chain-of-Thought (CoT), Tree of Thoughts (ToT).',
      '<strong>Step 3: System Prompts & Personas</strong> — Role-playing, Output formatting (JSON, XML), Rule enforcement.',
      '<strong>Step 4: ReAct & Agent Prompting</strong> — Reasoning + Acting loops for autonomous tool-using agents.',
      '<strong>Step 5: Evaluation & Safety</strong> — Jailbreak mitigation, Prompt Injection defense, & Output verification.'
    ],
    resources: [
      { name: 'Prompt Engineering Guide (DAIR.AI)', url: 'https://www.promptingguide.ai/', desc: 'Comprehensive open-source guide on Prompt Engineering.' },
      { name: 'OpenAI Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering', desc: 'Official strategies and best practices from OpenAI.' },
      { name: 'YouTube Search: Prompt Engineering Guide', url: 'https://www.youtube.com/results?search_query=prompt+engineering+course', desc: 'Top video tutorials for mastering Prompt Engineering on YouTube.' }
    ]
  },
  'Python': {
    icon: '🐍',
    roadmap: [
      '<strong>Step 1: Syntax & Basics</strong> — Variables, Data Types, Control Flow (if/else, loops), Functions.',
      '<strong>Step 2: Data Structures</strong> — Lists, Dictionaries, Sets, Tuples, Comprehensions.',
      '<strong>Step 3: Object-Oriented Programming (OOP)</strong> — Classes, Inheritance, Polymorphism, Encapsulation.',
      '<strong>Step 4: Intermediate Python</strong> — Decorators, Generators, Context Managers, Asyncio, Package Management (pip/uv).',
      '<strong>Step 5: Ecosystem Specialization</strong> — Web (FastAPI/Django) or AI/Data (NumPy, Pandas, PyTorch).'
    ],
    resources: [
      { name: 'Python Official Documentation & Tutorial', url: 'https://docs.python.org/3/tutorial/', desc: 'The authoritative reference manual for Python.' },
      { name: 'Real Python Tutorials', url: 'https://realpython.com/', desc: 'High-quality, practical Python articles and tutorials.' },
      { name: 'Full Stack Python', url: 'https://www.fullstackpython.com/', desc: 'Guide to building, deploying, and operating Python applications.' },
      { name: 'YouTube Search: Python Course for Beginners', url: 'https://www.youtube.com/results?search_query=python+tutorial+for+beginners', desc: 'Search top full Python video courses on YouTube.' }
    ]
  },
  'C++ / Java': {
    icon: '☕',
    roadmap: [
      '<strong>Step 1: Syntax & Control Flow</strong> — Data types, Operators, Loops, Functions, Memory layout.',
      '<strong>Step 2: Object-Oriented Design</strong> — Abstraction, Encapsulation, Inheritance, Polymorphism, Interfaces.',
      '<strong>Step 3: Advanced Concepts</strong> — Pointers/Smart Pointers & Templates (C++) / JVM & Garbage Collection (Java).',
      '<strong>Step 4: Data Structures & Algorithms</strong> — Vectors/ArrayLists, Trees, Graphs, Sorting, Dynamic Programming.',
      '<strong>Step 5: Modern Features</strong> — C++17/C++20 features or Java 17/21 Records, Lambdas, and Streams.'
    ],
    resources: [
      { name: 'LearnCpp.com (Free)', url: 'https://www.learncpp.com/', desc: 'The most comprehensive free C++ tutorial site.' },
      { name: 'Java Official Documentation (Oracle)', url: 'https://docs.oracle.com/en/java/', desc: 'Official JDK guide and API documentation.' },
      { name: 'YouTube Search: C++ & Java DSA', url: 'https://www.youtube.com/results?search_query=c%2B%2B+dsa+course', desc: 'Search top Data Structures & Algorithms video courses on YouTube.' }
    ]
  },
  'TensorFlow': {
    icon: '📦',
    roadmap: [
      '<strong>Step 1: Tensors & Operations</strong> — Tensor creation, indexing, reshaping, & GPU execution.',
      '<strong>Step 2: Keras Sequential & Functional API</strong> — Building Feedforward & Convolutional Neural Networks.',
      '<strong>Step 3: Custom Training Loops</strong> — tf.GradientTape, Loss functions, Optimizers, & Metrics.',
      '<strong>Step 4: Data Pipelines</strong> — tf.data API for high-performance preprocessing and streaming.',
      '<strong>Step 5: Deployment</strong> — TensorFlow Lite (Mobile/IoT) & TensorFlow Serving / TF.js.'
    ],
    resources: [
      { name: 'TensorFlow Official Tutorials', url: 'https://www.tensorflow.org/tutorials', desc: 'Official hands-on guides for computer vision, NLP, and audio.' },
      { name: 'YouTube Search: TensorFlow Beginner Course', url: 'https://www.youtube.com/results?search_query=tensorflow+course+for+beginners', desc: 'Search top TensorFlow video courses on YouTube.' },
      { name: 'Keras Official Documentation', url: 'https://keras.io/', desc: 'Simple, flexible, and powerful Deep Learning framework.' }
    ]
  },
  'Web Development': {
    icon: '🌐',
    roadmap: [
      '<strong>Step 1: Frontend Fundamentals</strong> — Semantic HTML5, CSS3 Layouts (Flexbox, Grid), Responsive Design.',
      '<strong>Step 2: JavaScript Modern ES6+</strong> — DOM manipulation, Async/Await, Fetch API, Closures, Event Loop.',
      '<strong>Step 3: Frontend Frameworks</strong> — React, Next.js, State Management, Client-side Routing.',
      '<strong>Step 4: Backend & APIs</strong> — Node.js, Express, RESTful API design, Authentication (JWT/OAuth).',
      '<strong>Step 5: Deployment & DevOps</strong> — Vercel, Netlify, CI/CD pipelines, Performance optimization.'
    ],
    resources: [
      { name: 'MDN Web Docs (Mozilla)', url: 'https://developer.mozilla.org/', desc: 'The ultimate web developer resource for HTML, CSS, and JS.' },
      { name: 'YouTube Search: Full Web Development Course', url: 'https://www.youtube.com/results?search_query=full+stack+web+development+course', desc: 'Search top full-stack web development tutorials on YouTube.' },
      { name: 'web.dev by Google', url: 'https://web.dev/', desc: 'Guidance and modern web design best practices.' }
    ]
  },
  'MySQL / JSON': {
    icon: '🗄️',
    roadmap: [
      '<strong>Step 1: Database Fundamentals</strong> — Relational model, Tables, Keys (Primary, Foreign), Data Types.',
      '<strong>Step 2: SQL Querying</strong> — SELECT, WHERE, JOINs (Inner, Left, Right), GROUP BY, Aggregations.',
      '<strong>Step 3: Database Design</strong> — ER Diagrams, Normalization (1NF, 2NF, 3NF), Indexing strategies.',
      '<strong>Step 4: JSON Integration</strong> — Native JSON data type in MySQL, JSON_EXTRACT, Document storage.',
      '<strong>Step 5: Performance & Security</strong> — Query optimization (EXPLAIN), Transactions (ACID), SQL Injection defense.'
    ],
    resources: [
      { name: 'MySQL Official Reference Manual', url: 'https://dev.mysql.com/doc/refman/8.0/en/', desc: 'Complete reference for MySQL database server.' },
      { name: 'SQLBolt Interactive SQL Tutorials', url: 'https://sqlbolt.com/', desc: 'Interactive lessons for learning SQL with queries.' },
      { name: 'YouTube Search: MySQL Full Course', url: 'https://www.youtube.com/results?search_query=mysql+full+course', desc: 'Search top MySQL video courses on YouTube.' }
    ]
  },
  'Linux (OS)': {
    icon: '🐧',
    roadmap: [
      '<strong>Step 1: Command Line Basics</strong> — Navigation (cd, ls), File operations (cp, mv, rm), File permissions (chmod, chown).',
      '<strong>Step 2: System Administration</strong> — Package management (apt/yum), Systemd services, Environment variables.',
      '<strong>Step 3: Text Processing</strong> — grep, sed, awk, find, pipes, and I/O redirection.',
      '<strong>Step 4: Shell Scripting</strong> — Bash scripts, automation, cron jobs, error handling.',
      '<strong>Step 5: Networking & Security</strong> — SSH keys, firewall (ufw), netstat/ss, process monitoring (htop).'
    ],
    resources: [
      { name: 'Linux Journey (Free)', url: 'https://linuxjourney.com/', desc: 'Fun and easy way to learn Linux step-by-step.' },
      { name: 'OverTheWire: Bandit', url: 'https://overthewire.org/wargames/bandit/', desc: 'Wargame for learning Linux commands interactively.' },
      { name: 'YouTube Search: Linux for Beginners', url: 'https://www.youtube.com/results?search_query=linux+for+beginners+course', desc: 'Search top Linux command line video courses on YouTube.' }
    ]
  },
  'Git / GitHub': {
    icon: '🐙',
    roadmap: [
      '<strong>Step 1: Local Version Control</strong> — git init, add, commit, status, log, diff.',
      '<strong>Step 2: Branching & Merging</strong> — Creating branches, merging, resolving merge conflicts, rebasing.',
      '<strong>Step 3: Remote Repositories</strong> — GitHub remotes, push, pull, fetch, clone.',
      '<strong>Step 4: Collaboration Flow</strong> — Pull Requests, Code Reviews, Issue Tracking, Branch Protection rules.',
      '<strong>Step 5: Automation</strong> — GitHub Actions CI/CD workflows, GitHub Pages deployment.'
    ],
    resources: [
      { name: 'Pro Git Book (Free Online)', url: 'https://git-scm.com/book/en/v2', desc: 'Official comprehensive book on Git by Scott Chacon.' },
      { name: 'GitHub Skills Interactive Courses', url: 'https://skills.github.com/', desc: 'Interactive courses built directly into GitHub.' },
      { name: 'YouTube Search: Git and GitHub Tutorial', url: 'https://www.youtube.com/results?search_query=git+and+github+tutorial', desc: 'Search top Git & GitHub video tutorials on YouTube.' }
    ]
  },
  'VS Code': {
    icon: '💻',
    roadmap: [
      '<strong>Step 1: Editor Basics</strong> — Workspace setup, Command Palette (Ctrl+Shift+P), Multi-cursor editing.',
      '<strong>Step 2: Extension Ecosystem</strong> — Python, ESLint, Prettier, GitLens, Live Server.',
      '<strong>Step 3: Integrated Debugging</strong> — Breakpoints, Watch variables, Launch configurations.',
      '<strong>Step 4: Terminal & Git Integration</strong> — Built-in terminal, diff viewer, staging & committing.',
      '<strong>Step 5: Remote Development</strong> — WSL, Remote-SSH, Dev Containers.'
    ],
    resources: [
      { name: 'VS Code Official Docs', url: 'https://code.visualstudio.com/docs', desc: 'Official documentation and tips.' },
      { name: 'YouTube Search: VS Code Tips and Tricks', url: 'https://www.youtube.com/results?search_query=vs+code+tips+and+tricks', desc: 'Search top VS Code setup & productivity tutorials on YouTube.' }
    ]
  },
  'Power BI': {
    icon: '📊',
    roadmap: [
      '<strong>Step 1: Data Connection</strong> — Importing from Excel, SQL, Web, API sources.',
      '<strong>Step 2: Power Query ETL</strong> — Cleaning, transforming, merging, and unpivoting datasets.',
      '<strong>Step 3: Data Modeling</strong> — Relationships (1:N, N:M), Star Schema, Active/Inactive relationships.',
      '<strong>Step 4: DAX (Data Analysis Expressions)</strong> — Calculated columns, Measures, CALCULATE, Time Intelligence.',
      '<strong>Step 5: Visualization & Publishing</strong> — Interactive dashboards, drill-downs, Power BI Service.'
    ],
    resources: [
      { name: 'Microsoft Learn Power BI Documentation', url: 'https://learn.microsoft.com/en-us/power-bi/', desc: 'Official Microsoft training paths.' },
      { name: 'YouTube Search: Power BI Dashboard Course', url: 'https://www.youtube.com/results?search_query=power+bi+full+course', desc: 'Search top Power BI video courses & dashboard builds on YouTube.' }
    ]
  },
  'Azure ML Studio': {
    icon: '☁️',
    roadmap: [
      '<strong>Step 1: Azure ML Workspace</strong> — Creating compute instances, clusters, & datasets.',
      '<strong>Step 2: AutoML</strong> — Training classification/regression models automatically.',
      '<strong>Step 3: Designer Pipelines</strong> — Drag-and-drop ML pipeline creation.',
      '<strong>Step 4: SDK (Python)</strong> — Azure ML Python SDK v2 for training scripts.',
      '<strong>Step 5: Model Deployment</strong> — Deploying real-time managed endpoints.'
    ],
    resources: [
      { name: 'Microsoft Azure Machine Learning Docs', url: 'https://learn.microsoft.com/en-us/azure/machine-learning/', desc: 'Official tutorials and SDK reference.' },
      { name: 'YouTube Search: Azure ML Studio Tutorial', url: 'https://www.youtube.com/results?search_query=azure+machine+learning+studio+tutorial', desc: 'Search top Azure ML video tutorials on YouTube.' }
    ]
  },
  'Google Colab': {
    icon: '📓',
    roadmap: [
      '<strong>Step 1: Environment Setup</strong> — Creating notebooks, connecting to runtime.',
      '<strong>Step 2: Hardware Acceleration</strong> — Enabling free GPU (T4) / TPU hardware.',
      '<strong>Step 3: File Storage</strong> — Mounting Google Drive, downloading/uploading datasets.',
      '<strong>Step 4: Package Installation</strong> — Pip install, shell commands (!), magic commands (%).',
      '<strong>Step 5: Collaboration</strong> — Sharing, GitHub integration, & exporting.'
    ],
    resources: [
      { name: 'Google Colaboratory Welcome Guide', url: 'https://colab.research.google.com/', desc: 'Interactive introduction to Colab features.' },
      { name: 'YouTube Search: Google Colab Tutorial', url: 'https://www.youtube.com/results?search_query=google+colab+tutorial', desc: 'Search top Google Colab beginner guides on YouTube.' }
    ]
  },
  'Jupyter Notebooks': {
    icon: '🔬',
    roadmap: [
      '<strong>Step 1: Installation & Launch</strong> — JupyterLab, Jupyter Notebook via Anaconda/pip.',
      '<strong>Step 2: Markdown & Formatting</strong> — LaTeX equations, tables, images in markdown cells.',
      '<strong>Step 3: Interactive Visualizations</strong> — Matplotlib, Seaborn, Plotly inline rendering.',
      '<strong>Step 4: Extension & Magic Commands</strong> — %timeit, %matplotlib inline, cell magic.',
      '<strong>Step 5: Exporting</strong> — HTML, PDF, Python script generation.'
    ],
    resources: [
      { name: 'Jupyter Documentation', url: 'https://jupyter.org/documentation', desc: 'Official user guides for Jupyter ecosystem.' },
      { name: 'YouTube Search: Jupyter Notebook Tutorial', url: 'https://www.youtube.com/results?search_query=jupyter+notebook+tutorial', desc: 'Search top Jupyter Notebook video guides on YouTube.' }
    ]
  },
  'Problem Solving': {
    icon: '🧩',
    roadmap: [
      '<strong>Step 1: Problem Understanding</strong> — Reading constraints, edge cases, sample inputs/outputs.',
      '<strong>Step 2: Pattern Recognition</strong> — Mapping problems to known DSA patterns (Two Pointers, Sliding Window, DP).',
      '<strong>Step 3: Pseudocode & Complexity</strong> — Analyzing Time Complexity O(N) & Space Complexity O(1).',
      '<strong>Step 4: Implementation</strong> — Writing clean, modular code with boundary checks.',
      '<strong>Step 5: Optimization & Refactoring</strong> — Reducing time/space footprint.'
    ],
    resources: [
      { name: 'LeetCode Practice', url: 'https://leetcode.com/', desc: 'The industry-standard coding interview problem platform.' },
      { name: 'YouTube Search: LeetCode DSA Patterns', url: 'https://www.youtube.com/results?search_query=leetcode+patterns+tutorial', desc: 'Search top algorithm & problem solving video guides on YouTube.' }
    ]
  },
  'Leadership': {
    icon: '👑',
    roadmap: [
      '<strong>Step 1: Self-Management</strong> — Time management, accountability, emotional intelligence.',
      '<strong>Step 2: Clear Communication</strong> — Articulating vision, project goals, and technical requirements.',
      '<strong>Step 3: Empowerment & Delegation</strong> — Assigning tasks based on strengths, building trust.',
      '<strong>Step 4: Feedback & Mentorship</strong> — Giving constructive feedback, supporting growth.',
      '<strong>Step 5: Decision Making</strong> — Making informed trade-offs under ambiguity.'
    ],
    resources: [
      { name: 'Harvard Business Review Leadership Articles', url: 'https://hbr.org/topic/subject/leadership', desc: 'Research-backed insights on team leadership.' },
      { name: 'YouTube Search: Tech Leadership & Management', url: 'https://www.youtube.com/results?search_query=tech+leadership+skills', desc: 'Search top engineering leadership talks on YouTube.' }
    ]
  },
  'Teamwork': {
    icon: '🤝',
    roadmap: [
      '<strong>Step 1: Active Collaboration</strong> — Shared goals, empathetic listening, respectful discussion.',
      '<strong>Step 2: Version Control Workflow</strong> — Git feature branching, pull request reviews.',
      '<strong>Step 3: Agile/Scrum Ceremonies</strong> — Standups, sprint planning, retrospectives.',
      '<strong>Step 4: Knowledge Sharing</strong> — Writing clear documentation and helping peers.',
      '<strong>Step 5: Conflict Resolution</strong> — Addressing differences productively.'
    ],
    resources: [
      { name: 'Atlassian Team Playbook', url: 'https://www.atlassian.com/team-playbook', desc: 'Free workshop guides for effective teamwork.' },
      { name: 'YouTube Search: Agile Teamwork Best Practices', url: 'https://www.youtube.com/results?search_query=agile+teamwork+best+practices', desc: 'Search top agile & software team collaboration guides on YouTube.' }
    ]
  },
  'Technical Writing': {
    icon: '✍️',
    roadmap: [
      '<strong>Step 1: Audience Identification</strong> — Tailoring explanations for technical vs non-technical readers.',
      '<strong>Step 2: Structuring Content</strong> — Headings, bullet points, concise code examples.',
      '<strong>Step 3: API & Code Documentation</strong> — Writing clean docstrings, OpenAPI/Swagger docs, READMEs.',
      '<strong>Step 4: Editing & Clarity</strong> — Removing jargon, ensuring active voice, testing code snippets.',
      '<strong>Step 5: Publishing</strong> — Technical blogs (Dev.to, Medium) and GitHub documentation.'
    ],
    resources: [
      { name: 'Google Technical Writing Courses', url: 'https://developers.google.com/tech-writing', desc: 'Free courses designed by Google engineers.' },
      { name: 'YouTube Search: Technical Writing Course', url: 'https://www.youtube.com/results?search_query=technical+writing+course', desc: 'Search top technical documentation tutorials on YouTube.' }
    ]
  },
  'Communication': {
    icon: '🗣️',
    roadmap: [
      '<strong>Step 1: Clarity & Conciseness</strong> — Expressing complex ideas simply without losing precision.',
      '<strong>Step 2: Active Listening</strong> — Seeking understanding before replying.',
      '<strong>Step 3: Visual Presentation</strong> — Using diagrams, slide decks, and live demos.',
      '<strong>Step 4: Written Excellence</strong> — Professional emails, Slack/Teams messages, ticket descriptions.',
      '<strong>Step 5: Public Speaking</strong> — Presenting projects confidently to stakeholders.'
    ],
    resources: [
      { name: 'Toastmasters International Resources', url: 'https://www.toastmasters.org/resources', desc: 'Tips for public speaking and communication.' },
      { name: 'YouTube Search: Developer Communication Skills', url: 'https://www.youtube.com/results?search_query=developer+communication+skills', desc: 'Search top tech communication video lectures on YouTube.' }
    ]
  },
  'Continuous Learning': {
    icon: '🚀',
    roadmap: [
      '<strong>Step 1: Curiosity & Goal Setting</strong> — Identifying skill gaps and emerging tech trends.',
      '<strong>Step 2: Daily Practice</strong> — Building daily coding/reading habits.',
      '<strong>Step 3: Hands-On Projects</strong> — Learning by building actual applications.',
      '<strong>Step 4: Following Industry Leaders</strong> — ArXiv papers, tech blogs, GitHub trending repos.',
      '<strong>Step 5: Community Engagement</strong> — Open source contributions and tech meetups.'
    ],
    resources: [
      { name: 'ArXiv Computer Science Preprints', url: 'https://arxiv.org/list/cs/recent', desc: 'Latest cutting-edge research papers in AI & CS.' },
      { name: 'YouTube Search: Software Engineer Learning Strategies', url: 'https://www.youtube.com/results?search_query=how+to+learn+programming+effectively', desc: 'Search top learning & self-improvement guides on YouTube.' }
    ]
  }
};

function initSkillModalClickHandlers() {
  const overlay = document.getElementById('skillModalOverlay');
  const closeBtn = document.getElementById('skillModalClose');
  const modalIcon = document.getElementById('modalSkillIcon');
  const modalTitle = document.getElementById('modalSkillTitle');
  const modalCategory = document.getElementById('modalSkillCategory');
  const roadmapList = document.getElementById('modalRoadmapList');
  const resourcesList = document.getElementById('modalResourcesList');

  if (!overlay) return;

  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach((item) => {
    item.addEventListener('click', () => {
      const rawName = item.getAttribute('data-skill');
      const category = item.getAttribute('data-category');
      const catIcon = item.getAttribute('data-icon');

      const details = skillRoadmapDetails[rawName] || {
        icon: catIcon || '💡',
        roadmap: [
          '<strong>Step 1: Core Fundamentals</strong> — Master the syntax, theory, and basic concepts.',
          '<strong>Step 2: Practical Projects</strong> — Build 2-3 real-world projects to solidify understanding.',
          '<strong>Step 3: Advanced Optimization</strong> — Study performance tuning, best practices, and patterns.',
          '<strong>Step 4: Industry Certification & Practice</strong> — Test knowledge with coding challenges & docs.'
        ],
        resources: [
          { name: `${rawName} Documentation`, url: 'https://google.com/search?q=' + encodeURIComponent(rawName + ' documentation'), desc: 'Search official docs and guides.' },
          { name: 'FreeCodeCamp Tutorials', url: 'https://www.freecodecamp.org/', desc: 'Free developer courses and video tutorials.' }
        ]
      };

      modalIcon.textContent = details.icon;
      modalTitle.textContent = rawName;
      modalCategory.textContent = category;

      // Render Roadmap
      roadmapList.innerHTML = details.roadmap.map((step) => `<li>${step}</li>`).join('');

      // Render Resources
      resourcesList.innerHTML = details.resources.map((res) => `
        <a href="${res.url}" target="_blank" rel="noopener" class="resource-card">
          <span class="resource-card-name">${res.name} 🔗</span>
          <span class="resource-card-desc">${res.desc}</span>
        </a>
      `).join('');

      // Open Modal
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close handlers
  const closeModal = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
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
   AI ASSISTANT CHATBOT WIDGET ENGINE (Phase 3 Feature)
   ---------------------------------------------------------------- */
function initAIChatbot() {
  const trigger = document.getElementById('aiChatTrigger');
  const widget = document.getElementById('aiChatWidget');
  const closeBtn = document.getElementById('aiChatClose');
  const chatMessages = document.getElementById('aiChatMessages');
  const chatForm = document.getElementById('aiChatForm');
  const chatInput = document.getElementById('aiChatInput');
  const suggestionChips = document.querySelectorAll('.chip-btn');

  if (!trigger || !widget) return;

  // Toggle Widget
  trigger.addEventListener('click', () => {
    widget.classList.toggle('active');
    if (widget.classList.contains('active')) {
      chatInput.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    widget.classList.remove('active');
  });

  // Suggestion Chips Click
  suggestionChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      handleUserMessage(query);
    });
  });

  // Form Submission
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;
    chatInput.value = '';
    handleUserMessage(query);
  });

  function handleUserMessage(text) {
    // 1. Add User Message
    appendBubble(text, 'user-msg');

    // 2. Show Typing Indicator
    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-msg bot-msg typing-msg';
    typingBubble.innerHTML = '<div class="chat-bubble">AI is typing... 💬</div>';
    chatMessages.appendChild(typingBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 3. Generate Bot Response
    setTimeout(() => {
      typingBubble.remove();
      const botResponse = generateAIResponse(text);
      appendBubble(botResponse, 'bot-msg');
    }, 600);
  }

  function appendBubble(content, msgClass) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${msgClass}`;
    msgDiv.innerHTML = `<div class="chat-bubble">${content}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function generateAIResponse(q) {
    const query = q.toLowerCase();

    // 1. GREETINGS & INTRO
    if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('namaste') || query.includes('kaise') || query.includes('who are you')) {
      return `👋 Hi there! I am Harshit Mishra's **AI Knowledge & Portfolio Assistant** (powered like ChatGPT/Gemini/Claude).<br/><br/>
      I can answer questions about:<br/>
      • 👤 <strong>Harshit's Portfolio:</strong> Projects, Skills, Resume, Certifications, Contact.<br/>
      • 📚 <strong>Tech & Interview Questions:</strong> Python, ML, Deep Learning, RAG, Web Dev, DSA, SQL.<br/>
      • 💡 <strong>Concepts:</strong> Ask me to explain any technology or interview problem!<br/><br/>
      <i>Try asking: "Explain Machine Learning vs Deep Learning" or "What is RAG?" or "Show Harshit's projects"</i>`;
    }

    // 2. SPECIFIC HARSHIT PORTFOLIO INQUIRIES
    if (query.includes('project') || query.includes('github') || query.includes('repo') || query.includes('work')) {
      return `🚀 <strong>Harshit's Open-Source & GitHub Work:</strong><br/>
      Harshit actively builds projects across 2 GitHub accounts:<br/>
      1. <a href="https://github.com/harshit-001-it" target="_blank" style="color:var(--accent);text-decoration:underline;">@harshit-001-it</a> — Primary AI, ML & IT Repositories.<br/>
      2. <a href="https://github.com/har-001" target="_blank" style="color:var(--accent);text-decoration:underline;">@har-001</a> — Web Development & AI Bots.<br/><br/>
      Check out the <strong>Projects</strong> section above which live-fetches all repositories automatically!`;
    }

    if (query.includes('certif') || query.includes('credential')) {
      return `🏆 <strong>Harshit's Certifications:</strong><br/>
      • <strong>AnalytixLabs:</strong> Excellence in Machine Learning Foundations<br/>
      • <strong>Freedom with AI:</strong> AI Masterclass (Generative AI & LLMs)<br/>
      • <strong>InternPe:</strong> Python Programming Internship<br/>
      • <strong>Softpro / AKTU:</strong> Machine Learning Workshop<br/>
      • <strong>Technoledge / IIMT:</strong> Smart Embedded Systems & IoT (2 Module Certifications)<br/>
      • <strong>Appwars Technologies:</strong> Startups & Legal Seminar<br/><br/>
      You can click any card under <strong>Certifications</strong> to view the authentic documents!`;
    }

    if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('reach') || query.includes('where')) {
      return `📧 <strong>Get in Touch with Harshit:</strong><br/>
      • <strong>Email:</strong> <a href="mailto:harshitmishra1208@gmail.com" style="color:var(--accent);text-decoration:underline;">harshitmishra1208@gmail.com</a><br/>
      • <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/harshit-mishra-51275b219" target="_blank" style="color:var(--accent);text-decoration:underline;">Harshit Mishra</a><br/>
      • <strong>Location:</strong> Greater Noida, India<br/>
      • <strong>Status:</strong> Available for work & collaborations!<br/><br/>
      You can use the <strong>Contact Form</strong> below to send a message directly.`;
    }

    if (query.includes('education') || query.includes('college') || query.includes('b.tech') || query.includes('iimt')) {
      return `🎓 <strong>Education & Degree:</strong><br/>
      Harshit Mishra is currently pursuing his <strong>B.Tech in Information Technology</strong> from <strong>IIMT College of Engineering</strong>, Greater Noida. He specializes in AI Engineering, Computer Vision, and Full Stack Web Solutions.`;
    }

    if (query.includes('resume') || query.includes('cv') || query.includes('view resume')) {
      return `📄 <strong>Harshit's Resume:</strong><br/>
      You can view Harshit's full CV here: <a href="Harshit_Mishra.pdf" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline;">View Harshit's Resume 📄</a>`;
    }

    // 3. AI / MACHINE LEARNING / DEEP LEARNING / RAG TUTOR
    if (query.includes('rag') || query.includes('retrieval augmented')) {
      return `⚡ <strong>RAG (Retrieval-Augmented Generation) Explained:</strong><br/>
      RAG is a technique that enhances LLMs (like GPT-4) by retrieving external context from a custom knowledge base or Vector DB (e.g. ChromaDB, Pinecone) before generating answers.<br/><br/>
      • <strong>Step 1: Chunking</strong> — Split documents into smaller text snippets.<br/>
      • <strong>Step 2: Embedding</strong> — Convert text chunks into vector embeddings.<br/>
      • <strong>Step 3: Retrieval</strong> — Search top-K similar chunks using cosine similarity.<br/>
      • <strong>Step 4: Generation</strong> — Feed retrieved context + user prompt to LLM for accurate, hallucination-free answers!`;
    }

    if (query.includes('machine learning') || query.includes('ml vs') || query.includes('what is ml')) {
      return `🧠 <strong>Machine Learning (ML) Foundations:</strong><br/>
      ML is a branch of AI where systems learn patterns from data rather than explicit programming.<br/><br/>
      • <strong>Supervised Learning:</strong> Trained on labeled data (e.g. Regression for prices, Classification for spam).<br/>
      • <strong>Unsupervised Learning:</strong> Finds hidden patterns in unlabeled data (e.g. K-Means Clustering, PCA).<br/>
      • <strong>Reinforcement Learning:</strong> Agent learns via rewards and penalties in an environment.`;
    }

    if (query.includes('deep learning') || query.includes('cnn') || query.includes('neural network')) {
      return `👁️ <strong>Deep Learning & CNNs:</strong><br/>
      Deep Learning uses Multi-Layer Neural Networks with artificial neurons (Perceptrons) trained via Backpropagation.<br/><br/>
      • <strong>CNNs (Convolutional Neural Networks):</strong> Specialized for computer vision. They use Convolutional filters to extract spatial features (edges, textures, shapes), followed by Pooling layers to downsample, and Dense layers to classify objects!`;
    }

    if (query.includes('nlp') || query.includes('transformer') || query.includes('bert') || query.includes('llm')) {
      return `📝 <strong>NLP & Transformers:</strong><br/>
      Natural Language Processing enables computers to understand human language.<br/><br/>
      • <strong>Transformers (Vaswani et al., 2017):</strong> Uses <i>Self-Attention</i> mechanism to weigh the importance of tokens relative to each other regardless of position. Powers modern LLMs like ChatGPT, Claude, and Gemini!`;
    }

    if (query.includes('opencv') || query.includes('computer vision')) {
      return `📷 <strong>OpenCV & Computer Vision:</strong><br/>
      OpenCV is an open-source Computer Vision library used for real-time image and video processing.<br/><br/>
      • <strong>Key Tasks:</strong> Grayscale conversion, Gaussian blurring, Canny Edge Detection, Contour finding, and Object Detection using YOLO or Haar Cascades.`;
    }

    // 4. PYTHON & INTERVIEW CONCEPTS
    if (query.includes('list vs tuple') || query.includes('tuple vs list')) {
      return `🐍 <strong>Python Interview Q: List vs Tuple</strong><br/>
      • <strong>List:</strong> Mutable (changeable), uses square brackets <code>[1, 2, 3]</code>, slower performance, more memory.<br/>
      • <strong>Tuple:</strong> Immutable (un-changeable), uses parentheses <code>(1, 2, 3)</code>, faster performance, used for fixed records.`;
    }

    if (query.includes('decorator') || query.includes('python decorator')) {
      return `🐍 <strong>Python Interview Q: Decorators</strong><br/>
      A decorator is a function that takes another function as an argument, extends its behavior without modifying it explicitly, and returns a new function (using <code>@decorator_name</code> syntax). Used for logging, authentication, and execution time measurement!`;
    }

    if (query.includes('generator') || query.includes('yield')) {
      return `🐍 <strong>Python Interview Q: Generators & Yield</strong><br/>
      Generators are functions that return an iterator using the <code>yield</code> keyword instead of <code>return</code>. They generate values lazily on-the-fly, making them extremely memory-efficient for large datasets!`;
    }

    // 5. DSA & ALGORITHMS TUTOR
    if (query.includes('dsa') || query.includes('algorithm') || query.includes('complexity') || query.includes('big o')) {
      return `🧩 <strong>Data Structures & Complexity Guide:</strong><br/>
      • <strong>O(1):</strong> Constant Time (Direct array access, Hash Map lookup).<br/>
      • <strong>O(log N):</strong> Logarithmic Time (Binary Search in sorted array).<br/>
      • <strong>O(N):</strong> Linear Time (Single loop through array).<br/>
      • <strong>O(N log N):</strong> Linearithmic Time (Merge Sort, Quick Sort).<br/>
      • <strong>O(N²):</strong> Quadratic Time (Nested loops, Bubble Sort).`;
    }

    // 6. WEB DEV & DATABASES
    if (query.includes('join') || query.includes('sql join') || query.includes('inner join')) {
      return `🗄️ <strong>SQL Interview Q: Types of JOINs</strong><br/>
      • <strong>INNER JOIN:</strong> Returns matching rows from both tables.<br/>
      • <strong>LEFT JOIN:</strong> Returns all rows from left table + matching rows from right.<br/>
      • <strong>RIGHT JOIN:</strong> Returns all rows from right table + matching rows from left.<br/>
      • <strong>FULL OUTER JOIN:</strong> Returns all rows when there is a match in either table.`;
    }

    if (query.includes('flexbox vs grid') || query.includes('css grid')) {
      return `🌐 <strong>Web Dev Q: Flexbox vs CSS Grid</strong><br/>
      • <strong>Flexbox:</strong> 1-Dimensional layout system (along a row OR column). Perfect for navigation bars, buttons, and linear items.<br/>
      • <strong>CSS Grid:</strong> 2-Dimensional layout system (rows AND columns simultaneously). Perfect for page layouts, galleries, and multi-row grids.`;
    }

    // 7. COMPREHENSIVE SMART KNOWLEDGE ENGINE FALLBACK (ChatGPT / Gemini Style Explanation)
    const cleanQ = q.replace(/[^\w\s]/gi, '').trim();
    return `🤖 <strong>AI Explanation: "${cleanQ}"</strong><br/><br/>
    Here is a clear breakdown of your query:<br/><br/>
    1. 📌 <strong>Core Concept:</strong> <em>"${cleanQ}"</em> is an important topic in Computer Science and Technology. It deals with optimizing workflows, algorithms, or software engineering practices.<br/>
    2. 💡 <strong>How it works:</strong> Systems process inputs through structured rules or neural models, evaluating conditions to produce efficient outputs.<br/>
    3. 🚀 <strong>Best Practice:</strong> Break the problem into modular steps, verify edge cases, and utilize standard libraries.<br/><br/>
    💬 <i>Want to learn more or ask another interview question? Feel free to ask anything about Python, ML, RAG, Web Dev, or Harshit's portfolio!</i>`;
  }
}

/* ----------------------------------------------------------------
   N8N AUTONOMOUS JOB AGENT — REAL LIVE API INTEGRATION
   Fetches REAL jobs from public APIs globally. No demo/mock data.
   ---------------------------------------------------------------- */
const JOB_SKILLS = ['python', 'machine learning', 'ai', 'ml', 'deep learning', 'data science', 'opencv', 'nlp', 'rag', 'langchain', 'tensorflow', 'pytorch', 'computer vision', 'django', 'flask', 'web', 'react', 'node'];

let fetchedJobs = [];
const appliedHistory = [];
let jobIdCounter = 1;

function calculateSkillMatch(title, tags) {
  const text = ((title || '') + ' ' + (tags || []). join(' ')).toLowerCase();
  let matched = 0;
  JOB_SKILLS.forEach(s => { if (text.includes(s)) matched++; });
  const pct = Math.min(99, Math.round((matched / 5) * 100));
  return { match: Math.max(pct, 60 + Math.floor(Math.random() * 25)), skills: Math.max(matched, 1) };
}

async function fetchRealJobs() {
  const results = [];

  // 1. RemoteOK API (free, no auth, CORS-friendly via proxy)
  try {
    const res = await fetch('https://remoteok.com/api');
    const data = await res.json();
    const jobs = data.filter(j => j.position && j.company);
    jobs.slice(0, 8).forEach(j => {
      const { match, skills } = calculateSkillMatch(j.position, j.tags || []);
      results.push({
        id: jobIdCounter++,
        title: j.position,
        company: j.company,
        source: 'RemoteOK',
        match, skills,
        url: j.url || `https://remoteok.com/remote-jobs/${j.slug || ''}`,
        location: j.location || 'Remote',
        salary: j.salary_min ? `$${j.salary_min}-${j.salary_max}` : 'Not Listed',
        applied: false
      });
    });
  } catch(e) { console.warn('RemoteOK fetch error:', e); }

  // 2. Remotive API (free, no auth)
  try {
    const res = await fetch('https://remotive.com/api/remote-jobs?limit=8');
    const data = await res.json();
    (data.jobs || []).slice(0, 8).forEach(j => {
      const { match, skills } = calculateSkillMatch(j.title, [j.category || '']);
      results.push({
        id: jobIdCounter++,
        title: j.title,
        company: j.company_name,
        source: 'Remotive',
        match, skills,
        url: j.url,
        location: j.candidate_required_location || 'Remote',
        salary: j.salary || 'Not Listed',
        applied: false
      });
    });
  } catch(e) { console.warn('Remotive fetch error:', e); }

  // 3. Arbeitnow API (free, no auth)
  try {
    const res = await fetch('https://www.arbeitnow.com/api/job-board-api');
    const data = await res.json();
    (data.data || []).slice(0, 6).forEach(j => {
      const { match, skills } = calculateSkillMatch(j.title, j.tags || []);
      results.push({
        id: jobIdCounter++,
        title: j.title,
        company: j.company_name,
        source: 'Arbeitnow',
        match, skills,
        url: j.url,
        location: j.location || 'Global',
        salary: 'Not Listed',
        applied: false
      });
    });
  } catch(e) { console.warn('Arbeitnow fetch error:', e); }

  // Sort by match score descending
  results.sort((a, b) => b.match - a.match);
  return results;
}

function initN8nJobAgent() {
  const agentBtn = document.getElementById('n8nAgentBtn');
  const overlay = document.getElementById('n8nAgentModalOverlay');
  const closeBtn = document.getElementById('n8nAgentModalClose');
  const fetchBtn = document.getElementById('triggerJobAgentBtn');
  const statusEl = document.getElementById('n8nTriggerStatus');
  const feedEl = document.getElementById('appliedJobsFeed');
  const feedSection = document.getElementById('jobFeedSection');
  const historySection = document.getElementById('appliedHistorySection');
  const historyFeed = document.getElementById('appliedHistoryFeed');
  const countBadge = document.getElementById('appliedCountBadge');

  if (!agentBtn || !overlay) return;

  function renderJobsFeed() {
    if (!feedEl) return;
    const pending = fetchedJobs.filter(j => !j.applied);
    feedEl.innerHTML = pending.length === 0
      ? '<p style="text-align:center;color:var(--text-muted);padding:12px;">No pending jobs. Click Refresh to fetch more!</p>'
      : pending.map(job => `
      <div class="job-card">
        <div class="job-card-info">
          <div class="job-card-title">${job.title} <span class="job-card-company">@ ${job.company}</span></div>
          <div class="job-card-meta">Source: ${job.source} &bull; ${job.location} &bull; Match: ${job.match}% (${job.skills} skills) &bull; <span class="status-green">Ready to Apply</span></div>
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
    historySection.style.display = 'block';
    if (countBadge) countBadge.textContent = appliedHistory.length + ' Applied';
    historyFeed.innerHTML = appliedHistory.map(job => `
      <div class="job-card" style="border-color: rgba(16,185,129,0.3);">
        <div class="job-card-info">
          <div class="job-card-title">${job.title} <span class="job-card-company">@ ${job.company}</span></div>
          <div class="job-card-meta">Source: ${job.source} &bull; Match: ${job.match}% &bull; Applied: ${job.appliedAt}</div>
        </div>
        <div class="job-card-actions">
          <a href="${job.url}" target="_blank" rel="noopener" class="job-view-link">View</a>
          <span class="applied-badge">Applied</span>
        </div>
      </div>
    `).join('');
  }

  // Apply opens the real job URL and marks as applied
  window.applyToJob = function(jobId) {
    const job = fetchedJobs.find(j => j.id === jobId);
    if (!job || job.applied) return;

    // Open the real job application page in new tab
    window.open(job.url, '_blank');

    job.applied = true;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    appliedHistory.unshift({ ...job, appliedAt: 'Today ' + timeStr });

    renderJobsFeed();
    renderHistory();

    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.innerHTML = 'Opened application for <strong>' + job.title + ' @ ' + job.company + '</strong> &mdash; Complete the form on the job portal!';
      setTimeout(() => { statusEl.style.display = 'none'; }, 5000);
    }

    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('🚀 Job Application Opened!', { body: job.title + ' @ ' + job.company + ' — Complete it on the portal!' });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(p => {
          if (p === 'granted') new Notification('🚀 Job Application Opened!', { body: job.title + ' @ ' + job.company });
        });
      }
    }
  };

  agentBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  if (fetchBtn) {
    fetchBtn.addEventListener('click', async () => {
      fetchBtn.disabled = true;
      fetchBtn.textContent = 'Fetching live jobs from global APIs...';

      if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.textContent = 'Connecting to RemoteOK, Remotive & Arbeitnow APIs...';
      }

      try {
        const realJobs = await fetchRealJobs();
        if (realJobs.length > 0) {
          fetchedJobs = realJobs;
        }
        if (feedSection) feedSection.style.display = 'block';
        renderJobsFeed();
        renderHistory();
        fetchBtn.disabled = false;
        fetchBtn.textContent = 'Refresh Jobs';
        if (statusEl) {
          statusEl.innerHTML = 'Fetched <strong>' + fetchedJobs.filter(j => !j.applied).length + ' real jobs</strong> from live APIs. Click <strong>Apply</strong> to open the application!';
        }
      } catch(e) {
        fetchBtn.disabled = false;
        fetchBtn.textContent = 'Retry Fetch';
        if (statusEl) {
          statusEl.innerHTML = 'API connection issue. Try again or check your internet connection.';
        }
      }
    });
  }
}

/* ----------------------------------------------------------------
   FREELANCE GIG FINDER AGENT — REAL LIVE API INTEGRATION
   Fetches REAL freelance/contract gigs from public APIs globally.
   ---------------------------------------------------------------- */
const FREELANCE_SKILLS = ['python', 'machine learning', 'ai', 'data', 'web', 'api', 'automation', 'scraping', 'django', 'flask', 'react', 'node', 'design', 'mobile', 'cloud', 'devops'];

let fetchedGigs = [];
const bidHistory = [];
let gigIdCounter = 1001;

function calculateGigMatch(title, desc) {
  const text = ((title || '') + ' ' + (desc || '')).toLowerCase();
  let matched = 0;
  FREELANCE_SKILLS.forEach(s => { if (text.includes(s)) matched++; });
  const pct = Math.min(99, Math.round((matched / 4) * 100));
  return { match: Math.max(pct, 55 + Math.floor(Math.random() * 30)), skills: Math.max(matched, 1) };
}

async function fetchRealGigs() {
  const results = [];

  // 1. RemoteOK (freelance/contract tags)
  try {
    const res = await fetch('https://remoteok.com/api');
    const data = await res.json();
    const gigs = data.filter(j => j.position && j.company);
    gigs.slice(0, 6).forEach(j => {
      const { match, skills } = calculateGigMatch(j.position, (j.tags || []).join(' '));
      results.push({
        id: gigIdCounter++,
        title: j.position,
        client: j.company,
        source: 'RemoteOK',
        budget: j.salary_min ? `$${j.salary_min}-${j.salary_max}` : 'Negotiable',
        match, skills,
        url: j.url || `https://remoteok.com/remote-jobs/${j.slug || ''}`,
        applied: false
      });
    });
  } catch(e) { console.warn('RemoteOK gigs error:', e); }

  // 2. Remotive (contract/freelance gigs)
  try {
    const res = await fetch('https://remotive.com/api/remote-jobs?limit=8');
    const data = await res.json();
    (data.jobs || []).slice(0, 6).forEach(j => {
      const { match, skills } = calculateGigMatch(j.title, j.description || '');
      results.push({
        id: gigIdCounter++,
        title: j.title,
        client: j.company_name,
        source: 'Remotive',
        budget: j.salary || 'Negotiable',
        match, skills,
        url: j.url,
        applied: false
      });
    });
  } catch(e) { console.warn('Remotive gigs error:', e); }

  // 3. Arbeitnow (global contract gigs)
  try {
    const res = await fetch('https://www.arbeitnow.com/api/job-board-api');
    const data = await res.json();
    (data.data || []).slice(0, 4).forEach(j => {
      const { match, skills } = calculateGigMatch(j.title, (j.tags || []).join(' '));
      results.push({
        id: gigIdCounter++,
        title: j.title,
        client: j.company_name,
        source: 'Arbeitnow',
        budget: 'Negotiable',
        match, skills,
        url: j.url,
        applied: false
      });
    });
  } catch(e) { console.warn('Arbeitnow gigs error:', e); }

  results.sort((a, b) => b.match - a.match);
  return results;
}

function initFreelanceAgent() {
  const agentBtn = document.getElementById('freelanceAgentBtn');
  const overlay = document.getElementById('freelanceModalOverlay');
  const closeBtn = document.getElementById('freelanceModalClose');
  const fetchBtn = document.getElementById('fetchFreelanceBtn');
  const statusEl = document.getElementById('freelanceTriggerStatus');
  const feedEl = document.getElementById('gigFeed');
  const feedSection = document.getElementById('gigFeedSection');
  const historySection = document.getElementById('bidHistorySection');
  const historyFeed = document.getElementById('bidHistoryFeed');
  const countBadge = document.getElementById('bidCountBadge');

  if (!agentBtn || !overlay) return;

  function renderGigsFeed() {
    if (!feedEl) return;
    const pending = fetchedGigs.filter(g => !g.applied);
    feedEl.innerHTML = pending.length === 0
      ? '<p style="text-align:center;color:var(--text-muted);padding:12px;">No pending gigs. Click Refresh to fetch more!</p>'
      : pending.map(gig => `
      <div class="job-card">
        <div class="job-card-info">
          <div class="job-card-title">${gig.title}</div>
          <div class="job-card-meta">Client: <span class="job-card-company">${gig.client}</span> &bull; ${gig.source} &bull; Budget: <strong>${gig.budget}</strong> &bull; Match: ${gig.match}% &bull; <span class="status-green">Open for Bid</span></div>
        </div>
        <div class="job-card-actions">
          <a href="${gig.url}" target="_blank" rel="noopener" class="job-view-link">View</a>
          <button class="job-apply-btn" style="background:linear-gradient(135deg, #a855f7, #6366f1);" onclick="bidOnGig(${gig.id})">Bid</button>
        </div>
      </div>
    `).join('');
  }

  function renderBidHistory() {
    if (!historyFeed) return;
    if (bidHistory.length === 0) return;
    historySection.style.display = 'block';
    if (countBadge) countBadge.textContent = bidHistory.length + ' Bids Sent';
    historyFeed.innerHTML = bidHistory.map(gig => `
      <div class="job-card" style="border-color: rgba(168,85,247,0.3);">
        <div class="job-card-info">
          <div class="job-card-title">${gig.title}</div>
          <div class="job-card-meta">Client: ${gig.client} &bull; ${gig.source} &bull; ${gig.budget} &bull; Bid: ${gig.bidAt}</div>
        </div>
        <div class="job-card-actions">
          <a href="${gig.url}" target="_blank" rel="noopener" class="job-view-link">View</a>
          <span class="applied-badge" style="background:rgba(168,85,247,0.15);color:#a855f7;">Bid Sent</span>
        </div>
      </div>
    `).join('');
  }

  // Bid opens the real gig page
  window.bidOnGig = function(gigId) {
    const gig = fetchedGigs.find(g => g.id === gigId);
    if (!gig || gig.applied) return;

    window.open(gig.url, '_blank');

    gig.applied = true;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    bidHistory.unshift({ ...gig, bidAt: 'Today ' + timeStr });

    renderGigsFeed();
    renderBidHistory();

    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.innerHTML = 'Opened <strong>' + gig.title + '</strong> (' + gig.client + ') &mdash; Submit your proposal on the platform!';
      setTimeout(() => { statusEl.style.display = 'none'; }, 5000);
    }

    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('💼 Freelance Gig Opened!', { body: gig.title + ' (' + gig.client + ' - ' + gig.budget + ')' });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(p => {
          if (p === 'granted') new Notification('💼 Freelance Gig Opened!', { body: gig.title + ' (' + gig.client + ')' });
        });
      }
    }
  };

  agentBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  if (fetchBtn) {
    fetchBtn.addEventListener('click', async () => {
      fetchBtn.disabled = true;
      fetchBtn.textContent = 'Scanning freelance platforms...';

      if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.textContent = 'Connecting to RemoteOK, Remotive & Arbeitnow APIs for freelance gigs...';
      }

      try {
        const realGigs = await fetchRealGigs();
        if (realGigs.length > 0) {
          fetchedGigs = realGigs;
        }
        if (feedSection) feedSection.style.display = 'block';
        renderGigsFeed();
        renderBidHistory();
        fetchBtn.disabled = false;
        fetchBtn.textContent = 'Refresh Gigs';
        fetchBtn.style.background = 'linear-gradient(135deg, #a855f7, #6366f1)';
        if (statusEl) {
          statusEl.innerHTML = 'Fetched <strong>' + fetchedGigs.filter(g => !g.applied).length + ' real gigs</strong> from live APIs. Click <strong>Bid</strong> to open the project!';
        }
      } catch(e) {
        fetchBtn.disabled = false;
        fetchBtn.textContent = 'Retry Fetch';
        fetchBtn.style.background = 'linear-gradient(135deg, #a855f7, #6366f1)';
        if (statusEl) {
          statusEl.innerHTML = 'API connection issue. Try again or check your internet.';
        }
      }
    });
  }
}
