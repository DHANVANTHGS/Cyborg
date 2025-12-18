import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./auth.js";
import aiRoutes from "./ai.js";

const app = express();
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
