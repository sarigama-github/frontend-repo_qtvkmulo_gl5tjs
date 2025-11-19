import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Cart({ items, onChangeQty, onClear, onCheckout }) {
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items])
  const deliveryFee = subtotal > 300 ? 0 : 20
  const total = subtotal + deliveryFee

  return (
    <aside className="sticky bottom-4 md:static md:bottom-auto">
      <div className="mx-6 md:mx-0 bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">Your Order</h3>
          <button onClick={onClear} className="text-sm text-white/70 hover:text-white underline">Clear</button>
        </div>
        <div className="max-h-60 overflow-auto space-y-3">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between bg-white/5 rounded-xl p-3"
              >
                <div>
                  <p className="text-white">{item.name}</p>
                  <p className="text-white/60 text-sm">₹{item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onChangeQty(item.name, Math.max(0, item.quantity - 1))} className="w-8 h-8 rounded-full bg-white/10 text-white">-</button>
                  <span className="w-8 text-center text-white">{item.quantity}</span>
                  <button onClick={() => onChangeQty(item.name, item.quantity + 1)} className="w-8 h-8 rounded-full bg-emerald-500 text-white">+</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {items.length === 0 && <p className="text-white/60 text-sm">No items yet. Tap a dish to add.</p>}
        </div>
        <div className="mt-4 space-y-1 text-white">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between text-sm"><span>Delivery</span><span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span></div>
          <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{total}</span></div>
        </div>
        <button onClick={() => onCheckout({ subtotal, deliveryFee, total })} className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg">Checkout</button>
      </div>
    </aside>
  )
}
