import { ApiError } from "../utils/ApiError.js";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { Resume } from "../models/resume.model.js";

const parseResume = async (req, res,) => {
    try {
        const userId = req.auth?.userId;    
        if (!userId) throw new ApiError(400, "not authenticated");

        if (!req.file) throw new ApiError(400, "No file uploaded");

        const tempFilePath = req.file.path;
        const originalName = req.file.originalname;

        try {
            const fileBuffer = fs.readFileSync(tempFilePath);
            const formData = new FormData();
            formData.append("file", fileBuffer, {
                filename: originalName,
                contentType: req.file.mimetype,
            });

            const pythonResponse = await axios.post(`${process.env.PYTHON_SERVICE_URL}/parse_resume`, formData,
                {
                    headers: formData.getHeaders(),
                    maxBodyLength: Infinity,
                    maxContentLength: Infinity
                }
            );

            const rawData = pythonResponse.data;
            const resumeData = Array.isArray(rawData)
                ? rawData
                : rawData.career_recommend
                ?? rawData.careers
                ?? rawData.career_options
                ?? Object.values(rawData)[0];

            if (!Array.isArray(resumeData)) {
                throw new ApiError(500, "Unexpected response format from LLM service");
            }

            const savedResume = await Resume.findOneAndUpdate(
                { userId },
                { resumeData },
                { new: true, upsert: true }
            );

            res.status(200).json({
                success: true,
                data: savedResume,
            });

        } catch (innerError) {
            if (innerError instanceof ApiError) throw innerError;
            console.error("Error calling Python service:", innerError);
            throw new ApiError(500, "Failed to parse and run LLM on your resume");
        } finally {
            fs.unlink(tempFilePath, (err) => {
                if (err) console.error("Error deleting temp file:", err);
            });
        }

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

export { parseResume };