import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Check, Compass, Leaf, MapPinned, Sprout } from "lucide-react";
import SiteNavbar from "../../components/layout/SiteNavbar";
import Footer from "../../components/layout/Footer";
import { categories } from "../../lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دليل تجهيز أرضك",
  description: "خطوات وأفكار تساعدك على اختيار حلول النخيل والأشجار والزيتون والشبوك والهناجر والسواتر المناسبة لموقعك.",
};

const steps = [
  { title: "ابدأ باحتياجك", description: "حدد استخدام الأرض وما تريد تحقيقه فيها، سواء كانت مزرعة أو استراحة أو موقعًا تجاريًا.", Icon: Compass },
  { title: "افهم طبيعة الموقع", description: "المساحة والتربة وطريقة الاستخدام تساعد في اختيار الترتيب والخدمات الملائمة.", Icon: MapPinned },
  { title: "نسّق الحلول", description: "اجمع بين الزراعة والتسوير والهناجر والسواتر بما يخدم مشروعك ويجعل المساحة أكثر فائدة.", Icon: Sprout },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#172638]" dir="rtl">
      <SiteNavbar />
      <main className="pb-24 pt-32 sm:pt-40">
        <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0b2036] px-6 py-10 text-white sm:rounded-[2.5rem] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="pointer-events-none absolute -left-20 -top-32 h-96 w-96 rounded-full border border-white/[0.08]" />
            <div className="pointer-events-none absolute -left-4 -top-16 h-64 w-64 rounded-full border border-white/[0.08]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-14">
              <div>
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-black text-[#f2c46d]"><Leaf size={16} /> دليل تجهيز أرضك</span>
                <h1 className="max-w-3xl text-3xl font-black leading-[1.35] sm:text-5xl sm:leading-[1.25] lg:text-6xl">كل أرض لها فرصة،<br /><span className="text-[#f2c46d]">والبداية اختيار مناسب.</span></h1>
              </div>
              <div>
                <p className="text-sm leading-8 text-white/70 sm:text-base sm:leading-9">بدل الحيرة بين الخيارات، ابدأ من احتياجك وطبيعة موقعك. نساعدك في ترتيب خدمات الزراعة والتسوير والإنشاء لتكوين مساحة عملية وجميلة في الرياض ومختلف مناطق المملكة.</p>
                <Link href="/contact" className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#f2c46d] px-6 text-sm font-black text-[#0b2036] transition hover:bg-white">ناقش مشروعك معنا <ArrowLeft size={17} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-[1440px] px-5 sm:mt-20 sm:px-8 lg:px-10">
          <div className="mb-7 sm:mb-9">
            <span className="mb-3 block text-xs font-black tracking-[0.14em] text-[#a47d3c]">من الفكرة إلى الترتيب</span>
            <h2 className="text-2xl font-black sm:text-4xl">خطوات بسيطة تساعدك تبدأ</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map(({ title, description, Icon }, index) => (
              <article key={title} className="relative overflow-hidden rounded-[1.7rem] border border-[#e9e5dc] bg-white p-6 shadow-[0_14px_40px_rgba(7,24,39,0.035)] sm:p-8">
                <span className="absolute left-5 top-4 text-5xl font-black text-[#f4f1e9]">0{index + 1}</span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4eddd] text-[#97743d]"><Icon size={22} /></span>
                <h3 className="relative mt-6 text-lg font-black sm:text-xl">{title}</h3>
                <p className="relative mt-2 text-sm leading-7 text-[#6b7889]">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-[1440px] px-5 sm:mt-20 sm:px-8 lg:px-10">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:mb-9 sm:flex-row sm:items-end">
            <div>
              <span className="mb-3 block text-xs font-black tracking-[0.14em] text-[#a47d3c]">خدماتنا في مكان واحد</span>
              <h2 className="text-2xl font-black sm:text-4xl">اختر المجال الذي تحتاجه</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[#6b7889]">تعرّف على تفاصيل كل مجال، أو تواصل معنا لنساعدك في جمع الحلول المناسبة لموقعك.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category, index) => (
              <Link key={category.slug} href={`/projects/${category.slug}`} className="group flex min-h-[190px] flex-col rounded-[1.5rem] border border-[#e9e5dc] bg-white p-5 transition hover:-translate-y-1 hover:border-[#d5c39f] hover:shadow-lg sm:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4eddd] text-[#97743d]"><Sprout size={19} /></span>
                <span className="mt-5 text-[10px] font-black tracking-[0.14em] text-[#a47d3c]">0{index + 1} / {category.eyebrow}</span>
                <h3 className="mt-1 text-lg font-black">{category.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-6 text-[#758193]">{category.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-black text-[#172638] transition group-hover:text-[#a47d3c]">تفاصيل المجال <ArrowUpLeft size={15} /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-[1440px] px-5 sm:mt-20 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 rounded-[1.7rem] bg-[#e9e5dc] p-6 sm:flex-row sm:items-center sm:p-10">
            <div className="flex gap-4">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#a47d3c] sm:flex"><Check size={21} /></span>
              <div><h2 className="text-xl font-black sm:text-2xl">كل مشروع يبدأ بحوار واضح.</h2><p className="mt-2 text-sm leading-7 text-[#677386]">أخبرنا عن أرضك واحتياجك، ونرتب معك الخطوة المناسبة.</p></div>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b2036] px-6 text-sm font-black text-white transition hover:bg-[#172e46]">تواصل معنا <ArrowLeft size={17} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
