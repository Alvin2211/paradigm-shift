import { useState } from 'react'
import { Brain, Menu, X } from 'lucide-react';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className=' relative top-0 left-0 right-0 z-50 bg-background  border-b-1 border-neutral-200 
     backdrop-blur-sm '>
      <div className='flex-col w-full'>
        <div className="flex my-1.5 items-center justify-between max-w-7xl mx-1.5">

          <div className='flex  items-center gap-2 p-2'>
            <div className='p-1.5 bg-[#6e3fea] rounded-xl flex justify-center items-center' >
              <Brain className='text-white h-5 w-5  ' size={32} />
            </div>
            <span className='font-bold text-xl justify-center items-center'> CareerAI</span>
          </div>

          <nav className='hidden md:flex flex-1 justify-center items-center gap-8 text-md text-neutral-600'>
            <a href="#home" className='hover:text-[#6e3fea] '>Home </a>
            <a href="#profile" className='hover:text-[#6e3fea]'>Profile Builder </a>
            <a href="#career" className='hover:text-[#6e3fea]'>Career Paths </a>
            <a href="#chat" className='hover:text-[#6e3fea]'>AI Chat </a>
            <a href="#chat" className='hover:text-[#6e3fea]'>Guest Sign In </a>
          </nav>

          <div className='hidden md:flex gap-5 '>
            <div className='flex justify-center items-center py-2 px-4 rounded-lg hover:bg-[#6e3fea]
           hover:text-white text-md hover:transition-all duration-300 '>
              <button className='font-semibold hover:font-normal'> Sign In</button>
            </div>
            <div className='flex justify-center items-center bg-[#6e3fea] rounded-lg p-2 
          text-white text-md hover:shadow-sm hover:scale-105 transition-all duration-300'>
              <button> Get Started </button>
            </div>
          </div>

          <button className='md:hidden p-2'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className='w-6 h-6 text-neutral-600' />
            ) : (
              <Menu className='w-6 h-6 text-neutral-600' />
            )}
          </button>

        </div>

        {isMenuOpen && (
            <div className=" py-4 w-full border-t border-neutral-200 ">
              <nav className="flex flex-col items-center gap-4 ">
                <a href="#home" className=" text-neutral-600 hover:text-[#6e3fea]">Home</a>
                <a href="#profile" className=" text-neutral-600 hover:text-[#6e3fea]">Profile Builder</a>
                <a href="#career" className=" text-neutral-600 hover:text-[#6e3fea]">Career Paths</a>
                <a href="#chat" className=" text-neutral-600 hover:text-[#6e3fea]">AI Chat</a>
                <a href="#chat" className=" text-neutral-600 hover:text-[#6e3fea]">Guest Sign In</a>
                <div className='flex flex-col gap-3 mt-4 w-full px-4 border-t border-neutral-200'>
                  <button className=' text-semibold w-full py-2 rounded-lg bg-transparent hover:bg-[#6e3fea]
           hover:text-white text-md hover:transition-all duration-300'>Sign In</button> 
                  <button className='w-full py-2 rounded-lg bg-[#6e3fea] text-white
                    hover:shadow-sm hover:scale-105 transition-all duration-300 border-t border-neutral-200 '>Get Started</button>
                </div>
              </nav>
            </div>
          )}
      </div>

    </header>
  )
}

export default Navbar
