import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose'; // Import ConnectOptions
import bookRoutes from './routes/bookRoutes';
import dotenv from 'dotenv';

dotenv.config();
const mongoURI = process.env.MONGO_URI;

const app: Application = express();
const port = process.env.PORT || 8080;

if (!mongoURI) {
    console.error('MongoDB URI is not defined in environment variables.');
    process.exit(1); // Exit the application if the URI is not defined
  }

// Connect to MongoDB
mongoose.connect(mongoURI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use(express.json());

// Use book routes
app.use('/api', bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});