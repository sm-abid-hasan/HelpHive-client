
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing. Add it to your .env.local file.");
}

const globalForMongo = globalThis;
const client = globalForMongo._helphiveMongoClient ?? new MongoClient(process.env.MONGODB_URI);
if (process.env.NODE_ENV !== "production") globalForMongo._helphiveMongoClient = client;

const db = client.db(process.env.MONGODB_DB || "helphive");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db),
  trustedOrigins: [process.env.BETTER_AUTH_URL],


  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },


  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },


  plugins: [jwt()],
});
