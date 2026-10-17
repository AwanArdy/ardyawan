import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#about', label: 'Tentang' },
  { href: '#skills', label: 'Keahlian' },
  { href: '#projects', label: 'Proyek' },
  { href: '#visualizer', label: 'Simulasi 3D' },
  { href: '#contact', label: 'Kontak' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 bg-ink/95 backdrop-blur border-b-2 border-slate-700 transition-shadow ${
        scrolled ? 'shadow-[0_4px_0px_rgba(15,23,42,0.35)]' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <a href="#top" className="font-mono text-sm font-bold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-frontend inline-block border border-white" />
          MAARDY<strong className="text-backend">.DEV</strong>
        </a>
        <nav className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[11px] sm:text-xs text-slate-300 hover:text-white border-b-2 border-transparent hover:border-frontend whitespace-nowrap"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
