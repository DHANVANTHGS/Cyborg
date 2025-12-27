import dotenv from "dotenv";
import Docter from "../model/docterModel.js";
import crypto from "crypto";
import { Cyborg } from "../cyborg.js";
import { embed } from "../embed.js";

dotenv.config();

const secretkey = process.env.SECRET_KEY;

export const mypatients = async (req, res) => {
    try {
        const docter_id = req.user_id;
        const docterData = await Docter.findById(docter_id).populate("patients");
        if (!docterData) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        if (!docterData.patients || docterData.patients.length === 0) {
            return res.status(200).json({ patients: [] });
        }
        res.status(200).json({ patients: docterData.patients });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving patients" });
    }
};

export const D_uploadFile = async (req, res) => {
    try {
        const { default: pdfparse } = await import('pdf-parse');
        const filename = req.file.originalname;
        if (!filename) {
            return res.status(400).json({ message: "Filename required" });
        }
        const user_id = req.params.patient_id;
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
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "File upload error" });
    }
};

export const D_getreport = async (req, res) => {
    try {
        const user_id = req.params.patient_id;
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

export default { mypatients, D_uploadFile, D_getreport };