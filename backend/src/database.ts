import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.vrygn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const mongoOptions: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export async function startConnection() {
  try {
    const db = await mongoose.connect(MONGODB_URI, mongoOptions);
    console.log('Database is connected', db.connection.name);
  } catch (error) {
    console.log(error);
  }
}
