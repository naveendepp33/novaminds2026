/**
 * SMART KHADHI CHAKRA - "HOW IT WORKS" 3D CAD Engineering Simulator
 * Accurately Modeled after the 8-Spindle Foldable Manual Charkha Prototype
 * (Reference: assets/images/product.jpeg & solution.jpeg)
 * 
 * Features:
 * - 100% Manual Mechanical Drive (Zero Motor)
 * - Dual-Mode Human Input: Right-Side Hand Crank Wheel & Central Foot Pedal Linkage
 * - Both modes mechanically converge into main shaft & 1:10.8 step-up gear train
 * - 4 inclined drafting arm brackets with knurled knobs & orange/blue/beige drive rollers
 * - 8 overhead cotton roving supply spools with red guide tops
 * - Exactly 8 lower vertical spinning spindles with alternating green/red caps & white yarn
 * - Front horizontal steel guide rail
 * - Smart Non-Contact Sensors: Optical RPM sensor, 8x IR break sensors, sealed MCU
 * - Physically integrated status LED (Green normal / Red break alert)
 * - Digital Telemetry Display (650 RPM, 8/8 Spindles, 124m yarn, 08 prod, 01:24:00)
 * - Advanced Interactive Modes:
 *   • PLAY COMPLETE PROCESS (12-Scene Cinematic Tour)
 *   • HAND CRANK vs FOOT PEDAL Toggle
 *   • FOLLOW MECHANICAL POWER (Saffron Torque Flow)
 *   • FOLLOW SENSOR DATA (Cyan Digital Data Pulses)
 *   • EXPLORE MACHINE (Click-to-Inspect CAD Components)
 *   • POWER X-RAY MODE (Transparent Frame Revealing Internal Mechanics)
 *   • DATA OVERLAY (3D Floating Telemetry HUD Callouts)
 *   • EXPLODED VIEW / ASSEMBLE MACHINE
 *   • SIMULATE YARN BREAK & RESET ALERT (Spindle 04 Break)
 * SIH26020 - Team NOVAMINDS
 */

(function () {
  'use strict';

  // --- 8-STEP PROCESS DEFINITIONS ---
  const PROCESS_STEPS = [
    {
      id: 'input',
      stepNum: '01',
      title: 'Manual Input',
      badge: '100% MANUAL HUMAN POWER',
      badgeType: 'manual',
      icon: '🔄',
      tagline: 'Dual-Mode Ergonomic Input: Right Hand Crank or Central Foot Pedal',
      desc: 'Human power can be supplied through the right-side hand crank or central foot pedal. Both mechanisms drive the primary horizontal transmission shaft without any electric motor assist.',
      flowFormula: 'ARTISAN INPUT (50-70 RPM) ➔ HAND CRANK / FOOT PEDAL ➔ MAIN DRIVE SHAFT',
      highlightComps: ['handwheel', 'crank', 'footPedal', 'mainShaft'],
      camPos: { x: 3.8, y: 1.1, z: 2.2 },
      camTarget: { x: 1.7, y: -0.1, z: 0.1 },
      duration: 4200,
      stats: [
        { label: 'Drive Source', val: 'Human Effort (Manual)' },
        { label: 'Motor Assist', val: '0% (NO MOTOR)' },
        { label: 'Input Cadence', val: '50 – 70 RPM' },
        { label: 'Torque Applied', val: '1.8 – 2.4 N·m' }
      ]
    },
    {
      id: 'clutch',
      stepNum: '02',
      title: 'Power Transmission',
      badge: 'MECHANICAL GEAR & SHAFT DRIVE',
      badgeType: 'manual',
      icon: '⚙️',
      tagline: 'Sprag Freewheel Clutch & Interconnected Gears',
      desc: 'Mechanical rotation is transferred through the interconnected gears and shafts. The one-way sprag clutch locks instantly on forward strokes while isolating reverse kickback.',
      flowFormula: 'INPUT ➔ DRIVE WHEEL ➔ ONE-WAY CLUTCH ➔ GEARS ➔ SHAFTS',
      highlightComps: ['clutch', 'mainShaft', 'gearingRight'],
      camPos: { x: 2.7, y: 0.9, z: 1.7 },
      camTarget: { x: 1.3, y: -0.05, z: 0.0 },
      duration: 4000,
      stats: [
        { label: 'Clutch Type', val: 'Sprag Freewheel' },
        { label: 'Lock Angle', val: '< 1.5° Instant Lock' },
        { label: 'Reverse Isolation', val: '100% Back-Drive Proof' },
        { label: 'Transmission Spec', val: 'Hardened Ground Alloy' }
      ]
    },
    {
      id: 'flywheel',
      stepNum: '03',
      title: 'Inertial Smoothing',
      badge: 'INERTIAL MOMENTUM BUFFER',
      badgeType: 'manual',
      icon: '⚖️',
      tagline: 'Kinetic Momentum Buffer for Uniform Angular Velocity',
      desc: 'Rotational inertia helps reduce variations caused by manual input. The balanced 2.4 kg rim-weighted flywheel stores kinetic energy, smoothing rhythm fluctuations for uniform twist.',
      flowFormula: 'VARIABLE HUMAN INPUT ➔ ROTATIONAL INERTIA ➔ SMOOTHER OUTPUT',
      highlightComps: ['flywheel', 'flywheelHalo', 'mainShaft'],
      camPos: { x: 1.1, y: 0.7, z: 2.3 },
      camTarget: { x: 0.6, y: -0.1, z: 0.0 },
      duration: 4000,
      stats: [
        { label: 'Flywheel Mass', val: '2.4 kg Cast Rim' },
        { label: 'Moment of Inertia', val: '0.042 kg·m²' },
        { label: 'Kinetic Energy', val: '32.4 Joules Stored' },
        { label: 'Cadence Stability', val: '± 3.8% Constant RPM' }
      ]
    },
    {
      id: 'gearing',
      stepNum: '04',
      title: 'Spindle Transmission',
      badge: 'ORANGE ROLLERS & 1:10.8 GEARS',
      badgeType: 'manual',
      icon: '🔗',
      tagline: 'Power Distributed Across Rollers, Shafts & 8 Spindle Drives',
      desc: 'Mechanical rotation is distributed across the spindle and roller assemblies through right-side meshing spur gears, horizontal shafts, and orange cylindrical drive rollers.',
      flowFormula: 'GEARS ➔ SHAFTS ➔ ORANGE DRIVE ROLLERS ➔ 8 SPINDLE WHORLS',
      highlightComps: ['gearingRight', 'draftingArms', 'draftingRollers', 'transmissionShafts'],
      camPos: { x: 3.2, y: 1.3, z: 2.0 },
      camTarget: { x: 1.4, y: 0.2, z: 0.1 },
      duration: 4200,
      stats: [
        { label: 'Gear Step-Up', val: '1 : 10.8 Multiplier' },
        { label: 'Drafting Arms', val: '4 Inclined Spring Assemblies' },
        { label: 'Drive Rollers', val: 'Orange Precision Cots' },
        { label: 'Spindle Pitch', val: '58 mm Equispaced' }
      ]
    },
    {
      id: 'spindles',
      stepNum: '05',
      title: 'Yarn Production',
      badge: 'EXACTLY 8 ACTIVE SPINDLES',
      badgeType: 'manual',
      icon: '🧵',
      tagline: 'Simultaneous 8-Spindle Drafting, Twisting & Bobbin Winding',
      desc: 'Eight spindle assemblies operate together to maintain continuous yarn production. Cotton roving feeds through orange rollers, twisting into uniform 40s Ne Khadi yarn wound onto bobbins.',
      flowFormula: '8 OVERHEAD ROVING SPOOLS ➔ 4 DRAFTING ARMS ➔ 8 ROTATING SPINDLES ➔ 8 BOBBINS',
      highlightComps: ['spindles', 'bobbins', 'yarnPath', 'draftingRollers', 'supplySpools'],
      camPos: { x: 0.0, y: -0.05, z: 3.4 },
      camTarget: { x: 0.0, y: -0.38, z: 0.4 },
      duration: 4500,
      stats: [
        { label: 'Active Spindles', val: 'EXACTLY 8 / 8' },
        { label: 'Spindle Speed', val: '650 – 800 RPM' },
        { label: 'Twist per Inch', val: '22 TPI Regulated' },
        { label: 'Yarn Output', val: '40s Ne Pure Khadi' }
      ]
    },
    {
      id: 'sensors',
      stepNum: '06',
      title: 'Smart Sensor Monitoring',
      badge: 'NON-CONTACT SMART TELEMETRY',
      badgeType: 'monitoring',
      icon: '📡',
      tagline: 'Continuous RPM, Yarn Continuity & Production Telemetry',
      desc: 'Sensors continuously monitor rotational speed, spindle activity, yarn continuity and production. The optical RPM sensor and 8-channel IR array stream telemetry into the MCU.',
      flowFormula: 'RPM SENSOR + 8x SPINDLE IR SENSORS ➔ HIGH-SPEED DIGITAL BUS ➔ CONTROLLER',
      highlightComps: ['rpmSensor', 'spindleSensors', 'mcuBox', 'sensorBeams', 'dataTrail'],
      camPos: { x: 1.1, y: 0.6, z: 2.0 },
      camTarget: { x: 0.2, y: 0.0, z: 0.2 },
      duration: 4000,
      stats: [
        { label: 'Shaft RPM Sensor', val: 'Non-Contact Optical' },
        { label: 'Spindle Array', val: '8x Optoelectronic IR' },
        { label: 'Mechanical Drag', val: '0.00 N·m (Zero Drag)' },
        { label: 'Sampling Rate', val: '100 Hz Real-Time' }
      ]
    },
    {
      id: 'alert',
      stepNum: '07',
      title: 'Yarn Break Simulation',
      badge: 'INSTANT LOCALIZED DETECTION',
      badgeType: 'monitoring',
      icon: '🚨',
      tagline: '< 50 ms Detection: LED Turns RED & Spindle 04 Identified',
      desc: 'When a thread snaps (demonstrated on Spindle 04), the optical sensor flags the break in <50 ms. The status LED switches from GREEN to RED, and the display pinpoints Spindle 04.',
      flowFormula: 'SPINDLE 04 THREAD BREAK ➔ < 50 ms MCU INTERRUPT ➔ STATUS LED FLASHES RED',
      highlightComps: ['alertSpindle4', 'statusLed', 'mcuBox', 'display'],
      camPos: { x: -0.2, y: -0.15, z: 2.6 },
      camTarget: { x: -0.2, y: -0.38, z: 0.4 },
      duration: 4200,
      stats: [
        { label: 'Break Latency', val: '< 50 ms Instant' },
        { label: 'Fault Location', val: 'Spindle #04 Localized' },
        { label: 'LED Status', val: 'RED (BREAK ALERT)' },
        { label: 'Waste Reduction', val: '98.5% Yarn Saved' }
      ]
    },
    {
      id: 'display',
      stepNum: '08',
      title: 'Live Production Display',
      badge: 'LIVE ARTISAN DIGITAL HUD',
      badgeType: 'monitoring',
      icon: '📟',
      tagline: 'Live Speed (650 RPM), 22 TPI, 124m Yarn Length & 01:24:00',
      desc: 'Real-time operating and production information is presented to the operator. The backlit display shows 650 RPM, 22 TPI, 40s Ne, 8/8 active spindles, 124 m yarn, and 01:24:00 time.',
      flowFormula: 'TELEMETRY DATA ➔ 32-BIT CONTROLLER ➔ LIVE BACKLIT LCD / OLED DISPLAY',
      highlightComps: ['display', 'statusLed', 'mcuBox'],
      camPos: { x: 0.0, y: 0.18, z: 2.1 },
      camTarget: { x: 0.0, y: -0.05, z: 0.3 },
      duration: 4500,
      stats: [
        { label: 'Live Speed', val: '650 RPM (OPTIMAL)' },
        { label: 'Spindle Status', val: '8 / 8 Active' },
        { label: 'Yarn Count & Twist', val: '40s Ne | 22 TPI' },
        { label: 'Shift Time', val: '01:24:00 Active' }
      ]
    }
  ];

  // --- 3D CAD SIMULATOR ENGINE ---
  class HowItWorks3DEngine {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;

      this.currentStepIdx = 0;
      this.isPlaying = false;
      this.isAutoTour = true;
      this.tourTimeout = null;
      this.speedMultiplier = 1.0;

      this.inputDriveMode = 'crank'; // 'crank' | 'pedal'
      this.rotAngle = 0;
      this.pedalPhase = 0;
      this.pulseOffset = 0;
      this.isBreakSimulated = false;
      this.isExploded = false;
      this.isXRayMode = false;
      this.isDataOverlay = false;
      this.isExploreMode = false;
      this.activeFlowMode = null; // null | 'power' | 'data'

      this.camTargetPos = new THREE.Vector3(5.6, 3.6, 6.0);
      this.camTargetLookAt = new THREE.Vector3(0, 0.1, 0);
      this.isCamTransitioning = false;

      this.initScene();
      this.initMaterials();
      this.buildExactCharkhaCADModel();
      this.initLighting();
      this.initControls();
      this.initPowerAndDataTrails();
      this.initRaycaster();
      this.bindUI();

      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    initScene() {
      const w = this.container.clientWidth || 900;
      const h = this.container.clientHeight || 560;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x070c18);
      this.scene.fog = new THREE.FogExp2(0x070c18, 0.035);

      this.camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
      this.camera.position.set(5.6, 3.6, 6.0);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.25;

      this.container.innerHTML = '';
      this.container.appendChild(this.renderer.domElement);

      const grid = new THREE.GridHelper(16, 24, 0x06b6d4, 0x13203c);
      grid.position.y = -1.55;
      this.scene.add(grid);

      const groundGeo = new THREE.PlaneGeometry(12, 12);
      const groundMat = new THREE.MeshBasicMaterial({ color: 0x0c1e38, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
      const groundMesh = new THREE.Mesh(groundGeo, groundMat);
      groundMesh.rotation.x = -Math.PI / 2;
      groundMesh.position.y = -1.54;
      this.scene.add(groundMesh);

      window.addEventListener('resize', () => {
        if (!this.container) return;
        const nw = this.container.clientWidth;
        const nh = this.container.clientHeight;
        this.camera.aspect = nw / nh;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(nw, nh);
      });
    }

    initMaterials() {
      this.materials = {
        frameDark: new THREE.MeshStandardMaterial({
          color: 0x222732,
          metalness: 0.85,
          roughness: 0.35,
          transparent: true,
          opacity: 1.0,
          name: 'frameDark'
        }),
        steelPolished: new THREE.MeshStandardMaterial({
          color: 0xdce3ee,
          metalness: 0.94,
          roughness: 0.16,
          name: 'steelPolished'
        }),
        brassGold: new THREE.MeshStandardMaterial({
          color: 0xe5a832,
          metalness: 0.88,
          roughness: 0.22,
          name: 'brassGold'
        }),
        gearSteel: new THREE.MeshStandardMaterial({
          color: 0x475569,
          metalness: 0.86,
          roughness: 0.28,
          name: 'gearSteel'
        }),
        rollerOrange: new THREE.MeshStandardMaterial({
          color: 0xe65100,
          roughness: 0.45,
          metalness: 0.2,
          name: 'rollerOrange'
        }),
        cotBlue: new THREE.MeshStandardMaterial({
          color: 0x3b6998,
          roughness: 0.5,
          metalness: 0.1,
          name: 'cotBlue'
        }),
        cotBeige: new THREE.MeshStandardMaterial({
          color: 0xd4c4a8,
          roughness: 0.55,
          metalness: 0.1,
          name: 'cotBeige'
        }),
        teakWood: new THREE.MeshStandardMaterial({
          color: 0x854d0e,
          roughness: 0.7,
          metalness: 0.05,
          name: 'teakWood'
        }),
        yarnWhite: new THREE.MeshStandardMaterial({
          color: 0xfbf7ee,
          roughness: 0.94,
          metalness: 0.02,
          name: 'yarnWhite'
        }),
        capRed: new THREE.MeshStandardMaterial({
          color: 0xb91c1c,
          roughness: 0.3,
          metalness: 0.3,
          name: 'capRed'
        }),
        capGreen: new THREE.MeshStandardMaterial({
          color: 0x15803d,
          roughness: 0.3,
          metalness: 0.3,
          name: 'capGreen'
        }),
        displayScreen: new THREE.MeshStandardMaterial({
          color: 0x0284c7,
          emissive: 0x0369a1,
          emissiveIntensity: 0.75,
          roughness: 0.2,
          metalness: 0.8
        }),
        glowCyan: new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.9,
          roughness: 0.2
        }),
        glowSaffron: new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          emissive: 0xf59e0b,
          emissiveIntensity: 0.9,
          roughness: 0.2
        }),
        statusLedGreen: new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x10b981,
          emissiveIntensity: 1.1,
          roughness: 0.15
        }),
        statusLedRed: new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0xef4444,
          emissiveIntensity: 1.3,
          roughness: 0.15
        }),
        powerFlowMat: new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.85 }),
        dataFlowMat: new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.85 }),
        sensorBeamMat: new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6, wireframe: true })
      };
    }

    initLighting() {
      const ambient = new THREE.AmbientLight(0xffffff, 0.95);
      this.scene.add(ambient);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.45);
      keyLight.position.set(7, 10, 8);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      this.scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.85);
      fillLight.position.set(-6, 8, -4);
      this.scene.add(fillLight);

      const rimLight = new THREE.PointLight(0x06b6d4, 1.5, 14);
      rimLight.position.set(4, -1, -4);
      this.scene.add(rimLight);

      const warmUnder = new THREE.PointLight(0xf59e0b, 1.0, 10);
      warmUnder.position.set(-3, -1, 3);
      this.scene.add(warmUnder);
    }

    initControls() {
      if (window.THREE && window.THREE.OrbitControls) {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.06;
        this.controls.maxPolarAngle = Math.PI / 2 + 0.05;
        this.controls.minDistance = 2.0;
        this.controls.maxDistance = 15.0;
        this.controls.target.set(0, 0.1, 0);
      }
    }

    buildExactCharkhaCADModel() {
      this.modelRoot = new THREE.Group();
      this.highlightGroups = {};
      this.explodedGroups = [];
      this.clickableMeshes = [];

      // =========================================================================
      // 1. RECTANGULAR BASE CHASSIS FRAME + TOP OVERHEAD RACK + CORNER FEET
      // =========================================================================
      this.grpFrame = new THREE.Group();
      this.grpFrame.userData = { normalPos: new THREE.Vector3(0, 0, 0), explodePos: new THREE.Vector3(0, 0, 0) };
      this.explodedGroups.push(this.grpFrame);

      // Heavy bottom longitudinal chassis base
      const basePlateGeo = new THREE.BoxGeometry(3.6, 0.14, 0.8);
      this.meshBasePlate = new THREE.Mesh(basePlateGeo, this.materials.frameDark);
      this.meshBasePlate.position.set(0, -1.42, 0);
      this.grpFrame.add(this.meshBasePlate);

      // Nameplate on front: "SMART KHADHI CHAKRA - 8-SPINDLE PROTOTYPE"
      const nameplateGeo = new THREE.BoxGeometry(1.4, 0.08, 0.02);
      const nameplate = new THREE.Mesh(nameplateGeo, this.materials.steelPolished);
      nameplate.position.set(0, -1.42, 0.41);
      this.grpFrame.add(nameplate);

      // Left & Right Heavy Side Upright Columns (Cast alloy A-plates as in product.jpeg)
      this.sideColumns = [];
      [-1.75, 1.75].forEach(x => {
        const colGeo = new THREE.BoxGeometry(0.1, 2.4, 0.7);
        const col = new THREE.Mesh(colGeo, this.materials.frameDark);
        col.position.set(x, -0.2, 0);
        this.grpFrame.add(col);
        this.sideColumns.push(col);

        const rearTubeGeo = new THREE.CylinderGeometry(0.035, 0.035, 2.6, 16);
        const rearTube = new THREE.Mesh(rearTubeGeo, this.materials.steelPolished);
        rearTube.position.set(x, 0.0, -0.32);
        this.grpFrame.add(rearTube);
      });

      // Top Overhead Spool Rack Bridge
      const topBridgeGeo = new THREE.BoxGeometry(3.7, 0.1, 0.45);
      this.meshTopBridge = new THREE.Mesh(topBridgeGeo, this.materials.frameDark);
      this.meshTopBridge.position.set(0, 1.3, -0.15);
      this.grpFrame.add(this.meshTopBridge);

      // 4 Corner support feet with rubber pads
      [[-1.65, -0.3], [1.65, -0.3], [-1.65, 0.3], [1.65, 0.3]].forEach(pt => {
        const footGeo = new THREE.CylinderGeometry(0.045, 0.04, 0.16, 16);
        const foot = new THREE.Mesh(footGeo, this.materials.frameDark);
        foot.position.set(pt[0], -1.54, pt[1]);
        this.grpFrame.add(foot);

        const padGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.03, 16);
        const pad = new THREE.Mesh(padGeo, this.materials.steelPolished);
        pad.position.set(pt[0], -1.63, pt[1]);
        this.grpFrame.add(pad);
      });

      // Front horizontal safety / guide guard rail (silver polished rail across front)
      const frontGuardRailGeo = new THREE.CylinderGeometry(0.02, 0.02, 3.5, 16);
      const frontGuardRail = new THREE.Mesh(frontGuardRailGeo, this.materials.steelPolished);
      frontGuardRail.rotation.z = Math.PI / 2;
      frontGuardRail.position.set(0, -0.85, 0.48);
      this.grpFrame.add(frontGuardRail);

      [-1.7, 1.7].forEach(gx => {
        const guardStanchionGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.28, 12);
        const guardStanchion = new THREE.Mesh(guardStanchionGeo, this.materials.brassGold);
        guardStanchion.position.set(gx, -0.98, 0.48);
        this.grpFrame.add(guardStanchion);
      });

      this.modelRoot.add(this.grpFrame);
      this.highlightGroups['frame'] = this.grpFrame;

      // =========================================================================
      // 2. MAIN HORIZONTAL TRANSMISSION SHAFT & ONE-WAY CLUTCH & FLYWHEEL
      // =========================================================================
      this.grpMainShaft = new THREE.Group();
      this.grpMainShaft.userData = { normalPos: new THREE.Vector3(0, 0, 0), explodePos: new THREE.Vector3(0, -0.2, -0.4) };
      this.explodedGroups.push(this.grpMainShaft);

      const mainShaftGeo = new THREE.CylinderGeometry(0.042, 0.042, 3.8, 24);
      this.meshMainShaft = new THREE.Mesh(mainShaftGeo, this.materials.steelPolished);
      this.meshMainShaft.rotation.z = Math.PI / 2;
      this.meshMainShaft.position.set(0, -0.2, -0.05);
      this.grpMainShaft.add(this.meshMainShaft);

      [-1.5, -0.5, 0.5, 1.5].forEach(x => {
        const bearingGeo = new THREE.BoxGeometry(0.12, 0.18, 0.16);
        const bearing = new THREE.Mesh(bearingGeo, this.materials.brassGold);
        bearing.position.set(x, -0.2, -0.05);
        this.grpMainShaft.add(bearing);
      });

      // One-Way Sprag Freewheel Clutch
      this.grpClutch = new THREE.Group();
      this.grpClutch.position.set(1.25, -0.2, -0.05);
      const clutchOuterGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.14, 28);
      const clutchOuter = new THREE.Mesh(clutchOuterGeo, this.materials.brassGold);
      clutchOuter.rotation.z = Math.PI / 2;
      this.grpClutch.add(clutchOuter);

      const spragGeo = new THREE.TorusGeometry(0.12, 0.025, 12, 24);
      const sprags = new THREE.Mesh(spragGeo, this.materials.gearSteel);
      sprags.rotation.y = Math.PI / 2;
      this.grpClutch.add(sprags);
      this.grpMainShaft.add(this.grpClutch);

      // Inertial Balance Flywheel
      this.grpFlywheel = new THREE.Group();
      this.grpFlywheel.position.set(0.65, -0.2, -0.05);
      this.rotorFlywheel = new THREE.Group();

      const flywheelRimGeo = new THREE.TorusGeometry(0.52, 0.065, 20, 48);
      const flywheelRim = new THREE.Mesh(flywheelRimGeo, this.materials.brassGold);
      flywheelRim.rotation.y = Math.PI / 2;
      this.rotorFlywheel.add(flywheelRim);

      for (let i = 0; i < 6; i++) {
        const spokeGeo = new THREE.BoxGeometry(0.025, 0.46, 0.04);
        const spoke = new THREE.Mesh(spokeGeo, this.materials.frameDark);
        spoke.rotation.z = (i * Math.PI) / 3;
        this.rotorFlywheel.add(spoke);
      }

      const haloGeo = new THREE.TorusGeometry(0.6, 0.015, 16, 48);
      this.meshFlywheelHalo = new THREE.Mesh(haloGeo, this.materials.glowCyan);
      this.meshFlywheelHalo.rotation.y = Math.PI / 2;
      this.rotorFlywheel.add(this.meshFlywheelHalo);

      this.grpFlywheel.add(this.rotorFlywheel);
      this.grpMainShaft.add(this.grpFlywheel);

      this.modelRoot.add(this.grpMainShaft);
      this.highlightGroups['mainShaft'] = this.grpMainShaft;
      this.highlightGroups['clutch'] = this.grpClutch;
      this.highlightGroups['flywheel'] = this.grpFlywheel;
      this.highlightGroups['flywheelHalo'] = this.grpFlywheel;

      // =========================================================================
      // 3. RIGHT-SIDE MANUAL DRIVE CRANK WHEEL + CENTRAL FOOT PEDAL LINKAGE
      // =========================================================================
      this.grpInput = new THREE.Group();
      this.grpInput.userData = { normalPos: new THREE.Vector3(0, 0, 0), explodePos: new THREE.Vector3(0.8, 0, 0.2) };
      this.explodedGroups.push(this.grpInput);

      this.rotorHandwheel = new THREE.Group();
      this.rotorHandwheel.position.set(1.95, -0.2, -0.05);

      // Large outer spoked wheel
      const wheelRimGeo = new THREE.TorusGeometry(0.58, 0.038, 16, 44);
      const wheelRim = new THREE.Mesh(wheelRimGeo, this.materials.steelPolished);
      wheelRim.rotation.y = Math.PI / 2;
      this.rotorHandwheel.add(wheelRim);

      for (let i = 0; i < 4; i++) {
        const spokeGeo = new THREE.CylinderGeometry(0.016, 0.016, 1.12, 12);
        const spoke = new THREE.Mesh(spokeGeo, this.materials.steelPolished);
        spoke.rotation.z = (i * Math.PI) / 4;
        this.rotorHandwheel.add(spoke);
      }

      const hubGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 20);
      const hub = new THREE.Mesh(hubGeo, this.materials.brassGold);
      hub.rotation.z = Math.PI / 2;
      this.rotorHandwheel.add(hub);

      // Manual crank arm & rotating teak grip handle
      const crankArmGeo = new THREE.BoxGeometry(0.04, 0.44, 0.03);
      const crankArm = new THREE.Mesh(crankArmGeo, this.materials.frameDark);
      crankArm.position.set(0.06, 0.22, 0);
      this.rotorHandwheel.add(crankArm);

      const handleGeo = new THREE.CylinderGeometry(0.032, 0.035, 0.18, 16);
      const handle = new THREE.Mesh(handleGeo, this.materials.teakWood);
      handle.rotation.z = Math.PI / 2;
      handle.position.set(0.16, 0.42, 0);
      this.rotorHandwheel.add(handle);

      this.grpInput.add(this.rotorHandwheel);

      // Central Foot Pedal with Connecting Rod Linkage below the frame
      this.grpFootPedal = new THREE.Group();
      this.grpFootPedal.position.set(0, -1.45, 0.15);

      const pedalPlateGeo = new THREE.BoxGeometry(0.35, 0.04, 0.22);
      this.meshPedalPlate = new THREE.Mesh(pedalPlateGeo, this.materials.frameDark);
      this.grpFootPedal.add(this.meshPedalPlate);

      const pushRodGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.25, 12);
      this.meshPushRod = new THREE.Mesh(pushRodGeo, this.materials.steelPolished);
      this.meshPushRod.position.set(0, 0.6, -0.1);
      this.meshPushRod.rotation.x = -0.15;
      this.grpFootPedal.add(this.meshPushRod);

      this.grpInput.add(this.grpFootPedal);

      this.modelRoot.add(this.grpInput);
      this.highlightGroups['handwheel'] = this.grpInput;
      this.highlightGroups['crank'] = this.grpInput;
      this.highlightGroups['footPedal'] = this.grpFootPedal;

      // =========================================================================
      // 4. RIGHT-SIDE EXPOSED MESHING SPUR GEAR TRAIN
      // =========================================================================
      this.grpGearingRight = new THREE.Group();
      this.grpGearingRight.userData = { normalPos: new THREE.Vector3(0, 0, 0), explodePos: new THREE.Vector3(0.6, 0.4, 0.3) };
      this.explodedGroups.push(this.grpGearingRight);
      this.grpGearingRight.position.set(1.75, 0, 0);

      this.rotorGearRightMain = new THREE.Group();
      this.rotorGearRightMain.position.set(0, 0.22, 0);
      const mainRGearGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.06, 32);
      const mainRGear = new THREE.Mesh(mainRGearGeo, this.materials.gearSteel);
      mainRGear.rotation.z = Math.PI / 2;
      this.rotorGearRightMain.add(mainRGear);

      for (let i = 0; i < 24; i++) {
        const toothGeo = new THREE.BoxGeometry(0.07, 0.025, 0.035);
        const tooth = new THREE.Mesh(toothGeo, this.materials.brassGold);
        tooth.position.set(0, Math.cos((i * Math.PI) / 12) * 0.35, Math.sin((i * Math.PI) / 12) * 0.35);
        this.rotorGearRightMain.add(tooth);
      }
      this.grpGearingRight.add(this.rotorGearRightMain);

      this.rotorGearRightPinion = new THREE.Group();
      this.rotorGearRightPinion.position.set(0, -0.22, 0);
      const pinionRGearGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.06, 20);
      const pinionRGear = new THREE.Mesh(pinionRGearGeo, this.materials.brassGold);
      pinionRGear.rotation.z = Math.PI / 2;
      this.rotorGearRightPinion.add(pinionRGear);
      this.grpGearingRight.add(this.rotorGearRightPinion);

      this.modelRoot.add(this.grpGearingRight);
      this.highlightGroups['gearingRight'] = this.grpGearingRight;

      // =========================================================================
      // 5. 4 INCLINED DRAFTING ARMS + 3 HORIZONTAL SHAFTS + ORANGE ROLLERS
      // =========================================================================
      this.grpDrafting = new THREE.Group();
      this.grpDrafting.userData = { normalPos: new THREE.Vector3(0, 0, 0), explodePos: new THREE.Vector3(0, 0.5, 0.3) };
      this.explodedGroups.push(this.grpDrafting);

      [0.08, 0.28, 0.48].forEach((y, sIdx) => {
        const dShaftGeo = new THREE.CylinderGeometry(0.028, 0.028, 3.5, 20);
        const dShaft = new THREE.Mesh(dShaftGeo, this.materials.steelPolished);
        dShaft.rotation.z = Math.PI / 2;
        dShaft.position.set(0, y, 0.05 + sIdx * 0.06);
        this.grpDrafting.add(dShaft);
      });

      const armSpacing = 0.82;
      const startArmX = -((4 - 1) * armSpacing) / 2;
      for (let i = 0; i < 4; i++) {
        const ax = startArmX + i * armSpacing;
        const armGeo = new THREE.BoxGeometry(0.08, 0.85, 0.12);
        const armMesh = new THREE.Mesh(armGeo, this.materials.frameDark);
        armMesh.position.set(ax, 0.42, 0.1);
        armMesh.rotation.x = 0.52;
        this.grpDrafting.add(armMesh);

        const knobGeo = new THREE.SphereGeometry(0.045, 16, 16);
        const knob = new THREE.Mesh(knobGeo, this.materials.brassGold);
        knob.position.set(ax, 0.82, -0.08);
        this.grpDrafting.add(knob);
      }

      // Orange Cylindrical Drive Rollers for all 8 positions
      const spindlePitch = 0.38;
      const startX = -((8 - 1) * spindlePitch) / 2;
      this.draftingRollers = [];

      for (let i = 0; i < 8; i++) {
        const sx = startX + i * spindlePitch;
        const cotMat = (i % 3 === 0) ? this.materials.rollerOrange : (i % 3 === 1) ? this.materials.cotBlue : this.materials.cotBeige;
        const rollerGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.14, 20);
        const roller = new THREE.Mesh(rollerGeo, cotMat);
        roller.rotation.z = Math.PI / 2;
        roller.position.set(sx, 0.28, 0.11);
        this.grpDrafting.add(roller);
        this.draftingRollers.push(roller);

        const cotGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.12, 16);
        const cotRoller = new THREE.Mesh(cotGeo, this.materials.steelPolished);
        cotRoller.rotation.z = Math.PI / 2;
        cotRoller.position.set(sx, 0.08, 0.05);
        this.grpDrafting.add(cotRoller);
      }

      // 8 Overhead Cotton Roving Supply Spools on Top Bridge
      for (let i = 0; i < 8; i++) {
        const sx = startX + i * spindlePitch;
        const spoolZ = (i % 2 === 0) ? -0.22 : -0.08;

        const pegGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.5, 12);
        const peg = new THREE.Mesh(pegGeo, this.materials.steelPolished);
        peg.position.set(sx, 1.0, spoolZ);
        this.grpDrafting.add(peg);

        const topCapGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 16);
        const topCap = new THREE.Mesh(topCapGeo, this.materials.capRed);
        topCap.position.set(sx, 1.25, spoolZ);
        this.grpDrafting.add(topCap);

        const rovingGeo = new THREE.CylinderGeometry(0.09, 0.11, 0.42, 20);
        const rovingSpool = new THREE.Mesh(rovingGeo, this.materials.yarnWhite);
        rovingSpool.position.set(sx, 0.98, spoolZ);
        this.grpDrafting.add(rovingSpool);
      }

      this.modelRoot.add(this.grpDrafting);
      this.highlightGroups['draftingArms'] = this.grpDrafting;
      this.highlightGroups['draftingRollers'] = this.grpDrafting;
      this.highlightGroups['supplySpools'] = this.grpDrafting;
      this.highlightGroups['transmissionShafts'] = this.grpDrafting;

      // =========================================================================
      // 6. LOWER 8-SPINDLE ARRAY: ALTERNATING GREEN & RED CAPS + WHITE BOBBINS
      // =========================================================================
      this.grpSpindles = new THREE.Group();
      this.grpSpindles.userData = { normalPos: new THREE.Vector3(0, 0, 0), explodePos: new THREE.Vector3(0, -0.4, 0.5) };
      this.explodedGroups.push(this.grpSpindles);

      this.spindleRotors = [];
      this.spindleCaps = [];
      this.spindleYarnTubes = [];

      const spindleRailGeo = new THREE.BoxGeometry(3.4, 0.08, 0.2);
      const spindleRail = new THREE.Mesh(spindleRailGeo, this.materials.frameDark);
      spindleRail.position.set(0, -1.05, 0.32);
      this.grpSpindles.add(spindleRail);

      for (let i = 0; i < 8; i++) {
        const sx = startX + i * spindlePitch;
        const spindleGrp = new THREE.Group();
        spindleGrp.position.set(sx, -0.62, 0.32);

        const bladeGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.85, 12);
        const blade = new THREE.Mesh(bladeGeo, this.materials.steelPolished);
        spindleGrp.add(blade);

        const whorlGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.06, 16);
        const whorl = new THREE.Mesh(whorlGeo, this.materials.brassGold);
        whorl.position.set(0, -0.32, 0);
        spindleGrp.add(whorl);

        const bobbinGeo = new THREE.CylinderGeometry(0.055, 0.07, 0.45, 20);
        const bobbin = new THREE.Mesh(bobbinGeo, this.materials.yarnWhite);
        bobbin.position.set(0, 0.02, 0);
        spindleGrp.add(bobbin);

        const capColorList = [this.materials.capRed, this.materials.capRed, this.materials.capGreen, this.materials.capRed, this.materials.capGreen, this.materials.capGreen, this.materials.capRed, this.materials.capRed];
        const capMat = capColorList[i] || this.materials.capGreen;
        const capGeo = new THREE.ConeGeometry(0.04, 0.1, 16);
        const cap = new THREE.Mesh(capGeo, capMat);
        cap.position.set(0, 0.38, 0);
        spindleGrp.add(cap);
        this.spindleCaps.push(cap);

        const yarnLineGeo = new THREE.CylinderGeometry(0.003, 0.003, 1.25, 8);
        const yarnLine = new THREE.Mesh(yarnLineGeo, this.materials.yarnWhite);
        yarnLine.position.set(0, 0.65, 0.05);
        yarnLine.rotation.x = -0.15;
        spindleGrp.add(yarnLine);
        this.spindleYarnTubes.push(yarnLine);

        this.grpSpindles.add(spindleGrp);
        this.spindleRotors.push(spindleGrp);
      }

      this.modelRoot.add(this.grpSpindles);
      this.highlightGroups['spindles'] = this.grpSpindles;
      this.highlightGroups['bobbins'] = this.grpSpindles;
      this.highlightGroups['yarnPath'] = this.grpSpindles;

      // =========================================================================
      // 7. SMART TELEMETRY: CENTER HUD, STATUS LED, RPM ENCODER & 8x IR SENSORS
      // =========================================================================
      this.grpSensors = new THREE.Group();
      this.grpSensors.userData = { normalPos: new THREE.Vector3(0, 0, 0), explodePos: new THREE.Vector3(0, 0.2, 0.6) };
      this.explodedGroups.push(this.grpSensors);

      const rpmSensorGeo = new THREE.BoxGeometry(0.12, 0.12, 0.08);
      const rpmSensor = new THREE.Mesh(rpmSensorGeo, this.materials.glowCyan);
      rpmSensor.position.set(1.0, -0.2, 0.1);
      this.grpSensors.add(rpmSensor);

      const irBarGeo = new THREE.BoxGeometry(3.3, 0.04, 0.06);
      const irBar = new THREE.Mesh(irBarGeo, this.materials.frameDark);
      irBar.position.set(0, -0.32, 0.44);
      this.grpSensors.add(irBar);

      const beamGeo = new THREE.PlaneGeometry(3.2, 0.02);
      this.meshSensorBeam = new THREE.Mesh(beamGeo, this.materials.sensorBeamMat);
      this.meshSensorBeam.position.set(0, -0.32, 0.45);
      this.grpSensors.add(this.meshSensorBeam);

      const mcuGeo = new THREE.BoxGeometry(0.38, 0.26, 0.12);
      const mcuBox = new THREE.Mesh(mcuGeo, this.materials.frameDark);
      mcuBox.position.set(0, -0.25, 0.18);
      this.grpSensors.add(mcuBox);

      const ledHousingGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.05, 16);
      const ledHousing = new THREE.Mesh(ledHousingGeo, this.materials.brassGold);
      ledHousing.rotation.x = Math.PI / 2;
      ledHousing.position.set(0.46, 0.12, 0.38);
      this.grpSensors.add(ledHousing);

      const ledLensGeo = new THREE.SphereGeometry(0.038, 16, 16);
      this.meshStatusLed = new THREE.Mesh(ledLensGeo, this.materials.statusLedGreen);
      this.meshStatusLed.position.set(0.46, 0.12, 0.41);
      this.grpSensors.add(this.meshStatusLed);

      const s4X = startX + 3 * spindlePitch;
      const s4BeaconGeo = new THREE.SphereGeometry(0.05, 16, 16);
      this.meshAlertSpindle4 = new THREE.Mesh(s4BeaconGeo, this.materials.statusLedRed);
      this.meshAlertSpindle4.position.set(s4X, -0.2, 0.52);
      this.meshAlertSpindle4.visible = false;
      this.grpSensors.add(this.meshAlertSpindle4);

      this.grpDisplay = new THREE.Group();
      this.grpDisplay.position.set(0, -0.05, 0.32);

      const dashFrameGeo = new THREE.BoxGeometry(0.9, 0.52, 0.08);
      const dashFrame = new THREE.Mesh(dashFrameGeo, this.materials.frameDark);
      this.grpDisplay.add(dashFrame);

      const screenGeo = new THREE.PlaneGeometry(0.8, 0.42);
      this.meshDisplayScreen = new THREE.Mesh(screenGeo, this.materials.displayScreen);
      this.meshDisplayScreen.position.set(0, 0, 0.045);
      this.grpDisplay.add(this.meshDisplayScreen);

      this.grpSensors.add(this.grpDisplay);

      this.modelRoot.add(this.grpSensors);
      this.highlightGroups['rpmSensor'] = this.grpSensors;
      this.highlightGroups['spindleSensors'] = this.grpSensors;
      this.highlightGroups['mcuBox'] = this.grpSensors;
      this.highlightGroups['statusLed'] = this.meshStatusLed;
      this.highlightGroups['alertSpindle4'] = this.meshAlertSpindle4;
      this.highlightGroups['display'] = this.grpDisplay;

      this.scene.add(this.modelRoot);
    }

    initPowerAndDataTrails() {
      // 1. MECHANICAL POWER TORQUE FLOW PATH (Handwheel/Pedal -> Clutch -> Flywheel -> Gears -> Rollers -> Spindles)
      const powerPoints = [
        new THREE.Vector3(1.95, 0.22, 0.1),
        new THREE.Vector3(1.95, -0.2, -0.05),
        new THREE.Vector3(1.25, -0.2, -0.05),
        new THREE.Vector3(0.65, -0.2, -0.05),
        new THREE.Vector3(1.75, 0.22, 0),
        new THREE.Vector3(0, 0.28, 0.11),
        new THREE.Vector3(0, -0.62, 0.32)
      ];
      const powerCurve = new THREE.CatmullRomCurve3(powerPoints);
      const powerTubeGeo = new THREE.TubeGeometry(powerCurve, 64, 0.02, 8, false);
      this.meshPowerTrail = new THREE.Mesh(powerTubeGeo, this.materials.powerFlowMat);
      this.meshPowerTrail.visible = false;
      this.scene.add(this.meshPowerTrail);

      // 2. MONITORING DATA PULSE PATH (Sensors -> MCU -> LED -> Display)
      const dataPoints = [
        new THREE.Vector3(1.0, -0.2, 0.1),
        new THREE.Vector3(0, -0.32, 0.44),
        new THREE.Vector3(0, -0.25, 0.18),
        new THREE.Vector3(0.46, 0.12, 0.41),
        new THREE.Vector3(0, -0.05, 0.32)
      ];
      const dataCurve = new THREE.CatmullRomCurve3(dataPoints);
      const dataTubeGeo = new THREE.TubeGeometry(dataCurve, 48, 0.016, 8, false);
      this.meshDataTrail = new THREE.Mesh(dataTubeGeo, this.materials.dataFlowMat);
      this.meshDataTrail.visible = false;
      this.scene.add(this.meshDataTrail);
    }

    initRaycaster() {
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      this.container.addEventListener('click', (e) => {
        if (!this.isExploreMode) return;
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.modelRoot.children, true);

        if (intersects.length > 0) {
          this.handleExploreInspect(intersects[0].object);
        }
      });
    }

    handleExploreInspect(obj) {
      // Find parent group
      let p = obj;
      while (p.parent && p.parent !== this.modelRoot) {
        p = p.parent;
      }

      if (p === this.grpInput) {
        this.setExploreCard('Hand Crank & Pedal Input', 'Manual human input converts rotation or pedal oscillation into primary drive torque without any electric motor.');
      } else if (p === this.grpGearingRight) {
        this.setExploreCard('1:10.8 Step-Up Gear Train', 'Precision right-side spur and pinion gears accelerate shaft rotational speed to drive drafting rollers and spindles.');
      } else if (p === this.grpDrafting) {
        this.setExploreCard('4 Inclined Drafting Arms & Orange Cots', 'Spring-loaded drafting arms draft cotton roving down into fine thread with controlled elongation.');
      } else if (p === this.grpSpindles) {
        this.setExploreCard('8 Lower Spinning Spindles', 'Eight lower vertical spindles synchronously rotate at 650 RPM, winding uniform Khadi yarn onto bobbins.');
      } else if (p === this.grpSensors) {
        this.setExploreCard('Smart Telemetry & Status LED', 'Non-contact optical and IR sensors monitor rotational speed and yarn breaks, streaming live telemetry into the display.');
      }
    }

    setExploreCard(title, desc) {
      const elTitle = document.getElementById('hiwStepTitle');
      const elDesc = document.getElementById('hiwStepDesc');
      const elTagline = document.getElementById('hiwStepTagline');
      if (elTitle) elTitle.textContent = `🔍 ${title}`;
      if (elTagline) elTagline.textContent = 'Interactive Component Inspection';
      if (elDesc) elDesc.textContent = desc;
    }

    setCameraTarget(pos, target, dur = 1000) {
      this.camTargetPos = new THREE.Vector3(pos.x, pos.y, pos.z);
      this.camTargetLookAt = new THREE.Vector3(target.x, target.y, target.z);
      this.camTransitionStart = performance.now();
      this.camTransitionDur = dur;
      this.camStartPos = this.camera.position.clone();
      this.camStartLookAt = this.controls ? this.controls.target.clone() : new THREE.Vector3(0, 0, 0);
      this.isCamTransitioning = true;
    }

    goToStep(index, autoPlayNext = false) {
      if (index < 0) index = 0;
      if (index >= PROCESS_STEPS.length) index = 0;

      this.currentStepIdx = index;
      const step = PROCESS_STEPS[index];

      this.updateStepUI(step);
      this.setCameraTarget(step.camPos, step.camTarget, 1200);
      this.handleStepVisuals(step);

      if (this.tourTimeout) clearTimeout(this.tourTimeout);
      if (this.isPlaying && this.isAutoTour) {
        const stepDur = (step.duration || 4000) / this.speedMultiplier;
        this.tourTimeout = setTimeout(() => {
          if (this.isPlaying && this.isAutoTour) {
            this.goToStep((this.currentStepIdx + 1) % PROCESS_STEPS.length, true);
          }
        }, stepDur);
      }
    }

    handleStepVisuals(step) {
      Object.keys(this.highlightGroups).forEach(key => {
        const grp = this.highlightGroups[key];
        if (grp) {
          grp.traverse(child => {
            if (child.isMesh && child.material && child.material.emissive) {
              if (child !== this.meshStatusLed && child !== this.meshAlertSpindle4 && child !== this.meshDisplayScreen) {
                child.material.emissiveIntensity = 0.2;
              }
            }
          });
        }
      });

      if (step.highlightComps) {
        step.highlightComps.forEach(key => {
          const grp = this.highlightGroups[key];
          if (grp) {
            grp.traverse(child => {
              if (child.isMesh && child.material && child.material.emissive) {
                child.material.emissiveIntensity = 0.85;
              }
            });
          }
        });
      }

      if (step.id === 'alert') {
        this.simulateYarnBreak();
      } else if (!this.isBreakSimulated) {
        this.resetAlert();
      }
    }

    updateStepUI(step) {
      document.querySelectorAll('.hiw-step-pill').forEach((pill, idx) => {
        if (idx === this.currentStepIdx) {
          pill.classList.add('active');
          pill.setAttribute('aria-selected', 'true');
        } else {
          pill.classList.remove('active');
          pill.setAttribute('aria-selected', 'false');
        }
      });

      const progressPercent = ((this.currentStepIdx + 1) / PROCESS_STEPS.length) * 100;
      const progressFill = document.getElementById('hiwProgressBarFill');
      if (progressFill) progressFill.style.width = `${progressPercent}%`;

      const elBadge = document.getElementById('hiwStepBadge');
      const elNum = document.getElementById('hiwStepNum');
      const elTitle = document.getElementById('hiwStepTitle');
      const elTagline = document.getElementById('hiwStepTagline');
      const elDesc = document.getElementById('hiwStepDesc');
      const elFlow = document.getElementById('hiwStepFlow');
      const elStats = document.getElementById('hiwStepStatsGrid');

      if (elBadge) {
        elBadge.textContent = step.badge;
        elBadge.className = `hiw-badge hiw-badge-${step.badgeType}`;
      }
      if (elNum) elNum.textContent = `STEP ${step.stepNum}`;
      if (elTitle) elTitle.textContent = `${step.icon} ${step.title}`;
      if (elTagline) elTagline.textContent = step.tagline;
      if (elDesc) elDesc.textContent = step.desc;
      if (elFlow) elFlow.textContent = step.flowFormula;

      if (elStats && step.stats) {
        elStats.innerHTML = step.stats.map(s => `
          <div class="hiw-stat-chip">
            <span class="hiw-stat-chip-label">${s.label}</span>
            <span class="hiw-stat-chip-val">${s.val}</span>
          </div>
        `).join('');
      }

      const elHudStep = document.getElementById('hiwHudStepIndicator');
      if (elHudStep) {
        elHudStep.textContent = `STEP ${step.stepNum} OF 08: ${step.title.toUpperCase()}`;
      }
    }

    setInputDriveMode(mode) {
      this.inputDriveMode = mode;
      const btnCrank = document.getElementById('hiwBtnDriveCrank');
      const btnPedal = document.getElementById('hiwBtnDrivePedal');
      const btnCrankSplash = document.getElementById('hiwBtnDriveCrankSplash');
      const btnPedalSplash = document.getElementById('hiwBtnDrivePedalSplash');

      if (btnCrank) btnCrank.classList.toggle('active', mode === 'crank');
      if (btnPedal) btnPedal.classList.toggle('active', mode === 'pedal');
      if (btnCrankSplash) btnCrankSplash.classList.toggle('active', mode === 'crank');
      if (btnPedalSplash) btnPedalSplash.classList.toggle('active', mode === 'pedal');

      if (mode === 'crank') {
        this.setCameraTarget({ x: 3.8, y: 1.1, z: 2.2 }, { x: 1.7, y: -0.1, z: 0.1 }, 1000);
      } else {
        this.setCameraTarget({ x: 0.0, y: -0.8, z: 2.8 }, { x: 0.0, y: -1.2, z: 0.2 }, 1000);
      }
    }

    toggleXRayMode() {
      this.isXRayMode = !this.isXRayMode;
      const btn = document.getElementById('hiwBtnXRay');
      if (btn) btn.classList.toggle('active', this.isXRayMode);

      this.materials.frameDark.opacity = this.isXRayMode ? 0.22 : 1.0;
      this.meshPowerTrail.visible = this.isXRayMode || (this.activeFlowMode === 'power');
    }

    toggleDataOverlay() {
      this.isDataOverlay = !this.isDataOverlay;
      const btn = document.getElementById('hiwBtnDataOverlay');
      const overlayEl = document.getElementById('hiwFloatingDataOverlay');
      if (btn) btn.classList.toggle('active', this.isDataOverlay);
      if (overlayEl) overlayEl.style.display = this.isDataOverlay ? 'flex' : 'none';
    }

    toggleExploreMode() {
      this.isExploreMode = !this.isExploreMode;
      const btn = document.getElementById('hiwBtnExplore');
      if (btn) btn.classList.toggle('active', this.isExploreMode);

      if (this.isExploreMode) {
        this.setExploreCard('Explore Mode Active', 'Click any component on the 3D model to inspect its CAD engineering details and motion mechanics.');
      }
    }

    simulateYarnBreak() {
      this.isBreakSimulated = true;
      this.meshStatusLed.material = this.materials.statusLedRed;
      this.meshAlertSpindle4.visible = true;
      if (this.spindleCaps[3]) this.spindleCaps[3].material = this.materials.statusLedRed;
      if (this.spindleYarnTubes[3]) this.spindleYarnTubes[3].scale.set(1, 0.35, 1);

      const statusWidget = document.getElementById('hiwLiveTelemetryStatus');
      if (statusWidget) {
        statusWidget.innerHTML = `<span style="color:#ef4444; font-weight:800;">🚨 ALERT: YARN BREAK ON SPINDLE 04 (PAUSED)</span>`;
      }
    }

    resetAlert() {
      this.isBreakSimulated = false;
      this.meshStatusLed.material = this.materials.statusLedGreen;
      this.meshAlertSpindle4.visible = false;
      if (this.spindleCaps[3]) this.spindleCaps[3].material = this.materials.capRed;
      if (this.spindleYarnTubes[3]) this.spindleYarnTubes[3].scale.set(1, 1.0, 1);

      const statusWidget = document.getElementById('hiwLiveTelemetryStatus');
      if (statusWidget) {
        statusWidget.innerHTML = `<span style="color:#10b981; font-weight:800;">● ALL 8 SPINDLES ACTIVE (650 RPM)</span>`;
      }
    }

    toggleExplodedView() {
      this.isExploded = !this.isExploded;
      const btn = document.getElementById('hiwBtnExplode');
      if (btn) {
        btn.textContent = this.isExploded ? 'ASSEMBLE MACHINE' : 'EXPLODED VIEW';
        btn.classList.toggle('active', this.isExploded);
      }
    }

    setFlowMode(mode) {
      if (this.activeFlowMode === mode) {
        this.activeFlowMode = null;
      } else {
        this.activeFlowMode = mode;
      }

      this.meshPowerTrail.visible = (this.activeFlowMode === 'power') || this.isXRayMode;
      this.meshDataTrail.visible = (this.activeFlowMode === 'data');

      const btnP = document.getElementById('hiwBtnFollowPower');
      const btnD = document.getElementById('hiwBtnFollowData');
      if (btnP) btnP.classList.toggle('active', this.activeFlowMode === 'power');
      if (btnD) btnD.classList.toggle('active', this.activeFlowMode === 'data');

      if (this.activeFlowMode === 'power') {
        this.setCameraTarget({ x: 3.2, y: 1.8, z: 4.5 }, { x: 0, y: 0.1, z: 0 }, 1000);
      } else if (this.activeFlowMode === 'data') {
        this.setCameraTarget({ x: 0.6, y: 1.2, z: 3.2 }, { x: 0.0, y: 0.0, z: 0.3 }, 1000);
      }
    }

    startProcess() {
      const splash = document.getElementById('hiwStartSplash');
      if (splash) splash.classList.add('hiw-hidden');

      this.isPlaying = true;
      this.updatePlayPauseBtn();
      this.goToStep(0, true);
    }

    togglePlayPause() {
      this.isPlaying = !this.isPlaying;
      this.updatePlayPauseBtn();

      if (this.isPlaying) {
        this.goToStep(this.currentStepIdx, true);
      } else {
        if (this.tourTimeout) clearTimeout(this.tourTimeout);
      }
    }

    restartProcess() {
      if (this.tourTimeout) clearTimeout(this.tourTimeout);
      this.resetAlert();
      this.isPlaying = true;
      this.updatePlayPauseBtn();
      this.goToStep(0, true);
    }

    updatePlayPauseBtn() {
      const btn = document.getElementById('hiwBtnPlayPause');
      if (btn) {
        btn.innerHTML = this.isPlaying ? '<span>⏸</span> PAUSE' : '<span>▶</span> PLAY';
        btn.classList.toggle('is-playing', this.isPlaying);
      }
    }

    resetCadView() {
      this.setCameraTarget({ x: 5.6, y: 3.6, z: 6.0 }, { x: 0, y: 0.1, z: 0 }, 1000);
    }

    bindUI() {
      const btnStart = document.getElementById('hiwBtnStartProcess');
      if (btnStart) btnStart.addEventListener('click', () => this.startProcess());

      const btnExploreSplash = document.getElementById('hiwBtnExploreSplash');
      if (btnExploreSplash) {
        btnExploreSplash.addEventListener('click', () => {
          const splash = document.getElementById('hiwStartSplash');
          if (splash) splash.classList.add('hiw-hidden');
          this.toggleExploreMode();
        });
      }

      // Hand Crank vs Foot Pedal Drive Selectors
      const btnDriveCrank = document.getElementById('hiwBtnDriveCrank');
      if (btnDriveCrank) btnDriveCrank.addEventListener('click', () => this.setInputDriveMode('crank'));

      const btnDrivePedal = document.getElementById('hiwBtnDrivePedal');
      if (btnDrivePedal) btnDrivePedal.addEventListener('click', () => this.setInputDriveMode('pedal'));

      const btnDriveCrankSplash = document.getElementById('hiwBtnDriveCrankSplash');
      if (btnDriveCrankSplash) btnDriveCrankSplash.addEventListener('click', () => this.setInputDriveMode('crank'));

      const btnDrivePedalSplash = document.getElementById('hiwBtnDrivePedalSplash');
      if (btnDrivePedalSplash) btnDrivePedalSplash.addEventListener('click', () => this.setInputDriveMode('pedal'));

      const btnPlayPause = document.getElementById('hiwBtnPlayPause');
      if (btnPlayPause) btnPlayPause.addEventListener('click', () => this.togglePlayPause());

      const btnRestart = document.getElementById('hiwBtnRestart');
      if (btnRestart) btnRestart.addEventListener('click', () => this.restartProcess());

      const btnPrev = document.getElementById('hiwBtnPrevStep');
      if (btnPrev) {
        btnPrev.addEventListener('click', () => {
          this.goToStep((this.currentStepIdx - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length);
        });
      }

      const btnNext = document.getElementById('hiwBtnNextStep');
      if (btnNext) {
        btnNext.addEventListener('click', () => {
          this.goToStep((this.currentStepIdx + 1) % PROCESS_STEPS.length);
        });
      }

      // Feature buttons
      const btnPower = document.getElementById('hiwBtnFollowPower');
      if (btnPower) btnPower.addEventListener('click', () => this.setFlowMode('power'));

      const btnData = document.getElementById('hiwBtnFollowData');
      if (btnData) btnData.addEventListener('click', () => this.setFlowMode('data'));

      const btnExplode = document.getElementById('hiwBtnExplode');
      if (btnExplode) btnExplode.addEventListener('click', () => this.toggleExplodedView());

      const btnXRay = document.getElementById('hiwBtnXRay');
      if (btnXRay) btnXRay.addEventListener('click', () => this.toggleXRayMode());

      const btnDataOverlay = document.getElementById('hiwBtnDataOverlay');
      if (btnDataOverlay) btnDataOverlay.addEventListener('click', () => this.toggleDataOverlay());

      const btnExplore = document.getElementById('hiwBtnExplore');
      if (btnExplore) btnExplore.addEventListener('click', () => this.toggleExploreMode());

      const btnSimBreak = document.getElementById('hiwBtnSimBreak');
      if (btnSimBreak) btnSimBreak.addEventListener('click', () => this.simulateYarnBreak());

      const btnResetBreak = document.getElementById('hiwBtnResetBreak');
      if (btnResetBreak) btnResetBreak.addEventListener('click', () => this.resetAlert());

      const btnAutoTour = document.getElementById('hiwBtnAutoTour');
      const btnStepByStep = document.getElementById('hiwBtnStepByStep');

      if (btnAutoTour && btnStepByStep) {
        btnAutoTour.addEventListener('click', () => {
          this.isAutoTour = true;
          btnAutoTour.classList.add('active');
          btnStepByStep.classList.remove('active');
          if (this.isPlaying) this.goToStep(this.currentStepIdx, true);
        });

        btnStepByStep.addEventListener('click', () => {
          this.isAutoTour = false;
          btnStepByStep.classList.add('active');
          btnAutoTour.classList.remove('active');
          if (this.tourTimeout) clearTimeout(this.tourTimeout);
        });
      }

      document.querySelectorAll('.hiw-speed-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.hiw-speed-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.speedMultiplier = parseFloat(btn.getAttribute('data-speed')) || 1.0;
        });
      });

      document.querySelectorAll('.hiw-step-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const stepIndex = parseInt(pill.getAttribute('data-step-index'), 10);
          if (!isNaN(stepIndex)) {
            const splash = document.getElementById('hiwStartSplash');
            if (splash) splash.classList.add('hiw-hidden');
            this.goToStep(stepIndex);
          }
        });
      });

      document.querySelectorAll('.hiw-cam-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const view = btn.getAttribute('data-view');
          if (view === 'iso') this.resetCadView();
          else if (view === 'crank') this.setCameraTarget({ x: 3.8, y: 1.1, z: 2.2 }, { x: 1.7, y: -0.1, z: 0.1 }, 1000);
          else if (view === 'gears') this.setCameraTarget({ x: 3.2, y: 1.3, z: 2.0 }, { x: 1.4, y: 0.2, z: 0.1 }, 1000);
          else if (view === 'spindles') this.setCameraTarget({ x: 0, y: -0.05, z: 3.4 }, { x: 0, y: -0.38, z: 0.4 }, 1000);
          else if (view === 'display') this.setCameraTarget({ x: 0, y: 0.18, z: 2.1 }, { x: 0, y: -0.05, z: 0.3 }, 1000);
        });
      });

      const btnResetCam = document.getElementById('hiwBtnResetCam');
      if (btnResetCam) btnResetCam.addEventListener('click', () => this.resetCadView());
    }

    animate() {
      requestAnimationFrame(this.animate);

      const baseSpeed = 0.04 * this.speedMultiplier;
      this.rotAngle += baseSpeed;
      this.pedalPhase += baseSpeed * 1.5;
      this.pulseOffset += 0.05;

      // 1. Dual-Input Animation: Crank Rotation vs Foot Pedal Oscillation
      if (this.inputDriveMode === 'crank') {
        if (this.rotorHandwheel) this.rotorHandwheel.rotation.x = this.rotAngle;
        if (this.meshPushRod) this.meshPushRod.position.y = 0.6 + Math.sin(this.rotAngle) * 0.05;
      } else {
        // Foot pedal oscillating
        const pedalY = Math.sin(this.pedalPhase) * 0.08;
        if (this.meshPedalPlate) this.meshPedalPlate.position.y = pedalY;
        if (this.meshPushRod) this.meshPushRod.position.y = 0.6 + pedalY * 0.8;
        if (this.rotorHandwheel) this.rotorHandwheel.rotation.x = this.rotAngle;
      }

      // 2. Main Transmission Shaft & Inertial Flywheel
      if (this.meshMainShaft) this.meshMainShaft.rotation.x = this.rotAngle;
      if (this.rotorFlywheel) this.rotorFlywheel.rotation.x = this.rotAngle * 1.5;

      // 3. Right Spur Gear Train Rotation
      if (this.rotorGearRightMain) this.rotorGearRightMain.rotation.x = this.rotAngle;
      if (this.rotorGearRightPinion) this.rotorGearRightPinion.rotation.x = -this.rotAngle * 2.8;

      // 4. Cylindrical Drive Rollers Rotation
      if (this.draftingRollers && this.draftingRollers.length > 0) {
        this.draftingRollers.forEach(r => {
          r.rotation.x = this.rotAngle * 1.8;
        });
      }

      // 5. Synchronized Spindle Rotation (All 8 Spindles Spinning!)
      if (this.spindleRotors && this.spindleRotors.length > 0) {
        this.spindleRotors.forEach((spindle, idx) => {
          if (this.isBreakSimulated && idx === 3) {
            spindle.rotation.y += baseSpeed * 0.4;
          } else {
            spindle.rotation.y += baseSpeed * 8.0;
          }
        });
      }

      // 6. Dynamic LED & Beam Flashing
      if (this.meshStatusLed && this.isBreakSimulated) {
        this.meshStatusLed.material.emissiveIntensity = 0.8 + 0.8 * Math.sin(this.pulseOffset * 6);
      }
      if (this.meshAlertSpindle4 && this.isBreakSimulated) {
        this.meshAlertSpindle4.material.emissiveIntensity = 0.9 + 0.9 * Math.sin(this.pulseOffset * 6);
      }
      if (this.meshSensorBeam) {
        this.meshSensorBeam.material.opacity = 0.4 + 0.3 * Math.sin(this.pulseOffset * 3);
      }
      if (this.meshFlywheelHalo) {
        this.meshFlywheelHalo.material.emissiveIntensity = 0.6 + 0.3 * Math.sin(this.pulseOffset * 2);
      }

      // 7. Exploded CAD Smooth Lerp
      this.explodedGroups.forEach(grp => {
        const target = this.isExploded ? grp.userData.explodePos : grp.userData.normalPos;
        grp.position.lerp(target, 0.08);
      });

      // 8. Smooth Camera Transition
      if (this.isCamTransitioning) {
        const elapsed = performance.now() - this.camTransitionStart;
        const t = Math.min(elapsed / this.camTransitionDur, 1.0);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        this.camera.position.lerpVectors(this.camStartPos, this.camTargetPos, ease);
        if (this.controls) this.controls.target.lerpVectors(this.camStartLookAt, this.camTargetLookAt, ease);
        if (t >= 1.0) this.isCamTransitioning = false;
      }

      if (this.controls) this.controls.update();

      this.renderer.render(this.scene, this.camera);
    }
  }

  function initHowItWorks3D() {
    const container = document.getElementById('hiwCanvasContainer');
    if (!container) return;
    window.howItWorksEngine = new HowItWorks3DEngine('hiwCanvasContainer');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHowItWorks3D);
  } else {
    initHowItWorks3D();
  }
})();
