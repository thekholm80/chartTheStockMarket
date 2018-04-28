import dotenv from 'dotenv';

// load .env file into system memory
dotenv.config();

export const { PORT, API_KEY } = process.env;
