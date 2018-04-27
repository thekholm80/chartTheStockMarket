import dotenv from 'dotenv';

// load .env file into system memory
dotenv.config();

export const PORT = process.env.PORT;
export const API_KEY = process.env.API_KEY;
