/* ================================================================
   HARSHIT MISHRA — 5-IN-1 INTERACTIVE 3D COMPANION ENGINE
   Switchable 3D Characters • Velocity Banking • Smooth Cursor Spring
   Persisted across pages via localStorage • Fully Non-Blocking
   ================================================================ */

(function () {
  const CHAR_STORAGE_KEY = 'harshit_portfolio_companion_char';

  let scene, camera, renderer, masterGroup;
  let activeCharName = localStorage.getItem(CHAR_STORAGE_KEY) || 'drone';
  const characters = {};

  // World follow coordinates
  let targetWorldX = 80;
  let targetWorldY = 60;
  let currentWorldX = 80;
  let currentWorldY = 60;
  let velX = 0;
  let velY = 0;
  let isSpinning = false;
  let spinAngle = 0;

  function initCompanionSystem() {
    const canvas = document.getElementById('companionCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Setup Scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 320);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00d4ff, 1.6);
    dirLight1.position.set(120, 150, 200);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 1.2);
    dirLight2.position.set(-100, -100, 150);
    scene.add(dirLight2);

    masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Build the 5 3D Characters
    buildCharacters();

    // Activate current character
    switchCharacter(activeCharName, false);

    // Setup Event Listeners
    setupEvents();

    // Start Animation Loop
    animate();
  }

  /* ----------------------------------------------------------------
     BUILD 5 DISTINCT PROCEDURAL 3D CHARACTERS
     ---------------------------------------------------------------- */
  function buildCharacters() {
    // 1. CYBER DRONE
    const droneGroup = new THREE.Group();
    // Core
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.8
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(6.5, 24, 24), coreMat);
    droneGroup.add(core);

    // Halo
    const haloMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.3 });
    const halo = new THREE.Mesh(new THREE.SphereGeometry(8, 16, 16), haloMat);
    droneGroup.add(halo);

    // Dual Gimbal Rings
    const ring1Mat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.2 });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(12, 1.0, 12, 32), ring1Mat);
    droneGroup.add(ring1);

    const ring2Mat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, metalness: 0.9, roughness: 0.2 });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(9.8, 0.8, 12, 32), ring2Mat);
    droneGroup.add(ring2);

    // 3 Thruster pods
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;
      const podMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85 });
      const pod = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 4, 8), podMat);
      pod.position.set(Math.cos(angle) * 14, Math.sin(angle) * 14, 0);
      pod.rotation.z = angle + Math.PI / 2;
      droneGroup.add(pod);
    }

    droneGroup.userData = {
      animate: (t) => {
        ring1.rotation.x = t * 2.0;
        ring1.rotation.y = t * 1.4;
        ring2.rotation.y = -t * 2.2;
        ring2.rotation.z = t * 1.6;
        coreMat.emissiveIntensity = 0.7 + Math.sin(t * 5) * 0.3;
      }
    };
    characters['drone'] = droneGroup;
    masterGroup.add(droneGroup);

    // 2. MINI ASTRONAUT
    const astroGroup = new THREE.Group();
    // Helmet
    const suitMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35, metalness: 0.2 });
    const head = new THREE.Mesh(new THREE.SphereGeometry(7, 24, 24), suitMat);
    head.position.y = 5;
    astroGroup.add(head);

    // Golden Visor
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
      emissive: 0xd97706,
      emissiveIntensity: 0.4
    });
    const visor = new THREE.Mesh(new THREE.SphereGeometry(4.8, 20, 20, 0, Math.PI, 0, Math.PI), visorMat);
    visor.rotation.y = -Math.PI / 2;
    visor.position.set(0, 5.5, 3.2);
    astroGroup.add(visor);

    // Torso Suit
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 4.5, 10, 16), suitMat);
    torso.position.y = -4;
    astroGroup.add(torso);

    // Jetpack Backpack
    const packMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
    const jetpack = new THREE.Mesh(new THREE.BoxGeometry(7, 8, 3.5), packMat);
    jetpack.position.set(0, -3, -4.5);
    astroGroup.add(jetpack);

    // Dual Thrusters with cyan plume
    const plumeMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.75 });
    const plume1 = new THREE.Mesh(new THREE.ConeGeometry(1.5, 4, 8), plumeMat);
    plume1.position.set(-2, -8, -4.5);
    plume1.rotation.x = Math.PI;
    astroGroup.add(plume1);

    const plume2 = new THREE.Mesh(new THREE.ConeGeometry(1.5, 4, 8), plumeMat);
    plume2.position.set(2, -8, -4.5);
    plume2.rotation.x = Math.PI;
    astroGroup.add(plume2);

    astroGroup.userData = {
      animate: (t) => {
        head.rotation.y = Math.sin(t * 1.5) * 0.3;
        astroGroup.rotation.z = Math.sin(t * 2) * 0.08;
        const scaleP = 0.8 + Math.sin(t * 10) * 0.25;
        plume1.scale.set(1, scaleP, 1);
        plume2.scale.set(1, scaleP, 1);
      }
    };
    characters['astronaut'] = astroGroup;
    masterGroup.add(astroGroup);

    // 3. ROBO-CAT
    const catGroup = new THREE.Group();
    // Cat Head
    const catHeadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
    const catHead = new THREE.Mesh(new THREE.SphereGeometry(6.5, 24, 24), catHeadMat);
    catGroup.add(catHead);

    // Cyber Ears (Triangular Prisms)
    const earMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85 });
    const innerEarMat = new THREE.MeshBasicMaterial({ color: 0xec4899 });

    const leftEar = new THREE.Mesh(new THREE.ConeGeometry(2.5, 4.5, 4), earMat);
    leftEar.position.set(-3.5, 6, 0);
    leftEar.rotation.z = 0.3;
    catGroup.add(leftEar);

    const leftInner = new THREE.Mesh(new THREE.ConeGeometry(1.5, 3, 4), innerEarMat);
    leftInner.position.set(-3.5, 5.8, 0.4);
    leftInner.rotation.z = 0.3;
    catGroup.add(leftInner);

    const rightEar = new THREE.Mesh(new THREE.ConeGeometry(2.5, 4.5, 4), earMat);
    rightEar.position.set(3.5, 6, 0);
    rightEar.rotation.z = -0.3;
    catGroup.add(rightEar);

    const rightInner = new THREE.Mesh(new THREE.ConeGeometry(1.5, 3, 4), innerEarMat);
    rightInner.position.set(3.5, 5.8, 0.4);
    rightInner.rotation.z = -0.3;
    catGroup.add(rightInner);

    // Glowing Cat Eye Visor
    const eyeVisorMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
    const eyeVisor = new THREE.Mesh(new THREE.BoxGeometry(7, 1.6, 1.2), eyeVisorMat);
    eyeVisor.position.set(0, 0.5, 5.8);
    catGroup.add(eyeVisor);

    // Cyber Collar with glowing bell node
    const collarMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const bell = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 12), collarMat);
    bell.position.set(0, -6, 2.5);
    catGroup.add(bell);

    // Swishing Animated Tail
    const tailMat = new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 0.6 });
    const tail = new THREE.Mesh(new THREE.TorusGeometry(5, 0.9, 8, 24, Math.PI), tailMat);
    tail.position.set(0, -4, -4);
    tail.rotation.x = Math.PI / 2;
    catGroup.add(tail);

    catGroup.userData = {
      animate: (t) => {
        leftEar.rotation.z = 0.3 + Math.sin(t * 3) * 0.1;
        rightEar.rotation.z = -0.3 - Math.sin(t * 3.5) * 0.1;
        tail.rotation.z = Math.sin(t * 4.5) * 0.45;
        eyeVisorMat.color.setHex(Math.sin(t * 4) > 0.95 ? 0xec4899 : 0x00d4ff);
      }
    };
    characters['robocat'] = catGroup;
    masterGroup.add(catGroup);

    // 4. NEURAL SPARK
    const sparkGroup = new THREE.Group();
    // Central Plasma Core
    const sparkCoreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sparkCore = new THREE.Mesh(new THREE.SphereGeometry(4.5, 20, 20), sparkCoreMat);
    sparkGroup.add(sparkCore);

    // Outer Aura
    const auraMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.45, wireframe: true });
    const aura = new THREE.Mesh(new THREE.IcosahedronGeometry(7.5, 1), auraMat);
    sparkGroup.add(aura);

    // 4 Orbiting Energy Wisps
    const wisps = [];
    for (let i = 0; i < 4; i++) {
      const wispMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x8b5cf6 : 0x00d4ff });
      const wisp = new THREE.Mesh(new THREE.SphereGeometry(1.4, 10, 10), wispMat);
      sparkGroup.add(wisp);
      wisps.push(wisp);
    }

    sparkGroup.userData = {
      animate: (t) => {
        aura.rotation.x = t * 2.5;
        aura.rotation.y = t * 3.2;
        const pulse = 1.0 + Math.sin(t * 8) * 0.25;
        sparkCore.scale.set(pulse, pulse, pulse);

        wisps.forEach((w, i) => {
          const angle = t * 3.5 + (i * Math.PI) / 2;
          const radius = 10 + Math.sin(t * 4 + i) * 2;
          w.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.5) * radius * 0.6, Math.sin(angle) * radius);
        });
      }
    };
    characters['spark'] = sparkGroup;
    masterGroup.add(sparkGroup);

    // 5. MECHA BOT
    const mechaGroup = new THREE.Group();
    // Torso Armor
    const mechaMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(9, 10, 7), mechaMat);
    mechaGroup.add(body);

    // Red Laser Scanning Visor
    const scanVisorMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
    const scanVisor = new THREE.Mesh(new THREE.BoxGeometry(7, 1.8, 1.2), scanVisorMat);
    scanVisor.position.set(0, 2, 3.6);
    mechaGroup.add(scanVisor);

    // Dual Shoulder Cannons / Antennas
    const antMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 });
    const antL = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 6, 8), antMat);
    antL.position.set(-5, 6, 0);
    mechaGroup.add(antL);

    const antR = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 6, 8), antMat);
    antR.position.set(5, 6, 0);
    mechaGroup.add(antR);

    // Base Hover Thruster Cone
    const thrustMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8 });
    const thruster = new THREE.Mesh(new THREE.ConeGeometry(3.5, 6, 12), thrustMat);
    thruster.position.set(0, -8, 0);
    thruster.rotation.x = Math.PI;
    mechaGroup.add(thruster);

    mechaGroup.userData = {
      animate: (t) => {
        // Visor scan pulse
        scanVisor.position.x = Math.sin(t * 6) * 1.5;
        const thPulse = 0.8 + Math.sin(t * 12) * 0.3;
        thruster.scale.set(thPulse, thPulse * 1.2, thPulse);
      }
    };
    characters['mecha'] = mechaGroup;
    masterGroup.add(mechaGroup);
  }

  /* ----------------------------------------------------------------
     SWITCH ACTIVE CHARACTER
     ---------------------------------------------------------------- */
  function switchCharacter(name, animatePop = true) {
    if (!characters[name]) return;
    activeCharName = name;
    localStorage.setItem(CHAR_STORAGE_KEY, name);

    Object.keys(characters).forEach((key) => {
      characters[key].visible = key === name;
    });

    if (animatePop && masterGroup) {
      masterGroup.scale.set(0.2, 0.2, 0.2);
      let s = 0.2;
      const popInterval = setInterval(() => {
        s += 0.15;
        if (s >= 1.0) {
          masterGroup.scale.set(1.0, 1.0, 1.0);
          clearInterval(popInterval);
        } else {
          masterGroup.scale.set(s, s, s);
        }
      }, 16);
    }

    // Update Dock UI if present
    updateDockUI(name);
  }

  function updateDockUI(activeName) {
    const iconMap = {
      drone: '🛸',
      astronaut: '👨‍🚀',
      robocat: '🐱',
      spark: '✨',
      mecha: '🤖'
    };

    const activeIconEl = document.getElementById('activeCompanionIcon');
    if (activeIconEl && iconMap[activeName]) {
      activeIconEl.textContent = iconMap[activeName];
    }

    const buttons = document.querySelectorAll('.dock-char-btn');
    buttons.forEach((btn) => {
      if (btn.getAttribute('data-char') === activeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /* ----------------------------------------------------------------
     EVENT HANDLERS & MOUSE PROJECTION
     ---------------------------------------------------------------- */
  function setupEvents() {
    function updateTargetPos(clientX, clientY) {
      const vector = new THREE.Vector3(
        (clientX / window.innerWidth) * 2 - 1,
        -(clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      // Offset slightly to float naturally around cursor
      targetWorldX = pos.x + 28;
      targetWorldY = pos.y - 28;
    }

    window.addEventListener('mousemove', (e) => {
      updateTargetPos(e.clientX, e.clientY);
    }, { passive: true });

    // Click on canvas triggers playful 360 spin
    window.addEventListener('click', (e) => {
      // Don't trigger if clicked on dock or buttons
      if (e.target.closest('#companionDock') || e.target.closest('button') || e.target.closest('a')) return;
      isSpinning = true;
      spinAngle = 0;
    });

    window.addEventListener('resize', () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Character Dock Interaction
    const dockToggleBtn = document.getElementById('dockToggleBtn');
    const dockMenu = document.getElementById('dockMenu');
    const dockCharBtns = document.querySelectorAll('.dock-char-btn');

    if (dockToggleBtn && dockMenu) {
      dockToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dockMenu.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('#companionDock')) {
          dockMenu.classList.remove('open');
        }
      });
    }

    dockCharBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const charName = btn.getAttribute('data-char');
        switchCharacter(charName, true);
        if (dockMenu) dockMenu.classList.remove('open');
      });
    });
  }

  /* ----------------------------------------------------------------
     MAIN ANIMATION LOOP
     ---------------------------------------------------------------- */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Smooth Spring Lag Interpolation
    const prevX = currentWorldX;
    const prevY = currentWorldY;

    currentWorldX += (targetWorldX - currentWorldX) * 0.085;
    currentWorldY += (targetWorldY - currentWorldY) * 0.085;

    velX = currentWorldX - prevX;
    velY = currentWorldY - prevY;

    // Levitation bob
    const hoverBob = Math.sin(elapsed * 3.5) * 2.5;
    masterGroup.position.set(currentWorldX, currentWorldY + hoverBob, 0);

    // 3D Banking velocity tilt
    masterGroup.rotation.z = -velX * 0.08;
    masterGroup.rotation.x = velY * 0.08;

    // Playful Spin on click
    if (isSpinning) {
      spinAngle += 0.25;
      masterGroup.rotation.y = spinAngle;
      if (spinAngle >= Math.PI * 2) {
        isSpinning = false;
        masterGroup.rotation.y = 0;
      }
    } else {
      masterGroup.rotation.y = 0;
    }

    // Call active character's individual procedural animation
    if (characters[activeCharName] && characters[activeCharName].userData.animate) {
      characters[activeCharName].userData.animate(elapsed);
    }

    renderer.render(scene, camera);
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompanionSystem);
  } else {
    initCompanionSystem();
  }

  // Export globally for manual invocation if needed
  window.PortfolioCompanion = {
    switchCharacter: switchCharacter,
    getActiveCharacter: () => activeCharName
  };
})();
