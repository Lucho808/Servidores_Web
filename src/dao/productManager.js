import fs from 'fs';
import {__dirname} from "../utils.js";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
  constructor(fileName) {
    this.path = path.join(__dirname,`/files/${fileName}`); 
  }

  fileExists(){
    return fs.existsSync(this.path);
  }

  async addProduct(product) {
    const products = this.getProductsFromFile();
    product.id = this.getNextProductId(products);
    products.push(product);
    this.saveProductsToFile(products);
    console.log('Producto agregado: ', product);
  }

  async getProducts() {
    return this.getProductsFromFile();
  }

  async getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.error('Producto no encontrado');
      return null;
    }
  }

  async updateProduct(id, updatedFields) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedFields };
      this.saveProductsToFile(products);
      console.log('Producto actualizado: ', products[productIndex]);
    } else {
      console.error('Producto no encontrado');
    }
  }

  async deleteProduct(id) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const deletedProduct = products.splice(productIndex, 1);
      this.saveProductsToFile(products);
      console.log('Producto eliminado: ', deletedProduct[0]);
    } else {
      console.error('Producto no encontrado');
    }
  }

  async getProductsFromFile() {
    try {
      const fileContent = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error('Error al leer el archivo: ', error);
      return [];
    }
  }

  async saveProductsToFile(products) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
      console.log('Productos guardados en el archivo:', this.path);
    } catch (error) {
      console.error('Error al guardar los productos: ', error);
    }
  }

  async getNextProductId(products) {
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    return lastProductId + 1;
  }
}
