import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Clock3, Mail, MapPin, MessageCircle, Phone, Sprout } from "lucide-react";
import SiteNavbar from "../../components/layout/SiteNavbar";
import Footer from "../../components/layout/Footer";
import { BRAND_NAME, CONTACT } from "../../lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع سياج ونخيل المملكة لمناقشة مشروعك الزراعي أو الإنشائي.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#172638]" dir="rtl">
      <SiteNavbar />
      <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
        <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#0b2036] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="absolute -left-24 -top-36 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#f2c46d]/10 blur-[100px]" />
          <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 text-xs font-black tracking-[0.16em] text-[#f2c46d]"><Sprout size={16} /> نبدأ من فكرتك</span>
              <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-6xl">كل مشروع كبير،<br /><span className="text-[#f2c46d]">يبدأ بسؤال.</span></h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg sm:leading-9">أخبرنا عن أرضك أو احتياجك، وسنساعدك على تحديد المجال والخطوة الأنسب لمشروعك.</p>
              <Link href="/services" className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#f2c46d] px-7 text-sm font-black text-[#0b2036] transition hover:bg-white">اختر مجال مشروعك <ArrowLeft size={18} /></Link>
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br from-white/[0.1] to-white/[0.035] p-6 shadow-2xl shadow-black/15 backdrop-blur sm:p-8">
              <div className="pointer-events-none absolute -left-12 -top-16 h-44 w-44 rounded-full bg-[#f2c46d]/10 blur-3xl" />
              <span className="text-xs font-bold tracking-[0.16em] text-[#f2c46d]">{BRAND_NAME}</span>
              <h2 className="mt-4 text-2xl font-black leading-snug sm:text-3xl">نحن جاهزون لسماع فكرتك.</h2>
              <p className="mt-4 text-sm leading-7 text-white/60">اختر الخدمة التي تهمك، وجهّز وصفًا بسيطًا للموقع والمساحة حتى نساعدك بصورة أوضح.</p>
              <div className="relative mt-7 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="group flex min-h-[90px] items-center gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.08] p-4 transition hover:-translate-y-0.5 hover:border-emerald-300/45 hover:bg-emerald-400/[0.13] sm:col-span-2">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300"><MessageCircle size={22} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-xs font-bold text-emerald-200">واتساب</span><span dir="ltr" className="mt-1 block text-lg font-black text-white">{CONTACT.phoneDisplay}</span><span className="mt-1 block text-xs text-white/50">راسلنا مباشرة</span></span>
                  <ArrowUpLeft size={18} className="shrink-0 text-emerald-200 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a href={`tel:${CONTACT.phoneLink}`} className="group flex min-h-[90px] items-center gap-3 rounded-2xl border border-white/10 bg-[#071827]/35 p-4 transition hover:-translate-y-0.5 hover:border-[#f2c46d]/40 hover:bg-white/[0.08]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f2c46d]/10 text-[#f2c46d]"><Phone size={19} /></span>
                  <span className="min-w-0"><span className="block text-xs font-bold text-white/55">اتصال مباشر</span><span dir="ltr" className="mt-1 block font-black text-white">{CONTACT.phoneDisplay}</span></span>
                </a>
                <a href={`mailto:${CONTACT.email}`} className="group flex min-h-[90px] items-center gap-3 rounded-2xl border border-white/10 bg-[#071827]/35 p-4 transition hover:-translate-y-0.5 hover:border-[#f2c46d]/40 hover:bg-white/[0.08]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f2c46d]/10 text-[#f2c46d]"><Mail size={19} /></span>
                  <span className="min-w-0"><span className="block text-xs font-bold text-white/55">البريد الإلكتروني</span><span className="mt-1 block break-all text-sm font-black text-white">{CONTACT.email}</span></span>
                </a>
                <a href="https://maps.google.com/?q=Riyadh,Saudi+Arabia" target="_blank" rel="noreferrer" className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#f2c46d]/35 hover:bg-white/[0.07]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2c46d]/10 text-[#f2c46d]"><MapPin size={18} /></span>
                  <span><span className="block text-[11px] font-bold text-white/50">موقعنا</span><span className="mt-1 block text-sm font-bold text-white">الرياض، المملكة العربية السعودية</span></span>
                </a>
                <div className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2c46d]/10 text-[#f2c46d]"><Clock3 size={18} /></span>
                  <span><span className="block text-[11px] font-bold text-white/50">ساعات التواصل</span><span className="mt-1 block text-sm font-bold text-white">متاحون على مدار 24 ساعة</span></span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-8 flex flex-col justify-between gap-4 text-sm text-[#72796c] sm:flex-row sm:items-center">
          <span>هل تود رؤية المجالات أولًا؟</span>
          <Link href="/services" className="inline-flex items-center gap-2 font-black text-[#26384a] hover:text-[#738093]">تصفّح الخدمات <ArrowUpLeft size={17} /></Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
