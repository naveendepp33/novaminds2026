/**
 * SMART KHADHI CHAKRA - YARN TENSION BREAKAGE DETECTION 3D STUDIO
 * Dedicated Interactive 3D WebGL Visualization for Optical Yarn Tension & Breakage Alert System
 * 
 * Demonstrates:
 * - Real-time 8-spindle yarn path monitoring
 * - Micro-optical tension sensor state
 * - Live dynamic LED color shift (Green -> Glowing Red)
 * - Control panel buzzer alert sound wave & audio alarm simulation
 * - Interactive spindle break triggers (Spindles 1 to 8)
 * 
 * SIH26020 - Team NOVAMINDS
 */

(function () {
  'use strict';

  // --- 8-SPINDLE STATE TRACKER ---
  const SPINDLE_COUNT = 8;
  const spindleStates = Array.from({ length: SPINDLE_COUNT }, (_, i) => ({
    id: i + 1,
    isBroken: i === 3, // Spindle 4 broken by default for demo
    tensionVal: i === 3 ? 0.0 : 18.5 + (Math.sin(i) * 1.5),
    name: `Spindle #0${i + 1}`
  }));

  // Component Specifications for Raycast Click Inspection
  const COMPONENT_SPECS = {
    sensorBlock: {
      name: 'Micro-Optical IR Yarn Tension & Break Sensor Block',
      spec: '940nm Infrared emitter-phototransistor array with 100Hz active sampling rate & <10ms response time.',
      function: 'Continuously monitors thread line continuity. Thread snap interrupts the infrared beam, instantly firing the digital alert.'
    },
    statusLed: {
      name: 'Dual-Color Bi-State LED Indicator (Green / Red)',
      spec: 'High-luminance SMD LED mounted above individual spindle guide with wide 120° visual viewing angle.',
      function: 'Normal tension displays steady GREEN. Upon yarn breakage, immediately shifts to high-intensity flashing RED.'
    },
    yarnLine: {
      name: 'Khadi Cotton Yarn Drafting Strand',
      spec: 'Fine-count organic cotton yarn under 18–22cN calibrated running tension.',
      function: 'Drafted from roving supply bobbins through polyurethane cots onto high-speed spinning cops.'
    },
    buzzerPort: {
      name: 'Industrial Piezoelectric Alert Buzzer & Sound Port',
      spec: '85 dB @ 10cm resonant audio transducer (2.8 kHz alarm pulse) mounted on control enclosure.',
      function: 'Emits loud audible alarm pulse upon any yarn snap to alert artisans immediately across noisy workshop floors.'
    },
    oledDisplay: {
      name: 'Smart Telemetry OLED Dashboard Screen',
      spec: 'High-contrast graphical display showing real-time spindle health, RPM, and specific broken spindle ID.',
      function: 'Provides instant fault isolation so artisans know precisely which spindle needs re-piecing without manual searching.'
    },
    creelBobbin: {
      name: 'Upper Creel Roving Supply Bobbin',
      spec: 'Tapered wooden core with wound cotton roving and red anodized top tension damping cap.',
      function: 'Supplies uniform raw cotton roving sliver into the drafting roller zone.'
    },
    spinningCop: {
      name: 'Lower High-Speed Spinning Cop & Spindle',
      spec: 'Hardened steel spindle with green-rimmed base spinning at 1,200 RPM.',
      function: 'Inserts twist into drafted fiber to produce durable, high-tenacity Khadi yarn.'
    }
  };

  // State
  const state = {
    isBuzzerMuted: false,
    audioCtx: null,
    activeSpindleFocus: 4,
    pulseTime: 0,
    rotAngle: 0,
    isAutoSim: true
  };

  // Three.js Core
  let scene, camera, renderer, controls;
  let dom = {};
  let materials = {};
  let groups = {
    world: null,
    machineFrame: null,
    spindles: [],
    yarnLines: [],
    sensorBlocks: [],
    statusLeds: [],
    ledPointLights: [],
    buzzerWaves: [],
    draftingRollers: []
  };

  // Dynamic Canvas Texture for OLED Screen
  let screenCanvas, screenCtx, screenTexture, screenMesh;

  // Initialize on Load
  document.addEventListener('DOMContentLoaded', initBreakageStudio);

  function initBreakageStudio() {
    const container = document.getElementById('breakage3dCanvasContainer');
    if (!container) return;

    cacheDom();
    initThree(container);
    buildMaterials();
    build3DMachineModel();
    initScreenTexture();
    bindEvents();
    updateSpindleVisuals();
    startLoop();

    window.addEventListener('resize', onResize);
  }

  function cacheDom() {
    dom.container = document.getElementById('breakage3dCanvasContainer');
    dom.spindlePills = document.querySelectorAll('.breakage-spindle-btn');
    dom.triggerBreakBtn = document.getElementById('breakageTriggerBtn');
    dom.repairAllBtn = document.getElementById('breakageRepairBtn');
    dom.randomBreakBtn = document.getElementById('breakageRandomBtn');
    dom.muteAudioBtn = document.getElementById('breakageMuteBtn');
    dom.camBtns = document.querySelectorAll('[data-break-view]');

    dom.hudStatusText = document.getElementById('breakageHudStatusText');
    dom.hudLiveDot = document.getElementById('breakageHudLiveDot');
    dom.activeFaultSpindle = document.getElementById('breakageActiveFaultSpindle');
    dom.activeFaultLatency = document.getElementById('breakageActiveFaultLatency');
    dom.activeBuzzerStatus = document.getElementById('breakageActiveBuzzerStatus');

    dom.cadInspectBox = document.getElementById('breakageCadInspectBox');
    dom.cadCompName = document.getElementById('breakageCadCompName');
    dom.cadCompSpec = document.getElementById('breakageCadCompSpec');
    dom.cadCompFunc = document.getElementById('breakageCadCompFunc');
    dom.cadCloseBtn = document.getElementById('breakageCadCloseBtn');
  }

  function initThree(container) {
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060a14);
    scene.fog = new THREE.FogExp2(0x060a14, 0.035);

    camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0.0, 1.2, 4.5);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 1.5;
    controls.maxDistance = 7.0;
    controls.target.set(0.0, 0.05, 0.0);
    controls.maxPolarAngle = Math.PI / 2 + 0.05;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.6);
    dirLight2.position.set(-5, 3, -4);
    scene.add(dirLight2);

    const floorGrid = new THREE.GridHelper(10, 20, 0x06b6d4, 0x1e293b);
    floorGrid.position.y = -1.25;
    scene.add(floorGrid);
  }

  function buildMaterials() {
    materials.sageGrey = new THREE.MeshStandardMaterial({
      color: 0x6e7b78,
      roughness: 0.45,
      metalness: 0.35
    });

    materials.darkMetal = new THREE.MeshStandardMaterial({
      color: 0x242d38,
      roughness: 0.35,
      metalness: 0.8
    });

    materials.chrome = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.95
    });

    materials.yarnBobbin = new THREE.MeshStandardMaterial({
      color: 0xf5eedc,
      roughness: 0.9,
      metalness: 0.05
    });

    materials.redCap = new THREE.MeshStandardMaterial({
      color: 0xd93838,
      roughness: 0.3,
      metalness: 0.6
    });

    materials.greenCap = new THREE.MeshStandardMaterial({
      color: 0x166534,
      roughness: 0.4,
      metalness: 0.3
    });

    materials.draftingCot = new THREE.MeshStandardMaterial({
      color: 0xd8c2a7,
      roughness: 0.7,
      metalness: 0.1
    });

    materials.acrylicClear = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.38,
      roughness: 0.1,
      metalness: 0.05,
      transmission: 0.9,
      ior: 1.49
    });

    materials.ledGreen = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 1.8,
      roughness: 0.2
    });

    materials.ledRed = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xef4444,
      emissiveIntensity: 2.8,
      roughness: 0.15
    });

    materials.yarnActive = new THREE.MeshBasicMaterial({
      color: 0xfffdf5
    });

    materials.yarnBroken = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.85
    });

    materials.buzzerWave = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide
    });
  }

  function build3DMachineModel() {
    groups.world = new THREE.Group();
    scene.add(groups.world);

    // Main Sage-Grey Structural Machine Frame
    const frameGroup = new THREE.Group();
    frameGroup.name = 'machineFrame';

    // Top Beam
    const topBeam = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.14, 0.28), materials.sageGrey);
    topBeam.position.set(0, 1.15, 0);
    frameGroup.add(topBeam);

    // Sensor Support Beam
    const sensorBeam = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 0.18), materials.darkMetal);
    sensorBeam.position.set(0, 0.88, 0.08);
    frameGroup.add(sensorBeam);

    // Drafting Middle Rail
    const draftingRail = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.12, 0.24), materials.sageGrey);
    draftingRail.position.set(0, 0.32, 0);
    frameGroup.add(draftingRail);

    // Lower Spindle Table
    const spindleTable = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.14, 0.38), materials.sageGrey);
    spindleTable.position.set(0, -0.32, 0);
    frameGroup.add(spindleTable);

    // 4 Telescopic A-Frame Legs
    const legCoords = [
      { x: -1.6, z: 0.25, rotZ: 0.18 },
      { x: -1.6, z: -0.25, rotZ: 0.18 },
      { x: 1.6, z: 0.25, rotZ: -0.18 },
      { x: 1.6, z: -0.25, rotZ: -0.18 }
    ];

    legCoords.forEach(pos => {
      const legOuter = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.2, 0.12), materials.sageGrey);
      legOuter.position.set(pos.x, -0.75, pos.z);
      legOuter.rotation.z = pos.rotZ;

      // Leg index holes
      for (let h = -0.3; h <= 0.3; h += 0.2) {
        const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.13, 8), materials.darkMetal);
        hole.rotation.x = Math.PI / 2;
        hole.position.set(pos.x, -0.75 + h, pos.z);
        frameGroup.add(hole);
      }

      // Foot Pad
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.18), materials.darkMetal);
      foot.position.set(pos.x * 1.08, -1.22, pos.z);
      frameGroup.add(foot);

      frameGroup.add(legOuter);
    });

    groups.world.add(frameGroup);

    // 8 Spindles Array
    const SPINDLE_START_X = -1.26;
    const SPINDLE_GAP = 0.36;

    for (let i = 0; i < SPINDLE_COUNT; i++) {
      const x = SPINDLE_START_X + i * SPINDLE_GAP;
      const spindleGrp = new THREE.Group();
      spindleGrp.position.set(x, 0, 0);

      // 1. Top Creel Bobbin (Y = +0.72)
      const creelBobbin = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.32, 16), materials.yarnBobbin);
      creelBobbin.position.set(0, 0.72, 0);
      creelBobbin.name = 'creelBobbin';
      spindleGrp.add(creelBobbin);

      // Red Anodized Top Cap
      const redCap = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.08, 12), materials.redCap);
      redCap.position.set(0, 0.92, 0);
      spindleGrp.add(redCap);

      // 2. Optical Tension Sensor Block (Y = +0.52)
      const sensorBlock = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.12), materials.darkMetal);
      sensorBlock.position.set(0, 0.52, 0.1);
      sensorBlock.name = 'sensorBlock';
      spindleGrp.add(sensorBlock);

      // 3. Bi-State LED Indicator (Y = +0.56, Z = +0.16)
      const ledGeo = new THREE.SphereGeometry(0.024, 12, 12);
      const ledMesh = new THREE.Mesh(ledGeo, materials.ledGreen);
      ledMesh.position.set(0, 0.56, 0.16);
      ledMesh.name = 'statusLed';
      spindleGrp.add(ledMesh);

      // Point Light for LED Glow
      const pointLight = new THREE.PointLight(0x10b981, 0.8, 0.6);
      pointLight.position.set(0, 0.56, 0.2);
      spindleGrp.add(pointLight);

      // 4. Drafting Roller Pair (Y = +0.32)
      const cotTop = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.07, 12), materials.draftingCot);
      cotTop.rotation.z = Math.PI / 2;
      cotTop.position.set(0, 0.32, 0.06);
      spindleGrp.add(cotTop);

      // 5. Lower Spinning Cop (Y = -0.12)
      const spinCop = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.065, 0.28, 16), materials.yarnBobbin);
      spinCop.position.set(0, -0.12, 0);
      spinCop.name = 'spinningCop';
      spindleGrp.add(spinCop);

      const greenCap = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.04, 12), materials.greenCap);
      greenCap.position.set(0, -0.27, 0);
      spindleGrp.add(greenCap);

      // 6. 3D Yarn Paths (Normal continuous line or Broken disconnected segments)
      const yarnGroup = new THREE.Group();
      yarnGroup.name = 'yarnLine';

      // Segment A: Bobbin -> Sensor
      const segAGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.2, 4);
      const segA = new THREE.Mesh(segAGeo, materials.yarnActive);
      segA.position.set(0, 0.62, 0.05);
      yarnGroup.add(segA);

      // Segment B: Sensor -> Drafting Cot (Break Point)
      const segBGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.18, 4);
      const segB = new THREE.Mesh(segBGeo, materials.yarnActive);
      segB.position.set(0, 0.42, 0.08);
      yarnGroup.add(segB);

      // Segment C: Drafting Cot -> Lower Cop
      const segCGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.38, 4);
      const segC = new THREE.Mesh(segCGeo, materials.yarnActive);
      segC.position.set(0, 0.08, 0.04);
      yarnGroup.add(segC);

      spindleGrp.add(yarnGroup);

      groups.spindles.push(spindleGrp);
      groups.statusLeds.push(ledMesh);
      groups.ledPointLights.push(pointLight);
      groups.yarnLines.push({ group: yarnGroup, segA, segB, segC });

      groups.world.add(spindleGrp);
    }

    // Left 5-Spoke Handwheel & Acrylic Gearbox
    buildLeftGearbox();

    // Right Industrial Telemetry Control Box & Buzzer Port
    buildRightControlBox();

    // Center Foot Treadle Linkage
    buildCenterTreadle();
  }

  function buildLeftGearbox() {
    const gearboxGrp = new THREE.Group();
    gearboxGrp.position.set(-1.95, 0.2, 0);

    // Handwheel
    const wheelRim = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.035, 12, 32), materials.darkMetal);
    wheelRim.rotation.y = Math.PI / 2;
    gearboxGrp.add(wheelRim);

    // 5 Spokes
    for (let s = 0; s < 5; s++) {
      const angle = (s * Math.PI * 2) / 5;
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4, 8), materials.darkMetal);
      spoke.position.set(0, Math.sin(angle) * 0.2, Math.cos(angle) * 0.2);
      spoke.rotation.x = angle;
      gearboxGrp.add(spoke);
    }

    // Handle Grip
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.22, 10), materials.darkMetal);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(-0.25, 0.32, 0);
    gearboxGrp.add(handle);

    // Acrylic Protective Guard
    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.55), materials.acrylicClear);
    guard.position.set(0.15, 0, 0);
    gearboxGrp.add(guard);

    // Lower Flywheel Box
    const fwBox = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.45), materials.sageGrey);
    fwBox.position.set(0, -0.65, 0);
    gearboxGrp.add(fwBox);

    groups.world.add(gearboxGrp);
  }

  function buildRightControlBox() {
    const ctrlGrp = new THREE.Group();
    ctrlGrp.position.set(1.92, 0.45, 0);

    // Enclosure Box
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.72, 0.55), materials.sageGrey);
    ctrlGrp.add(box);

    // OLED Screen Frame
    const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.38, 0.42), materials.darkMetal);
    screenFrame.position.set(0.12, 0.12, 0);
    ctrlGrp.add(screenFrame);

    // OLED Screen Plane
    const screenGeo = new THREE.PlaneGeometry(0.38, 0.34);
    screenMesh = new THREE.Mesh(screenGeo, new THREE.MeshBasicMaterial({ color: 0x000000 }));
    screenMesh.position.set(0.135, 0.12, 0);
    screenMesh.rotation.y = Math.PI / 2;
    screenMesh.name = 'oledDisplay';
    ctrlGrp.add(screenMesh);

    // Status Push Buttons (Green, Red)
    const btnGreen = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.03, 12), materials.ledGreen);
    btnGreen.rotation.z = Math.PI / 2;
    btnGreen.position.set(0.13, -0.18, -0.1);
    ctrlGrp.add(btnGreen);

    const btnRed = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.03, 12), materials.ledRed);
    btnRed.rotation.z = Math.PI / 2;
    btnRed.position.set(0.13, -0.18, 0.0);
    ctrlGrp.add(btnRed);

    // 🔊 Piezo Buzzer Port & Sound Rings
    const buzzerPort = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.035, 16), materials.darkMetal);
    buzzerPort.rotation.z = Math.PI / 2;
    buzzerPort.position.set(0.13, -0.18, 0.14);
    buzzerPort.name = 'buzzerPort';
    ctrlGrp.add(buzzerPort);

    // 3 Concentric Expanding 3D Sound Wave Rings
    for (let w = 0; w < 3; w++) {
      const ringGeo = new THREE.RingGeometry(0.06 + w * 0.04, 0.075 + w * 0.04, 24);
      const ringMesh = new THREE.Mesh(ringGeo, materials.buzzerWave.clone());
      ringMesh.rotation.y = Math.PI / 2;
      ringMesh.position.set(0.15 + w * 0.04, -0.18, 0.14);
      ctrlGrp.add(ringMesh);
      groups.buzzerWaves.push(ringMesh);
    }

    groups.world.add(ctrlGrp);
  }

  function buildCenterTreadle() {
    const treadleGrp = new THREE.Group();
    treadleGrp.position.set(0, -0.95, 0.35);

    // Ribbed Pedal
    for (let r = -0.22; r <= 0.22; r += 0.08) {
      const rib = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.48, 8), materials.darkMetal);
      rib.rotation.z = Math.PI / 2;
      rib.position.set(0, 0, r);
      treadleGrp.add(rib);
    }

    const treadleFrame = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.04, 0.52), materials.sageGrey);
    treadleFrame.position.set(0, -0.02, 0);
    treadleGrp.add(treadleFrame);

    groups.world.add(treadleGrp);
  }

  // Dynamic OLED Screen Texture
  function initScreenTexture() {
    screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 450;
    screenCtx = screenCanvas.getContext('2d');

    screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenMesh.material = new THREE.MeshBasicMaterial({ map: screenTexture });
    updateScreenContent();
  }

  function updateScreenContent() {
    if (!screenCtx) return;
    const ctx = screenCtx;
    const w = screenCanvas.width;
    const h = screenCanvas.height;

    const brokenSpindles = spindleStates.filter(s => s.isBroken);
    const hasBreak = brokenSpindles.length > 0;

    // Background
    ctx.fillStyle = hasBreak ? '#1f0707' : '#07161f';
    ctx.fillRect(0, 0, w, h);

    // Border
    ctx.lineWidth = 8;
    ctx.strokeStyle = hasBreak ? '#ef4444' : '#06b6d4';
    ctx.strokeRect(4, 4, w - 8, h - 8);

    if (hasBreak) {
      // Alarm State Header
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(0, 0, w, 80);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('⚠️ YARN BREAK ALARM', w / 2, 54);

      // Fault Details
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "JetBrains Mono", monospace';
      const faultNames = brokenSpindles.map(s => `SPINDLE #${s.id}`).join(', ');
      ctx.fillText(faultNames, w / 2, 160);

      ctx.fillStyle = '#f87171';
      ctx.font = '22px "JetBrains Mono", monospace';
      ctx.fillText('STATUS: OPTICAL BEAM TRIPPED', w / 2, 210);
      ctx.fillText('BUZZER ALARM: 85 dB ACTIVE', w / 2, 250);
      ctx.fillText('RESPONSE LATENCY: < 8.4 ms', w / 2, 290);

      // Visual Status Blocks (1 to 8)
      for (let i = 0; i < SPINDLE_COUNT; i++) {
        const x = 55 + i * 52;
        const y = 350;
        const isB = spindleStates[i].isBroken;
        ctx.fillStyle = isB ? '#ef4444' : '#10b981';
        ctx.fillRect(x, y, 42, 45);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px monospace';
        ctx.fillText(`${i + 1}`, x + 21, y + 30);
      }
    } else {
      // Normal OK State Header
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(0, 0, w, 80);
      ctx.fillStyle = '#040711';
      ctx.font = 'bold 32px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SMART KHADHI CHAKRA', w / 2, 52);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "JetBrains Mono", monospace';
      ctx.fillText('ALL SPINDLES: 8/8 OK', w / 2, 160);

      ctx.fillStyle = '#34d399';
      ctx.font = '24px "JetBrains Mono", monospace';
      ctx.fillText('YARN TENSION: NORMAL (20 cN)', w / 2, 220);
      ctx.fillText('SPEED: 120 RPM (STABLE)', w / 2, 265);
      ctx.fillText('BUZZER: STANDBY', w / 2, 310);

      for (let i = 0; i < SPINDLE_COUNT; i++) {
        const x = 55 + i * 52;
        const y = 360;
        ctx.fillStyle = '#10b981';
        ctx.fillRect(x, y, 42, 40);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px monospace';
        ctx.fillText(`${i + 1}`, x + 21, y + 26);
      }
    }

    if (screenTexture) screenTexture.needsUpdate = true;
  }

  // --- AUDIO SYNTHESIZER FOR PIEZO BUZZER ---
  function playBuzzerSound() {
    if (state.isBuzzerMuted) return;
    try {
      if (!state.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        state.audioCtx = new AudioContext();
      }
      if (state.audioCtx.state === 'suspended') {
        state.audioCtx.resume();
      }

      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(2800, state.audioCtx.currentTime); // 2.8 kHz Piezo tone
      osc.frequency.exponentialRampToValueAtTime(1400, state.audioCtx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.25, state.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, state.audioCtx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(state.audioCtx.destination);

      osc.start();
      osc.stop(state.audioCtx.currentTime + 0.18);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // --- UPDATE VISUALS & LOGIC ---
  function updateSpindleVisuals() {
    let hasAnyBreak = false;
    let faultIdList = [];

    spindleStates.forEach((spindle, i) => {
      const led = groups.statusLeds[i];
      const light = groups.ledPointLights[i];
      const yarn = groups.yarnLines[i];

      if (spindle.isBroken) {
        hasAnyBreak = true;
        faultIdList.push(spindle.id);

        if (led) led.material = materials.ledRed;
        if (light) {
          light.color.setHex(0xef4444);
          light.intensity = 2.4;
        }

        // Break the middle yarn segment (disconnect & curl)
        if (yarn && yarn.segB) {
          yarn.segB.visible = false;
          yarn.segA.material = materials.yarnBroken;
          yarn.segC.material = materials.yarnBroken;
        }
      } else {
        if (led) led.material = materials.ledGreen;
        if (light) {
          light.color.setHex(0x10b981);
          light.intensity = 0.8;
        }

        if (yarn && yarn.segB) {
          yarn.segB.visible = true;
          yarn.segA.material = materials.yarnActive;
          yarn.segC.material = materials.yarnActive;
        }
      }
    });

    // Update DOM Buttons & Status
    if (dom.spindlePills) {
      dom.spindlePills.forEach((pill, idx) => {
        const isB = spindleStates[idx].isBroken;
        pill.classList.toggle('broken-active', isB);
        pill.classList.toggle('normal-active', !isB);
      });
    }

    if (dom.hudStatusText && dom.hudLiveDot) {
      if (hasAnyBreak) {
        dom.hudStatusText.textContent = `SPINDLE #${faultIdList.join(', #')}: YARN BREAKAGE ACTIVE`;
        dom.hudLiveDot.className = 'breakage-live-dot red';
      } else {
        dom.hudStatusText.textContent = 'ALL 8 SPINDLES: NORMAL TENSION (OK)';
        dom.hudLiveDot.className = 'breakage-live-dot green';
      }
    }

    if (dom.activeFaultSpindle) {
      dom.activeFaultSpindle.textContent = hasAnyBreak ? `Spindle #${faultIdList.join(', #')}` : 'None (All 8 Active)';
    }

    if (dom.activeBuzzerStatus) {
      dom.activeBuzzerStatus.textContent = hasAnyBreak ? 'PULSING (85 dB ACTIVE)' : 'STANDBY';
      dom.activeBuzzerStatus.style.color = hasAnyBreak ? '#ef4444' : '#10b981';
    }

    updateScreenContent();

    if (hasAnyBreak) {
      playBuzzerSound();
    }
  }

  function toggleSpindleBreak(idx) {
    if (idx < 0 || idx >= SPINDLE_COUNT) return;
    spindleStates[idx].isBroken = !spindleStates[idx].isBroken;
    state.activeSpindleFocus = idx + 1;
    updateSpindleVisuals();
  }

  function triggerBreakOnSpindle(spindleId) {
    spindleStates.forEach((s, i) => {
      s.isBroken = (i === spindleId - 1);
    });
    state.activeSpindleFocus = spindleId;
    updateSpindleVisuals();
    zoomToSpindle(spindleId);
  }

  function repairAllSpindles() {
    spindleStates.forEach(s => s.isBroken = false);
    updateSpindleVisuals();
  }

  function triggerRandomBreak() {
    const randomIdx = Math.floor(Math.random() * SPINDLE_COUNT);
    spindleStates[randomIdx].isBroken = true;
    state.activeSpindleFocus = randomIdx + 1;
    updateSpindleVisuals();
    zoomToSpindle(randomIdx + 1);
  }

  function zoomToSpindle(spindleId) {
    const xPos = -1.26 + (spindleId - 1) * 0.36;
    animateCamera({ x: xPos, y: 0.6, z: 2.2 }, { x: xPos, y: 0.4, z: 0 }, 900);
  }

  function animateCamera(targetPos, targetLookAt, duration = 900) {
    const startPos = camera.position.clone();
    const startLookAt = controls.target.clone();
    const destPos = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);
    const destLook = new THREE.Vector3(targetLookAt.x, targetLookAt.y, targetLookAt.z);

    const startTime = performance.now();

    function step(currTime) {
      const progress = Math.min((currTime - startTime) / duration, 1.0);
      const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      camera.position.lerpVectors(startPos, destPos, ease);
      controls.target.lerpVectors(startLookAt, destLook, ease);

      if (progress < 1.0) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // --- EVENT LISTENERS ---
  function bindEvents() {
    // Spindle selector pills
    if (dom.spindlePills) {
      dom.spindlePills.forEach((btn, idx) => {
        btn.addEventListener('click', () => toggleSpindleBreak(idx));
      });
    }

    // Quick action buttons
    if (dom.triggerBreakBtn) {
      dom.triggerBreakBtn.addEventListener('click', () => triggerBreakOnSpindle(4));
    }

    if (dom.repairAllBtn) {
      dom.repairAllBtn.addEventListener('click', repairAllSpindles);
    }

    if (dom.randomBreakBtn) {
      dom.randomBreakBtn.addEventListener('click', triggerRandomBreak);
    }

    if (dom.muteAudioBtn) {
      dom.muteAudioBtn.addEventListener('click', () => {
        state.isBuzzerMuted = !state.isBuzzerMuted;
        dom.muteAudioBtn.innerHTML = state.isBuzzerMuted ? '🔇 Muted' : '🔊 Sound ON';
        dom.muteAudioBtn.classList.toggle('active', !state.isBuzzerMuted);
      });
    }

    // Camera preset buttons
    if (dom.camBtns) {
      dom.camBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          dom.camBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const view = btn.getAttribute('data-break-view');

          switch (view) {
            case 'overview':
              animateCamera({ x: 0.0, y: 1.2, z: 4.5 }, { x: 0.0, y: 0.05, z: 0.0 });
              break;
            case 'sensors':
              animateCamera({ x: 0.0, y: 0.8, z: 2.2 }, { x: 0.0, y: 0.55, z: 0.1 });
              break;
            case 'control':
              animateCamera({ x: 1.9, y: 0.7, z: 2.0 }, { x: 1.9, y: 0.45, z: 0.1 });
              break;
            case 'broken':
              zoomToSpindle(state.activeSpindleFocus || 4);
              break;
          }
        });
      });
    }

    // Raycaster component click inspection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    dom.container.addEventListener('click', (event) => {
      const rect = dom.container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / dom.container.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / dom.container.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(groups.world.children, true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        let compKey = null;

        while (obj && obj !== groups.world) {
          if (obj.name && COMPONENT_SPECS[obj.name]) {
            compKey = obj.name;
            break;
          }
          obj = obj.parent;
        }

        if (compKey) showInspectionModal(compKey);
      }
    });

    if (dom.cadCloseBtn) {
      dom.cadCloseBtn.addEventListener('click', () => {
        if (dom.cadInspectBox) dom.cadInspectBox.style.display = 'none';
      });
    }
  }

  function showInspectionModal(compKey) {
    const data = COMPONENT_SPECS[compKey];
    if (!data || !dom.cadInspectBox) return;

    if (dom.cadCompName) dom.cadCompName.textContent = data.name;
    if (dom.cadCompSpec) dom.cadCompSpec.textContent = data.spec;
    if (dom.cadCompFunc) dom.cadCompFunc.textContent = data.function;

    dom.cadInspectBox.style.display = 'block';
  }

  // --- ANIMATION LOOP ---
  function startLoop() {
    function loop() {
      state.pulseTime += 0.04;
      state.rotAngle += 0.03;

      controls.update();

      const hasBreak = spindleStates.some(s => s.isBroken);

      // Animate Piezo Buzzer Sound Wave Rings
      if (groups.buzzerWaves) {
        groups.buzzerWaves.forEach((wave, idx) => {
          if (hasBreak) {
            const phase = (state.pulseTime * 2.5 + idx * 0.7) % 2.0;
            const scale = 1.0 + phase * 0.8;
            const opacity = Math.max(0, 1.0 - (phase / 2.0));
            wave.scale.set(scale, scale, scale);
            wave.material.opacity = opacity * 0.75;
            wave.visible = true;
          } else {
            wave.visible = false;
          }
        });
      }

      // Pulse red LED emissive intensity
      if (hasBreak && materials.ledRed) {
        materials.ledRed.emissiveIntensity = 2.0 + Math.sin(state.pulseTime * 8.0) * 1.2;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  function onResize() {
    if (!dom.container || !renderer || !camera) return;
    const width = dom.container.clientWidth;
    const height = dom.container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

})();
