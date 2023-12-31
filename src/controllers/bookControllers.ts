import { Request, Response } from 'express';
import Book from '../models/Book';
import BookModel from "../models/Book"
import { validateBook } from '../middlesware/validationMiddleware';
import { validationResult } from 'express-validator';

interface QueryParams {
  title?: string; // Optional title parameter
  orderBy?: 'asc' | 'desc'; // Optional orderBy parameter with specific values
}

//get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const queryParams: QueryParams = req.query;
    let query: { title?: { $regex: string; $options: string } } = {};

      // Check if the "title" query parameter is provided
      if (queryParams.title) {
        query.title = { $regex: queryParams.title, $options: 'i' }; // Case-insensitive title search
      }

      let sort: { [key: string]: 1 | -1 } = {};


    // Check if the "orderBy" query parameter is provided
    if (queryParams.orderBy) {
      if (queryParams.orderBy === 'asc') {
        sort.title = 1; // Sort in ascending order by title
      } else if (queryParams.orderBy === 'desc') {
        sort.title = -1; // Sort in descending order by title
      }
    }

    const books = await Book.find(query).sort(sort);


    if (!books || books.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'No books found',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

//get a single book
export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    // Find the book by ID
    const book = await BookModel.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// post a new book
export const postNewBook = async (req: Request, res: Response) => {
  try {

    let { title, author, quantity, type, publicationYear } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    // Capitalize the first letter of each word in the title
    title = title
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Capitalize the first letter of each word in the author
    author = author
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

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

    res.status(201).json({
      success: true,
      status: 201,
      message: 'Book created successfully',
      data: savedBook, // Include the saved book data
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// edit a book by id
export const editBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    let { title, author, quantity, type, publicationYear } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    // Capitalize the first letter of each word in the title
    title = title
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Capitalize the first letter of each word in the author
    author = author
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Find the book by ID and update its fields
    const updatedBook = await BookModel.findByIdAndUpdate(
      bookId,
      { title, author, quantity, type, publicationYear },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// delete a book by id
export const deleteBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id; 

    // Find the book by ID and delete it
    const deletedBook = await BookModel.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Book deleted successfully',
      data: deletedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

