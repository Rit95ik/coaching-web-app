import { Button } from "@/components/ui/button";

interface FooterCTASectionProps {
  title?: string;
  description?: string;
}

export default function FooterCTASection({ 
  title = "Ready to Transform Your Life or Business?",
  description = "Join thousands who have unlocked their potential with our expert coaching. Take the first step towards a more empowered and fulfilled future today."
}: FooterCTASectionProps) {
  return (
    <section className="w-full bg-gradient-to-r from-[#3e65c2] to-[#6041a5] text-white py-16 mt-0">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center max-w-3xl leading-tight">{title}</h2>
        <p className="text-lg text-center max-w-2xl mt-5 text-gray-200 leading-relaxed">{description}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="px-8 py-3 bg-white text-indigo-800 font-medium rounded-md hover:bg-indigo-50 transition">
            Get Started
          </button>
          <button className="px-8 py-3 border border-white/80 text-white hover:bg-white/10 font-medium rounded-md transition">
            Contact Us
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-6 border-t border-[#4c5cb3]/30">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-blue-200">
            &copy; {new Date().getFullYear()} Mahpatram. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-blue-200 hover:text-white">Terms</a>
            <a href="#" className="text-blue-200 hover:text-white">Privacy</a>
            <a href="#" className="text-blue-200 hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </section>
  );
} 