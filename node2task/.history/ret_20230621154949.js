import express from "express";
import fetch from 'node-fetch';

import { object, string, number, array } from "zod";

const app = express();
app.use(express.json());

let products = [];

// Populating the products array with a sample product
const sampleProduct = {
  id: 1,
  title: "Sample Product",
  price: 20,
  description: "A sample description",
  images: ["https://placeimg.com/640/480/any"],
  creationAt: "2023-06-21T08:21:15.000Z",
  updatedAt: "2023-06-21T08:21:15.000Z",
  category: {
    id: 1,
    name: "Clothes",
    image: "https://picsum.photos/640/640?r=4763",
    creationAt: "2023-06-21T06:37:02.000Z",
    updatedAt: "2023-06-21T06:37:02.000Z",
  },
};

products.push(sampleProduct);

// Routes
app.put("/products/:id", async (req, res) => {
  const schema2 = object({
    title: string(),
    price: number(),
  });

  function validate2(product) {
    return schema2.parse(product);
  }

  function getProductById(id) {
    return products.find((p) => p.id === id);
  }

  async function fetchProductData(id) {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
      const productData = await response.json();
      return productData;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return null;
    }
  }

  try {
    validate2(req.body);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }

  const id = parseInt(req.params.id);
  const { title, price } = req.body;

  try {
    const productData = await fetchProductData(id);

    console.log("Fetched data:", productData);

    const product = getProductById(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    product.title = productData.title || title || product.title;
    product.price = productData.price || price || product.price;
    product.updatedAt = new Date();

    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
