import { useUser } from "@clerk/clerk-react"
import { Upload } from "lucide-react";
import { useState, useRef } from "react";
import { LoaderOne } from "@/components/ui/loader";
import CareerResults from "../components/CareerResults";
import { useAuth } from "@clerk/clerk-react";



const Homepage = () => {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [careerResults, setCareerResults] = useState(null);

    const resetState=()=>{
        setCareerResults(null);
        setSelectedFile(null);
        setLoading(false);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedFile(file);
        }
        else {
            setSelectedFile(null);
        }
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleSubmitClick = async () => {
        if (!isLoaded || !isSignedIn) {
            alert("User not authenticated");
            return;
        }

        const token = await getToken();
        if (!token) {
            alert("Token not found");
            return;
        }

        if (!selectedFile) {
            alert("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/uploadresume`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,

                }
            );

            const datafetched = await response.json();

            if (response.ok) {
                setCareerResults(datafetched.data);
            } else {
                console.error(datafetched);
                alert("File upload failed");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className=" bg-dot-pattern relative  min-h-screen  overflow-hidden justify bg-black  ">
                <div className=" absolute inset-0 " />
                <div className="container relative z-10 ">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-center mt-10 text-white">
                        Ready to Elevate Your{" "}
                        <span className="text-[#7c7cff] ]">
                            Career ?
                        </span>

                    </h1>

                    {!careerResults && !loading && (
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center text-neutral-200 mb-5 ">
                            Tell us about yourself {user?.firstName}
                        </h2>
                    )}
                    <div className="flex items-center justify-center ">
                        {!careerResults && !loading && (
                            <div className=" m-5 lg:w-[50vw] md:w-[70vw] flex flex-col items-center justify-center border-2 border-dashed border-neutral-600 
                                            rounded-xl p-10 cursor-pointer bg-neutral-900 hover:bg-neutral-800 transition-colors hover:scale-105 transition-transform duration-500">
                                <Upload size={55} className="text-[#7c7cff] text-shadow-2xs" />

                                <p className="text-lg font-medium text-gray-100 mb-2">
                                    Upload Your Resume
                                </p>
                                <p className="text-sm text-gray-300 mb-6 text-center">
                                    Drag and drop file here, or click to select.<br />
                                    (PDF or DOCX)
                                </p>

                                <input type="file" id="resume-input" accept=".pdf,.docx" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

                                {!selectedFile && (
                                    <button className=" px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-neutral-300 font-bold 
                        rounded-full shadow-[0px_0px_2px_2px_#7c7cff]  transition-transform duration-150 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
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
                        )}

                        {loading && (
                            <div className="flex flex-col gap-10 items-center justify-center min-h-[50vh] z-10">
                                <LoaderOne />
                                <p className="text-white mt-3 text-sm">Analyzing resume...</p>
                            </div>
                        )}
                    </div>

                </div>
                {careerResults && (
                    <CareerResults
                        careers={careerResults.careerData}
                        ats={careerResults.atsAnalysis}
                        onReset={resetState}
                    />
                )}
            </section>
        </>
    )
}

export default Homepage
