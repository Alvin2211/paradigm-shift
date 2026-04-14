import { div } from 'motion/react-client'
import React from 'react'
import Navbar from '@/components/Navbar.jsx'
import GenRoadmap from '@/components/GenRoadmap.jsx'
const Roadmap = () => {
  return (
    <div className='bg-black min-h-screen'>
      <Navbar />
      <GenRoadmap />
    </div>
  )
}

export default Roadmap
