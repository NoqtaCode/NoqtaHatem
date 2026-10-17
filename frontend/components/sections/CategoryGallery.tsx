'use client';

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type GalleryImage = {
  _id: string;
  title?: string | null;
  imageUrl: string;
};

export default function CategoryGallery({ images, categoryTitle }: { images: GalleryImage[]; categoryTitle: string }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const slides = images.map((image, index) => ({
    src: image.imageUrl,
    alt: image.title || `${categoryTitle} — صورة ${index + 1}`,
  }));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image._id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`عرض صورة ${index + 1} من ${categoryTitle}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[#e9e5dc] text-right shadow-sm ring-1 ring-[#0b2036]/[0.06] transition hover:-translate-y-1 hover:shadow-xl sm:rounded-[1.6rem]"
          >
            <Image
              src={image.imageUrl}
              alt={image.title || `${categoryTitle} — صورة ${index + 1}`}
              fill
              unoptimized
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#071827]/85 to-transparent px-3 pb-3 pt-10 text-xs font-bold text-white sm:px-5 sm:pb-5 sm:text-sm">
              <span>{image.title || categoryTitle}</span>
              <span className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[10px] backdrop-blur sm:text-xs">{String(index + 1).padStart(2, "0")}</span>
            </span>
          </button>
        ))}
      </div>

      <Lightbox index={activeIndex} open={activeIndex >= 0} close={() => setActiveIndex(-1)} slides={slides} />
    </>
  );
}
