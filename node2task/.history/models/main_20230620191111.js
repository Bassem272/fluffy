import express from "express";
import bodyParser from "body-parser";
import productRoutes from "../routes/";

const app = express();
app.use(bodyParser.json());

app.use("/products", productRoutes);

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
