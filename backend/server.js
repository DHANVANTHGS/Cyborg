import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routers/auth.js";
import aiRoutes from "./routers/ai.js";

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url} from ${req.ip}`);
  next(); // Pass control to the next middleware/route handler
});

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
