import express from "express";
import bodyParser from "body-parser";
import docterRoutes from "./routers/docterRouter.js";
import patientRoutes from "./routers/patientRouter.js";
import cors from "cors";
import connectDB from "./config/config.js"; 
import dotenv from "dotenv";

dotenv.config();

connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url} from ${req.ip}`);
  next(); 
});

app.use("/api/docter", docterRoutes);
app.use("/api/patient",patientRoutes);  

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
