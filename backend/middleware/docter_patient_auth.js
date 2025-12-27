import jwt from "jsonwebtoken";
import Docter from "../model/docterModel.js";
import dotenv from "dotenv";
dotenv.config();
import Patient from "../model/patientModel.js";

const secretkey = process.env.SECRET_KEY;

export const docter_patient_auth = async (req, res, next) => {
    try {
        const docter_id = req.user_id;
        const patient_id = req.params.patient_id;
        const docterData = await Docter.findById(docter_id);
        if (!docterData) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        const patientData = await Patient.findById(patient_id);
        if (!patientData) {
            return res.status(404).json({ message: "Patient not found" });
        }
        const doctorHasPatient = docterData.patients.some((p) => p.toString() === patient_id);
        const patientHasDoctor = patientData.assignedDoctors.some((d) => d.toString() === docter_id);

        if (!doctorHasPatient || !patientHasDoctor) {
            return res.status(403).json({ message: "Access denied to this patient's data" });
        }
        req.userId = docter_id;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default { docter_patient_auth };