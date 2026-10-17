const WORKLOADS = [
  {
    type: 'api_cache',
    title: '1. Buka Dashboard Analitik',
    desc: 'Ambil laporan cepat lewat Redis Cache',
    className: 'bg-frontend text-white',
  },
  {
    type: 'ecommerce_tx',
    title: '2. Belanja & Bayar (E-Commerce)',
    desc: 'Kunci stok di Database agar tidak bentrok',
    className: 'bg-database text-ink',
  },
  {
    type: 'websocket_chat',
    title: '3. Kirim Pesan Chat Rahasia',
    desc: 'Enkripsi pesan & kirim instan (<100ms)',
    className: 'bg-backend text-ink',
  },
]

export default function ActionControls({ onSelectWorkload }) {
  return (
    <div className="bg-paperAlt text-ink border-t-2 border-ink p-3 sm:p-4">
      <div className="font-mono text-xs font-bold uppercase text-slate-700 mb-2 flex items-center justify-between">
        <span>Pilih Contoh Kasus Nyata (Lihat Cara Kerja Sistemnya):</span>
        <span className="hidden sm:inline text-[11px] text-slate-500">Geser untuk Putar 3D &bull; Scroll untuk Zoom</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {WORKLOADS.map(({ type, title, desc, className }) => (
          <button
            key={type}
            onClick={() => onSelectWorkload(type)}
            className={`flat-btn ${className} font-mono text-xs font-bold py-2.5 px-3 rounded-lg flex flex-col items-start text-left`}
          >
            <span>{title}</span>
            <span className="text-[10px] font-normal opacity-90">{desc}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
