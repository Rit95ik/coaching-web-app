import React from 'react';

interface ServiceProps {
  icon: React.ReactNode;
  title: string;
}

const Service = ({ icon, title }: ServiceProps) => {
  return (
    <div className="flex flex-col items-center w-full md:w-auto mx-2 mb-8 md:mb-0 px-8">
      <div className="w-[80px] h-[80px] bg-[#4B85CD] rounded-full flex items-center justify-center shadow-lg mb-4 relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-transparent opacity-60"></div>
        <div className="text-white text-2xl z-10">
          {icon}
        </div>
      </div>
      <div className="text-white text-center font-medium text-[16px] mt-3">{title}</div>
    </div>
  );
};

export default function ServicesSection() {
  const services = [
    { 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 20L9 17H7C5.89543 17 5 16.1046 5 15V6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6V15C19 16.1046 18.1046 17 17 17H15L12 20Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10V8ZM12 10C12.5523 10 13 10.4477 13 11C13 11.5523 12.5523 12 12 12V10ZM12 12C11.4477 12 11 12.4477 11 13C11 13.5523 11.4477 14 12 14V12ZM12 14H13V16H12V14Z" fill="white"/>
          <path d="M12 8V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      title: "Life Coaching" 
    },
    { 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 7L13 15L9 11L3 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 13V7H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      title: "Business Coaching" 
    },
    { 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      title: "Business Consultancy" 
    },
    { 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 15V23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 18H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 8C9 8 10 6 12 6C14 6 15 8 15 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12H9.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 12H15.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      title: "Mental Health" 
    },
    { 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3L19 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 3L5 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 12H3.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12H21.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 3H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 21H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      title: "Spiritual Awareness" 
    },
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#5598E8] rounded-3xl py-14 px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our Core Coaching Services</h2>
          
          <div className="w-full overflow-x-auto pb-4">
            <div className="flex flex-row justify-between items-center min-w-max md:min-w-0 mx-auto px-4 md:px-10 max-w-6xl">
              {services.map((service, index) => (
                <Service key={index} icon={service.icon} title={service.title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 