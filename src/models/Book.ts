import mongoose, { Document, Model, Schema } from 'mongoose';
import {isDateValid} from '../utils/index'

interface IBook extends Document {
    title: string;
    author: string;
    quantity: number;
    type: string;
    publicationYear: string;
}

const bookSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    type: {
        type: String,
        required: true
    },
    publicationYear: {
        type: String,
        required: true,
        validate: {
            validator: isDateValid,
            message: 'Invalid date format. Use YYYY-MM-DD.',
        },
    },

},
    {
        timestamps: true,
    });

const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

export default Book;