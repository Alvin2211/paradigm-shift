import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Landingpage from './pages/Landingpage.jsx'
import Homepage from './pages/Homepage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  
  
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Homepage />} />
        <Route path="/" element={<Landingpage/>}/>
      </Routes>
    </Router>
    
  )
}

export default App
