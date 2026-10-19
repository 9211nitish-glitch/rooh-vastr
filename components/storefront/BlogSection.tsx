"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/types";

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
            Latest from Our Blog
          </h2>
          <p className="text-xs text-gray-500 mt-1">Gift ideas, inspiration and more.</p>
        </div>
        <Link
          href="/blog"
          className="text-xs font-bold text-[#5B132B] hover:underline flex items-center gap-1 group"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.slice(0, 3).map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug || blog.id}`}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#F0E6DD] hover:shadow-md transition-all"
          >
            {/* Blog Cover Image */}
            <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF4EE]">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Blog Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#FDEEE9] text-[#5B132B] mb-2">
                  {blog.category}
                </span>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#242124] group-hover:text-[#5B132B] transition-colors line-clamp-2 leading-snug">
                  {blog.title}
                </h3>
              </div>

              <div className="text-[11px] text-gray-400 font-medium pt-2 border-t border-gray-100 flex items-center justify-between">
                <span>{blog.date}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
