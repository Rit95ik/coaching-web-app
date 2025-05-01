import Image from 'next/image';
import Link from 'next/link';

// TODO: Import and apply the specific font family used in Figma (e.g., 'Outfit' or similar sans-serif)
// You might need to add it in globals.css or layout.tsx

export default function Navbar() {
  return (
    // Use exact background color from Figma: #1A1D21
    <nav className="w-full bg-[#1A1D21] text-white py-5 pt-18">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          {/* Text-based logo since logo.png doesn't exist */}
          <Link href="/">
            <div className="flex flex-col">
              <h1 className="text-[26px] italic font-medium font-serif text-white">MahPatram</h1>
              <div className="text-[9px] text-[#A0A0A0] tracking-[0.15em] uppercase font-medium ml-[1px] mt-[-2px]">ART OF KNOWLEDGE AND WISDOM</div>
            </div>
          </Link>
        </div>

        {/* Navigation Links: Use exact font, size, weight, color, spacing from Figma */}
        {/* TODO: Use the correct font class for links */}
        <div className="hidden md:flex items-center space-x-8 font-sans">
          {/* Home link styling (Active state assumed) */}
          <Link href="/" className="text-white hover:text-gray-300 transition-colors font-medium text-[15px]">Home</Link>
          {/* Other links styling */}
          <Link href="#" className="text-[#C0C0C0] hover:text-white transition-colors font-normal text-[15px]">Coaching</Link>
          <Link href="#" className="text-[#C0C0C0] hover:text-white transition-colors font-normal text-[15px]">Events & Retreat</Link>
          <Link href="#" className="text-[#C0C0C0] hover:text-white transition-colors font-normal text-[15px]">About Us</Link>
          <Link href="#" className="text-[#C0C0C0] hover:text-white transition-colors font-normal text-[15px]">Courses</Link>
          <Link href="#" className="text-[#C0C0C0] hover:text-white transition-colors font-normal text-[15px]">Blogs</Link>
          <Link href="#" className="text-[#C0C0C0] hover:text-white transition-colors font-normal text-[15px]">Media & Press</Link>
          <Link href="#" className="text-[#C0C0C0] hover:text-white transition-colors font-normal text-[15px]">Contact Us</Link>
        </div>

        {/* Mobile Menu Button - Style if needed based on Figma's mobile design */}
        <div className="md:hidden">
          <button className="text-white p-2 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
} 