'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface Section {
  _id: string;
  title: string;
  description: string;
  sectionType: 'hero' | 'about' | 'logos' | 'cta';
  order: number;
  content?: Record<string, any>;
  image?: string;
}

export default function AdminPanel() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeTab, setActiveTab] = useState<string>('sections');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch sections on component mount
  useEffect(() => {
    const fetchSections = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/sections');
        if (!response.ok) {
          throw new Error('Failed to fetch sections');
        }
        const data = await response.json();
        setSections(data);
      } catch (err) {
        setError('Error fetching sections');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSections();
  }, []);

  // Handle drag and drop to reorder sections
  const handleDragEnd = async (result: DropResult) => {
    // If dropped outside the list or no destination
    if (!result.destination) return;

    // If dropped in the same position
    if (result.destination.index === result.source.index) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order property of each section
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    // Optimistically update the UI immediately
    setSections(updatedItems);
    
    // Show loading state
    setSuccessMessage(null);
    setError(null);

    // Log the data being sent
    console.log('Sending reorder data:', {
      sections: updatedItems.map(item => ({
        id: item._id,
        order: item.order,
      }))
    });

    // Send the updated order to the backend
    try {
      const reorderData = {
        sections: updatedItems.map(item => ({
          id: item._id,
          order: item.order,
        })),
      };
      
      console.log('Sending reorder data:', reorderData);
      
      const response = await fetch('http://localhost:5000/api/sections/reorder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reorderData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Reorder response error:', response.status, errorData);
        throw new Error(`Failed to update sections order: ${response.status}`);
      }
      
      // Set a timestamp in localStorage to trigger homepage refresh
      localStorage.setItem('homepage_sections_updated', Date.now().toString());
      
      setSuccessMessage('Sections reordered successfully!');
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error updating sections order:', err);
      setError('Error updating sections order');
      
      // Revert to original order on error
      const response = await fetch('http://localhost:5000/api/sections');
      if (response.ok) {
        const data = await response.json();
        setSections(data);
      }
    }
  };

  // Handle section edit
  const handleSectionEdit = async (sectionId: string, updatedData: Partial<Section>) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sections/${sectionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update section');
      }

      const updatedSection = await response.json();
      setSections(prevSections =>
        prevSections.map(section =>
          section._id === sectionId ? updatedSection : section
        )
      );
    } catch (err) {
      setError('Error updating section');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Mahpatram Admin Panel</h1>
            <a href="/" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 transition-colors">
              Back to Website
            </a>
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        </header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="space-y-6">
            <TabsList className="bg-white p-1 rounded-lg shadow-sm border border-gray-200 w-full flex">
              <TabsTrigger 
                value="sections" 
                className="flex-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-md py-3"
                onValueChange={setActiveTab}
              >
                All Sections
              </TabsTrigger>
              <TabsTrigger 
                value="hero" 
                className="flex-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-md py-3"
                onValueChange={setActiveTab}
              >
                Hero
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className="flex-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-md py-3"
                onValueChange={setActiveTab}
              >
                About
              </TabsTrigger>
              <TabsTrigger 
                value="logos" 
                className="flex-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-md py-3"
                onValueChange={setActiveTab}
              >
                Logos
              </TabsTrigger>
              <TabsTrigger 
                value="cta" 
                className="flex-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-md py-3"
                onValueChange={setActiveTab}
              >
                CTA/Footer
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sections" activeValue={activeTab}>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Manage Sections</h2>
                <p className="text-gray-600 mb-6">Drag and drop to reorder sections on the homepage.</p>
                
                {successMessage && (
                  <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
                    {successMessage}
                  </div>
                )}

                {error && (
                  <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    {error}
                  </div>
                )}
                
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-3"
                      >
                        {sections
                          .sort((a, b) => a.order - b.order)
                          .map((section, index) => (
                            <Draggable key={section._id} draggableId={section._id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className="bg-gray-50 hover:bg-gray-100 p-5 rounded-lg border border-gray-200 flex justify-between items-center transition-colors group"
                                >
                                  <div className="flex items-center gap-4">
                                    <div 
                                      {...provided.dragHandleProps}
                                      className="text-gray-400 group-hover:text-gray-600 cursor-grab active:cursor-grabbing hover:scale-110 transition-all"
                                      title="Drag to reorder"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="9" cy="12" r="1"></circle>
                                        <circle cx="9" cy="5" r="1"></circle>
                                        <circle cx="9" cy="19" r="1"></circle>
                                        <circle cx="15" cy="12" r="1"></circle>
                                        <circle cx="15" cy="5" r="1"></circle>
                                        <circle cx="15" cy="19" r="1"></circle>
                                      </svg>
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-800">{section.title}</div>
                                      <div className="text-sm text-gray-500 capitalize">
                                        Type: {section.sectionType}
                                        <span className="ml-2 text-blue-500">Order: {section.order}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button 
                                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                      onClick={() => setActiveTab(section.sectionType)}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </TabsContent>
            
            <TabsContent value="hero" activeValue={activeTab}>
              <SectionEditForm 
                section={sections.find(s => s.sectionType === 'hero')} 
                onSave={handleSectionEdit} 
              />
            </TabsContent>
            
            <TabsContent value="about" activeValue={activeTab}>
              <SectionEditForm 
                section={sections.find(s => s.sectionType === 'about')} 
                onSave={handleSectionEdit} 
              />
            </TabsContent>
            
            <TabsContent value="logos" activeValue={activeTab}>
              <LogosSectionEditForm 
                section={sections.find(s => s.sectionType === 'logos')} 
                onSave={handleSectionEdit} 
              />
            </TabsContent>
            
            <TabsContent value="cta" activeValue={activeTab}>
              <SectionEditForm 
                section={sections.find(s => s.sectionType === 'cta')} 
                onSave={handleSectionEdit} 
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

// Generic section edit form component
function SectionEditForm({ section, onSave }: { section?: Section, onSave: (id: string, data: Partial<Section>) => Promise<void> }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    if (section) {
      setTitle(section.title);
      setDescription(section.description);
    }
  }, [section]);
  
  if (!section) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex justify-center items-center h-64">
        <p className="text-gray-500">Section not found</p>
      </div>
    );
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      await onSave(section._id, { title, description });
      setSuccessMessage('Changes saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving changes', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Edit {section.sectionType.charAt(0).toUpperCase() + section.sectionType.slice(1)} Section</h2>
        {section.sectionType === 'hero' && (
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Homepage Header</span>
        )}
        {section.sectionType === 'about' && (
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Company Info</span>
        )}
        {section.sectionType === 'cta' && (
          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">Call to Action</span>
        )}
      </div>
      
      {successMessage && (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Special form for the logos section
function LogosSectionEditForm({ section, onSave }: { section?: Section, onSave: (id: string, data: Partial<Section>) => Promise<void> }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [logos, setLogos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    if (section) {
      setTitle(section.title);
      setDescription(section.description);
      setLogos(section.content?.logos || []);
    }
  }, [section]);
  
  if (!section) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex justify-center items-center h-64">
        <p className="text-gray-500">Section not found</p>
      </div>
    );
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      await onSave(section._id, { 
        title, 
        description,
        content: {
          ...section.content,
          logos
        }
      });
      setSuccessMessage('Changes saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving changes', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleLogoChange = (index: number, value: string) => {
    const newLogos = [...logos];
    newLogos[index] = value;
    setLogos(newLogos);
  };
  
  const addLogo = () => {
    setLogos([...logos, '']);
  };
  
  const removeLogo = (index: number) => {
    setLogos(logos.filter((_, i) => i !== index));
  };
  
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Edit Logos Section</h2>
        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Client Showcase</span>
      </div>
      
      {successMessage && (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="font-medium text-gray-700">Client Logos</label>
            <button
              type="button"
              onClick={addLogo}
              className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-1 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Logo
            </button>
          </div>
          
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
            {logos.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No logos added yet. Click the button above to add one.</p>
            ) : (
              logos.map((logo, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <div className="bg-gray-200 rounded-lg px-3 py-2 text-gray-800 font-medium w-10 flex justify-center">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={logo}
                    onChange={(e) => handleLogoChange(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Company name"
                  />
                  <button
                    type="button"
                    onClick={() => removeLogo(index)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    title="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}