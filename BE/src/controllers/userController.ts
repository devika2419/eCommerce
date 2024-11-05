// userController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../config/db'; 
import { RowDataPacket } from 'mysql2';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    try {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);
      const user = rows[0];
  
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token, userId: user.id }); // Include userId in the response
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Signup function
export const createUser = (req: Request, res: Response): void => {
  const { username, password } = req.body; 

  (async () => {
    try {
      const [existingUserRows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);

      if (existingUserRows.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

      console.log('User created successfully!');
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  })();
};
