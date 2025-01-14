import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js';

const router = express.Router();

router.route('/').post(protect, createItem).get(protect, getItems);

router
  .route('/:id')
  .get(protect, getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

export default router;
