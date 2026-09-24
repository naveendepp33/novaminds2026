/**
 * SMART KHADHI CHAKRA - Interactive 3D System Architecture Engine
 * High-Precision 3D CAD Engineering Visualizer (Three.js)
 * Accurately Modeled after the 8-Spindle Prototype in assets/images/product.jpeg
 * SIH26020 - Team NOVAMINDS
 */

(function () {
  'use strict';

  // --- 10 COMPONENT DATABASE FOR INTERACTIVE INSPECTOR ---
  const COMPONENT_DATA = {
    'input': {
      mode: 'mechanical',
      tag: 'MECH-01',
      num: '01',
      title: 'Manual Hand Crank & Wheel',
      category: 'Primary Human Power Input (100% Manual)',
      badge: '100% MANUAL MECHANICAL DRIVE',
      badgeClass: 'badge-manual',
      desc: 'Left-side ergonomic manual handwheel with wooden grip. Direct human torque drives the primary input shaft without any electric motor assistance.',
      specs: [
        { label: 'Drive Type', val: 'Direct Human Hand Power' },
        { label: 'Motor Presence', val: '0% (NO ELECTRIC MOTOR)' },
        { label: 'Input Wheel Dia.', val: '220 mm Spoked Wheel' },
        { label: 'Operating Speed', val: '50 – 70 RPM Hand Cadence' },
        { label: 'Crank Ergonomics', val: 'Low-Strain Rotating Grip' },
        { label: 'Material', val: 'Precision Cast Alloy + Teak' }
      ],
      principle: 'Manual rotational input directly turns the main horizontal transmission shaft, initiating the entire mechanical drive train.',
      statLabel: 'Input Power',
      statVal: 'HUMAN EFFORT (MANUAL)',
      statUnit: '0 Watts Electric'
    },
    'clutch': {
      mode: 'mechanical',
      tag: 'MECH-02',
      num: '02',
      title: 'One-Way Clutch / Freewheel',
      category: 'Unidirectional Torque Transmission',
      badge: 'UNIDIRECTIONAL OVERRUNNING CLUTCH',
      badgeClass: 'badge-manual',
      desc: 'Mechanical sprag freewheel clutch on the primary shaft. Transfers forward drive torque while preventing reverse kickback and allowing inertial coasting.',
      specs: [
        { label: 'Mechanism', val: 'Sprag Overrunning Freewheel' },
        { label: 'Reverse Drive', val: '100% Isolated / Prevented' },
        { label: 'Engagement', val: '< 1.5° Instant Forward Lock' },
        { label: 'Coasting Ability', val: 'Permits Flywheel Overrun' },
        { label: 'Safety Feature', val: 'Zero Backward Jerk on Hand' },
        { label: 'Durability', val: '50,000 hrs Continuous Spec' }
      ],
      principle: 'Transfers useful forward torque while isolating reverse motion, ensuring safe and continuous unidirectional spinning.',
      statLabel: 'Clutch State',
      statVal: 'FORWARD ENGAGED',
      statUnit: 'Torque Lock'
    },
    'flywheel': {
      mode: 'mechanical',
      tag: 'MECH-03',
      num: '03',
      title: 'Inertial Balance Flywheel',
      category: 'Rotational Velocity Smoothing',
      badge: 'INERTIAL MOMENTUM BUFFER',
      badgeClass: 'badge-manual',
      desc: 'Secondary rim-weighted flywheel coupled via high-traction belt. Stores rotational kinetic energy to damp manual cadence variations and stabilize spindle RPM.',
      specs: [
        { label: 'Flywheel Mass', val: '2.4 kg Rim-Weighted Cast' },
        { label: 'Moment of Inertia', val: '0.042 kg·m²' },
        { label: 'Cadence Buffer', val: 'Reduces Speed Jitter by 78%' },
        { label: 'Belt Linkage', val: 'High-Friction Poly-V Belt' },
        { label: 'RPM Smoothing', val: '± 3.8% Constant Velocity' },
        { label: 'Twist Stability', val: 'Guarantees Uniform TPI' }
      ],
      principle: 'Stores rotational kinetic energy (E = ½Iω²) during power strokes to smooth speed fluctuations during manual operation.',
      statLabel: 'Rotational Inertia',
      statVal: 'SMOOTHED (32.4 J)',
      statUnit: 'Buffer Active'
    },
    'gearing': {
      mode: 'mechanical',
      tag: 'MECH-04',
      num: '04',
      title: 'Gear & Shaft Transmission',
      category: 'Mechanical Speed Ratio Distribution',
      badge: 'RIGHT-SIDE MESHING GEAR TRAIN',
      badgeClass: 'badge-manual',
      desc: 'Right-side meshing spur and pinion gears with dual horizontal drafting shafts and intermediate distributor shafts delivering balanced torque across all 8 spinning stations.',
      specs: [
        { label: 'Gear Topology', val: 'Right-Side Meshing Spur Train' },
        { label: 'Step-Up Ratio', val: '1 : 10.8 Speed Multiplier' },
        { label: 'Shafts', val: 'Fluted Steel + Drafting Rollers' },
        { label: 'Drafting Arms', val: '4 Paired Spring-Loaded Cot Heads' },
        { label: 'Bearing Type', val: 'Sealed Deep-Groove Ball' },
        { label: 'Efficiency', val: '95.2% Mechanical Transfer' }
      ],
      principle: 'Transfers and distributes human-generated rotation across the drafting rollers and multi-spindle drive shafts.',
      statLabel: 'Drive Ratio',
      statVal: '1 : 10.8 STEP-UP',
      statUnit: 'Meshed Gears'
    },
    'spindles': {
      mode: 'mechanical',
      tag: 'MECH-05',
      num: '05',
      title: '8-Spindle Simultaneous Array',
      category: 'Simultaneous Multi-Yarn Spinning',
      badge: 'EXACTLY 8 ACTIVE SPINDLES',
      badgeClass: 'badge-manual',
      desc: 'Eight lower precision vertical spinning spindles mounted into the heavy base rail. All 8 spindles rotate synchronously to quadruple daily Khadi yarn production.',
      specs: [
        { label: 'Spindle Count', val: 'EXACTLY 8 SPINDLES' },
        { label: 'Spindle Speed', val: '650 – 800 RPM Synchronized' },
        { label: 'Whorl & Bearing', val: 'Brass Pulley + Ceramic Core' },
        { label: 'Spindle Pitch', val: '58 mm Center-to-Center' },
        { label: 'Color Coding', val: 'Alternating Green/Red Guides' },
        { label: 'Production Gain', val: '+300% vs 2-Spindle Charkha' }
      ],
      principle: 'Eight spindle positions operate simultaneously through a common mechanical transmission driven entirely by human effort.',
      statLabel: 'Active Spindles',
      statVal: '8 / 8 SPINDLES SPINNING',
      statUnit: 'Sync 650 RPM'
    },
    'yarn': {
      mode: 'mechanical',
      tag: 'MECH-06',
      num: '06',
      title: 'Continuous Yarn Output',
      category: 'Yarn Drafting & Bobbin Package',
      badge: 'HIGH-QUALITY UNIFORM KHADI YARN',
      badgeClass: 'badge-manual',
      desc: 'Cotton roving feeds from 8 overhead supply spools through drafting roller cots, twisting into uniform Khadi yarn wound neatly onto the 8 lower spinning bobbins.',
      specs: [
        { label: 'Yarn Count Range', val: '20s to 60s Metric Khadi' },
        { label: 'Twist per Inch', val: '22 TPI Regulated' },
        { label: 'Supply Spools', val: '8 Overhead Top Bobbins' },
        { label: 'Output Bobbins', val: '8 Spun Lower Bobbins' },
        { label: 'Drafting Ratio', val: 'Controlled Drafting Zone' },
        { label: 'Thread Uniformity', val: 'Minimal Thick/Thin Defects' }
      ],
      principle: 'Continuous yarn formation and winding during simultaneous spindle operation without thread entanglement.',
      statLabel: 'Yarn Output',
      statVal: '40s Ne (22 TPI)',
      statUnit: 'Continuous'
    },
    'rpm_sensor': {
      mode: 'monitoring',
      tag: 'ELEC-07',
      num: '07',
      title: 'Shaft RPM & Speed Sensor',
      category: 'Non-Contact Kinetic Telemetry',
      badge: 'NON-CONTACT ROTATIONAL SENSING',
      badgeClass: 'badge-elec',
      desc: 'Precision Hall-effect / optical encoder mounted near the main horizontal shaft. Detects shaft rotation to generate real-time RPM data without any mechanical drag.',
      specs: [
        { label: 'Sensor Type', val: 'Non-Contact Optical / Hall' },
        { label: 'Mechanical Drag', val: '0.00 N·m (Zero Resistance)' },
        { label: 'Sampling Rate', val: '100 Hz Continuous Edge' },
        { label: 'Power Draw', val: '< 12 mW (Ultra-Low Power)' },
        { label: 'Speed Range', val: '0 – 1,200 RPM' },
        { label: 'Signal Output', val: 'Digital Pulse Stream' }
      ],
      principle: 'Measures shaft rotational speed and calculates production cadence to provide live telemetry on the artisan dashboard.',
      statLabel: 'Detected Speed',
      statVal: '650 RPM (OPTIMAL)',
      statUnit: 'Live Sensor'
    },
    'mcu': {
      mode: 'monitoring',
      tag: 'ELEC-08',
      num: '08',
      title: 'Smart Monitoring Controller Unit',
      category: 'Embedded IoT Telemetry Engine',
      badge: 'ELECTRONIC MONITORING ONLY (NO MOTOR)',
      badgeClass: 'badge-elec',
      desc: 'Sealed microcontroller unit housed behind the front display. Processes pulse signals, detects yarn breaks, logs shift stats, and updates the display screen.',
      specs: [
        { label: 'Controller MCU', val: '32-Bit Low-Power Processor' },
        { label: 'Motor Drive Ability', val: 'NONE (NO MOTOR CIRCUITRY)' },
        { label: 'Sensor Inputs', val: '8x Spindle IR + 1x Shaft RPM' },
        { label: 'Break Latency', val: '< 50 ms Detection Time' },
        { label: 'Housing', val: 'Dust-Sealed Aluminum Shell' },
        { label: 'Power Rail', val: 'Dedicated 3.3V / 5V DC' }
      ],
      principle: 'The monitoring electronics ONLY monitor and display machine performance. They do NOT drive or assist the charkha mechanism.',
      statLabel: 'MCU Status',
      statVal: 'MONITORING ACTIVE',
      statUnit: 'Telemetry Loop'
    },
    'dashboard': {
      mode: 'monitoring',
      tag: 'ELEC-09',
      num: '09',
      title: 'Live Artisan Telemetry Display',
      category: 'Center-Mounted Digital HUD',
      badge: 'LIVE MONITORING — DEMONSTRATION',
      badgeClass: 'badge-elec',
      desc: 'Center-mounted backlit LCD/OLED dashboard inspired directly by our prototype. Shows live RPM (650), active spindles (8/8), yarn status, and shift timer.',
      specs: [
        { label: 'Display Panel', val: 'Backlit Blue LCD Interface' },
        { label: 'Live Readouts', val: 'RPM: 650 | TPI: 22 | 40s Ne' },
        { label: 'Spindle Status', val: '8 / 8 Active Monitored' },
        { label: 'Session Timer', val: '01:24:00 Operating Time' },
        { label: 'Break Alert', val: 'Visual Spindle Warning' },
        { label: 'Label', val: 'LIVE MONITORING DEMO' }
      ],
      principle: 'Provides instant visual feedback to the artisan regarding spinning speed, thread consistency, and localized yarn breaks.',
      statLabel: 'Display Feed',
      statVal: 'RPM: 650 | 8/8 OK',
      statUnit: '01:24:00'
    },
    'power': {
      mode: 'monitoring',
      tag: 'ELEC-10',
      num: '10',
      title: 'Low-Power Monitoring Battery',
      category: 'Dedicated Isolated Electronic Power',
      badge: 'MONITORING POWER ONLY (NO MOTOR)',
      badgeClass: 'badge-elec',
      desc: 'Small rechargeable battery module strictly dedicated to powering the sensors, MCU, and display. Completely isolated from the mechanical drive system.',
      specs: [
        { label: 'Supply Role', val: 'Sensors + MCU + Display ONLY' },
        { label: 'Drive Connection', val: '100% ISOLATED (NO MOTOR)' },
        { label: 'Battery Chemistry', val: 'Rechargeable Li-ion 3.7V' },
        { label: 'Power Consumption', val: '< 0.75 Watts Total' },
        { label: 'Operating Life', val: '14+ Hours per Charge' },
        { label: 'Safety Badge', val: 'NO ELECTRIC MOTOR DRIVE' }
      ],
      principle: 'The battery NEVER provides mechanical driving power. The charkha is 100% human-powered while electronics strictly monitor.',
      statLabel: 'Battery Supply',
      statVal: '3.7V (LOW-POWER)',
      statUnit: 'Isolated Rail'
    }
  };

  // --- GUIDED 12-SCENE ENGINEERING STORY TOUR ---
  const STORY_SCENES = [
    { scene: 1, compId: 'flywheel', text: 'SCENE 1: Complete 8-Spindle Foldable Khadi Charkha Assembly', cam: { x: 5.8, y: 3.8, z: 6.2 }, target: { x: 0, y: 0.1, z: 0 }, dur: 3200 },
    { scene: 2, compId: 'input', text: 'SCENE 2: Manual Hand Crank — Human power directly drives the mechanical transmission', cam: { x: -3.8, y: 0.8, z: 1.6 }, target: { x: -1.7, y: -0.1, z: 0.1 }, dur: 3200 },
    { scene: 3, compId: 'clutch', text: 'SCENE 3: One-Way Clutch / Freewheel — Transfers forward torque, prevents reverse drive', cam: { x: -2.8, y: 0.9, z: 1.2 }, target: { x: -1.3, y: -0.1, z: 0 }, dur: 3000 },
    { scene: 4, compId: 'flywheel', text: 'SCENE 4: Inertial Flywheel — Stores rotational energy and smooths speed fluctuations', cam: { x: -2.4, y: 0.5, z: 2.2 }, target: { x: -0.9, y: -0.2, z: -0.2 }, dur: 3200 },
    { scene: 5, compId: 'gearing', text: 'SCENE 5: Right-Side Meshing Gears — Visible gear mesh stepping up rotational velocity', cam: { x: 3.2, y: 1.2, z: 1.8 }, target: { x: 1.4, y: 0.2, z: 0 }, dur: 3400 },
    { scene: 6, compId: 'gearing', text: 'SCENE 6: Transmission Shafts & Drafting Rollers — Distributes rotation across all stations', cam: { x: 0.8, y: 1.8, z: 2.4 }, target: { x: 0, y: 0.5, z: 0.1 }, dur: 3200 },
    { scene: 7, compId: 'spindles', text: 'SCENE 7: Exactly 8 Spindles — Synchronized simultaneous spinning across all 8 bobbins', cam: { x: 0, y: -0.2, z: 3.4 }, target: { x: 0, y: -0.5, z: 0.4 }, dur: 4000 },
    { scene: 8, compId: 'yarn', text: 'SCENE 8: Yarn Output — Continuous yarn drafted from upper spools to lower bobbins', cam: { x: 0.6, y: 1.4, z: 3.2 }, target: { x: 0, y: 0.2, z: 0.3 }, dur: 3200 },
    { scene: 9, compId: 'flywheel', text: 'SCENE 9: Complete Manual Drive Overview — 100% human-powered spinning mechanism', cam: { x: 5.2, y: 3.2, z: 5.6 }, target: { x: 0, y: 0.1, z: 0 }, dur: 3000 },
    { scene: 10, compId: 'rpm_sensor', text: 'SCENE 10: Smart Monitoring Sensors — Shaft RPM & 8x optoelectronic break detection activate', cam: { x: -1.6, y: 0.6, z: 1.8 }, target: { x: -0.8, y: 0.2, z: 0 }, dur: 3200, mode: 'monitoring' },
    { scene: 11, compId: 'dashboard', text: 'SCENE 11: Telemetry Data Processing — Live values flow into center-mounted OLED display', cam: { x: 0, y: 0.2, z: 2.2 }, target: { x: 0, y: -0.15, z: 0.3 }, dur: 3400, mode: 'monitoring' },
    { scene: 12, compId: 'dashboard', text: 'SCENE 12: Dual-Flow Model: 100% Manual Drive + Isolated Smart Electronic Telemetry', cam: { x: 5.8, y: 3.8, z: 6.2 }, target: { x: 0, y: 0.1, z: 0 }, dur: 4500, mode: 'mechanical' }
  ];

  // --- THREE.JS ACCURATE PROTOYPE 3D ENGINE ---
  class Charkha3DEngine {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;

      this.currentMode = 'mechanical'; // 'mechanical' | 'monitoring'
      this.activeComponent = 'flywheel';
      this.isPlaying = true;
      this.isStoryRunning = false;
      this.storyStepIndex = 0;
      this.storyTimeout = null;
      this.speedMultiplier = 1.0;
      this.isExploded = false;

      this.rotAngle = 0;
      this.pulseOffset = 0;

      this.initScene();
      this.initMaterials();
      this.buildPrototypeCharkha();
      this.initLighting();
      this.initControls();
      this.initEvents();
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    initScene() {
      const width = this.container.clientWidth || 800;
      const height = this.container.clientHeight || 540;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x060a14);
      this.scene.fog = new THREE.FogExp2(0x060a14, 0.04);

      this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      this.camera.position.set(5.8, 3.8, 6.2);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.2;

      this.container.innerHTML = '';
      this.container.appendChild(this.renderer.domElement);

      // Floor Grid with subtle blue tech lines
      const grid = new THREE.GridHelper(16, 20, 0x06b6d4, 0x141f38);
      grid.position.y = -1.55;
      this.scene.add(grid);

      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
    }

    initMaterials() {
      this.materials = {
        // Prototype Frame (Dark titanium / charcoal steel matte as in product.jpeg)
        frameDark: new THREE.MeshStandardMaterial({
          color: 0x242831,
          metalness: 0.82,
          roughness: 0.38,
          name: 'frameDark'
        }),
        // Bright Anodized Aluminum / Polished Steel for shafts & rails
        steelPolished: new THREE.MeshStandardMaterial({
          color: 0xd8e0eb,
          metalness: 0.92,
          roughness: 0.18,
          name: 'steelPolished'
        }),
        // Brass / Gold for whorls, bushings, and gear accents
        brassGold: new THREE.MeshStandardMaterial({
          color: 0xe0a030,
          metalness: 0.85,
          roughness: 0.25,
          name: 'brassGold'
        }),
        // Gear Steel (Darkened milled steel for right-side spur gears)
        gearSteel: new THREE.MeshStandardMaterial({
          color: 0x4a5568,
          metalness: 0.88,
          roughness: 0.3,
          name: 'gearSteel'
        }),
        // Hand Crank Wooden Teak Handle
        teakWood: new THREE.MeshStandardMaterial({
          color: 0x78350f,
          roughness: 0.75,
          metalness: 0.05
        }),
        // Khadi Yarn Packages (Cream White natural cotton texture)
        yarnWhite: new THREE.MeshStandardMaterial({
          color: 0xfaf5eb,
          roughness: 0.92,
          metalness: 0.02
        }),
        // Drafting Cots (Rubber roller sleeves in blue and beige)
        cotBlue: new THREE.MeshStandardMaterial({
          color: 0x4b6b88,
          roughness: 0.6,
          metalness: 0.1
        }),
        cotBeige: new THREE.MeshStandardMaterial({
          color: 0xc4b59d,
          roughness: 0.65,
          metalness: 0.08
        }),
        // Spindle Colored Caps (Alternating Red and Green as in product.jpeg)
        capRed: new THREE.MeshStandardMaterial({
          color: 0xdc2626,
          roughness: 0.3,
          metalness: 0.3
        }),
        capGreen: new THREE.MeshStandardMaterial({
          color: 0x16a34a,
          roughness: 0.3,
          metalness: 0.3
        }),
        // Electronic Display Glass & Screen (Backlit Cyan/Blue)
        displayScreen: new THREE.MeshStandardMaterial({
          color: 0x0c4a6e,
          emissive: 0x0284c7,
          emissiveIntensity: 0.55,
          roughness: 0.15,
          metalness: 0.8
        }),
        // Glow Accents
        glowCyan: new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.8,
          roughness: 0.2
        }),
        glowSaffron: new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          emissive: 0xf59e0b,
          emissiveIntensity: 0.85,
          roughness: 0.2
        }),
        glowGreen: new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x10b981,
          emissiveIntensity: 0.9,
          roughness: 0.2
        }),
        glowRed: new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0xef4444,
          emissiveIntensity: 1.0,
          roughness: 0.2
        })
      };
    }

    initLighting() {
      const ambient = new THREE.AmbientLight(0xffffff, 0.95);
      this.scene.add(ambient);

      // Studio Key Light (soft white directional)
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
      keyLight.position.set(7, 10, 8);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      this.scene.add(keyLight);

      // Subtle Fill Light from top left
      const fillLight = new THREE.DirectionalLight(0xa5c4e8, 0.8);
      fillLight.position.set(-6, 8, -4);
      this.scene.add(fillLight);

      // Accent Rim Light for metal reflections
      const rimLight = new THREE.PointLight(0x06b6d4, 1.4, 15);
      rimLight.position.set(4, -2, -5);
      this.scene.add(rimLight);
    }

    initControls() {
      if (window.THREE && window.THREE.OrbitControls) {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.06;
        this.controls.maxPolarAngle = Math.PI / 2 + 0.05;
        this.controls.minDistance = 2.8;
        this.controls.maxDistance = 16;
        this.controls.target.set(0, 0.1, 0);
      }
    }

    buildPrototypeCharkha() {
      this.modelRoot = new THREE.Group();
      this.interactiveMeshes = [];

      // Subsystem groups for exploded CAD animation
      this.grpFrame = new THREE.Group();
      this.grpCrank = new THREE.Group();
      this.grpClutch = new THREE.Group();
      this.grpFlywheel = new THREE.Group();
      this.grpGears = new THREE.Group();
      this.grpDrafting = new THREE.Group();
      this.grpUpperSpools = new THREE.Group();
      this.grpSpindles = new THREE.Group();
      this.grpDisplay = new THREE.Group();
      this.grpSensors = new THREE.Group();

      this.modelRoot.add(
        this.grpFrame,
        this.grpCrank,
        this.grpClutch,
        this.grpFlywheel,
        this.grpGears,
        this.grpDrafting,
        this.grpUpperSpools,
        this.grpSpindles,
        this.grpDisplay,
        this.grpSensors
      );

      // 1. FRAMEWORK (Rectangular rigid table-top chassis from product.jpeg)
      this.buildFrame();

      // 2. LEFT HAND CRANK WHEEL & HANDLE
      this.buildLeftHandCrank();

      // 3. ONE-WAY CLUTCH & DRIVE SHAFT
      this.buildOneWayClutch();

      // 4. FLYWHEEL & PULLEY BELT
      this.buildFlywheel();

      // 5. RIGHT-SIDE GEAR TRANSMISSION
      this.buildRightGearTrain();

      // 6. DRAFTING ROLLERS & 4 ANGLED ARM BRACKETS
      this.buildDraftingSection();

      // 7. UPPER YARN SPOOL SUPPLY (8 OVERHEAD BOBBINS)
      this.buildUpperSpoolSupply();

      // 8. EXACTLY 8 LOWER VERTICAL SPINNING SPINDLES
      this.build8LowerSpindles();

      // 9. CENTER DISPLAY & MCU ENCLOSURE
      this.buildCenterDisplay();

      // 10. SMART MONITORING SENSORS & POWER RAIL
      this.buildMonitoringElectronics();

      this.scene.add(this.modelRoot);
    }

    buildFrame() {
      const fMat = this.materials.frameDark;
      const sMat = this.materials.steelPolished;

      // Base rectangular chassis plate
      const baseGeo = new THREE.BoxGeometry(3.6, 0.12, 1.6);
      const basePlate = new THREE.Mesh(baseGeo, fMat);
      basePlate.position.set(0, -1.45, 0);

      // 4 Base rubber mounting feet
      [-1.65, 1.65].forEach(x => {
        [-0.65, 0.65].forEach(z => {
          const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.08, 12), fMat);
          foot.position.set(x, -1.53, z);
          this.grpFrame.add(foot);
        });
      });

      // Left & Right Vertical A-Frame Side Plates (Structural Uprights)
      const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.4, 1.3), fMat);
      sideL.position.set(-1.6, -0.2, 0);

      const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.4, 1.3), fMat);
      sideR.position.set(1.6, -0.2, 0);

      // Top horizontal spool rack beam
      const topBeam = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.1, 0.4), fMat);
      topBeam.position.set(0, 1.65, 0);

      // Top vertical tubular supports
      const topPostL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 12), sMat);
      topPostL.position.set(-1.6, 1.25, 0);
      const topPostR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 12), sMat);
      topPostR.position.set(1.6, 1.25, 0);

      // Lower front Spindle Mounting Bar
      const spindleBar = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.1, 0.3), fMat);
      spindleBar.position.set(0, -1.15, 0.35);

      // Front safety & yarn guide rail spanning across spindles
      const guardRail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.4, 16), sMat);
      guardRail.rotation.z = Math.PI / 2;
      guardRail.position.set(0, -0.75, 0.72);

      // Nameplate at base: SMART KHADI CHAKRA
      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.14, 0.02), sMat);
      plate.position.set(0, -1.45, 0.81);

      this.grpFrame.add(basePlate, sideL, sideR, topBeam, topPostL, topPostR, spindleBar, guardRail, plate);
    }

    buildLeftHandCrank() {
      this.crankRotGroup = new THREE.Group();
      this.crankRotGroup.position.set(-1.75, -0.15, 0);

      // 4-Spoke Hand Crank Wheel (as visible in product.jpeg)
      const wheelRim = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.04, 12, 36), this.materials.steelPolished);
      wheelRim.rotation.y = Math.PI / 2;

      const wheelHub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.12, 20), this.materials.steelPolished);
      wheelHub.rotation.z = Math.PI / 2;

      // 4 Spokes
      for (let i = 0; i < 4; i++) {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.6, 0.03), this.materials.steelPolished);
        const a = (i * Math.PI) / 2;
        spoke.position.set(0, Math.sin(a) * 0.3, Math.cos(a) * 0.3);
        spoke.rotation.x = a;
        this.crankRotGroup.add(spoke);
      }

      // Rotating Handle with Teak Wood Grip
      const handlePin = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.25, 12), this.materials.steelPolished);
      handlePin.rotation.z = Math.PI / 2;
      handlePin.position.set(-0.15, -0.5, 0);

      const handleGrip = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.22, 16), this.materials.teakWood);
      handleGrip.rotation.z = Math.PI / 2;
      handleGrip.position.set(-0.24, -0.5, 0);

      this.crankRotGroup.add(wheelRim, wheelHub, handlePin, handleGrip);

      wheelRim.userData = { id: 'input', label: 'Manual Hand Crank' };
      handleGrip.userData = { id: 'input', label: 'Manual Hand Crank' };
      this.interactiveMeshes.push(wheelRim, handleGrip);

      this.grpCrank.add(this.crankRotGroup);
    }

    buildOneWayClutch() {
      this.clutchGroup = new THREE.Group();
      this.clutchGroup.position.set(-1.45, -0.15, 0);

      // Central horizontal transmission shaft spanning the width
      this.mainShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 3.3, 16), this.materials.steelPolished);
      this.mainShaft.rotation.z = Math.PI / 2;
      this.mainShaft.position.set(1.45, 0, 0); // centered inside charkha

      // Sprag / Ratchet Clutch Collar (Gold/Brass)
      const clutchCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.16, 24), this.materials.brassGold);
      clutchCollar.rotation.z = Math.PI / 2;

      // Unidirectional forward torque vector indicator ring
      const arrowTorque = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.025, 8, 24, Math.PI * 1.5), this.materials.glowSaffron);
      arrowTorque.rotation.y = Math.PI / 2;
      this.clutchTorqueArrow = arrowTorque;

      this.clutchGroup.add(this.mainShaft, clutchCollar, arrowTorque);

      clutchCollar.userData = { id: 'clutch', label: 'One-Way Freewheel Clutch' };
      this.interactiveMeshes.push(clutchCollar);

      this.grpClutch.add(this.clutchGroup);
    }

    buildFlywheel() {
      this.flywheelRotGroup = new THREE.Group();
      this.flywheelRotGroup.position.set(-0.95, -0.3, -0.15);

      // Secondary Flywheel / Pulley Wheel (as visible in reference image)
      const flyRim = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.05, 16, 32), this.materials.frameDark);
      flyRim.rotation.y = Math.PI / 2;

      const flyHub = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.1, 20), this.materials.brassGold);
      flyHub.rotation.z = Math.PI / 2;

      // Drive belt connecting main shaft pulley to flywheel
      const belt = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.45, 0.22), this.materials.frameDark);
      belt.position.set(0, 0.22, 0.08);

      this.flywheelRotGroup.add(flyRim, flyHub, belt);

      flyRim.userData = { id: 'flywheel', label: 'Inertial Balance Flywheel' };
      this.interactiveMeshes.push(flyRim);

      this.grpFlywheel.add(this.flywheelRotGroup);
    }

    buildRightGearTrain() {
      this.gearRotA = new THREE.Group(); // Large spur gear
      this.gearRotA.position.set(1.68, 0.35, 0.35);

      this.gearRotB = new THREE.Group(); // Meshing lower gear
      this.gearRotB.position.set(1.68, -0.15, 0.35);

      // 1. Large Top Spur Gear (visible on right side in product.jpeg)
      const gearGeoA = new THREE.CylinderGeometry(0.38, 0.38, 0.08, 30);
      const gearA = new THREE.Mesh(gearGeoA, this.materials.gearSteel);
      gearA.rotation.z = Math.PI / 2;

      // Gear teeth pattern
      for (let i = 0; i < 18; i++) {
        const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.04), this.materials.brassGold);
        const a = (i * 2 * Math.PI) / 18;
        tooth.position.set(0, Math.sin(a) * 0.4, Math.cos(a) * 0.4);
        tooth.rotation.x = a;
        this.gearRotA.add(tooth);
      }
      this.gearRotA.add(gearA);

      // 2. Lower Meshing Gear
      const gearGeoB = new THREE.CylinderGeometry(0.32, 0.32, 0.08, 24);
      const gearB = new THREE.Mesh(gearGeoB, this.materials.gearSteel);
      gearB.rotation.z = Math.PI / 2;

      for (let i = 0; i < 14; i++) {
        const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.04), this.materials.brassGold);
        const a = (i * 2 * Math.PI) / 14;
        tooth.position.set(0, Math.sin(a) * 0.34, Math.cos(a) * 0.34);
        tooth.rotation.x = a;
        this.gearRotB.add(tooth);
      }
      this.gearRotB.add(gearB);

      gearA.userData = { id: 'gearing', label: 'Right-Side Meshing Gear Train' };
      gearB.userData = { id: 'gearing', label: 'Right-Side Meshing Gear Train' };
      this.interactiveMeshes.push(gearA, gearB);

      this.grpGears.add(this.gearRotA, this.gearRotB);
    }

    buildDraftingSection() {
      // 4 Paired Angled Drafting Arms (distinctive triangular brackets in product.jpeg)
      this.draftingArms = [];
      const armX = [-1.05, -0.35, 0.35, 1.05];

      armX.forEach(x => {
        const armGroup = new THREE.Group();
        armGroup.position.set(x, 0.4, 0.25);

        // Triangular angled arm body (dark steel)
        const armBody = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.75, 0.45), this.materials.frameDark);
        armBody.rotation.x = -0.45;

        // Chrome adjustment knob at top
        const knob = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), this.materials.steelPolished);
        knob.position.set(0, 0.42, -0.15);

        armGroup.add(armBody, knob);
        this.grpDrafting.add(armGroup);
      });

      // Dual Horizontal Drafting Shafts with Rubber Cot Rollers (Blue and Beige sleeves)
      this.draftingShaftTop = new THREE.Group();
      this.draftingShaftTop.position.set(0, 0.28, 0.42);

      this.draftingShaftBtm = new THREE.Group();
      this.draftingShaftBtm.position.set(0, 0.05, 0.42);

      const shaftTop = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 3.2, 16), this.materials.steelPolished);
      shaftTop.rotation.z = Math.PI / 2;
      this.draftingShaftTop.add(shaftTop);

      const shaftBtm = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 3.2, 16), this.materials.steelPolished);
      shaftBtm.rotation.z = Math.PI / 2;
      this.draftingShaftBtm.add(shaftBtm);

      // 8 Sets of Drafting Cots along the shafts
      const cotStep = 0.38;
      const startCotX = -1.33;

      for (let i = 0; i < 8; i++) {
        const cX = startCotX + i * cotStep;
        const matCot = i % 2 === 0 ? this.materials.cotBlue : this.materials.cotBeige;

        const cotTop = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.14, 16), matCot);
        cotTop.rotation.z = Math.PI / 2;
        cotTop.position.x = cX;
        this.draftingShaftTop.add(cotTop);

        const cotBtm = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.14, 16), this.materials.steelPolished);
        cotBtm.rotation.z = Math.PI / 2;
        cotBtm.position.x = cX;
        this.draftingShaftBtm.add(cotBtm);
      }

      this.grpDrafting.add(this.draftingShaftTop, this.draftingShaftBtm);
    }

    buildUpperSpoolSupply() {
      // 8 Overhead Supply Spools (Natural white Khadi roving packages with red tension caps)
      this.upperSpools = [];
      const spoolStep = 0.38;
      const startX = -1.33;

      for (let i = 0; i < 8; i++) {
        const x = startX + i * spoolStep;
        const zOffset = i % 2 === 0 ? 0.06 : -0.06; // Staggered dual-plane arrangement as in product.jpeg

        const spoolGroup = new THREE.Group();
        spoolGroup.position.set(x, 1.15, zOffset);

        // White cotton roving package bobbin
        const yarnBobbin = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.65, 20), this.materials.yarnWhite);

        // Spool core rod
        const coreRod = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.9, 12), this.materials.steelPolished);

        // Red top tension knob
        const redCap = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16), this.materials.capRed);
        redCap.position.y = 0.42;

        spoolGroup.add(yarnBobbin, coreRod, redCap);

        yarnBobbin.userData = { id: 'yarn', label: `Upper Roving Supply Spool #${i + 1}` };
        this.interactiveMeshes.push(yarnBobbin);

        this.upperSpools.push(spoolGroup);
        this.grpUpperSpools.add(spoolGroup);
      }
    }

    build8LowerSpindles() {
      // EXACTLY 8 LOWER VERTICAL SPINNING SPINDLES (with alternating green and red tops as in product.jpeg)
      this.spindleUnits = [];
      this.yarnFilaments = [];
      const stepX = 0.38;
      const startX = -1.33;

      for (let i = 0; i < 8; i++) {
        const x = startX + i * stepX;
        const spindleGroup = new THREE.Group();
        spindleGroup.position.set(x, -0.95, 0.48);

        // 1. Spindle Steel Base & Bolster Bearing
        const baseBolster = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.35, 16), this.materials.steelPolished);
        baseBolster.position.y = -0.28;

        // 2. Brass Spindle Whorl Pulley
        const whorl = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.06, 16), this.materials.brassGold);
        whorl.position.y = -0.06;

        // 3. Spindle Bobbin with spun Khadi yarn (tapered top)
        const bobbinYarn = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.42, 16), this.materials.yarnWhite);
        bobbinYarn.position.y = 0.18;

        // 4. Alternating Red / Green Tip Caps (Matches product.jpeg exactly: Red, Green, Green, Red...)
        const isGreen = (i === 1 || i === 2 || i === 5 || i === 6);
        const tipCapMat = isGreen ? this.materials.capGreen : this.materials.capRed;
        const tipCap = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.1, 12), tipCapMat);
        tipCap.position.y = 0.44;

        // 5. Optical Break Sensor LED behind spindle
        const led = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), this.materials.glowGreen);
        led.position.set(0, -0.15, -0.15);

        spindleGroup.add(baseBolster, whorl, bobbinYarn, tipCap, led);

        bobbinYarn.userData = { id: 'spindles', spindleIndex: i + 1, label: `Spindle Station #${i + 1}` };
        this.interactiveMeshes.push(bobbinYarn);

        this.spindleUnits.push({
          group: spindleGroup,
          bobbin: bobbinYarn,
          whorl: whorl,
          led: led,
          index: i + 1,
          isBroken: false
        });

        this.grpSpindles.add(spindleGroup);

        // Continuous yarn path from drafting cot to lower spindle tip
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(x, 0.05, 0.42),
          new THREE.Vector3(x, -0.35, 0.52),
          new THREE.Vector3(x, -0.48, 0.48)
        ]);
        const yarnTube = new THREE.Mesh(new THREE.TubeGeometry(curve, 12, 0.012, 6, false), this.materials.yarnWhite);
        yarnTube.userData = { id: 'yarn', label: `Yarn Thread #${i + 1}` };
        this.interactiveMeshes.push(yarnTube);
        this.yarnFilaments.push(yarnTube);
        this.grpSpindles.add(yarnTube);
      }
    }

    buildCenterDisplay() {
      // Center-Mounted Digital Telemetry Enclosure & Screen (as in product.jpeg)
      this.displayGroup = new THREE.Group();
      this.displayGroup.position.set(0.25, -0.22, 0.45);

      // Dark Enclosure Box
      const encBox = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.48, 0.14), this.materials.frameDark);

      // Backlit Blue Screen (RPM: 650, TPI: 22, 40s Ne, 01:24:00)
      const screenMesh = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.32, 0.02), this.materials.displayScreen);
      screenMesh.position.set(-0.1, 0, 0.08);

      // Navigation Keypad Buttons on right of screen
      const buttonPad = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.3, 0.02), this.materials.steelPolished);
      buttonPad.position.set(0.3, 0, 0.08);

      this.displayGroup.add(encBox, screenMesh, buttonPad);

      screenMesh.userData = { id: 'dashboard', label: 'Artisan OLED Telemetry Display' };
      encBox.userData = { id: 'mcu', label: 'Central Monitoring Controller' };
      this.interactiveMeshes.push(screenMesh, encBox);

      this.grpDisplay.add(this.displayGroup);
    }

    buildMonitoringElectronics() {
      // 1. Shaft RPM Hall Sensor near main transmission shaft
      this.rpmSensorMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.14), this.materials.glowCyan);
      this.rpmSensorMesh.position.set(-0.8, -0.15, -0.05);
      this.rpmSensorMesh.userData = { id: 'rpm_sensor', label: 'Shaft RPM Telemetry Sensor' };
      this.interactiveMeshes.push(this.rpmSensorMesh);
      this.grpSensors.add(this.rpmSensorMesh);

      // 2. Low-Power Isolated Battery Pack (Mounted at rear frame, strictly isolated from mechanics)
      this.batteryBox = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.22, 0.22), this.materials.glowGreen);
      this.batteryBox.position.set(1.2, -1.2, -0.4);
      this.batteryBox.userData = { id: 'power', label: 'Isolated Low-Power Monitoring Battery' };
      this.interactiveMeshes.push(this.batteryBox);
      this.grpSensors.add(this.batteryBox);

      // 3. Glowing Data Conduit Paths (Laser Pulses from sensors → MCU → Display)
      this.dataPulses = [];
      const pulsePaths = [
        [new THREE.Vector3(-0.8, -0.15, -0.05), new THREE.Vector3(-0.3, -0.22, 0.2), new THREE.Vector3(0.25, -0.22, 0.45)],
        [new THREE.Vector3(1.2, -1.2, -0.4), new THREE.Vector3(0.8, -0.6, 0.1), new THREE.Vector3(0.25, -0.22, 0.45)],
        [new THREE.Vector3(-1.33, -1.1, 0.35), new THREE.Vector3(0, -0.8, 0.35), new THREE.Vector3(0.25, -0.22, 0.45)]
      ];

      pulsePaths.forEach((pts, idx) => {
        const curve = new THREE.CatmullRomCurve3(pts);
        const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.012, 6, false), this.materials.frameDark);
        this.grpSensors.add(tube);

        const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), idx === 1 ? this.materials.glowGreen : this.materials.glowCyan);
        this.grpSensors.add(pulse);
        this.dataPulses.push({ mesh: pulse, curve: curve, offset: idx * 0.33 });
      });
    }

    setMode(mode) {
      this.currentMode = mode;

      if (mode === 'mechanical') {
        this.grpSensors.children.forEach(c => {
          if (c.material && c.material.opacity !== undefined) c.material.opacity = 0.35;
        });
        if (!['input', 'clutch', 'flywheel', 'gearing', 'spindles', 'yarn'].includes(this.activeComponent)) {
          this.focusComponent('flywheel');
        } else {
          this.focusComponent(this.activeComponent);
        }
      } else {
        // Monitoring & Power Flow Mode
        this.grpSensors.children.forEach(c => {
          if (c.material && c.material.opacity !== undefined) c.material.opacity = 1.0;
        });
        if (!['rpm_sensor', 'mcu', 'dashboard', 'power'].includes(this.activeComponent)) {
          this.focusComponent('rpm_sensor');
        } else {
          this.focusComponent(this.activeComponent);
        }
      }
    }

    focusComponent(compId) {
      this.activeComponent = compId;
      const comp = COMPONENT_DATA[compId];
      if (!comp) return;

      // Precision Camera Angles for each mechanical & monitoring component
      let targetCamPos = { x: 5.8, y: 3.8, z: 6.2 };
      let targetLookAt = { x: 0, y: 0.1, z: 0 };

      switch (compId) {
        case 'input':
          targetCamPos = { x: -4.2, y: 0.6, z: 2.0 };
          targetLookAt = { x: -1.75, y: -0.15, 0: 0 };
          break;
        case 'clutch':
          targetCamPos = { x: -3.0, y: 0.8, z: 1.6 };
          targetLookAt = { x: -1.45, y: -0.15, z: 0 };
          break;
        case 'flywheel':
          targetCamPos = { x: -2.6, y: 0.4, z: 2.4 };
          targetLookAt = { x: -0.95, y: -0.3, z: -0.15 };
          break;
        case 'gearing':
          targetCamPos = { x: 3.6, y: 1.2, z: 2.0 };
          targetLookAt = { x: 1.68, y: 0.1, z: 0.35 };
          break;
        case 'spindles':
          targetCamPos = { x: 0, y: -0.1, z: 3.6 };
          targetLookAt = { x: 0, y: -0.65, z: 0.48 };
          break;
        case 'yarn':
          targetCamPos = { x: 0.8, y: 1.6, z: 3.4 };
          targetLookAt = { x: 0, y: 0.4, z: 0.3 };
          break;
        case 'rpm_sensor':
          targetCamPos = { x: -2.2, y: 0.5, z: 1.6 };
          targetLookAt = { x: -0.8, y: -0.15, z: -0.05 };
          break;
        case 'mcu':
          targetCamPos = { x: 1.8, y: 0.6, z: 2.2 };
          targetLookAt = { x: 0.25, y: -0.22, z: 0.45 };
          break;
        case 'dashboard':
          targetCamPos = { x: 0.25, y: 0.1, z: 2.1 };
          targetLookAt = { x: 0.25, y: -0.22, z: 0.45 };
          break;
        case 'power':
          targetCamPos = { x: 2.6, y: -0.6, z: 1.8 };
          targetLookAt = { x: 1.2, y: -1.2, z: -0.4 };
          break;
        default:
          targetCamPos = { x: 5.8, y: 3.8, z: 6.2 };
          targetLookAt = { x: 0, y: 0.1, z: 0 };
      }

      this.animateCameraTo(targetCamPos, targetLookAt);
      this.updateInspectorUI(comp);
      this.updateFlowNodesUI(compId);
      this.updateMenuHighlight(compId);

      // If spindles selected, trigger the sequential 1-8 spindle illumination sequence
      if (compId === 'spindles') {
        this.triggerSpindleSequence();
      }
    }

    triggerSpindleSequence() {
      if (!this.spindleUnits) return;
      this.spindleUnits.forEach((sp, idx) => {
        setTimeout(() => {
          sp.led.material = this.materials.glowSaffron;
          setTimeout(() => {
            sp.led.material = sp.isBroken ? this.materials.glowRed : this.materials.glowGreen;
          }, 450);
        }, idx * 180);
      });
    }

    animateCameraTo(targetPos, targetTarget, duration = 650) {
      if (!this.controls) return;
      const startPos = this.camera.position.clone();
      const startTarget = this.controls.target.clone();
      const endPos = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);
      const endTarget = new THREE.Vector3(targetTarget.x, targetTarget.y, targetTarget.z);

      let startTime = null;

      const step = (now) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;

        this.camera.position.lerpVectors(startPos, endPos, ease);
        this.controls.target.lerpVectors(startTarget, endTarget, ease);
        this.controls.update();

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }

    toggleExplodedView() {
      this.isExploded = !this.isExploded;
      const f = this.isExploded ? 1.0 : 0.0;

      // Explode mechanical components cleanly along their operational axes
      this.grpCrank.position.set(-0.85 * f, 0, 0);
      this.grpClutch.position.set(-0.45 * f, 0, 0);
      this.grpFlywheel.position.set(0, 0, -0.6 * f);
      this.grpGears.position.set(0.75 * f, 0, 0);
      this.grpDrafting.position.set(0, 0.45 * f, 0.5 * f);
      this.grpUpperSpools.position.set(0, 0.65 * f, 0);
      this.grpSpindles.position.set(0, -0.45 * f, 0.6 * f);
      this.grpDisplay.position.set(0, 0, 0.55 * f);
      this.grpSensors.position.set(0.4 * f, 0.3 * f, 0);

      const explodeBtn = document.getElementById('btnExplode3D');
      if (explodeBtn) {
        explodeBtn.classList.toggle('active', this.isExploded);
        explodeBtn.innerHTML = this.isExploded ? '🧩 Assemble CAD' : '🔍 Exploded View';
      }
    }

    resetView() {
      this.isExploded = false;
      this.isStoryRunning = false;
      clearTimeout(this.storyTimeout);

      this.grpCrank.position.set(0, 0, 0);
      this.grpClutch.position.set(0, 0, 0);
      this.grpFlywheel.position.set(0, 0, 0);
      this.grpGears.position.set(0, 0, 0);
      this.grpDrafting.position.set(0, 0, 0);
      this.grpUpperSpools.position.set(0, 0, 0);
      this.grpSpindles.position.set(0, 0, 0);
      this.grpDisplay.position.set(0, 0, 0);
      this.grpSensors.position.set(0, 0, 0);

      const explodeBtn = document.getElementById('btnExplode3D');
      if (explodeBtn) {
        explodeBtn.classList.remove('active');
        explodeBtn.innerHTML = '🔍 Exploded View';
      }

      this.animateCameraTo({ x: 5.8, y: 3.8, z: 6.2 }, { x: 0, y: 0.1, z: 0 });
      this.focusComponent('flywheel');
    }

    startStoryTour() {
      this.isStoryRunning = true;
      this.storyStepIndex = 0;
      this.runNextStoryStep();
    }

    runNextStoryStep() {
      if (!this.isStoryRunning) return;
      if (this.storyStepIndex >= STORY_SCENES.length) {
        this.storyStepIndex = 0; // loop or finish
      }

      const step = STORY_SCENES[this.storyStepIndex];
      const storyTextEl = document.getElementById('archStoryCaption');
      if (storyTextEl) {
        storyTextEl.textContent = step.text;
        storyTextEl.classList.add('visible');
      }

      if (step.mode && step.mode !== this.currentMode) {
        this.setMode(step.mode);
        const tabM = document.getElementById('tabMechanical');
        const tabE = document.getElementById('tabMonitoring');
        if (step.mode === 'monitoring') {
          if (tabE) tabE.classList.add('active');
          if (tabM) tabM.classList.remove('active');
        } else {
          if (tabM) tabM.classList.add('active');
          if (tabE) tabE.classList.remove('active');
        }
      }

      this.activeComponent = step.compId;
      const comp = COMPONENT_DATA[step.compId];
      if (comp) {
        this.updateInspectorUI(comp);
        this.updateFlowNodesUI(step.compId);
        this.updateMenuHighlight(step.compId);
      }

      this.animateCameraTo(step.cam, step.target, 1200);

      if (step.compId === 'spindles') {
        this.triggerSpindleSequence();
      }

      this.storyTimeout = setTimeout(() => {
        this.storyStepIndex++;
        this.runNextStoryStep();
      }, step.dur);
    }

    toggleSpindleBreak(spindleNum) {
      const idx = spindleNum - 1;
      if (idx >= 0 && idx < this.spindleUnits.length) {
        const item = this.spindleUnits[idx];
        item.isBroken = !item.isBroken;
        item.led.material = item.isBroken ? this.materials.glowRed : this.materials.glowGreen;

        const liveHUD = document.getElementById('archLiveTelemetryStatus');
        if (liveHUD) {
          if (item.isBroken) {
            liveHUD.innerHTML = `<span style="color:#ef4444; font-weight:700;">⚠️ ALERT: Yarn Break at Spindle #${spindleNum}! LED Alert Active</span>`;
          } else {
            const anyBroken = this.spindleUnits.some(s => s.isBroken);
            if (!anyBroken) {
              liveHUD.innerHTML = `<span style="color:var(--color-green-eco); font-weight:600;">● All 8 Spindles Synchronized & Monitored</span>`;
            }
          }
        }
      }
    }

    updateInspectorUI(comp) {
      const inspectorEl = document.getElementById('archInspectorContent');
      if (!inspectorEl) return;

      let specsHtml = '';
      comp.specs.forEach(s => {
        specsHtml += `
          <div class="arch-spec-item">
            <span class="spec-name">${s.label}</span>
            <span class="spec-val">${s.val}</span>
          </div>
        `;
      });

      inspectorEl.innerHTML = `
        <div class="inspector-header">
          <div class="inspector-badge-row">
            <span class="inspector-tag">${comp.tag} • [${comp.num}]</span>
            <span class="inspector-badge ${comp.badgeClass}">${comp.badge}</span>
          </div>
          <h3 class="inspector-title">${comp.title}</h3>
          <span class="inspector-category">${comp.category}</span>
        </div>

        <p class="inspector-desc">${comp.desc}</p>

        <div class="inspector-stat-pill">
          <div class="stat-pill-info">
            <span class="stat-pill-label">${comp.statLabel}</span>
            <span class="stat-pill-val">${comp.statVal}</span>
          </div>
          <span class="stat-pill-tag">${comp.statUnit}</span>
        </div>

        <div class="inspector-specs-box">
          <h5 class="specs-title">Prototype Specifications</h5>
          <div class="specs-grid">
            ${specsHtml}
          </div>
        </div>

        <div class="inspector-principle-box">
          <strong>Operating Principle:</strong> ${comp.principle}
        </div>

        ${comp.tag.includes('05') || comp.tag.includes('06') ? `
          <div class="inspector-spindle-sim">
            <span class="sim-title">Interactive 8-Spindle Yarn Break Diagnostic:</span>
            <div class="spindle-btn-row">
              ${[1, 2, 3, 4, 5, 6, 7, 8].map(n => `
                <button class="btn-spindle-test ${this.spindleUnits && this.spindleUnits[n - 1] && this.spindleUnits[n - 1].isBroken ? 'broken' : ''}" data-spindle="${n}">S${n}</button>
              `).join('')}
            </div>
          </div>
        ` : ''}
      `;

      inspectorEl.querySelectorAll('.btn-spindle-test').forEach(btn => {
        btn.addEventListener('click', () => {
          const sNum = parseInt(btn.getAttribute('data-spindle'), 10);
          this.toggleSpindleBreak(sNum);
          btn.classList.toggle('broken');
        });
      });
    }

    updateFlowNodesUI(activeId) {
      document.querySelectorAll('.arch-flow-step-node').forEach(node => {
        if (node.getAttribute('data-comp') === activeId) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });
    }

    updateMenuHighlight(activeId) {
      document.querySelectorAll('.arch-menu-item').forEach(item => {
        if (item.getAttribute('data-comp') === activeId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    initEvents() {
      window.addEventListener('resize', () => {
        if (!this.container || !this.renderer || !this.camera) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      });

      this.renderer.domElement.addEventListener('click', (e) => {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.interactiveMeshes, true);

        if (intersects.length > 0) {
          let topMesh = intersects[0].object;
          while (topMesh && !topMesh.userData.id && topMesh.parent) {
            topMesh = topMesh.parent;
          }
          if (topMesh && topMesh.userData.id) {
            this.focusComponent(topMesh.userData.id);
          }
        }
      });
    }

    animate() {
      requestAnimationFrame(this.animate);

      const delta = 0.016 * this.speedMultiplier;

      if (this.isPlaying) {
        this.rotAngle += delta * 2.4;
        this.pulseOffset = (this.pulseOffset + delta * 0.45) % 1.0;

        // 1. Hand Crank Rotation (Smooth manual cadence)
        if (this.crankRotGroup) {
          this.crankRotGroup.rotation.x = -this.rotAngle * 0.8;
        }

        // 2. Main Transmission Shaft & Clutch
        if (this.mainShaft) {
          this.mainShaft.rotation.x = -this.rotAngle * 0.8;
        }
        if (this.clutchTorqueArrow) {
          this.clutchTorqueArrow.rotation.x = -this.rotAngle * 0.8;
        }

        // 3. Flywheel Rotation
        if (this.flywheelRotGroup) {
          this.flywheelRotGroup.rotation.x = -this.rotAngle * 1.6;
        }

        // 4. Right Meshing Gears
        if (this.gearRotA) {
          this.gearRotA.rotation.x = -this.rotAngle * 1.6;
        }
        if (this.gearRotB) {
          this.gearRotB.rotation.x = this.rotAngle * 2.8; // Counter-rotating mesh
        }

        // 5. Drafting Shafts & Cot Rollers
        if (this.draftingShaftTop) {
          this.draftingShaftTop.rotation.x = this.rotAngle * 2.8;
        }
        if (this.draftingShaftBtm) {
          this.draftingShaftBtm.rotation.x = -this.rotAngle * 2.8;
        }

        // 6. EXACTLY 8 LOWER SPINDLES ROTATION (High speed)
        if (this.spindleUnits) {
          this.spindleUnits.forEach(sp => {
            if (!sp.isBroken) {
              sp.bobbin.rotation.y = this.rotAngle * 9.2;
              sp.whorl.rotation.y = this.rotAngle * 9.2;
            }
          });
        }

        // 7. Telemetry Laser Pulses in Monitoring Mode
        if (this.dataPulses) {
          this.dataPulses.forEach(p => {
            const t = (this.pulseOffset + p.offset) % 1.0;
            const pt = p.curve.getPointAt(t);
            p.mesh.position.copy(pt);
          });
        }
      }

      if (this.controls) {
        this.controls.update();
      }

      this.renderer.render(this.scene, this.camera);
    }
  }

  // --- INITIALIZATION HANDLER ---
  function initSystemArchitectureSlide() {
    if (typeof THREE === 'undefined') {
      setTimeout(initSystemArchitectureSlide, 100);
      return;
    }

    const container = document.getElementById('charkha3dCanvasContainer');
    if (!container) return;

    const engine = new Charkha3DEngine('charkha3dCanvasContainer');
    window.charkha3DEngine = engine;

    // --- TAB SWITCHER BINDINGS ---
    const tabMechanical = document.getElementById('tabMechanical');
    const tabMonitoring = document.getElementById('tabMonitoring');
    const flowMechanical = document.getElementById('flowMechanical');
    const flowMonitoring = document.getElementById('flowMonitoring');
    const modeBadge = document.getElementById('archModeBadge');

    if (tabMechanical && tabMonitoring) {
      tabMechanical.addEventListener('click', () => {
        tabMechanical.classList.add('active');
        tabMonitoring.classList.remove('active');

        if (flowMechanical) flowMechanical.style.display = 'block';
        if (flowMonitoring) flowMonitoring.style.display = 'none';
        if (modeBadge) modeBadge.textContent = 'MODE: MECHANICAL POWER TRANSMISSION';

        engine.setMode('mechanical');
      });

      tabMonitoring.addEventListener('click', () => {
        tabMonitoring.classList.add('active');
        tabMechanical.classList.remove('active');

        if (flowMonitoring) flowMonitoring.style.display = 'block';
        if (flowMechanical) flowMechanical.style.display = 'none';
        if (modeBadge) modeBadge.textContent = 'MODE: SMART MONITORING & POWER LOOP';

        engine.setMode('monitoring');
      });
    }

    // --- PLAY / PAUSE / RESET / STORY / EXPLODE BUTTONS ---
    const btnPlayPause = document.getElementById('btnPlayPause3D');
    if (btnPlayPause) {
      btnPlayPause.addEventListener('click', () => {
        engine.isPlaying = !engine.isPlaying;
        btnPlayPause.innerHTML = engine.isPlaying ? '⏸ Pause' : '▶ Play';
        btnPlayPause.classList.toggle('active', !engine.isPlaying);
      });
    }

    const btnStoryMode = document.getElementById('btnStoryMode3D');
    if (btnStoryMode) {
      btnStoryMode.addEventListener('click', () => {
        engine.startStoryTour();
      });
    }

    const btnResetView = document.getElementById('btnResetView3D');
    if (btnResetView) {
      btnResetView.addEventListener('click', () => {
        engine.resetView();
      });
    }

    const btnExplode3D = document.getElementById('btnExplode3D');
    if (btnExplode3D) {
      btnExplode3D.addEventListener('click', () => {
        engine.toggleExplodedView();
      });
    }

    // Speed options
    document.querySelectorAll('.btn-speed-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-speed-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        engine.speedMultiplier = parseFloat(btn.getAttribute('data-speed'));
      });
    });

    // 10-Component Menu Clicks
    document.querySelectorAll('.arch-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const compId = item.getAttribute('data-comp');
        if (compId) engine.focusComponent(compId);
      });
    });

    // Bottom Flow Node Clicks
    document.querySelectorAll('.arch-flow-step-node').forEach(node => {
      node.addEventListener('click', () => {
        const compId = node.getAttribute('data-comp');
        if (compId) engine.focusComponent(compId);
      });
    });

    // Preset camera buttons on HUD
    document.querySelectorAll('.preset-cam-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const compId = btn.getAttribute('data-comp');
        if (compId) engine.focusComponent(compId);
      });
    });

    // Initial load
    engine.focusComponent('flywheel');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSystemArchitectureSlide);
  } else {
    initSystemArchitectureSlide();
  }
})();
