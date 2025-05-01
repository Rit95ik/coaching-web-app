import Image from "next/image";

interface FeaturedLogosSectionProps {
  title?: string;
  description?: string;
  logos?: string[];
}

export default function FeaturedLogosSection({ 
  logos = ["Adira Finance", "Holcim", "MNC", "Telkomsel", "Adhamix RMC"]
}: FeaturedLogosSectionProps) {
  // Map logos to their image paths
  const logoImages = [
    { name: "Adira Finance", path: "/images/client1.png" },
    { name: "Adhamix RMC", path: "/images/client2.png" },
    { name: "Holcim", path: "/images/client3.png" },
    { name: "MNC", path: "/images/client4.png" },
    { name: "Telkomsel", path: "/images/client5.png" }
  ];
  
  return (
    <section className="w-full py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-evenly items-center flex-wrap gap-4">
          {logoImages.map((logo, index) => (
            <div
              key={index}
              className="opacity-70 hover:opacity-100 transition-opacity px-3 my-2"
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
    </section>
  );
} 