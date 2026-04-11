const categories = ['RINGS', 'EARRINGS', 'NECKLACE', 'BANGLES & BRACELETS', 'SOLITAIRES', 'GIFTS'];

const imagePool = [
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
  "https://images.unsplash.com/photo-1596943849508-251f28fdcb60?w=800&q=80",
  "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80",
  "https://images.unsplash.com/photo-1599643478514-4a4208a0026e?w=800&q=80",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
  "https://images.unsplash.com/photo-1622398925373-3f1559779df3?w=800&q=80",
  "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800&q=80",
  "https://images.unsplash.com/photo-1701089926487-73d1264c4899?w=800&q=80",
  "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80"
];

const adjectives = ["Royal", "Luminous", "Elegant", "Vintage", "Modern", "Classic", "Diamond", "Gold", "Platinum", "Rose Gold"];

export const products = Array.from({ length: 64 }).map((_, index) => {
  const category = categories[index % categories.length];
  const noun = category === 'BANGLES & BRACELETS' ? 'Bracelet' : category.charAt(0) + category.slice(1).toLowerCase();
  const adjective = adjectives[index % adjectives.length];
  const isBestSeller = index % 5 === 0;
  const isNewArrival = index % 7 === 0;
  
  return {
    id: index + 1,
    title: `${adjective} ${noun} Design ${1000 + index}`,
    price: Math.floor(Math.random() * 50000) + 15000,
    oldPrice: Math.floor(Math.random() * 80000) + 65000,
    discountText: index % 3 === 0 ? "25% OFF on Making" : null,
    image: imagePool[index % imagePool.length],
    category: category,
    tags: [
      isBestSeller ? 'BESTSELLERS' : null,
      isNewArrival ? 'NEW ARRIVALS' : null
    ].filter(Boolean),
    rating: (Math.random() * 1 + 4).toFixed(1), // Between 4.0 and 5.0
    reviews: Math.floor(Math.random() * 200) + 10
  };
});
