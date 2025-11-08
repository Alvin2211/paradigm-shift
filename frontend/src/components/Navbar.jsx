import { useState,useEffect, use } from 'react';
import { Brain, Menu, X } from 'lucide-react';
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isSignedIn}=useUser();
  const navigate= useNavigate();
  useEffect(() => {
    if (isSignedIn) {
      navigate('/profile');
    } 
  }, [isSignedIn, navigate]);


  return (
    <header className="relative top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 backdrop-blur-sm">
      <div className="flex-col w-full">
          
        {/* Top Navbar Row */}
        <div className="flex my-2 items-center justify-between max-w-7xl mx-auto px-4">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#6e3fea] rounded-xl flex justify-center items-center">
              <Brain className="text-white h-5 w-5" />
            </div>
            <span className="font-bold text-xl">CareerAI</span>
          </div>

          {/* Desktop Center Nav Links */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-md text-neutral-600">
            <a href="/" className="hover:text-[#6e3fea]">Home</a>
            <a href="#profile" className="hover:text-[#6e3fea]">Profile Builder</a>
            <a href="#career" className="hover:text-[#6e3fea]">Career Paths</a>
            <a href="#chat" className="hover:text-[#6e3fea]">AI Chat</a>
          </nav>

          {/* Desktop Right Side Buttons */}
          <div className="hidden md:flex gap-5">

            {/* Show these when SIGNED OUT */}
            <SignedOut>
              <SignInButton redirectUrl="/profile">
                <button className="font-semibold py-2 px-4 rounded-lg hover:bg-[#6e3fea] hover:text-white">
                  Sign In
                </button>
              </SignInButton>

              <SignInButton mode="modal" redirectUrl="/profile">
                <button className="bg-[#6e3fea] text-white py-2 px-4 rounded-lg hover:scale-105 transition">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>

            {/* Show this when SIGNED IN */}
            <SignedIn>
              <div className='bg-black flex items-center rounded-lg justify-center '>
              <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn> 
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-neutral-600" /> : <Menu className="w-6 h-6 text-neutral-600" />}
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="py-4 w-full border-t border-neutral-200 md:hidden">
            <nav className="flex flex-col items-center gap-4 text-neutral-700">
              <a href="/" className="hover:text-[#6e3fea]">Home</a>
              <a href="#profile" className="hover:text-[#6e3fea]">Profile Builder</a>
              <a href="#career" className="hover:text-[#6e3fea]">Career Paths</a>
              <a href="#chat" className="hover:text-[#6e3fea]">AI Chat</a>

              {/* Mobile Signed Out */}
              <SignedOut>
                <div className="flex flex-col gap-3 w-full px-6 mt-2">
                  <SignInButton>
                    <button className="w-full py-2 rounded-lg hover:bg-[#6e3fea] hover:text-white border">
                      Sign In
                    </button>
                  </SignInButton>

                  <SignInButton mode="modal">
                    <button className="w-full py-2 rounded-lg bg-[#6e3fea] text-white hover:scale-105 transition">
                      Get Started
                    </button>
                  </SignInButton>
                </div>
              </SignedOut>

              {/* Mobile Signed In */}
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;
