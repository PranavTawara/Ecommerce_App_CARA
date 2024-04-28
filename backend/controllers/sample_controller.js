const ProductModel = require("../models/product_model");
const UserModel = require("../models/user_model");
const bcrypt = require("bcrypt");

// Seed Sample Users
const seedUsers = async (req, res) => {
  try {
    const saltRounds = 10;
    const user1 = {
      name: "Pranav",
      email: "pranav1@gmail.com",
      password: await bcrypt.hash("Pranavtawara", saltRounds),
      address: "welcome,delhi",
      isAdmin: true,
      orders: [],
    };
    const user2 = {
      name: "Niharika",
      email: "niharika@gmail.com",
      password: await bcrypt.hash("Niharika123", saltRounds),
      address: "noida,delhi",
      isAdmin: false,
      orders: [],
    };
    const user3 = {
      name: "Rudra",
      email: "rudra@gmail.com",
      password: await bcrypt.hash("Rudra123", saltRounds),
      address: "Ujjain,M.P.",
      isAdmin: false,
      orders: [],
    };
    const user4 = {
      name: "Dipanshi",
      email: "dipanshi@gmail.com",
      password: await bcrypt.hash("Dipanshi123", saltRounds),
      address: "Ratlam,M.P.",
      isAdmin: false,
      orders: [],
    };
    const user5 = {
      name: "Bharti",
      email: "bharti@gmail.com",
      password: await bcrypt.hash("Bharti123", saltRounds),
      address: "Bhopal,M.P.",
      isAdmin: false,
      orders: [],
    };
    const users = [user1, user2, user3, user4, user5];
    await UserModel.insertMany(users);
    res.status(200).json({ Message: "5 Users added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Message: error });
  }
};

// Seed Sample Products
const seedProducts = async (req, res) => {
  const product1 = {
    title: "CRAZYMONK Evolution of Goku Anime Hoodie",
    description: "Brand: Carazymonk",
    quantity: 84,
    price: 800,
    image: "https://m.media-amazon.com/images/I/81YO4Qtc1mL._SY879_.jpg",
  };
  const product2 = {
    title: "BEARDO Men Cotton Raw Real Unfiltered Hooded Hoodie",
    description: "Brand: BEARDO",
    quantity: 50,
    price: 450,
    image: "https://m.media-amazon.com/images/I/51TiBpGDA7L._SY879_.jpg",
  };
  const product3 = {
    title: "CRAZYMONK Naruto Itachi Uchiha Unisex Anime Hoodie",
    description: "Brand: CRAZYMONK",
    quantity: 100,
    price: 800,
    image: "https://m.media-amazon.com/images/I/81+3g00XzmL._SY879_.jpg",
  };
  const product4 = {
    title: "Lymio Hoodies || Sweatshirt for Unisex",
    description: "Brand: Lymio",
    quantity: 52,
    price: 640,
    image: "https://m.media-amazon.com/images/I/71x15gESB2L._SY879_.jpg",
  };
  const product5 = {
    title: "Uptownie Lite Women's Shirt Maxi Dress",
    description: "Brand: Uptownie",
    quantity: 60,
    price: 500,
    image: "https://m.media-amazon.com/images/I/51EodL-ka4L._SX679_.jpg",
  };
  const product6 = {
    title: "rytras Women's Floral Printed Cotton Top",
    description: "Brand: rytras",
    quantity: 100,
    price: 500,
    image: "https://m.media-amazon.com/images/I/713wEcCIKRL._SY879_.jpg",
  };
  const product7 = {
    title: "Lymio Dresses for Women || Western Dresses for Women ",
    description: "Brand: Lymio ",
    quantity: 80,
    price: 500,
    image: "https://m.media-amazon.com/images/I/71Hy7lDZiaL._SY879_.jpg",
  };
  const product8 = {
    title: "Peter England Men's Slim Fit Shirt",
    description: "Brand: Peter England",
    quantity: 90,
    price: 900,
    image: "https://m.media-amazon.com/images/I/51hWhDWZ3lL._SY879_.jpg",
  };
  const product9 = {
    title: "Istyle Can Plain Round Neck Rib Knit Regular Top for Women",
    description: "Brand: Istyle",
    quantity: 100,
    price: 350,
    image: "https://m.media-amazon.com/images/I/61MrkcD2y3L._SX679_.jpg",
  };
  const product10 = {
    title: "Ben Martin Men's Relaxed Fit Jeans",
    description: "Brand: Ben Martin",
    quantity: 50,
    price: 650,
    image: "https://m.media-amazon.com/images/I/616xchp1ECL._SY879_.jpg",
  };
  const product11 = {
    title: "Lymio Jeans for Men",
    description: "Brand: Lymio",
    quantity: 70,
    price: 750,
    image: "https://m.media-amazon.com/images/I/71HnyJgHaML._SY879_.jpg",
  };
  const product12 = {
    title: "High Star Men Denim Jacket",
    description: "Brand: High Star",
    quantity: 90,
    price: 630,
    image: "https://m.media-amazon.com/images/I/61hhNSdOTML._SX679_.jpg",
  };
  const product13 = {
    title: "TAGAS Toddler Girls Flower Print Long Sleeve Dress",
    description: "Brand: TAGAS",
    quantity: 80,
    price: 500,
    image: "https://m.media-amazon.com/images/I/71IA8O5waeL._SY879_.jpg",
  };
  const product14 = {
    title: "Arshia Fashions Frock Dress for Girls",
    description: "Brand: Arshia",
    quantity: 90,
    price: 650,
    image: "https://m.media-amazon.com/images/I/71ROjIel0tL._SY879_.jpg",
  };
  const product15 = {
    title: "TAGAS Girls Colorblock Mesh Layered Fit and Flare",
    description: "Brand: TAGAS",
    quantity: 70,
    price: 540,
    image: "https://m.media-amazon.com/images/I/61iInm3LoeL._SY879_.jpg",
  };
  const products = [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
    product10,
    product11,
    product12,
    product13,
    product14,
    product15,
  ];
  await ProductModel.insertMany(products);
  res.status(200).json({ Message: "15 Products added successfully!" });
};

module.exports = { seedProducts, seedUsers };
