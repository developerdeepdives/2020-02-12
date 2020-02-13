import { Pool } from "pg";
import dotenv from "dotenv"; // For use without Docker
import { server } from "../server";

dotenv.config(); // For use without Docker

const pool = new Pool({
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USERNAME,
  keepAlive: true,
  port: Number(process.env.POSTGRES_PORT)
});

const connect = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (err) {
    throw err;
  }
};

export const pg = async (query: string, values: any[] = []) => {
  const client = await connect();
  try {
    const result = (await client.query(query, values)).rows;
  } catch (err) {
    server.log.error(err);
  } finally {
    client.release();
  }
};
