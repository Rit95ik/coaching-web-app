'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import CoachesSection from "@/components/CoachesSection";
import FooterCTASection from "@/components/FooterCTASection";

/**
 * Represents a dynamic section that can be managed from the admin panel.
 * 
 * The desired section order is:
 * 1. Hero (dynamic)
 * 2. About (with logos included) (dynamic)
 * 3. Services (static)
 * 4. Coaches (static)
 * 5. CTA/Footer (dynamic)
 */
interface DynamicSection {
  _id: string;
  title: string;
  description: string;
  sectionType: 'hero' | 'about' | 'logos' | 'cta' | 'services' | 'coaches';
  order: number;
  content?: Record<string, any>;
  image?: string;
}

export default function Home() {
  const [sections, setSections] = useState<DynamicSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  const fetchSections = async () => {
    try {
      setIsLoading(true);
      console.log('Attempting to fetch sections from backend...');
      
      const response = await fetch('http://localhost:5000/api/sections', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch sections: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);
      
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid data format received from API');
      }
      
      setSections(data.sort((a: DynamicSection, b: DynamicSection) => a.order - b.order));
    } catch (err) {
      console.error('Error fetching sections:', err);
      setError(`Failed to load content: ${err instanceof Error ? err.message : 'Unknown error'}. Make sure the backend server is running on port 5000.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchSections();
    
    // Get the initial lastUpdate value from localStorage
    const storedLastUpdate = localStorage.getItem('homepage_sections_updated');
    if (storedLastUpdate) {
      setLastUpdate(storedLastUpdate);
    }
    
    // Set up a storage event listener to detect changes from admin panel
    const handleStorageChange = () => {
      const newLastUpdate = localStorage.getItem('homepage_sections_updated');
      if (newLastUpdate && newLastUpdate !== lastUpdate) {
        console.log('Detected section updates, refreshing data...');
        setLastUpdate(newLastUpdate);
        fetchSections();
      }
    };
    
    // Check for updates every 5 seconds
    const intervalId = setInterval(handleStorageChange, 5000);
    
    // Clean up
    return () => {
      clearInterval(intervalId);
    };
  }, [lastUpdate]);

  // Use fallback data if backend is not available
  const useFallbackData = () => {
    console.log('Using fallback data...');
    return [
      { 
        _id: 'fallback-hero', 
        title: 'Discover Your Inner Strength and Create A Life You Love',
        description: 'Life coaches will guide you through a transformational journey of self-discovery, helping you identify your unique gifts and talents',
        sectionType: 'hero',
        order: 1,
        content: {
          stats: [
            { label: 'Expert Coaches', value: '100+' },
            { label: 'Lives Changed', value: '30K+' },
            { label: 'Workshops Conducted', value: '50+' }
          ],
          experience: {
            years: '10+',
            description: 'True transformation is a balance of mind, body, and purpose. These pillars represent the core areas we help you strengthen.'
          }
        }
      },
      {
        _id: 'fallback-about',
        title: 'Our Story',
        description: 'At Mahpatram, we believe in the limitless potential of every individual and the power of collaboration to drive success and well-being.',
        sectionType: 'about',
        order: 2,
        content: {
          subtitle: 'Who we are',
          // Logo information is now part of AboutSection
          logos: ['Adira Finance', 'Holcim', 'MNC', 'Telkomsel', 'Adhamix RMC']
        }
      },
      {
        _id: 'fallback-cta',
        title: 'Ready to Transform Your Life or Business?',
        description: 'Join thousands who have unlocked their potential with our expert coaching.',
        sectionType: 'cta',
        order: 3
      }
    ] as DynamicSection[];
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // If there's an error, show error but also render fallback data
  const displaySections = error ? useFallbackData() : sections;

  // Render dynamic sections based on their order
  const renderSections = () => {
    // Create an array to hold sections in proper order
    const renderedSections = [];
    
    // Navbar should be the first component
    renderedSections.push(<Navbar key="navbar" />);
    
    // Add error message if there is one
    if (error) {
      renderedSections.push(
        <div key="error" className="w-full max-w-7xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg my-6" role="alert">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
            </svg>
            <p><strong>Error: </strong> <span>{error}</span></p>
          </div>
        </div>
      );
    }
    
    // Create a complete sections array that includes both dynamic and static sections
    const completeSections = [...displaySections];
    
    // Add static sections to the array if they don't exist
    if (!completeSections.some(s => s.sectionType === 'services')) {
      completeSections.push({
        _id: 'static-services',
        title: 'Services',
        description: 'Our coaching services',
        sectionType: 'services',
        // Place after About section by default
        order: Math.max(
          ...completeSections
            .filter(s => s.sectionType === 'about')
            .map(s => s.order + 1),
          // If no About section, place it in the middle
          ...completeSections
            .filter(s => s.sectionType === 'hero')
            .map(s => s.order + 1), 
          // Fallback to position 3
          3
        )
      });
    }
    
    // Find the maximum existing order value
    const maxOrder = Math.max(...completeSections.map(s => s.order), 0);
    
    // Find the CTA section order
    const ctaOrder = completeSections.find(s => s.sectionType === 'cta')?.order || (maxOrder + 2);
    
    if (!completeSections.some(s => s.sectionType === 'coaches')) {
      completeSections.push({
        _id: 'static-coaches',
        title: 'Coaches',
        description: 'Our expert coaches',
        sectionType: 'coaches',
        // Ensure coaches section appears after services but before CTA
        order: Math.min(
          ctaOrder - 1,  // Always before CTA
          Math.max(
            // After Services section
            ...(completeSections.some(s => s.sectionType === 'services') 
              ? completeSections
                  .filter(s => s.sectionType === 'services')
                  .map(s => s.order + 1)
              : []),
            // Fallback position before CTA
            ctaOrder - 1
          )
        )
      });
    }
    
    // Sort ALL sections by their order
    const sortedSections = completeSections.sort((a, b) => a.order - b.order);
    
    // Now render each section in the sorted order
    sortedSections.forEach(section => {
      switch (section.sectionType) {
        case 'hero':
          renderedSections.push(
            <HeroSection 
              key={section._id}
              title={section.title}
              description={section.description}
              stats={section.content?.stats}
              experience={section.content?.experience}
            />
          );
          break;
        case 'about':
          renderedSections.push(
            <AboutSection 
              key={section._id}
              title={section.title}
              subtitle={section.content?.subtitle || "Who we are"}
              description={section.description}
            />
          );
          break;
        case 'services':
          renderedSections.push(<ServicesSection key="services" />);
          break;
        case 'coaches':
          renderedSections.push(<CoachesSection key="coaches" />);
          break;
        case 'cta':
          renderedSections.push(
            <FooterCTASection
              key={section._id}
              title={section.title}
              description={section.description}
            />
          );
          break;
      }
    });
    
    return (
      <>
        {renderedSections}
      </>
    );
  };

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-white">
      {renderSections()}
    </main>
  );
}
