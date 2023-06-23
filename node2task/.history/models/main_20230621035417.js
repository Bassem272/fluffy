import express from "express";
import bodyParser from "body-parser";
import productRoutes from "../routes/route.js";

const app = express();
app.use(bodyParser.json());

app.use("/products", productRoutes);

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});


const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/products', productsRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
