import { Request, Response } from 'express';
import pool from '../config/db';
import { ResultSetHeader } from 'mysql2';

// Create a new order from the cart
export const createOrder = async (req: Request, res: Response) => {
  const { userId, items, totalPrice } = req.body;

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO orders (user_id, status, total_price) VALUES (?, ?, ?)',
      [userId, 'Pending', totalPrice]
    );

    // Insert each item in the order
    await Promise.all(items.map(async (item: { product_id: number; quantity: number; total: number }) => {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, total) VALUES (?, ?, ?, ?)',
        [result.insertId, item.product_id, item.quantity, item.total]
      );
    }));

    res.status(201).json({ orderId: result.insertId, status: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Add an item to the cart
export const addItemToCart = async (req: Request, res: Response) => {
  const { userId, productId} = req.body; 

  try {
    const [result] = await pool.query(
      'INSERT INTO cart (user_id, product_id) VALUES (?, ?)',
      [userId, productId]
    );
    res.status(201).json({ message: 'Item added to cart successfully', result });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Get all items in the user's cart
export const getOrderItems = async (req: Request, res: Response) => {
  const { userId } = req.body; 

  try {
    const [rows] = await pool.query(
      'SELECT p.id, p.name, p.price, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?',
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (req: Request, res: Response) => {
  const { userId, productId } = req.body; 

  try {
    await pool.query(
      'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};

// Clear the user's cart
export const clearCart = async (req: Request, res: Response) => {
  const { userId } = req.body; 

  try {
    await pool.query('DELETE FROM cart WHERE user_id = ?', [userId]);
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};
