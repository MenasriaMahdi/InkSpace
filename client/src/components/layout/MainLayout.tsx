import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 w-full">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
