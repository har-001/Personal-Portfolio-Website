/**
 * HARSHIT MISHRA — 5-IN-1 INTERACTIVE 3D COMPANION ENGINE
 * Switchable Characters: Cyber Drone, Mini Astronaut, Robo-Cat, Neural Spark, Mecha Bot
 * Enhanced Size (~65px) • Autonomous Patrol & Roaming • Kinetic Stardust Trail
 * Interactive Click Acrobatic Flips • Floating Holographic Speech & Telemetry
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initCompanion);

  function initCompanion() {
    const canvas = document.getElementById('companionCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1:1 Pixel Mapping with Orthographic Camera (top-left is 0,0)
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, 0, height, -600, 600);
    camera.position.z = 200;

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

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00d4ff, 1.8);
    dirLight1.position.set(120, -120, 250);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.4);
    dirLight2.position.set(-120, 120, 200);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x00d4ff, 2.5, 300);
    pointLight.position.set(0, 0, 50);
    scene.add(pointLight);

    // Master Hierarchy
    const masterGroup = new THREE.Group();
    masterGroup.visible = true; // Always visible from launch!
    scene.add(masterGroup);

    // Stardust Particle Trail
    const TRAIL_COUNT = 16;
    const trailGeo = new THREE.SphereGeometry(1.6, 8, 8);
    const trailMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.6 });
    const trailParticles = [];
    const trailPositions = [];

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const p = new THREE.Mesh(trailGeo, trailMat.clone());
      p.visible = false;
      scene.add(p);
      trailParticles.push(p);
      trailPositions.push({ x: width - 130, y: 160, alpha: 0 });
    }

    // Holographic Scanner Wave Ring
    const scanRingGeo = new THREE.RingGeometry(24, 27, 32);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanRing.position.z = -5;
    masterGroup.add(scanRing);

    const characterHolder = new THREE.Group();
    masterGroup.add(characterHolder);

    // Position & Physics State
    let currentX = width > 768 ? width - 140 : width - 90;
    let currentY = 170;
    let targetX = currentX;
    let targetY = currentY;
    let anchorX = currentX;
    let anchorY = currentY;
    let velX = 0;
    let velY = 0;

    let isUserActive = false;
    let lastMoveTime = performance.now();
    let trickProgress = 0; // 0 to 1 for acrobatic backflip
    let activeCharKey = localStorage.getItem('harshit_companion_char') || 'drone';

    // Create or locate floating speech bubble
    let bubbleEl = document.getElementById('companionSpeechBubble');
    if (!bubbleEl) {
      bubbleEl = document.createElement('div');
      bubbleEl.id = 'companionSpeechBubble';
      bubbleEl.className = 'companion-speech-bubble';
      document.body.appendChild(bubbleEl);
    }

    let bubbleHideTimeout = null;
    const speechPhrases = [
      'Systems 100% nominal! 🚀',
      'Check out Harshit\'s 3D ID Card above! 🪪',
      'Click any skill below to see its roadmap! 🗺️',
      'Autonomous AI Hub workstations online! ⚡',
      'All 11 projects verified from resume! 🛡️',
      'Harshit Mishra • AI / ML Engineer 🧠',
      'Double-click me for an acrobatic flip! ✨',
      'Patrolling Harshit\'s digital portfolio! 🛰️'
    ];
    let phraseIndex = 0;

    function showSpeech(text, duration = 3200) {
      if (!bubbleEl) return;
      bubbleEl.textContent = text;
      bubbleEl.classList.add('visible');
      if (bubbleHideTimeout) clearTimeout(bubbleHideTimeout);
      bubbleHideTimeout = setTimeout(() => {
        bubbleEl.classList.remove('visible');
      }, duration);
    }

    // Character Builders
    const characters = {
      drone: createCyberDrone,
      astronaut: createAstronaut,
      robocat: createRoboCat,
      spark: createNeuralSpark,
      mecha: createMechaBot
    };

    let activeAnimator = null;

    function buildCharacter(key, announce = false) {
      // Clear previous character mesh
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

      // Substantial, clearly visible scale (~65px across)
      characterHolder.scale.set(2.4, 2.4, 2.4);

      updateDockUI(key);

      if (announce) {
        const greetings = {
          drone: 'Cyber Drone Sentinel active! 🛸',
          astronaut: 'Astro-Explorer reporting for duty! 👨‍🚀',
          robocat: 'Robo-Cat telemetry online! 🐱',
          spark: 'Neural Spark quantum core firing! ✨',
          mecha: 'Mecha Bot systems fully armed! 🤖'
        };
        showSpeech(greetings[key] || 'Companion ready! 🚀');
        triggerTrick();
      }
    }

    // -------------------------------------------------------------
    // 1. CYBER DRONE (Sentient Multi-Axis Surveillance Drone)
    // -------------------------------------------------------------
    function createCyberDrone() {
      const drone = new THREE.Group();

      // Main core sphere (dark titanium)
      const coreGeo = new THREE.SphereGeometry(9, 24, 24);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.95,
        roughness: 0.18
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      drone.add(core);

      // Glowing Cyan Cyclops Eye Lens
      const eyeGeo = new THREE.SphereGeometry(4.5, 20, 20);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      eye.position.set(0, 0, 7.2);
      drone.add(eye);

      // Inner Eye Pupil Core
      const pupilGeo = new THREE.SphereGeometry(2, 16, 16);
      const pupilMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pupil = new THREE.Mesh(pupilGeo, pupilMat);
      pupil.position.set(0, 0, 9.5);
      drone.add(pupil);

      // Outer Spinning Gimbal Ring (Cyan)
      const ring1Geo = new THREE.TorusGeometry(14, 1.4, 12, 36);
      const ring1Mat = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        metalness: 0.9,
        roughness: 0.1
      });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      drone.add(ring1);

      // Secondary Cross Gimbal Ring (Violet)
      const ring2Geo = new THREE.TorusGeometry(12, 1.1, 10, 32);
      const ring2Mat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        metalness: 0.9,
        roughness: 0.15
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.y = Math.PI / 2;
      drone.add(ring2);

      // 4 Angular Thruster Nacelles
      const podMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 });
      const flameMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const flames = [];

      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2 + Math.PI / 4;
        const armGeo = new THREE.CylinderGeometry(0.8, 0.8, 6, 8);
        const arm = new THREE.Mesh(armGeo, podMat);
        arm.position.set(Math.cos(angle) * 12, Math.sin(angle) * 12, 0);
        arm.rotation.z = angle + Math.PI / 2;
        drone.add(arm);

        const podGeo = new THREE.CylinderGeometry(2, 1.2, 5, 8);
        const pod = new THREE.Mesh(podGeo, podMat);
        pod.position.set(Math.cos(angle) * 15, Math.sin(angle) * 15, 0);
        pod.rotation.z = angle + Math.PI / 2;
        drone.add(pod);

        const flameGeo = new THREE.ConeGeometry(1.6, 5, 8);
        const flame = new THREE.Mesh(flameGeo, flameMat);
        flame.position.set(Math.cos(angle) * 18, Math.sin(angle) * 18, -2);
        flame.rotation.z = angle - Math.PI / 2;
        flame.rotation.x = Math.PI / 2;
        drone.add(flame);
        flames.push(flame);
      }

      return {
        mesh: drone,
        animate: (t, vx, vy, isTrick) => {
          ring1.rotation.z += 0.05;
          ring1.rotation.x = Math.sin(t * 2) * 0.4;
          ring2.rotation.y += 0.04;
          ring2.rotation.x += 0.03;

          eye.scale.setScalar(1 + Math.sin(t * 6) * 0.08);

          // Kinetic flame scaling
          flames.forEach((f, idx) => {
            f.scale.y = 0.8 + Math.sin(t * 18 + idx) * 0.45;
          });

          // Flight tilt and banking
          drone.rotation.y = THREE.MathUtils.lerp(drone.rotation.y, vx * 0.025, 0.1);
          drone.rotation.x = THREE.MathUtils.lerp(drone.rotation.x, -vy * 0.025, 0.1);
          drone.position.y = Math.sin(t * 3.5) * 5;
        }
      };
    }

    // -------------------------------------------------------------
    // 2. MINI ASTRONAUT (Deep Space Spacewalk Explorer)
    // -------------------------------------------------------------
    function createAstronaut() {
      const astro = new THREE.Group();

      // Helmet (Glossy white space suit)
      const helmetGeo = new THREE.SphereGeometry(9, 24, 24);
      const helmetMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.2,
        metalness: 0.15
      });
      const helmet = new THREE.Mesh(helmetGeo, helmetMat);
      astro.add(helmet);

      // Gold Metallic Reflective Visor
      const visorGeo = new THREE.SphereGeometry(6.2, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.6);
      const visorMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.95,
        roughness: 0.05
      });
      const visor = new THREE.Mesh(visorGeo, visorMat);
      visor.rotation.x = Math.PI / 2;
      visor.position.set(0, 0, 4.6);
      astro.add(visor);

      // Oxygen Backpack Tank
      const packGeo = new THREE.BoxGeometry(11, 13, 5);
      const packMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7 });
      const pack = new THREE.Mesh(packGeo, packMat);
      pack.position.set(0, 0, -8);
      astro.add(pack);

      // Twin Jetpack Flame Thrusters
      const flameMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const flameL = new THREE.Mesh(new THREE.ConeGeometry(2, 6, 8), flameMat);
      flameL.position.set(-3.5, -8.5, -8);
      flameL.rotation.x = Math.PI;
      astro.add(flameL);

      const flameR = flameL.clone();
      flameR.position.x = 3.5;
      astro.add(flameR);

      // Waving Robot Arm
      const armMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3 });
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 6, 8), armMat);
      arm.position.set(8.5, 2, 0);
      arm.rotation.z = -0.5;
      astro.add(arm);

      return {
        mesh: astro,
        animate: (t, vx, vy) => {
          astro.rotation.z = Math.sin(t * 1.8) * 0.15 + (vx * 0.02);
          astro.rotation.y = (vx * 0.03);
          astro.rotation.x = -(vy * 0.02);
          astro.position.y = Math.sin(t * 2.8) * 4.5;

          // Waving arm
          arm.rotation.z = -0.4 + Math.sin(t * 5) * 0.45;

          // Rocket flames flicker
          flameL.scale.y = 0.8 + Math.sin(t * 18) * 0.5;
          flameR.scale.y = 0.8 + Math.cos(t * 18) * 0.5;
        }
      };
    }

    // -------------------------------------------------------------
    // 3. ROBO-CAT (Autonomous Cybernetic Feline)
    // -------------------------------------------------------------
    function createRoboCat() {
      const cat = new THREE.Group();

      // Rounded Cyber Head
      const headGeo = new THREE.SphereGeometry(9, 24, 24);
      const headMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.85,
        roughness: 0.2
      });
      const head = new THREE.Mesh(headGeo, headMat);
      cat.add(head);

      // Left & Right Pointed Cyber Ears
      const earMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 });
      const earL = new THREE.Mesh(new THREE.ConeGeometry(4, 7, 4), earMat);
      earL.position.set(-5.5, 8.5, 0);
      earL.rotation.z = 0.35;
      cat.add(earL);

      const earR = new THREE.Mesh(new THREE.ConeGeometry(4, 7, 4), earMat);
      earR.position.set(5.5, 8.5, 0);
      earR.rotation.z = -0.35;
      cat.add(earR);

      // Glowing Emerald LED Eyes (Blinking capability)
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const eyeL = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 1), eyeMat);
      eyeL.position.set(-3.5, 1.2, 8);
      cat.add(eyeL);

      const eyeR = eyeL.clone();
      eyeR.position.x = 3.5;
      cat.add(eyeR);

      // Whisker Sensors
      const whiskerMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
      const whiskerGeo = new THREE.BoxGeometry(6, 0.4, 0.4);
      const wL = new THREE.Mesh(whiskerGeo, whiskerMat);
      wL.position.set(-7, -1.8, 6.5);
      wL.rotation.z = 0.15;
      cat.add(wL);

      const wR = wL.clone();
      wR.position.x = 7;
      wR.rotation.z = -0.15;
      cat.add(wR);

      // Mechanical Wagging Tail
      const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.5, 9, 8), earMat);
      tail.position.set(0, -6, -7);
      tail.rotation.x = -Math.PI / 3;
      cat.add(tail);

      return {
        mesh: cat,
        animate: (t, vx, vy) => {
          cat.rotation.z = Math.sin(t * 2.2) * 0.12 + (vx * 0.02);
          cat.rotation.y = (vx * 0.035);
          cat.rotation.x = -(vy * 0.025);
          cat.position.y = Math.sin(t * 3.2) * 4;

          // Ear twitches
          earL.rotation.z = 0.35 + Math.sin(t * 4) * 0.1;
          earR.rotation.z = -0.35 - Math.sin(t * 4) * 0.1;

          // Wagging tail
          tail.rotation.z = Math.sin(t * 6) * 0.4;

          // Natural eye blinking
          const blink = Math.sin(t * 1.5);
          if (blink > 0.96) {
            eyeL.scale.y = 0.15;
            eyeR.scale.y = 0.15;
          } else {
            eyeL.scale.y = 1;
            eyeR.scale.y = 1;
          }
        }
      };
    }

    // -------------------------------------------------------------
    // 4. NEURAL SPARK (Quantum Energy Core with Orbiting Electrons)
    // -------------------------------------------------------------
    function createNeuralSpark() {
      const spark = new THREE.Group();

      // Pulsing Quantum Core
      const coreGeo = new THREE.IcosahedronGeometry(7, 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        emissive: 0xff1e56,
        emissiveIntensity: 0.6,
        roughness: 0.1
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      spark.add(core);

      // 3 Concentric Gyroscopic Wireframe Rings
      const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(14, 0.8, 8, 32),
        new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true })
      );
      spark.add(ring1);

      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(12, 0.8, 8, 32),
        new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true })
      );
      spark.add(ring2);

      const ring3 = new THREE.Mesh(
        new THREE.TorusGeometry(16, 0.6, 8, 32),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true })
      );
      spark.add(ring3);

      // Orbiting Quantum Particle Electrons
      const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const p1 = new THREE.Mesh(new THREE.SphereGeometry(2, 8, 8), pMat);
      spark.add(p1);

      const p2 = new THREE.Mesh(new THREE.SphereGeometry(1.6, 8, 8), pMat);
      spark.add(p2);

      return {
        mesh: spark,
        animate: (t) => {
          ring1.rotation.x += 0.04;
          ring1.rotation.y += 0.03;
          ring2.rotation.y += 0.05;
          ring2.rotation.z += 0.03;
          ring3.rotation.x -= 0.03;
          ring3.rotation.z += 0.04;

          // Quantum core pulsing
          const pulse = 1 + Math.sin(t * 5) * 0.15;
          core.scale.set(pulse, pulse, pulse);

          // Orbital electrons
          p1.position.x = Math.cos(t * 3.5) * 16;
          p1.position.y = Math.sin(t * 3.5) * 16;
          p1.position.z = Math.sin(t * 2) * 8;

          p2.position.x = Math.cos(-t * 4.2) * 14;
          p2.position.z = Math.sin(-t * 4.2) * 14;
          p2.position.y = Math.cos(t * 2.5) * 6;

          spark.position.y = Math.sin(t * 3) * 4;
        }
      };
    }

    // -------------------------------------------------------------
    // 5. MECHA BOT (Armored Tactical Robotics Unit)
    // -------------------------------------------------------------
    function createMechaBot() {
      const mecha = new THREE.Group();

      // Angular Chassis Head
      const headGeo = new THREE.BoxGeometry(12, 11, 11);
      const headMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.9,
        roughness: 0.25
      });
      const head = new THREE.Mesh(headGeo, headMat);
      mecha.add(head);

      // Glowing Neon Visor Bar (Cylon/Sentinel style)
      const visorGeo = new THREE.BoxGeometry(10.5, 2.8, 1.5);
      const visorMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const visor = new THREE.Mesh(visorGeo, visorMat);
      visor.position.set(0, 1.2, 5.8);
      mecha.add(visor);

      // Top Communication Antenna with Blinking Red Cap
      const antMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 });
      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 6, 8), antMat);
      ant.position.set(-4.5, 8, 0);
      mecha.add(ant);

      const antCapMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const antCap = new THREE.Mesh(new THREE.SphereGeometry(1.6, 8, 8), antCapMat);
      antCap.position.set(-4.5, 11.5, 0);
      mecha.add(antCap);

      // Dual Shoulder Rocket Boosters
      const boostMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
      const flameMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

      const boostL = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 1.8, 7, 8), boostMat);
      boostL.position.set(-8, -1.5, 0);
      mecha.add(boostL);

      const flameL = new THREE.Mesh(new THREE.ConeGeometry(1.8, 5, 8), flameMat);
      flameL.position.set(-8, -6, 0);
      flameL.rotation.x = Math.PI;
      mecha.add(flameL);

      const boostR = boostL.clone();
      boostR.position.x = 8;
      mecha.add(boostR);

      const flameR = flameL.clone();
      flameR.position.x = 8;
      mecha.add(flameR);

      return {
        mesh: mecha,
        animate: (t, vx, vy) => {
          mecha.rotation.z = (vx * 0.02);
          mecha.rotation.y = (vx * 0.035);
          mecha.rotation.x = -(vy * 0.025);
          mecha.position.y = Math.sin(t * 3.2) * 4;

          // Visor scan oscillation
          visor.position.x = Math.sin(t * 4) * 1.5;

          // Antenna beacon pulse
          antCapMat.color.setHex(Math.sin(t * 8) > 0.2 ? 0xef4444 : 0x581c1c);

          // Booster flame flickering
          flameL.scale.y = 0.8 + Math.sin(t * 16) * 0.45;
          flameR.scale.y = 0.8 + Math.cos(t * 16) * 0.45;
        }
      };
    }

    // Trigger Acrobatic Trick / Flip
    function triggerTrick() {
      trickProgress = 1.0;
      phraseIndex = (phraseIndex + 1) % speechPhrases.length;
      showSpeech(speechPhrases[phraseIndex]);

      // Expand scanner ring wave
      scanRing.scale.set(1, 1, 1);
      scanRingMat.opacity = 0.85;
    }

    // Initialize Active Character
    buildCharacter(activeCharKey, false);

    // Initial greeting after 1.5 seconds
    setTimeout(() => {
      showSpeech('Systems active! Click me for tricks 🚀', 3800);
    }, 1200);

    // Mouse Tracking (Smooth following with comfortable offset)
    window.addEventListener('mousemove', (e) => {
      isUserActive = true;
      lastMoveTime = performance.now();

      const mx = e.clientX;
      const my = e.clientY;

      let tx = mx + 45;
      let ty = my + 38;

      // Keep companion comfortably within screen bounds
      if (tx + 55 > window.innerWidth) tx = mx - 60;
      if (ty + 55 > window.innerHeight) ty = my - 60;
      if (tx < 30) tx = 30;
      if (ty < 40) ty = 40;

      targetX = tx;
      targetY = ty;
      anchorX = tx;
      anchorY = ty;
    }, { passive: true });

    // Touch Support
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        isUserActive = true;
        lastMoveTime = performance.now();

        const touch = e.touches[0];
        let tx = touch.clientX + 35;
        let ty = touch.clientY - 45;

        if (tx + 55 > window.innerWidth) tx = touch.clientX - 55;
        if (ty < 40) ty = 40;

        targetX = tx;
        targetY = ty;
        anchorX = tx;
        anchorY = ty;
      }
    }, { passive: true });

    // Click Detection on Companion (Triggers flip & remarks!)
    window.addEventListener('pointerdown', (e) => {
      const dist = Math.hypot(e.clientX - currentX, e.clientY - currentY);
      if (dist < 75) {
        triggerTrick();
      }
    });

    // Hover detection over interactive buttons (companion leans curiously)
    document.addEventListener('mouseover', (e) => {
      if (e.target && e.target.closest && e.target.closest('button, a, .skill-badge-pill, .project-card, .tilt-card')) {
        // Subtle curiosity lean
        velX *= 0.7;
      }
    }, { passive: true });

    // Animation & Physics Loop
    const clock = new THREE.Clock();

    function renderLoop() {
      requestAnimationFrame(renderLoop);

      const elapsed = clock.getElapsedTime();
      const now = performance.now();
      const timeSinceMove = (now - lastMoveTime) / 1000;

      // Autonomous Patrol & Roaming when user is idle
      if (timeSinceMove > 1.8) {
        isUserActive = false;
        // Smooth figure-8 / Lissajous autonomous patrol
        targetX = anchorX + Math.sin(elapsed * 0.75) * 85 + Math.cos(elapsed * 1.5) * 35;
        targetY = anchorY + Math.cos(elapsed * 0.85) * 55 + Math.sin(elapsed * 1.6) * 25;

        // Ensure patrol stays on screen
        if (targetX > window.innerWidth - 60) targetX = window.innerWidth - 60;
        if (targetX < 50) targetX = 50;
        if (targetY > window.innerHeight - 60) targetY = window.innerHeight - 60;
        if (targetY < 60) targetY = 60;
      }

      // Smooth spring lerp motion
      const prevX = currentX;
      const prevY = currentY;

      currentX += (targetX - currentX) * 0.085;
      currentY += (targetY - currentY) * 0.085;

      velX = currentX - prevX;
      velY = currentY - prevY;

      masterGroup.position.set(currentX, currentY, 0);

      // Acrobatic Trick / Backflip handling
      if (trickProgress > 0) {
        trickProgress -= 0.035;
        characterHolder.rotation.x = (1 - trickProgress) * Math.PI * 2;
        characterHolder.rotation.z = Math.sin(trickProgress * Math.PI) * 0.8;
        if (trickProgress <= 0) {
          trickProgress = 0;
          characterHolder.rotation.x = 0;
          characterHolder.rotation.z = 0;
        }
      }

      // Scanner Wave expansion
      const waveCycle = (elapsed % 3.5) / 3.5;
      scanRing.scale.setScalar(1 + waveCycle * 2.2);
      scanRingMat.opacity = Math.max(0, 0.4 - waveCycle * 0.4);

      // Character-specific animation
      if (activeAnimator) {
        activeAnimator(elapsed, velX, velY, trickProgress > 0);
      }

      // Stardust Particle Trail
      if (Math.abs(velX) > 0.4 || Math.abs(velY) > 0.4 || !isUserActive) {
        trailPositions.unshift({
          x: currentX - (velX * 1.5) + (Math.random() - 0.5) * 6,
          y: currentY - (velY * 1.5) + (Math.random() - 0.5) * 6,
          alpha: 0.65
        });
        if (trailPositions.length > TRAIL_COUNT) trailPositions.pop();
      }

      trailParticles.forEach((p, idx) => {
        const data = trailPositions[idx];
        if (data && data.alpha > 0.05) {
          data.alpha *= 0.91;
          p.position.set(data.x, data.y, -10);
          p.scale.setScalar(data.alpha * 1.4);
          p.material.opacity = data.alpha;
          p.visible = true;
        } else {
          p.visible = false;
        }
      });

      // Update Speech Bubble Position
      if (bubbleEl && bubbleEl.classList.contains('visible')) {
        const bubbleW = bubbleEl.offsetWidth || 180;
        const bx = Math.min(Math.max(10, currentX - bubbleW / 2), window.innerWidth - bubbleW - 10);
        const by = Math.max(15, currentY - 72);
        bubbleEl.style.transform = `translate(${bx}px, ${by}px)`;
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

    // Companion Selector Dock Controller
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
          onSelectCharacter(charKey, true);
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
