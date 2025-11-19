import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative gradient backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.2),transparent_60%)]" />
        {/* 3D Spline scene (lightweight, decorative) */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-70">
          <Spline scene="https://prod.spline.design/2Qns5nMHvR1OAHyB/scene.splinecode" />
        </div>
      </div>

      <div className="relative container mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white mb-4 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Open Now • Authentic Taste
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
            VRINDAVAN SOUTH INDIAN
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Crispy dosas, fluffy idlis, hot vadas and more — crafted with love. Order now for quick delivery.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="#menu" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition">
              Explore Menu
            </a>
            <a href="#about" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/30 backdrop-blur transition">
              Why Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
