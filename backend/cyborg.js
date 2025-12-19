// TODO: cyborgdb package is not available or has import issues
// Temporarily using a mock implementation
// import { Client } from "cyborgdb";

export const cyborg = {
  query: async (options) => {
    console.warn("CyborgDB not configured - returning empty results");
    return { matches: [] };
  },
  createCollection: async (name) => {
    console.warn("CyborgDB not configured - mock collection created");
    return {
      add: async (items) => {
        console.log("Mock add:", items.length, "items");
      }
    };
  }
};
