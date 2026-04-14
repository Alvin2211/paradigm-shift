import Navbar from "../components/Navbar";
import ResumeUploader from "../components/ResumeUploader";

const Homepage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <ResumeUploader />
    </div>
  );
};

export default Homepage;