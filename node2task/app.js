import express from 'express';
import productsRouter from './routes/productsRouter.js';
import compression from "compression"
const app = express();

// Middleware
app.use(express.json());
app.use(compression())
// Routes
app.use('/', productsRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
