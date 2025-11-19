import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const groups = {
  Dosa: [
    { name: 'Plain Dosa', price: 50 },
    { name: 'Onion Dosa', price: 60 },
    { name: 'Ghee Dosa', price: 60 },
    { name: 'Masala Dosa', price: 70 },
    { name: 'Karam Dosa', price: 60 },
    { name: 'Ghee Karam Dosa', price: 70 },
    { name: 'Onion Karam Dosa', price: 70 },
    { name: 'Setl Dosa', price: 70 },
    { name: 'Upma Dosa', price: 70 },
    { name: 'Butter Dosa', price: 60 },
  ],
  Combo: [
    { name: 'Mysore Bonda', price: 50 },
    { name: 'Idli + Punugulu + Vada', price: 50 },
    { name: 'Idli + Punugulu + Vada + Bonda', price: 60 },
  ],
}

export default function Menu({ onAdd }) {
  const [search, setSearch] = useState('')

  const allItems = Object.entries(groups).flatMap(([category, items]) =>
    items.map((i) => ({ ...i, category }))
  )

  const filtered = allItems.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <section id="menu" className="relative py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our Menu</h2>
            <p className="text-white/70">Freshly made, served hot. Tap to add to cart.</p>
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes..."
            className="w-full md:w-80 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAdd({ name: item.name, price: item.price })}
              className="text-left p-5 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/15 transition group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-xs text-white/60 mt-1">{item.category}</p>
                </div>
                <p className="text-emerald-300 font-bold text-lg">₹{item.price}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
