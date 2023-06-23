import express from "express";

import { object, string, number, array } from "zod";
const app = express();
app.use(express.json());
let products = [];
const schema2 = object({
  title: string(),
  price: number(),
});

function validate2(product) {
  return schema2.parse(product);
}
function validate2(product) {
  return schema2.parse(product);
}

function getProductById(id) {
  return products.find((p) => p.id === id);
}

async function updateProduct(id, updatedFields) {
  const product = this.getProductById(id);

  if (!product) {
    return null;
  }

  try {
    // Fetch the updated product data from an external API or source
    const response = await fetch(`https://example.com/products/${id}`);
    const updatedData = await response.json();

    console.log("Fetched data:", updatedData);

    // Update the product fields with the fetched data or use the existing values
    product.title = updatedData.title || updatedFields.title || product.title;
    product.price = updatedData.price || updatedFields.price || product.price;
    product.updatedAt = new Date();

    return product;
  } catch (error) {
    // Handle any errors that occur during the fetch request
    console.error("Error fetching updated product data:", error);
    return null;
  }
}

// Middleware

// Routes
app.post("/api/v1/products", (req, res) => {
  try {
    validate2(req.body);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }

  const id = parseInt(req.params.id);
  const { title, price } = req.body;

  const updatedProduct = updateProduct(id, { title, price });

  if (!updatedProduct) {
    res.status(404).json({ error: "Product not found" });
  } else {
    res.json(updatedProduct);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
