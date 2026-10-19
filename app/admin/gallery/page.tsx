"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  Star,
  ExternalLink,
  Tag,
  Search,
  Sparkles,
} from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface GalleryItem {
  id: string;
  title: string;
  category: "T-Shirts" | "Mugs" | "Photo Frames" | "Cushions" | "Corporate";
  customerName: string;
  imageUrl: string;
  featured: boolean;
  dateAdded: string;
  likes: number;
}

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Cyberpunk Anime Oversized Tee Print",
    category: "T-Shirts",
    customerName: "Aarav Sharma",
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
    featured: true,
    dateAdded: "15 Oct 2026",
    likes: 84,
  },
  {
    id: "gal-2",
    title: "Golden Hour Anniversary Magic Mug",
    category: "Mugs",
    customerName: "Pooja & Sameer",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    featured: true,
    dateAdded: "14 Oct 2026",
    likes: 129,
  },
  {
    id: "gal-3",
    title: "Matte Black Floating Memory Frame",
    category: "Photo Frames",
    customerName: "Rohan Kulkarni",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
    featured: false,
    dateAdded: "12 Oct 2026",
    likes: 47,
  },
  {
    id: "gal-4",
    title: "Tech Startup Team Welcome Swag Hoodies",
    category: "Corporate",
    customerName: "DevFlow Inc.",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    featured: true,
    dateAdded: "10 Oct 2026",
    likes: 210,
  },
  {
    id: "gal-5",
    title: "Personalized Velvet Photo Cushion",
    category: "Cushions",
    customerName: "Neha Gupta",
    imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop",
    featured: false,
    dateAdded: "08 Oct 2026",
    likes: 38,
  },
  {
    id: "gal-6",
    title: "Minimalist Typography Couple Tees",
    category: "T-Shirts",
    customerName: "Vikram & Ananya",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    featured: true,
    dateAdded: "05 Oct 2026",
    likes: 95,
  },
];

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    title: "",
    category: "T-Shirts",
    customerName: "",
    imageUrl: "",
    featured: false,
  });

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rooh_gallery_items");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const saveGallery = (updated: GalleryItem[]) => {
    setItems(updated);
    try {
      localStorage.setItem("rooh_gallery_items", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.imageUrl) return;

    const created: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: newItem.title,
      category: (newItem.category as GalleryItem["category"]) || "T-Shirts",
      customerName: newItem.customerName || "Rooh Vastr Studio",
      imageUrl: newItem.imageUrl,
      featured: !!newItem.featured,
      dateAdded: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      likes: 1,
    };

    saveGallery([created, ...items]);
    setIsAdding(false);
    setNewItem({
      title: "",
      category: "T-Shirts",
      customerName: "",
      imageUrl: "",
      featured: false,
    });
  };

  const toggleFeatured = (id: string) => {
    const updated = items.map((it) => (it.id === id ? { ...it, featured: !it.featured } : it));
    saveGallery(updated);
  };

  const deleteItem = (id: string) => {
    const updated = items.filter((it) => it.id !== id);
    saveGallery(updated);
  };

  const filteredItems = items.filter((it) => {
    const matchesCategory = activeCategory === "ALL" || it.category === activeCategory;
    const matchesSearch =
      it.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      it.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800">
            <ImageIcon className="w-4 h-4" />
            Visual Portfolio &amp; Customer Creations
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 mt-1">
            Gallery &amp; Print Proofs Showcase
          </h1>
          <p className="text-sm text-stone-600">
            Inspire prospective customers with real photos of completed custom POD t-shirts, mugs, and corporate merchandise.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-950 text-white text-sm font-semibold transition shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Showcase Photo
        </button>
      </div>

      {/* Categories & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creations by title or client name..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-rose-800"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {["ALL", "T-Shirts", "Mugs", "Photo Frames", "Cushions", "Corporate"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCategory === cat
                  ? "bg-rose-900 text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Showcase Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-lg font-bold font-serif text-stone-900">Add Customer Creation</h3>
              <button
                onClick={() => setIsAdding(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4 py-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Creation Title
                </label>
                <input
                  type="text"
                  required
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="e.g. Golden Foil Custom Wedding Mug"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:border-rose-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        category: e.target.value as GalleryItem["category"],
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none"
                  >
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Mugs">Mugs</option>
                    <option value="Photo Frames">Photo Frames</option>
                    <option value="Cushions">Cushions</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Customer / Client Tag
                  </label>
                  <input
                    type="text"
                    value={newItem.customerName}
                    onChange={(e) => setNewItem({ ...newItem, customerName: e.target.value })}
                    placeholder="e.g. Anjali M. or Google Team"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploadField
                label="High-Res Photo"
                value={newItem.imageUrl || ""}
                onChange={(url) => setNewItem({ ...newItem, imageUrl: url })}
                folder="gallery"
                aspectRatio="square"
                helperText="Upload showcase creation or customer photo from device or enter link."
              />

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={newItem.featured}
                  onChange={(e) => setNewItem({ ...newItem, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-900 focus:ring-rose-800"
                />
                <label htmlFor="featuredCheck" className="text-xs font-semibold text-stone-700">
                  Feature prominently on Homepage &quot;Real Creations&quot; showcase
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-sm font-semibold hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-900 hover:bg-rose-950 text-white text-sm font-semibold shadow-sm"
                >
                  Publish to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visual Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden group hover:shadow-md hover:border-rose-300 transition flex flex-col"
          >
            {/* Image Box */}
            <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                  {item.category}
                </span>
                {item.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-white" /> Featured
                  </span>
                )}
              </div>
            </div>

            {/* Info Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-stone-900 text-sm leading-snug">{item.title}</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Crafted for <strong className="text-stone-700">{item.customerName}</strong>
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-400 text-[11px]">{item.dateAdded}</span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFeatured(item.id)}
                    className={`p-1.5 rounded-lg border text-xs font-semibold transition ${
                      item.featured
                        ? "bg-amber-50 border-amber-300 text-amber-700"
                        : "border-stone-200 text-stone-500 hover:bg-stone-50"
                    }`}
                    title={item.featured ? "Remove featured" : "Mark as featured"}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        item.featured ? "fill-amber-500 text-amber-500" : ""
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
