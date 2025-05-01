import Image from "next/image";

interface HeroSectionProps {
  title?: string;
  description?: string;
  stats?: Array<{label: string, value: string}>;
  experience?: {years: string, description: string};
}

// TODO: Import and apply the specific font family used in Figma (e.g., 'Outfit' or similar sans-serif)
// Ensure font weights (e.g., 700 for bold, 400 for regular) match Figma

export default function HeroSection({ 
  title = "Discover Your Inner Strength and Create A Life You Love",
  description = "Life coaches will guide you through a transformational journey of self-discovery, helping you identify your unique gifts and talents",
  stats = [
    { label: 'Expert Coaches', value: '100' },
    { label: 'Lives Changed', value: '30K' },
    { label: 'Workshops Conducted', value: '50' }
  ],
  experience = {
    years: '10+',
    description: 'True transformation is a balance of mind, body, and purpose. These pillars represent the core areas we help you strengthen. Track your journey and celebrate your growth as you progress toward a more empowered and fulfilled life.'
  }
}: HeroSectionProps) {
  return (
    <div className="relative w-full bg-[#1A1D21] text-white py-12 md:py-16 md:pt-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-4">
        <div className="flex flex-col md:flex-row">
          {/* Left Column: Content */}
          <div className="md:w-1/2 mt-5 md:mt-10">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              {title}
            </h1>
            <p className="text-base text-gray-300 max-w-xl mt-4">
              {description}
            </p>
            <div className="mt-8">
              <button className="bg-[#5597e8] hover:bg-[#4b8ed8] text-white font-medium px-10 py-3.5 rounded-md transition-colors">
                Get Started
              </button>
            </div>
            
            {/* Stats Section */}
            <div className="flex mt-24 gap-x-16 md:gap-x-24">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-white">
                    {stat.value}<span className="text-[#5597e8]"></span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Image */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-end relative">
            <Image 
              src="/images/hero.png" 
              alt="Coach" 
              width={500}
              height={550}
              className="object-cover relative z-0"
              style={{
                objectPosition: 'top center',
                transform: 'scaleX(-1)',
              }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Experience Box */}
      <div className="absolute right-0 bottom-0 w-screen md:w-auto z-10">
        <div 
          className="flex gap-2 text-white p-8 md:w-[700px] "
          style={{
            background: 'linear-gradient(to right, #6eaaf0, #4b7ec5)',
            borderTopLeftRadius: '3rem'
          }}
        >
          <div>
            <div>
              <span className="text-[42px] font-bold leading-none">10</span>
              <span className="text-[42px] font-bold align-top leading-none">+</span>
              <span className="text-xl font-normal ml-1">Years</span>
            </div>
            
            <div className="text-[30px] font-bold mt-0">Experience</div>
          </div>
          <p className="text-base leading-relaxed ml-2" style={{ lineHeight: '1.6' }}>
            True transformation is a balance of mind, body, and purpose. These pillars represent the core areas we help you strengthen. Track your journey and celebrate your growth as you progress toward a more empowered and fulfilled life.
          </p>
        </div>
      </div>
    </div>
  );
} 