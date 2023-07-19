import express from 'express';

import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from './routes/carts.routes.js';

const app = express();
const port = 8080;

//routes
app.use('/api/products', productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`)});