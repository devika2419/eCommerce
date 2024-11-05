import { Request, Response } from 'express';
import pool from '../config/db';
import { Product } from '../models/Product';
import { RowDataPacket } from 'mysql2';




export const getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("Inside function getAllProducts")
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  console.log("Inside getProductById")
  console.log("This is the id:-",id)

  try {
    const [rows] = await pool.query<Product[] & RowDataPacket[]>('SELECT * FROM products WHERE id = ?', [id]);

    if (rows) {
      res.json(rows[0]);
      return;
    }

    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const updateProductStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  const { status } = req.body;
  console.log("Inside updateProductStatus")

  try {
    await pool.query('UPDATE products SET status = ? WHERE id = ?', [status, id]);
    res.status(200).json({ message: 'Product status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product status', error });
  }
};

export const getCartItems = async (req: Request, res: Response): Promise<void> => {
  
  console.log("Inside getCartItems")

  

  try {
    const [rows] = await pool.query<Product[] & RowDataPacket[]>('SELECT * FROM products WHERE status= "cart"');

    if (rows) {
      res.json(rows);
      return;
    }

    res.status(404).json({ message: 'Products not found' });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  const { category } = req.params;

  try {
    const [products] = await pool.query('SELECT * FROM products WHERE category = ?', [category]);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};