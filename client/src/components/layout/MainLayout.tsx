import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f4ee] dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-[#1a62ea]/20 selection:text-[#1a62ea]">
      {/* Decorative vertical editorial line */}
      <div className="absolute top-0 bottom-0 left-6 sm:left-12 w-px bg-slate-300/40 dark:bg-slate-800/60 pointer-events-none hidden sm:block z-0" />
      <div className="absolute top-0 bottom-0 right-6 sm:right-12 w-px bg-slate-300/40 dark:bg-slate-800/60 pointer-events-none hidden sm:block z-0" />

      <Navbar />
      <main className="flex-1 w-full relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

