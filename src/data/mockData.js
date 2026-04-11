const categories = ['RINGS', 'EARRINGS', 'NECKLACE', 'BANGLES & BRACELETS', 'SOLITAIRES', 'GIFTS'];

const imagePool = [
  "https://placehold.co/600x600/f8f9fa/14b8a6?text=Premium+Jewelry+Design+A",
  "https://placehold.co/600x600/f8f9fa/14b8a6?text=Premium+Jewelry+Design+B",
  "https://placehold.co/600x600/f8f9fa/14b8a6?text=Premium+Jewelry+Design+C",
  "https://placehold.co/600x600/f8f9fa/14b8a6?text=Premium+Jewelry+Design+D",
  "https://placehold.co/600x600/f8f9fa/14b8a6?text=Premium+Jewelry+Design+E",
  "https://placehold.co/600x600/f8f9fa/14b8a6?text=Premium+Jewelry+Design+F",
  "https://placehold.co/600x600/f8f9fa/14b8a6?text=Premium+Jewelry+Design+G",
  "https://placehold.co/600x600/f8f9fa/14b8a6?text=Premium+Jewelry+Design+H",
  "https://placehold.co/600x600/f8f9fa/14b8a6?text=Premium+Jewelry+Design+I",
  "https://placehold.co/600x600/f8f9fa/14b8a6?text=Premium+Jewelry+Design+J"
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
