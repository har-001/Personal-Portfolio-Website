/* ================================================================
   HARSHIT MISHRA — 5-IN-1 SLEEK MICRO-COMPANION ENGINE
   Compact footprint • Non-intrusive • Zero content blocking
   Only activates on mouse movement • Persisted via localStorage
   ================================================================ */

(function () {
  const CHAR_STORAGE_KEY = 'harshit_portfolio_companion_char';

  let scene, camera, renderer, masterGroup;
  let activeCharName = localStorage.getItem(CHAR_STORAGE_KEY) || 'drone';
  const characters = {};

  let targetWorldX = -9999;
  let targetWorldY = -9999;
  let currentWorldX = -9999;
  let currentWorldY = -9999;
  let velX = 0;
  let velY = 0;
  let hasMoved = false;
  let isSpinning = false;
  let spinAngle = 0;

  function initCompanionSystem() {
    const canvas = document.getElementById('companionCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 360);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Subtle studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00d4ff, 1.5);
    dirLight1.position.set(120, 150, 200);
    scene.add(dirLight1);

    masterGroup = new THREE.Group();
    // Compact scale: ~55% of previous size so it is subtle and never covers content
    masterGroup.scale.set(0.55, 0.55, 0.55);
    masterGroup.visible = false;
    scene.add(masterGroup);

    buildCharacters();
    switchCharacter(activeCharName, false);
    setupEvents();
    animate();
  }

  function buildCharacters() {
    // 1. CYBER DRONE (Compact)
    const droneGroup = new THREE.Group();
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.8
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(6, 24, 24), coreMat);
    droneGroup.add(core);

    const ring1Mat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.2 });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(10.5, 0.9, 12, 32), ring1Mat);
    droneGroup.add(ring1);

    const ring2Mat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, metalness: 0.9, roughness: 0.2 });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(8.5, 0.75, 12, 32), ring2Mat);
    droneGroup.add(ring2);

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

    // 2. MINI ASTRONAUT (Compact)
    const astroGroup = new THREE.Group();
    const suitMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35, metalness: 0.2 });
    const head = new THREE.Mesh(new THREE.SphereGeometry(6, 20, 20), suitMat);
    head.position.y = 4.5;
    astroGroup.add(head);

    const visorMat = new THREE.MeshPhysicalMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.1, clearcoat: 1.0 });
    const visor = new THREE.Mesh(new THREE.SphereGeometry(4.2, 16, 16, 0, Math.PI, 0, Math.PI), visorMat);
    visor.rotation.y = -Math.PI / 2;
    visor.position.set(0, 5, 2.8);
    astroGroup.add(visor);

    const torso = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 3.8, 8, 16), suitMat);
    torso.position.y = -3;
    astroGroup.add(torso);

    astroGroup.userData = {
      animate: (t) => {
        head.rotation.y = Math.sin(t * 1.5) * 0.3;
        astroGroup.rotation.z = Math.sin(t * 2) * 0.08;
      }
    };
    characters['astronaut'] = astroGroup;
    masterGroup.add(astroGroup);

    // 3. ROBO-CAT (Compact)
    const catGroup = new THREE.Group();
    const catHeadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
    const catHead = new THREE.Mesh(new THREE.SphereGeometry(6, 20, 20), catHeadMat);
    catGroup.add(catHead);

    const earMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85 });
    const leftEar = new THREE.Mesh(new THREE.ConeGeometry(2.2, 4, 4), earMat);
    leftEar.position.set(-3.2, 5.5, 0);
    leftEar.rotation.z = 0.3;
    catGroup.add(leftEar);

    const rightEar = new THREE.Mesh(new THREE.ConeGeometry(2.2, 4, 4), earMat);
    rightEar.position.set(3.2, 5.5, 0);
    rightEar.rotation.z = -0.3;
    catGroup.add(rightEar);

    const eyeVisor = new THREE.Mesh(new THREE.BoxGeometry(6, 1.4, 1), new THREE.MeshBasicMaterial({ color: 0x00d4ff }));
    eyeVisor.position.set(0, 0.5, 5.4);
    catGroup.add(eyeVisor);

    catGroup.userData = {
      animate: (t) => {
        leftEar.rotation.z = 0.3 + Math.sin(t * 3) * 0.1;
        rightEar.rotation.z = -0.3 - Math.sin(t * 3.5) * 0.1;
      }
    };
    characters['robocat'] = catGroup;
    masterGroup.add(catGroup);

    // 4. NEURAL SPARK (Compact)
    const sparkGroup = new THREE.Group();
    const sparkCore = new THREE.Mesh(new THREE.SphereGeometry(4, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    sparkGroup.add(sparkCore);

    const aura = new THREE.Mesh(new THREE.IcosahedronGeometry(7, 1), new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.4 }));
    sparkGroup.add(aura);

    sparkGroup.userData = {
      animate: (t) => {
        aura.rotation.x = t * 2.5;
        aura.rotation.y = t * 3.2;
        const pulse = 1.0 + Math.sin(t * 8) * 0.2;
        sparkCore.scale.set(pulse, pulse, pulse);
      }
    };
    characters['spark'] = sparkGroup;
    masterGroup.add(sparkGroup);

    // 5. MECHA BOT (Compact)
    const mechaGroup = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(8, 9, 6), new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 }));
    mechaGroup.add(body);

    const scanVisor = new THREE.Mesh(new THREE.BoxGeometry(6, 1.6, 1), new THREE.MeshBasicMaterial({ color: 0xf43f5e }));
    scanVisor.position.set(0, 1.8, 3.2);
    mechaGroup.add(scanVisor);

    mechaGroup.userData = {
      animate: (t) => {
        scanVisor.position.x = Math.sin(t * 6) * 1.2;
      }
    };
    characters['mecha'] = mechaGroup;
    masterGroup.add(mechaGroup);
  }

  function switchCharacter(name, animatePop = true) {
    if (!characters[name]) return;
    activeCharName = name;
    localStorage.setItem(CHAR_STORAGE_KEY, name);

    Object.keys(characters).forEach((key) => {
      characters[key].visible = key === name;
    });

    if (animatePop && masterGroup && masterGroup.visible) {
      masterGroup.scale.set(0.1, 0.1, 0.1);
      let s = 0.1;
      const popInterval = setInterval(() => {
        s += 0.08;
        if (s >= 0.55) {
          masterGroup.scale.set(0.55, 0.55, 0.55);
          clearInterval(popInterval);
        } else {
          masterGroup.scale.set(s, s, s);
        }
      }, 16);
    }

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

  function setupEvents() {
    function updateTargetPos(clientX, clientY) {
      if (!camera || !renderer) return;

      if (!hasMoved) {
        hasMoved = true;
        masterGroup.visible = true;
      }

      const vector = new THREE.Vector3(
        (clientX / window.innerWidth) * 2 - 1,
        -(clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Safe offset: floats to the right and slightly below the cursor
      targetWorldX = pos.x + 24;
      targetWorldY = pos.y - 24;

      if (currentWorldX === -9999) {
        currentWorldX = targetWorldX;
        currentWorldY = targetWorldY;
      }
    }

    window.addEventListener('mousemove', (e) => {
      updateTargetPos(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('click', (e) => {
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

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    if (!hasMoved) return; // Do not render or block anything until user interacts

    const prevX = currentWorldX;
    const prevY = currentWorldY;

    currentWorldX += (targetWorldX - currentWorldX) * 0.085;
    currentWorldY += (targetWorldY - currentWorldY) * 0.085;

    velX = currentWorldX - prevX;
    velY = currentWorldY - prevY;

    const hoverBob = Math.sin(elapsed * 3.5) * 2.0;
    masterGroup.position.set(currentWorldX, currentWorldY + hoverBob, 0);

    masterGroup.rotation.z = -velX * 0.06;
    masterGroup.rotation.x = velY * 0.06;

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

    if (characters[activeCharName] && characters[activeCharName].userData.animate) {
      characters[activeCharName].userData.animate(elapsed);
    }

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompanionSystem);
  } else {
    initCompanionSystem();
  }

  window.PortfolioCompanion = {
    switchCharacter: switchCharacter,
    getActiveCharacter: () => activeCharName
  };
})();
