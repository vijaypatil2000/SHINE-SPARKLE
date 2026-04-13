import os
import sys
from PIL import Image
from pillow_heif import register_heif_opener

register_heif_opener()

src_dir = r"c:\Users\sanke\Desktop\NPA IMG"
dst_dir = r"c:\Users\sanke\Desktop\NPA\public\img"

os.makedirs(dst_dir, exist_ok=True)

files = [f for f in os.listdir(src_dir) if f.lower().endswith('.heic')]
print(f"Found {len(files)} HEIC files.")

for filename in files:
    src_path = os.path.join(src_dir, filename)
    name, ext = os.path.splitext(filename)
    dst_filename = f"{name}.jpg"
    dst_path = os.path.join(dst_dir, dst_filename)
    
    print(f"Converting {filename} -> {dst_filename}")
    try:
        image = Image.open(src_path)
        # Convert to RGB prior to saving as JPEG
        image = image.convert('RGB')
        image.save(dst_path, "JPEG", quality=90)
    except Exception as e:
        print(f"Error converting {filename}: {e}")

print("Done converting mapping all images into public/img directory!")
