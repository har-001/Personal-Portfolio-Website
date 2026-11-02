/**
 * HARSHIT MISHRA — 5-IN-1 INTERACTIVE MICRO-COMPANION
 * Switchable Characters: Cyber Drone, Mini Astronaut, Robo-Cat, Neural Spark, Mecha Bot
 * Non-blocking, compact (~24px), smooth physics lerp, zero initial obstruction.
 * Persists selected companion character via localStorage.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initCompanion);

  function initCompanion() {
    const canvas = document.getElementById('companionCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1:1 Pixel Mapping with Orthographic Camera
    // (0,0) is top-left, (width, height) is bottom-right
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, 0, height, -500, 500);
    camera.position.z = 100;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
    } catch (e) {
      console.warn('WebGL not available for companion:', e);
      return;
    }

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00d4ff, 1.2);
    dirLight1.position.set(100, -100, 200);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 1.0);
    dirLight2.position.set(-100, 100, 150);
    scene.add(dirLight2);

    // Master Hierarchy
    const masterGroup = new THREE.Group();
    masterGroup.visible = false; // Stay hidden until user moves mouse to prevent ANY initial obstruction!
    scene.add(masterGroup);

    const characterHolder = new THREE.Group();
    masterGroup.add(characterHolder);

    // Follower State
    let hasMoved = false;
    let currentX = width * 0.85;
    let currentY = height * 0.85;
    let targetX = currentX;
    let targetY = currentY;
    let velX = 0;
    let velY = 0;
    let activeCharKey = localStorage.getItem('harshit_companion_char') || 'drone';

    // Character Builders
    const characters = {
      drone: createCyberDrone,
      astronaut: createAstronaut,
      robocat: createRoboCat,
      spark: createNeuralSpark,
      mecha: createMechaBot
    };

    let activeAnimator = null;

    function buildCharacter(key) {
      // Clear previous children
      while (characterHolder.children.length > 0) {
        const obj = characterHolder.children[0];
        characterHolder.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
      }

      const builder = characters[key] || characters.drone;
      const res = builder();
      characterHolder.add(res.mesh);
      activeAnimator = res.animate;
      activeCharKey = key;
      localStorage.setItem('harshit_companion_char', key);

      // Scale appropriately (~24-28px visual bounding box)
      characterHolder.scale.set(1.15, 1.15, 1.15);

      updateDockUI(key);
    }

    // 1. CYBER DRONE
    function createCyberDrone() {
      const drone = new THREE.Group();

      // Main core sphere
      const coreGeo = new THREE.SphereGeometry(9, 24, 24);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.9,
        roughness: 0.2
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      drone.add(core);

      // Glowing Cyan Eye Lens
      const eyeGeo = new THREE.SphereGeometry(4.2, 16, 16);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      eye.position.set(0, 0, 7);
      drone.add(eye);

      // Spinning Outer Ring
      const ringGeo = new THREE.TorusGeometry(14, 1.2, 12, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.95,
        roughness: 0.1
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      drone.add(ring);

      // 4 Micro Thruster Pods
      const podMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const thrusters = [];
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2 + Math.PI / 4;
        const podGeo = new THREE.CylinderGeometry(1.5, 0.8, 4, 8);
        const pod = new THREE.Mesh(podGeo, podMat);
        pod.position.set(Math.cos(angle) * 15, Math.sin(angle) * 15, 0);
        pod.rotation.z = angle + Math.PI / 2;
        drone.add(pod);
        thrusters.push(pod);
      }

      return {
        mesh: drone,
        animate: (t, vx, vy) => {
          ring.rotation.z += 0.05;
          ring.rotation.x = Math.sin(t * 2) * 0.3;
          drone.rotation.y = (vx * 0.03);
          drone.rotation.x = -(vy * 0.03);
          drone.position.y = Math.sin(t * 3.5) * 3.5;
        }
      };
    }

    // 2. MINI ASTRONAUT
    function createAstronaut() {
      const astro = new THREE.Group();

      // Helmet (White glossy)
      const helmetGeo = new THREE.SphereGeometry(9, 24, 24);
      const helmetMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.3,
        metalness: 0.1
      });
      const helmet = new THREE.Mesh(helmetGeo, helmetMat);
      astro.add(helmet);

      // Gold Visor (Reflective glass)
      const visorGeo = new THREE.SphereGeometry(6, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.55);
      const visorMat = new THREE.MeshStandardMaterial({
        color: 0xffb703,
        metalness: 0.95,
        roughness: 0.05
      });
      const visor = new THREE.Mesh(visorGeo, visorMat);
      visor.rotation.x = Math.PI / 2;
      visor.position.set(0, 0, 4.5);
      astro.add(visor);

      // Oxygen Backpack
      const packGeo = new THREE.BoxGeometry(10, 11, 4.5);
      const packMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.6 });
      const pack = new THREE.Mesh(packGeo, packMat);
      pack.position.set(0, 0, -8);
      astro.add(pack);

      // Mini Jetpack thruster dots
      const flameMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
      const flameL = new THREE.Mesh(new THREE.ConeGeometry(1.4, 4, 8), flameMat);
      flameL.position.set(-3, -7, -8);
      flameL.rotation.x = Math.PI;
      astro.add(flameL);

      const flameR = flameL.clone();
      flameR.position.x = 3;
      astro.add(flameR);

      return {
        mesh: astro,
        animate: (t, vx, vy) => {
          astro.rotation.z = Math.sin(t * 1.8) * 0.15 + (vx * 0.02);
          astro.rotation.y = (vx * 0.03);
          astro.rotation.x = -(vy * 0.02);
          astro.position.y = Math.sin(t * 2.5) * 3;
          flameL.scale.y = 0.8 + Math.sin(t * 15) * 0.4;
          flameR.scale.y = 0.8 + Math.cos(t * 15) * 0.4;
        }
      };
    }

    // 3. ROBO-CAT
    function createRoboCat() {
      const cat = new THREE.Group();

      // Rounded Cyber Head
      const headGeo = new THREE.SphereGeometry(8.5, 20, 20);
      const headMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.8,
        roughness: 0.25
      });
      const head = new THREE.Mesh(headGeo, headMat);
      cat.add(head);

      // Left & Right Cyber Ears
      const earMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 });
      const innerEarMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });

      const earGeo = new THREE.ConeGeometry(3.5, 6, 4);
      const earL = new THREE.Mesh(earGeo, earMat);
      earL.position.set(-5, 7, 0);
      earL.rotation.z = 0.3;
      cat.add(earL);

      const earR = earL.clone();
      earR.position.x = 5;
      earR.rotation.z = -0.3;
      cat.add(earR);

      // Glowing Emerald Eyes
      const eyeGeo = new THREE.BoxGeometry(2.8, 1.4, 1);
      const eyeL = new THREE.Mesh(eyeGeo, innerEarMat);
      eyeL.position.set(-3.2, 1, 7.5);
      cat.add(eyeL);

      const eyeR = eyeL.clone();
      eyeR.position.x = 3.2;
      cat.add(eyeR);

      // Feline Whiskers
      const whiskerMat = new THREE.MeshBasicMaterial({ color: 0x64748b });
      const whiskerGeo = new THREE.BoxGeometry(5, 0.4, 0.4);
      const wL = new THREE.Mesh(whiskerGeo, whiskerMat);
      wL.position.set(-6, -1.5, 6);
      wL.rotation.z = 0.15;
      cat.add(wL);

      const wR = wL.clone();
      wR.position.x = 6;
      wR.rotation.z = -0.15;
      cat.add(wR);

      return {
        mesh: cat,
        animate: (t, vx, vy) => {
          cat.rotation.z = Math.sin(t * 2.2) * 0.12 + (vx * 0.02);
          cat.rotation.y = (vx * 0.04);
          cat.rotation.x = -(vy * 0.03);
          cat.position.y = Math.sin(t * 3) * 3;
        }
      };
    }

    // 4. NEURAL SPARK
    function createNeuralSpark() {
      const spark = new THREE.Group();

      // Inner Glowing Quantum Core
      const coreGeo = new THREE.IcosahedronGeometry(6, 1);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
      const core = new THREE.Mesh(coreGeo, coreMat);
      spark.add(core);

      // Nested Orbital Rings
      const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true });
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(12, 0.7, 8, 24), ringMat1);
      spark.add(ring1);

      const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true });
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(10, 0.7, 8, 24), ringMat2);
      spark.add(ring2);

      // Orbiting Quantum Particle
      const particleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const p1 = new THREE.Mesh(new THREE.SphereGeometry(1.8, 8, 8), particleMat);
      spark.add(p1);

      return {
        mesh: spark,
        animate: (t) => {
          ring1.rotation.x += 0.04;
          ring1.rotation.y += 0.03;
          ring2.rotation.y += 0.05;
          ring2.rotation.z += 0.03;
          core.rotation.y -= 0.02;

          p1.position.x = Math.cos(t * 4) * 14;
          p1.position.y = Math.sin(t * 4) * 14;
          p1.position.z = Math.sin(t * 2) * 6;

          spark.position.y = Math.sin(t * 3) * 3;
        }
      };
    }

    // 5. MECHA BOT
    function createMechaBot() {
      const mecha = new THREE.Group();

      // Angular Cyber Head
      const headGeo = new THREE.BoxGeometry(11, 10, 10);
      const headMat = new THREE.MeshStandardMaterial({
        color: 0x0b1329,
        metalness: 0.9,
        roughness: 0.2
      });
      const head = new THREE.Mesh(headGeo, headMat);
      mecha.add(head);

      // Glowing Neon Visor Strip
      const visorGeo = new THREE.BoxGeometry(9.5, 2.5, 1.5);
      const visorMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
      const visor = new THREE.Mesh(visorGeo, visorMat);
      visor.position.set(0, 1.2, 5.2);
      mecha.add(visor);

      // Antenna
      const antMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 });
      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 5, 8), antMat);
      ant.position.set(-4.5, 6.5, 0);
      mecha.add(ant);

      const antCap = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      antCap.position.set(-4.5, 9, 0);
      mecha.add(antCap);

      // Shoulder Boosters
      const boostL = new THREE.Mesh(new THREE.CylinderGeometry(2, 1.5, 6, 8), headMat);
      boostL.position.set(-7, -1, 0);
      mecha.add(boostL);

      const boostR = boostL.clone();
      boostR.position.x = 7;
      mecha.add(boostR);

      return {
        mesh: mecha,
        animate: (t, vx, vy) => {
          mecha.rotation.z = (vx * 0.02);
          mecha.rotation.y = (vx * 0.03);
          mecha.rotation.x = -(vy * 0.02);
          mecha.position.y = Math.sin(t * 3) * 3;
        }
      };
    }

    // Initialize Active Character
    buildCharacter(activeCharKey);

    // Mouse Tracking (Safe Offset to never obstruct cursor or text)
    window.addEventListener('mousemove', (e) => {
      const mx = e.clientX;
      const my = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        currentX = mx + 28;
        currentY = my + 28;
        masterGroup.visible = true; // Reveal only on user interaction!
      }

      let tx = mx + 28;
      let ty = my + 28;

      // Keep companion safely within screen borders
      if (tx + 30 > window.innerWidth) tx = mx - 38;
      if (ty + 30 > window.innerHeight) ty = my - 38;

      targetX = tx;
      targetY = ty;
    }, { passive: true });

    // Touch Support
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        if (!hasMoved) {
          hasMoved = true;
          currentX = touch.clientX + 24;
          currentY = touch.clientY - 36;
          masterGroup.visible = true;
        }
        targetX = touch.clientX + 24;
        targetY = touch.clientY - 36;
      }
    }, { passive: true });

    // Animation Loop
    const clock = new THREE.Clock();

    function renderLoop() {
      requestAnimationFrame(renderLoop);

      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (hasMoved) {
        // Smooth lerp following
        const prevX = currentX;
        const prevY = currentY;

        currentX += (targetX - currentX) * 0.09;
        currentY += (targetY - currentY) * 0.09;

        velX = currentX - prevX;
        velY = currentY - prevY;

        masterGroup.position.set(currentX, currentY, 0);

        if (activeAnimator) {
          activeAnimator(elapsed, velX, velY);
        }
      }

      renderer.render(scene, camera);
    }
    renderLoop();

    // Window Resize Handling
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.right = width;
      camera.bottom = height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    // Dock Controller
    initCompanionDock(buildCharacter);
  }

  // Floating Companion Dock UI Controller
  function initCompanionDock(onSelectCharacter) {
    const dock = document.getElementById('companionDock');
    const toggleBtn = document.getElementById('dockToggleBtn');
    const menu = document.getElementById('dockMenu');
    const charButtons = document.querySelectorAll('.dock-char-btn');

    if (!dock || !toggleBtn || !menu) return;

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.style.display === 'flex';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    function openMenu() {
      menu.style.display = 'flex';
      setTimeout(() => {
        menu.style.opacity = '1';
        menu.style.transform = 'translateY(0)';
      }, 10);
    }

    function closeMenu() {
      menu.style.opacity = '0';
      menu.style.transform = 'translateY(10px)';
      setTimeout(() => {
        menu.style.display = 'none';
      }, 250);
    }

    document.addEventListener('click', (e) => {
      if (!dock.contains(e.target)) {
        closeMenu();
      }
    });

    charButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const charKey = btn.getAttribute('data-char');
        if (charKey) {
          onSelectCharacter(charKey);
          closeMenu();
        }
      });
    });
  }

  function updateDockUI(charKey) {
    const iconMap = {
      drone: '🛸',
      astronaut: '👨‍🚀',
      robocat: '🐱',
      spark: '✨',
      mecha: '🤖'
    };

    const activeIcon = document.getElementById('activeCompanionIcon');
    if (activeIcon) {
      activeIcon.textContent = iconMap[charKey] || '🛸';
    }

    const charButtons = document.querySelectorAll('.dock-char-btn');
    charButtons.forEach(btn => {
      if (btn.getAttribute('data-char') === charKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

})();
