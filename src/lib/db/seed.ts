import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { products, type NewProduct } from "./schema";

const sampleProducts: NewProduct[] = [
  {
    name: "Nike Air Max 90",
    slug: "nike-air-max-90",
    description:
      "Nothing as iconic satisfies like the original. The Air Max 90 stays true to its OG roots with the iconic Waffle outsole, stitched overlays and classic TPU accents.",
    price: "130.00",
    originalPrice: "150.00",
    category: "Shoes",
    subcategory: "Lifestyle",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/wzitsrb4oucx1gzasiii/AIR+MAX+90.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/wzitsrb4oucx1gzasiii/AIR+MAX+90.png",
    ],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#111111" },
    ],
    inStock: true,
    isFeatured: true,
    isNew: false,
    rating: "4.7",
    reviewCount: 1245,
  },
  {
    name: "Nike Air Force 1 '07",
    slug: "nike-air-force-1-07",
    description:
      "The radiance lives on in the Nike Air Force 1 '07. This b-ball OG puts a fresh spin on classic hoops style with crisp leather, bold colors and the perfect amount of flash.",
    price: "115.00",
    category: "Shoes",
    subcategory: "Lifestyle",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13", "14"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#111111" },
    ],
    inStock: true,
    isFeatured: true,
    isNew: false,
    rating: "4.8",
    reviewCount: 3467,
  },
  {
    name: "Nike Dunk Low Retro",
    slug: "nike-dunk-low-retro",
    description:
      "Created for the hardwood but taken to the streets. This '80s b-ball icon returns with crisp leather and retro colors. The game has been changed.",
    price: "115.00",
    category: "Shoes",
    subcategory: "Lifestyle",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e0e41cf1-2aca-40a2-b0d2-6f3406040757/DUNK+LOW+RETRO.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e0e41cf1-2aca-40a2-b0d2-6f3406040757/DUNK+LOW+RETRO.png",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "White/Black", hex: "#111111" },
      { name: "Panda", hex: "#000000" },
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    rating: "4.6",
    reviewCount: 2890,
  },
  {
    name: "Nike Air Jordan 1 Retro High OG",
    slug: "nike-air-jordan-1-retro-high-og",
    description:
      "Inspired by the original that debuted in 1985, the Air Jordan 1 Retro High OG offers a fresh take on a classic. Premium materials and authentic colors give you a clean look.",
    price: "180.00",
    category: "Shoes",
    subcategory: "Jordan",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/55b09c56-1cc8-4483-a29c-baf02a148280/WMNS+AIR+JORDAN+1+RETRO+HIGH+OG.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/55b09c56-1cc8-4483-a29c-baf02a148280/WMNS+AIR+JORDAN+1+RETRO+HIGH+OG.png",
    ],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    colors: [
      { name: "Chicago", hex: "#CE1141" },
      { name: "Black/White", hex: "#111111" },
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    rating: "4.9",
    reviewCount: 5621,
  },
  {
    name: "Nike Pegasus 42",
    slug: "nike-pegasus-42",
    description:
      "The Pegasus 42 is a reliable running shoe with a responsive ride and an ultra-breathable upper. React foam provides a smooth transition from landing to liftoff.",
    price: "140.00",
    category: "Shoes",
    subcategory: "Running",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/82dcccb0-7660-4532-8c69-a840079a9060/PEGASUS+42.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/82dcccb0-7660-4532-8c69-a840079a9060/PEGASUS+42.png",
    ],
    sizes: ["7", "8", "9", "10", "11", "12", "13", "14"],
    colors: [
      { name: "Black/White", hex: "#111111" },
      { name: "Pure Platinum", hex: "#C0C0C0" },
    ],
    inStock: true,
    isFeatured: false,
    isNew: true,
    rating: "4.5",
    reviewCount: 890,
  },
  {
    name: "Nike Sportswear Tech Fleece Joggers",
    slug: "nike-tech-fleece-joggers",
    description:
      "Nike Tech Fleece reimagines fleece for a lightweight, warm look with a modern, slim fit. An updated fabric has a smoother face for a refined, premium feel.",
    price: "110.00",
    category: "Clothing",
    subcategory: "Pants",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0cb0cb01-4b53-4195-b345-820d5fc0c062/NIKE+CLUB+FLEECE+CARGO+JOGGER.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0cb0cb01-4b53-4195-b345-820d5fc0c062/NIKE+CLUB+FLEECE+CARGO+JOGGER.png",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Dark Grey Heather", hex: "#4A4A4A" },
    ],
    inStock: true,
    isFeatured: false,
    isNew: false,
    rating: "4.6",
    reviewCount: 2100,
  },
  {
    name: "Nike Sportswear Club Hoodie",
    slug: "nike-sportswear-club-hoodie",
    description:
      "The Nike Sportswear Club Hoodie is made with soft, brushed-back fleece and a relaxed fit for everyday comfort. It features a kangaroo pocket for warmth and storage.",
    price: "65.00",
    category: "Clothing",
    subcategory: "Hoodies",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/145c91d3-a6c5-4497-8884-834a8fb80dfe/NIKE+CLUB+FB+PO+HOODIE+L.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/145c91d3-a6c5-4497-8884-834a8fb80dfe/NIKE+CLUB+FB+PO+HOODIE+L.png",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Dark Grey Heather", hex: "#4A4A4A" },
      { name: "White", hex: "#FFFFFF" },
    ],
    inStock: true,
    isFeatured: false,
    isNew: false,
    rating: "4.4",
    reviewCount: 1876,
  },
  {
    name: "Nike Air Max 270",
    slug: "nike-air-max-270",
    description:
      "Nike's first lifestyle Air Max delivers big Air in a sleek package. The 270-degree heel unit is Max Air's tallest ever — giving you an eye-catching look and ultra-comfy feel.",
    price: "160.00",
    originalPrice: "180.00",
    category: "Shoes",
    subcategory: "Lifestyle",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awlotferkkg4ncmmtst1/AIR+MAX+270.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awlotferkkg4ncmmtst1/AIR+MAX+270.png",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Black/Anthracite", hex: "#111111" },
      { name: "White/Navy", hex: "#1B2A4A" },
    ],
    inStock: true,
    isFeatured: true,
    isNew: false,
    rating: "4.7",
    reviewCount: 3200,
  },
  {
    name: "Nike Blazer Mid '77 Vintage",
    slug: "nike-blazer-mid-77-vintage",
    description:
      "In the '77 Blazer, retro basketball gets a vintage design twist. The exposed foam on the tongue and a throwback Nike logo dial up the nostalgic vibes.",
    price: "105.00",
    category: "Shoes",
    subcategory: "Lifestyle",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/BLAZER+MID+%2777+VNTG.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/BLAZER+MID+%2777+VNTG.png",
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "White/Black", hex: "#FFFFFF" },
      { name: "Sail/Orange", hex: "#FF6B35" },
    ],
    inStock: true,
    isFeatured: false,
    isNew: false,
    rating: "4.5",
    reviewCount: 1560,
  },
  {
    name: "Nike Vaporfly 3",
    slug: "nike-vaporfly-3",
    description:
      "Built with a stiff yet responsive carbon-fiber plate and ZoomX foam, the Vaporfly 3 is designed to help push the human body to its running limits.",
    price: "260.00",
    category: "Shoes",
    subcategory: "Running",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f0e498e0-372b-4574-a498-3d498f0e3cb4/ZOOMX+VAPORFLY+NEXT%25+3.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f0e498e0-372b-4574-a498-3d498f0e3cb4/ZOOMX+VAPORFLY+NEXT%25+3.png",
    ],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    colors: [
      { name: "Hyper Pink", hex: "#FF69B4" },
      { name: "Volt", hex: "#CEFF00" },
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    rating: "4.8",
    reviewCount: 980,
  },
  {
    name: "Nike Pro Dri-FIT Tee",
    slug: "nike-pro-dri-fit-tee",
    description:
      "The Nike Pro Dri-FIT Tee delivers a snug, body-hugging fit that moves with you during intense training. Sweat-wicking Dri-FIT technology keeps you cool and dry.",
    price: "35.00",
    category: "Clothing",
    subcategory: "Tops",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f74d0c3c-aa66-433b-8248-0410a0710a3a/M+NK+DF+TEE+CREW+SOLID+AR.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f74d0c3c-aa66-433b-8248-0410a0710a3a/M+NK+DF+TEE+CREW+SOLID+AR.png",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Game Royal", hex: "#0057B7" },
    ],
    inStock: true,
    isFeatured: false,
    isNew: false,
    rating: "4.3",
    reviewCount: 756,
  },
  {
    name: "Nike Heritage Backpack",
    slug: "nike-heritage-backpack",
    description:
      "The Nike Heritage Backpack offers a spacious main compartment and multiple pockets for organized storage, making it perfect for everyday use.",
    price: "40.00",
    category: "Accessories",
    subcategory: "Bags",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/eeae0f9b-72e6-439c-a13c-8a06b3dca10a/NK+HERITAGE+BKPK.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/eeae0f9b-72e6-439c-a13c-8a06b3dca10a/NK+HERITAGE+BKPK.png",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    inStock: true,
    isFeatured: false,
    isNew: false,
    rating: "4.2",
    reviewCount: 432,
  },
];

async function seed() {
  const connectionString = process.env.DATABASE_URL!;
  const client = postgres(connectionString);
  const db = drizzle(client, { schema: { products } });

  console.log("🌱 Seeding database...");

  await db.delete(products);

  console.log("📦 Inserting products...");
  await db.insert(products).values(sampleProducts);

  console.log(`✅ Seeded ${sampleProducts.length} products successfully!`);
  await client.end();
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
