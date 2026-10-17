# Portofolio — Muhammad Awan Ardy Firmansyah

Portofolio Fullstack Developer dengan simulasi arsitektur sistem 3D interaktif (Three.js).
Dibangun dengan **React + Vite + Tailwind CSS v4 + Three.js**.

Dikonversi dari `portofolio_muhammad_awan_ardy_firmansyah.html`.

## Menjalankan

```bash
npm install
npm run dev      # dev server
npm run build    # build produksi ke dist/
npm run preview  # pratinjau hasil build
npm run lint     # oxlint
```

## Struktur

```
src/
├── main.jsx / App.jsx                 # entry + perakitan section
├── index.css                          # Tailwind @theme (ink, frontend, backend, dst) + util kelas
├── lib/
│   ├── archData.js                    # data: warna 3D, LAYER_DETAILS, NODE_INFO, dsb.
│   └── simBus.js                      # event bus antar section (Projects/Skills → 3D)
├── hooks/
│   ├── architectureModels.js          # builder model 3D (laptop, gateway, rack, silo, dst)
│   └── architectureEngine.js          # ArchitectureEngine: scene, kamera, paket data, label
└── components/
    ├── layouts/PortfolioLayout.jsx    # Navbar + konten + footer
    └── visualizer/
        ├── ArchitectureVisualizer.jsx # orchestrator state ↔ engine
        ├── LayerFilterBar.jsx         # filter layer (Semua/Frontend/Backend/Database/Docker)
        ├── StoryBar.jsx               # penjelasan skenario + 4 langkah
        ├── CanvasStage.jsx            # kanvas 3D, label, legend, log paket
        ├── InspectorHUD.jsx           # panel detail komponen + telemetry
        ├── ActionControls.jsx         # 3 tombol skenario kerja
        └── Navbar, HeroSection, SkillsSection, ProjectsSection,
            VisualizerSection, ContactFooter
```
