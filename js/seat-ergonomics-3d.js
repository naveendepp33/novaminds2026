/**
 * SMART KHADHI CHAKRA - ERGONOMIC HEIGHT ADJUSTMENT 3D STUDIO
 * Exact 3D Replica of Reference 8-Spindle Machine with Telescopic Height Adjustment
 * 
 * SIH26020 - Team NOVAMINDS
 */

(function () {
  'use strict';

  // --- HEIGHT PRESETS DEFINITION ---
  const HEIGHT_PRESETS = {
    low: {
      key: 'low',
      label: 'LOW',
      heightMm: 420,
      yOffset: -0.22,
      legExt: 0.08,
      holeIdx: 0,
      primaryMode: 'Floor / Low Stool Seating',
      targetArtisan: '148 cm – 159 cm (Petite Stature)',
      workingHeight: '420 mm (Low Working Plane)',
      telescopicExt: '-60 mm Lowered Index',
      lockingState: 'Detent Hole #1 (Engaged)',
      stabilityFactor: 'Maximum Rigidity (Low CG)',
      desc: 'Low working elevation brings the 8-spindle drafting bank and hand-crank closer to seated artisans of smaller stature, ensuring natural 90° arm reach and strain-free treadle actuation.'
    },
    medium: {
      key: 'medium',
      label: 'MEDIUM',
      heightMm: 480,
      yOffset: 0.0,
      legExt: 0.0,
      holeIdx: 1,
      primaryMode: 'Standard Ergonomic Stool',
      targetArtisan: '160 cm – 174 cm (Average Stature)',
      workingHeight: '480 mm (Nominal Working Plane)',
      telescopicExt: 'Nominal Baseline (0 mm)',
      lockingState: 'Detent Hole #2 (Engaged)',
      stabilityFactor: 'Standard Baseline Stability',
      desc: 'Standard nominal ergonomic working height providing an optimal neutral spine posture, balanced reach across all 8 spindles, and effortless dual-mode hand/foot operation.'
    },
    high: {
      key: 'high',
      label: 'HIGH',
      heightMm: 540,
      yOffset: 0.22,
      legExt: -0.08,
      holeIdx: 2,
      primaryMode: 'Standing / High Chair Operation',
      targetArtisan: '175 cm – 186 cm (Tall Stature)',
      workingHeight: '540 mm (Elevated Working Plane)',
      telescopicExt: '+60 mm Extended Index',
      lockingState: 'Detent Hole #3 (Engaged)',
      stabilityFactor: 'Reinforced Locking Pin Support',
      desc: 'Elevated machine frame elevation eliminates hunched posture for taller artisans, maintaining clear sightlines across all 8 yarn bobbins and optical break sensors.'
    }
  };

  const COMPONENT_SPECS = {
    telescopicLegs: {
      name: '4-Point Perforated Telescopic A-Frame Legs',
      spec: 'Heavy-gauge sage-grey steel square tubing with 3 CNC-reamed index holes and heavy-duty locking bolts.',
      function: 'Allows the entire 8-spindle spinning machine to be adjusted vertically between 420mm and 540mm working height.'
    },
    spindleTierUpper: {
      name: '8 Upper Creel Bobbins & Optical Break Sensors',
      spec: '8 vertical supply spools with red anodized tension caps and localized infrared yarn-break detection sensor blocks.',
      function: 'Feeds continuous cotton sliver downward through individual drafting guides with instant thread-break detection.'
    },
    draftingZone: {
      name: 'Precision Dual-Cot Drafting Roller Array',
      spec: '8 pairs of precision ground steel shafts with dual-tone beige and black synthetic rubber drafting cots.',
      function: 'Attenuates and drafts cotton fibers at an exact ratio before twisting and winding onto the lower spindle bank.'
    },
    spindleTierLower: {
      name: '8 High-Speed Spinning Spindles & Bobbins',
      spec: '8 vertical hardened alloy steel spindles with green-rimmed bobbins and high-traction whorl pulleys.',
      function: 'Spins bobbins at up to 1,200+ RPM to insert twist and wind finished premium Khadi yarn.'
    },
    gearboxTransmission: {
      name: 'Transparent Shielded Gear Train & Handwheel Drive',
      spec: '5-spoke manual handwheel with rotating grip, precision meshing spur gears, and transparent acrylic safety guard.',
      function: 'Transfers manual torque from the artisan into synchronized rotation across the transmission and lower dynamo.'
    },
    controlBox: {
      name: 'Smart Telemetry Electronic Enclosure',
      spec: 'Industrial enclosure with OLED digital display (RPM, Tension, Battery 78%, Spindles 8/8), status buttons & LEDs.',
      function: 'Provides real-time production analytics and diagnostic monitoring powered by the onboard flywheel dynamo.'
    },
    footTreadle: {
      name: 'Ribbed Artisan Foot Treadle Linkage',
      spec: 'Tubular 6-rib foot pedal pivoted on lower cross-axle with articulated connecting rod to main drive.',
      function: 'Enables comfortable foot-powered pedaling as an alternative or supplement to manual hand cranking.'
    }
  };

  // State
  const state = {
    currentPreset: 'medium',
    targetHeightMm: 480,
    currentHeightMm: 480,
    currentYOffset: 0.0,
    targetYOffset: 0.0,
    currentLegExt: 0.0,
    targetLegExt: 0.0,
    isAdjusting: false,
    lockPinOffset: 0.0,
    isAutoCycling: false,
    autoCycleTimer: null,
    time: 0
  };

  let scene, camera, renderer, controls;
  let animFrameId = null;
  let clock = new THREE.Clock();

  const groups = {
    world: null,
    baseFeetGroup: null,
    machineAssemblyGroup: null, // Moves vertically UP/DOWN
    legsOuterGroup: null,
    spindlesUpperGroup: null,
    draftingGroup: null,
    spindlesLowerGroup: null,
    gearboxGroup: null,
    controlBoxGroup: null,
    treadleGroup: null,
    lockingPinsGroup: null,
    arrowIndicatorsGroup: null,
    onScreenLabelsGroup: null
  };

  const animMesh = {
    machineAssembly: null,
    innerLegs: [],
    outerLegSleeves: [],
    lockingPins: [],
    lockSparkles: [],
    handwheel: null,
    gears: [],
    spindles: [],
    bobbinsLower: [],
    bobbinsUpper: [],
    draftRollers: [],
    treadleRocker: null,
    arrowMeshes: []
  };

  let mats = {};
  let dom = {};

  document.addEventListener('DOMContentLoaded', initStudio);

  function initStudio() {
    const container = document.getElementById('seat3dCanvasContainer');
    if (!container) return;

    cacheDomElements();
    initThreeScene(container);
    buildEngineeringMaterials();
    buildExactReferenceMachineCAD();
    bindEventListeners();
    applyHeightPreset('medium', false);
    startAnimationLoop();

    window.addEventListener('resize', onWindowResize);
  }

  function cacheDomElements() {
    dom.container = document.getElementById('seat3dCanvasContainer');
    dom.btnLow = document.getElementById('seatBtnLow');
    dom.btnMedium = document.getElementById('seatBtnMed');
    dom.btnHigh = document.getElementById('seatBtnHigh');
    dom.btnAutoCycle = document.getElementById('seatBtnAutoCycle');
    dom.sliderHeight = document.getElementById('seatHeightSlider');
    dom.sliderValText = document.getElementById('seatHeightSliderVal');

    dom.modeHandBtn = document.getElementById('seatModeHandBtn');
    dom.modePedalBtn = document.getElementById('seatModePedalBtn');
    dom.viewBtns = document.querySelectorAll('[data-seat-view]');

    dom.valHeightMm = document.getElementById('seatTelemHeightMm');
    dom.valLockStatus = document.getElementById('seatTelemLockStatus');
    dom.valKneeAngle = document.getElementById('seatTelemKneeAngle');
    dom.valSpineStrain = document.getElementById('seatTelemSpineStrain');
    dom.valArtisanFit = document.getElementById('seatTelemArtisanFit');

    dom.infoBadge = document.getElementById('seatInfoBadge');
    dom.infoTitle = document.getElementById('seatInfoTitle');
    dom.infoTagline = document.getElementById('seatInfoTagline');
    dom.infoDesc = document.getElementById('seatInfoDesc');
    dom.infoStatsList = document.getElementById('seatInfoStatsList');

    dom.cadBox = document.getElementById('seatCadInspectBox');
    dom.cadName = document.getElementById('seatCadCompName');
    dom.cadSpec = document.getElementById('seatCadCompSpec');
    dom.cadFunc = document.getElementById('seatCadCompFunc');
    dom.cadClose = document.getElementById('seatCadCloseBtn');
  }

  function initThreeScene(container) {
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a101d);
    scene.fog = new THREE.FogExp2(0x0a101d, 0.035);

    camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(3.8, 1.9, 4.2);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 1.5;
    controls.maxDistance = 8.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.target.set(0.0, 0.15, 0.0);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const mainKey = new THREE.DirectionalLight(0xfff7ed, 1.5);
    mainKey.position.set(6, 9, 6);
    mainKey.castShadow = true;
    mainKey.shadow.mapSize.width = 2048;
    mainKey.shadow.mapSize.height = 2048;
    scene.add(mainKey);

    const fillCyan = new THREE.DirectionalLight(0x06b6d4, 1.1);
    fillCyan.position.set(-6, 5, -5);
    scene.add(fillCyan);

    const warmFill = new THREE.PointLight(0xf59e0b, 1.2, 10);
    warmFill.position.set(0, 1.6, 1.8);
    scene.add(warmFill);

    // Grid and Floor
    const gridHelper = new THREE.GridHelper(10, 20, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -0.9;
    scene.add(gridHelper);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.MeshStandardMaterial({ color: 0x0d1424, roughness: 0.7, metalness: 0.25 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.91;
    floor.receiveShadow = true;
    scene.add(floor);
  }

  function buildEngineeringMaterials() {
    // Exact Sage-Grey / Industrial Metal Body from Reference Image
    mats.sageGrey = new THREE.MeshStandardMaterial({
      color: 0x66736c,
      metalness: 0.65,
      roughness: 0.42
    });
    mats.sageGreyDark = new THREE.MeshStandardMaterial({
      color: 0x48524d,
      metalness: 0.75,
      roughness: 0.38
    });
    mats.steelChrome = new THREE.MeshStandardMaterial({
      color: 0xebf1f8,
      metalness: 0.96,
      roughness: 0.14
    });
    mats.rubberBlack = new THREE.MeshStandardMaterial({
      color: 0x181a19,
      roughness: 0.9,
      metalness: 0.05
    });
    mats.redCap = new THREE.MeshStandardMaterial({
      color: 0xc52222,
      metalness: 0.85,
      roughness: 0.25
    });
    mats.greenRim = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.4,
      metalness: 0.3
    });
    mats.yarnCream = new THREE.MeshStandardMaterial({
      color: 0xf6f1e5,
      roughness: 0.95,
      metalness: 0.02
    });
    mats.cotBeige = new THREE.MeshStandardMaterial({
      color: 0xd6c4a5,
      roughness: 0.55,
      metalness: 0.1
    });
    mats.cotBlack = new THREE.MeshStandardMaterial({
      color: 0x242424,
      roughness: 0.65,
      metalness: 0.15
    });
    mats.acrylicCover = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.38,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.45
    });
    mats.gearBronze = new THREE.MeshStandardMaterial({
      color: 0x8a7a60,
      metalness: 0.88,
      roughness: 0.3
    });
    mats.brass = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.25
    });
    mats.oledDisplay = new THREE.MeshStandardMaterial({
      color: 0x0a224a,
      emissive: 0x063168,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.85
    });
    mats.ledGreen = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    mats.ledRed = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    mats.arrowCyan = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.9 });
    mats.saffronGlow = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.85 });
  }

  // --- BUILD 3D EXACT REFERENCE KHADI MACHINE CAD MODEL ---
  function buildExactReferenceMachineCAD() {
    groups.world = new THREE.Group();
    scene.add(groups.world);

    // 1. Fixed Base Feet (Rubber pads firmly planted on ground)
    buildFixedFloorPads();

    // 2. Main Elevated Machine Assembly (Moves vertically UP/DOWN on height change)
    groups.machineAssemblyGroup = new THREE.Group();
    groups.machineAssemblyGroup.position.set(0, 0, 0); // Animated Y
    animMesh.machineAssembly = groups.machineAssemblyGroup;

    // A. Main Structural Framework & 4 A-frame Inclined Legs
    buildMainMachineChassisAndLegs();

    // B. Left-Side Power Transmission: 5-Spoke Handwheel, Acrylic Gearbox & Lower Dynamo Box
    buildLeftDriveAndGearbox();

    // C. Upper Spindle Tier: 8 Bobbins with Red Anodized Caps & Break Sensors
    buildUpperSpindleTier();

    // D. Middle Drafting Zone: 8 Dual-Cot Drafting Rollers & Chrome Guides
    buildMiddleDraftingZone();

    // E. Lower Spindle Tier: 8 Spinning Bobbins with Green Base Rims
    buildLowerSpindleTier();

    // F. Right-Side Electronic Control & Telemetry Box with OLED Display
    buildRightControlBox();

    // G. Foot Treadle / Pedal with 6 Ribbed Bars at Bottom
    buildCenterFootTreadle();

    groups.world.add(groups.machineAssemblyGroup);

    // 3. Dual Spring-Loaded Detent Locking Mechanism on Telescopic Legs
    buildLegLockingMechanism();

    // 4. On-Screen Technical Labels & UP ↕ DOWN Motion Indicators
    buildVisualAnnotations();
  }

  // 1. Fixed Floor Foot Pads (Anchored at Y = -0.88)
  function buildFixedFloorPads() {
    groups.baseFeetGroup = new THREE.Group();
    groups.baseFeetGroup.name = 'telescopicLegs';

    // 4 Corner Foot Pads (X: +/- 1.15, Z: +/- 0.42)
    const footPositions = [
      { x: -1.15, z: 0.42 }, { x: 1.15, z: 0.42 },
      { x: -1.15, z: -0.42 }, { x: 1.15, z: -0.42 }
    ];

    footPositions.forEach(p => {
      // Black Rubber Tapered Foot Base
      const footGeo = new THREE.CylinderGeometry(0.065, 0.08, 0.08, 4);
      footGeo.rotateY(Math.PI / 4);
      const foot = new THREE.Mesh(footGeo, mats.rubberBlack);
      foot.position.set(p.x, -0.84, p.z);
      foot.castShadow = true;
      groups.baseFeetGroup.add(foot);

      // Inner Telescopic Square Steel Leg Insert (Extends upward into outer leg sleeve)
      const innerLegGeo = new THREE.BoxGeometry(0.062, 0.65, 0.062);
      const innerLeg = new THREE.Mesh(innerLegGeo, mats.sageGreyDark);
      innerLeg.position.set(p.x, -0.52, p.z);
      innerLeg.castShadow = true;
      groups.baseFeetGroup.add(innerLeg);
      animMesh.innerLegs.push(innerLeg);

      // Multiple CNC Index Holes along the inner leg
      [-0.12, 0.0, 0.12].forEach(hY => {
        const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.066, 12), mats.rubberBlack);
        hole.rotation.z = Math.PI / 2;
        hole.position.set(p.x, -0.52 + hY, p.z);
        groups.baseFeetGroup.add(hole);
      });
    });

    groups.world.add(groups.baseFeetGroup);
  }

  // 2A. Main Machine Chassis Frame & 4 Outer A-Frame Telescopic Legs
  function buildMainMachineChassisAndLegs() {
    groups.machineFrameGroup = new THREE.Group();
    groups.machineFrameGroup.name = 'telescopicLegs';

    // Horizontal Deck Cross-Beam (Sage-Grey Box Beam)
    const lowerDeck = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.10, 0.55), mats.sageGrey);
    lowerDeck.position.set(0, -0.22, 0);
    lowerDeck.castShadow = true;
    groups.machineFrameGroup.add(lowerDeck);

    // Top Overhead Arch Beam
    const topBeam = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.08, 0.20), mats.sageGrey);
    topBeam.position.set(0, 0.95, 0);
    topBeam.castShadow = true;
    groups.machineFrameGroup.add(topBeam);

    // Left & Right Vertical A-Frame Columns
    [-1.2, 1.2].forEach(xPos => {
      const vert = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.15, 0.20), mats.sageGrey);
      vert.position.set(xPos, 0.36, 0);
      groups.machineFrameGroup.add(vert);
    });

    // 4 Inclined Outer Telescopic Leg Sleeves (Slide over the inner feet)
    const legSleeves = [
      { x: -1.15, z: 0.42 }, { x: 1.15, z: 0.42 },
      { x: -1.15, z: -0.42 }, { x: 1.15, z: -0.42 }
    ];

    legSleeves.forEach(p => {
      const sleeveGeo = new THREE.BoxGeometry(0.082, 0.52, 0.082);
      const sleeve = new THREE.Mesh(sleeveGeo, mats.sageGrey);
      sleeve.position.set(p.x, -0.45, p.z);
      sleeve.castShadow = true;
      groups.machineFrameGroup.add(sleeve);
      animMesh.outerLegSleeves.push(sleeve);

      // Diagonal A-Frame Support Struts to Main Deck
      const strutGeo = new THREE.BoxGeometry(0.04, 0.42, 0.04);
      const strut = new THREE.Mesh(strutGeo, mats.sageGrey);
      strut.position.set(p.x * 0.75, -0.32, p.z * 0.7);
      strut.rotation.z = p.x < 0 ? -0.45 : 0.45;
      groups.machineFrameGroup.add(strut);
    });

    groups.machineAssemblyGroup.add(groups.machineFrameGroup);
  }

  // 2B. Left Drive System: 5-Spoke Handwheel, Acrylic Gearbox & Dynamo Box
  function buildLeftDriveAndGearbox() {
    groups.gearboxGroup = new THREE.Group();
    groups.gearboxGroup.position.set(-1.32, 0.20, 0);
    groups.gearboxGroup.name = 'gearboxTransmission';

    // 5-Spoke Manual Handwheel with Black Rotating Grip
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(-0.16, 0.25, 0);

    const wheelRim = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.03, 16, 36), mats.sageGreyDark);
    wheelRim.rotation.y = Math.PI / 2;
    wheelRim.castShadow = true;
    wheelGroup.add(wheelRim);

    const wheelHub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 20), mats.steelChrome);
    wheelHub.rotation.z = Math.PI / 2;
    wheelGroup.add(wheelHub);

    // 5 Spokes
    for (let s = 0; s < 5; s++) {
      const sAngle = (s * Math.PI * 2) / 5;
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.36, 12), mats.sageGreyDark);
      spoke.position.set(0, Math.sin(sAngle) * 0.18, Math.cos(sAngle) * 0.18);
      spoke.rotation.x = sAngle;
      wheelGroup.add(spoke);
    }

    // Crank Arm & Black Handle Grip
    const crankArm = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.25, 0.05), mats.sageGreyDark);
    crankArm.position.set(-0.04, 0.22, 0);
    wheelGroup.add(crankArm);

    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.034, 0.22, 16), mats.rubberBlack);
    grip.rotation.z = Math.PI / 2;
    grip.position.set(-0.16, 0.32, 0);
    wheelGroup.add(grip);

    animMesh.handwheel = wheelGroup;
    groups.gearboxGroup.add(wheelGroup);

    // Transparent Polycarbonate / Acrylic Gearbox Cover Guard
    const coverGeo = new THREE.BoxGeometry(0.18, 0.65, 0.55);
    const cover = new THREE.Mesh(coverGeo, mats.acrylicCover);
    cover.position.set(0, 0.18, 0);
    groups.gearboxGroup.add(cover);

    // Multiple Meshing Steel & Bronze Spur Gears inside Cover
    const gearConfigs = [
      { r: 0.18, y: 0.28, z: 0.0 },
      { r: 0.12, y: 0.08, z: -0.12 },
      { r: 0.15, y: -0.05, z: 0.10 },
      { r: 0.10, y: 0.38, z: 0.12 }
    ];

    gearConfigs.forEach(g => {
      const gear = new THREE.Mesh(new THREE.CylinderGeometry(g.r, g.r, 0.035, 24), mats.gearBronze);
      gear.rotation.z = Math.PI / 2;
      gear.position.set(0.01, g.y, g.z);
      groups.gearboxGroup.add(gear);
      animMesh.gears.push(gear);
    });

    // Timing Belt from Handwheel Shaft down to Dynamo
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.72, 8), mats.rubberBlack);
    belt.position.set(-0.06, -0.12, -0.08);
    belt.rotation.z = -0.18;
    groups.gearboxGroup.add(belt);

    // Lower Dynamo / Flywheel Ventilated Box (Sage-Grey Box with Slots)
    const dynamoBox = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.35, 0.38), mats.sageGrey);
    dynamoBox.position.set(0, -0.42, 0);
    dynamoBox.castShadow = true;
    groups.gearboxGroup.add(dynamoBox);

    // Dynamo Motor Cylinder & Pulley
    const motorCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.24, 20), mats.steelChrome);
    motorCyl.rotation.z = Math.PI / 2;
    motorCyl.position.set(0, -0.25, 0);
    groups.gearboxGroup.add(motorCyl);

    groups.machineAssemblyGroup.add(groups.gearboxGroup);
  }

  // 2C. Upper Tier: 8 Vertical Creel Bobbins with Red Anodized Caps & Break Sensors
  function buildUpperSpindleTier() {
    groups.spindlesUpperGroup = new THREE.Group();
    groups.spindlesUpperGroup.position.set(0, 0.78, 0);
    groups.spindlesUpperGroup.name = 'spindleTierUpper';

    const numSpindles = 8;
    const spacing = 0.23;
    const startX = -((numSpindles - 1) * spacing) / 2;

    for (let i = 0; i < numSpindles; i++) {
      const xPos = startX + i * spacing;

      // Vertical Spindle Pin
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.32, 12), mats.steelChrome);
      pin.position.set(xPos, 0, 0);
      groups.spindlesUpperGroup.add(pin);

      // Red Anodized Top Cap with Knurled Collar
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.05, 16), mats.redCap);
      cap.position.set(xPos, 0.14, 0);
      groups.spindlesUpperGroup.add(cap);

      // Optical Yarn-Break Sensor Block (Black cube with Red LED)
      const sensorBlock = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.038, 0.038), mats.rubberBlack);
      sensorBlock.position.set(xPos + 0.035, 0.14, 0.02);
      groups.spindlesUpperGroup.add(sensorBlock);

      const sensorLed = new THREE.Mesh(new THREE.SphereGeometry(0.007, 8, 8), mats.ledRed);
      sensorLed.position.set(xPos + 0.035, 0.14, 0.042);
      groups.spindlesUpperGroup.add(sensorLed);

      // Upper Supply Bobbin with Cream Yarn
      const bobbin = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.046, 0.22, 20), mats.yarnCream);
      bobbin.position.set(xPos, 0, 0);
      bobbin.castShadow = true;
      groups.spindlesUpperGroup.add(bobbin);
      animMesh.bobbinsUpper.push(bobbin);

      // Lower Sensor Bracket with Red LED below each Upper Bobbin
      const lowSensor = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.03), mats.rubberBlack);
      lowSensor.position.set(xPos, -0.15, 0.02);
      groups.spindlesUpperGroup.add(lowSensor);

      const lowLed = new THREE.Mesh(new THREE.SphereGeometry(0.006, 8, 8), mats.ledRed);
      lowLed.position.set(xPos, -0.15, 0.038);
      groups.spindlesUpperGroup.add(lowLed);
    }

    groups.machineAssemblyGroup.add(groups.spindlesUpperGroup);
  }

  // 2D. Middle Tier: 8 Dual-Cot Drafting Rollers & Chrome Guides
  function buildMiddleDraftingZone() {
    groups.draftingGroup = new THREE.Group();
    groups.draftingGroup.position.set(0, 0.38, 0.08);
    groups.draftingGroup.name = 'draftingZone';

    // Dual Longitudinal Chrome Shafts
    [-0.04, 0.04].forEach(yOff => {
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 2.1, 16), mats.steelChrome);
      shaft.rotation.z = Math.PI / 2;
      shaft.position.set(0, yOff, 0);
      groups.draftingGroup.add(shaft);
    });

    const numSpindles = 8;
    const spacing = 0.23;
    const startX = -((numSpindles - 1) * spacing) / 2;

    for (let i = 0; i < numSpindles; i++) {
      const xPos = startX + i * spacing;

      // Dual-Tone Drafting Roller (Beige Rubber Cot with Black Core)
      const cotBeige = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.055, 20), mats.cotBeige);
      cotBeige.rotation.z = Math.PI / 2;
      cotBeige.position.set(xPos, 0.04, 0.04);
      groups.draftingGroup.add(cotBeige);
      animMesh.draftRollers.push(cotBeige);

      const cotBlack = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.045, 20), mats.cotBlack);
      cotBlack.rotation.z = Math.PI / 2;
      cotBlack.position.set(xPos, -0.04, 0.04);
      groups.draftingGroup.add(cotBlack);

      // Stainless Steel Thread Guides
      const guide = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.12, 8), mats.steelChrome);
      guide.position.set(xPos, 0, 0.08);
      groups.draftingGroup.add(guide);
    }

    groups.machineAssemblyGroup.add(groups.draftingGroup);
  }

  // 2E. Lower Tier: 8 Spinning Bobbins with Green Base Rims
  function buildLowerSpindleTier() {
    groups.spindlesLowerGroup = new THREE.Group();
    groups.spindlesLowerGroup.position.set(0, -0.04, 0.12);
    groups.spindlesLowerGroup.name = 'spindleTierLower';

    const numSpindles = 8;
    const spacing = 0.23;
    const startX = -((numSpindles - 1) * spacing) / 2;

    for (let i = 0; i < numSpindles; i++) {
      const xPos = startX + i * spacing;

      // Vertical Hardened Spindle
      const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.32, 12), mats.steelChrome);
      spindle.position.set(xPos, 0, 0);
      groups.spindlesLowerGroup.add(spindle);
      animMesh.spindles.push(spindle);

      // Lower Spinning Bobbin with Cream Thread
      const bobbin = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.042, 0.22, 20), mats.yarnCream);
      bobbin.position.set(xPos, 0.02, 0);
      bobbin.castShadow = true;
      groups.spindlesLowerGroup.add(bobbin);
      animMesh.bobbinsLower.push(bobbin);

      // Green Base Flange Rim
      const greenBase = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.016, 20), mats.greenRim);
      greenBase.position.set(xPos, -0.09, 0);
      groups.spindlesLowerGroup.add(greenBase);

      // Whited Yarn Strand Line (Connecting Upper Tier -> Drafting Zone -> Lower Bobbin)
      const yarnGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(xPos, 0.82, -0.12),
        new THREE.Vector3(xPos, 0.42, -0.04),
        new THREE.Vector3(xPos, 0.12, 0.0)
      ]);
      const yarn = new THREE.Line(yarnGeo, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
      groups.spindlesLowerGroup.add(yarn);
    }

    groups.machineAssemblyGroup.add(groups.spindlesLowerGroup);
  }

  // 2F. Right Electronic Control & Telemetry Box with OLED Display
  function buildRightControlBox() {
    groups.controlBoxGroup = new THREE.Group();
    groups.controlBoxGroup.position.set(1.30, 0.42, 0.10);
    groups.controlBoxGroup.name = 'controlBox';

    // Heavy Sage-Grey Control Enclosure with Front Bezel
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.52, 0.22), mats.sageGrey);
    box.castShadow = true;
    groups.controlBoxGroup.add(box);

    // 4 Corner Hex Mounting Screws on Front Panel
    [
      { x: -0.16, y: 0.22 }, { x: 0.16, y: 0.22 },
      { x: -0.16, y: -0.22 }, { x: 0.16, y: -0.22 }
    ].forEach(s => {
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.02, 6), mats.steelChrome);
      screw.rotation.x = Math.PI / 2;
      screw.position.set(s.x, s.y, 0.115);
      groups.controlBoxGroup.add(screw);
    });

    // OLED Digital Telemetry Display Screen Canvas
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 256;
    screenCanvas.height = 192;
    const sCtx = screenCanvas.getContext('2d');

    // Draw Dark Blue Digital Display
    sCtx.fillStyle = '#061633';
    sCtx.fillRect(0, 0, 256, 192);
    sCtx.strokeStyle = '#0284c7';
    sCtx.lineWidth = 4;
    sCtx.strokeRect(4, 4, 248, 184);

    sCtx.font = 'bold 20px "JetBrains Mono", monospace';
    sCtx.fillStyle = '#93c5fd';
    sCtx.fillText('RPM', 20, 42);
    sCtx.fillStyle = '#ffffff';
    sCtx.fillText('120', 180, 42);

    sCtx.fillStyle = '#93c5fd';
    sCtx.fillText('Tension', 20, 80);
    sCtx.fillStyle = '#10b981';
    sCtx.fillText('OK', 190, 80);

    sCtx.fillStyle = '#93c5fd';
    sCtx.fillText('Battery', 20, 118);
    sCtx.fillStyle = '#38bdf8';
    sCtx.fillText('78%', 170, 118);

    sCtx.fillStyle = '#93c5fd';
    sCtx.fillText('Spindles', 20, 156);
    sCtx.fillStyle = '#10b981';
    sCtx.fillText('8/8', 180, 156);

    const screenTex = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.30, 0.22), screenMat);
    screenMesh.position.set(0, 0.08, 0.112);
    groups.controlBoxGroup.add(screenMesh);

    // Green Push Button
    const btnGreen = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.02, 16), mats.ledGreen);
    btnGreen.rotation.x = Math.PI / 2;
    btnGreen.position.set(-0.08, -0.14, 0.115);
    groups.controlBoxGroup.add(btnGreen);

    // Red Push Button
    const btnRed = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.02, 16), mats.ledRed);
    btnRed.rotation.x = Math.PI / 2;
    btnRed.position.set(0.0, -0.14, 0.115);
    groups.controlBoxGroup.add(btnRed);

    // Circular Diagnostic Socket
    const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.015, 16), mats.rubberBlack);
    socket.rotation.x = Math.PI / 2;
    socket.position.set(0.08, -0.14, 0.115);
    groups.controlBoxGroup.add(socket);

    groups.machineAssemblyGroup.add(groups.controlBoxGroup);
  }

  // 2G. Center-Bottom Foot Treadle / Pedal System (6 Ribbed Parallel Bars)
  function buildCenterFootTreadle() {
    groups.treadleGroup = new THREE.Group();
    groups.treadleGroup.position.set(0, -0.58, 0.38);
    groups.treadleGroup.name = 'footTreadle';

    // Horizontal Pivot Axle Bar
    const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.95, 16), mats.steelChrome);
    axle.rotation.z = Math.PI / 2;
    axle.position.set(0, 0, -0.18);
    groups.treadleGroup.add(axle);

    // Dual Angled Swing Arms
    [-0.35, 0.35].forEach(xPos => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.42, 12), mats.sageGreyDark);
      arm.rotation.x = 0.65;
      arm.position.set(xPos, -0.08, -0.04);
      groups.treadleGroup.add(arm);
    });

    // Ribbed Foot Pedal Platform with 6 Parallel Cylindrical Tubes
    const treadleBox = new THREE.Group();
    treadleBox.position.set(0, -0.18, 0.12);
    treadleBox.rotation.x = -0.22;

    const frameOuter = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.035, 0.38), mats.sageGreyDark);
    treadleBox.add(frameOuter);

    // 6 Ribbed Horizontal Cylinders
    for (let r = -0.14; r <= 0.14; r += 0.055) {
      const rib = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.58, 16), mats.sageGrey);
      rib.rotation.z = Math.PI / 2;
      rib.position.set(0, 0.018, r);
      treadleBox.add(rib);
    }

    animMesh.treadleRocker = treadleBox;
    groups.treadleGroup.add(treadleBox);

    groups.machineAssemblyGroup.add(groups.treadleGroup);
  }

  // 3. Dual Spring-Loaded Detent Locking Pins on Telescopic A-Frame Legs
  function buildLegLockingMechanism() {
    groups.lockingMechanismGroup = new THREE.Group();
    groups.lockingMechanismGroup.name = 'telescopicLegs';

    [-1.15, 1.15].forEach(xPos => {
      const lockGroup = new THREE.Group();
      lockGroup.position.set(xPos, -0.45, 0.46);

      // Red Anodized Detent Pin
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.08, 16), mats.redCap);
      pin.rotation.x = Math.PI / 2;
      pin.position.set(0, 0, 0.02);
      lockGroup.add(pin);
      animMesh.lockingPins.push(pin);

      // Knurled Brass Knob
      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.03, 16), mats.brass);
      knob.rotation.x = Math.PI / 2;
      knob.position.set(0, 0, 0.06);
      lockGroup.add(knob);

      // Sparkle Glow Mesh
      const sparkle = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), mats.saffronGlow);
      sparkle.visible = false;
      lockGroup.add(sparkle);
      animMesh.lockSparkles.push(sparkle);

      groups.lockingMechanismGroup.add(lockGroup);
    });

    groups.world.add(groups.lockingMechanismGroup);
  }

  // 4. On-Screen Technical Labels & UP ↕ DOWN Motion Indicators
  function buildVisualAnnotations() {
    groups.arrowIndicatorsGroup = new THREE.Group();
    groups.arrowIndicatorsGroup.position.set(1.55, 0.15, 0);

    // Double-Headed Vertical Arrow (UP ↕ DOWN)
    const upCone = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.11, 8), mats.arrowCyan);
    upCone.position.set(0, 0.38, 0);
    groups.arrowIndicatorsGroup.add(upCone);

    const downCone = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.11, 8), mats.arrowCyan);
    downCone.rotation.x = Math.PI;
    downCone.position.set(0, -0.38, 0);
    groups.arrowIndicatorsGroup.add(downCone);

    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.65, 8), mats.arrowCyan);
    shaft.position.set(0, 0, 0);
    groups.arrowIndicatorsGroup.add(shaft);

    animMesh.arrowMeshes.push(groups.arrowIndicatorsGroup);
    groups.world.add(groups.arrowIndicatorsGroup);

    // 3D Billboard Labels
    groups.onScreenLabelsGroup = new THREE.Group();

    const titleSprite = createTextSprite('Ergonomic Height Adjustment', '#f59e0b', 300, 56);
    titleSprite.position.set(0, 1.45, 0);
    groups.onScreenLabelsGroup.add(titleSprite);

    const labelSprite = createTextSprite('Adjustable Machine Height ↕', '#06b6d4', 250, 48);
    labelSprite.position.set(1.55, 0.58, 0);
    groups.onScreenLabelsGroup.add(labelSprite);

    groups.world.add(groups.onScreenLabelsGroup);
  }

  function createTextSprite(message, colorHex, w = 300, h = 56) {
    const canvas = document.createElement('canvas');
    canvas.width = w * 2;
    canvas.height = h * 2;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(7, 12, 24, 0.88)';
    ctx.strokeStyle = colorHex;
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(4, 4, w * 2 - 8, h * 2 - 8, 12);
    } else {
      ctx.rect(4, 4, w * 2 - 8, h * 2 - 8);
    }
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.fillStyle = colorHex;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(message, w, h);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.95 });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(w / 350, h / 350, 1.0);
    return sprite;
  }

  // --- HEIGHT ADJUSTMENT ANIMATION LOGIC ---
  function applyHeightPreset(presetKey, animate = true) {
    const preset = HEIGHT_PRESETS[presetKey];
    if (!preset) return;

    state.currentPreset = presetKey;
    state.targetHeightMm = preset.heightMm;
    state.targetYOffset = preset.yOffset;
    state.targetLegExt = preset.legExt;

    // Update UI Elements
    if (dom.btnLow) dom.btnLow.classList.toggle('active', presetKey === 'low');
    if (dom.btnMedium) dom.btnMedium.classList.toggle('active', presetKey === 'medium');
    if (dom.btnHigh) dom.btnHigh.classList.toggle('active', presetKey === 'high');

    if (dom.sliderHeight) dom.sliderHeight.value = preset.heightMm;
    if (dom.sliderValText) dom.sliderValText.textContent = `${preset.heightMm} mm`;

    if (dom.infoBadge) dom.infoBadge.textContent = `POSITION: ${preset.label} (${preset.heightMm} mm)`;
    if (dom.infoTitle) dom.infoTitle.textContent = `${preset.label} Working Height (${preset.heightMm} mm) — ${preset.primaryMode}`;
    if (dom.infoTagline) dom.infoTagline.textContent = `Tailored for Artisans: ${preset.targetArtisan}`;
    if (dom.infoDesc) dom.infoDesc.textContent = preset.desc;

    if (dom.valHeightMm) dom.valHeightMm.textContent = `${preset.heightMm} mm`;
    if (dom.valKneeAngle) dom.valKneeAngle.textContent = `Position 0${preset.holeIdx + 1} (${preset.label})`;
    if (dom.valSpineStrain) dom.valSpineStrain.textContent = `Positive Detent (Locked)`;
    if (dom.valArtisanFit) dom.valArtisanFit.textContent = preset.targetArtisan;

    if (dom.infoStatsList) {
      dom.infoStatsList.innerHTML = `
        <div class="seat-stat-pill">
          <span class="seat-stat-label">Working Height</span>
          <span class="seat-stat-val">${preset.workingHeight}</span>
        </div>
        <div class="seat-stat-pill">
          <span class="seat-stat-label">Telescopic Leg Extension</span>
          <span class="seat-stat-val">${preset.telescopicExt}</span>
        </div>
        <div class="seat-stat-pill">
          <span class="seat-stat-label">Detent Lock Status</span>
          <span class="seat-stat-val">${preset.lockingState}</span>
        </div>
        <div class="seat-stat-pill">
          <span class="seat-stat-label">Frame Stability</span>
          <span class="seat-stat-val">${preset.stabilityFactor}</span>
        </div>
      `;
    }

    if (!animate) {
      state.currentYOffset = state.targetYOffset;
      state.currentHeightMm = state.targetHeightMm;
      state.currentLegExt = state.targetLegExt;
      if (animMesh.machineAssembly) animMesh.machineAssembly.position.y = state.currentYOffset;
      return;
    }

    // Execute Mechanical Height Glide Sequence
    executeMechanicalHeightGlide();
  }

  function executeMechanicalHeightGlide() {
    state.isAdjusting = true;
    if (dom.valLockStatus) {
      dom.valLockStatus.textContent = '🔓 PIN RETRACTED (GLIDING)';
      dom.valLockStatus.style.color = 'var(--color-saffron)';
    }

    const startY = state.currentYOffset;
    const destY = state.targetYOffset;
    const startHeight = state.currentHeightMm;
    const destHeight = state.targetHeightMm;

    const duration = 1200; // ms
    const startTime = performance.now();

    function stepAdjustment(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1.0);

      // Phase 1 (0% to 20%): Retract Detent Pins
      if (t < 0.2) {
        state.lockPinOffset = (t / 0.2) * 0.05;
      }
      // Phase 2 (20% to 80%): Smooth Vertical Frame Gliding
      else if (t < 0.8) {
        state.lockPinOffset = 0.05;
        const glideT = (t - 0.2) / 0.6;
        const ease = easeInOutCubic(glideT);
        state.currentYOffset = THREE.MathUtils.lerp(startY, destY, ease);
        state.currentHeightMm = Math.round(THREE.MathUtils.lerp(startHeight, destHeight, ease));
      }
      // Phase 3 (80% to 100%): Engage Locking Pin into Target Hole
      else {
        state.currentYOffset = destY;
        state.currentHeightMm = destHeight;
        state.lockPinOffset = ((1.0 - t) / 0.2) * 0.05;
      }

      // Apply animated positions
      if (animMesh.machineAssembly) animMesh.machineAssembly.position.y = state.currentYOffset;
      animMesh.lockingPins.forEach(p => { p.position.z = 0.02 + state.lockPinOffset; });

      if (dom.valHeightMm) dom.valHeightMm.textContent = `${state.currentHeightMm} mm`;

      if (t < 1.0) {
        requestAnimationFrame(stepAdjustment);
      } else {
        state.isAdjusting = false;
        if (dom.valLockStatus) {
          dom.valLockStatus.textContent = '🔒 LOCKED (DETENT ENGAGED)';
          dom.valLockStatus.style.color = 'var(--color-green-eco)';
        }

        animMesh.lockSparkles.forEach(s => { s.visible = true; });
        setTimeout(() => { animMesh.lockSparkles.forEach(s => { s.visible = false; }); }, 450);
      }
    }

    requestAnimationFrame(stepAdjustment);
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // --- ANIMATION LOOP ---
  function startAnimationLoop() {
    function animate() {
      animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      state.time += delta;

      // Subtle synchronized idle rotation of handwheel, gears & spindles
      const baseRot = delta * 2.5;
      if (animMesh.handwheel) animMesh.handwheel.rotation.x += baseRot;

      animMesh.gears.forEach((g, idx) => {
        g.rotation.x += (idx % 2 === 0 ? 1 : -1) * baseRot * 1.8;
      });

      for (let i = 0; i < animMesh.spindles.length; i++) {
        animMesh.spindles[i].rotation.y += baseRot * 7.5;
        animMesh.bobbinsLower[i].rotation.y += baseRot * 7.5;
      }

      // Arrow subtle floating pulse
      if (groups.arrowIndicatorsGroup) {
        const pulse = 1.0 + Math.sin(state.time * 4.0) * 0.08;
        groups.arrowIndicatorsGroup.scale.set(1.0, pulse, 1.0);
      }

      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }

  // --- CONTROLS & EVENT LISTENERS ---
  function bindEventListeners() {
    if (dom.btnLow) dom.btnLow.addEventListener('click', () => applyHeightPreset('low', true));
    if (dom.btnMedium) dom.btnMedium.addEventListener('click', () => applyHeightPreset('medium', true));
    if (dom.btnHigh) dom.btnHigh.addEventListener('click', () => applyHeightPreset('high', true));

    if (dom.sliderHeight) {
      dom.sliderHeight.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.targetHeightMm = val;
        state.currentHeightMm = val;
        state.targetYOffset = ((val - 480) / 60) * 0.22;
        state.currentYOffset = state.targetYOffset;

        if (animMesh.machineAssembly) animMesh.machineAssembly.position.y = state.currentYOffset;
        if (dom.sliderValText) dom.sliderValText.textContent = `${val} mm`;
        if (dom.valHeightMm) dom.valHeightMm.textContent = `${val} mm`;
      });
    }

    if (dom.btnAutoCycle) {
      dom.btnAutoCycle.addEventListener('click', () => {
        state.isAutoCycling = !state.isAutoCycling;
        dom.btnAutoCycle.classList.toggle('active', state.isAutoCycling);
        dom.btnAutoCycle.innerHTML = state.isAutoCycling ? '<span>⏸</span> PAUSE DEMO CYCLE' : '<span>▶</span> AUTO DEMO CYCLE';

        if (state.isAutoCycling) startAutoCycle();
        else clearInterval(state.autoCycleTimer);
      });
    }

    if (dom.modeHandBtn) {
      dom.modeHandBtn.addEventListener('click', () => {
        dom.modeHandBtn.classList.add('active');
        if (dom.modePedalBtn) dom.modePedalBtn.classList.remove('active');
      });
    }

    if (dom.modePedalBtn) {
      dom.modePedalBtn.addEventListener('click', () => {
        dom.modePedalBtn.classList.add('active');
        if (dom.modeHandBtn) dom.modeHandBtn.classList.remove('active');
      });
    }

    if (dom.viewBtns) {
      dom.viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          dom.viewBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const viewType = btn.getAttribute('data-seat-view');
          switchCameraView(viewType);
        });
      });
    }

  }

  function startAutoCycle() {
    const cycle = ['low', 'medium', 'high', 'medium'];
    let cIdx = 0;

    clearInterval(state.autoCycleTimer);
    state.autoCycleTimer = setInterval(() => {
      if (!state.isAutoCycling) {
        clearInterval(state.autoCycleTimer);
        return;
      }
      cIdx = (cIdx + 1) % cycle.length;
      applyHeightPreset(cycle[cIdx], true);
    }, 2800);
  }

  function switchCameraView(viewType) {
    let targetPos, targetLookAt;

    switch (viewType) {
      case 'isometric':
        targetPos = { x: 3.8, y: 1.9, z: 4.2 };
        targetLookAt = { x: 0.0, y: 0.15, z: 0.0 };
        break;
      case 'lock':
        targetPos = { x: 1.4, y: -0.3, z: 1.2 };
        targetLookAt = { x: 1.15, y: -0.45, z: 0.42 };
        break;
      case 'telescopic':
        targetPos = { x: -1.6, y: -0.2, z: 1.3 };
        targetLookAt = { x: -1.15, y: -0.45, z: 0.42 };
        break;
      case 'machine':
        targetPos = { x: 0.0, y: 1.1, z: 3.6 };
        targetLookAt = { x: 0.0, y: 0.35, z: 0.0 };
        break;
      default:
        targetPos = { x: 3.8, y: 1.9, z: 4.2 };
        targetLookAt = { x: 0.0, y: 0.15, z: 0.0 };
    }

    animateCameraTo(targetPos, targetLookAt, 900);
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

  function onWindowResize() {
    if (!dom.container || !renderer || !camera) return;
    const width = dom.container.clientWidth;
    const height = dom.container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

})();
