import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Check, Fence, Leaf, Sprout, Sun, Trees, Warehouse } from "lucide-react";
import SiteNavbar from "../../components/layout/SiteNavbar";
import Footer from "../../components/layout/Footer";
import { categories } from "../../lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدماتنا",
  description: "خدمات سياج ونخيل المملكة في زراعة النخيل والأشجار والزيتون، تركيب الشبوك، وتنفيذ الهناجر والسواتر.",
};

const icons = [Sprout, Fence, Trees, Leaf, Warehouse];
const services = [
  {
    intro: "نختار النخيل المناسب لطبيعة أرضك، ونتولى تجهيزه وزراعته بعناية حتى ينسجم مع المساحة والمشهد.",
    includes: ["اختيار أنواع النخيل", "تجهيز الموقع والتربة", "التوريد والغرس"],
  },
  {
    intro: "ننفذ حلول تسوير عملية تساعد على حماية المزارع والأراضي، مع مراعاة حدود الموقع وطبيعة استخدامه.",
    includes: ["معاينة حدود الموقع", "اختيار نوع الشبك", "تركيب وتثبيت الشبوك"],
  },
  {
    intro: "ننسق الأشجار بما يناسب بيئة الموقع، لنمنح المساحة ظلالًا وتوازنًا وجمالًا يدوم.",
    includes: ["ترشيح الأنواع المناسبة", "توزيع الأشجار", "الزراعة والتنسيق"],
  },
  {
    intro: "نخطط لزراعة الزيتون بطريقة منظمة، من توزيع الصفوف إلى اختيار الشتلات المناسبة لمساحتك.",
    includes: ["تخطيط صفوف الزراعة", "اختيار الشتلات", "الغرس والعناية"],
  },
  {
    intro: "نجهز الهناجر والسواتر وفق الغرض والمساحة، مع حلول عملية للاستخدام الزراعي والتخزين والحماية.",
    includes: ["تحديد المساحة والاستخدام", "تجهيز الهيكل والتغطية", "تنفيذ وتركيب"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#172638]" dir="rtl">
      <SiteNavbar />
      <main className="pb-24 pt-32 sm:pt-40">
        <section className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="mb-10 grid gap-8 rounded-[2rem] bg-[#0b2036] px-6 py-10 text-white sm:px-10 sm:py-12 md:grid-cols-[1.1fr_0.9fr] md:items-end lg:px-14 lg:py-16">
            <div>
              <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-black text-[#f2c46d]">من التخطيط إلى التنفيذ</span>
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">خدمات عملية،<br /><span className="text-[#f2c46d]">ونتيجة تليق بمشروعك.</span></h1>
            </div>
            <div className="max-w-xl md:mr-auto">
              <p className="text-base leading-8 text-white/70 sm:text-lg sm:leading-9">اختر الخدمة التي تحتاجها، وتعرّف على ما يشمله التنفيذ. ننسق معك التفاصيل ونقترح الحل المناسب لموقعك.</p>
              <Link href="/contact" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f2c46d] px-6 text-sm font-black text-[#0b2036] transition hover:bg-white">ناقش مشروعك <ArrowUpLeft size={17} /></Link>
            </div>
          </div>

          <div className="mx-auto grid max-w-6xl gap-4 sm:gap-5 md:grid-cols-2">
            {categories.map((category, index) => {
              const Icon = icons[index];
              const service = services[index];
              return (
                <article key={category.slug} className={`group rounded-[1.5rem] border border-[#e9e5dc] bg-white p-5 shadow-[0_10px_28px_rgba(7,24,39,0.045)] transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(7,24,39,0.09)] sm:p-6 ${index === categories.length - 1 ? "md:col-span-2" : ""}`}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f2c46d]/20 text-[#987239] transition group-hover:bg-[#f2c46d]"><Icon size={23} strokeWidth={1.8} /></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h2 className="text-xl font-black text-[#102238] sm:text-2xl">{category.title}</h2>
                        <span className="text-[11px] font-black text-[#a47d3c]">خدمة 0{index + 1}</span>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-[#677386]">{service.intro}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-[#edf0f3] pt-4">
                    {service.includes.map((item) => <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-[#f7f5ef] px-3 py-2 text-[11px] font-bold text-[#526176] sm:text-xs"><Check size={13} className="shrink-0 text-[#a47d3c]" />{item}</span>)}
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-[#87909d]">حل يناسب احتياج موقعك</span>
                    <Link href={`/contact?service=${category.slug}`} className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-[#0b2036] px-4 text-xs font-black text-white transition hover:bg-[#182d43]">اطلب الخدمة <ArrowLeft size={15} /></Link>
                  </div>
                </article>
              );
            })}
            <div className="flex flex-col justify-between gap-7 rounded-[2rem] bg-[#e9e5dc] p-7 sm:flex-row sm:items-center sm:p-10 md:col-span-2">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-black text-[#9a7436]"><Sun size={17} /> عندك طلب مختلف؟</span>
                <h2 className="mt-3 text-2xl font-black text-[#102238] sm:text-3xl">خلّنا نساعدك تختار الحل المناسب.</h2>
                <p className="mt-2 text-sm leading-7 text-[#677386]">تواصل معنا واشرح احتياجك، ونرتب معك الخطوات التالية.</p>
              </div>
              <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-[#0b2036] px-6 text-sm font-black text-white transition hover:bg-[#182d43]">تواصل معنا <ArrowLeft size={17} /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
