import fetch from "node-fetch";
import Product from "../models/main.js";

const schema = z.object({
  id: z.number(),
  description : z.string(),
  price: z.number(),
  description: z.string(),
  category: z.number(){
    id: z.number(),
    name: z.string(),
    image: z.string(),
  },
  images: z
  //  images: z.array(z.string().url({ require_tld: false }))
});


const API_URL = "https://api.escuelajs.co/api/v1/products";

async function getAllProducts(req, res) {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const products = data.map((productData) => new Product(productData));

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
}

async function getProductById(req, res) {
  const productId = req.params.id;

  try {
    const response = await fetch(`${API_URL}/${productId}`);
    const data = await response.json();

    const product = new Product(data);

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
}

async function createProduct(req, res) {
  const productData = req.body;

  try {
    const validatedData = Product.validate(productData);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    const createdProduct = await response.json();

    res.json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
}

async function updateProduct(req, res) {
  const productId = req.params.id;
  const productData = req.body;

  try {
    const validatedData = Product.validate(productData);

    const response = await fetch(`${API_URL}/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    const updatedProduct = await response.json();

    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
}

async function deleteProduct(req, res) {
  const productId = req.params.id;

  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
    });

    const deletedProduct = await response.json();

    res.json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
