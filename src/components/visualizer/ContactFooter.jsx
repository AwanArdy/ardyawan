const YEAR = new Date().getFullYear()

const CONTACT_LINKS = [
  { label: 'Email', value: 'muhammadawanardy@gmail.com', href: 'mailto:muhammadawanardy@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/muhammad-awan-ardy', href: 'https://www.linkedin.com/' },
  { label: 'GitHub', value: 'github.com/muhammadawan46', href: 'https://github.com/muhammadawan46' },
]

export default function ContactFooter() {
  return (
    <footer id="contact" className="bg-ink text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-backend mb-4">
          Kontak &amp; Kolaborasi:
        </h2>
        <div className="grid gap-3 sm:grid-cols-3 mb-8">
          {CONTACT_LINKS.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flat-btn bg-slate-900 border-2 border-slate-700 rounded-xl p-4 hover:border-frontend"
            >
              <div className="font-mono text-[10px] uppercase text-slate-400">{label}</div>
              <div className="font-mono text-xs font-bold mt-1 break-all">{value}</div>
            </a>
          ))}
        </div>
        <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="font-mono text-[11px] text-slate-400">
            &copy; {YEAR} Muhammad Awan Ardy Firmansyah
          </span>
          <span className="font-mono text-[11px] text-slate-500">Dibangun dengan React + Vite + Three.js</span>
        </div>
      </div>
    </footer>
  )
}
