'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useWishlist } from '@/lib/context/WishlistContext';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'proofs' | 'addresses' | 'settings'>('orders');
  const { wishlistCount } = useWishlist();

  // Demo user data (persisted or local session)
  const user = {
    name: 'Kabir & Siya Roy',
    email: 'kabir.roy@example.com',
    phone: '+91 96548 61504',
    memberTier: 'Rooh Heritage Patron',
    memberSince: 'October 2024',
  };

  const demoOrders = [
    {
      id: 'RV-89421',
      date: '14 Oct 2026',
      itemsCount: 2,
      total: 2498,
      status: 'Shipped',
      awb: 'BLUEDART-88219031',
      items: [
        {
          name: 'Heritage Heavyweight Fleece Hoodie',
          variant: 'Charcoal Black / L',
          price: 1899,
          image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Artisan Ceramic Coffee Mug',
          variant: 'Warm Ivory / 350ml',
          price: 599,
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
    {
      id: 'RV-81045',
      date: '28 Sep 2026',
      itemsCount: 1,
      total: 1299,
      status: 'Delivered',
      awb: 'DELHIVERY-51902410',
      items: [
        {
          name: 'Handcrafted Memory Photo Frame',
          variant: 'Natural Teak / 8x10',
          price: 1299,
          image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
  ];

  const demoCustomProofs = [
    {
      id: 'BESPOKE-904',
      product: 'Custom Anniversary Photo Hoodie',
      canvasColor: 'Deep Burgundy',
      placement: 'Center Chest + Left Wrist Date',
      status: 'Proof Sent on WhatsApp',
      lastUpdate: 'Yesterday at 4:30 PM',
      quote: 2199,
      previewUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Banner */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#6D1835] text-amber-200 font-serif text-2xl font-bold flex items-center justify-center border-2 border-stone-100 shadow-md">
              KR
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-serif text-2xl text-[#242124] font-medium">{user.name}</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#6D1835]/10 text-[#6D1835] px-2.5 py-0.5 rounded-full">
                  {user.memberTier}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-light">
                {user.email} &bull; {user.phone} &bull; Member since {user.memberSince}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto">
            <Link
              href="/wishlist"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-stone-200 bg-[#FAF7F2] text-xs font-semibold uppercase tracking-wider text-[#242124] hover:border-[#6D1835] hover:text-[#6D1835] transition-all"
            >
              <Heart className="w-3.5 h-3.5 text-[#6D1835] fill-[#6D1835]" />
              Wishlist ({wishlistCount})
            </Link>
            <Link
              href="/custom-printing"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#6D1835] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#56132a] transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              Bespoke Studio
            </Link>
          </div>
        </div>

        {/* Tab Navigation & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-stone-200 p-2 shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#6D1835] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-[#6D1835]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'}`}>
                {demoOrders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('proofs')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'proofs'
                  ? 'bg-[#6D1835] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-[#6D1835]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4" />
                <span>Bespoke Proofs</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'proofs' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>
                1 Action
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-[#6D1835] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-[#6D1835]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#6D1835] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-[#6D1835]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Account Preferences</span>
            </button>
          </div>

          {/* Main Tab Panel */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl text-[#242124]">Order History</h2>
                  <Link href="/shop" className="text-xs font-semibold text-[#6D1835] uppercase tracking-wider hover:underline">
                    Explore New Collections &rarr;
                  </Link>
                </div>

                {demoOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                    <div className="bg-[#FAF7F2] px-6 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-6">
                        <div>
                          <span className="text-stone-500 uppercase tracking-widest block text-[10px]">Order ID</span>
                          <span className="font-bold text-[#242124]">{order.id}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 uppercase tracking-widest block text-[10px]">Placed On</span>
                          <span className="font-medium text-[#242124]">{order.date}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 uppercase tracking-widest block text-[10px]">Total Paid</span>
                          <span className="font-bold text-[#6D1835]">{formatCurrency(order.total)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                        <Link
                          href={`/track-order?awb=${order.awb}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-[11px] font-semibold text-[#242124] hover:border-[#6D1835] hover:text-[#6D1835] transition-all"
                        >
                          Track Live &rarr;
                        </Link>
                      </div>
                    </div>

                    <div className="p-6 divide-y divide-stone-100">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-[#242124] text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-stone-500">{item.variant}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-stone-900 text-sm">{formatCurrency(item.price)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* BESPOKE PROOFS TAB */}
            {activeTab === 'proofs' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-[#242124]">Bespoke 2D Mockup Proofs</h2>
                  <p className="text-xs text-stone-600 mt-1 font-light">
                    Review and sign off on your customized print mockups rendered by Rooh Vastr master artisans before printing begins.
                  </p>
                </div>

                {demoCustomProofs.map((proof) => (
                  <div key={proof.id} className="bg-white rounded-2xl border-2 border-[#6D1835]/30 p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold uppercase text-[#6D1835]">{proof.id}</span>
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                            {proof.status}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg text-[#242124]">{proof.product}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-stone-500 block uppercase tracking-wider">Estimated Quote</span>
                        <span className="font-serif text-xl font-bold text-[#6D1835]">{formatCurrency(proof.quote)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 mb-6 bg-[#FAF7F2] p-4 rounded-xl">
                      <div>
                        <span className="font-semibold text-stone-900">Base Garment Color:</span> {proof.canvasColor}
                      </div>
                      <div>
                        <span className="font-semibold text-stone-900">Print Placement:</span> {proof.placement}
                      </div>
                      <div>
                        <span className="font-semibold text-stone-900">Proof Dispatched:</span> {proof.lastUpdate}
                      </div>
                      <div>
                        <span className="font-semibold text-stone-900">Revisions Left:</span> 2 Complimentary
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <a
                        href="https://wa.me/919654861504?text=Hello%20Rooh%20Vastr,%20I%20am%20reviewing%20my%20Bespoke%20Proof%20BESPOKE-904"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-[#20ba59] transition-all shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4" /> Open WhatsApp Proof Chat
                      </a>
                      <button
                        onClick={() => alert('Proof approved! Order has been scheduled for priority printing in the atelier.')}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#6D1835] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-[#56132a] transition-all shadow-xs cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Approve Proof & Produce
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SAVED ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl text-[#242124]">Saved Shipping Addresses</h2>
                  <button
                    onClick={() => alert('Address modal opened')}
                    className="text-xs font-semibold text-[#6D1835] uppercase tracking-wider hover:underline"
                  >
                    + Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl border border-stone-200 p-6 relative">
                    <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      Default Home
                    </span>
                    <h3 className="font-medium text-[#242124] text-base mb-1">Kabir Roy</h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-light mb-4">
                      Apartment 402, Lotus Heights<br />
                      Indiranagar 100ft Road<br />
                      Bengaluru, Karnataka — 560038<br />
                      Phone: +91 96548 61504
                    </p>
                    <div className="flex gap-4 text-xs font-semibold text-[#6D1835]">
                      <button className="hover:underline">Edit</button>
                      <button className="text-stone-400 hover:text-red-600">Delete</button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-stone-200 p-6">
                    <h3 className="font-medium text-[#242124] text-base mb-1">Siya Roy (Office / Gifting)</h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-light mb-4">
                      Suite 9B, Prestige Tech Park<br />
                      Marathahalli Outer Ring Road<br />
                      Bengaluru, Karnataka — 560103<br />
                      Phone: +91 98765 43211
                    </p>
                    <div className="flex gap-4 text-xs font-semibold text-[#6D1835]">
                      <button className="hover:underline">Edit</button>
                      <button className="text-stone-400 hover:text-red-600">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-stone-200 p-8 space-y-6">
                <h2 className="font-serif text-2xl text-[#242124]">Personal Preferences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Mobile Number (WhatsApp Notifications)
                    </label>
                    <input
                      type="tel"
                      defaultValue={user.phone}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Preferred Gift Packaging
                    </label>
                    <select className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/40 focus:outline-none focus:border-[#6D1835]">
                      <option>Rooh Signature Wax-Sealed Burgundy Box</option>
                      <option>Eco-Friendly Minimalist Kraft Wrapping</option>
                      <option>Festive Gold Ribbon Keepsake</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => alert('Preferences saved!')}
                    className="py-3 px-6 rounded-full bg-[#6D1835] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#56132a] transition-all shadow-xs cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <Link
                    href="/admin"
                    className="text-xs font-semibold text-stone-500 hover:text-[#6D1835] uppercase tracking-wider"
                  >
                    Switch to Admin Studio &rarr;
                  </Link>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
