import os

img_dir = r"public/img/collection_2"
files = sorted([f for f in os.listdir(img_dir) if f.lower().endswith(('.jpeg', '.jpg'))])

original_files = [
  "IMG_2450.jpg", "IMG_2452.jpg", "IMG_2455.jpg", "IMG_2458.jpg", "IMG_2460.jpg", 
  "IMG_2463.jpg", "IMG_2467.jpg", "IMG_2471.jpg", "IMG_2474.jpg", "IMG_2476.jpg", 
  "IMG_2480.jpg", "IMG_2488.jpg", "IMG_2491.jpg", "IMG_2494.jpg", "IMG_2497.jpg", 
  "IMG_2500.jpg", "IMG_2505.jpg", "IMG_2509.jpg", "IMG_2512.jpg", "IMG_2516.jpg", 
  "IMG_2520.jpg", "IMG_2523.jpg", "IMG_2527.jpg", "IMG_2530.jpg", "IMG_2533.jpg", 
  "IMG_2537.jpg", "IMG_2540.jpg", "IMG_2542.jpg", "IMG_2544.jpg", "IMG_2545.jpg", 
  "IMG_2550.jpg"
]

content = """export const categories = ['ALL', 'BESTSELLERS', 'NEW ARRIVALS', 'NECKLACE', 'EARRINGS', 'RINGS', 'BANGLES & BRACELETS', 'SOLITAIRES', 'GIFTS', 'OFFERS'];

export const products = ["""

# Professional Name & Unique Description Components
THEMES = ["Imperial", "Royal", "Heritage", "Antique", "Celestial", "Ethereal", "Vintage", "Classic", "Devotional", "Bridal"]
METAL_FINISH = ["Gold Plated", "Kundan Studded", "Polki Finish", "Meenakari", "Jadau", "Temple Work", "Matte Gold"]
NOUNS = {
    'NECKLACE': ["Choker Set", "Long Haram", "Short Necklace Set", "Mala with Pendant", "Bridal Set", "Guttapusalu Haram"],
    'EARRINGS': ["Jhumkas", "Chandeliers", "Drop Earrings", "Balis", "Signature Studs", "Earcuffs"],
    'RINGS': ["Cocktail Ring", "Adjustable Band", "Floral Ring", "Statement Band"],
    'BANGLES & BRACELETS': ["Kada", "Bracelet", "Bangle Set", "Cuff"]
}

DESC_TEMPLATES = [
    "A stunning piece of artistry featuring {metal} with intricate {theme} patterns. Ideal for a grand ethnic look.",
    "Experience the elegance of this {theme} {noun}, meticulously crafted with a premium {metal} finish.",
    "This {theme} masterpiece combines traditional {metal} motifs with modern design, making it a timeless addition to your collection.",
    "Beautifully detailed {noun} set, showcasing the best of {theme} jewelry craftsmanship and superior {metal} detailing.",
    "Enhance your festive ensemble with this handcrafted {theme} {noun}, finished with exquisite {metal} workmanship."
]

all_items = []

# MAPPING ORIGINAL 31 (NECKLACES/SETS confirmed by user feedback)
for i, f in enumerate(original_files):
    cat = 'NECKLACE' # User confirmed even the Kada looking ones are necklaces
    if f == "IMG_2505.jpg": cat = 'EARRINGS'
    
    all_items.append({"image": f"/img/{f}", "category": cat})

# MAPPING NEW 91 (Based on precise grid analysis)
for i, f in enumerate(files):
    if i <= 11: cat = 'NECKLACE'
    elif 12 <= i <= 23: cat = 'EARRINGS'
    elif 24 <= i <= 30: cat = 'NECKLACE' # These look like sets in grid 1/2
    elif 31 <= i <= 33: cat = 'BANGLES & BRACELETS'
    elif i == 34: cat = 'NECKLACE'
    elif 35 <= i <= 52: cat = 'EARRINGS'
    else: cat = 'NECKLACE'
    
    all_items.append({"image": f"/img/collection_2/{f}", "category": cat})

for i, item in enumerate(all_items):
    cat = item['category']
    theme = THEMES[i % len(THEMES)]
    metal = METAL_FINISH[i % len(METAL_FINISH)]
    noun_list = NOUNS.get(cat, NOUNS['NECKLACE'])
    noun = noun_list[i % len(noun_list)]
    
    title = f"{theme} {metal} {noun}"
    
    # Generate UNIQUE Description
    template = DESC_TEMPLATES[i % len(DESC_TEMPLATES)]
    desc = template.format(theme=theme.lower(), metal=metal.lower(), noun=noun.lower())
    
    price = 199 + (i * 23) % 750
    oldPrice = price + 100 + (i * 7) % 300
    
    content += f"""
  {{
    id: {i + 1},
    title: '{title}',
    description: '{desc}',
    image: '{item['image']}',
    category: '{cat}',
    price: {price},
    oldPrice: {oldPrice},
    rating: '{(4.6 + (i % 4)*0.1):.1f}',
    reviews: {40 + i},
    tags: {['BESTSELLERS'] if i % 7 == 0 else (['NEW ARRIVALS'] if i % 9 == 0 else [])}
  }},"""

content += "\n];"

with open('src/data/mockData.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Unique Data Generated with 120+ unique entries.")
