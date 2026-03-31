'use client';

export default function TestPage() {
  return (
    <div className="w-full p-8 bg-white">
      <h1 className="text-4xl font-bold mb-4 text-black">
        Test Page - Tailwind Test
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-8 bg-gray-200 text-center rounded">
          <h2 className="text-2xl font-bold">Box 1</h2>
          <p className="text-lg">TOPS</p>
        </div>
        <div className="p-8 bg-gray-200 text-center rounded">
          <h2 className="text-2xl font-bold">Box 2</h2>
          <p className="text-lg">PANTS</p>
        </div>
        <div className="p-8 bg-gray-200 text-center rounded">
          <h2 className="text-2xl font-bold">Box 3</h2>
          <p className="text-lg">ABAYA</p>
        </div>
      </div>

      <div className="bg-blue-100 p-8 rounded mb-8">
        <h2 className="text-2xl font-bold mb-4">About Section</h2>
        <p className="text-base">If you see three boxes above with proper spacing, Tailwind is working!</p>
      </div>

      <a href="/" className="text-blue-600 underline">Back to Home</a>
    </div>
  );
}
