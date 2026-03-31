'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';

const imageCategories = [
  { key: 'hero-background', label: 'Hero Background Image', fileName: 'hero-background.jpg' },
  { key: 'category-tops', label: 'TOPS Category', fileName: 'category-tops.jpg' },
  { key: 'category-pants', label: 'PANTS Category', fileName: 'category-pants.jpg' },
  { key: 'category-dresses', label: 'DRESSES Category', fileName: 'category-dresses.jpg' },
  { key: 'category-scarfs', label: 'SCARFS Category', fileName: 'category-scarfs.jpg' },
  { key: 'category-abaya', label: 'ABAYA Category', fileName: 'category-abaya.jpg' },
  { key: 'category-isdal', label: 'ISDAL Category', fileName: 'category-isdal.jpg' },
  { key: 'category-homewear', label: 'HomeWear Category', fileName: 'category-homewear.jpg' },
];

export default function ImageManager() {
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [messages, setMessages] = useState<Record<string, string>>({});

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageKey: string, targetFileName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [imageKey]: true }));
    
    // Create a FormData object with the file
    const formData = new FormData();
    
    // Create a new File object with the target filename
    const renamedFile = new File([file], targetFileName, { type: file.type });
    formData.append('file', renamedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => ({
          ...prev,
          [imageKey]: `✓ Uploaded successfully! Reload the page to see changes.`,
        }));
        setTimeout(() => {
          setMessages((prev) => ({ ...prev, [imageKey]: '' }));
        }, 3000);
      } else {
        setMessages((prev) => ({
          ...prev,
          [imageKey]: `✗ Upload failed: ${data.error}`,
        }));
      }
    } catch (error) {
      setMessages((prev) => ({
        ...prev,
        [imageKey]: `✗ Error: ${error instanceof Error ? error.message : 'Upload failed'}`,
      }));
    } finally {
      setUploading((prev) => ({ ...prev, [imageKey]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Image Manager</h1>
        <p className="text-gray-600">Upload images for your website hero section and categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {imageCategories.map((category) => (
          <div key={category.key} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{category.label}</h3>
                <p className="text-xs text-gray-500 mt-1">File: {category.fileName}</p>
              </div>
            </div>

            <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center">
                <Upload size={24} className="text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-700">
                  {uploading[category.key] ? 'Uploading...' : 'Click to upload'}
                </span>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleUpload(e, category.key, category.fileName)}
                disabled={uploading[category.key]}
              />
            </label>

            {messages[category.key] && (
              <p className={`text-xs mt-3 ${messages[category.key].startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>
                {messages[category.key]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
        <h4 className="font-bold text-blue-900 mb-2">📋 Image Specifications</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Hero Background</strong>: 1920x1080px or larger (landscape)</li>
          <li>• <strong>Category Images</strong>: 1000x1200px (portrait/3:4 ratio recommended)</li>
          <li>• <strong>Format</strong>: JPG or PNG</li>
          <li>• <strong>Max Size</strong>: 5MB per image</li>
        </ul>
      </div>
    </div>
  );
}
