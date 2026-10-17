import { simulateProjectIn3D } from '../../lib/simBus'

const PROJECTS = [
  {
    id: 1,
    title: 'Dashboard Analitik Realtime',
    desc: 'Laporan penjualan & trafik dengan visualisasi instan berkat Redis Cache di depan PostgreSQL.',
    stack: ['React', 'NestJS', 'Redis', 'PostgreSQL'],
    workload: 'api_cache',
    accent: 'border-l-frontend',
  },
  {
    id: 2,
    title: 'Toko Online Multi-User',
    desc: 'Checkout 10.000+ transaksi/hari tanpa stok bentrok berkat Row-Level Locking.',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker'],
    workload: 'ecommerce_tx',
    accent: 'border-l-database',
  },
  {
    id: 3,
    title: 'Aplikasi Chat Realtime',
    desc: 'Pesan terenkripsi E2EE dengan latensi di bawah 100ms menggunakan WebSocket.',
    stack: ['React', 'Socket.io', 'MongoDB', 'Docker'],
    workload: 'websocket_chat',
    accent: 'border-l-backend',
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-paperAlt border-y-2 border-ink">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-1">Proyek &amp; Sistemnya</h2>
        <p className="font-mono text-xs text-slate-500 mb-6 uppercase tracking-wide">
          Proyek &amp; Kisah Transformasinya &mdash; klik untuk melihat cara kerja sistemnya di simulasi 3D
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map(({ id, title, desc, stack, workload, accent }) => (
            <button
              key={id}
              onClick={() => simulateProjectIn3D(workload)}
              className={`flat-btn text-left bg-paper border-2 border-ink border-l-8 ${accent} rounded-xl p-4 flex flex-col gap-2`}
            >
              <h3 className="font-bold text-sm">{title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {stack.map((s) => (
                  <span key={s} className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-100">
                    {s}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[10px] text-frontend uppercase">Jalankan simulasi 3D &rarr;</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
