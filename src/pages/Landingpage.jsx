import Navbar from "../components/Navbar"
import Home from "../components/Home"
const Landingpage = () => {
  return (
    <div>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <section className="home ">   
            <Home />
          </section>
        </main>
      </div>
    </div>
  )
}

export default Landingpage
