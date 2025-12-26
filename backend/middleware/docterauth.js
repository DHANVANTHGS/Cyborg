import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import Docter from "../model/docterModel.js";
import dotenv from "dotenv";
dotenv.config();

const secretkey = process.env.SECRET_KEY;
export const doctorAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token required" });
        }
        const decoded = jwt.verify(token, secretkey);
        const userId = decoded.user_id;
        const data = await Docter.findOne({ user_id: userId });
        if (!data) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        req.user_id = userId;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default { doctorAuth };