import Image from "next/image";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function AboutSection({ 
  title = "Our Story",
  subtitle = "Who we are",
  description = "At Mahpatram, we believe in the limitless potential of every individual and the power of collaboration to drive success and well-being. MAHPATRAM is dedicated to empowering individuals, businesses, and coaches to unlock their full potential. With a focus on transformation and growth, we provide holistic solutions that foster personal and professional excellence."
}: AboutSectionProps) {
  // Client logos for the top section
  const clientLogos = [
    { name: "Adira Finance", path: "/images/client1.png" },
    { name: "Adhamix RMC", path: "/images/client2.png" },
    { name: "Holcim", path: "/images/client3.png" },
    { name: "MNC", path: "/images/client4.png" },
    { name: "Telkomsel", path: "/images/client5.png" }
  ];
  
  return (
    <section className="w-full py-16 bg-white">
      {/* Client Logos Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex justify-evenly items-center flex-wrap gap-8 md:gap-12">
          {clientLogos.map((logo, index) => (
            <div
              key={index}
              className="opacity-60 hover:opacity-80 transition-opacity"
            >
              <div className="relative h-12 w-28 md:w-32">
                <Image
                  src={logo.path}
                  alt={logo.name}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* About Section with blue border */}
      <div className="max-w-7xl mx-auto px-6">
        <div className=" rounded-2xl p-6 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Left text content */}
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-[#1A1D21] mb-1">{title}</h2>
              <h3 className="text-3xl font-semibold text-[#333] mb-6">{subtitle}</h3>
              
              <div className="text-[#666] text-lg space-y-6">
                <p className="leading-relaxed">
                  At Mahpatram, we believe in the limitless potential of every individual and the power of collaboration to drive success and well-being.
                </p>
                <p className="leading-relaxed">
                  MAHPATRAM is dedicated to empowering individuals, businesses, and coaches to unlock their full potential. With a focus on transformation and growth, we provide holistic solutions that foster personal and professional excellence.
                </p>
              </div>
              
              <div className="mt-8">
                <button className="bg-[#4B94ED] hover:bg-[#3a85dd] text-white px-8 py-4 rounded-md font-medium transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Right image content */}
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
                <Image 
                  src="/images/our story.jpg" 
                  alt="Our team" 
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 