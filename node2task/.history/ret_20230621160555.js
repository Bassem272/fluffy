import express from "express";
import fetch from 'node-fetch';

import { object, string, number, array } from "zod";

const app = express();
app.use(express.json());

let products = [[
    {
        "id": 245,
        "title": "kachu",
        "price": 1,
        "description": "A descriptionhhuhu",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T07:54:25.000Z",
        "updatedAt": "2023-06-21T10:49:16.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 276,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:12.000Z",
        "updatedAt": "2023-06-21T08:21:12.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 277,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:13.000Z",
        "updatedAt": "2023-06-21T08:21:13.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 278,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:15.000Z",
        "updatedAt": "2023-06-21T08:21:15.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 279,
        "title": "New Product",
        "price": 102798,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:17.000Z",
        "updatedAt": "2023-06-21T10:40:32.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 280,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:18.000Z",
        "updatedAt": "2023-06-21T08:21:18.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 281,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:26.000Z",
        "updatedAt": "2023-06-21T08:21:26.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 282,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:31.000Z",
        "updatedAt": "2023-06-21T08:21:31.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 283,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:34.000Z",
        "updatedAt": "2023-06-21T08:21:34.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 284,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:36.000Z",
        "updatedAt": "2023-06-21T08:21:36.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 285,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:39.000Z",
        "updatedAt": "2023-06-21T08:21:39.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 286,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:41.000Z",
        "updatedAt": "2023-06-21T08:21:41.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 287,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:44.000Z",
        "updatedAt": "2023-06-21T08:21:44.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 288,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:46.000Z",
        "updatedAt": "2023-06-21T08:21:46.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 289,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:48.000Z",
        "updatedAt": "2023-06-21T08:21:48.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 290,
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T08:21:50.000Z",
        "updatedAt": "2023-06-21T08:21:50.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 291,
        "title": "New Product 291",
        "price": 291,
        "description": "A description",
        "images": [
            "https://w7.pngwing.com/pngs/895/199/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png"
        ],
        "creationAt": "2023-06-21T08:40:01.000Z",
        "updatedAt": "2023-06-21T08:57:30.000Z",
        "category": {
            "id": 2,
            "name": "Electronics",
            "image": "https://picsum.photos/640/640?r=8421",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 292,
        "title": "chhota",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T09:40:18.000Z",
        "updatedAt": "2023-06-21T09:40:18.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 293,
        "title": "come on daddy",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T09:41:43.000Z",
        "updatedAt": "2023-06-21T09:41:43.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 294,
        "title": "zalo",
        "price": 10,
        "description": "A description",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T09:58:48.000Z",
        "updatedAt": "2023-06-21T09:58:48.000Z",
        "category": {
            "id": 1,
            "name": "Clothes",
            "image": "https://picsum.photos/640/640?r=4763",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    },
    {
        "id": 295,
        "title": "Another title",
        "price": 14000,
        "description": "Boring",
        "images": [
            "https://placeimg.com/640/480/any"
        ],
        "creationAt": "2023-06-21T10:10:32.000Z",
        "updatedAt": "2023-06-21T12:23:43.000Z",
        "category": {
            "id": 2,
            "name": "Electronics",
            "image": "https://picsum.photos/640/640?r=8421",
            "creationAt": "2023-06-21T06:37:02.000Z",
            "updatedAt": "2023-06-21T06:37:02.000Z"
        }
    }
]];

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
      return res.status(404).json({ error: "Product not found" });
    }

    product.title = productData.title || title || product.title;
    product.price = productData.price || price || product.price;
    product.updatedAt = new Date();

    return res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
