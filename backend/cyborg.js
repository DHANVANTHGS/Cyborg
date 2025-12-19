import pkg from "cyborgdb";
const { CyborgClient }= pkg;
export const cyborg = new CyborgClient({
  persistPath: "./cyborg-data"   // local storage
});
