import Navbar from "../components/Navbar";
import Home from "../components/Home";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/careerrecommend", { replace: true }); 
    }
  }, [isSignedIn, isLoaded]);

  if (!isLoaded) return null; 

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="landingpage">
          <Home />
        </section>
      </main>
    </div>
  );
};

export default Landingpage;