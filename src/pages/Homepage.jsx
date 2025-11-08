import Navbar from "../components/Navbar"
import { useUser } from "@clerk/clerk-react"
import { Upload } from "lucide-react";
import { useState, useRef } from "react";
const Homepage = () => {
    const {  user } = useUser();
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange=(e)=>{
        const file=e.target.files[0];

        if (file){
            setSelectedFile(file);
            console.log("Selected file:",file);
        }
        else{
            setSelectedFile(null);
            console.log("No file selected");
        }
    }

    const handleButtonClick=()=>{
        fileInputRef.current.click();
    }

    const handleSubmitClick= async ()=>{
            const formData=new FormData();
            formData.append("resume",selectedFile);
            try{
                const response=await fetch(`${import.meta.env.VITE_API_BASE_URI}/resume/uploadResume`,{
                    method:"POST",
                    body:formData,
                });
                if (response.ok){
                    alert("File uploaded successfully");
                    setSelectedFile(null);
                }
                else{
                    console.error("File upload failed");
                    alert("File upload failed");
                }   
            }catch(error){
                console.error("Error uploading file:",error);
                alert("Error uploading file");
            }
    };

    return (
        <>
            <Navbar />
            <section className="min-h-screen relative  overflow-hidden justify ">
                <div className="absolute inset-0 opacity-50 bg-[#e9e5f6]" />
                <div className="container relative  ">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-center mt-10 opacity-90 ">
                        Ready to Elevate Your
                        <span className="text-[#6e3fea] text-shadow-md opacity-100"> Career ?</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center text-neutral-800 mb-5 ">
                        Tell us about yourself {user?.firstName}
                    </h2>
                    <div className="flex items-center justify-center">
                        <div className=" m-5 lg:w-[50vw] md:w-[70vw] flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 
                    rounded-xl p-10 cursor-pointer bg-indigo-50/50 hover:bg-indigo-100/70 transition-colors">
                            <Upload size={55} className="text-[#6e3fea]" />

                            <p className="text-lg font-medium text-gray-800 mb-2">
                                Upload Your Resume
                            </p>
                            <p className="text-sm text-gray-500 mb-6 text-center">
                                Drag and drop file here, or click to select.<br />
                                (PDF or DOCX)
                            </p>

                            <input type="file" id="resume-input" accept=".pdf,.docx" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

                            {!selectedFile && (
                            <button className=" px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold 
                        rounded-full shadow-lg shadow-indigo-500/50 transition-transform duration-150 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                                onClick={handleButtonClick} >
                                Browse Files 
                            </button>
                            )}
                            {selectedFile && (<div className="text-center">
                                <p className="text-indigo-600 font-semibold mb-2 ">File Selected:
                                <span className="text-gray-800 "> {selectedFile.name}</span>
                                </p>
                                <button className=" mt-2 px-5 py-3 bg-indigo-600 hover:indigo-700 text-white font-bold 
                                rounded-full shadow-md shadow-indigo-500/50 transition-transform duration-150 transform 
                                hover:scale-105 focus:outline-none "
                                onClick={handleSubmitClick} >
                                    Submit
                                </button>
                            </div>
                            
                            )}
                        </div> 
                    </div>

                </div>
            </section>
        </>
    )
}

export default Homepage
