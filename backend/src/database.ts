import mongoose, { ConnectOptions } from 'mongoose'

const MONGODB_URI = "mongodb+srv://admin:admin-mongo@cluster0.vrygn.mongodb.net/ecommerce?retryWrites=true&w=majority";
const mongoOptions: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export async function startConnection() {
  await mongoose.connect(MONGODB_URI, mongoOptions);
  console.log('Database is connected');
}
