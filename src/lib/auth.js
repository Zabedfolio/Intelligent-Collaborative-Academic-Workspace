import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://icaw:a9BBgoQw0QyP49JT@cluster0.mldxc9s.mongodb.net/icaw-db?retryWrites=true&w=majority&appName=Cluster0';

// Initialize MongoClient for Atlas cluster with transaction support
const client = new MongoClient(uri);
const db = client.db('icaw-db');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  secret: process.env.BETTER_AUTH_SECRET || 'fat9tJqh9YeJGJdWthH9mITybYc9i21L',
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
