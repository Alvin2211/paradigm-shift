import { ApiError } from "../utils/ApiError";
//yahan model inport krio after making it 
import axios from "axios";

const parseResume = async (req, res,) => {
    try {
        if (!req.file) throw new ApiError(400, "No file uploaded");

        const fileBuffer = req.file.buffer;
        const fileType = req.file.mimetype;

        try {
            const pythonResponse = await axips.post(`${process.env.PYTHON_SERVICE_URL}/parseresume`,
                fileBuffer,
                {
                    headers: {
                        "Content-Type": fileType,
                    }
                },
            );
            

        }
        catch (pythonError) {
        }

    }
    catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: "INternal server error" || error.message,
        });
    }

}

