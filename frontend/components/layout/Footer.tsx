import Link from "next/link";
import Image from "next/image";
import { ArrowUpLeft, Code2, Mail, MessageCircle, Phone } from "lucide-react";
import { BRAND_DESCRIPTION, BRAND_NAME, CONTACT, categories } from "../../lib/brand";

export default function Footer() {
  return (
    <footer className="bg-[#071827] text-white" dir="rtl">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1.15fr] lg:gap-12 lg:py-20">
        <div className="max-w-md">
          <Link href="/" className="mb-6 inline-flex items-center gap-3">
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
              <Image src="/site-logo.png" alt="شعار سياج ونخيل المملكة" fill unoptimized sizes="56px" className="object-contain" />
            </span>
            <span className="text-xl font-black">{BRAND_NAME}</span>
          </Link>
          <p className="mb-7 text-sm leading-8 text-white/55">{BRAND_DESCRIPTION}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-[#f2c46d] transition hover:text-white">
            تحدّث معنا عن مشروعك <ArrowUpLeft size={17} />
          </Link>
        </div>

        <div>
          <h2 className="mb-5 text-sm font-black text-white">مجالاتنا</h2>
          <ul className="space-y-3 text-sm text-white/55">
            {categories.map((category) => (
              <li key={category.slug}><Link href={`/projects/${category.slug}`} className="transition hover:text-[#f2c46d]">{category.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 text-sm font-black text-white">روابط سريعة</h2>
          <ul className="space-y-3 text-sm text-white/55">
            <li><Link href="/about" className="transition hover:text-[#f2c46d]">قصتنا</Link></li>
            <li><Link href="/services" className="transition hover:text-[#f2c46d]">الخدمات</Link></li>
            <li><Link href="/gallery" className="transition hover:text-[#f2c46d]">دليل تجهيز أرضك</Link></li>
            <li><Link href="/contact" className="transition hover:text-[#f2c46d]">تواصل معنا</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-5 text-sm font-black text-white">تواصل معنا</h2>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a href={`tel:${CONTACT.phoneLink}`} className="inline-flex items-center gap-3 transition hover:text-[#f2c46d]"><Phone size={16} /> <span dir="ltr">{CONTACT.phoneDisplay}</span></a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-3 transition hover:text-[#f2c46d]"><Mail size={16} /> {CONTACT.email}</a></li>
            <li><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#f2c46d] px-4 py-3 font-black text-[#0b2036] transition hover:bg-white"><MessageCircle size={17} /> راسلنا واتساب</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 text-xs text-white/40 sm:flex-row sm:items-center">
          <span className="sm:flex-1">© {new Date().getFullYear()} {BRAND_NAME}. جميع الحقوق محفوظة.</span>
          <span className="sm:flex-1 sm:text-center">من الأرض… نصنع أثرًا يدوم.</span>
          <a
            href="https://wa.me/967737543563"
            target="_blank"
            rel="noreferrer"
            aria-label="تواصل مع نقطة كود عبر واتساب"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-950/50 px-3 py-2 text-emerald-300 transition hover:border-emerald-300/50 hover:bg-emerald-900/60 sm:flex-1 sm:justify-end"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1.5 text-sm font-black tracking-tight text-white">
              <Code2 size={16} className="text-amber-400" />
              <span>Noqta<span className="text-amber-400">Code</span></span>
            </span>
            <span className="font-bold">تطوير وتصميم</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
