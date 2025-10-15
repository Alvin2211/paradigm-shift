import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
function App() {
  
  
  return (
    <div className='min-h-screen'>
      <Navbar />
      <main>
        <section className='home '>
          <Home />
        </section>
      </main>
    </div>
  )
}

export default App
