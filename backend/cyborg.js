import cyborgdb from "cyborgdb";

const { Client } = cyborgdb;

// Initialize CyborgDB client
// For local development, use http://localhost:8080
// For production, use the CyborgDB cloud endpoint
export const Cyborg = new Client({
  baseUrl: process.env.CYBORGDB_URL || "http://localhost:8080",
  apiKey: process.env.CYBORGDB_API_KEY // Optional for local dev
});
export default { Cyborg };