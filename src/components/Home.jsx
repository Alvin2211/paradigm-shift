import { Sparkles } from "lucide-react"
import img1 from '../images/img1.jpg'

const Home = () => {
    return (
        <>
            <section  className="relative  min-h-screen   overflow-hidden justify pt-10 ">
                <div className="absolute inset-0 opacity-50 bg-[#e9e5f6]" />

                <div className="container relative z-10 mx-auto px-4 itmes-center ">
                    <div className="grid lg:grid-cols-2 md:gap-12 items-center  gap-8 ">
                        <div className="text-center lg:text-left ">
                            <div className="inline-flex gap-2 font-semibold items-center bg-[#e1d9f7] rounded-full px-4 py-2 text-[#6e3fea] mb-8 ">
                                <Sparkles className="h-4 w-4 " />
                                AI Powered Career Guidance
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 ">
                                Discover Your Perfect
                                <span className="text-[#6e3fea] text-shadow-md"> Career Path</span>
                            </h1>
                            <p className="text-xl text-neutral-500 mb-8">
                                Get personalized career recommendations, skill gap analysis, and learning roadmaps
                                powered by AI. Transform your potential into your future.
                            </p>
                            <div className=" inline-flex gap-6 md:flex-row flex-col mb-8">
                                <button className="border-transparent rounded-lg bg-[#6e3fea] py-2 px-8 text-white font-medium hover:scale-105 transition duration-300">
                                    Start Your Journey {'\u2192'}
                                </button>
                                <button className="border-1 rounded-lg bg-white py-2 px-8 border-neutral-300 font-medium hover:scale-105 transition duration-300">
                                    Watch Demo
                                </button>
                            </div>
                        </div>

                        <div className="relative w-full mx-auto mt-10 mb-5">
                            <div className="relative ">
                                <img src={img1} alt="purely for visual purposes " className=" border-transparent rounded-2xl" />
                            </div>

                            <div className=" hidden md:block absolute -top-6 -right-6 bg-[#f1ecff] shadow-sm p-4 animate-pulse rounded-xl  ">
                                <div className="text-sm text-black font-bold"> AI Match Found</div>
                                <div className="text-xs text-black font-medium"> Data Scientist</div>
                            </div>

                            <div className="hidden md:block absolute -bottom-6 -left-6 bg-[#c5b2f7] shadow-sm p-4 rounded-xl opacity-95">
                                <div className="text-sm text-black font-bold">Skill Gap Identified</div>
                                <div className="text-xs text-black font-medium">Python, Machine Learning</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
