// routes/bookRoutes.ts
import express, { Router } from 'express';
import {getAllBooks, postNewBook, getBookById, editBookById, deleteBookById} from '../controllers/bookControllers';
import { validateBook } from '../middlesware/validationMiddleware';

const router: Router = express.Router();

// Define routes
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', validateBook, postNewBook)
router.put('/books/:id', validateBook, editBookById)
router.delete('/books/:id', deleteBookById)



export default router;