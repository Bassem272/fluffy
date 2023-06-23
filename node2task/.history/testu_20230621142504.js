import express from 'express';
import productsRouter from './routes/productsRouter.js';
import { object, string, number, array } from 'zod';

const schema2 = object({
    title: string(),
    price: number(),
    
  });

const app = express();

// Middleware
app.use(express.json());



// Routes
app.use('/api/v1/products',  (req, res) =>{

    try {
      productsModel.validate2(req.body); 
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
    const id = parseInt(req.params.id);
    const { title, price } = req.body;

    const updatedProduct = productsModel.updateProduct(id, { title, price });

    if (!updatedProduct) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(updatedProduct);
    }
  },);




// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
