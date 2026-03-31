import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // تجهيز اسم فريد للملف
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}-${file.name.replace(/\s+/g, '-')}`;

    // الرفع مباشرة إلى Vercel Blob بدلاً من السيرفر المحلي
    const blob = await put(filename, file, {
      access: 'public', // عشان الصور تكون متاحة للجميع
    });

    // برجع رابط الصورة الجديد (URL) اللي Vercel عطاهولنا
    return NextResponse.json({ url: blob.url });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
