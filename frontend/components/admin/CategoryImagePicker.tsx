"use client";

import { useState } from "react";
import Image from "next/image";

export type CategoryImageOption = {
  assetId: string;
  url: string;
  title: string;
};

type Props = {
  name: string;
  label: string;
  choices: CategoryImageOption[];
  currentAssetId?: string;
  currentImageUrl?: string;
  fallbackUrl: string;
};

export default function CategoryImagePicker({ name, label, choices, currentAssetId, currentImageUrl, fallbackUrl }: Props) {
  const [selected, setSelected] = useState(currentAssetId || "__auto__");
  const current = choices.find((choice) => choice.assetId === selected);
  const previewUrl = selected === "__auto__"
    ? choices[0]?.url || fallbackUrl
    : current?.url || (selected === currentAssetId ? currentImageUrl : undefined) || fallbackUrl;

  return (
    <div className="space-y-2 rounded-2xl border border-slate-100 bg-white p-4">
      <label htmlFor={name} className="block text-sm font-black text-slate-700">{label}</label>
      <div className="relative h-40 overflow-hidden rounded-xl bg-slate-100">
        <Image src={previewUrl} alt={`معاينة ${label}`} fill unoptimized sizes="420px" className="object-cover" />
        {selected === "__auto__" && <span className="absolute bottom-2 right-2 rounded-full bg-slate-900/75 px-3 py-1 text-[11px] font-bold text-white">أحدث صورة من القسم</span>}
      </div>
      <select
        id={name}
        name={name}
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-bold text-slate-800 outline-none focus:border-blue-500"
      >
        <option value="__auto__">تلقائيًا: أحدث صورة مرفوعة في هذا القسم</option>
        {currentAssetId && !choices.some((choice) => choice.assetId === currentAssetId) && (
          <option value={currentAssetId}>الصورة المختارة حاليًا</option>
        )}
        {choices.map((choice, index) => (
          <option key={choice.assetId} value={choice.assetId}>{choice.title || `صورة ${index + 1}`}</option>
        ))}
      </select>
      <p className="text-xs leading-5 text-slate-500">الوضع التلقائي يعرض أحدث صورة محفوظة في قاعدة البيانات لهذا القسم. أو اختر صورة محددة من القائمة.</p>
    </div>
  );
}
