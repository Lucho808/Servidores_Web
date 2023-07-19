import { Router } from "express";
import { CartManager } from "../dao/cartManager.js";
import { ProductManager } from "../dao/productManager.js";

const cartService = new CartManager("carts.json");
const productService = new ProductManager("products.json");

const router = Router();

router.post("/", async(req,res)=>{
    try {
        const cartCreated = await cartService.save();
        res.json({status:"success", data:cartCreated});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.get("/:cid", (req,res)=>{});

router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        // const cart = await cartService.getById(cartId);
        // const product = await productService.getById(productId);
        //verificar si el producto ya existe en ese carrito
        //condicion
        //si existe el producto, a ese producto a la cantidad le suman 1

        //si no existe el producto, agregar el nuevo producto al carrito
            // const newProduct = {
            //     product:productId,
            //     quantity:1
            // }
            // cartId.products.push(newProduct);

        //actualizar el carrito
        // await cartService.update(cartId, cart);
        res.json({status:"success", data:cartCreated});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

export {router as cartsRouter}



/* import { Router } from 'express';
import { CartManager } from '../dao/cartManager.js';
import { ProductManager } from '../dao/productManager.js';

const cartService = new CartManager("carts.json");
const productService = new ProductManager("products.json");

const router = Router();

router.get('/', async (req, res) => {
  const carts = await cartService.getCarts();
  res.json(carts);
});

router.get('/:cid', async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartService.getCartById(cid);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

router.post('/', (req, res) => {
  const newCart = req.body;
  cartService.addCart(newCart);
  res.json({ message: 'Carrito creado exitosamente' });
});

router.put('/:cid', async (req, res) => {
  const cid = req.params.cid;
  const updatedCart = req.body;
  await cartService.updateCart(cid, updatedCart);
  res.json({ message: 'Carrito actualizado exitosamente' });
});

router.delete('/:cid', async (req, res) => {
  const cid = req.params.cid;
  await cartService.deleteCart(cid);
  res.json({ message: 'Carrito eliminado exitosamente' });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const newItem = req.body;
  await cartService.addItemToCart(cid, newItem);
  res.json({ message: 'Ítem agregado al carrito exitosamente' });
});

router.put('/:cid/items/:itemId', async (req, res) => {
  const cid = req.params.cid;
  const itemId = req.params.itemId;
  const updatedItem = req.body;
  await cartService.updateItemInCart(cid, itemId, updatedItem);
  res.json({ message: 'Ítem actualizado en el carrito exitosamente' });
});

router.delete('/:cid/items/:itemId', async (req, res) => {
  const cid = req.params.cid;
  const itemId = req.params.itemId;
  await cartService.deleteItemFromCart(cid, itemId);
  res.json({ message: 'Ítem eliminado del carrito exitosamente' });
});

export {router as cartsRouter} */