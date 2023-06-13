const products = [
    {
      "id": 4,
      "title": "Handmade Fresh Table",
      "price": 687,
      "description": "Andy shoes are designed to keeping in...",
      "category": {
        "id": 5,
        "name": "Others",
        "image": "https://placeimg.com/640/480/any?r=0.591926261873231"
      }
    },
    {
      "id": 5,
      "title": "Handmade Fresh Table",
      "price": 687,
      "description": "Andy shoes are designed to keeping in...",
      "category": {
        "id": 5,
        "name": "Others",
        "image": "https://placeimg.com/640/480/any?r=0.591926261873231"
      }
    },
    {
      "id": 6,
      "title": "Test Product",
      "price": 999,
      "description": "This is a test product.",
      "category": {
        "id": 6,
        "name": "Test category",
        "image": "https://placeimg.com/640/480/any?r=0.591926261873231"
      }
    },
    // ... other products
  ];
  
  const categorizedProducts = {};
  
  products.forEach(product => {
    const categoryId = product.category.id;
    if (!categorizedProducts[categoryId]) {
      categorizedProducts[categoryId] = [];
    }
    categorizedProducts[categoryId].push(product);
  });
  
  console.log(categorizedProducts);
  P