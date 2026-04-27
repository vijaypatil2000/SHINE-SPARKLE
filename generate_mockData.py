import os
import json

image_dir = r"c:\Users\sanke\Desktop\NPA\public\img\velvet"

mappings = {
    '32 PM.jpeg': 'SOLITAIRES',
    '33 PM (1)': 'SOLITAIRES',
    '33 PM (2)': 'RINGS',
    '33 PM (3)': 'NECKLACE',
    '33 PM.jpeg': 'SOLITAIRES',
    '34 PM (1)': 'EARRINGS',
    '34 PM (2)': 'EARRINGS',
    '34 PM (3)': 'BANGLES & BRACELETS',
    '34 PM.jpeg': 'SOLITAIRES',
    '35 PM (1)': 'NECKLACE',
    '35 PM (2)': 'EARRINGS',
    '35 PM (3)': 'NECKLACE',
    '35 PM (4)': 'EARRINGS',
    '35 PM.jpeg': 'EARRINGS',
    '36 PM (1)': 'EARRINGS',
    '36 PM (2)': 'NECKLACE',
    '36 PM (3)': 'SOLITAIRES',
    '36 PM.jpeg': 'RINGS',
    '37 PM (1)': 'SOLITAIRES',
    '37 PM (2)': 'EARRINGS',
    '37 PM.jpeg': 'NECKLACE',
    '38 PM (1)': 'EARRINGS',
    '38 PM (2)': 'EARRINGS',
    '38 PM (3)': 'EARRINGS',
    '38 PM.jpeg': 'EARRINGS',
    '39 PM (1)': 'EARRINGS',
    '39 PM (2)': 'RINGS',
    '39 PM (3)': 'NECKLACE',
    '39 PM.jpeg': 'NECKLACE',
    '40 PM (1)': 'BANGLES & BRACELETS',
    '40 PM (2)': 'BANGLES & BRACELETS',
    '40 PM (3)': 'EARRINGS',
    '40 PM (4)': 'SOLITAIRES',
    '40 PM.jpeg': 'NECKLACE',
    '41 PM (1)': 'EARRINGS',
    '41 PM (2)': 'EARRINGS',
    '41 PM (3)': 'NECKLACE',
    '41 PM.jpeg': 'BANGLES & BRACELETS',
    '42 PM (1)': 'SOLITAIRES',
    '42 PM (2)': 'EARRINGS',
    '42 PM (3)': 'SOLITAIRES',
    '42 PM.jpeg': 'NECKLACE',
    '43 PM (1)': 'EARRINGS',
    '43 PM (2)': 'EARRINGS',
    '43 PM (3)': 'NECKLACE',
    '43 PM.jpeg': 'EARRINGS',
    '44 PM (1)': 'EARRINGS',
    '44 PM (2)': 'SOLITAIRES',
    '44 PM.jpeg': 'NECKLACE',
    '45 PM (1)': 'EARRINGS',
    '45 PM (2)': 'NECKLACE',
    '45 PM (3)': 'EARRINGS',
    '45 PM.jpeg': 'SOLITAIRES',
    '46 PM (1)': 'EARRINGS',
    '46 PM (2)': 'EARRINGS',
    '46 PM (3)': 'EARRINGS',
    '46 PM.jpeg': 'BANGLES & BRACELETS',
    '47 PM (1)': 'EARRINGS',
    '47 PM (2)': 'SOLITAIRES',
    '47 PM (3)': 'EARRINGS',
    '47 PM (4)': 'EARRINGS',
    '47 PM.jpeg': 'SOLITAIRES',
    '48 PM (1)': 'EARRINGS',
    '48 PM (2)': 'SOLITAIRES',
    '48 PM (3)': 'SOLITAIRES',
    '48 PM.jpeg': 'NECKLACE',
    '49 PM (1)': 'SOLITAIRES',
    '49 PM (2)': 'EARRINGS',
    '49 PM.jpeg': 'NECKLACE',
    '50 PM (1)': 'SOLITAIRES',
    '50 PM (2)': 'SOLITAIRES',
    '50 PM (3)': 'EARRINGS',
    '50 PM (4)': 'EARRINGS',
    '50 PM.jpeg': 'EARRINGS',
    '51 PM (1)': 'NECKLACE',
    '51 PM (2)': 'BANGLES & BRACELETS',
    '51 PM (3)': 'SOLITAIRES',
    '51 PM.jpeg': 'NECKLACE',
    '52 PM (1)': 'SOLITAIRES',
    '52 PM (2)': 'NECKLACE',
    '52 PM (3)': 'EARRINGS',
    '52 PM.jpeg': 'NECKLACE',
    '53 PM (1)': 'EARRINGS',
    '53 PM (2)': 'SOLITAIRES',
    '53 PM (3)': 'SOLITAIRES',
    '53 PM.jpeg': 'BANGLES & BRACELETS',
    '54 PM (1)': 'SOLITAIRES',
    '54 PM (2)': 'BANGLES & BRACELETS',
    '54 PM (3)': 'BANGLES & BRACELETS',
    '54 PM.jpeg': 'SOLITAIRES',
    '55 PM (1)': 'SOLITAIRES',
    '55 PM (2)': 'SOLITAIRES',
    '55 PM (3)': 'SOLITAIRES',
    '55 PM.jpeg': 'EARRINGS',
    '56 PM.jpeg': 'SOLITAIRES'
}

def get_category(filename):
    for key, val in mappings.items():
        if key in filename:
            return val
    print('WARNING: Could not match', filename)
    return 'NECKLACE'

titles = {
    'NECKLACE': ['Imperial Velvet Choker', 'Royal Emerald Long Haram', 'Antique Gold Mala', 'Celestial Jadau Necklace Set', 'Ethereal Temple Work Necklace', 'Vintage Matte Gold Choker', 'Devotional Kundan Studded Necklace', 'Bridal Polki Finish Set', 'Classic Meenakari Necklace'],
    'EARRINGS': ['Vintage Velvet Studs', 'Royal Emerald Jhumkas', 'Antique Gold Chandeliers', 'Celestial Jadau Earcuffs', 'Ethereal Temple Work Balis', 'Classic Meenakari Drop Earrings', 'Bridal Polki Finish Studs', 'Imperial Matte Gold Jhumkas'],
    'BANGLES & BRACELETS': ['Imperial Velvet Kada', 'Royal Emerald Bangles', 'Antique Gold Cuff', 'Celestial Jadau Bracelet', 'Ethereal Temple Work Bangles', 'Vintage Matte Gold Kada'],
    'RINGS': ['Imperial Velvet Solitaire', 'Royal Emerald Ring', 'Antique Gold Band', 'Celestial Jadau Cocktail Ring', 'Ethereal Temple Work Ring', 'Vintage Matte Gold Ring'],
    'SOLITAIRES': ['Imperial Velvet Necklace Set', 'Royal Emerald Complete Set', 'Antique Gold Bridal Set', 'Celestial Jadau Choker Set']
}

import random

products = []
images = os.listdir(image_dir)
images = [i for i in images if i.endswith('.jpeg')]
images.sort()

random.seed(42)  # For reproducible titles

for idx, img in enumerate(images):
    cat = get_category(img)
    base_price = random.randint(150, 500)
    old_price = int(base_price * 1.4)
    title = random.choice(titles[cat])
    
    prod = {
        'id': idx + 1,
        'title': f"{title} #{idx+1}",
        'description': f"A stunning piece of artistry featuring a {cat.lower()} design. Ideal for a grand ethnic look with a premium velvet finish.",
        'image': f"/img/velvet/{img}",
        'category': cat,
        'price': base_price,
        'oldPrice': old_price,
        'rating': '4.8',
        'reviews': random.randint(10, 100),
        'tags': ['BESTSELLERS'] if random.random() > 0.8 else (['NEW ARRIVALS'] if random.random() > 0.6 else [])
    }
    products.append(prod)

js_content = "export const categories = ['ALL', 'BESTSELLERS', 'NEW ARRIVALS', 'NECKLACE', 'EARRINGS', 'RINGS', 'BANGLES & BRACELETS', 'SOLITAIRES', 'GIFTS', 'OFFERS'];\n\n"
js_content += "export const products = " + json.dumps(products, indent=2) + ";\n"

output_path = r"c:\Users\sanke\Desktop\NPA\src\data\mockData.js"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated {len(products)} categorized products in mockData.js")

cat_counts = {}
for p in products:
    cat_counts[p['category']] = cat_counts.get(p['category'], 0) + 1
print("Category distribution:", cat_counts)
