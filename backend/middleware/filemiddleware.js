import multer from "multer";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: (req, file, cb) => {
        if(!file.mimetype.includes("pdf")){
            return cb(new Error("Only PDF files are allowed"), false);
        }
        cb(null, true);
    }
})

export default { upload };