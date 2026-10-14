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
  init3DTilt();
  initRevealAnimations();
  initCounters();
  renderSkills();
  fetchAndRenderProjects();
  renderCertificates();
  initContactForm();
  initBackToTop();
  initSkillBarAnimations();
  initGitHubDropdown();
  init3DCardPhysics();
});

/* ----------------------------------------------------------------
   SCROLL PROGRESS BAR
   ---------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
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
  if (!navbar) return;
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
  if (!toggle) return;
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
  if (!hamburger || !mobileMenu) return;
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
  if (!element) return;
  const phrases = [
    'Data Analytics',
    'AI Enthusiast',
    'Machine Learning Models',
    'Python Development',
    'Intelligent Systems',
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
   3D INTERACTIVE TILT & PARALLAX ENGINE
   Adds dynamic 3D perspective tilt & glare reflection to cards
   ---------------------------------------------------------------- */
function init3DTilt() {
  const tiltSelectors = [
    '.action-card',
    '.experience-card',
    '.about-image-frame',
    '.about-float-card',
    '.stat-item',
    '.skill-card',
    '.project-card',
    '.cert-card'
  ];

  const cards = document.querySelectorAll(tiltSelectors.join(', '));

  cards.forEach(card => {
    if (!card.querySelector('.card-glare-overlay')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare-overlay';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const maxTilt = card.classList.contains('about-image-frame') ? 10 : 14;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width * 100).toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height * 100).toFixed(1)}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.08s ease-out, box-shadow 0.2s ease';
    });
  });
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
   SKILLS DATA & RENDERING (Evidence-Grounded Competencies)
   ---------------------------------------------------------------- */
const skillsData = [
  {
    title: 'Data Science & Machine Learning',
    icon: '🧠',
    skills: [
      { name: 'ML (Machine Learning)', tier: 'Core Specialization' },
      { name: 'Deep Learning (CNN)', tier: 'Neural Networks' },
      { name: 'NLP (Text Analysis)', tier: 'NLP & Transformers' },
      { name: 'OpenCV', tier: 'Computer Vision' },
      { name: 'Predictive Modeling', tier: 'Scikit-Learn' },
      { name: 'Data Manipulation', tier: 'Pandas & NumPy' },
    ],
  },
  {
    title: 'Core Languages & Engineering',
    icon: '⚙️',
    skills: [
      { name: 'Python', tier: 'Primary Language' },
      { name: 'C++ / Java', tier: 'Object-Oriented' },
      { name: 'MySQL / Database', tier: 'Relational DB' },
      { name: 'Modern Web Dev', tier: 'HTML5 • CSS3 • JS' },
      { name: 'REST & Webhooks', tier: 'API Integration' },
      { name: 'Linux (OS)', tier: 'Systems & Shell' },
    ],
  },
  {
    title: 'Platforms & Developer Ecosystem',
    icon: '🛠️',
    skills: [
      { name: 'Git / GitHub', tier: 'Version Control' },
      { name: 'VS Code', tier: 'Development IDE' },
      { name: 'Jupyter Notebooks', tier: 'Interactive Data Lab' },
      { name: 'Google Colab', tier: 'Cloud GPU Runtime' },
      { name: 'Power BI', tier: 'Business Analytics' },
      { name: 'Vercel Deployment', tier: 'CI/CD & Hosting' },
    ],
  },
  {
    title: 'Analytical & Professional Strengths',
    icon: '💡',
    skills: [
      { name: 'Problem Solving', tier: 'Algorithmic Thinking' },
      { name: 'Model Evaluation', tier: 'Accuracy & ROC/AUC' },
      { name: 'Data Cleaning & EDA', tier: 'Exploratory Analytics' },
      { name: 'Technical Writing', tier: 'Documentation & Specs' },
      { name: 'Continuous Learning', tier: 'Fast Tech Adoption' },
      { name: 'Team Collaboration', tier: 'Agile Git Workflows' },
    ],
  },
];

function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  grid.innerHTML = skillsData.map((cat, catIdx) => `
    <div class="skill-category reveal reveal-delay-${Math.min(catIdx + 1, 4)}">
      <div class="skill-category-header">
        <div class="skill-category-icon">${cat.icon}</div>
        <h3 class="skill-category-title">${cat.title}</h3>
      </div>
      <div class="skill-capsules-grid">
        ${cat.skills.map((s) => `
          <div class="skill-capsule" data-skill="${s.name}" data-category="${cat.title}" data-icon="${cat.icon}" title="Click to view roadmap & resources">
            <div class="capsule-header">
              <span class="capsule-dot"></span>
              <span class="capsule-name">${s.name}</span>
            </div>
            <div class="capsule-footer">
              <span class="capsule-tier">${s.tier}</span>
              <span class="capsule-arrow">↗</span>
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
  const capsules = document.querySelectorAll('.skill-capsule');
  capsules.forEach((cap, i) => {
    cap.style.transitionDelay = `${(i % 6) * 0.04}s`;
  });
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

const verifiedFallbackProjects = [
  {
    id: 'har-001/vedora-ai',
    title: 'Trading Bot (VedoraAI Multi-Agent)',
    description: 'Autonomous multi-agent algorithmic trading engine featuring Smart Money Concepts (SMC), real-time order blocks, and debate synthesis.',
    language: 'Python',
    stars: 1,
    forks: 0,
    githubUrl: 'https://github.com/har-001',
    liveUrl: null,
    topics: ['python', 'trading', 'smc', 'ai-agents'],
    owner: 'har-001',
    updatedAt: '2026-10-10T12:00:00Z'
  },
  {
    id: 'harshit-001-it/emotion-recognition',
    title: 'Human Emotion Recognition System',
    description: 'Real-time facial expression analysis and emotion recognition engine built with OpenCV and deep convolutional neural networks.',
    language: 'Python',
    stars: 0,
    forks: 0,
    githubUrl: 'https://github.com/harshit-001-it',
    liveUrl: null,
    topics: ['opencv', 'computer-vision', 'deep-learning', 'python'],
    owner: 'harshit-001-it',
    updatedAt: '2026-09-15T12:00:00Z'
  },
  {
    id: 'harshit-001-it/diabetes-prediction',
    title: 'Diabetes Prediction Analytics',
    description: 'Machine learning clinical analytics platform evaluating healthcare indicators to predict diabetes risk using Scikit-Learn.',
    language: 'Python',
    stars: 0,
    forks: 0,
    githubUrl: 'https://github.com/harshit-001-it',
    liveUrl: null,
    topics: ['machine-learning', 'scikit-learn', 'healthcare', 'eda'],
    owner: 'harshit-001-it',
    updatedAt: '2026-08-20T12:00:00Z'
  },
  {
    id: 'harshit-001-it/sonar-rock-mine',
    title: 'Sonar Rock vs Mine Detector',
    description: 'Binary signal classification model analyzing sonar frequencies to distinguish underwater rock surfaces from metallic mines.',
    language: 'Python',
    stars: 0,
    forks: 0,
    githubUrl: 'https://github.com/harshit-001-it',
    liveUrl: null,
    topics: ['signal-processing', 'classification', 'numpy', 'scipy'],
    owner: 'harshit-001-it',
    updatedAt: '2026-07-10T12:00:00Z'
  },
  {
    id: 'har-001/Personal-Portfolio-Website',
    title: 'Personal Portfolio Website',
    description: 'High-performance, 3D interactive portfolio website featuring titanium materials, glassmorphism, and responsive Apple-inspired UX.',
    language: 'JavaScript',
    stars: 1,
    forks: 0,
    githubUrl: 'https://github.com/har-001/Personal-Portfolio-Website',
    liveUrl: 'https://advance-portfolio-umber.vercel.app/',
    topics: ['3d-design', 'vanilla-js', 'css3', 'apple-design'],
    owner: 'har-001',
    updatedAt: '2026-10-14T12:00:00Z'
  },
  {
    id: 'harshit-001-it/library-management',
    title: 'Library Management System',
    description: 'Database management software engineered with Python and MySQL for student issuance tracking, cataloging, and inventory.',
    language: 'Python',
    stars: 0,
    forks: 0,
    githubUrl: 'https://github.com/harshit-001-it',
    liveUrl: null,
    topics: ['python', 'mysql', 'database-design'],
    owner: 'harshit-001-it',
    updatedAt: '2026-05-10T12:00:00Z'
  }
];

async function fetchAndRenderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  // Show loading state
  grid.innerHTML = `
    <div class="projects-loading">
      <div class="loading-spinner"></div>
      <p>Fetching projects from GitHub...</p>
    </div>
  `;

  // Fetch from both accounts
  let allRepos = [];
  try {
    const allReposArrays = await Promise.all(
      GITHUB_USERNAMES.map((u) => fetchGitHubRepos(u))
    );
    allRepos = allReposArrays
      .flat()
      .filter(repo => {
        // Enforce Build Kit rule: N8N and NIVA belong only in separate AI Hub
        const text = (repo.title + ' ' + (repo.description || '')).toLowerCase();
        return !text.includes('n8n') && !text.includes('niva');
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch (err) {
    console.warn('GitHub API fetch failed, falling back to verified repositories:', err);
  }

  // Graceful fallback if API fails or rate-limited
  if (!allRepos || allRepos.length === 0) {
    allRepos = verifiedFallbackProjects;
  }

  // Build unique language filter buttons
  const languages = [...new Set(allRepos.map((r) => r.language))].filter(Boolean);
  const filtersContainer = document.getElementById('projectFilters');
  if (filtersContainer) {
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
  if (!grid) return;

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
  if (!overlay) return;
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
      console.warn('Contact delivery notification:', err);
      status.className = 'form-status error';
      status.innerHTML = '⚠️ <strong>Direct form submission encountered an issue.</strong> Please message Harshit directly at <a href="mailto:harshitmishra1208@gmail.com" style="color:var(--accent-2);text-decoration:underline;font-weight:700;">harshitmishra1208@gmail.com</a> or via <a href="https://linkedin.com/in/harshit-mishra-51275b219" target="_blank" rel="noopener" style="color:var(--accent-2);text-decoration:underline;font-weight:700;">LinkedIn ↗</a>';
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
  if (!btn) return;
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
   3D ID-CARD PHYSICS ENGINE & PULL-TO-SCROLL (Cinematic Hero)
   Simulates a realistic hanging lanyard badge with spring-damper
   elastic drag, 3D perspective rotation, and pull-to-scroll gesture.
   ---------------------------------------------------------------- */
function init3DCardPhysics() {
  const card = document.getElementById('titaniumIdCard');
  const stage = document.getElementById('idCardStage');
  const ribbon = document.getElementById('lanyardRibbon');
  const pullText = document.getElementById('pullText');
  const pullIndicator = document.getElementById('pullIndicator');
  const aboutSection = document.getElementById('about');

  if (!card || !stage) return;

  let isDragging = false;
  let startX = 0, startY = 0;
  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;
  let velX = 0, velY = 0;
  let mouseTiltX = 0, mouseTiltY = 0;
  let isEntering = false;

  const PULL_THRESHOLD = 95; // pixels pulled down to trigger transition

  // Pointer Down (Desktop & Mobile)
  function onPointerDown(e) {
    if (isEntering) return;
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startX = clientX - currentX;
    startY = clientY - currentY;
    card.classList.add('is-dragging');
    document.body.style.userSelect = 'none';
  }

  // Pointer Move
  function onPointerMove(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (isDragging) {
      if (e.cancelable && e.touches) e.preventDefault(); // prevent native scroll while pulling card
      const rawX = clientX - startX;
      const rawY = clientY - startY;

      // Elastic physics resistance: easier to pull down, high resistance pulling up
      targetX = rawX * 0.55;
      targetY = rawY > 0 ? rawY * 0.82 : rawY * 0.22;

      // Real-time tension badge feedback
      if (targetY >= PULL_THRESHOLD) {
        if (pullText) pullText.textContent = 'Release to Explore Portfolio 🚀';
        if (pullIndicator) pullIndicator.classList.add('ready-to-release');
      } else if (targetY > 25) {
        if (pullText) pullText.textContent = 'Keep pulling down... ↓';
        if (pullIndicator) pullIndicator.classList.remove('ready-to-release');
      } else {
        if (pullText) pullText.textContent = 'Move · Tilt · Pull Down to Explore';
        if (pullIndicator) pullIndicator.classList.remove('ready-to-release');
      }
    } else {
      // Proximity tilt when hovering near card
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = clientX - centerX;
      const distY = clientY - centerY;
      const maxDistance = 500;

      if (Math.abs(distX) < maxDistance && Math.abs(distY) < maxDistance) {
        mouseTiltX = (distY / maxDistance) * -16;
        mouseTiltY = (distX / maxDistance) * 16;
      } else {
        mouseTiltX = 0;
        mouseTiltY = 0;
      }
    }
  }

  // Pointer Up
  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    card.classList.remove('is-dragging');
    document.body.style.userSelect = '';

    if (targetY >= PULL_THRESHOLD && !isEntering) {
      isEntering = true;
      if (pullText) pullText.textContent = 'Entering Portfolio... ✨';
      card.classList.add('pull-snap');

      // Smooth scroll to About section
      setTimeout(() => {
        if (aboutSection) {
          const navHeight = 75;
          const pos = aboutSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      }, 150);

      setTimeout(() => {
        targetX = 0;
        targetY = 0;
        isEntering = false;
        card.classList.remove('pull-snap');
        if (pullText) pullText.textContent = 'Move · Tilt · Pull Down to Explore';
        if (pullIndicator) pullIndicator.classList.remove('ready-to-release');
      }, 1200);
    } else {
      targetX = 0;
      targetY = 0;
      if (pullText) pullText.textContent = 'Move · Tilt · Pull Down to Explore';
      if (pullIndicator) pullIndicator.classList.remove('ready-to-release');
    }
  }

  // Spring-Damper Physics Simulation Loop
  const stiffness = 0.16;
  const damping = 0.76;

  function physicsLoop() {
    if (!isDragging) {
      // Spring back towards resting position (0,0)
      const forceX = (targetX - currentX) * stiffness;
      const forceY = (targetY - currentY) * stiffness;
      velX = (velX + forceX) * damping;
      velY = (velY + forceY) * damping;
      currentX += velX;
      currentY += velY;
    } else {
      // Follow cursor with silky interpolation
      currentX += (targetX - currentX) * 0.38;
      currentY += (targetY - currentY) * 0.38;
    }

    // Dynamic 3D rotation angles based on inertia and tilt
    const rotX = isDragging ? currentY * -0.18 : mouseTiltX + currentY * -0.14;
    const rotY = isDragging ? currentX * 0.18 : mouseTiltY + currentX * 0.14;
    const rotZ = currentX * 0.08;

    card.style.transform = `perspective(1000px) translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, ${isDragging ? 35 : 0}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`;

    // Update lanyard ribbon strap stretch and angle
    if (ribbon) {
      const strapLength = Math.sqrt(currentX * currentX + Math.pow(125 + currentY, 2));
      const strapAngle = Math.atan2(currentX, 125 + currentY) * (180 / Math.PI);
      ribbon.style.transform = `translateX(-50%) rotate(${-strapAngle.toFixed(2)}deg)`;
      ribbon.style.height = `${Math.max(100, strapLength).toFixed(1)}px`;
    }

    // Dynamic specular lighting reflection on the card
    const glareX = 50 + rotY * 2.5;
    const glareY = 50 - rotX * 2.5;
    card.style.setProperty('--mouse-x', `${glareX.toFixed(1)}%`);
    card.style.setProperty('--mouse-y', `${glareY.toFixed(1)}%`);

    requestAnimationFrame(physicsLoop);
  }

  requestAnimationFrame(physicsLoop);

  // Event Listeners
  card.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('mouseup', onPointerUp);

  card.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: false });
  window.addEventListener('touchend', onPointerUp);
}
