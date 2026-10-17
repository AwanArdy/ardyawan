import { focusLayerFromCard } from '../../lib/simBus'

const TOPICS = [
  {
    key: 'frontend',
    title: '1. Layar Aplikasi (Frontend)',
    desc: 'Membangun antarmuka yang cepat, responsif, dan enak dipakai di HP maupun laptop.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite & Zustand'],
    accent: 'border-l-frontend text-frontend',
  },
  {
    key: 'backend',
    title: '2. Mesin Pemroses (Backend & API)',
    desc: 'Menghidupkan logika server: autentikasi JWT, pembayaran, analitik, dan pesan realtime.',
    skills: ['Node.js', 'NestJS', 'Express.js', 'Python', 'FastAPI', 'Socket.io'],
    accent: 'border-l-backend text-backend',
  },
  {
    key: 'database',
    title: '3. Gudang Data (Database & Cache)',
    desc: 'Menyimpan data aman & terstruktur, dengan lapisan cache supaya akses secepat kilat.',
    skills: ['PostgreSQL', 'Redis', 'MongoDB', 'Prisma ORM', 'Row-Level Locking'],
    accent: 'border-l-database text-database',
  },
  {
    key: 'devops',
    title: '4. Wadah Server (Docker & DevOps)',
    desc: 'Mengemas aplikasi agar bisa dijalankan di komputer mana pun dengan dokumentasi API rapi.',
    skills: ['Docker', 'Git', 'Swagger/OpenAPI', 'Cloudinary', 'Vite Build'],
    accent: 'border-l-devops text-devops',
  },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-paper">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-1">Peta Keahlian Fullstack</h2>
        <p className="font-mono text-xs text-slate-500 mb-6 uppercase tracking-wide">
          Empat lapis keahlian — klik kartu untuk memotret detailnya di simulasi 3D
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {TOPICS.map(({ key, title, desc, skills, accent }) => (
            <div
              key={key}
              tabIndex={0}
              onClick={() => focusLayerFromCard(key)}
              onKeyDown={(e) => e.key === 'Enter' && focusLayerFromCard(key)}
              className={`cursor-pointer bg-paper border-2 border-ink border-l-8 ${accent} rounded-xl p-4 space-y-2 hover:shadow-[6px_6px_0px_#0F172A] transition-shadow`}
            >
              <h3 className={`font-bold text-sm ${accent.split(' ')[1]}`}>{title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skills.map((s) => (
                  <span key={s} className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-100">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
