import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpLeft, Images } from "lucide-react";
import { safeFetchFresh } from "../../../lib/sanity";
import { categories, getCategory, sanityCategoryValues } from "../../../lib/brand";
import SiteNavbar from "../../../components/layout/SiteNavbar";
import Footer from "../../../components/layout/Footer";
import CategoryGallery from "../../../components/sections/CategoryGallery";
import type { Metadata } from "next";

export const revalidate = 0;

function resolveCategory(slug: string) {
  if (slug === "hanajer" || slug === "sawater") return getCategory("structures");
  return getCategory(slug);
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await props.params;
  const category = resolveCategory(slug);
  return category ? {
    title: `أعمال ${category.title}`,
    description: `${category.description} استعرض نماذج من أعمال سياج ونخيل المملكة.`,
  } : { title: "معرض الأعمال" };
}

export default async function FullGalleryPage(props: { params: Promise<{ category: string }> }) {
  const { category: slug } = await props.params;
  const category = resolveCategory(slug);
  if (!category) notFound();

  const values = sanityCategoryValues[category.slug] ?? [];
  const images = await safeFetchFresh<{ _id: string; title: string; imageUrl: string }[]>(`
    *[(_type == "gallery" || (_type == "project" && status == "published")) && category in $values] | order(_createdAt desc) {
      _id, "title": coalesce(title, ""), "imageUrl": coalesce(image.asset->url, mainImage.asset->url)
    }
  `, [], { values });

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#172638]" dir="rtl">
      <SiteNavbar />
      <main className="pb-24 pt-32 sm:pt-40">
        <section className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-[#e9e5dc] bg-white px-6 py-8 shadow-[0_14px_40px_rgba(7,24,39,0.05)] sm:px-10 sm:py-10">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f1e8] px-3.5 py-2 text-xs font-black text-[#9a7436]"><Images size={14} /> معرض {category.title}</span>
                <h1 className="mt-4 text-3xl font-black leading-tight text-[#102238] sm:text-4xl lg:text-5xl">صور وأعمال من {category.title}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#687587] sm:text-base">تصفّح صور ومشاريع {category.title} المنفذة، واختر الفكرة المناسبة لمشروعك.</p>
              </div>
              <span className="shrink-0 rounded-xl border border-[#e9e5dc] bg-[#fbfaf7] px-4 py-3 text-sm font-black text-[#526176]">{images.length} صورة</span>
            </div>
          </div>

          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-black text-[#172638] sm:text-2xl">معرض الصور</h2>
            <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-bold text-[#65758a] hover:text-[#071827]">كل المجالات <ArrowUpLeft size={17} /></Link>
          </div>

          {images.length > 0 ? (
            <div className="rounded-[1.5rem] border border-[#e9e5dc] bg-white p-3 sm:p-6 lg:p-8">
              <CategoryGallery images={images} categoryTitle={category.title} />
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-[#d8d4ca] bg-white/60 px-6 py-20 text-center sm:py-28">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9e5dc] text-[#65758a]"><Images size={23} /></span>
              <h2 className="mt-5 text-xl font-black">صور المشاريع قريبًا</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#677386]">نعمل على إضافة صور {category.title}. يمكنك استكشاف بقية مجالاتنا حتى ذلك الحين.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {categories.filter((item) => item.slug !== category.slug).map((item) => <Link key={item.slug} href={`/projects/${item.slug}`} className="rounded-full border border-[#dde2d5] px-4 py-2 text-xs font-bold text-[#51664b] hover:bg-[#e9ede2]">{item.title}</Link>)}
              </div>
            </div>
          )}

          <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#677386] hover:text-[#0b2036]"><ArrowRight size={17} /> العودة للرئيسية</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
