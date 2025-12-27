import express from "express";
import { mypatients, D_uploadFile, D_getreport } from "../controller/docter_patient.js";
import { doctorAuth } from "../middleware/docterauth.js";
import { getdocterprofile, updateprofile, d_login, d_signup } from "../controller/docter.js";
import { docter_patient_auth } from "../middleware/docter_patient_auth.js";
import { upload } from "../middleware/filemiddleware.js";

const router = express.Router();

router.post("/login", d_login);
router.post("/signup", d_signup);
router.get("/profile", doctorAuth, getdocterprofile);
router.put("/profile", doctorAuth, updateprofile);
router.get("/mypatients", doctorAuth, mypatients);
router.post("/uploadrecord/:patient_id", doctorAuth, docter_patient_auth, upload.single("file"), D_uploadFile);
router.get("/getrecord/:patient_id", doctorAuth, docter_patient_auth, D_getreport);

export default router;  