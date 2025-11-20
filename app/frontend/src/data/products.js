export const products = [
  // Laptops
  {
    id: 'prod_1',
    name: 'ZenBook Pro Duo',
    category: 'Laptops',
    price: 1999.99,
    imageUrl: 'https://placehold.co/600x400/2D3748/FFFFFF?text=Laptop',
    rating: 4.8,
    stock: 8,
    description: 'A high-performance laptop with a unique dual-screen design for enhanced productivity and creativity.'
  },
  {
    id: 'prod_2',
    name: 'Spectre x360',
    category: 'Laptops',
    price: 1549.00,
    imageUrl: 'https://placehold.co/600x400/2D3748/FFFFFF?text=Laptop',
    rating: 4.7,
    stock: 12,
    description: 'A versatile and stylish 2-in-1 laptop with powerful performance and a stunning gem-cut design.'
  },
  {
    id: 'prod_3',
    name: 'GamerBook Fire',
    category: 'Laptops',
    price: 2499.50,
    imageUrl: 'https://placehold.co/600x400/2D3748/FFFFFF?text=Gaming+Laptop',
    rating: 4.9,
    stock: 5,
    description: 'Dominate the competition with top-tier graphics, a high-refresh-rate display, and advanced cooling.'
  },

  // Smartphones
  {
    id: 'prod_4',
    name: 'Galaxy Nova S23',
    category: 'Smartphones',
    price: 1199.99,
    imageUrl: 'https://placehold.co/600x400/4A5568/FFFFFF?text=Smartphone',
    rating: 4.9,
    stock: 25,
    description: 'Experience the future with a stunning dynamic display, pro-grade camera system, and all-day battery life.'
  },
  {
    id: 'prod_5',
    name: 'Pixel Pro 8',
    category: 'Smartphones',
    price: 999.00,
    imageUrl: 'https://placehold.co/600x400/4A5568/FFFFFF?text=Smartphone',
    rating: 4.8,
    stock: 30,
    description: 'The smartest smartphone with an advanced AI camera, powerful chip, and a pure Android experience.'
  },
  {
    id: 'prod_6',
    name: 'OnePlus Ace 11',
    category: 'Smartphones',
    price: 799.00,
    imageUrl: 'https://placehold.co/600x400/4A5568/FFFFFF?text=Smartphone',
    rating: 4.6,
    stock: 15,
    description: 'Blazing-fast performance and a smooth display, designed for power users and mobile gamers.'
  },

  // Headphones
  {
    id: 'prod_7',
    name: 'QuietComfort Ultra',
    category: 'Headphones',
    price: 349.95,
    imageUrl: 'https://placehold.co/600x400/718096/FFFFFF?text=Headphones',
    rating: 4.9,
    stock: 40,
    description: 'World-class noise cancellation, high-fidelity audio, and comfortable design for an immersive listening experience.'
  },
  {
    id: 'prod_8',
    name: 'WH-1000XM5 Wireless',
    category: 'Headphones',
    price: 399.99,
    imageUrl: 'https://placehold.co/600x400/718096/FFFFFF?text=Headphones',
    rating: 4.8,
    stock: 22,
    description: 'Industry-leading noise canceling headphones with exceptional sound quality and a comfortable, lightweight design.'
  },
  {
    id: 'prod_9',
    name: 'AirPods Max Pro',
    category: 'Headphones',
    price: 549.00,
    imageUrl: 'https://placehold.co/600x400/718096/FFFFFF?text=Headphones',
    rating: 4.7,
    stock: 18,
    description: 'High-fidelity audio, adaptive EQ, active noise cancellation, and spatial audio in a premium design.'
  },
  
  // Cameras
  {
    id: 'prod_10',
    name: 'Alpha A7 IV',
    category: 'Cameras',
    price: 2499.99,
    imageUrl: 'https://placehold.co/600x400/A0AEC0/000000?text=Camera',
    rating: 4.9,
    stock: 10,
    description: 'A versatile hybrid full-frame camera with a new 33MP sensor, advanced autofocus, and 4K 60p video.'
  },
  {
    id: 'prod_11',
    name: 'EOS R6 Mark II',
    category: 'Cameras',
    price: 2299.00,
    imageUrl: 'https://placehold.co/600x400/A0AEC0/000000?text=Camera',
    rating: 4.8,
    stock: 7,
    description: 'A powerful mirrorless camera for enthusiasts, offering high-speed shooting and impressive video capabilities.'
  },

  // Smartwatches
  {
    id: 'prod_12',
    name: 'iWatch Series 9',
    category: 'Smartwatches',
    price: 429.00,
    imageUrl: 'https://placehold.co/600x400/CBD5E0/000000?text=Smartwatch',
    rating: 4.9,
    stock: 50,
    description: 'The ultimate device for a healthy life with advanced health sensors and a brilliant always-on display.'
  },
  {
    id: 'prod_13',
    name: 'Galaxy Watch 6',
    category: 'Smartwatches',
    price: 329.99,
    imageUrl: 'https://placehold.co/600x400/CBD5E0/000000?text=Smartwatch',
    rating: 4.7,
    stock: 45,
    description: 'Track your wellness and fitness with advanced coaching, all from your wrist.'
  },
    {
    id: 'prod_14',
    name: 'Aura Ring Gen3',
    category: 'Smartwatches',
    price: 299.00,
    imageUrl: 'https://placehold.co/600x400/CBD5E0/000000?text=Smart+Ring',
    rating: 4.5,
    stock: 0, // Out of stock example
    description: 'A smart ring that tracks your sleep, activity, and recovery with personalized insights.'
  },

  // Drones
  {
    id: 'prod_15',
    name: 'Mavic Air 3',
    category: 'Drones',
    price: 1099.00,
    imageUrl: 'https://placehold.co/600x400/E2E8F0/000000?text=Drone',
    rating: 4.9,
    stock: 15,
    description: 'A compact and foldable drone with a dual-camera system, offering breathtaking aerial photography.'
  },
  {
    id: 'prod_16',
    name: 'Avata FPV Drone',
    category: 'Drones',
    price: 999.00,
    imageUrl: 'https://placehold.co/600x400/E2E8F0/000000?text=FPV+Drone',
    rating: 4.8,
    stock: 11,
    description: 'Experience the thrill of immersive flight with this compact and agile FPV drone.'
  }
];

export const getCategories = () => {
  const categories = products.map(p => p.category);
  return ['All Products', ...new Set(categories)];
};