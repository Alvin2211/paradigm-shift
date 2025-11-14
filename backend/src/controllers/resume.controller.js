import { ApiError } from "../utils/ApiError.js";
//yahan model inport krio after making it 
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const parseResume = async (req, res,) => {
    try {
        if (!req.file) throw new ApiError(400, "No file uploaded");

        const tempFilePath = req.file.path;
        const originalName = req.file.originalname;

        try {
            const fileBuffer = fs.readFileSync(tempFilePath);
            const formData=new FormData();
            formData.append("file",fileBuffer,{
                filename:originalName,
                contentType:req.file.mimetype,
            });

            const pythonResponse = await axios.post(`${process.env.PYTHON_SERVICE_URL}/parse_resume`, formData, 
                {
                headers: formData.getHeaders(),
                maxBodyLength: Infinity,
                maxContentLength: Infinity
                }
            );

            const parsedData = pythonResponse.data;
            console.log(parsedData)
            res.status(200).json({
                success: true,
                data: parsedData,
            });
               
        }
        catch (pythonError) {
            console.error("Error calling Python service:", pythonError);
            throw new ApiError(500, "Failed to parse your resume :( ");
        }
        finally {
            fs.unlink(tempFilePath, (err) => {
                if (err) {
                    console.error("Error deleting tempo file:", err);
                }
            });
        }

    }
    catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: "INternal server error, failed to get the uploaded resume" || error.message,
        });
    }

}

export{ parseResume };