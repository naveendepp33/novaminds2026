/**
 * SMART KHADHI CHAKRA - FLYWHEEL ENERGY MANAGEMENT 3D STUDIO
 * Dedicated Interactive 3D CAD Visualization for Core Mechanical Innovation
 * 
 * Complete Physical Energy Flow:
 * MANUAL INPUT -> DRIVE MECHANISM -> FLYWHEEL ROTATION -> MECHANICAL ENERGY STORAGE ->
 * CONTROLLED ENERGY RELEASE / SMOOTHING -> DYNAMO -> ELECTRICAL ENERGY -> BATTERY / ELECTRONICS
 * 
 * SIH26020 - Team NOVAMINDS
 */

(function () {
  'use strict';

  // --- 7-STAGE ENERGY FLOW SPECIFICATION ---
  const FLYWHEEL_STAGES = [
    {
      id: 'manual-input',
      stepNum: '01',
      title: 'Manual Input',
      badge: 'HUMAN EFFORT INPUT',
      icon: '🖐️',
      tagline: 'Artisan Manual Drive: Ergonomic Hand Crank or Foot Treadle',
      desc: 'Rotational power originates from 100% manual human effort. Natural hand cranking or foot pedaling generates cyclical torque pulses with natural dead-center speed dips.',
      flowFormula: 'ARTISAN EFFORT ➔ HAND CRANK / TREADLE ROCKER ➔ INPUT SHAFT',
      highlightComps: ['handWheelGroup', 'footPedalGroup'],
      camPos: { x: 3.6, y: 1.4, z: 2.8 },
      camTarget: { x: 1.5, y: 0.1, z: 0.0 },
      stats: [
        { label: 'Input Source', val: 'Artisan Manual Drive' },
        { label: 'Cadence Range', val: '50 – 70 RPM' },
        { label: 'Torque Fluctuation', val: '± 32% (Pulsating)' },
        { label: 'Dead-Center Dips', val: '2 Dips per Cycle' }
      ]
    },
    {
      id: 'mechanical-drive',
      stepNum: '02',
      title: 'Mechanical Drive',
      badge: 'PRIMARY DRIVE AXLE',
      icon: '🔩',
      tagline: 'Precision Ground Shaft & Pillow Block Bearings',
      desc: 'The Ø 20mm hardened steel drive shaft is supported by heavy-duty pillow-block ball bearings (UCP204), transmitting human mechanical torque directly to the flywheel hub.',
      flowFormula: 'MANUAL INPUT ➔ Ø20mm GROUND SHAFT ➔ PILLOW BLOCK BEARINGS ➔ FLYWHEEL HUB',
      highlightComps: ['inputShaftGroup', 'bearingLeftGroup'],
      camPos: { x: 2.2, y: 1.1, z: 2.2 },
      camTarget: { x: 0.8, y: 0.1, z: 0.0 },
      stats: [
        { label: 'Shaft Diameter', val: 'Ø 20mm Hardened Steel' },
        { label: 'Bearing Type', val: 'Pillow Block UCP204' },
        { label: 'Dynamic Load Rating', val: '12.8 kN Dynamic' },
        { label: 'Shaft Alignment', val: 'Zero-Deflection Ground Axle' }
      ]
    },
    {
      id: 'flywheel-rotor',
      stepNum: '03',
      title: 'Flywheel',
      badge: 'KINETIC ENERGY STORAGE',
      icon: '⚙️',
      tagline: 'Heavy Rim-Weighted Alloy Inertia Mass (Ek = ½·I·ω²)',
      desc: 'A massive 2.8 kg cast alloy flywheel rotates on its central axis. Concentrated rim mass maximizes rotational inertia to store mechanical kinetic energy during active strokes.',
      flowFormula: 'SHAFT ROTATIONAL TORQUE ➔ SOLID FLYWHEEL HUB ➔ ROTATIONAL MASS ACCELERATION (Ek = 38.4 J)',
      highlightComps: ['flywheelGroup'],
      camPos: { x: 0.0, y: 1.0, z: 2.8 },
      camTarget: { x: 0.0, y: 0.2, z: 0.0 },
      stats: [
        { label: 'Flywheel Mass', val: '2.8 kg Rim-Weighted' },
        { label: 'Moment of Inertia', val: 'I = 0.048 kg·m²' },
        { label: 'Stored Kinetic Energy', val: '38.4 Joules @ 65 RPM' },
        { label: 'Rim Concentration', val: '82% Mass at Perimeter' }
      ]
    },
    {
      id: 'energy-smoothing',
      stepNum: '04',
      title: 'Energy Storage & Smoothing',
      badge: 'TORQUE RIPPLE ABSORPTION',
      icon: '⚖️',
      tagline: 'Dampens Speed Fluctuations from ±32% down to ±3.4%',
      desc: 'During dead-center pauses in the artisan’s stroke, stored kinetic momentum continuously carries the shaft forward, delivering uniform, smooth rotational power.',
      flowFormula: 'VARIABLE CADENCE (±32%) ➔ INERTIAL MOMENTUM BUFFER ➔ STABILIZED ROTATION (±3.4%)',
      highlightComps: ['flywheelGroup', 'clutchGroup', 'outputShaftGroup'],
      camPos: { x: -0.6, y: 1.1, z: 2.4 },
      camTarget: { x: -0.2, y: 0.2, z: 0.0 },
      stats: [
        { label: 'Torque Ripple Absorbed', val: '78.4% Peak Smoothing' },
        { label: 'Angular Accel. Ripple', val: '< 1.2 rad/s²' },
        { label: 'Velocity Stability', val: '± 3.4% Constant' },
        { label: 'Artisan Fatigue Cut', val: '35% Less Strain' }
      ]
    },
    {
      id: 'dynamo-generator',
      stepNum: '05',
      title: 'Dynamo / Generator',
      badge: 'MECHANICAL TO ELECTRICAL CONVERSION',
      icon: '⚡',
      tagline: 'Miniature High-Efficiency Dynamo Driven by Smoothed Shaft',
      desc: 'A small dynamo/generator is coupled to the smoothed drive shaft via a miniature 1:6 step-up belt. Electromagnetic induction converts a small portion of mechanical rotation into stable 5.2V DC electricity.',
      flowFormula: 'SMOOTH SHAFT ROTATION ➔ 1:6 STEP-UP BELT ➔ DYNAMO ROTOR ➔ 5.2V DC ELECTRICAL OUTPUT',
      highlightComps: ['dynamoGroup'],
      camPos: { x: -0.8, y: 0.8, z: 1.8 },
      camTarget: { x: -0.5, y: -0.1, z: 0.3 },
      stats: [
        { label: 'Generator Type', val: 'High-Efficiency DC Dynamo' },
        { label: 'Step-Up Drive Ratio', val: '1 : 6 Timing Pulley' },
        { label: 'Electrical Generation', val: '5.2 V DC @ 380 mA' },
        { label: 'Power Output', val: '1.95 W Continuous' }
      ]
    },
    {
      id: 'battery-buffer',
      stepNum: '06',
      title: 'Battery',
      badge: 'RECHARGEABLE ENERGY STORAGE',
      icon: '🔋',
      tagline: 'Rechargeable Buffer Battery & Power Conditioning Circuit',
      desc: 'Generated electricity flows through insulated wiring to a compact rechargeable LiFePO4 battery pack and power management module, buffering energy for electronic sensors.',
      flowFormula: 'DYNAMO 5.2V DC ➔ POWER CONDITIONER ➔ RECHARGEABLE BUFFER PACK (3.7V / 1200mAh)',
      highlightComps: ['batteryGroup'],
      camPos: { x: 0.3, y: 0.6, z: 1.8 },
      camTarget: { x: 0.3, y: -0.2, z: 0.4 },
      stats: [
        { label: 'Battery Cell', val: 'LiFePO4 Safe Buffer Pack' },
        { label: 'Capacity Rating', val: '3.7V / 1,200 mAh' },
        { label: 'Charge Controller', val: 'Autonomous CC/CV IC' },
        { label: 'System Isolation', val: 'Powers Electronics Only' }
      ]
    },
    {
      id: 'electronics-telemetry',
      stepNum: '07',
      title: 'Low-Power Electronics',
      badge: 'SMART SENSORS & TELEMETRY',
      icon: '📡',
      tagline: 'RPM Optical Encoder, Tension Sensor & IoT Telemetry MCU',
      desc: 'Buffered battery power energizes the project’s low-power smart electronics: optical shaft tachometer, sliver tension transducer, and microcontroller telemetry board. The charkha itself remains 100% manually operated.',
      flowFormula: 'BATTERY BUFFER ➔ 3.3V LDO REGULATOR ➔ OPTICAL SENSORS & TELEMETRY MCU',
      highlightComps: ['electronicsGroup', 'sensorGroup'],
      camPos: { x: 0.8, y: 0.7, z: 1.8 },
      camTarget: { x: 0.7, y: -0.1, z: 0.35 },
      stats: [
        { label: 'Operating Voltage', val: '3.3 V Ultra-Low Power' },
        { label: 'Telemetry MCU Draw', val: '18 mA Active / 2.5 mA Sleep' },
        { label: 'Optical Tachometer', val: 'Infrared Slotted Encoder' },
        { label: 'Machine Mechanism', val: '100% Artisan Manual Drive' }
      ]
    }
  ];

  // Component Technical Inspection Details
  const COMPONENT_DETAILS = {
    inputCrank: {
      name: 'Ergonomic Manual Hand Crank / Treadle Linkage',
      spec: 'Balanced dual-bearing crank wheel with polished rosewood handle & floor treadle linkage.',
      function: 'Receives physical effort directly from the artisan (50–70 RPM) and drives the main transmission axle.'
    },
    inputShaft: {
      name: 'Primary Hardened Steel Input Shaft',
      spec: 'Ø 20mm Grade 4140 precision-ground steel with parallel keyway.',
      function: 'Transfers manual mechanical torque through pillow-block bearings to the central flywheel hub.'
    },
    bearingLeft: {
      name: 'Input Heavy-Duty Pillow Block Bearing (UCP204)',
      spec: 'Self-aligning cast iron housing with deep-groove ball bearing, dynamic load 12.8 kN.',
      function: 'Firmly anchors the drive axle to the rigid chassis, absorbing radial manual cranking thrust.'
    },
    flywheelRotor: {
      name: 'Cast Alloy Rim-Weighted Inertia Flywheel Rotor',
      spec: '2.8 kg Cast Chrome-Moly Alloy, 240mm diameter with 82% mass concentrated at outer rim (I = 0.048 kg·m²).',
      function: 'Stores kinetic energy during peak manual strokes (Ek = 38.4 J) and delivers continuous momentum during dead centers.'
    },
    clutchCoupling: {
      name: 'Overrunning Sprag Freewheel Clutch & Smoothed Shaft',
      spec: 'Zero-backlash sprag roller clutch rated for 15 N·m dynamic torque.',
      function: 'Permits the flywheel to coast smoothly without back-driving or snatching the artisan’s hand.'
    },
    dynamoUnit: {
      name: 'Precision Miniature Dynamo / Permanent Magnet Generator',
      spec: 'High-efficiency low-cogging DC generator with neodymium stator and copper windings, 1:6 step-up belt drive.',
      function: 'Transduces a small fraction of smoothed mechanical rotation into 5.2V DC / 1.95W electrical energy.'
    },
    batteryPack: {
      name: 'Rechargeable LiFePO4 Energy Buffer & Charge IC',
      spec: '3.7V 1,200 mAh Lithium Iron Phosphate cell with integrated buck-boost charge management module.',
      function: 'Buffers generated electrical energy from the dynamo, providing clean 3.3V DC power exclusively to the telemetry electronics.'
    },
    electronicsModule: {
      name: 'Low-Power Smart Telemetry & Sensor Subsystem',
      spec: 'ESP32 IoT microcontroller board, infrared optical RPM encoder, and thread tension transducer.',
      function: 'Continuously monitors spindle speed, yarn tension, and artisan productivity in real time.'
    },
    spindleTrain: {
      name: '8-Spindle Precision Spinning Load Array',
      spec: '1:18.5 Step-up spur gear train driving 8 vertical high-speed spinning spindles.',
      function: 'Receives stabilized pulse-free rotational power to draft and twist cotton sliver into flawless Khadi yarn.'
    }
  };

  // State Management
  const state = {
    isRunning: true,
    inputMode: 'hand', // 'hand' or 'pedal'
    speedMultiplier: 1.0,
    currentStageIndex: 0,
    showParticles: true,
    cameraView: 'isometric',
    manualCadenceRpm: 65.0,
    flywheelRpm: 65.0,
    flywheelEnergyJ: 38.4,
    dynamoVoltage: 5.2,
    dynamoPower: 1.95,
    spindleRpm: 1202,
    time: 0,
    waveData: []
  };

  // Three.js Core References
  let scene, camera, renderer, controls;
  let animFrameId = null;
  let clock = new THREE.Clock();

  // Mesh Groups
  const groups = {
    world: null,
    baseFrame: null,
    handWheelGroup: null,
    footPedalGroup: null,
    inputShaftGroup: null,
    bearingLeftGroup: null,
    flywheelGroup: null,
    clutchGroup: null,
    bearingRightGroup: null,
    outputShaftGroup: null,
    dynamoGroup: null,
    batteryGroup: null,
    electronicsGroup: null,
    sensorGroup: null,
    wiringGroup: null,
    gearTrainGroup: null,
    spindleLoadGroup: null,
    mechParticlesGroup: null,
    elecParticlesGroup: null,
    labelsGroup: null,
    rotationArrowsGroup: null
  };

  // Dynamic Animated Meshes
  const animMesh = {
    crankWheel: null,
    inputShaft: null,
    footPedalBar: null,
    footPedalLinkage: null,
    flywheelRotor: null,
    flywheelHalo: null,
    clutchBody: null,
    outputShaft: null,
    dynamoPulley: null,
    dynamoBelt: null,
    dynamoRotor: null,
    batteryLed: null,
    mcuLed1: null,
    mcuLed2: null,
    gear1: null,
    gear2: null,
    gear3: null,
    spindles: [],
    bobbins: [],
    yarnLines: [],
    mechParticles: [],
    elecParticles: [],
    labels: []
  };

  // Materials Cache
  let mats = {};

  // DOM Cache
  let dom = {};

  // Initialize on Load
  document.addEventListener('DOMContentLoaded', initFlywheelStudio);

  function initFlywheelStudio() {
    const container = document.getElementById('flywheel3dCanvasContainer');
    if (!container) return;

    cacheDomElements();
    initThreeScene(container);
    buildEngineeringMaterials();
    build3DMechanicalPowertrain();
    initOscilloscope();
    bindEventListeners();
    selectStage(0, false);
    startAnimationLoop();

    window.addEventListener('resize', onWindowResize);
  }

  function cacheDomElements() {
    dom.container = document.getElementById('flywheel3dCanvasContainer');
    dom.togglePlayBtn = document.getElementById('flywheelTogglePlayBtn');
    dom.resetBtn = document.getElementById('flywheelResetBtn');
    dom.modeHandBtn = document.getElementById('flywheelModeHandBtn');
    dom.modePedalBtn = document.getElementById('flywheelModePedalBtn');
    dom.speedSlider = document.getElementById('flywheelSpeedSlider');
    dom.speedDisplay = document.getElementById('flywheelSpeedDisplay');
    dom.stagesTrack = document.getElementById('flywheelStagesTrack');
    dom.viewBtns = document.querySelectorAll('[data-fw-view]');
    dom.particlesToggle = document.getElementById('flywheelParticlesToggle');

    dom.valInputRpm = document.getElementById('fwTelemInputRpm');
    dom.valEnergy = document.getElementById('fwTelemEnergy');
    dom.valDynamo = document.getElementById('fwTelemDynamo');
    dom.valBattery = document.getElementById('fwTelemBattery');

    dom.stageBadge = document.getElementById('fwStageBadge');
    dom.stageTitle = document.getElementById('fwStageTitle');
    dom.stageTagline = document.getElementById('fwStageTagline');
    dom.stageDesc = document.getElementById('fwStageDesc');
    dom.stageFormula = document.getElementById('fwStageFormula');
    dom.stageStatsList = document.getElementById('fwStageStatsList');

    dom.oscCanvas = document.getElementById('fwOscilloscopeCanvas');
    if (dom.oscCanvas) {
      dom.oscCtx = dom.oscCanvas.getContext('2d');
    }

    dom.cadInspectBox = document.getElementById('fwCadInspectBox');
    dom.cadCompName = document.getElementById('fwCadCompName');
    dom.cadCompSpec = document.getElementById('fwCadCompSpec');
    dom.cadCompFunc = document.getElementById('fwCadCompFunc');
    dom.cadCloseBtn = document.getElementById('fwCadCloseBtn');
  }

  function initThreeScene(container) {
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060a14);
    scene.fog = new THREE.FogExp2(0x060a14, 0.04);

    camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(3.4, 2.0, 3.8);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 1.2;
    controls.maxDistance = 8.0;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.target.set(0.0, 0.1, 0.0);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xdce7f5, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.4);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x06b6d4, 1.2);
    cyanRim.position.set(-6, 4, -4);
    scene.add(cyanRim);

    const saffronFill = new THREE.PointLight(0xf59e0b, 1.3, 8);
    saffronFill.position.set(0, 1.5, 1.5);
    scene.add(saffronFill);

    const dynamoPointLight = new THREE.PointLight(0x06b6d4, 0.9, 3);
    dynamoPointLight.position.set(-0.5, 0.2, 0.4);
    scene.add(dynamoPointLight);

    // Floor & Grid
    const gridHelper = new THREE.GridHelper(10, 20, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -0.9;
    scene.add(gridHelper);

    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x070e1c, roughness: 0.75, metalness: 0.3 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.91;
    floor.receiveShadow = true;
    scene.add(floor);
  }

  function buildEngineeringMaterials() {
    mats.steelDark = new THREE.MeshStandardMaterial({ color: 0x242d3d, metalness: 0.85, roughness: 0.35 });
    mats.steelBright = new THREE.MeshStandardMaterial({ color: 0xd8e2ed, metalness: 0.95, roughness: 0.18 });
    mats.castIronHousing = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.55 });
    mats.polishedWood = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6, metalness: 0.1 });

    // Flywheel Cast Alloy Rim & Hub
    mats.flywheelRim = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Machined Saffron Gold Cast Rim
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.15
    });
    mats.flywheelWeb = new THREE.MeshStandardMaterial({ color: 0x92400e, metalness: 0.8, roughness: 0.4 });
    mats.flywheelHub = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.3 });

    mats.brass = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.9, roughness: 0.25 });
    mats.copperCoil = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.92, roughness: 0.22 });
    mats.gearAlloy = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.92, roughness: 0.2 });
    mats.rubberBelt = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9, metalness: 0.1 });

    // Electronics & Battery Materials
    mats.pcbGreen = new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.4, metalness: 0.4 });
    mats.batteryBlue = new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.3, metalness: 0.6 });
    mats.wireRed = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5, metalness: 0.2 });
    mats.wireBlack = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6, metalness: 0.1 });
    mats.icBlack = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.3, metalness: 0.8 });
    mats.oledScreen = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1, metalness: 0.9, emissive: 0x0284c7, emissiveIntensity: 0.4 });

    // Energy Glows
    mats.mechEnergyGlow = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.7, wireframe: true });
    mats.elecEnergyGlow = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.85 });
    mats.ledGreenActive = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    mats.ledAmberActive = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    mats.whiteYarn = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9, metalness: 0.05 });
    mats.bobbinGreen = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4, metalness: 0.5 });
  }

  // --- BUILD PHYSICALLY COMPLETE 3D CAD POWERTRAIN & ENERGY MANAGEMENT SYSTEM ---
  function build3DMechanicalPowertrain() {
    groups.world = new THREE.Group();
    scene.add(groups.world);

    // 1. Bed Frame
    buildBaseBed();

    // 2. Manual Input (Hand Crank Wheel & Foot Treadle Mechanism)
    buildHandCrankInput();
    buildFootPedalInput();

    // 3. Mechanical Transmission (Input Drive Shaft & Pillow Blocks)
    buildInputShaft();

    // 4. Rim-Weighted Inertial Flywheel Rotor (Centered at X = 0)
    buildSolidFlywheelRotor();

    // 5. Sprag Clutch & Smoothed Output Shaft
    buildClutchAndOutputShaft();

    // 6. Dynamo / Generator Unit & Step-Up Belt Coupling
    buildDynamoGeneratorSubsystem();

    // 7. Battery Storage Buffer Module
    buildBatteryBufferSubsystem();

    // 8. Low-Power Smart Telemetry & Sensor Board
    buildElectronicsAndSensorsSubsystem();

    // 9. Insulated Wiring Conduits (Dynamo -> Battery -> Electronics)
    buildElectricalWiringConduits();

    // 10. Step-Up Spur Gear Train & 8 Spindles Spinning Array (Mechanical Load Context)
    buildGearTrainTransmission();
    buildSpindleArrayLoad();

    // 11. Kinetic Torque & Electrical Current Particle Flows
    buildEnergyFlowParticles();

    // 12. 3D Technical Billboard Labels & Motion Arrows
    build3DTechnicalLabels();
    buildRotationArrows();
  }

  // 1. Bed Frame
  function buildBaseBed() {
    groups.baseFrame = new THREE.Group();

    const bedMesh = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.16, 1.4), mats.steelDark);
    bedMesh.position.set(-0.3, -0.65, 0);
    bedMesh.castShadow = true;
    bedMesh.receiveShadow = true;
    groups.baseFrame.add(bedMesh);

    // Leveling feet
    [
      { x: 1.7, z: 0.55 }, { x: 1.7, z: -0.55 },
      { x: -2.3, z: 0.55 }, { x: -2.3, z: -0.55 }
    ].forEach(p => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.24, 16), mats.steelDark);
      leg.position.set(p.x, -0.78, p.z);
      groups.baseFrame.add(leg);

      const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.04, 16), mats.brass);
      pad.position.set(p.x, -0.88, p.z);
      groups.baseFrame.add(pad);
    });

    groups.world.add(groups.baseFrame);
  }

  // 2A. Hand Crank Input Wheel (X = 1.85)
  function buildHandCrankInput() {
    groups.handWheelGroup = new THREE.Group();
    groups.handWheelGroup.position.set(1.85, 0.0, 0.0);
    groups.handWheelGroup.name = 'inputCrank';

    const crankGroup = new THREE.Group();

    // Outer Rim
    const rimGeo = new THREE.TorusGeometry(0.55, 0.035, 16, 36);
    rimGeo.rotateY(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeo, mats.steelDark);
    rim.castShadow = true;
    crankGroup.add(rim);

    // Central Hub
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 20), mats.castIronHousing);
    hub.rotation.z = Math.PI / 2;
    crankGroup.add(hub);

    // 4 Curved Spokes
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.52, 12), mats.steelBright);
      spoke.position.set(0, Math.sin(angle) * 0.26, Math.cos(angle) * 0.26);
      spoke.rotation.x = angle;
      crankGroup.add(spoke);
    }

    // Crank Arm & Wood/Brass Grip
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.35, 0.06), mats.steelDark);
    arm.position.set(0.06, 0.35, 0);
    crankGroup.add(arm);

    const gripGeo = new THREE.CylinderGeometry(0.04, 0.045, 0.26, 16);
    gripGeo.rotateZ(Math.PI / 2);
    const grip = new THREE.Mesh(gripGeo, mats.polishedWood);
    grip.position.set(0.2, 0.5, 0);
    crankGroup.add(grip);

    // Brass End Cap
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.03, 16), mats.brass);
    cap.rotation.z = Math.PI / 2;
    cap.position.set(0.34, 0.5, 0);
    crankGroup.add(cap);

    animMesh.crankWheel = crankGroup;
    groups.handWheelGroup.add(crankGroup);
    groups.world.add(groups.handWheelGroup);
  }

  // 2B. Foot Treadle / Pedal Linkage (X = 1.3, Base)
  function buildFootPedalInput() {
    groups.footPedalGroup = new THREE.Group();
    groups.footPedalGroup.position.set(1.3, -0.65, 0.3);
    groups.footPedalGroup.name = 'inputCrank';

    // Treadle Rocker Plate
    const pedalMesh = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.04, 0.3), mats.steelDark);
    pedalMesh.position.set(0, 0, 0.2);
    pedalMesh.castShadow = true;

    // Brass Tread Grooves
    for (let i = -0.15; i <= 0.15; i += 0.07) {
      const grip = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.015, 0.02), mats.brass);
      grip.position.set(0, 0.025, 0.2 + i);
      pedalMesh.add(grip);
    }

    // Pitman Connecting Rod
    const rodMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.65, 12), mats.steelBright);
    rodMesh.position.set(0, 0.32, 0);
    rodMesh.rotation.x = -0.2;

    animMesh.footPedalBar = pedalMesh;
    animMesh.footPedalLinkage = rodMesh;

    groups.footPedalGroup.add(pedalMesh);
    groups.footPedalGroup.add(rodMesh);
    groups.world.add(groups.footPedalGroup);

    updateInputModeVisibility();
  }

  // 3. Mechanical Drive Shaft & Pillow Blocks (X = 1.85 to Flywheel Hub X = 0.18)
  function buildInputShaft() {
    groups.inputShaftGroup = new THREE.Group();
    groups.inputShaftGroup.name = 'inputShaft';

    // Solid Steel Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.67, 24);
    shaftGeo.rotateZ(Math.PI / 2);
    const shaft = new THREE.Mesh(shaftGeo, mats.steelBright);
    shaft.position.set(1.015, 0.0, 0.0);
    shaft.castShadow = true;
    animMesh.inputShaft = shaft;
    groups.inputShaftGroup.add(shaft);

    // Retaining Collar with Brass Fastener
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 20), mats.brass);
    collar.rotation.z = Math.PI / 2;
    collar.position.set(1.45, 0.0, 0.0);
    groups.inputShaftGroup.add(collar);

    // Pillow Block Bearing at X = 1.1
    groups.bearingLeftGroup = buildPillowBlockBearing(1.1, 0.0, 'bearingLeft');
    groups.inputShaftGroup.add(groups.bearingLeftGroup);

    groups.world.add(groups.inputShaftGroup);
  }

  // Helper: Pillow Block Bearing (UCP204)
  function buildPillowBlockBearing(xPos, yPos, compKey) {
    const bGroup = new THREE.Group();
    bGroup.position.set(xPos, yPos, 0.0);
    bGroup.name = compKey;

    const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.52), mats.castIronHousing);
    baseMesh.position.set(0, -0.35, 0);
    baseMesh.castShadow = true;
    bGroup.add(baseMesh);

    const archGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.16, 24);
    archGeo.rotateZ(Math.PI / 2);
    const archMesh = new THREE.Mesh(archGeo, mats.castIronHousing);
    bGroup.add(archMesh);

    const greaseZerk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.08, 12), mats.brass);
    greaseZerk.position.set(0, 0.18, 0);
    bGroup.add(greaseZerk);

    [-0.18, 0.18].forEach(z => {
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.1, 6), mats.steelBright);
      bolt.position.set(0, -0.52, z);
      bGroup.add(bolt);
    });

    return bGroup;
  }

  // 4. Solid Rim-Weighted Flywheel (Centered rigidly at X = 0)
  function buildSolidFlywheelRotor() {
    groups.flywheelGroup = new THREE.Group();
    groups.flywheelGroup.position.set(0.0, 0.0, 0.0);
    groups.flywheelGroup.name = 'flywheelRotor';

    const rotor = new THREE.Group();

    // Heavy Concentrated Outer Rim (Outer Diameter 0.88m, Thickness 0.18m)
    const rimOuterGeo = new THREE.CylinderGeometry(0.88, 0.88, 0.18, 48, 1, true);
    rimOuterGeo.rotateZ(Math.PI / 2);
    const rimOuter = new THREE.Mesh(rimOuterGeo, mats.flywheelRim);
    rimOuter.castShadow = true;
    rotor.add(rimOuter);

    // Rim Solid Cross-Section Torus
    const rimSolidGeo = new THREE.TorusGeometry(0.88, 0.075, 20, 48);
    rimSolidGeo.rotateY(Math.PI / 2);
    const rimSolid = new THREE.Mesh(rimSolidGeo, mats.flywheelRim);
    rotor.add(rimSolid);

    // Heavy Solid Central Web Disc
    const webGeo = new THREE.CylinderGeometry(0.82, 0.82, 0.06, 36);
    webGeo.rotateZ(Math.PI / 2);
    const webMesh = new THREE.Mesh(webGeo, mats.flywheelWeb);
    rotor.add(webMesh);

    // 6 Weight-Balancing / Lightening Holes in Web
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const holeBorder = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.02, 12, 24), mats.flywheelRim);
      holeBorder.rotateY(Math.PI / 2);
      holeBorder.position.set(0, Math.sin(angle) * 0.52, Math.cos(angle) * 0.52);
      rotor.add(holeBorder);
    }

    // Heavy Central Hub with Shaft Clamping Collars
    const hubGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.36, 32);
    hubGeo.rotateZ(Math.PI / 2);
    const hubMesh = new THREE.Mesh(hubGeo, mats.flywheelHub);
    hubMesh.castShadow = true;
    rotor.add(hubMesh);

    // Flange Retaining Rings on Hub
    [-0.18, 0.18].forEach(xOff => {
      const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.04, 32), mats.flywheelRim);
      flange.rotation.z = Math.PI / 2;
      flange.position.set(xOff, 0, 0);
      rotor.add(flange);

      for (let b = 0; b < 6; b++) {
        const bAngle = (b * Math.PI) / 3;
        const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.08, 6), mats.brass);
        bolt.rotation.z = Math.PI / 2;
        bolt.position.set(xOff > 0 ? xOff + 0.03 : xOff - 0.03, Math.sin(bAngle) * 0.22, Math.cos(bAngle) * 0.22);
        rotor.add(bolt);
      }
    });

    // Mechanical Kinetic Energy Halo Indicator
    const haloGeo = new THREE.TorusGeometry(0.97, 0.015, 16, 48);
    haloGeo.rotateY(Math.PI / 2);
    const haloMesh = new THREE.Mesh(haloGeo, mats.mechEnergyGlow);
    rotor.add(haloMesh);
    animMesh.flywheelHalo = haloMesh;

    animMesh.flywheelRotor = rotor;
    groups.flywheelGroup.add(rotor);
    groups.world.add(groups.flywheelGroup);
  }

  // 5. One-Way Sprag Clutch & Smoothed Output Shaft (X = -0.18 to -1.45)
  function buildClutchAndOutputShaft() {
    groups.clutchGroup = new THREE.Group();
    groups.clutchGroup.position.set(-0.5, 0.0, 0.0);
    groups.clutchGroup.name = 'clutchCoupling';

    // Sprag Clutch Housing
    const clutchGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.24, 24);
    clutchGeo.rotateZ(Math.PI / 2);
    const clutchMesh = new THREE.Mesh(clutchGeo, mats.steelDark);
    clutchMesh.castShadow = true;
    animMesh.clutchBody = clutchMesh;
    groups.clutchGroup.add(clutchMesh);

    // Brass Engagement Indicator Ring
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.06, 24), mats.brass);
    ring.rotation.z = Math.PI / 2;
    groups.clutchGroup.add(ring);

    groups.world.add(groups.clutchGroup);

    // Output Shaft
    groups.outputShaftGroup = new THREE.Group();
    groups.outputShaftGroup.name = 'clutchCoupling';

    const shaftGeo = new THREE.CylinderGeometry(0.048, 0.048, 1.25, 24);
    shaftGeo.rotateZ(Math.PI / 2);
    const outShaft = new THREE.Mesh(shaftGeo, mats.steelBright);
    outShaft.position.set(-0.825, 0.0, 0.0);
    outShaft.castShadow = true;
    animMesh.outputShaft = outShaft;
    groups.outputShaftGroup.add(outShaft);

    // Output Pillow Block Bearing at X = -0.9
    groups.bearingRightGroup = buildPillowBlockBearing(-0.9, 0.0, 'bearingLeft');
    groups.outputShaftGroup.add(groups.bearingRightGroup);

    // Timing Pulley on Output Shaft (Drives Dynamo at X = -0.55)
    const shaftPulley = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.06, 24), mats.brass);
    shaftPulley.rotation.z = Math.PI / 2;
    shaftPulley.position.set(-0.55, 0.0, 0.0);
    groups.outputShaftGroup.add(shaftPulley);

    groups.world.add(groups.outputShaftGroup);
  }

  // 6. Dynamo / Generator Subsystem (Mounted in Front at X = -0.55, Y = -0.28, Z = 0.42)
  function buildDynamoGeneratorSubsystem() {
    groups.dynamoGroup = new THREE.Group();
    groups.dynamoGroup.position.set(-0.55, -0.28, 0.42);
    groups.dynamoGroup.name = 'dynamoUnit';

    // Rigid Chassis Mounting Bracket
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.32, 0.18), mats.castIronHousing);
    bracket.position.set(0, -0.16, 0);
    groups.dynamoGroup.add(bracket);

    // Cylindrical Dynamo Stator Housing
    const casingGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.28, 24);
    casingGeo.rotateZ(Math.PI / 2);
    const casing = new THREE.Mesh(casingGeo, mats.steelDark);
    casing.castShadow = true;
    groups.dynamoGroup.add(casing);

    // Longitudinal Cooling Fins
    for (let f = 0; f < 8; f++) {
      const fAngle = (f * Math.PI) / 4;
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.015, 0.04), mats.castIronHousing);
      fin.position.set(0, Math.sin(fAngle) * 0.13, Math.cos(fAngle) * 0.13);
      fin.rotation.x = fAngle;
      groups.dynamoGroup.add(fin);
    }

    // Cutaway Viewing Window showing Internal Copper Stator Windings
    const cutawayGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.12, 16);
    cutawayGeo.rotateZ(Math.PI / 2);
    const coilMesh = new THREE.Mesh(cutawayGeo, mats.copperCoil);
    coilMesh.position.set(-0.02, 0, 0);
    groups.dynamoGroup.add(coilMesh);

    // Dynamo Driven Pulley (1:6 Step-Up, Radius 0.045)
    const dynamoPulley = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.05, 20), mats.brass);
    dynamoPulley.rotation.z = Math.PI / 2;
    dynamoPulley.position.set(0.16, 0, 0);
    animMesh.dynamoPulley = dynamoPulley;
    groups.dynamoGroup.add(dynamoPulley);

    // High-Traction Drive Belt connecting Shaft Pulley to Dynamo Pulley
    const beltGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.52, 8);
    beltGeo.rotateX(0.95);
    const belt1 = new THREE.Mesh(beltGeo, mats.rubberBelt);
    belt1.position.set(0.0, 0.14, -0.21);
    groups.dynamoGroup.add(belt1);

    // Output Terminal Block with Positive/Negative Lugs
    const termBlock = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.08), mats.castIronHousing);
    termBlock.position.set(-0.16, 0.08, 0.0);
    groups.dynamoGroup.add(termBlock);

    const posLug = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.03, 10), mats.brass);
    posLug.position.set(-0.16, 0.12, 0.02);
    groups.dynamoGroup.add(posLug);

    const negLug = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.03, 10), mats.steelBright);
    negLug.position.set(-0.16, 0.12, -0.02);
    groups.dynamoGroup.add(negLug);

    groups.world.add(groups.dynamoGroup);
  }

  // 7. Battery Storage Buffer Module (Mounted at X = 0.25, Y = -0.48, Z = 0.45)
  function buildBatteryBufferSubsystem() {
    groups.batteryGroup = new THREE.Group();
    groups.batteryGroup.position.set(0.25, -0.48, 0.45);
    groups.batteryGroup.name = 'batteryPack';

    // Battery Protective Enclosure Box
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.24), mats.batteryBlue);
    box.castShadow = true;
    groups.batteryGroup.add(box);

    // Aluminum Heat Sink Lid
    const sink = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.02, 0.22), mats.steelDark);
    sink.position.set(0, 0.09, 0);
    groups.batteryGroup.add(sink);

    // 2 Cylindrical LiFePO4 Battery Cells Visible
    [-0.07, 0.07].forEach(xOff => {
      const cellGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.26, 16);
      cellGeo.rotateZ(Math.PI / 2);
      const cell = new THREE.Mesh(cellGeo, mats.steelBright);
      cell.position.set(xOff, 0.02, 0);
      groups.batteryGroup.add(cell);
    });

    // Integrated Charging Status LED
    const ledGeo = new THREE.SphereGeometry(0.022, 12, 12);
    const ledMesh = new THREE.Mesh(ledGeo, mats.ledGreenActive);
    ledMesh.position.set(0.12, 0.11, 0.08);
    animMesh.batteryLed = ledMesh;
    groups.batteryGroup.add(ledMesh);

    // Battery Spec Plate Label
    const specPlate = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.06), mats.oledScreen);
    specPlate.position.set(0, 0, 0.122);
    groups.batteryGroup.add(specPlate);

    groups.world.add(groups.batteryGroup);
  }

  // 8. Low-Power Smart Telemetry & Sensor Subsystem (Mounted at X = 0.85, Y = -0.38, Z = 0.42)
  function buildElectronicsAndSensorsSubsystem() {
    groups.electronicsGroup = new THREE.Group();
    groups.electronicsGroup.position.set(0.85, -0.38, 0.42);
    groups.electronicsGroup.name = 'electronicsModule';

    // FR-4 Microcontroller PCB Board
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.02, 0.26), mats.pcbGreen);
    pcb.castShadow = true;
    groups.electronicsGroup.add(pcb);

    // Main ESP32 / MCU Microchip
    const mcu = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.03, 0.14), mats.icBlack);
    mcu.position.set(-0.06, 0.025, 0);
    groups.electronicsGroup.add(mcu);

    // OLED Telemetry Micro Display Screen
    const oled = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.025, 0.08), mats.oledScreen);
    oled.position.set(0.10, 0.025, -0.04);
    groups.electronicsGroup.add(oled);

    // Blinking Status LEDs (Green & Amber)
    const led1 = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 8), mats.ledGreenActive);
    led1.position.set(0.06, 0.03, 0.07);
    animMesh.mcuLed1 = led1;
    groups.electronicsGroup.add(led1);

    const led2 = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 8), mats.ledAmberActive);
    led2.position.set(0.12, 0.03, 0.07);
    animMesh.mcuLed2 = led2;
    groups.electronicsGroup.add(led2);

    // Optical Shaft RPM Sensor Bracket (Extends from PCB toward Drive Shaft at Z = 0.0)
    groups.sensorGroup = new THREE.Group();
    groups.sensorGroup.position.set(0.0, 0.18, -0.32);
    groups.sensorGroup.name = 'electronicsModule';

    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.28, 0.04), mats.steelDark);
    groups.sensorGroup.add(arm);

    // Slotted Infrared Optical Sensor Head aiming at Shaft
    const fork = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.08), mats.castIronHousing);
    fork.position.set(0, 0.14, 0);
    groups.sensorGroup.add(fork);

    // Optical IR Beam Lens
    const lens = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 8), mats.ledAmberActive);
    lens.position.set(0, 0.14, 0.03);
    groups.sensorGroup.add(lens);

    groups.electronicsGroup.add(groups.sensorGroup);
    groups.world.add(groups.electronicsGroup);
  }

  // 9. Insulated Wiring Harness (Dynamo -> Battery -> Telemetry Electronics)
  function buildElectricalWiringConduits() {
    groups.wiringGroup = new THREE.Group();

    // 1. Twin Wire Cable from Dynamo (X: -0.71, Y: -0.20, Z: 0.42) to Battery (X: 0.10, Y: -0.40, Z: 0.45)
    const dynCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.71, -0.20, 0.42),
      new THREE.Vector3(-0.55, -0.42, 0.46),
      new THREE.Vector3(-0.20, -0.52, 0.48),
      new THREE.Vector3(0.10, -0.42, 0.45)
    ]);
    const wire1 = new THREE.Mesh(new THREE.TubeGeometry(dynCurve, 20, 0.012, 8, false), mats.wireRed);
    groups.wiringGroup.add(wire1);

    // 2. Wire Cable from Battery (X: 0.40, Y: -0.40, Z: 0.45) to Electronics PCB (X: 0.70, Y: -0.38, Z: 0.42)
    const batCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.40, -0.40, 0.45),
      new THREE.Vector3(0.55, -0.48, 0.44),
      new THREE.Vector3(0.70, -0.38, 0.42)
    ]);
    const wire2 = new THREE.Mesh(new THREE.TubeGeometry(batCurve, 16, 0.010, 8, false), mats.wireBlack);
    groups.wiringGroup.add(wire2);

    groups.world.add(groups.wiringGroup);
  }

  // 10A. Step-Up Spur Gear Train (X = -1.45)
  function buildGearTrainTransmission() {
    groups.gearTrainGroup = new THREE.Group();
    groups.gearTrainGroup.position.set(-1.45, 0.0, 0.0);
    groups.gearTrainGroup.name = 'spindleTrain';

    // Primary Big Gear (Radius 0.48, 48 Teeth)
    const gear1 = buildSpurGearMesh(0.48, 0.08, 48, mats.gearAlloy);
    animMesh.gear1 = gear1;
    groups.gearTrainGroup.add(gear1);

    // Secondary Pinion Gear (Radius 0.18, 18 Teeth)
    const gear2 = buildSpurGearMesh(0.18, 0.07, 18, mats.steelBright);
    gear2.position.set(-0.06, 0.58, 0);
    animMesh.gear2 = gear2;
    groups.gearTrainGroup.add(gear2);

    // Intermediate Pulley Gear (Radius 0.38, 36 Teeth)
    const gear3 = buildSpurGearMesh(0.38, 0.07, 36, mats.gearAlloy);
    gear3.position.set(-0.12, 0.58, 0.28);
    animMesh.gear3 = gear3;
    groups.gearTrainGroup.add(gear3);

    // Structural Enclosure Plate
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.1, 0.7), mats.steelDark);
    plate.position.set(0.08, 0.32, 0.14);
    groups.gearTrainGroup.add(plate);

    groups.world.add(groups.gearTrainGroup);
  }

  function buildSpurGearMesh(radius, thickness, toothCount, material) {
    const gearGroup = new THREE.Group();

    const disc = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.9, radius * 0.9, thickness, 32), material);
    disc.rotation.z = Math.PI / 2;
    disc.castShadow = true;
    gearGroup.add(disc);

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.35, radius * 0.35, thickness * 1.3, 20), mats.steelDark);
    hub.rotation.z = Math.PI / 2;
    gearGroup.add(hub);

    for (let t = 0; t < toothCount; t++) {
      const angle = (t * Math.PI * 2) / toothCount;
      const tooth = new THREE.Mesh(
        new THREE.BoxGeometry(thickness * 0.98, radius * 0.18, (Math.PI * radius * 1.8) / toothCount),
        material
      );
      tooth.position.set(0, Math.sin(angle) * (radius * 0.95), Math.cos(angle) * (radius * 0.95));
      tooth.rotation.x = angle;
      gearGroup.add(tooth);
    }

    return gearGroup;
  }

  // 10B. 8 Synchronized Spindles Spinning Array (X = -1.85)
  function buildSpindleArrayLoad() {
    groups.spindleLoadGroup = new THREE.Group();
    groups.spindleLoadGroup.position.set(-1.85, 0.2, 0.0);
    groups.spindleLoadGroup.name = 'spindleTrain';

    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 2.2), mats.steelDark);
    groups.spindleLoadGroup.add(rail);

    const topShaftGeo = new THREE.CylinderGeometry(0.025, 0.025, 2.2, 16);
    topShaftGeo.rotateX(Math.PI / 2);
    const topShaft = new THREE.Mesh(topShaftGeo, mats.brass);
    topShaft.position.set(0.15, 0.65, 0);
    groups.spindleLoadGroup.add(topShaft);

    const numSpindles = 8;
    const spacing = 0.26;
    const startZ = -((numSpindles - 1) * spacing) / 2;

    for (let i = 0; i < numSpindles; i++) {
      const zPos = startZ + i * spacing;

      const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.55, 12), mats.steelBright);
      spindle.position.set(0, 0.25, zPos);
      spindle.castShadow = true;
      groups.spindleLoadGroup.add(spindle);
      animMesh.spindles.push(spindle);

      const bobbin = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.05, 0.32, 16), mats.whiteYarn);
      bobbin.position.set(0, 0.22, zPos);
      groups.spindleLoadGroup.add(bobbin);
      animMesh.bobbins.push(bobbin);

      const whorl = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.04, 16), mats.bobbinGreen);
      whorl.position.set(0, 0.02, zPos);
      groups.spindleLoadGroup.add(whorl);

      const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.06, 16), mats.castIronHousing);
      roller.rotation.x = Math.PI / 2;
      roller.position.set(0.15, 0.65, zPos);
      groups.spindleLoadGroup.add(roller);

      const yarnGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0.15, 0.65, zPos),
        new THREE.Vector3(0.06, 0.45, zPos),
        new THREE.Vector3(0.0, 0.36, zPos)
      ]);
      const yarnLine = new THREE.Line(yarnGeo, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
      groups.spindleLoadGroup.add(yarnLine);
      animMesh.yarnLines.push(yarnLine);
    }

    groups.world.add(groups.spindleLoadGroup);
  }

  // 11. Energy Flow Particles (Mechanical = Amber, Electrical = Cyan)
  function buildEnergyFlowParticles() {
    groups.mechParticlesGroup = new THREE.Group();
    groups.elecParticlesGroup = new THREE.Group();

    const pMechGeo = new THREE.SphereGeometry(0.024, 8, 8);
    const pElecGeo = new THREE.SphereGeometry(0.020, 8, 8);

    // A. Mechanical Torque Flow: Input Shaft (X: 1.85 -> 0.18)
    for (let i = 0; i < 14; i++) {
      const p = new THREE.Mesh(pMechGeo, new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.85 }));
      p.userData = { type: 'inputShaft', progress: i / 14, speed: 0.35, angle: Math.random() * Math.PI * 2 };
      groups.mechParticlesGroup.add(p);
      animMesh.mechParticles.push(p);
    }

    // B. Mechanical Kinetic Orbit: Flywheel Rim (R = 0.88, X = 0)
    for (let i = 0; i < 20; i++) {
      const p = new THREE.Mesh(pMechGeo, new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.9 }));
      p.userData = { type: 'flywheelRim', angle: (i / 20) * Math.PI * 2, speed: 1.2 };
      groups.mechParticlesGroup.add(p);
      animMesh.mechParticles.push(p);
    }

    // C. Mechanical Torque Flow: Output Shaft & Dynamo Belt (X: -0.18 -> -0.55 -> Dynamo)
    for (let i = 0; i < 12; i++) {
      const p = new THREE.Mesh(pMechGeo, new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.8 }));
      p.userData = { type: 'outputShaft', progress: i / 12, speed: 0.45, angle: Math.random() * Math.PI * 2 };
      groups.mechParticlesGroup.add(p);
      animMesh.mechParticles.push(p);
    }

    // D. Electrical Flow: Dynamo -> Battery (Cyan Wire Route)
    for (let i = 0; i < 10; i++) {
      const p = new THREE.Mesh(pElecGeo, mats.elecEnergyGlow);
      p.userData = { type: 'elecDynamoToBattery', progress: i / 10, speed: 0.55 };
      groups.elecParticlesGroup.add(p);
      animMesh.elecParticles.push(p);
    }

    // E. Electrical Flow: Battery -> Telemetry Electronics (Cyan Wire Route)
    for (let i = 0; i < 8; i++) {
      const p = new THREE.Mesh(pElecGeo, mats.elecEnergyGlow);
      p.userData = { type: 'elecBatteryToMcu', progress: i / 8, speed: 0.65 };
      groups.elecParticlesGroup.add(p);
      animMesh.elecParticles.push(p);
    }

    groups.world.add(groups.mechParticlesGroup);
    groups.world.add(groups.elecParticlesGroup);
  }

  // 12. 3D Technical Billboard Labels
  function build3DTechnicalLabels() {
    groups.labelsGroup = new THREE.Group();

    const labelDefs = [
      { text: '01. MANUAL INPUT', pos: { x: 1.85, y: 0.85, z: 0.0 }, color: '#f59e0b' },
      { text: '02. MECHANICAL DRIVE', pos: { x: 1.10, y: 0.65, z: 0.0 }, color: '#d97706' },
      { text: '03. INERTIAL FLYWHEEL', pos: { x: 0.00, y: 1.15, z: 0.0 }, color: '#fbbf24' },
      { text: '04. ENERGY SMOOTHING', pos: { x: -0.55, y: 0.65, z: 0.0 }, color: '#38bdf8' },
      { text: '05. DYNAMO GENERATOR', pos: { x: -0.55, y: 0.15, z: 0.5 }, color: '#06b6d4' },
      { text: '06. BATTERY BUFFER', pos: { x: 0.25, y: -0.15, z: 0.5 }, color: '#60a5fa' },
      { text: '07. LOW-POWER ELECTRONICS', pos: { x: 0.85, y: 0.15, z: 0.5 }, color: '#10b981' }
    ];

    labelDefs.forEach(def => {
      const sprite = createTextSprite(def.text, def.color);
      sprite.position.set(def.pos.x, def.pos.y, def.pos.z);
      groups.labelsGroup.add(sprite);
      animMesh.labels.push(sprite);
    });

    groups.world.add(groups.labelsGroup);
  }

  function createTextSprite(message, colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 70;
    const ctx = canvas.getContext('2d');

    // Rounded tag background
    ctx.fillStyle = 'rgba(7, 12, 24, 0.85)';
    ctx.strokeStyle = colorHex;
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(4, 4, 312, 62, 10);
    } else {
      ctx.rect(4, 4, 312, 62);
    }
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillStyle = colorHex;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(message, 160, 35);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.95 });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(0.85, 0.22, 1.0);
    return sprite;
  }

  function buildRotationArrows() {
    groups.rotationArrowsGroup = new THREE.Group();

    // Curved Arrow around Flywheel Rim
    const arrowCurveGeo = new THREE.TorusGeometry(1.05, 0.012, 8, 24, Math.PI * 1.5);
    arrowCurveGeo.rotateY(Math.PI / 2);
    const arrowRing = new THREE.Mesh(arrowCurveGeo, new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 }));
    groups.rotationArrowsGroup.add(arrowRing);

    const coneGeo = new THREE.ConeGeometry(0.06, 0.14, 12);
    coneGeo.rotateZ(-Math.PI / 2);
    const cone = new THREE.Mesh(coneGeo, mats.brass);
    cone.position.set(0, 1.05, 0);
    groups.rotationArrowsGroup.add(cone);

    groups.world.add(groups.rotationArrowsGroup);
  }

  // --- ANIMATION LOOP ---
  function startAnimationLoop() {
    function animate() {
      animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      state.time += delta;

      if (state.isRunning) {
        updatePowertrainPhysics(delta);
      }

      controls.update();
      renderer.render(scene, camera);

      if (state.isRunning) {
        updateOscilloscope();
      }
    }
    animate();
  }

  function updatePowertrainPhysics(delta) {
    const baseSpeed = state.speedMultiplier * 3.8; // Base Rad/sec

    // Artisan cyclical manual input ripple (±32% pulse with dead-center dips)
    const pulseWave = Math.sin(state.time * 4.2) * 0.32;
    const inputAngularVel = Math.max(0.15, baseSpeed * (1.0 + pulseWave));

    // Flywheel Rotational Inertia smoothing (dampens ripple to ±3.4%)
    const flywheelAngularVel = baseSpeed * (1.0 + pulseWave * 0.11);
    const dynamoVel = flywheelAngularVel * 6.0; // 1:6 step-up for dynamo
    const gearStepUpVel = flywheelAngularVel * 18.5; // Spindle drive

    // 1. Manual Input & Drive Shaft
    if (state.inputMode === 'hand') {
      if (animMesh.crankWheel) animMesh.crankWheel.rotation.x += inputAngularVel * delta;
      if (animMesh.inputShaft) animMesh.inputShaft.rotation.x += inputAngularVel * delta;
    } else {
      const pedalRocker = Math.sin(state.time * 5.8) * 0.18;
      if (animMesh.footPedalBar) animMesh.footPedalBar.rotation.x = pedalRocker;
      if (animMesh.footPedalLinkage) animMesh.footPedalLinkage.position.y = 0.32 + Math.sin(state.time * 5.8) * 0.08;
      if (animMesh.inputShaft) animMesh.inputShaft.rotation.x += inputAngularVel * delta;
    }

    // 2. Solid Flywheel Rotor Rotation on Central Axis
    if (animMesh.flywheelRotor) {
      animMesh.flywheelRotor.rotation.x += flywheelAngularVel * delta;
    }

    // Flywheel Kinetic Halo Pulse
    if (animMesh.flywheelHalo) {
      const haloPulse = 1.0 + Math.sin(state.time * 6.0) * 0.04;
      animMesh.flywheelHalo.scale.set(haloPulse, haloPulse, haloPulse);
    }

    // 3. Sprag Clutch & Smoothed Output Shaft
    if (animMesh.clutchBody) animMesh.clutchBody.rotation.x += flywheelAngularVel * delta;
    if (animMesh.outputShaft) animMesh.outputShaft.rotation.x += flywheelAngularVel * delta;

    // 4. Dynamo Generator Pulley & Rotor (High Speed)
    if (animMesh.dynamoPulley) animMesh.dynamoPulley.rotation.x += dynamoVel * delta;

    // 5. Electronics Indicator Blinks
    if (animMesh.batteryLed) {
      const bPulse = 0.5 + 0.5 * Math.sin(state.time * 4.0);
      animMesh.batteryLed.scale.set(1.0 + bPulse * 0.15, 1.0 + bPulse * 0.15, 1.0 + bPulse * 0.15);
    }
    if (animMesh.mcuLed1) {
      animMesh.mcuLed1.visible = (Math.sin(state.time * 8.0) > 0);
    }
    if (animMesh.mcuLed2) {
      animMesh.mcuLed2.visible = (Math.cos(state.time * 6.0) > 0);
    }

    // 6. Step-Up Gears & 8 Spindles
    if (animMesh.gear1) animMesh.gear1.rotation.x += flywheelAngularVel * delta;
    if (animMesh.gear2) animMesh.gear2.rotation.x -= (flywheelAngularVel * 2.66) * delta;
    if (animMesh.gear3) animMesh.gear3.rotation.x += (flywheelAngularVel * 5.2) * delta;

    for (let i = 0; i < animMesh.spindles.length; i++) {
      animMesh.spindles[i].rotation.y += gearStepUpVel * delta;
      animMesh.bobbins[i].rotation.y += gearStepUpVel * delta;
    }

    // 7. Dynamic Particle Flow Animation
    if (state.showParticles) {
      // Mechanical Input Shaft (X: 1.85 -> 0.18)
      animMesh.mechParticles.forEach(p => {
        if (p.userData.type === 'inputShaft') {
          p.userData.progress += delta * p.userData.speed * state.speedMultiplier;
          if (p.userData.progress > 1.0) p.userData.progress = 0;
          const curX = 1.85 - p.userData.progress * 1.67;
          p.userData.angle += delta * 6.0;
          p.position.set(curX, Math.sin(p.userData.angle) * 0.065, Math.cos(p.userData.angle) * 0.065);
        } else if (p.userData.type === 'flywheelRim') {
          p.userData.angle += delta * flywheelAngularVel;
          p.position.set(0.0, Math.sin(p.userData.angle) * 0.88, Math.cos(p.userData.angle) * 0.88);
        } else if (p.userData.type === 'outputShaft') {
          p.userData.progress += delta * p.userData.speed * state.speedMultiplier;
          if (p.userData.progress > 1.0) p.userData.progress = 0;
          const curX = -0.18 - p.userData.progress * 1.67;
          p.userData.angle += delta * 6.0;
          p.position.set(curX, Math.sin(p.userData.angle) * 0.065, Math.cos(p.userData.angle) * 0.065);
        }
      });

      // Electrical Particles: Dynamo -> Battery
      animMesh.elecParticles.forEach(p => {
        if (p.userData.type === 'elecDynamoToBattery') {
          p.userData.progress += delta * p.userData.speed * state.speedMultiplier;
          if (p.userData.progress > 1.0) p.userData.progress = 0;
          // Interpolate along conduit curve
          const t = p.userData.progress;
          const px = -0.71 + t * (0.10 - -0.71);
          const py = -0.20 + Math.sin(t * Math.PI) * -0.25;
          const pz = 0.42 + t * 0.03;
          p.position.set(px, py, pz);
        } else if (p.userData.type === 'elecBatteryToMcu') {
          p.userData.progress += delta * p.userData.speed * state.speedMultiplier;
          if (p.userData.progress > 1.0) p.userData.progress = 0;
          const t = p.userData.progress;
          const px = 0.40 + t * (0.70 - 0.40);
          const py = -0.40 + Math.sin(t * Math.PI) * -0.06;
          const pz = 0.45 - t * 0.03;
          p.position.set(px, py, pz);
        }
      });
    }

    updateTelemetry(inputAngularVel, flywheelAngularVel);
  }

  function updateTelemetry(inputVel, flywheelVel) {
    const rawRpm = (inputVel / (Math.PI * 2)) * 60;
    const smoothRpm = (flywheelVel / (Math.PI * 2)) * 60;
    const I = 0.048;
    const energy = 0.5 * I * (flywheelVel * flywheelVel) * 12.5;

    state.manualCadenceRpm = rawRpm;
    state.flywheelRpm = smoothRpm;
    state.flywheelEnergyJ = energy;
    state.spindleRpm = Math.round(smoothRpm * 18.5);

    if (dom.valInputRpm) dom.valInputRpm.textContent = `${Math.round(rawRpm)} RPM`;
    if (dom.valEnergy) dom.valEnergy.textContent = `${energy.toFixed(1)} J`;
    if (dom.valDynamo) dom.valDynamo.textContent = `5.2 V / 1.95 W`;
    if (dom.valBattery) dom.valBattery.textContent = `Active (3.3V Buffer)`;
  }

  // --- OSCILLOSCOPE (Input Pulse vs Flywheel Output) ---
  function initOscilloscope() {
    if (!dom.oscCanvas) return;
    dom.oscCanvas.width = dom.oscCanvas.clientWidth || 360;
    dom.oscCanvas.height = 95;
  }

  function updateOscilloscope() {
    if (!dom.oscCtx || !dom.oscCanvas) return;
    const ctx = dom.oscCtx;
    const w = dom.oscCanvas.width;
    const h = dom.oscCanvas.height;

    ctx.fillStyle = '#070c18';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < w; x += 30) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
    for (let y = 0; y < h; y += 24) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
    ctx.stroke();

    // Center Zero Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // Sample waveforms
    const inputSample = Math.sin(state.time * 5.0) * 28 + (Math.sin(state.time * 12.0) * 7);
    const outputSample = Math.sin(state.time * 5.0) * 4.2;

    state.waveData.push({ input: inputSample, output: outputSample });
    if (state.waveData.length > w / 2) state.waveData.shift();

    // Red/Gold Input Pulse Waveform
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < state.waveData.length; i++) {
      const x = i * 2;
      const y = h / 2 - state.waveData[i].input;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Cyan Output Stable Waveform
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < state.waveData.length; i++) {
      const x = i * 2;
      const y = h / 2 - state.waveData[i].output;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('● Input Cadence Pulse (±32%)', 10, 15);
    ctx.fillStyle = '#06b6d4';
    ctx.fillText('● Flywheel Output (±3.4% Stable)', 10, 28);
  }

  // --- STAGE NAVIGATION ---
  function selectStage(index, smoothCam = true) {
    if (index < 0 || index >= FLYWHEEL_STAGES.length) return;
    state.currentStageIndex = index;
    const stage = FLYWHEEL_STAGES[index];

    if (dom.stagesTrack) {
      const pills = dom.stagesTrack.querySelectorAll('.fw-stage-pill');
      pills.forEach((p, idx) => p.classList.toggle('active', idx === index));
    }

    if (dom.stageBadge) dom.stageBadge.textContent = stage.badge;
    if (dom.stageTitle) dom.stageTitle.textContent = `${stage.stepNum}. ${stage.title}`;
    if (dom.stageTagline) dom.stageTagline.textContent = stage.tagline;
    if (dom.stageDesc) dom.stageDesc.textContent = stage.desc;
    if (dom.stageFormula) dom.stageFormula.innerHTML = `<strong>Energy Flow:</strong> <code>${stage.flowFormula}</code>`;

    if (dom.stageStatsList) {
      dom.stageStatsList.innerHTML = stage.stats.map(s => `
        <div class="fw-stat-pill">
          <span class="fw-stat-label">${s.label}</span>
          <span class="fw-stat-val">${s.val}</span>
        </div>
      `).join('');
    }

    if (smoothCam && stage.camPos && stage.camTarget) {
      animateCameraTo(stage.camPos, stage.camTarget, 1000);
    }
  }

  function animateCameraTo(targetPos, targetLookAt, durationMs = 1000) {
    const startPos = camera.position.clone();
    const startLookAt = controls.target.clone();
    const destPos = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);
    const destLookAt = new THREE.Vector3(targetLookAt.x, targetLookAt.y, targetLookAt.z);

    const startTime = performance.now();

    function stepCam(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1.0);
      const ease = easeInOutCubic(progress);

      camera.position.lerpVectors(startPos, destPos, ease);
      controls.target.lerpVectors(startLookAt, destLookAt, ease);

      if (progress < 1.0) requestAnimationFrame(stepCam);
    }
    requestAnimationFrame(stepCam);
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // --- CONTROLS & EVENT LISTENERS ---
  function bindEventListeners() {
    if (dom.togglePlayBtn) {
      dom.togglePlayBtn.addEventListener('click', () => {
        state.isRunning = !state.isRunning;
        dom.togglePlayBtn.innerHTML = state.isRunning ? '<span>⏸</span> PAUSE' : '<span>▶</span> START FLYWHEEL';
        dom.togglePlayBtn.classList.toggle('active', state.isRunning);
      });
    }

    if (dom.resetBtn) {
      dom.resetBtn.addEventListener('click', () => {
        state.isRunning = true;
        state.speedMultiplier = 1.0;
        if (dom.speedSlider) dom.speedSlider.value = 1.0;
        if (dom.speedDisplay) dom.speedDisplay.textContent = '1.0x (65 RPM)';
        if (dom.togglePlayBtn) dom.togglePlayBtn.innerHTML = '<span>⏸</span> PAUSE';
        selectStage(0, true);
      });
    }

    if (dom.modeHandBtn) {
      dom.modeHandBtn.addEventListener('click', () => {
        state.inputMode = 'hand';
        dom.modeHandBtn.classList.add('active');
        if (dom.modePedalBtn) dom.modePedalBtn.classList.remove('active');
        updateInputModeVisibility();
      });
    }

    if (dom.modePedalBtn) {
      dom.modePedalBtn.addEventListener('click', () => {
        state.inputMode = 'pedal';
        dom.modePedalBtn.classList.add('active');
        if (dom.modeHandBtn) dom.modeHandBtn.classList.remove('active');
        updateInputModeVisibility();
      });
    }

    if (dom.speedSlider) {
      dom.speedSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        state.speedMultiplier = val;
        const rpm = Math.round(65 * val);
        if (dom.speedDisplay) dom.speedDisplay.textContent = `${val.toFixed(1)}x (${rpm} RPM)`;
      });
    }

    if (dom.stagesTrack) {
      const pills = dom.stagesTrack.querySelectorAll('.fw-stage-pill');
      pills.forEach((pill, idx) => {
        pill.addEventListener('click', () => selectStage(idx, true));
      });
    }

    if (dom.viewBtns) {
      dom.viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          dom.viewBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const viewType = btn.getAttribute('data-fw-view');
          switchCameraView(viewType);
        });
      });
    }

    if (dom.particlesToggle) {
      dom.particlesToggle.addEventListener('change', (e) => {
        state.showParticles = e.target.checked;
        if (groups.mechParticlesGroup) groups.mechParticlesGroup.visible = state.showParticles;
        if (groups.elecParticlesGroup) groups.elecParticlesGroup.visible = state.showParticles;
      });
    }

  }

  function updateInputModeVisibility() {
    if (groups.handWheelGroup) groups.handWheelGroup.visible = (state.inputMode === 'hand');
    if (groups.footPedalGroup) groups.footPedalGroup.visible = (state.inputMode === 'pedal');
  }

  function switchCameraView(viewType) {
    let targetPos, targetLookAt;

    switch (viewType) {
      case 'isometric':
        targetPos = { x: 3.4, y: 2.0, z: 3.8 };
        targetLookAt = { x: 0.0, y: 0.1, z: 0.0 };
        break;
      case 'input':
        targetPos = { x: 3.6, y: 1.4, z: 2.8 };
        targetLookAt = { x: 1.5, y: 0.1, z: 0.0 };
        break;
      case 'flywheel':
        targetPos = { x: 0.0, y: 0.9, z: 2.8 };
        targetLookAt = { x: 0.0, y: 0.2, z: 0.0 };
        break;
      case 'dynamo':
        targetPos = { x: -0.8, y: 0.8, z: 1.8 };
        targetLookAt = { x: -0.5, y: -0.1, z: 0.3 };
        break;
      case 'battery':
        targetPos = { x: 0.5, y: 0.7, z: 1.9 };
        targetLookAt = { x: 0.5, y: -0.2, z: 0.4 };
        break;
      case 'side':
        targetPos = { x: 4.4, y: 0.8, z: 0.0 };
        targetLookAt = { x: 0.0, y: 0.1, z: 0.0 };
        break;
      default:
        targetPos = { x: 3.4, y: 2.0, z: 3.8 };
        targetLookAt = { x: 0.0, y: 0.1, z: 0.0 };
    }

    animateCameraTo(targetPos, targetLookAt, 900);
  }

  function onWindowResize() {
    if (!dom.container || !renderer || !camera) return;
    const width = dom.container.clientWidth;
    const height = dom.container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    if (dom.oscCanvas) {
      dom.oscCanvas.width = dom.oscCanvas.clientWidth || 360;
    }
  }

})();
