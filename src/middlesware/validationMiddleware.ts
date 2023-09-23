import { body } from 'express-validator';

export const validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be upto 1'),
  body('type').notEmpty().withMessage('Type is required'),
  body('publicationYear').notEmpty()
  .withMessage('Publication year is required')
  .isISO8601()
  .withMessage('Invalid date format. Use YYYY-MM-DD.'),
];