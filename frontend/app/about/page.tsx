import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Fence, Leaf, Sprout, Trees, Warehouse } from "lucide-react";
import SiteNavbar from "../../components/layout/SiteNavbar";
import Footer from "../../components/layout/Footer";
import { BRAND_NAME } from "../../lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرّف على سياج ونخيل المملكة وحلولنا للنخيل والأشجار والزيتون والشبوك والهناجر والمظلات.",
};

const services = [
  { title: "الشبوك", detail: "حماية وتنظيم الأراضي", Icon: Fence },
  { title: "النخيل", detail: "توريد وزراعة بعناية", Icon: Sprout },
  { title: "الأشجار", detail: "مساحات أكثر خضرة", Icon: Trees },
  { title: "الزيتون", detail: "زراعة تضيف قيمة", Icon: Leaf },
  { title: "الهناجر والمظلات", detail: "حلول عملية للموقع", Icon: Warehouse },
];

const principles = [
  ["نبدأ بالاستماع", "نفهم طبيعة الأرض واستخدامك للموقع قبل اقتراح الحل."],
  ["نختار بعناية", "مواد مناسبة للمكان، وتفاصيل تراعي الاستدامة وسهولة الاستخدام."],
  ["ننفذ بإتقان", "متابعة واضحة واهتمام بجودة كل مرحلة من المشروع."],
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#172638]" dir="rtl">
      <SiteNavbar />
      <main className="pb-20 pt-32 sm:pt-40">
        <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <div className="overflow-hidden rounded-[2rem] border border-[#e8e2d6] bg-white shadow-[0_24px_80px_-48px_rgba(23,38,56,0.38)] sm:rounded-[2.5rem]">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
              <div className="flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e8e2d6] bg-[#f7f5ef] px-4 py-2 text-xs font-black text-[#97743d]">
                  <Sprout size={16} /> من نحن
                </span>
                <h1 className="mt-6 text-3xl font-black leading-[1.35] tracking-tight sm:text-5xl sm:leading-[1.3]">
                  نبني معك مساحةً
                  <span className="block text-[#a47d3c]">أجمل وأكثر نفعًا.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-8 text-[#667487] sm:text-base sm:leading-9">
                  {BRAND_NAME} مؤسسة سعودية تعمل على تجهيز المزارع والأراضي بحلول متكاملة؛ من الشبوك وتنظيم الموقع، إلى توريد وزراعة النخيل والأشجار والزيتون، وتنفيذ الهناجر والمظلات. نحرص على فهم احتياجك أولًا، ثم ننسق تفاصيل العمل ونمضي معك خطوة بخطوة نحو نتيجة تناسب أرضك ومشروعك.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-[#35475b] sm:text-sm">
                  {["اهتمام بالتفاصيل", "حلول تناسب موقعك", "تنفيذ منظم"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2"><Check size={16} className="text-[#a47d3c]" />{item}</span>
                  ))}
                </div>
                <Link href="/contact" className="mt-8 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-[#0b2036] px-6 text-sm font-black text-white transition hover:bg-[#172e46]">
                  تحدث معنا عن مشروعك <ArrowLeft size={17} />
                </Link>
              </div>

              <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-[#f2f0e9] p-3 sm:min-h-[420px] sm:p-5 lg:min-h-full lg:p-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_15%,rgba(164,125,60,0.12),transparent_45%)]" />
                <Image
                  src="/about-collage.jpg"
                  alt="مشاريع سياج ونخيل المملكة: الشبوك والنخيل والزيتون والهناجر والمظلات"
                  width={1008}
                  height={722}
                  priority
                  className="relative h-auto max-h-[560px] w-full rounded-[1.5rem] object-contain sm:rounded-[2rem]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute bottom-6 right-6 hidden rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-black text-[#344531] shadow-sm backdrop-blur sm:block lg:bottom-9 lg:right-9">
                  من الزراعة إلى الإنشاء… نعتني بكل خطوة
                </div>
              </div>
            </div>

            <div className="border-t border-[#e9e5dc] bg-[#fbfaf7] px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
              <div className="mb-5 text-center sm:mb-6">
                <span className="text-xs font-black tracking-wide text-[#97743d]">مجالاتنا</span>
                <h2 className="mt-1 text-xl font-black sm:text-2xl">حلول متكاملة لأرضك</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
                {services.map(({ title, detail, Icon }) => (
                  <article key={title} className="flex min-h-[118px] flex-col items-center justify-center rounded-2xl border border-[#e9e5dc] bg-white px-3 py-4 text-center transition hover:-translate-y-0.5 hover:border-[#d8c7a8] hover:shadow-md sm:min-h-[132px]">
                    <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#f4eddd] text-[#97743d]"><Icon size={20} strokeWidth={1.8} /></span>
                    <h3 className="text-sm font-black text-[#172638]">{title}</h3>
                    <p className="mt-1 text-[11px] leading-5 text-[#748093]">{detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-[1440px] px-5 sm:mt-20 sm:px-8 lg:px-10">
          <div className="mb-7 max-w-2xl sm:mb-9">
            <span className="mb-3 block text-xs font-black tracking-[0.16em] text-[#97743d]">كيف نعمل</span>
            <h2 className="text-2xl font-black sm:text-4xl">من الفكرة إلى أرضٍ تنبض بالحياة.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {principles.map(([title, description], index) => (
              <article key={title} className="rounded-[1.5rem] border border-[#e9e5dc] bg-white p-5 sm:p-7">
                <span className="mb-5 block text-xs font-black tracking-[0.18em] text-[#97743d]">0{index + 1}</span>
                <h3 className="text-lg font-black sm:text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#677386]">{description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
