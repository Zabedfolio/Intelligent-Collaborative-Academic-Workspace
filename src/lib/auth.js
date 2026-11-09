import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable. Please define it in your .env.local file.');
}

const client = new MongoClient(uri);
const db = client.db(process.env.MONGODB_DB_NAME || 'icaw-db');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'student',
        required: false,
        input: true
      },
      department: {
        type: 'string',
        required: false,
        input: true
      },
      semester: {
        type: 'string',
        required: false,
        input: true
      }
    }
  }
});
