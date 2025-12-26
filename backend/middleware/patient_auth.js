import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import Patient from "../model/patientModel.js";
import dotenv from "dotenv";
dotenv.config();

const secretkey  = process.env.SECRET_KEY;
export const patientAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({ message: "Authorization token required" });
        }
        const decoded = jwt.verify(token, secretkey);
        const userId = decoded.user_id;
        const data = await Patient.findOne({ user_id: userId });
        if (!data) {
            return res.status(404).json({ message: "Patient not found" });
        }
        req.user_id = userId;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }   
};

export default { patientAuth };