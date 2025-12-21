import express from "express";
import { P_uploadFile, P_getreport, getProfile, updateProfile, login, signup } from "../controller/patient.js";
import { generateAIResponse } from "../controller/ai.js";
import { patientAuth } from "../middleware/patient_auth.js";
import { upload } from "../middleware/filemiddleware.js";

const Router = express.Router();

Router.post("/login", login);
Router.post("/signup", signup);
Router.get("/profile", patientAuth, getProfile);
Router.put("/profile", patientAuth, updateProfile);
Router.post("/upload", patientAuth, upload.single("file"), P_uploadFile);
Router.get("/getreport", patientAuth, P_getreport);
Router.post("/ask", patientAuth, generateAIResponse);

export default Router;      
