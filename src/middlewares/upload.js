import multer from "multer";
import { UPLOAD_CONFIG } from "../config/config.js";

// Use memory storage for now to eliminate potential disk permission issues
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        ...UPLOAD_CONFIG.ALLOWED_FILE_TYPES.IMAGE,
        ...UPLOAD_CONFIG.ALLOWED_FILE_TYPES.VIDEO,
        ...UPLOAD_CONFIG.ALLOWED_FILE_TYPES.DOCUMENT
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: UPLOAD_CONFIG.MAX_FILE_SIZE
    }
});

// Export simple middleware functions
export const singleFileUpload = upload.single('file');
export const multipleFileUpload = upload.array('files', UPLOAD_CONFIG.MAX_FILES_PER_MESSAGE);

export default upload;