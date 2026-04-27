import os
import glob
from PIL import Image, ImageDraw, ImageFont
import math

image_dir = r"c:\Users\sanke\Desktop\NPA\public\img\velvet"
output_dir = r"c:\Users\sanke\Desktop\NPA\scratch_collages"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

images = glob.glob(os.path.join(image_dir, "*.jpeg"))

# Grid parameters
COLS = 5
ROWS = 5
IMG_SIZE = 300
MARGIN = 40
IMAGES_PER_GRID = COLS * ROWS

for grid_idx in range(math.ceil(len(images) / IMAGES_PER_GRID)):
    grid_img = Image.new('RGB', (COLS * IMG_SIZE, ROWS * (IMG_SIZE + MARGIN)), color='white')
    draw = ImageDraw.Draw(grid_img)
    
    start_idx = grid_idx * IMAGES_PER_GRID
    end_idx = min(start_idx + IMAGES_PER_GRID, len(images))
    
    for i, img_path in enumerate(images[start_idx:end_idx]):
        try:
            with Image.open(img_path) as img:
                img = img.convert('RGB')
                # Resize and crop to square
                aspect = img.width / img.height
                if aspect > 1:
                    new_w = int(IMG_SIZE * aspect)
                    img = img.resize((new_w, IMG_SIZE))
                    offset = (new_w - IMG_SIZE) // 2
                    img = img.crop((offset, 0, offset + IMG_SIZE, IMG_SIZE))
                else:
                    new_h = int(IMG_SIZE / aspect)
                    img = img.resize((IMG_SIZE, new_h))
                    offset = (new_h - IMG_SIZE) // 2
                    img = img.crop((0, offset, IMG_SIZE, offset + IMG_SIZE))
                
                col = i % COLS
                row = i // COLS
                
                x = col * IMG_SIZE
                y = row * (IMG_SIZE + MARGIN)
                
                grid_img.paste(img, (x, y))
                
                filename = os.path.basename(img_path)
                # Draw black text with white outline for visibility
                draw.text((x + 10, y + IMG_SIZE + 5), filename, fill="black")
        except Exception as e:
            print(f"Error processing {img_path}: {e}")
            
    out_path = os.path.join(output_dir, f"collage_{grid_idx}.jpg")
    grid_img.save(out_path)
    print(f"Saved {out_path}")
