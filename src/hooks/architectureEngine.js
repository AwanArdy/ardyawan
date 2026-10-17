import * as THREE from 'three'
import {
  FLAT_COLORS,
  INITIAL_VIEW,
  NODE_INFO,
  NODE_LABELS,
  LAYER_DETAILS,
} from '../lib/archData'
import {
  createFlatNodeMesh,
  createMonitorModel,
  createApiGatewayArchModel,
  createServerRackModel,
  createDatabaseStackModel,
  createRedisCacheModel,
  createDockerContainerModel,
  createZoneFloorPlate,
  createPipeLine,
  createSafeRenderer,
} from './architectureModels'

export default class ArchitectureEngine {
  constructor(handlers = {}) {
    this.handlers = handlers
    this.scene = null
    this.camera = null
    this.renderer = null
    this.archGroup = null
    this.nodesMap = {}
    this.clickableMeshes = []
    this.labelEntries = []
    this.tierGroups = {}
    this.activePackets = []
    this.totalPacketsSent = 0
    this.workloadTimers = []
    this.rafId = null
    this.bootstrapTimer = null

    this.isDragging = false
    this.previousMousePosition = { x: 0, y: 0 }
    this.downPosition = { x: 0, y: 0 }
    this.sphericalTarget = { ...INITIAL_VIEW }
    this.sphericalCurrent = { ...INITIAL_VIEW }
    this.lookAtTarget = new THREE.Vector3(0, -0.4, 0)
    this.lookAtCurrent = new THREE.Vector3(0, -0.4, 0)

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.tempLabelVec = new THREE.Vector3()
    this.clock = new THREE.Clock()

    this.animate = this.animate.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerMove = this.onPointerMove.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)
    this.onWheel = this.onWheel.bind(this)
  }

  init(container, overlays) {
    this.container = container
    this.overlays = overlays
    const width = container.clientWidth || 600
    const height = container.clientHeight || 480

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000)
    this.camera.position.copy(this.lookAtCurrent)
    this.camera.position.z += this.sphericalCurrent.radius

    this.renderer = createSafeRenderer(width, height)
    this.renderer.setSize(width, height)
    if (this.renderer.setPixelRatio) this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    container.appendChild(this.renderer.domElement)

    // Floating Packet Action Bubble (Follows active moving data packet in 3D)
    if (overlays.packetTag) {
      overlays.packetTag.style.left = '50%'
      overlays.packetTag.style.top = '30%'
    }

    this.buildArchitecture()
    this.bindEvents()

    this.rafId = requestAnimationFrame(this.animate)

    // Jalankan simulasi pertama secara otomatis
    this.bootstrapTimer = setTimeout(() => {
      this.triggerWorkload('api_cache')
    }, 600)

    return () => this.dispose()
  }

  /* ------------------------------------------------------------------
     BUILD SCENE
  ------------------------------------------------------------------ */
  buildArchitecture() {
    this.archGroup = new THREE.Group()
    this.scene.add(this.archGroup)

    const overlay = this.overlays.labels
    if (overlay) overlay.innerHTML = ''

    this.tierGroups = {
      frontend: new THREE.Group(),
      backend: new THREE.Group(),
      database: new THREE.Group(),
      devops: new THREE.Group(),
      pipes: new THREE.Group(),
    }
    Object.values(this.tierGroups).forEach((g) => this.archGroup.add(g))

    // Visual Zone Floor Plates so users immediately see the 3 horizontal tiers
    this.tierGroups.frontend.add(createZoneFloorPlate(7.4, 3.8, 3.55, FLAT_COLORS.frontend))
    this.tierGroups.backend.add(createZoneFloorPlate(12.2, 4.2, -0.75, FLAT_COLORS.backend))
    this.tierGroups.database.add(createZoneFloorPlate(12.2, 5.2, -4.85, FLAT_COLORS.database))

    /* BAGIAN 1 (ATAS): LAPTOP & HP PENGGUNA (FRONTEND UI) */
    const uiNode = createMonitorModel(FLAT_COLORS.frontend, NODE_INFO.ui, this.clickableMeshes)
    uiNode.position.set(0, 4.3, 0)
    this.tierGroups.frontend.add(uiNode)
    this.nodesMap.ui = uiNode

    /* BAGIAN 2 (TENGAH): GERBANG KEAMANAN & LEMARI SERVER */
    const gatewayNode = createApiGatewayArchModel(FLAT_COLORS.backend, NODE_INFO.gateway, this.clickableMeshes)
    gatewayNode.position.set(0, 0.35, 0.4)
    this.tierGroups.backend.add(gatewayNode)
    this.nodesMap.gateway = gatewayNode

    // Left Backend: Core Logic & Python Analytics Server Cabinet
    const fastApiSvc = createServerRackModel(0x34d399, NODE_INFO.fastApiSvc, this.clickableMeshes, 3)
    fastApiSvc.position.set(-4.6, 0.45, -0.4)
    this.tierGroups.backend.add(fastApiSvc)
    this.nodesMap.fastApiSvc = fastApiSvc

    // Right Backend: Realtime Chat Server Cabinet (Socket.io)
    const socketSvc = createServerRackModel(0x059669, NODE_INFO.socketSvc, this.clickableMeshes, 3)
    socketSvc.position.set(4.6, 0.45, -0.4)
    this.tierGroups.backend.add(socketSvc)
    this.nodesMap.socketSvc = socketSvc

    /* BAGIAN 3 (BAWAH): CHIP MEMORI RAM & TABUNG DATABASE */
    const redisNode = createRedisCacheModel(NODE_INFO.redis, this.clickableMeshes)
    redisNode.position.set(0, -3.4, 1.8)
    this.tierGroups.database.add(redisNode)
    this.nodesMap.redis = redisNode

    // Left Bottom: PostgreSQL Storage Cylinder Silo
    const postgresNode = createDatabaseStackModel(FLAT_COLORS.database, NODE_INFO.postgres, this.clickableMeshes)
    postgresNode.position.set(-4.5, -3.7, -0.8)
    this.tierGroups.database.add(postgresNode)
    this.nodesMap.postgres = postgresNode

    // Right Bottom: MongoDB Storage Cylinder Silo
    const mongoNode = createDatabaseStackModel(0xfbbf24, NODE_INFO.mongo, this.clickableMeshes)
    mongoNode.position.set(4.5, -3.7, -0.8)
    this.tierGroups.database.add(mongoNode)
    this.nodesMap.mongo = mongoNode

    /* BAGIAN 4 (ALAS WADAH): KONTAINER KARGO DOCKER */
    const dockerNode = createDockerContainerModel(NODE_INFO.docker, this.clickableMeshes)
    dockerNode.position.set(0, -5.5, 0)
    this.tierGroups.devops.add(dockerNode)
    this.nodesMap.docker = dockerNode

    /* JALUR PIPA PENGHUBUNG ANTAR KOMPONEN */
    const pipes = [
      [this.nodesMap.ui.position, this.nodesMap.gateway.position, 0x60a5fa],
      [this.nodesMap.gateway.position, this.nodesMap.fastApiSvc.position, 0x34d399],
      [this.nodesMap.gateway.position, this.nodesMap.socketSvc.position, 0x34d399],
      [this.nodesMap.gateway.position, this.nodesMap.redis.position, 0xf87171],
      [this.nodesMap.fastApiSvc.position, this.nodesMap.postgres.position, 0xfbbf24],
      [this.nodesMap.fastApiSvc.position, this.nodesMap.redis.position, 0xf87171],
      [this.nodesMap.socketSvc.position, this.nodesMap.mongo.position, 0xfbbf24],
    ]
    pipes.forEach(([p1, p2, col]) => this.tierGroups.pipes.add(createPipeLine(p1, p2, col)))

    NODE_LABELS.forEach((label) => this.registerNodeLabel(this.nodesMap[label.id], label))
  }

  // Helper: Register Floating HTML Label attached to a 3D Node
  registerNodeLabel(node3D, { stepNum, title, subtitle, badgeBgClass, layer }) {
    const overlay = this.overlays.labels
    if (!overlay) return

    const el = document.createElement('div')
    el.className = 'absolute pointer-events-auto cursor-pointer select-none transition-transform duration-150 hover:scale-105'
    el.style.transform = 'translate(-50%, -50%)'
    el.innerHTML = `
      <div class="bg-slate-950/95 text-white border-2 border-white rounded-lg px-2.5 py-1 shadow-[3px_3px_0px_#0F172A] flex items-center gap-2">
        <span class="${badgeBgClass} text-ink font-mono font-bold text-[10px] px-1.5 py-0.5 rounded border border-ink">${stepNum}</span>
        <div class="leading-tight">
          <div class="font-mono font-bold text-[11px] whitespace-nowrap">${title}</div>
          <div class="font-mono text-[9px] text-slate-300 whitespace-nowrap">${subtitle}</div>
        </div>
      </div>
    `

    el.addEventListener('click', (e) => {
      e.stopPropagation()
      this.inspectSpecificNode(node3D)
    })

    overlay.appendChild(el)
    this.labelEntries.push({ node: node3D, element: el, layer })
  }

  /* ------------------------------------------------------------------
     EVENTS
  ------------------------------------------------------------------ */
  bindEvents() {
    const c = this.container
    c.addEventListener('pointerdown', this.onPointerDown)
    window.addEventListener('pointermove', this.onPointerMove)
    window.addEventListener('pointerup', this.onPointerUp)
    c.addEventListener('wheel', this.onWheel, { passive: false })
    window.addEventListener('resize', this.onResize)
  }

  onPointerDown(e) {
    this.isDragging = true
    this.downPosition = { x: e.clientX, y: e.clientY }
    this.previousMousePosition = { x: e.clientX, y: e.clientY }
  }

  onPointerMove(e) {
    if (!this.isDragging) return
    const dx = e.clientX - this.previousMousePosition.x
    const dy = e.clientY - this.previousMousePosition.y
    this.previousMousePosition = { x: e.clientX, y: e.clientY }
    this.sphericalTarget.theta -= dx * 0.005
    this.sphericalTarget.phi = Math.min(1.5, Math.max(0.55, this.sphericalTarget.phi - dy * 0.004))
  }

  onPointerUp(e) {
    this.isDragging = false
    const moved = Math.hypot(e.clientX - this.downPosition.x, e.clientY - this.downPosition.y)
    if (moved < 6 && this.container && e.target === this.renderer.domElement) {
      this.handleCanvasClick(e)
    }
  }

  onWheel(e) {
    e.preventDefault()
    this.sphericalTarget.radius = Math.min(34, Math.max(12, this.sphericalTarget.radius + e.deltaY * 0.02))
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return
    const width = this.container.clientWidth
    const height = this.container.clientHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  handleCanvasClick(event) {
    const rect = this.container.getBoundingClientRect()
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.clickableMeshes, false)

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object
      const rootNode =
        hitMesh.parent && hitMesh.parent.userData && hitMesh.parent.userData.name ? hitMesh.parent : hitMesh
      this.inspectSpecificNode(rootNode)
    }
  }

  /* ------------------------------------------------------------------
     PUBLIC CONTROLS
  ------------------------------------------------------------------ */
  focusLayer(layerKey) {
    const info = LAYER_DETAILS[layerKey] || LAYER_DETAILS.all

    this.handlers.onInspector(info)

    this.lookAtTarget.set(0, info.camY, 0)
    this.sphericalTarget.radius = info.radius

    // Highlight matching floating 3D labels
    this.labelEntries.forEach((entry) => {
      entry.element.style.opacity = layerKey === 'all' || entry.layer === layerKey ? '1' : '0.35'
    })

    if (layerKey === 'frontend' || layerKey === 'backend') this.triggerWorkload('api_cache')
    if (layerKey === 'database') this.triggerWorkload('ecommerce_tx')
  }

  resetView() {
    this.sphericalTarget = { ...INITIAL_VIEW }
    this.lookAtTarget.set(0, -0.4, 0)
    this.focusLayer('all')
  }

  inspectSpecificNode(targetNode) {
    if (!targetNode || !targetNode.userData || !targetNode.userData.name) return
    const data = targetNode.userData

    targetNode.scale.set(1.18, 1.18, 1.18)
    setTimeout(() => targetNode.scale.set(1, 1, 1), 240)

    const dotMap = { frontend: 'bg-frontend', backend: 'bg-backend', database: 'bg-database', devops: 'bg-devops' }

    this.handlers.onInspector({
      title: data.name,
      badge: data.badge || 'KOMPONEN AKTIF',
      desc: data.desc,
      skills: data.skills || [],
      colorClass: dotMap[data.layer] || 'bg-frontend',
    })

    this.handlers.onStory({
      headline: `DETAIL KOMPONEN: ${String(data.name).toUpperCase()}`,
      explanation: data.desc,
    })

    this.handlers.onLog(`Melihat detail: ${data.name}`)
  }

  /* ------------------------------------------------------------------
     PACKET SIMULATION & STEP-BY-STEP STORY ENGINE
  ------------------------------------------------------------------ */
  highlightStoryStep(activeStepNumber, stepTexts = null) {
    this.handlers.onStep(activeStepNumber, stepTexts)
  }

  setSimpleStoryText(headline, explanation, badgeClass = 'text-database') {
    this.handlers.onStory({ headline, explanation, badgeClass })
  }

  spawnPacket(startVec, endVec, colorHex, speed = 0.022, onArrive = null, labelText = null) {
    if (!this.archGroup) return
    // Concrete Envelope / Data Box Shape
    const pktGeo = new THREE.BoxGeometry(0.75, 0.5, 0.75)
    const pktMesh = createFlatNodeMesh(pktGeo, colorHex, 0xffffff)
    pktMesh.position.copy(startVec)
    this.archGroup.add(pktMesh)

    this.activePackets.push({
      mesh: pktMesh,
      start: startVec.clone(),
      end: endVec.clone(),
      progress: 0,
      speed,
      onArrive,
      labelText,
    })

    this.totalPacketsSent++
    this.handlers.onPacketCount(this.totalPacketsSent)
  }

  triggerWorkload(type) {
    if (!this.nodesMap.ui) return
    const n = this.nodesMap

    if (type === 'api_cache') {
      this.handlers.onTelemetry({
        status: 'SKENARIO 1: BUKA DASHBOARD',
        latency: 'WAKTU: 12ms (SANGAT CEPAT)',
        badgeClass: 'bg-frontend text-white',
      })
      this.setSimpleStoryText(
        'SKENARIO 1: MEMBUKA LAPORAN GRAFIK (DARI LAPTOP KE CHIP MEMORI REDIS)',
        'Perhatikan kotak paket yang bergerak: Pengguna mengklik laporan di <strong>(1) Laptop</strong> &rarr; diperiksa oleh <strong>(2A) Gerbang Keamanan API</strong> &rarr; langsung mengambil data siap saji di <strong>(3A) Chip RAM Redis</strong> tanpa perlu membongkar gudang utama!',
      )
      this.highlightStoryStep(1, [
        'Klik laporan di Laptop',
        'Lewati Gerbang API',
        'Ambil kilat di Chip Redis',
        'Grafik tampil di Laptop!',
      ])
      this.handlers.onLog('Laptop meminta data laporan grafik...')

      this.spawnPacket(n.ui.position, n.gateway.position, FLAT_COLORS.frontend, 0.022, () => {
        this.highlightStoryStep(2)
        this.handlers.onLog('Gerbang API mengecek izin & menghubungi Chip Redis')

        this.spawnPacket(n.gateway.position, n.redis.position, FLAT_COLORS.cache, 0.025, () => {
          this.highlightStoryStep(3)
          this.handlers.onLog('Data ditemukan di Chip Memori Redis (12ms)')
          this.spawnPacket(
            n.redis.position,
            n.gateway.position,
            FLAT_COLORS.backend,
            0.025,
            () => {
              this.highlightStoryStep(4)
              this.spawnPacket(
                n.gateway.position,
                n.ui.position,
                FLAT_COLORS.backend,
                0.025,
                () => this.handlers.onLog('Grafik selesai ditampilkan ke layar Laptop!'),
                '4. Kirim Grafik ke Laptop!',
              )
            },
            '3. Ambil Data Instan Redis',
          )
        }, '2. Cek Chip Memori Redis')

        this.spawnPacket(n.gateway.position, n.fastApiSvc.position, FLAT_COLORS.backend, 0.022, () => {
          this.spawnPacket(n.fastApiSvc.position, n.postgres.position, FLAT_COLORS.database, 0.022)
        })
      }, '1. Klik Buka Grafik di Laptop')
    }

    if (type === 'ecommerce_tx') {
      this.handlers.onTelemetry({
        status: 'SKENARIO 2: BELANJA E-COMMERCE',
        latency: '10.000+ TRANSAKSI/HARI',
        badgeClass: 'bg-database text-ink',
      })
      this.setSimpleStoryText(
        'SKENARIO 2: BELANJA & BAYAR SERENTAK (KUNCI STOK DI TABUNG DATABASE)',
        'Saat pembeli menekan tombol Bayar di <strong>(1) Laptop/HP</strong>, pesanan melewati <strong>(2A) Gerbang API</strong> menuju <strong>(2B) Lemari Server Kasir</strong>, lalu mengunci jumlah barang di <strong>(3B) Tabung Database PostgreSQL</strong> agar stok tidak pernah minus!',
      )
      this.highlightStoryStep(1, [
        'Pembeli klik tombol Bayar',
        'Server Kasir hitung total',
        'Tabung Database kunci stok',
        'Bukti bayar tampil (<2 dtk)',
      ])
      this.handlers.onLog('Pembeli menekan tombol Bayar...')

      for (let i = 0; i < 4; i++) {
        const timer = setTimeout(() => {
          this.spawnPacket(n.ui.position, n.gateway.position, FLAT_COLORS.frontend, 0.035, () => {
            if (i === 0) this.highlightStoryStep(2)
            this.spawnPacket(n.gateway.position, n.redis.position, FLAT_COLORS.cache, 0.04)
            this.spawnPacket(n.gateway.position, n.fastApiSvc.position, FLAT_COLORS.backend, 0.035, () => {
              if (i === 0) this.highlightStoryStep(3)
              this.spawnPacket(n.fastApiSvc.position, n.postgres.position, FLAT_COLORS.database, 0.035, () => {
                if (i === 1) this.handlers.onLog('Tabung PostgreSQL mengunci stok & simpan transaksi')
                this.spawnPacket(n.postgres.position, n.gateway.position, FLAT_COLORS.backend, 0.04, () => {
                  if (i === 0) this.highlightStoryStep(4)
                  this.spawnPacket(
                    n.gateway.position,
                    n.ui.position,
                    FLAT_COLORS.backend,
                    0.04,
                    null,
                    '4. Bukti Bayar Sukses!',
                  )
                }, '3. Stok Aman & Terkunci')
              }, '3. Kunci Stok di Tabung SQL')
            }, '2. Proses di Server Kasir')
          }, '1. Klik Bayar Pesanan')
        }, i * 220)
        this.workloadTimers.push(timer)
      }
    }

    if (type === 'websocket_chat') {
      this.handlers.onTelemetry({
        status: 'SKENARIO 3: CHAT RAHASIA KILAT',
        latency: 'LATENSI: 42ms (<100ms)',
        badgeClass: 'bg-backend text-ink',
      })
      this.setSimpleStoryText(
        'SKENARIO 3: MENGIRIM PESAN CHAT TERENKRIPSI SECARA INSTAN',
        'Pesan dikunci dengan sandi rahasia sejak keluar dari <strong>(1) Laptop/HP</strong>, melesat melewati <strong>(2C) Lemari Server Socket.io</strong>, dan diarsipkan ke <strong>(3C) Tabung Database MongoDB</strong> dalam waktu kurang dari 0,1 detik!',
      )
      this.highlightStoryStep(1, [
        'Pesan disandi di Laptop/HP',
        'Meluncur ke Server Chat',
        'Arsipkan di Tabung MongoDB',
        'Pesan langsung terkirim!',
      ])
      this.handlers.onLog('Mengirim pesan terenkripsi (E2EE)...')

      for (let i = 0; i < 3; i++) {
        const timer = setTimeout(() => {
          this.spawnPacket(n.ui.position, n.gateway.position, FLAT_COLORS.devops, 0.025, () => {
            if (i === 0) this.highlightStoryStep(2)
            this.spawnPacket(n.gateway.position, n.socketSvc.position, FLAT_COLORS.backend, 0.026, () => {
              if (i === 0) this.highlightStoryStep(3)
              this.spawnPacket(
                n.socketSvc.position,
                n.mongo.position,
                FLAT_COLORS.database,
                0.025,
                () => this.handlers.onLog('Pesan tersimpan aman di Tabung MongoDB'),
                '3. Simpan Sandi ke MongoDB',
              )
              this.spawnPacket(
                n.socketSvc.position,
                n.ui.position,
                FLAT_COLORS.frontend,
                0.026,
                () => {
                  if (i === 0) this.highlightStoryStep(4)
                },
                '4. Pesan Tampil (<100ms)',
              )
            }, '2. Masuk Server Chat Kilat')
          }, '1. Kirim Pesan Terenkripsi')
        }, i * 240)
        this.workloadTimers.push(timer)
      }
    }
  }

  /* ------------------------------------------------------------------
     LABELS PROJECTION & ANIMATION LOOP
  ------------------------------------------------------------------ */
  updateFloatingLabels() {
    const container = this.container
    if (!container || !this.camera) return
    const width = container.clientWidth
    const height = container.clientHeight

    for (let i = 0; i < this.labelEntries.length; i++) {
      const item = this.labelEntries[i]
      item.node.getWorldPosition(this.tempLabelVec)
      // Offset label slightly above the 3D object
      this.tempLabelVec.y += 1.45
      this.tempLabelVec.project(this.camera)

      if (this.tempLabelVec.z > 1) {
        item.element.style.display = 'none'
      } else {
        item.element.style.display = 'block'
        const x = (this.tempLabelVec.x * 0.5 + 0.5) * width
        const y = (-(this.tempLabelVec.y * 0.5) + 0.5) * height
        item.element.style.left = `${x}px`
        item.element.style.top = `${y}px`
      }
    }

    // Update floating callout bubble following the primary labeled packet
    const tag = this.overlays.packetTag
    const tagText = this.overlays.packetTagText
    if (tag && tagText) {
      const labeledPkt = this.activePackets.find((p) => p.labelText)
      if (labeledPkt) {
        this.tempLabelVec.copy(labeledPkt.mesh.position)
        this.tempLabelVec.y += 0.65
        this.tempLabelVec.project(this.camera)
        if (this.tempLabelVec.z <= 1) {
          tag.classList.remove('hidden')
          const px = (this.tempLabelVec.x * 0.5 + 0.5) * width
          const py = (-(this.tempLabelVec.y * 0.5) + 0.5) * height
          tag.style.left = `${px}px`
          tag.style.top = `${py}px`
          tagText.textContent = labeledPkt.labelText
        } else {
          tag.classList.add('hidden')
        }
      } else {
        tag.classList.add('hidden')
      }
    }
  }

  animate() {
    this.rafId = requestAnimationFrame(this.animate)

    const elapsedTime = this.clock.getElapsedTime()

    // Gentle idle sway when user is not dragging so labels stay easy to read
    if (!this.isDragging) {
      this.sphericalTarget.theta = 0.52 + Math.sin(elapsedTime * 0.45) * 0.22
    }

    // Smooth interpolation for spherical camera coordinates
    this.sphericalCurrent.theta += (this.sphericalTarget.theta - this.sphericalCurrent.theta) * 0.08
    this.sphericalCurrent.phi += (this.sphericalTarget.phi - this.sphericalCurrent.phi) * 0.08
    this.sphericalCurrent.radius += (this.sphericalTarget.radius - this.sphericalCurrent.radius) * 0.08
    this.lookAtCurrent.lerp(this.lookAtTarget, 0.08)

    this.camera.position.x =
      this.lookAtCurrent.x +
      this.sphericalCurrent.radius * Math.sin(this.sphericalCurrent.phi) * Math.sin(this.sphericalCurrent.theta)
    this.camera.position.y =
      this.lookAtCurrent.y + this.sphericalCurrent.radius * Math.cos(this.sphericalCurrent.phi)
    this.camera.position.z =
      this.lookAtCurrent.z +
      this.sphericalCurrent.radius * Math.sin(this.sphericalCurrent.phi) * Math.cos(this.sphericalCurrent.theta)
    this.camera.lookAt(this.lookAtCurrent)

    // Subtle floating motion for Redis Cache
    if (this.nodesMap.redis) {
      this.nodesMap.redis.position.y = -3.5 + Math.sin(elapsedTime * 2.5) * 0.12
    }

    // Update active 3D data packets
    for (let i = this.activePackets.length - 1; i >= 0; i--) {
      const pkt = this.activePackets[i]
      pkt.progress += pkt.speed
      if (pkt.progress >= 1) {
        this.archGroup.remove(pkt.mesh)
        pkt.mesh.geometry.dispose()
        pkt.mesh.material.dispose()
        const callback = pkt.onArrive
        this.activePackets.splice(i, 1)
        if (callback) callback()
      } else {
        pkt.mesh.position.lerpVectors(pkt.start, pkt.end, pkt.progress)
        pkt.mesh.rotation.x += 0.1
        pkt.mesh.rotation.y += 0.1
      }
    }

    this.renderer.render(this.scene, this.camera)
    this.updateFloatingLabels()
  }

  dispose() {
    if (this.rafId) cancelAnimationFrame(this.rafId)
    clearTimeout(this.bootstrapTimer)
    this.workloadTimers.forEach(clearTimeout)
    this.workloadTimers = []

    const c = this.container
    c?.removeEventListener('pointerdown', this.onPointerDown)
    window.removeEventListener('pointermove', this.onPointerMove)
    window.removeEventListener('pointerup', this.onPointerUp)
    c?.removeEventListener('wheel', this.onWheel)
    window.removeEventListener('resize', this.onResize)

    if (this.overlays.labels) this.overlays.labels.innerHTML = ''
    this.labelEntries = []

    this.scene?.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) obj.material.dispose?.()
    })
    this.renderer?.dispose?.()
    this.renderer?.domElement?.remove()
    this.scene = null
    this.renderer = null
    this.camera = null
    this.archGroup = null
    this.nodesMap = {}
    this.clickableMeshes = []
    this.activePackets = []
  }
}


