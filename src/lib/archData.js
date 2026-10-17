// Pure Flat Palette for Three.js (Matches Tailwind theme)
export const FLAT_COLORS = {
  frontend: 0x3b82f6, // Flat Blue
  backend: 0x10b981, // Flat Emerald
  database: 0xf59e0b, // Flat Amber
  cache: 0xef4444, // Flat Red (Redis)
  devops: 0x8b5cf6, // Flat Purple (Docker/Prisma)
  white: 0xf8fafc,
  ink: 0x0f172a,
  slate: 0x334155,
}

export const INITIAL_VIEW = { theta: 0.45, phi: 1.15, radius: 22.5 }

export const LAYER_BUTTONS = [
  { key: 'all', label: 'Semua Sistem', className: 'bg-white text-ink' },
  { key: 'frontend', label: '1. Layar Aplikasi (Frontend)', className: 'bg-frontend text-white' },
  { key: 'backend', label: '2. Mesin Pemroses (Backend)', className: 'bg-backend text-ink' },
  { key: 'database', label: '3. Gudang Data (Database)', className: 'bg-database text-ink' },
  { key: 'devops', label: '4. Wadah Server (Docker)', className: 'bg-devops text-white' },
]

export const LAYER_DETAILS = {
  all: {
    title: 'SEMUA SISTEM: GAMBARAN UTUH FULL-STACK',
    badge: '4 BAGIAN AKTIF',
    colorClass: 'bg-frontend',
    desc: 'Menampilkan seluruh bagian aplikasi web dari atas ke bawah: (1) Layar Pengguna, (2) Mesin Server Backend, (3) Gudang Database & Redis, hingga (4) Fondasi Docker.',
    skills: ['React / Next.js', 'Node / FastAPI / NestJS', 'PostgreSQL / Redis', 'Docker / Prisma'],
    camY: -0.3,
    radius: 20,
  },
  frontend: {
    title: 'BAGIAN 1: LAYAR APLIKASI (FRONTEND)',
    badge: 'TAMPILAN PENGGUNA',
    colorClass: 'bg-frontend',
    desc: 'Bagian terdepan yang langsung dilihat dan disentuh pengguna. Dibuat agar cepat, rapi di HP maupun laptop, serta dilengkapi fitur pencarian dan filter instan.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'AngularJS', 'Next.js', 'Vite & Zustand'],
    camY: 3.6,
    radius: 14,
  },
  backend: {
    title: 'BAGIAN 2: MESIN PEMROSES (BACKEND & API)',
    badge: 'OTAK LOGIKA SERVER',
    colorClass: 'bg-backend',
    desc: 'Bagian di balik layar yang bertugas memeriksa keamanan login (JWT), menghitung laporan analitik, memproses pembayaran, dan mengatur lalu lintas pesan chat.',
    skills: ['Node.js', 'Express.js', 'NestJS', 'Python', 'FastAPI', 'GraphQL', 'Socket.io'],
    camY: 0.3,
    radius: 15,
  },
  database: {
    title: 'BAGIAN 3: GUDANG DATA & MEMORI KILAT',
    badge: 'DATABASE & CACHE',
    colorClass: 'bg-database',
    desc: 'Tempat penyimpanan seluruh data penting secara permanen (PostgreSQL, MongoDB, SQLite) ditambah memori kilat (Redis) agar pencarian data berlangsung sekejap.',
    skills: ['PostgreSQL', 'Redis', 'MongoDB', 'SQLite', 'Row-Level Locking', 'Sharding'],
    camY: -3.5,
    radius: 15,
  },
  devops: {
    title: 'BAGIAN 4: WADAH SERVER & INFRASTRUKTUR',
    badge: 'DOCKER & PERKAKAS',
    colorClass: 'bg-devops',
    desc: 'Fondasi yang mengemas seluruh program ke dalam kotak kontainer (Docker) dan mendokumentasikan API secara otomatis (Swagger) agar tim mudah bekerja sama.',
    skills: ['Docker', 'Prisma', 'Git', 'Swagger/OpenAPI', 'Cloudinary Pipeline'],
    camY: -4.2,
    radius: 18,
  },
}

export const NODE_INFO = {
  ui: {
    layer: 'frontend',
    name: '1. Laptop & HP Pengguna (Frontend UI)',
    badge: 'TAMPILAN LAYAR',
    desc: 'Bentuk nyata: Laptop & Smartphone yang digunakan pengunjung. Menampilkan halaman website, tombol beli, grafik, dan ruang obrolan yang dibangun dengan React, Next.js, dan Tailwind CSS.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite & Zustand', 'Ink TUI'],
  },
  gateway: {
    layer: 'backend',
    name: '2A. Gerbang Keamanan Server (API Gateway)',
    badge: 'POS PEMERIKSAAN',
    desc: 'Bentuk nyata: Pos gerbang pemeriksaan. Setiap klik dari laptop pengguna wajib melewati gerbang ini untuk dicek izin loginnya (JWT Auth) dan diatur antreannya (Rate Limit).',
    skills: ['Express.js', 'JWT Auth', 'Rate Limiting', 'Swagger/OpenAPI', 'GraphQL'],
  },
  fastApiSvc: {
    layer: 'backend',
    name: '2B. Lemari Server Transaksi & Grafik (NestJS / FastAPI)',
    badge: 'MESIN HITUNG & KASIR',
    desc: 'Bentuk nyata: Lemari kabinet server berisi 3 mesin pemroses. Bertugas menghitung pembayaran belanja E-Commerce dan mengolah laporan grafik analitik otomatis.',
    skills: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'Headless CMS'],
  },
  socketSvc: {
    layer: 'backend',
    name: '2C. Lemari Server Chat Kilat (Socket.io)',
    badge: 'JALUR KILAT <100ms',
    desc: 'Bentuk nyata: Lemari server khusus pesan instan. Meneruskan pesan terenkripsi antar pengguna dalam waktu kurang dari 0,1 detik tanpa perlu muat ulang halaman.',
    skills: ['Socket.io', 'Node.js', 'WebSockets', 'E2E Encryption'],
  },
  redis: {
    layer: 'database',
    name: '3A. Chip Memori Kilat RAM (Redis Cache)',
    badge: 'MEMORI INSTAN',
    desc: 'Bentuk nyata: Keping Chip RAM berkecepatan tinggi. Menyimpan data populer yang sering dibuka agar server tidak perlu membongkar gudang database berulang kali.',
    skills: ['Redis', 'In-Memory Cache', 'Session Store', 'Inventory Sync'],
  },
  postgres: {
    layer: 'database',
    name: '3B. Tabung Brankas Data Utama (PostgreSQL)',
    badge: 'GUDANG TRANSAKSI',
    desc: 'Bentuk nyata: Tabung piringan penyimpanan data permanen. Menyimpan stok barang & bukti pembayaran dengan sistem kunci baris (Row-Level Locking) agar stok tidak pernah bentrok.',
    skills: ['PostgreSQL', 'Row-Level Locking', 'Prisma ORM', 'SQLite'],
  },
  mongo: {
    layer: 'database',
    name: '3C. Tabung Arsip Pesan Chat (MongoDB)',
    badge: 'GUDANG RIWAYAT CHAT',
    desc: 'Bentuk nyata: Tabung arsip dokumen yang menyimpan jutaan riwayat pesan yang sudah dikunci sandi (ciphertext) dan dibagi per ruang obrolan.',
    skills: ['MongoDB', 'Per-Channel Sharding', 'NoSQL Modeling'],
  },
  docker: {
    layer: 'devops',
    name: '4. Kontainer Kargo Pengemas Server (Docker)',
    badge: 'WADAH INFRASTRUKTUR',
    desc: 'Bentuk nyata: Kontainer kargo baja yang mengemas seluruh mesin server dan database di atasnya agar aman dipindahkan dan dijalankan di komputer server mana saja.',
    skills: ['Docker', 'Prisma', 'Git', 'Swagger/OpenAPI', 'Cloudinary'],
  },
}

export const NODE_LABELS = [
  { id: 'ui', stepNum: '1', title: 'Laptop & HP Pengguna', subtitle: 'Website (React / Next.js)', badgeBgClass: 'bg-frontend text-white', layer: 'frontend' },
  { id: 'gateway', stepNum: '2A', title: 'Gerbang Keamanan API', subtitle: 'Pos Cek Login & Antrean', badgeBgClass: 'bg-backend', layer: 'backend' },
  { id: 'fastApiSvc', stepNum: '2B', title: 'Server Kasir & Analitik', subtitle: 'Mesin FastAPI & NestJS', badgeBgClass: 'bg-backend', layer: 'backend' },
  { id: 'socketSvc', stepNum: '2C', title: 'Server Obrolan Chat', subtitle: 'Mesin Socket.io (<100ms)', badgeBgClass: 'bg-backend', layer: 'backend' },
  { id: 'redis', stepNum: '3A', title: 'Chip Memori Kilat (Redis)', subtitle: 'RAM Cache Super Cepat', badgeBgClass: 'bg-cache text-white', layer: 'database' },
  { id: 'postgres', stepNum: '3B', title: 'Tabung Database Utama', subtitle: 'PostgreSQL (Stok & Bayar)', badgeBgClass: 'bg-database', layer: 'database' },
  { id: 'mongo', stepNum: '3C', title: 'Tabung Database Chat', subtitle: 'MongoDB (Arsip Pesan)', badgeBgClass: 'bg-database', layer: 'database' },
  { id: 'docker', stepNum: '4', title: 'Kontainer Kargo Docker', subtitle: 'Fondasi Pembungkus Server', badgeBgClass: 'bg-devops text-white', layer: 'devops' },
]

export const LEGEND_ITEMS = [
  { colorClass: 'bg-frontend', label: 'Laptop & HP:', desc: 'Layar Pengguna (Frontend)' },
  { colorClass: 'bg-backend', label: 'Gerbang & Lemari Server:', desc: 'Pemroses (Backend)' },
  { colorClass: 'bg-cache', label: 'Chip RAM Merah:', desc: 'Memori Kilat (Redis)' },
  { colorClass: 'bg-database', label: 'Tabung Silinder:', desc: 'Gudang Data (Database)' },
  { colorClass: 'bg-devops', label: 'Kontainer Kargo:', desc: 'Wadah Server (Docker)' },
]

export const STEP_BOXES = [
  { num: 1, title: '1. USER KLIK', desc: 'Layar kirim permintaan', textClass: 'text-frontend' },
  { num: 2, title: '2. PROSES API', desc: 'Server cek keamanan', textClass: 'text-backend' },
  { num: 3, title: '3. AMBIL DATA', desc: 'Cek Redis / Database', textClass: 'text-database' },
  { num: 4, title: '4. TAMPILKAN', desc: 'Hasil muncul di layar', textClass: 'text-white' },
]

export const DEFAULT_STORY = {
  headline: 'CARA KERJA FULLSTACK (ANALOGI SEDERHANA):',
  explanation:
    'Bayangkan sistem web seperti <strong>Restoran Modern</strong>: <strong>(1) Frontend</strong> adalah buku menu & kasir tempat pelanggan memesan, <strong>(2) Backend API</strong> adalah koki yang memasak pesanan, <strong>(3) Redis Cache</strong> adalah etalase makanan siap saji super cepat, dan <strong>(4) Database</strong> adalah gudang penyimpanan bahan baku.',
}

export const DEFAULT_TELEMETRY = {
  status: 'SIAP: MENUNGGU SKENARIO',
  latency: 'PILIH CONTOH KASUS',
  badgeClass: 'bg-slate-200 text-ink',
}
