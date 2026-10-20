'use server'

// ============================================================
// Gallery Server Actions
// ============================================================

import { client } from "../lib/sanity";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { categories } from "../lib/brand";

export async function uploadImages(formData: FormData) {
  const category = formData.get('category') as string;
  const files = formData.getAll('images') as File[];

  if (!category || files.length === 0) {
    throw new Error("الرجاء اختيار القسم والصور");
  }

  if (!categories.some((item) => item.slug === category)) {
    redirect('/admin/gallery/new?error=category');
  }

  const validFiles = files.filter((file) => file.size > 0);
  if (validFiles.length > 10 || validFiles.some((file) => !file.type.startsWith('image/'))) {
    redirect('/admin/gallery/new?error=files');
  }

  try {
    for (const file of validFiles) {
      const asset = await client.assets.upload('image', file);
      await client.create({
        _type: 'gallery',
        category: category,
        image: {
          _type: 'image',
          asset: { _type: "reference", _ref: asset._id }
        }
      });
    }
    revalidatePath('/admin/gallery');
    revalidatePath('/');
    revalidatePath('/gallery');
    revalidatePath(`/projects/${category}`);
  } catch (error) {
    console.error("Gallery Upload Error:", error);
    redirect('/admin/gallery/new?error=upload');
  }

  redirect(`/admin/gallery?uploaded=${validFiles.length}`);
}

export async function deleteGalleryImage(id: string) {
  await client.delete(id);
  revalidatePath('/admin/gallery');
}
