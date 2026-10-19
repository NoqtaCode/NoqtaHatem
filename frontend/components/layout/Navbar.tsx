"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpLeft, Menu } from "lucide-react";
import { categories, BRAND_NAME } from "../../lib/brand";

export default function Navbar({ overlay = false, logoUrl }: { overlay?: boolean; logoUrl?: string }) {
  const brandLogo = logoUrl || "/site-logo.png";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 transition-all sm:px-6 sm:pt-4 lg:px-10" dir="rtl">
      <nav className={`mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 text-white transition-all duration-300 sm:px-6 ${overlay ? "rounded-2xl border border-white/30 bg-[#071827]/60 shadow-xl shadow-black/15 backdrop-blur-lg" : "rounded-2xl border border-white/15 bg-[#071827]/90 shadow-2xl shadow-black/10 backdrop-blur-xl"}`}>
        <Link href="/" className="group flex items-center gap-3" aria-label={BRAND_NAME}>
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden bg-transparent sm:h-16 sm:w-16">
            <Image src={brandLogo} alt="شعار سياج ونخيل المملكة" fill unoptimized sizes="64px" className="object-contain" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-black tracking-tight sm:text-xl">سياج ونخيل</span>
            <span className="mt-1 block text-[11px] font-bold tracking-[0.24em] text-[#f2c46d]">المملكة</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-semibold text-white/75 lg:flex">
          <Link className="transition hover:text-[#f6dfb1]" href="/#home">الرئيسية</Link>
          <Link className="transition hover:text-[#f6dfb1]" href="/#categories">مجالاتنا</Link>
          <Link className="transition hover:text-[#f6dfb1]" href="/about">من نحن</Link>
          <Link className="transition hover:text-[#f6dfb1]" href="/gallery">دليل أرضك</Link>
          <Link className="transition hover:text-[#f6dfb1]" href="/services">خدماتنا</Link>
        </div>

        <div className="hidden lg:block">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#f2c46d] px-5 py-3 text-sm font-black text-[#071827] transition hover:bg-white">
            ابدأ مشروعك <ArrowUpLeft size={17} />
          </Link>
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 text-white"
            aria-label={menuOpen ? "إغلاق قائمة التنقل" : "فتح قائمة التنقل"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu size={22} />
          </button>
        </div>
        {menuOpen && createPortal(
          <div id="mobile-navigation" className="fixed left-3 right-3 top-24 z-[100] max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#0b2036] p-3 text-white shadow-2xl sm:left-auto sm:right-6 sm:top-28 sm:w-[min(calc(100vw-3rem),22rem)] lg:hidden">
            <Link href="/#home" className="block rounded-xl px-4 py-3 font-bold hover:bg-white/5">الرئيسية</Link>
            <div className="grid grid-cols-2 gap-1 px-2 py-2">
              {categories.map((category) => (
                <Link key={category.slug} href={`/projects/${category.slug}`} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-white/75 hover:bg-white/5 hover:text-white">{category.title}</Link>
              ))}
            </div>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 font-bold hover:bg-white/5">من نحن</Link>
            <Link href="/gallery" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 font-bold hover:bg-white/5">دليل أرضك</Link>
            <Link href="/services" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 font-bold hover:bg-white/5">خدماتنا</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="mt-2 block rounded-xl bg-[#f2c46d] px-4 py-3 text-center font-black text-[#071827]">تواصل معنا</Link>
          </div>,
          document.body,
        )}
      </nav>
    </header>
  );
}
