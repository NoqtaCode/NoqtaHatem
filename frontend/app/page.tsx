import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Check, Images, MessageCircle, MoveUpLeft, Phone, Sprout } from "lucide-react";
import SiteNavbar from "../components/layout/SiteNavbar";
import Footer from "../components/layout/Footer";
import { BRAND_NAME, CONTACT, categories, sanityCategoryValues } from "../lib/brand";
import { safeFetch, safeFetchFresh } from "../lib/sanity";

export const dynamic = "force-dynamic";

const categoryDetails: Record<string, { overview: string; points: string[] }> = {
  palms: {
    overview: "نساعدك على اختيار النخيل المناسب لمساحتك، وتنسيق الزراعة بما ينسجم مع طبيعة الموقع واستخدامه.",
    points: ["اختيار أنواع النخيل", "تجهيز الموقع للزراعة", "تنسيق النخيل ضمن المساحة"],
  },
  fences: {
    overview: "حلول لتحديد حدود المزرعة أو الأرض وتنظيمها، مع مراعاة طبيعة الموقع والغرض من التسوير.",
    points: ["تحديد احتياج الموقع", "اختيار حل التسوير المناسب", "تنسيق تنفيذ الشبوك"],
  },
  trees: {
    overview: "اختيار الأشجار وتوزيعها بطريقة تساعد على تكوين مساحات أكثر خضرة وظلالًا متوازنة.",
    points: ["اختيار الأشجار الملائمة", "توزيعها ضمن الموقع", "تنسيق المساحات المزروعة"],
  },
  olives: {
    overview: "زراعة أشجار الزيتون والعناية بتوزيعها بما يناسب أرضك ويضيف للمزرعة طابعًا طبيعيًا مميزًا.",
    points: ["اختيار مواقع الزراعة", "تنسيق أشجار الزيتون", "إرشادات العناية بالمزروعات"],
  },
  structures: {
    overview: "هناجر ومظلات تساعد على تجهيز المساحات للاستخدام، مع تنسيق الحل وفق احتياج المشروع وموقعه.",
    points: ["هناجر للمساحات المختلفة", "مظلات بحسب الاستخدام", "تنسيق احتياجات المشروع"],
  },
};

export default async function Home() {
  const [settings, firstPalmPhoto] = await Promise.all([
    safeFetchFresh<{ heroImageUrl?: string; categoryHomeImageUrls?: Record<string, string> }>(
      `*[_type == "settings"][0]{
        "heroImageUrl": heroImage.asset->url,
        "categoryHomeImageUrls": categoryHomeImages{
          "palms": palms.asset->url,
          "fences": fences.asset->url,
          "trees": trees.asset->url,
          "olives": olives.asset->url,
          "structures": structures.asset->url
        }
      }`,
      {},
    ),
    safeFetch<{ imageUrl?: string }>(
      `*[(_type == "gallery" || (_type == "project" && status == "published")) && category in $values] | order(_createdAt asc)[0]{"imageUrl": coalesce(image.asset->url, mainImage.asset->url)}`,
      {},
      { values: sanityCategoryValues.palms },
    ),
  ]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#172638]" dir="rtl">
          <SiteNavbar overlay />

      <main>
        <section id="home" className="relative isolate flex min-h-[720px] items-center justify-center overflow-hidden bg-[#071827] px-5 pb-16 pt-32 text-center text-white sm:min-h-[800px] sm:px-8 sm:pt-36 lg:min-h-[900px] lg:px-10">
          <Image src={settings?.heroImageUrl || categories[0].image} alt={categories[0].imageAlt} fill priority unoptimized sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-l from-[#071827]/95 via-[#071827]/65 to-[#071827]/20" />
          <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-[#071827]/75 to-transparent" />
          <div className="pointer-events-none absolute -right-36 top-40 -z-10 h-[32rem] w-[32rem] rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-16 top-60 -z-10 h-[22rem] w-[22rem] rounded-full border border-white/10" />
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mx-auto max-w-4xl">
              <div className="mx-auto mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-black text-[#f6dfb1] backdrop-blur sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-[#f2c46d]" />
                حلول زراعية وإنشائية في المملكة
              </div>
              <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.25] tracking-tight sm:text-6xl lg:text-[5.5rem]">
                أرضك تستحق،<br /><span className="text-[#f2c46d]">والتنفيذ علينا.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/80 sm:text-lg sm:leading-9">
                نخيل وأشجار، شبوك، زيتون، وهناجر ومظلات — حلول مدروسة وتنفيذ يعتني بكل تفصيلة في مشروعك.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/services" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#f2c46d] px-7 text-sm font-black text-[#071827] transition hover:-translate-y-0.5 hover:bg-white">اكتشف خدماتنا <ArrowLeft size={18} /></Link>
                <Link href="/contact" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/45 bg-white/10 px-7 text-sm font-black text-white backdrop-blur transition hover:bg-white/20">تواصل معنا <ArrowUpLeft size={18} /></Link>
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-white/25 pt-6 text-xs font-bold text-white/85 sm:text-sm">
                {["حلول مناسبة لموقعك", "اهتمام بالجودة", "تواصل مباشر"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check size={15} className="text-[#f2c46d]" />{item}</span>)}
              </div>
            </div>
          </div>
          <a href="#categories" className="absolute bottom-6 left-6 hidden items-center gap-3 text-xs font-bold text-white/75 transition hover:text-white lg:inline-flex"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40"><ArrowLeft size={17} /></span>تصفّح مجالاتنا</a>
        </section>

        <section className="px-5 pb-8 pt-12 sm:px-8 sm:pb-10 sm:pt-16 lg:px-10">
          <div className="mx-auto grid max-w-[1440px] gap-7 rounded-[2rem] border border-[#e9e5dc] bg-white px-6 py-8 shadow-[0_14px_40px_rgba(7,24,39,0.04)] sm:px-10 sm:py-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14 lg:px-14 lg:py-12">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-xs font-black tracking-[0.12em] text-[#a47d3c]"><Sprout size={16} /> نبذة عن أعمالنا</span>
              <h2 className="text-3xl font-black leading-tight text-[#102238] sm:text-4xl">نخدم مشروعك من الفكرة حتى التنفيذ</h2>
            </div>
            <div>
              <p className="text-sm leading-8 text-[#657286] sm:text-base sm:leading-9">في {BRAND_NAME} نجهّز المزارع والأراضي في الرياض ومناطق المملكة بحلول زراعية وإنشائية متكاملة. نساعدك في اختيار النخيل والأشجار والزيتون وتنسيق زراعتها، وننفذ الشبوك والهناجر والمظلات بما يلائم طبيعة الموقع واستخدامه. نبدأ بفهم احتياجك، ونرتب معك تفاصيل العمل بعناية لتكون خطوات المشروع واضحة من البداية.</p>
              <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#9a7436] transition hover:text-[#102238]">تعرّف علينا أكثر <ArrowUpLeft size={17} /></Link>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end">
              <div>
                <span className="mb-4 inline-flex items-center gap-2 text-xs font-black tracking-[0.16em] text-[#a47d3c]"><Sprout size={16} /> مجالاتنا</span>
                <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">كل مشروع له احتياجه،<br className="hidden sm:block" />وكل احتياج له حل.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-[#677386] sm:text-base sm:leading-8">اختر المجال الذي تبحث عنه، وتعرّف على خدماتنا وما نقدمه لمشروعك.</p>
            </div>
            <div id="categories" className="mx-auto flex max-w-6xl scroll-mt-28 flex-col gap-7 lg:gap-9">
              {categories.map((category, index) => (
                <article key={category.slug} className="overflow-hidden rounded-[1.8rem] border border-[#e9e5dc] bg-white shadow-[0_14px_40px_rgba(7,24,39,0.06)]">
                  <div className="grid lg:grid-cols-2">
                    <Link href={`/projects/${category.slug}`} aria-label={`اكتشف مجال ${category.title}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-[#26384a] lg:m-3 lg:aspect-auto lg:min-h-[620px]">
                    <Image src={settings?.categoryHomeImageUrls?.[category.slug] || (category.slug === "palms" ? firstPalmPhoto?.imageUrl : undefined) || category.image} alt={category.imageAlt} fill unoptimized sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/75 via-transparent to-transparent" />
                      <span className="absolute right-5 top-5 rounded-full border border-white/25 bg-[#071827]/50 px-4 py-2 text-xs font-black text-[#f6dfb1] backdrop-blur">0{index + 1} <span className="mx-1 text-white/50">/</span> {category.eyebrow}</span>
                      <span className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f2c46d] text-[#071827] transition group-hover:-translate-x-1"><ArrowLeft size={19} /></span>
                    </Link>
                    <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                      <span className="mb-4 text-xs font-black tracking-[0.14em] text-[#a47d3c]">مجالاتنا <span className="mx-1 text-[#c9c2b5]">/</span> 0{index + 1}</span>
                      <h3 className="text-3xl font-black leading-tight text-[#101b30] sm:text-4xl lg:text-5xl">{category.title}</h3>
                      <p className="mt-5 text-base leading-8 text-[#647184]">{categoryDetails[category.slug].overview}</p>
                      <div className="mt-7">
                        <h4 className="mb-3 text-sm font-black text-[#172638]">تفاصيل الخدمة</h4>
                        <ul className="grid grid-cols-2 gap-2 sm:gap-3">
                          {categoryDetails[category.slug].points.map((point, pointIndex) => <li key={point} className={`flex min-h-[54px] items-center gap-2 rounded-xl border border-[#edf0f3] bg-[#fbfcfd] px-2.5 py-2 sm:min-h-[64px] sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 ${pointIndex === 2 ? "hidden sm:flex" : ""}`}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#0b2036]/[0.06] text-[10px] font-black text-[#a47d3c] sm:h-9 sm:w-9 sm:rounded-xl sm:text-sm">0{pointIndex + 1}</span><span className="text-[11px] font-bold leading-5 text-[#526176] sm:text-sm sm:leading-6">{point}</span></li>)}
                        </ul>
                      </div>
                      <div className="mt-5 border-t border-[#e9e5dc] pt-4 sm:mt-8 sm:pt-6">
                        <p className="mb-4 hidden text-sm leading-7 text-[#7b8490] sm:block">{category.description}</p>
                        <div className="grid grid-cols-2 gap-2.5 sm:max-w-xl sm:gap-3">
                          <Link href="/contact" className="inline-flex min-h-[54px] items-center justify-center gap-1.5 rounded-xl bg-[#0b2036] px-2.5 text-xs font-black text-white transition hover:bg-[#172e46] sm:min-h-14 sm:gap-2 sm:rounded-full sm:px-5 sm:text-sm">استفسر الآن <ArrowUpLeft size={15} /></Link>
                          <Link href={`/projects/${category.slug}`} aria-label={`معرض صور ${category.title}`} className="inline-flex min-h-[54px] items-center justify-center gap-1.5 rounded-xl border border-[#dfe4e9] bg-white px-2.5 text-xs font-black text-[#172638] transition hover:border-[#a47d3c] hover:bg-[#fbfaf7] sm:min-h-14 sm:gap-2 sm:rounded-full sm:px-5 sm:text-sm"><Images size={15} className="shrink-0 text-[#a47d3c]" /> معرض الصور</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b2036] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
              <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#f2c46d]/10 blur-3xl" />
              <div className="relative mb-5">
                <span className="text-xs font-black tracking-[0.14em] text-[#f2c46d]">تواصل مباشر</span>
                <h3 className="mt-2 text-xl font-black sm:text-2xl">اختر طريقة التواصل المناسبة</h3>
                <p className="mt-2 text-sm leading-7 text-white/55">نحن جاهزون للرد على استفسارك ومناقشة تفاصيل مشروعك.</p>
              </div>
              <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="group flex min-h-36 flex-col justify-between rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.07] p-5 transition hover:-translate-y-1 hover:border-emerald-300/45 hover:bg-emerald-400/[0.12]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300"><MessageCircle size={22} /></span>
                  <span className="mt-5 block">
                    <span className="block text-sm font-black text-white">راسلنا على واتساب</span>
                    <span dir="ltr" className="mt-1 block text-sm font-bold text-emerald-200">{CONTACT.phoneDisplay}</span>
                    <span className="mt-4 flex items-center justify-between border-t border-emerald-200/10 pt-3 text-xs font-bold text-emerald-100/75">ابدأ المحادثة <ArrowUpLeft size={15} /></span>
                  </span>
                </a>
                <a href={`tel:${CONTACT.phoneLink}`} className="group flex min-h-36 flex-col justify-between rounded-2xl border border-[#f2c46d]/20 bg-[#f2c46d]/[0.06] p-5 transition hover:-translate-y-1 hover:border-[#f2c46d]/45 hover:bg-[#f2c46d]/[0.1]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2c46d]/15 text-[#f2c46d]"><Phone size={21} /></span>
                  <span className="mt-5 block">
                    <span className="block text-sm font-black text-white">اتصل بنا مباشرة</span>
                    <span dir="ltr" className="mt-1 block text-sm font-bold text-[#f6dfb1]">{CONTACT.phoneDisplay}</span>
                    <span className="mt-4 flex items-center justify-between border-t border-[#f2c46d]/10 pt-3 text-xs font-bold text-[#f6dfb1]/75">اتصال مباشر <ArrowUpLeft size={15} /></span>
                  </span>
                </a>
              </div>
            </div>
            <div className="max-w-2xl">
              <span className="mb-5 inline-block text-xs font-black tracking-[0.16em] text-[#f2c46d]">{BRAND_NAME}</span>
              <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">نخطط بعناية،<br /><span className="text-[#f2c46d]">وننفّذ بثقة.</span></h2>
              <p className="mt-6 text-base leading-8 text-white/70 sm:text-lg sm:leading-9">نفهم طبيعة الموقع واحتياجك، ثم نساعدك على اختيار الحل المناسب ونعتني بتفاصيل التنفيذ خطوة بخطوة.</p>
              <div className="my-8 grid gap-4 border-y border-white/15 py-6 sm:grid-cols-2">{["حلول تناسب طبيعة الموقع", "اختيارات مدروسة للمشروع", "اهتمام بجودة التنفيذ", "تواصل واضح طوال العمل"].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-bold text-white/85"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f2c46d]/15 text-[#f2c46d]"><Check size={15} /></span>{item}</div>)}</div>
              <Link href="/about" className="inline-flex items-center gap-3 text-sm font-black text-[#f2c46d] transition hover:text-white">تعرّف علينا <MoveUpLeft size={17} /></Link>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 rounded-[1.7rem] bg-[#e9e5dc] p-7 sm:p-12 lg:flex-row lg:items-center lg:p-16">
            <div className="max-w-3xl"><span className="mb-4 block text-xs font-black tracking-[0.16em] text-[#a47d3c]">خطوتك الأولى تبدأ هنا</span><h2 className="text-3xl font-black leading-tight sm:text-5xl">لديك مشروع؟<br className="hidden sm:block" />خلّنا نبدأ الحديث.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#677386] sm:text-base">أخبرنا عن احتياجك، وسنتواصل معك لمناقشة التفاصيل.</p></div>
            <Link href="/contact" className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#0b2036] px-8 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#172e46] sm:w-auto">تواصل معنا <ArrowUpLeft size={18} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
