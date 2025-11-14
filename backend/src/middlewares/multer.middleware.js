import multer from "multer";

const resumestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() +'-'+file.originalname);
    }
});

const upload = multer({ storage: resumestorage });
export default upload;
