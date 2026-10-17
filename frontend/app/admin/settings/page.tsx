import { safeFetchFresh, type SiteSettings } from "../../../lib/sanity";
import { updateGeneralSettings, updateAccountSettings } from "../../../actions/settings";
import SettingsSubmitButton from "../../../components/admin/SettingsSubmitButton"; 
import { Globe, Phone, ShieldCheck, ImageIcon, Key, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import CategoryImagePicker, { type CategoryImageOption } from "../../../components/admin/CategoryImagePicker";
import { categories, sanityCategoryValues } from "../../../lib/brand";

export const revalidate = 0;

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const status = await searchParams;
  const [settings, availableImages] = await Promise.all([safeFetchFresh<SiteSettings>(`*[_type == "settings"][0]{
    ..., 
    "logoImageUrl": logo.asset->url,
    "heroImageUrl": heroImage.asset->url, 
    "aboutImageUrl": aboutImage.asset->url,
    "categoryHomeImageUrls": categoryHomeImages{
      "palms": palms.asset->url, "fences": fences.asset->url, "trees": trees.asset->url,
      "olives": olives.asset->url, "structures": structures.asset->url
    }
  }`, {}), safeFetchFresh<CategoryImageOption[]>(`*[_type == "gallery" || (_type == "project" && status == "published")] | order(_createdAt desc) {
    "assetId": coalesce(image.asset._ref, mainImage.asset._ref),
    "url": coalesce(image.asset->url, mainImage.asset->url),
    "title": coalesce(title, "صورة من المعرض"),
    category
  }[defined(assetId) && defined(url)]`, [])]);
  const imageOptionsByCategory = Object.fromEntries(categories.map((category) => [
    category.slug,
    availableImages.filter((image: CategoryImageOption & { category?: string }) => sanityCategoryValues[category.slug]?.includes(image.category || "")),
  ])) as Record<string, CategoryImageOption[]>;

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4" dir="rtl">
      <div className="mb-12 pt-8 text-right font-sans">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800">إعدادات المنصة</h1>
        <p className="text-slate-500 mt-2">تحديث هوية الموقع، بيانات التواصل، وحماية الحساب</p>
        {status.saved === "1" && <p role="status" className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-bold text-emerald-800">تم حفظ الإعدادات والصور. حدّث الصفحة الرئيسية لمشاهدة التغييرات.</p>}
        {status.error === "1" && <p role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-bold text-red-700">تعذر حفظ الصورة. تحقق من اتصال Sanity وصلاحية الرفع ثم حاول مرة أخرى.</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* العمود الأيمن: البيانات والصور (Form 1) */}
        <div className="lg:col-span-2 space-y-10">
          <form action={async (formData) => {
            'use server';
            const result = await updateGeneralSettings(formData);
            redirect(result.success ? "/admin/settings?saved=1" : "/admin/settings?error=1");
          }} className="space-y-10">
            
            {/* نصوص الواجهة */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2 mb-4">
                <Globe size={22} className="text-blue-500" /> نصوص الواجهة والصور
              </h2>
              <div className="space-y-4 font-sans">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 mr-2 uppercase">اسم الموقع</label>
                  <input name="siteName" defaultValue={settings.siteName || "مؤسسة للمقاولات العامة"} className="w-full border-2 border-slate-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-slate-50 transition" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 mr-2 uppercase">العنوان الرئيسي</label>
                  <input name="heroTitle" placeholder={settings.heroTitle || "إتقان في العمل.."} className="w-full border-2 border-slate-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-slate-50 transition" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 mr-2 uppercase">العنوان الفرعي (الأصفر)</label>
                  <input name="heroSubTitle" placeholder={settings.heroSubTitle || "وفخامة في التنفيذ"} className="w-full border-2 border-slate-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-slate-50 transition" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-400 mr-2 uppercase">الوصف التعريفي</label>
                   <textarea name="heroDescription" rows={3} placeholder={settings.heroDescription || "اكتب وصفاً جذاباً ..."} className="w-full border-2 border-slate-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-slate-50 transition"></textarea>
                </div>
              </div>  

              {/* صور الهوية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2"><ImageIcon size={14}/> شعار المؤسسة (الهيدر والتبويبة)</label>
                  <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    {settings.logoImageUrl ? (
                      <Image src={settings.logoImageUrl} alt="الشعار الحالي للمؤسسة" fill unoptimized className="object-contain p-4" />
                    ) : (
                      <span className="text-sm font-bold text-slate-400">لم يُرفع شعار بعد</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">ارفع صورة الشعار بصيغة PNG أو SVG أو WebP.</p>
                  <input type="file" name="logo" accept="image/png,image/svg+xml,image/webp,image/jpeg" className="w-full border-2 border-dashed border-slate-100 rounded-2xl p-3 bg-slate-50 text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2"> <ImageIcon size={14}/> خلفية الواجهة الرئيسية كاملة </label>
                  <div className="relative h-48 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    {settings.heroImageUrl ? (
                      <Image src={settings.heroImageUrl} alt="خلفية الواجهة الحالية" fill unoptimized className="object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center text-sm font-bold text-slate-400">تُستخدم الصورة الافتراضية حاليًا</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">ستظهر الصورة بعد الحفظ كخلفية الواجهة الرئيسية.</p>
                  <input type="file" name="heroImage" accept="image/jpeg,image/png,image/webp" className="w-full border-2 border-dashed border-slate-100 rounded-2xl p-3 bg-slate-50 text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2"> <ImageIcon size={14}/> صورة صفحة «عن الشركة» </label>
                  <div className="relative h-48 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    <Image
                      src={settings.aboutImageUrl || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"}
                      alt="الصورة الحالية في صفحة عن الشركة"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-slate-500">الصورة الحالية في أعلى صفحة «عن الشركة». اختر صورة جديدة لاستبدالها.</p>
                  <input type="file" name="aboutImage" accept="image/jpeg,image/png,image/webp" className="w-full border-2 border-dashed border-slate-100 rounded-2xl p-3 bg-slate-50 text-xs" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-blue-900">صور عرض الأقسام في الرئيسية</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">اختر صورة العرض التي تظهر مع كل قسم في الصفحة الرئيسية. صفحات الأقسام تعرض عنوان المعرض وصوره مباشرة.</p>
              </div>
              <div className="space-y-7">
                {categories.map((category) => {
                  const choices = imageOptionsByCategory[category.slug] || [];
                  return (
                    <section key={category.slug} className="space-y-3 border-t border-slate-100 pt-6">
                      <h3 className="text-lg font-black text-slate-800">{category.title}</h3>
                      {choices.length === 0 && <p className="rounded-xl bg-amber-50 px-4 py-3 text-xs font-bold leading-5 text-amber-800">لا توجد صور لهذا القسم في المعرض بعد. ارفع صورًا للقسم أولًا من صفحة المعرض.</p>}
                      <div className="max-w-xl">
                        <CategoryImagePicker name={`categoryHomeImage_${category.slug}`} label="صورة العرض في الرئيسية" choices={choices} currentAssetId={settings.categoryHomeImages?.[category.slug]?.asset?._ref} currentImageUrl={settings.categoryHomeImageUrls?.[category.slug]} fallbackUrl={category.image} />
                      </div>
                    </section>
                  );
                })}
              </div>
              <SettingsSubmitButton />
            </div>

            {/* معلومات التواصل */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-4">
                <Phone size={22} /> أرقام التواصل والروابط
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                <input name="whatsapp" type="tel" defaultValue={settings.whatsapp || "966537302795"} placeholder="واتساب: 966537302795" className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:bg-white outline-none transition text-black" />
                <input name="phone" type="tel" defaultValue={settings.phone || "+966537302795"} placeholder="اتصال: +966537302795" className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:bg-white outline-none transition text-black" />
                <input name="facebook" placeholder={`رابط فيسبوك: ${settings.facebook || ''}`} className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:bg-white outline-none transition text-black md:col-span-2" />
              </div>
              <SettingsSubmitButton />
            </div>
          </form>
        </div>

        {/* العمود الأيسر: أمان الحساب (Form 2) */}
        <div className="lg:col-span-1">
          <form action={async (formData) => {
            'use server';
            await updateAccountSettings(formData);
          }} className="lg:sticky lg:top-24 font-sans">
            
            <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl text-white space-y-8 border border-white/10 relative overflow-hidden">
              <h2 className="text-2xl font-black flex items-center gap-3 text-yellow-500">
                <ShieldCheck size={28} /> أمان الحساب
              </h2>
              
              <div className="space-y-5 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 mr-2 uppercase tracking-widest">اسم المستخدم الجديد</label>
                  <input name="username" type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-yellow-500 transition" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 mr-2 uppercase tracking-widest">كلمة المرور الجديدة</label>
                  <input name="password" type="password" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-yellow-500 transition" />
                </div>

                <div className="pt-6 border-t border-white/10">
                  <label className="text-xs font-bold text-red-400 flex items-center gap-2 mb-3">
                    <Key size={16} /> كود الأمان (مطلوب للتغيير)
                  </label>
                  <input name="securityCode" type="password" required placeholder="أدخل الكود السري" className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-white outline-none focus:border-red-500 transition" />
                </div>
              </div>

              <button type="submit" className="relative z-10 w-full bg-yellow-500 text-slate-900 font-black py-5 rounded-2xl hover:bg-white transition-all shadow-xl active:scale-95">
                تحديث بيانات الدخول 🔐
              </button>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                 <ShieldAlert className="text-yellow-500 shrink-0" size={18} />
                 <p className="text-[11px] text-slate-400 leading-relaxed italic">سيتم خروجك من النظام تلقائياً بعد نجاح العملية لضمان تطبيق الحماية الجديدة.</p>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
