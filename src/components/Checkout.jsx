import { useState } from 'react'

export default function Checkout({ open, onClose, items, summary, onPlaceOrder }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' })
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50">
      <div className="w-full md:max-w-xl bg-white rounded-2xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Delivery Details</h3>
          <button onClick={onClose} className="text-sm text-gray-500">Close</button>
        </div>
        <div className="p-4 grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm">Name</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
            <label className="block text-sm">Phone</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
            <label className="block text-sm">Address</label>
            <textarea className="w-full border rounded-lg px-3 py-2" rows="3" value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} />
            <label className="block text-sm">Notes</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.notes} onChange={(e)=>setForm({...form,notes:e.target.value})} />
          </div>
          <div className="bg-gray-50 rounded-lg p-3 h-full">
            <h4 className="font-semibold mb-2">Order Summary</h4>
            <div className="space-y-1 text-sm">
              {items.map((i)=> (
                <div key={i.name} className="flex justify-between"><span>{i.name} x {i.quantity}</span><span>₹{i.price * i.quantity}</span></div>
              ))}
              <div className="flex justify-between"><span>Subtotal</span><span>₹{summary.subtotal}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{summary.deliveryFee===0? 'Free': `₹${summary.deliveryFee}`}</span></div>
              <div className="flex justify-between font-semibold"><span>Total</span><span>₹{summary.total}</span></div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={() => onPlaceOrder({ ...form })}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}
