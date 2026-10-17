export const BRAND_NAME = "سياج ونخيل المملكة";

export const BRAND_DESCRIPTION =
  "حلول متكاملة للنخيل، الشبوك، الأشجار، الزيتون، والهناجر والمظلات في المملكة العربية السعودية.";

export const CONTACT = {
  phoneDisplay: "0556543394",
  phoneLink: "+966556543394",
  whatsapp: "966556543394",
  email: "hatmrwys1@gmail.com",
};

export const categories = [
  {
    slug: "palms",
    title: "النخيل",
    eyebrow: "نزرع الحياة",
    description: "توريد وزراعة النخيل بعناية، من اختيار الفسيلة حتى اكتمال المشهد.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=85&w=1400&auto=format&fit=crop",
    imageAlt: "نخيل في مزرعة سعودية",
  },
  {
    slug: "fences",
    title: "الشبوك",
    eyebrow: "حماية تدوم",
    description: "تسوير للمزارع والأراضي بحلول عملية تجمع المتانة وحسن التنفيذ.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=85&w=1400&auto=format&fit=crop",
    imageAlt: "أرض زراعية واسعة",
  },
  {
    slug: "trees",
    title: "الأشجار",
    eyebrow: "مساحات أكثر خضرة",
    description: "اختيار الأشجار وتنسيقها لتصنع ظلالًا ومشهدًا طبيعيًا متوازنًا.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=85&w=1400&auto=format&fit=crop",
    imageAlt: "أشجار خضراء",
  },
  {
    slug: "olives",
    title: "الزيتون",
    eyebrow: "جذور أصيلة",
    description: "زراعة أشجار الزيتون والعناية بها لتمنح المزرعة قيمة وجمالًا.",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=85&w=1400&auto=format&fit=crop",
    imageAlt: "أشجار في ضوء الصباح",
  },
  {
    slug: "structures",
    title: "الهناجر والمظلات",
    eyebrow: "مساحة تخدمك",
    description: "هناجر ومظلات مصممة للاستخدام اليومي، بمواد وتنفيذ يواكبان احتياجك.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=85&w=1400&auto=format&fit=crop",
    imageAlt: "أعمال إنشاء وتجهيز",
  },
] as const;

export const sanityCategoryValues: Record<string, string[]> = {
  palms: ["palms", "nakheel"],
  fences: ["fences", "shabouk"],
  trees: ["trees"],
  olives: ["olives"],
  structures: ["structures", "hanajer", "sawater"],
};

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
