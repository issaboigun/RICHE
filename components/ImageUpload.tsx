'use client';

import { useState, useRef } from 'react';
import { Upload, X, Check } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Product Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest">{label}</label>
      <div className="flex items-center space-x-4">
        {value ? (
          <div className="relative h-24 w-24 border border-gray-100 rounded overflow-hidden group">
            <img src={value} alt="Uploaded" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0">
               <Check size={20} className="text-white" />
            </div>
          </div>
        ) : (
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="h-24 w-24 border-2 border-dashed border-gray-200 rounded flex flex-col items-center justify-center hover:border-black transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <span className="text-[10px] uppercase font-bold tracking-widest animate-pulse">Uploading...</span>
            ) : (
              <>
                <Upload size={20} className="text-gray-400 mb-1" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Upload</span>
              </>
            )}
          </button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
          accept="image/*"
        />
        {value && (
           <button
             type="button"
             onClick={() => fileInputRef.current?.click()}
             className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-black transition-colors"
           >
             Change Image
           </button>
        )}
      </div>
    </div>
  );
}
