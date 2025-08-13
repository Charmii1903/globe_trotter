import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

/**
 * Mongoose maintains an internal cache when using Next.js hot reload.
 * We attach the connection to global to avoid creating a new connection on every request in dev.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // These options are defaults for mongoose v6+, but keeping explicit helps clarity
      bufferCommands: false,
      // useNewUrlParser, useUnifiedTopology are on by default in mongoose v6
    } as mongoose.ConnectOptions;

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;