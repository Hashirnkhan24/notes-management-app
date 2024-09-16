import jwt from 'jsonwebtoken';
import prisma from '../models/prisma.js';

const secretKey = process.env.SECRET_KEY;

// Create Note
export const createNote = async (req, res) => {
  const authHeader = req.headers['authorization'];  

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  const token = authHeader.split(' ')[1]; 

  try {
    const decoded = jwt.verify(token, secretKey); 
    const { content } = req.body;  
    const note = await prisma.note.create({
      data: {
        content,
        userId: decoded.userId,  
      },
    });

    res.status(201).json(note);  
  } catch (error) {
    res.status(400).json({ error: 'Unable to create note' });
  }
};

// Get notes 
export const getNotes = async (req, res) => {
  const authHeader = req.headers['authorization'];  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey); 

    const notes = await prisma.note.findMany({
      where: {
        userId: decoded.userId, 
      },
    });

    res.json(notes); 
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch notes' });
  }
};
