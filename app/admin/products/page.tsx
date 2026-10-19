"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SEED_PRODUCTS, SEED_CATEGORIES } from "@/lib/data/store-data";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import {
  Package,
  Plus,
  Sparkles,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  UploadCloud,
  Edit,
} from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New product form state
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState(SEED_CATEGORIES[0]?.name || "Customized T-Shirts");
  const [newType, setNewType] = useState<"ready_made" | "custom_printing">("ready_made");
  const [newMaterial, setNewMaterial] = useState("100% Bio-Washed Combed Cotton");
  const [newImage, setNewImage] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category_name && p.category_name.toLowerCase().includes(search.toLowerCase()))
  );

  const openAddModal = () => {
    setEditingProductId(null);
    setNewName("");
    setNewPrice("");
    setNewCategory(SEED_CATEGORIES[0]?.name || "Customized T-Shirts");
    setNewType("ready_made");
    setNewMaterial("100% Bio-Washed Combed Cotton");
    setNewImage("");
    setNewDescription("");
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProductId(p.id);
    setNewName(p.name);
    setNewPrice(String(p.selling_price));
    setNewCategory(p.category_name || SEED_CATEGORIES[0]?.name || "Customized T-Shirts");
    setNewType((p.product_type as "ready_made" | "custom_printing") || "ready_made");
    setNewMaterial(p.material || "100% Bio-Washed Combed Cotton");
    setNewImage(p.primary_image || (typeof p.images?.[0] === "string" ? p.images[0] : p.images?.[0]?.image_url) || "");
    setNewDescription(p.description || "");
    setIsModalOpen(true);
  };

  const handleToggleActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: !p.is_active } : p))
    );
  };

  const handleToggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_featured: !p.is_featured } : p))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this product from the catalog?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProductId) {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id !== editingProductId) return p;
          const updatedImage: string =
            newImage ||
            p.primary_image ||
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop";
          return {
            ...p,
            name: newName,
            selling_price: Number(newPrice),
            regular_price: Number(newPrice),
            category_name: newCategory,
            product_type: newType,
            material: newMaterial,
            description: newDescription,
            primary_image: updatedImage,
            images: [
              {
                id: `img-${Date.now()}`,
                product_id: p.id,
                image_url: updatedImage,
                display_order: 1,
                is_primary: true as const,
              },
            ],
          };
        })
      );
      setIsModalOpen(false);
      setEditingProductId(null);
      return;
    }

    const created: Product = {
      id: `p-${Date.now()}`,
      name: newName,
      slug: newName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: `RV-NEW-${Math.floor(100 + Math.random() * 900)}`,
      category_name: newCategory,
      short_description: newDescription.slice(0, 100),
      description: newDescription,
      regular_price: Number(newPrice),
      selling_price: Number(newPrice),
      product_type: newType,
      is_customizable: newType === "custom_printing",
      allow_customization: newType === "custom_printing",
      material: newMaterial,
      is_active: true,
      is_featured: false,
      is_bestseller: false,
      return_eligible: true,
      images: [
        {
          id: `img-${Date.now()}`,
          product_id: `p-${Date.now()}`,
          image_url: newImage || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
          display_order: 1,
          is_primary: true,
        },
      ],
      primary_image: newImage || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      available_sizes: ["S", "M", "L", "XL", "XXL"],
    };

    setProducts((prev) => [created, ...prev]);
    setIsModalOpen(false);

    // Reset
    setNewName("");
    setNewPrice("");
    setNewDescription("");
    setNewImage("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-[#6D1835] tracking-widest">
            Storefront Catalog
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
            Manage Products ({products.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-5 py-2.5 bg-[#6D1835] hover:bg-[#521327] text-white text-xs font-bold rounded-2xl shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-stone-400" />
        <input
          type="text"
          placeholder="Search by product title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs text-[#242124] focus:outline-none"
        />
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-stone-600 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Type</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4 text-center">Featured</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((p) => {
                const img = p.primary_image || p.images?.[0]?.image_url || "/placeholder.jpg";
                return (
                  <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Image & Title */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                        <Image src={img} alt={p.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-[#242124] line-clamp-1 max-w-xs">{p.name}</p>
                        <p className="text-[10px] text-stone-400 font-mono">{p.sku}</p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 text-stone-600 font-medium">
                      {p.category_name || "Apparel"}
                    </td>

                    {/* Type Badge */}
                    <td className="py-4 px-4">
                      {p.is_customizable ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/20 flex items-center gap-1 w-fit">
                          <Sparkles className="w-2.5 h-2.5" /> Custom POD
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700 w-fit">
                          Ready to Wear
                        </span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 font-bold text-[#242124]">
                      {formatPrice(p.selling_price || p.regular_price)}
                    </td>

                    {/* Featured toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(p.id)}
                        className={`w-5 h-5 rounded-md inline-flex items-center justify-center transition-colors ${
                          p.is_featured
                            ? "bg-amber-400 text-amber-950"
                            : "bg-stone-100 text-stone-300 hover:bg-stone-200"
                        }`}
                      >
                        ★
                      </button>
                    </td>

                    {/* Active toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(p.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                          p.is_active
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-stone-200 text-stone-500"
                        }`}
                      >
                        {p.is_active ? "Active" : "Draft"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(p)}
                          className="text-stone-400 hover:text-[#6D1835] transition-colors p-1"
                          title="Edit product & photo"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <h2 className="font-serif text-xl font-bold text-[#242124]">
                {editingProductId ? "Edit Catalog Product" : "Create New Catalog Product"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Signature Jaipur Handblock Cotton Polo"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="999"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                  >
                    {SEED_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Product Fulfillment Type *
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                  >
                    <option value="ready_made">Ready to Wear (Direct Cart/Checkout)</option>
                    <option value="custom_printing">Bespoke Custom POD (Proof Approval)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Fabric / Material
                  </label>
                  <input
                    type="text"
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Product Photo / Image"
                value={newImage}
                onChange={setNewImage}
                folder="products"
                aspectRatio="square"
                hint="Upload a high-res photo (JPG, PNG, WebP) directly from your device, or paste a CDN/Unsplash link."
              />

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Product Story & Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail the emotion, fabric touch, and occasion suitability..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#6D1835]"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-[#6D1835] hover:bg-[#521327] text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  {editingProductId ? "Save Changes" : "Publish to Catalog"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-3 px-4 border border-stone-300 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
