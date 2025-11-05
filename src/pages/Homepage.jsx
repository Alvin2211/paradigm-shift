import Navbar from "../components/Navbar"
import { useUser } from "@clerk/clerk-react"
import { Upload } from "lucide-react";
const Homepage = () => {
    const { isSignedIn, user } = useUser();


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
                            <Upload size={55} className="text-indigo-600" />

                            <p className="text-lg font-medium text-gray-800 mb-2">
                                Upload Your Resume
                            </p>
                            <p className="text-sm text-gray-500 mb-6 text-center">
                                Drag and drop file here, or click to select.<br />
                                (PDF or DOCX, max 10MB)
                            </p>

                            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold 
                        rounded-full shadow-lg shadow-indigo-500/50 transition-transform duration-150 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                                onClick={() => console.log('Simulating file browse action...')} >
                                Browse Files

                            </button>

                        </div>
                    </div>

                </div>
            </section>
        </>

    )
}

export default Homepage
