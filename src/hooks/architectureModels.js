import * as THREE from 'three'
import { FLAT_COLORS } from '../lib/archData'

// Helper: Create a Flat-Colored Mesh with Bold Brutalist Outlines (EdgesGeometry)
export function createFlatNodeMesh(geometry, colorHex, outlineColorHex = 0x0f172a, clickTargets = null, metadata = null) {
  const material = new THREE.MeshBasicMaterial({ color: colorHex })
  const mesh = new THREE.Mesh(geometry, material)

  const edgesGeo = new THREE.EdgesGeometry(geometry)
  const edgesMat = new THREE.LineBasicMaterial({ color: outlineColorHex, linewidth: 2 })
  const wireframe = new THREE.LineSegments(edgesGeo, edgesMat)
  mesh.add(wireframe)

  if (metadata) {
    mesh.userData = metadata
    clickTargets?.push(mesh)
  }
  return mesh
}

// 1. Concrete 3D Model: Open Laptop + Smartphone (Frontend Client Devices)
export function createMonitorModel(primaryColor, metadata, clickTargets) {
  const group = new THREE.Group()

  // Laptop Screen Lid (tilted slightly back)
  const lidMesh = createFlatNodeMesh(new THREE.BoxGeometry(3.4, 2.0, 0.18), primaryColor, 0xffffff, clickTargets, metadata)
  lidMesh.position.set(-0.45, 0.45, -0.45)
  lidMesh.rotation.x = -0.15
  group.add(lidMesh)

  // Inner White Website Screen
  const screenMesh = createFlatNodeMesh(new THREE.BoxGeometry(3.0, 1.65, 0.2), FLAT_COLORS.white, 0x0f172a, clickTargets, metadata)
  screenMesh.position.set(-0.45, 0.45, -0.42)
  screenMesh.rotation.x = -0.15
  group.add(screenMesh)

  // Website Navbar & Hero Card blocks on screen (makes it unmistakably a web page)
  const navMesh = createFlatNodeMesh(new THREE.BoxGeometry(2.75, 0.28, 0.23), primaryColor, 0x0f172a, clickTargets, metadata)
  navMesh.position.set(-0.45, 0.98, -0.49)
  navMesh.rotation.x = -0.15
  group.add(navMesh)

  const cardLeft = createFlatNodeMesh(new THREE.BoxGeometry(1.25, 0.9, 0.23), 0xdbeafe, 0x0f172a, clickTargets, metadata)
  cardLeft.position.set(-1.15, 0.25, -0.38)
  cardLeft.rotation.x = -0.15
  group.add(cardLeft)

  const cardRight = createFlatNodeMesh(new THREE.BoxGeometry(1.25, 0.9, 0.23), 0x93c5fd, 0x0f172a, clickTargets, metadata)
  cardRight.position.set(0.25, 0.25, -0.38)
  cardRight.rotation.x = -0.15
  group.add(cardRight)

  // Laptop Keyboard Base (flat horizontal deck in front of screen)
  const baseMesh = createFlatNodeMesh(new THREE.BoxGeometry(3.4, 0.18, 1.9), 0xcbd5e1, 0x0f172a, clickTargets, metadata)
  baseMesh.position.set(-0.45, -0.58, 0.42)
  group.add(baseMesh)

  // Dark Keyboard Area
  const kbMesh = createFlatNodeMesh(new THREE.BoxGeometry(2.8, 0.2, 0.95), FLAT_COLORS.slate, 0x0f172a, clickTargets, metadata)
  kbMesh.position.set(-0.45, -0.55, 0.18)
  group.add(kbMesh)

  // Laptop Trackpad
  const padMesh = createFlatNodeMesh(new THREE.BoxGeometry(0.9, 0.2, 0.42), FLAT_COLORS.white, 0x0f172a, clickTargets, metadata)
  padMesh.position.set(-0.45, -0.55, 0.98)
  group.add(padMesh)

  // Companion Smartphone next to Laptop (Mobile Responsive UI)
  const phoneBody = createFlatNodeMesh(new THREE.BoxGeometry(0.95, 1.7, 0.16), FLAT_COLORS.ink, 0xffffff, clickTargets, metadata)
  phoneBody.position.set(2.05, 0.15, 0.25)
  phoneBody.rotation.y = -0.25
  group.add(phoneBody)

  const phoneScreen = createFlatNodeMesh(new THREE.BoxGeometry(0.78, 1.38, 0.19), primaryColor, 0xffffff, clickTargets, metadata)
  phoneScreen.position.set(2.05, 0.15, 0.26)
  phoneScreen.rotation.y = -0.25
  group.add(phoneScreen)

  group.userData = metadata
  return group
}

// 2A. Concrete 3D Model: Security Checkpoint Archway (API Gateway)
export function createApiGatewayArchModel(primaryColor, metadata, clickTargets) {
  const group = new THREE.Group()

  // Base Checkpoint Platform
  const padMesh = createFlatNodeMesh(new THREE.BoxGeometry(3.4, 0.25, 2.0), FLAT_COLORS.slate, 0xffffff, clickTargets, metadata)
  padMesh.position.set(0, -1.0, 0)
  group.add(padMesh)

  // Left & Right Security Pillars
  const pillarGeo = new THREE.BoxGeometry(0.65, 2.1, 0.9)
  const leftPillar = createFlatNodeMesh(pillarGeo, primaryColor, 0x0f172a, clickTargets, metadata)
  leftPillar.position.set(-1.15, 0.15, 0)
  group.add(leftPillar)

  const rightPillar = createFlatNodeMesh(pillarGeo, primaryColor, 0x0f172a, clickTargets, metadata)
  rightPillar.position.set(1.15, 0.15, 0)
  group.add(rightPillar)

  // Overhead Security Scanner Signboard ("API GATEWAY")
  const roofMesh = createFlatNodeMesh(new THREE.BoxGeometry(3.3, 0.65, 1.15), primaryColor, 0xffffff, clickTargets, metadata)
  roofMesh.position.set(0, 1.35, 0)
  group.add(roofMesh)

  // White Scanner Banner Strip on Roof
  const bannerMesh = createFlatNodeMesh(new THREE.BoxGeometry(2.5, 0.32, 1.2), FLAT_COLORS.white, 0x0f172a, clickTargets, metadata)
  bannerMesh.position.set(0, 1.35, 0)
  group.add(bannerMesh)

  // Traffic Light / Security Sensor Orb in Center of Gate
  const sensorMesh = createFlatNodeMesh(new THREE.BoxGeometry(0.9, 0.25, 0.25), 0xfbbf24, 0x0f172a, clickTargets, metadata)
  sensorMesh.position.set(0, 0.35, 0)
  group.add(sensorMesh)

  group.userData = metadata
  return group
}

// 2B & 2C. Concrete 3D Model: Tall Data Center Server Cabinet Rack (Backend Services)
export function createServerRackModel(primaryColor, metadata, clickTargets, bladeCount = 3) {
  const group = new THREE.Group()

  // Outer Server Cabinet Frame (Dark Slate Chassis)
  const chassisMesh = createFlatNodeMesh(new THREE.BoxGeometry(2.9, 2.35, 1.85), FLAT_COLORS.slate, 0xffffff, clickTargets, metadata)
  group.add(chassisMesh)

  // Colored Top Cap on Server Rack
  const capMesh = createFlatNodeMesh(new THREE.BoxGeometry(3.0, 0.22, 1.95), primaryColor, 0x0f172a, clickTargets, metadata)
  capMesh.position.set(0, 1.22, 0)
  group.add(capMesh)

  // Individual Slide-out Server Blades inside the Cabinet
  const bladeHeight = 0.45
  const gap = 0.16
  const totalHeight = bladeCount * (bladeHeight + gap)

  for (let i = 0; i < bladeCount; i++) {
    const yPos = i * (bladeHeight + gap) - totalHeight / 2 + bladeHeight / 2

    const bladeMesh = createFlatNodeMesh(new THREE.BoxGeometry(2.5, bladeHeight, 1.92), primaryColor, 0x0f172a, clickTargets, metadata)
    bladeMesh.position.set(0, yPos, 0)
    group.add(bladeMesh)

    // Blinking Status LED Light Bar (Left)
    const ledMesh = createFlatNodeMesh(new THREE.BoxGeometry(0.42, 0.18, 1.98), FLAT_COLORS.white, 0x0f172a, clickTargets, metadata)
    ledMesh.position.set(-0.82, yPos, 0)
    group.add(ledMesh)

    // Ventilation Grill Slot (Right)
    const ventMesh = createFlatNodeMesh(new THREE.BoxGeometry(0.95, 0.16, 1.98), FLAT_COLORS.ink, 0xffffff, clickTargets, metadata)
    ventMesh.position.set(0.48, yPos, 0)
    group.add(ventMesh)
  }

  group.userData = metadata
  return group
}

// 3B & 3C. Concrete 3D Model: Classic 3-Platter Database Cylinder Silo
export function createDatabaseStackModel(primaryColor, metadata, clickTargets) {
  const group = new THREE.Group()
  const discHeight = 0.56
  const gap = 0.18

  // Central Core Pillar connecting the magnetic platters
  const coreMesh = createFlatNodeMesh(new THREE.CylinderGeometry(0.95, 0.95, 2.1, 16), FLAT_COLORS.slate, 0x0f172a, clickTargets, metadata)
  group.add(coreMesh)

  for (let i = 0; i < 3; i++) {
    const yPos = (i - 1) * (discHeight + gap)
    const cylMesh = createFlatNodeMesh(new THREE.CylinderGeometry(1.55, 1.55, discHeight, 20), primaryColor, 0x0f172a, clickTargets, metadata)
    cylMesh.position.set(0, yPos, 0)
    group.add(cylMesh)

    // Front Status Indicator Pill on each Database Platter
    const pillMesh = createFlatNodeMesh(new THREE.BoxGeometry(0.75, 0.2, 0.35), FLAT_COLORS.white, 0x0f172a, clickTargets, metadata)
    pillMesh.position.set(0, yPos, 1.48)
    group.add(pillMesh)
  }

  group.userData = metadata
  return group
}

// 3A. Concrete 3D Model: High-Speed RAM Memory Stick / IC Chip (Redis Cache)
export function createRedisCacheModel(metadata, clickTargets) {
  const group = new THREE.Group()

  // Main Red Circuit Board Body
  const boardMesh = createFlatNodeMesh(new THREE.BoxGeometry(2.6, 0.95, 1.55), FLAT_COLORS.cache, 0xffffff, clickTargets, metadata)
  group.add(boardMesh)

  // Black Silicon Memory IC Blocks on Top
  for (let i = -1; i <= 1; i++) {
    const icMesh = createFlatNodeMesh(new THREE.BoxGeometry(0.62, 0.32, 1.1), FLAT_COLORS.ink, 0xffffff, clickTargets, metadata)
    icMesh.position.set(i * 0.78, 0.55, 0)
    group.add(icMesh)
  }

  // Gold Contact Pins along the bottom edge
  for (let i = -2; i <= 2; i++) {
    const pinMesh = createFlatNodeMesh(new THREE.BoxGeometry(0.24, 0.35, 1.75), FLAT_COLORS.database, 0x0f172a, clickTargets, metadata)
    pinMesh.position.set(i * 0.48, -0.45, 0)
    group.add(pinMesh)
  }

  group.userData = metadata
  return group
}

// 4. Concrete 3D Model: Shipping Cargo Container Base (Docker Infrastructure)
export function createDockerContainerModel(metadata, clickTargets) {
  const group = new THREE.Group()

  // Main Purple Cargo Container Body
  const boxMesh = createFlatNodeMesh(new THREE.BoxGeometry(12.6, 0.85, 6.8), FLAT_COLORS.devops, 0xffffff, clickTargets, metadata)
  group.add(boxMesh)

  // Corrugated Side Ribs along the container front & back
  for (let i = -5; i <= 5; i++) {
    const ribMesh = createFlatNodeMesh(new THREE.BoxGeometry(0.35, 0.65, 7.0), 0x7c3aed, 0x0f172a, clickTargets, metadata)
    ribMesh.position.set(i * 1.05, 0, 0)
    group.add(ribMesh)
  }

  group.userData = metadata
  return group
}

// Helper: Create Translucent Tier Zone Platform so each layer is visually grouped
export function createZoneFloorPlate(width, depth, yPos, colorHex) {
  const group = new THREE.Group()
  const plateGeo = new THREE.BoxGeometry(width, 0.08, depth)
  const plateMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.14 })
  const plateMesh = new THREE.Mesh(plateGeo, plateMat)

  const edgesGeo = new THREE.EdgesGeometry(plateGeo)
  const edgesMat = new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.65 })
  plateMesh.add(new THREE.LineSegments(edgesGeo, edgesMat))

  group.add(plateMesh)
  group.position.set(0, yPos, 0)
  return group
}

// Helper: Create Thick 3D Data Pipe Cylinder between two Vector3 points
export function createPipeLine(p1, p2, colorHex = 0x64748b) {
  const direction = new THREE.Vector3().subVectors(p2, p1)
  const length = direction.length()
  const pipeGeo = new THREE.CylinderGeometry(0.09, 0.09, length, 8)
  const pipeMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.75 })
  const pipeMesh = new THREE.Mesh(pipeGeo, pipeMat)

  const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5)
  pipeMesh.position.copy(midPoint)
  pipeMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())
  return pipeMesh
}

// Helper: create WebGL renderer with graceful fallback
export function createSafeRenderer(width, height) {
  try {
    return new THREE.WebGLRenderer({ antialias: true, alpha: false })
  } catch {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#0F172A'
    ctx.fillRect(0, 0, width, height)
    return {
      domElement: canvas,
      setSize() {},
      setPixelRatio() {},
      render() {},
      dispose() {},
      isFallbackProvider: true,
    }
  }
}
