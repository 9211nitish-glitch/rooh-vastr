"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Sparkles,
  Sliders,
  Eye,
  EyeOff,
  ChevronRight,
  Save,
  X,
  Tag,
  Upload,
} from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  banner_url: string;
  active: boolean;
  subcategories: string[];
  pod_rules: {
    allow_custom_text: boolean;
    allow_photo_upload: boolean;
    allow_dual_sided: boolean;
    dual_side_extra_price: number;
    available_variants: string[];
  };
}

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Custom T-Shirts & Hoodies",
    slug: "custom-tshirts",
    description: "Premium 240 GSM bio-washed cotton, oversized fit, DTF & puff prints.",
    banner_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    active: true,
    subcategories: ["Oversized T-Shirts", "Classic Crewneck", "Couple Sets", "Hoodies & Sweatshirts"],
    pod_rules: {
      allow_custom_text: true,
      allow_photo_upload: true,
      allow_dual_sided: true,
      dual_side_extra_price: 150,
      available_variants: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    },
  },
  {
    id: "cat-2",
    name: "Personalized Mugs & Cups",
    slug: "personalized-mugs",
    description: "Ceramic magic color-changing mugs, travel tumblers, gold-rim tea sets.",
    banner_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    active: true,
    subcategories: ["Magic Color Changing", "White Gloss Ceramic", "Inner Color Mugs", "Insulated Travel Flasks"],
    pod_rules: {
      allow_custom_text: true,
      allow_photo_upload: true,
      allow_dual_sided: true,
      dual_side_extra_price: 50,
      available_variants: ["11 oz Ceramic", "15 oz Jumbo", "Matte Black", "Stainless Travel"],
    },
  },
  {
    id: "cat-3",
    name: "Custom Cushions & Pillows",
    slug: "custom-cushions",
    description: "Velvet touch, sequins reveal, and memory photo collage cushions.",
    banner_url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    active: true,
    subcategories: ["Magic Reversible Sequin", "Micro-Velvet Plush", "LED Glow Cushions", "Heart Shaped Cushions"],
    pod_rules: {
      allow_custom_text: true,
      allow_photo_upload: true,
      allow_dual_sided: true,
      dual_side_extra_price: 120,
      available_variants: ["12x12 inch", "16x16 inch", "18x18 inch", "Heart Size"],
    },
  },
  {
    id: "cat-4",
    name: "Keychains & Bottles",
    slug: "keychains-bottles",
    description: "Engraved metal keychains, personalized acrylic codes, hot & cold flasks.",
    banner_url: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80",
    active: true,
    subcategories: ["Spotify Barcode Keychains", "Leather Metal Combos", "Temperature LED Bottles", "Gym Shakers"],
    pod_rules: {
      allow_custom_text: true,
      allow_photo_upload: true,
      allow_dual_sided: false,
      dual_side_extra_price: 0,
      available_variants: ["Steel Finish", "Matte Black", "Rose Gold", "Walnut Wood"],
    },
  },
  {
    id: "cat-5",
    name: "Photo Frames & Wall Art",
    slug: "photo-frames-wall-art",
    description: "Acrylic spotify stands, memory galaxy collage frames, canvas boards.",
    banner_url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    active: true,
    subcategories: ["Acrylic Song Plaques", "Deep Box Wooden Frames", "Hexagon Wall Tiles", "Minimalist Posters"],
    pod_rules: {
      allow_custom_text: true,
      allow_photo_upload: true,
      allow_dual_sided: false,
      dual_side_extra_price: 0,
      available_variants: ["6x8 inch", "8x12 inch", "12x18 inch", "A4 Framed"],
    },
  },
  {
    id: "cat-6",
    name: "Corporate & Bulk Gifts",
    slug: "corporate-gifts",
    description: "Luxury employee onboarding hampers, executive diaries, branded hoodies.",
    banner_url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    active: true,
    subcategories: ["Welcome Hamper Boxes", "Festive Hampers", "Tech Accessories", "Event Apparel"],
    pod_rules: {
      allow_custom_text: true,
      allow_photo_upload: true,
      allow_dual_sided: true,
      dual_side_extra_price: 100,
      available_variants: ["Starter Kit", "Executive Tier", "Festive Deluxe"],
    },
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newSubcatInput, setNewSubcatInput] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rooh_categories");
      if (stored) {
        setCategories(JSON.parse(stored));
      } else {
        setCategories(DEFAULT_CATEGORIES);
        localStorage.setItem("rooh_categories", JSON.stringify(DEFAULT_CATEGORIES));
      }
    } catch (e) {
      console.error(e);
      setCategories(DEFAULT_CATEGORIES);
    }
  }, []);

  const saveCategories = (cats: Category[]) => {
    setCategories(cats);
    try {
      localStorage.setItem("rooh_categories", JSON.stringify(cats));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleActive = (id: string) => {
    const updated = categories.map((c) => (c.id === id ? { ...c, active: !c.active } : c));
    saveCategories(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const updated = categories.filter((c) => c.id !== id);
      saveCategories(updated);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    if (isCreating) {
      const created: Category = {
        ...editingCategory,
        id: `cat-${Date.now()}`,
        slug: editingCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      };
      saveCategories([...categories, created]);
    } else {
      const updated = categories.map((c) => (c.id === editingCategory.id ? editingCategory : c));
      saveCategories(updated);
    }
    setEditingCategory(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs">
        <div>
          <span className="text-xs uppercase font-bold text-[#6D1835] tracking-widest">
            Catalog Structure & POD Engine
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124] mt-1">
            Categories & Customization Settings
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Define subcategories, personalization requirements (photo upload, text input, print sides), and pricing rules.
          </p>
        </div>

        <button
          onClick={() => {
            setIsCreating(true);
            setEditingCategory({
              id: "",
              name: "",
              slug: "",
              description: "",
              banner_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
              active: true,
              subcategories: ["Standard Collection"],
              pod_rules: {
                allow_custom_text: true,
                allow_photo_upload: true,
                allow_dual_sided: false,
                dual_side_extra_price: 0,
                available_variants: ["Standard"],
              },
            });
          }}
          className="px-4 py-2.5 bg-[#6D1835] hover:bg-[#521327] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`bg-white rounded-3xl border transition-all overflow-hidden flex flex-col justify-between shadow-xs ${
              cat.active ? "border-stone-200/90 hover:border-[#6D1835]/40" : "border-stone-200 opacity-60"
            }`}
          >
            <div>
              {/* Category Image Header */}
              <div className="relative h-36 bg-stone-100 overflow-hidden">
                <img
                  src={cat.banner_url}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                  <div>
                    <h3 className="font-serif font-bold text-base text-white">{cat.name}</h3>
                    <span className="text-[10px] text-stone-300 font-mono">/{cat.slug}</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => toggleActive(cat.id)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition-colors ${
                      cat.active
                        ? "bg-emerald-500/90 text-white"
                        : "bg-stone-800/90 text-stone-300"
                    }`}
                  >
                    {cat.active ? "Live" : "Hidden"}
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-stone-600 line-clamp-2">{cat.description}</p>

                {/* Subcategories tags */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Subcategories ({cat.subcategories.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.subcategories.map((sub, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-stone-700 text-[10px] font-medium border border-stone-200/80"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* POD Rules Matrix */}
                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-stone-200/80 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Custom Text Option:</span>
                    <span className="font-bold text-[#242124]">
                      {cat.pod_rules.allow_custom_text ? "✓ Enabled" : "✗ Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Customer Photo Upload:</span>
                    <span className="font-bold text-[#242124]">
                      {cat.pod_rules.allow_photo_upload ? "✓ Enabled" : "✗ Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Dual Sided Printing:</span>
                    <span className="font-bold text-[#6D1835]">
                      {cat.pod_rules.allow_dual_sided
                        ? `+₹${cat.pod_rules.dual_side_extra_price}`
                        : "Single side"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingCategory(cat);
                }}
                className="text-xs font-bold text-[#6D1835] hover:underline flex items-center gap-1"
              >
                <Edit className="w-3.5 h-3.5" /> Configure POD Rules
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                title="Delete Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#242124]">
                {isCreating ? "Create New Product Category" : `Configure ${editingCategory.name}`}
              </h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2]/40"
                  placeholder="e.g. Luxury Engraved Pens"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2]/40"
                  placeholder="Brief description for catalog filters and SEO..."
                />
              </div>

              <ImageUploadField
                label="Cover Banner Image"
                value={editingCategory.banner_url}
                onChange={(url) =>
                  setEditingCategory({ ...editingCategory, banner_url: url })
                }
                folder="categories"
                aspectRatio="banner"
                helperText="Upload category card banner or collection cover image from device or paste link."
              />

              {/* Subcategories Editor */}
              <div className="space-y-2">
                <label className="block font-bold text-stone-700 uppercase">
                  Subcategories
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {editingCategory.subcategories.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 font-medium flex items-center gap-1.5 border border-stone-200"
                    >
                      {sub}
                      <button
                        type="button"
                        onClick={() =>
                          setEditingCategory({
                            ...editingCategory,
                            subcategories: editingCategory.subcategories.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-stone-400 hover:text-rose-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add subcategory name..."
                    value={newSubcatInput}
                    onChange={(e) => setNewSubcatInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newSubcatInput.trim()) {
                        setEditingCategory({
                          ...editingCategory,
                          subcategories: [...editingCategory.subcategories, newSubcatInput.trim()],
                        });
                        setNewSubcatInput("");
                      }
                    }}
                    className="px-3 py-1.5 bg-stone-800 text-white font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Customization & POD Rules */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 space-y-3">
                <span className="font-serif font-bold text-sm text-[#242124] block">
                  Personalization & Print Studio Controls
                </span>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingCategory.pod_rules.allow_custom_text}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          pod_rules: {
                            ...editingCategory.pod_rules,
                            allow_custom_text: e.target.checked,
                          },
                        })
                      }
                      className="rounded text-[#6D1835]"
                    />
                    <span className="font-semibold text-stone-800">
                      Enable Custom Engraving / Name Text Input
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingCategory.pod_rules.allow_photo_upload}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          pod_rules: {
                            ...editingCategory.pod_rules,
                            allow_photo_upload: e.target.checked,
                          },
                        })
                      }
                      className="rounded text-[#6D1835]"
                    />
                    <span className="font-semibold text-stone-800">
                      Enable High-Res Photo Upload Requirement
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingCategory.pod_rules.allow_dual_sided}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          pod_rules: {
                            ...editingCategory.pod_rules,
                            allow_dual_sided: e.target.checked,
                          },
                        })
                      }
                      className="rounded text-[#6D1835]"
                    />
                    <span className="font-semibold text-stone-800">
                      Offer Both-Sided Printing Option
                    </span>
                  </label>

                  {editingCategory.pod_rules.allow_dual_sided && (
                    <div className="pl-6 pt-1 flex items-center gap-2">
                      <span className="text-stone-600">Extra charge for both sides: ₹</span>
                      <input
                        type="number"
                        value={editingCategory.pod_rules.dual_side_extra_price}
                        onChange={(e) =>
                          setEditingCategory({
                            ...editingCategory,
                            pod_rules: {
                              ...editingCategory.pod_rules,
                              dual_side_extra_price: Number(e.target.value),
                            },
                          })
                        }
                        className="w-24 px-2 py-1 rounded-lg border border-stone-300"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D1835] text-white font-bold hover:bg-[#521327]"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
