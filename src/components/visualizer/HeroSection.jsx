export default function HeroSection() {
  return (
    <section id="top" className="bg-ink text-white border-b-2 border-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-14 sm:py-20 flex flex-col gap-6">
        <span className="font-mono text-[11px] uppercase tracking-widest text-backend border border-slate-700 rounded px-2 py-1 w-fit bg-slate-900">
          Fullstack Developer &bull; React &bull; Node &bull; Python
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
          Muhammad Awan Ardy <span className="text-backend">Firmansyah</span>
        </h1>
        <p className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
          Saya merancang &amp; membangun aplikasi web secara <strong className="text-white">end-to-end</strong>: mulai dari
          layar aplikasi yang nyaman dipakai pengguna, mesin API yang cepat &amp; aman, hingga gudang database terstruktur —
          semuanya dikemas rapi dalam kontainer Docker.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href="#visualizer"
            className="flat-btn bg-frontend text-white font-mono text-xs font-bold py-2.5 px-4 rounded-lg"
          >
            Lihat Simulasi Sistem 3D &rarr;
          </a>
          <a
            href="#contact"
            className="flat-btn bg-white text-ink font-mono text-xs font-bold py-2.5 px-4 rounded-lg"
          >
            Hubungi Saya
          </a>
        </div>
      </div>
    </section>
  )
}
