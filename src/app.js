import express from 'express';
import { ProductManager } from './config/productManager.js';

const app = express();
const port = 8080;
const productManager = new ProductManager('./src/data/products.json');

app.get('/products', async (req, res) => {

    const limit = req.query.limit;
    const prods = await productManager.getProducts()
    const limite = parseInt(limit)
    if (limite) { //Si es un string no numerico, me devuelve NaN. Un NaN en un if es falso
        if (limite < 0) {
            res.send("Ingrese un numero valido para los queries")
        } else {
            const prodsLimit = prods.slice(0, parseInt(limit))
            res.send(prodsLimit)
        }

    } else {
        res.send("Ingrese un valor valido en los Queries")
    }
});

  app.get('/products/:id', async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await productManager.getProductById(productId);
      res.send(prod);
  });
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });