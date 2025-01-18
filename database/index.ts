import mongoose from 'mongoose';
import { mongodbURI } from '../configuration'; 

// Build the connection string
const dbURI = mongodbURI

mongoose.set('strictQuery', true);

// Create the database connection
mongoose
  .connect(dbURI)
  .then(() => {
    console.log('Mongoose connection done');
  })
  .catch((e) => {
   console.log(e)
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close().finally(() => {
   console.log("Hi from node typescript")
    process.exit(0);
  });
});

export const connection = mongoose.connection;