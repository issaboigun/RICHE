# Image Upload Guide for RICHE

## Local Image Paths

The website now uses local images instead of external URLs. Upload your brand images to the following locations:

### Hero Section Background
- **Path**: `/public/uploads/hero-background.jpg`
- **Size**: Recommended 1920x1080 or larger
- **Format**: JPG or PNG
- **Purpose**: Main hero section background image

### Category Images
Upload one image for each category with these naming conventions:

1. **TOPS** → `/public/uploads/category-tops.jpg`
2. **PANTS** → `/public/uploads/category-pants.jpg`
3. **DRESSES** → `/public/uploads/category-dresses.jpg`
4. **SCARFS** → `/public/uploads/category-scarfs.jpg`
5. **ABAYA** → `/public/uploads/category-abaya.jpg`
6. **ISDAL** → `/public/uploads/category-isdal.jpg`
7. **HomeWear** → `/public/uploads/category-homewear.jpg`

### Image Specifications
- **Size**: 1000x1200 pixels (portrait orientation recommended)
- **Format**: JPG or PNG
- **Max File Size**: 5MB recommended
- **Aspect Ratio**: 3:4 (portrait)

## How to Upload

### Option 1: Using the Upload API
```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@/path/to/your/image.jpg"
```

### Option 2: Direct File Upload
1. Simply copy your images to the `/public/uploads/` folder
2. Ensure the filenames match exactly as listed above
3. Refresh the website to see the changes

## Example Steps

1. Create your images or take photos
2. Resize them to the recommended dimensions
3. Name them according to the category (e.g., `category-tops.jpg`)
4. Save them to `/public/uploads/` folder
5. Reload your website to see the changes

## Notes
- The website automatically reads images from `/public/uploads/`
- If an image is missing, the background will be gray
- You can replace images anytime by uploading with the same filename
- Images are served from the public folder, so they're cached by browsers

## Admin Image Manager (Optional)
Consider creating an admin panel interface to upload category images directly through the website UI.
