import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import { Cyborg } from "../cyborg.js";
import { embed } from "../embed.js";
import Patient from "../model/patientModel.js";

dotenv.config();

const secretkey = process.env.SECRET_KEY;

export const P_uploadFile = async (req, res) => {
    try {
        const { default: pdfparse } = await import('pdf-parse');
        const filename = req.file.originalname;
        if (!filename) {
            return res.status(400).json({ message: "Filename required" });
        }
        const user_id = req.user_id;
        const file = req.file.buffer;
        const data = await pdfparse(file);
        const text = data.text;
        const document_id = crypto.randomUUID();
        const words = text.split(/\s+/);
        const chunkSize = 500;
        const overlap = 100;
        const cyborg = new Cyborg();
        let chunk_index = 0;
        for (let i = 0; i < words.length; i += chunkSize - overlap) {
            const chunk = words.slice(i, i + chunkSize).join(" ");
            const vector = await embed(chunk);
            await cyborg.insert({
                collection: "medical_records",
                vector,
                metadata: {
                    user_id,
                    document_id,
                    filename,
                    chunk_index,
                    text: chunk
                }
            });
            chunk_index++;
        }
        res.status(200).json({ message: "File uploaded and processed successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "File upload error" });
    }
};
export const P_getreport = async (req, res) => {
    try {
        const user_id = req.user_id;
        const cyborg = new Cyborg();
        const result = await cyborg.query({
            collection: "medical_records",
            filter: { user_id },
            topK: 1000
        });
        const reports = {};
        for (const match of result.matches) {
            const { filename, document_id, chunk_index, text } = match.metadata;
            if (!reports[document_id]) {
                reports[document_id] = {
                    filename,
                    chunks: []
                };
            }
            reports[document_id].chunks.push({
                chunk_index,
                text
            });
        }
        res.status(200).json({ reports });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving reports" });
    }
};

export const signup = async (req, res) => {
    try {
        const { mail, name, password } = req.body;
        if (!name || !mail || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await Patient.findOne({ name: name });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const round = 10;
        const hashedPassword = await bcrypt.hash(password, round);
        const newPatient = new Patient({
            name,
            mail,
            password: hashedPassword
        });
        await newPatient.save()
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { mail, password } = req.body;
        if (!mail || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }
        const data = await Patient.findOne({ mail: mail });
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
        const verify = await bcrypt.compare(password, data.password);
        if (!verify) {
            return res.status(400).json({ message: "invalid password" });
        }
        const token = jwt.sign({ user_id: data._id }, secretkey, { expiresIn: "1h" });
        return res.json({ token, message: "logged in successfully" });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user_id = req.user_id;
        const data = await Patient.findById(user_id);
        if (!data) {
            return res.status(400).json({ message: "data not found" });
        }
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { mail, name } = req.body;
        const user_id = req.user_id;
        const data = await Patient.findById(user_id);
        if (!data) {
            return res.status(400).json({ message: "data not found" });
        }
        data.name = name;
        data.mail = mail;
        await data.save();
        return res.status(200).json({ message: "Profile updated successfully", data: data });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default { P_uploadFile, P_getreport, login, signup, getProfile, updateProfile };  
