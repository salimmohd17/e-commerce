// CoastCart Product Catalogue
const products = [
  {
    id: 1, name: "Everyday Headphones", category: "Tech", price: 2499,
    emoji: "🎧", tag: "POPULAR", bg: "#e8e1f2",
    description: "Comfortable over-ear headphones with clear audio for work, study and travel. Features 20-hour battery life and a foldable design.",
    store: "CoastCart Mombasa — In Stock", stock: 23,
    colors: ["#1a1a1a", "#e8e1f2", "#dce8ee", "#d6e7dc"],
    rating: 4.7, reviews: 142, topSelling: true, flashSale: false
  },
  {
    id: 2, name: "Minimal Desk Lamp", category: "Home", price: 1890,
    emoji: "💡", tag: "HOME PICK", bg: "#f3e3ca",
    description: "A sleek, warm-toned desk lamp perfect for your workspace or bedside table. USB powered with three brightness levels.",
    store: "CoastCart Nairobi — In Stock", stock: 15,
    colors: ["#f3e3ca", "#fff", "#1a1a1a"],
    rating: 4.5, reviews: 89, topSelling: true, flashSale: true, originalPrice: 2600
  },
  {
    id: 3, name: "Canvas Day Bag", category: "Accessories", price: 1450,
    emoji: "🎒", tag: "EVERYDAY", bg: "#dbe8d7",
    description: "A sturdy canvas carry-all bag ideal for classes, errands and weekend trips. Multiple pockets and padded laptop sleeve.",
    store: "CoastCart Mombasa — In Stock", stock: 38,
    colors: ["#dbe8d7", "#f3e3ca", "#1a1a1a", "#dce8ee"],
    rating: 4.6, reviews: 204, topSelling: true, flashSale: false
  },
  {
    id: 4, name: "Wireless Mouse", category: "Tech", price: 1250,
    emoji: "🖱️", tag: "WORK SMART", bg: "#dce8ee",
    description: "Ergonomic wireless mouse with a 2.4GHz nano receiver. Up to 18 months battery life and silent click buttons.",
    store: "CoastCart Kisumu — In Stock", stock: 55,
    colors: ["#dce8ee", "#1a1a1a", "#e8e1f2"],
    rating: 4.4, reviews: 318, topSelling: true, flashSale: true, originalPrice: 1800
  },
  {
    id: 5, name: "Ceramic Mug Set", category: "Home", price: 980,
    emoji: "☕", tag: "SMALL JOY", bg: "#f0d9d4",
    description: "A charming set of two handcrafted ceramic mugs for your morning brew. Microwave and dishwasher safe.",
    store: "CoastCart Nakuru — In Stock", stock: 60,
    colors: ["#f0d9d4", "#e9e4d1", "#fff"],
    rating: 4.8, reviews: 91, topSelling: false, flashSale: true, originalPrice: 1400
  },
  {
    id: 6, name: "Classic Wristwatch", category: "Accessories", price: 3200,
    emoji: "⌚", tag: "TIMELESS", bg: "#e9e4d1",
    description: "A clean minimalist wristwatch with a genuine leather strap. Water-resistant and suitable for any occasion.",
    store: "CoastCart Mombasa — In Stock", stock: 11,
    colors: ["#e9e4d1", "#1a1a1a", "#c8a870"],
    rating: 4.9, reviews: 67, topSelling: true, flashSale: false
  },
  {
    id: 7, name: "Portable Speaker", category: "Tech", price: 2790,
    emoji: "🔊", tag: "ON THE GO", bg: "#d6e7dc",
    description: "Waterproof Bluetooth 5.0 speaker with 12-hour playtime. Perfect for outdoor adventures and study sessions.",
    store: "CoastCart Nairobi — In Stock", stock: 29,
    colors: ["#d6e7dc", "#1a1a1a", "#e65100", "#dce8ee"],
    rating: 4.6, reviews: 173, topSelling: true, flashSale: true, originalPrice: 3800
  },
  {
    id: 8, name: "Plant Pot Duo", category: "Home", price: 1150,
    emoji: "🪴", tag: "FRESH SPACE", bg: "#e1e9cd",
    description: "A set of two modern concrete-finish plant pots. Drainage holes included. Perfect for succulents and small indoor plants.",
    store: "CoastCart Mombasa — In Stock", stock: 44,
    colors: ["#e1e9cd", "#f0d9d4", "#dce8ee", "#e9e4d1"],
    rating: 4.3, reviews: 55, topSelling: false, flashSale: false
  }
];

window.coastcartProducts = products;
