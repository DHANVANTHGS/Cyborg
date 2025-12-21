import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  docter_id: { type: String, required: true },
  password: { type: String, required: true },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient"
    }
  ],
  specialization: { type: String, required: true },
  hospital: { type: String, required: true },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;