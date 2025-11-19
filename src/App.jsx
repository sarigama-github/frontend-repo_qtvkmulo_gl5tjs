import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

function App() {
  const [items, setItems] = useState([])
  const [openCheckout, setOpenCheckout] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    // Ensure backend reachable silently
    fetch(`${baseUrl}/menu`).catch(()=>{})
  }, [])

  const addItem = ({ name, price }) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.name === name)
      if (existing) {
        return prev.map((p) => p.name === name ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { name, price, quantity: 1 }]
    })
  }

  const changeQty = (name, quantity) => {
    setItems((prev) => {
      if (quantity === 0) return prev.filter((p) => p.name !== name)
      return prev.map((p) => p.name === name ? { ...p, quantity } : p)
    })
  }

  const clear = () => setItems([])

  const handleCheckout = () => setOpenCheckout(true)

  const placeOrder = async ({ name, phone, address, notes }) => {
    if (!name || !phone || !address) {
      alert('Please fill name, phone and address')
      return
    }
    const order = {
      customer: { name, phone, address },
      items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
      subtotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
      delivery_fee: items.reduce((s, i) => s + i.price * i.quantity, 0) > 300 ? 0 : 20,
      total: items.reduce((s, i) => s + i.price * i.quantity, 0) + (items.reduce((s, i) => s + i.price * i.quantity, 0) > 300 ? 0 : 20),
      notes: notes || ''
    }

    try {
      const res = await fetch(`${baseUrl}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })
      const data = await res.json()
      if (res.ok) {
        setOpenCheckout(false)
        clear()
        alert('Order placed! Your Order ID: ' + data.order_id)
      } else {
        alert(data.detail || 'Failed to place order')
      }
    } catch (e) {
      alert('Network error placing order')
    }
  }

  const summary = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
    const deliveryFee = subtotal > 300 ? 0 : 20
    return { subtotal, deliveryFee, total: subtotal + deliveryFee }
  }, [items])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* glass navbar */}
      <header className="fixed top-0 inset-x-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between rounded-2xl bg-white/10 backdrop-blur border border-white/20 px-4 py-3">
            <a href="#" className="text-white font-bold tracking-wide">VRINDAVAN SOUTH INDIAN</a>
            <a href="#menu" className="text-white/80 hover:text-white">Menu</a>
          </div>
        </div>
      </header>

      <Hero />

      <div className="container mx-auto px-6 pb-24 grid lg:grid-cols-[1fr_360px] gap-8">
        <Menu onAdd={addItem} />
        <Cart items={items} onChangeQty={changeQty} onClear={clear} onCheckout={() => setOpenCheckout(true)} />
      </div>

      <footer id="about" className="border-t border-white/10 py-10 text-center text-white/70">
        <p>Made with love • Hygienic kitchen • Fast delivery</p>
        <p className="mt-2 text-white/50 text-sm">© {new Date().getFullYear()} Vrindavan South Indian</p>
      </footer>

      <Checkout open={openCheckout} onClose={() => setOpenCheckout(false)} items={items} summary={summary} onPlaceOrder={placeOrder} />
    </div>
  )
}

export default App
