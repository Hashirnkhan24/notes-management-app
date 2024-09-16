import express from 'express';
import { createNote, getNotes } from '../controllers/noteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/notes', authMiddleware, createNote);
router.get('/notes', authMiddleware, getNotes);

export default router;
