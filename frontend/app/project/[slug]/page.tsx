import { safeFetchFresh } from "../../../lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpLeft, Sprout } from "lucide-react";
import SiteNavbar from "../../../components/layout/SiteNavbar";
import Footer from "../../../components/layout/Footer";
import type { Metadata } from "next";

async function getProject(slug: string) {
  return safeFetchFresh<any>(`
    *[_type == "project" && slug.current == $slug && category in ["palms", "fences", "trees", "olives", "structures"]][0] {
      title, description, category, "imageUrl": mainImage.asset->url, _createdAt
    }
  `, null, { slug });
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProject(decodeURIComponent(slug));
  if (!project) return { title: "المشروع غير موجود" };
  return {
    title: project.title,
    description: project.description || `تعرّف على تفاصيل مشروع ${project.title}.`,
    openGraph: {
      title: project.title,
      description: project.description || `تفاصيل مشروع ${project.title}`,
      ...(project.imageUrl ? { images: [{ url: project.imageUrl, alt: project.title }] } : {}),
    },
  };
}

export default async function ProjectDetails(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const project = await getProject(decodeURIComponent(slug));
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#172638]" dir="rtl">
      <SiteNavbar />
      <main className="mx-auto max-w-[1200px] px-5 pb-24 pt-32 sm:px-10 sm:pt-40">
        <Link href="/gallery" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#677386] hover:text-[#26384a]"><ArrowLeft size={17} /> العودة إلى دليل المجالات</Link>
        <article className="overflow-hidden rounded-[2rem] border border-[#e9e5dc] bg-white">
          {project.imageUrl ? (
            <div className="relative min-h-[400px] bg-[#e9e5dc] sm:min-h-[620px]">
              <Image src={project.imageUrl} alt={project.title} fill unoptimized priority sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
                <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-[#f2c46d]"><Sprout size={15} /> من أعمال سياج ونخيل المملكة</span>
                <h1 className="max-w-3xl text-3xl font-black sm:text-5xl">{project.title}</h1>
                {project._createdAt && <p className="mt-3 text-xs font-bold text-white/65">أضيف في {new Date(project._createdAt).toLocaleDateString("ar-SA")}</p>}
              </div>
            </div>
          ) : (
            <div className="px-6 pt-10 sm:px-10 sm:pt-14"><h1 className="text-3xl font-black sm:text-5xl">{project.title}</h1></div>
          )}

          <div className="p-6 sm:p-10 lg:p-14">
            <div className="max-w-3xl">
              <span className="text-xs font-black tracking-[0.16em] text-[#738093]">تفاصيل المشروع</span>
              <p className="mt-4 whitespace-pre-line text-base leading-8 text-[#677386] sm:text-lg sm:leading-9">{project.description || "تفاصيل إضافية لهذا المشروع ستضاف قريبًا."}</p>
            </div>
            <div className="mt-10 flex flex-col justify-between gap-5 rounded-[1.5rem] bg-[#e9e5dc] p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <h2 className="text-xl font-black">هل لديك مشروع مشابه؟</h2>
                <p className="mt-2 text-sm text-[#677386]">اختر مجالًا أو تواصل معنا لمناقشة احتياجك.</p>
              </div>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b2036] px-6 text-sm font-black text-white transition hover:bg-[#172e46]">ابدأ مشروعك <ArrowUpLeft size={17} /></Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
