// routes/bookRoutes.ts
import express, { Router } from 'express';
import {getAllBooks, postNewBook} from '../controllers/bookControllers';
import { validateBook } from '../middlesware/validationMiddleware';

const router: Router = express.Router();

// Define routes
router.get('books', getAllBooks);
router.post('books', validateBook, postNewBook)



export default router;