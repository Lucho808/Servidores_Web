import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class CartManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addCart(cart) {
    const carts = this.getCartsFromFile();
    cart.id = uuidv4(); // Asigna un ID único al carrito utilizando UUID
    carts.push(cart);
    this.saveCartsToFile(carts);
    console.log('Carrito agregado: ', cart);
  }

  getCarts() {
    return this.getCartsFromFile();
  }

  getCartById(id) {
    const carts = this.getCartsFromFile();
    const cart = carts.find((cart) => cart.id === id);
    if (cart) {
      return cart;
    } else {
      console.error('Carrito no encontrado');
      return null;
    }
  }

  updateCart(id, updatedFields) {
    const carts = this.getCartsFromFile();
    const cartIndex = carts.findIndex((cart) => cart.id === id);
    if (cartIndex !== -1) {
      carts[cartIndex] = { ...carts[cartIndex], ...updatedFields };
      this.saveCartsToFile(carts);
      console.log('Carrito actualizado: ', carts[cartIndex]);
    } else {
      console.error('Carrito no encontrado');
    }
  }

  deleteCart(id) {
    const carts = this.getCartsFromFile();
    const cartIndex = carts.findIndex((cart) => cart.id === id);
    if (cartIndex !== -1) {
      const deletedCart = carts.splice(cartIndex, 1);
      this.saveCartsToFile(carts);
      console.log('Carrito eliminado: ', deletedCart[0]);
    } else {
      console.error('Carrito no encontrado');
    }
  }

  addItemToCart(cartId, item) {
    const carts = this.getCartsFromFile();
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    if (cartIndex !== -1) {
      const cart = carts[cartIndex];
      item.id = uuidv4(); // Asigna un ID único al ítem utilizando UUID
      cart.items.push(item);
      this.saveCartsToFile(carts);
      console.log('Ítem agregado al carrito: ', item);
    } else {
      console.error('Carrito no encontrado');
    }
  }

  updateItemInCart(cartId, itemId, updatedItem) {
    const carts = this.getCartsFromFile();
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    if (cartIndex !== -1) {
      const cart = carts[cartIndex];
      const itemIndex = cart.items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        cart.items[itemIndex] = { ...cart.items[itemIndex], ...updatedItem };
        this.saveCartsToFile(carts);
        console.log('Ítem actualizado en el carrito: ', cart.items[itemIndex]);
      } else {
        console.error('Ítem no encontrado en el carrito');
      }
    } else {
      console.error('Carrito no encontrado');
    }
  }

  deleteItemFromCart(cartId, itemId) {
    const carts = this.getCartsFromFile();
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    if (cartIndex !== -1) {
      const cart = carts[cartIndex];
      const itemIndex = cart.items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        const deletedItem = cart.items.splice(itemIndex, 1);
        this.saveCartsToFile(carts);
        console.log('Ítem eliminado del carrito: ', deletedItem[0]);
      } else {
        console.error('Ítem no encontrado en el carrito');
      }
    } else {
      console.error('Carrito no encontrado');
    }
  }

  getCartsFromFile() {
    try {
      const fileContent = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error('Error al leer el archivo: ', error);
      return [];
    }
  }

  saveCartsToFile(carts) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
      console.log('Carritos guardados en el archivo:', this.path);
    } catch (error) {
      console.error('Error al guardar los carritos: ', error);
    }
  }
}