import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllProducts, getCartItems, getProductById, getProductsByCategory, updateProductStatus } from './controllers/productController';
import { login, createUser } from './controllers/userController';
import {
  createOrder,
  addItemToCart,
  getOrderItems,
  removeItemFromCart,
  clearCart,
} from './controllers//orderController';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Route setup

//product Routes
app.get('/api/products', getAllProducts); 
app.post('/api/products/id', getProductById);
app.put('/api/products/id/status', updateProductStatus);
app.get('/api/products/checkout', getCartItems);
app.get('/api/products/category/:category', getProductsByCategory);

//user Routes
app.post('/api/login', login);
app.post('/api/signup', createUser); 

//cart Routes
app.post('/api/cart/add', addItemToCart); 
app.post('/api/cart', getOrderItems); 
app.put('/api/cart/remove', removeItemFromCart); 
app.post('/api/cart/clear', clearCart); 
app.post('/api/orders', createOrder);

app.listen(8000, () => {
  console.log(`Server running on http://localhost:8000`);
});
