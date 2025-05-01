import Image from "next/image";

interface CoachProps {
  name: string;
  experience: string;
  imagePath: string;
}

const Coach = ({ name, experience, imagePath }: CoachProps) => {
  return (
    <div className="flex-1 px-2 mb-8">
      <div className="bg-[#262626] rounded-md overflow-hidden pb-6 h-full flex flex-col items-center relative border-b-4 border-[#4B94ED]">
        <div className="flex justify-center mt-8 mb-4">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-white p-[3px] border-2 border-white">
            <Image 
              src={imagePath} 
              alt={name}
              width={114}
              height={114}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        
        <div className="text-center px-4">
          <h3 className="font-bold text-2xl text-white mb-3">{name}</h3>
          <p className="text-[14px] text-gray-300 text-center leading-relaxed px-4">{experience}</p>
        </div>
      </div>
    </div>
  );
};

export default function CoachesSection() {
  const coaches = [
    { 
      name: "Dianne Russell", 
      experience: "More than 20 years of experience in the field architecture and has worked on project up to 100+",
      imagePath: "/images/coach1.jpg"
    },
    { 
      name: "Dianne Russell", 
      experience: "More than 20 years of experience in the field architecture and has worked on project up to 100+",
      imagePath: "/images/coach2.jpg"
    },
    { 
      name: "Dianne Russell", 
      experience: "More than 20 years of experience in the field architecture and has worked on project up to 100+",
      imagePath: "/images/coach3.jpg"
    },
    { 
      name: "Dianne Russell", 
      experience: "More than 20 years of experience in the field architecture and has worked on project up to 100+",
      imagePath: "/images/coach4.jpg"
    }
  ];
  
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#1A1D21]">Meet Our Awesome Coach</h2>
        
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 mx-auto">
          {coaches.map((coach, index) => (
            <Coach 
              key={index} 
              name={coach.name} 
              experience={coach.experience} 
              imagePath={coach.imagePath}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 