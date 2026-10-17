'use client';

import { MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { CONTACT } from "../../lib/brand";

export default function FloatingActions() {
  const waNumber = CONTACT.whatsapp;
  const phone = CONTACT.phoneLink;

  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-4 z-[100] md:bottom-10 md:left-10">
      
      {/* زر الاتصال الهاتفي */}
      <Link 
        href={`tel:${phone}`}
        className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#0b2036] text-white rounded-full shadow-[0_10px_30px_rgba(7,24,39,0.35)] hover:bg-[#172e46] transition-all duration-300 hover:scale-110 active:scale-90 border border-white/20"
      >
        <PhoneCall size={24} className="md:w-7 md:h-7" />
        {/* نص يظهر عند التحويم في الكمبيوتر */}
        <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          اتصال مباشر
        </span>
      </Link>

      {/* زر الواتساب مع تأثير النبض */}
      <Link 
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#f2c46d] text-[#0b2036] rounded-full shadow-[0_10px_30px_rgba(7,24,39,0.25)] hover:bg-white transition-all duration-300 hover:scale-110 active:scale-90 border border-white/20"
      >
        {/* تأثير النبض الخارجي */}
        <span className="absolute inset-0 rounded-full bg-[#f2c46d] animate-ping opacity-20"></span>
        
        <MessageCircle size={28} className="md:w-8 md:h-8" />
        
        {/* نص يظهر عند التحويم في الكمبيوتر */}
        <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          تحدث معنا واتساب
        </span>
      </Link>

    </div>
  );
}
