import { Request, Response } from 'express';
import Book from '../models/Book';
import BookModel from "../models/Book"
import { validateBook } from '../middlesware/validationMiddleware';
import { validationResult } from 'express-validator';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const postNewBook = async (req: Request, res: Response) => {
  try {
  
    const { title, author, quantity, type, publicationYear } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new book document
    const newBook = new BookModel({
      title,
      author,
      quantity,
      type,
      publicationYear,
    });

    // Save the book to the database
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};