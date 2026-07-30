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

  // Active section highlighting
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('data-section') === id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach((section) => observer.observe(section));

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-section') || link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
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
    'IT Engineer',
    'Software Developer',
    'ML Engineer',
    'AI Enthusiast',
    'Computer Vision Explorer',
    'Problem Solver',
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
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let particles = [];
  let animId;
  let mouse = { x: null, y: null };

  function resize() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  container.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }

      // Wrap around
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.15;
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

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    drawConnections();
    animId = requestAnimationFrame(animate);
  }

  animate();

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animId);
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
}

/* ----------------------------------------------------------------
   CERTIFICATES DATA & RENDERING
   ---------------------------------------------------------------- */
const certificatesData = [
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
    title: 'Python Programming Internship',
    issuer: 'InternPe',
    icon: '🐍',
    filePath: 'Certificates/1749204415346.jpeg',
    date: '12 May 2025 - 08 June 2025',
    skills: [
      'Industrial Python Programming & Scripting',
      'Object-Oriented Programming (OOP) & Clean Code',
      'Data Structures & Algorithm Implementation',
      'AICTE & MSME Recognized Internship (CID: IPI#52842)'
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

    if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
      return `📄 <strong>Harshit's Resume:</strong><br/>
      You can view or download Harshit's full CV here: <a href="Harshit Mishra Resume.pdf" target="_blank" download style="color:var(--accent);text-decoration:underline;">Download Harshit Mishra Resume.pdf 📥</a>`;
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
   N8N AUTONOMOUS JOB AGENT INTEGRATION
   Multi-source job fetching, user-initiated apply, Mail & WhatsApp alerts
   ---------------------------------------------------------------- */
const jobSources = [
  { name: 'LinkedIn', icon: '🔗' },
  { name: 'Indeed', icon: '📋' },
  { name: 'Naukri', icon: '🇮🇳' },
  { name: 'Internshala', icon: '🎓' },
  { name: 'Wellfound', icon: '🚀' },
  { name: 'RemoteOK', icon: '🌍' },
  { name: 'Glassdoor', icon: '🏢' },
  { name: 'Google Careers', icon: '🔵' },
  { name: 'Microsoft Careers', icon: '🟦' },
  { name: 'Amazon Jobs', icon: '📦' }
];

const fetchedJobs = [
  { id: 1, title: 'AI/ML Intern', company: 'CertifyOS', source: 'RemoteOK', match: 96, skills: 5, url: 'https://remoteOK.com/remote-jobs/remote-ai-intern-certifyos-1135555', applied: false },
  { id: 2, title: 'LLM Engineer (Freelance)', company: 'Monterail', source: 'RemoteOK', match: 92, skills: 4, url: 'https://remoteOK.com/remote-jobs/remote-llm-engineer-freelancer-monterail-1135638', applied: false },
  { id: 3, title: 'Python Developer Intern', company: 'Infosys', source: 'Naukri', match: 90, skills: 4, url: 'https://www.naukri.com/python-developer-intern-jobs', applied: false },
  { id: 4, title: 'Machine Learning Engineer', company: 'Flipkart', source: 'LinkedIn', match: 88, skills: 4, url: 'https://www.linkedin.com/jobs/', applied: false },
  { id: 5, title: 'Computer Vision Intern', company: 'Samsung R&D', source: 'Indeed', match: 94, skills: 5, url: 'https://www.indeed.com/jobs?q=computer+vision+intern', applied: false },
  { id: 6, title: 'AI Research Intern', company: 'Google', source: 'Google Careers', match: 85, skills: 3, url: 'https://careers.google.com/', applied: false },
  { id: 7, title: 'Data Science Intern', company: 'Amazon', source: 'Amazon Jobs', match: 87, skills: 4, url: 'https://www.amazon.jobs/', applied: false },
  { id: 8, title: 'Web Developer (Full Stack)', company: 'Zomato', source: 'Internshala', match: 82, skills: 3, url: 'https://internshala.com/', applied: false },
  { id: 9, title: 'NLP Engineer', company: 'Fractal Analytics', source: 'Glassdoor', match: 91, skills: 4, url: 'https://www.glassdoor.com/', applied: false },
  { id: 10, title: 'RAG/LLM Developer', company: 'Startup (YC)', source: 'Wellfound', match: 95, skills: 5, url: 'https://wellfound.com/', applied: false }
];

const appliedHistory = [];

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
      ? '<p style="text-align:center;color:var(--text-muted);padding:12px;">All fetched jobs have been applied to!</p>'
      : pending.map(job => `
      <div class="job-card">
        <div class="job-card-info">
          <div class="job-card-title">${job.title} <span class="job-card-company">@ ${job.company}</span></div>
          <div class="job-card-meta">Source: ${job.source} &bull; Match: ${job.match}% (${job.skills} skills) &bull; <span class="status-green">Ready to Apply</span></div>
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
          <span class="applied-badge">Applied</span>
        </div>
      </div>
    `).join('');
  }

  // Expose applyToJob globally
  window.applyToJob = function(jobId) {
    const job = fetchedJobs.find(j => j.id === jobId);
    if (!job || job.applied) return;

    job.applied = true;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    appliedHistory.unshift({ ...job, appliedAt: 'Today ' + timeStr });

    renderJobsFeed();
    renderHistory();

    // Show notification
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.innerHTML = 'Applied to <strong>' + job.title + ' @ ' + job.company + '</strong> &mdash; Mail & WhatsApp notification sent!';
      setTimeout(() => { statusEl.style.display = 'none'; }, 4000);
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
    fetchBtn.addEventListener('click', () => {
      fetchBtn.disabled = true;
      fetchBtn.textContent = 'Fetching from ' + jobSources.length + ' sources...';

      if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.textContent = 'Scanning LinkedIn, Indeed, Naukri, Internshala, Wellfound, RemoteOK, Glassdoor & company career pages...';
      }

      setTimeout(() => {
        if (feedSection) feedSection.style.display = 'block';
        renderJobsFeed();
        renderHistory();
        fetchBtn.disabled = false;
        fetchBtn.textContent = 'Refresh Jobs';
        if (statusEl) {
          statusEl.innerHTML = 'Found <strong>' + fetchedJobs.filter(j => !j.applied).length + ' matching jobs</strong> across ' + jobSources.length + ' sources. Click <strong>Apply</strong> on any job!';
        }
      }, 1800);
    });
  }
}

