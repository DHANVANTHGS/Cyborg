import express from "express";
import bodyParser from "body-parser";
import docterRoutes from "./routers/docterRouter.js";
import patientRoutes from "./routers/patientRouter.js";


const app = express();
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
