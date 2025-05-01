import { Request, Response } from 'express';
import HomepageSection, { IHomepageSection } from '../models/HomepageSection';

// Get all homepage sections
export const getAllSections = async (req: Request, res: Response): Promise<void> => {
  try {
    const sections = await HomepageSection.find().sort({ order: 1 });
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching homepage sections', error });
  }
};

// Get a single section by ID
export const getSectionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const section = await HomepageSection.findById(req.params.id);
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching section', error });
  }
};

// Create a new section
export const createSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, image, sectionType, content } = req.body;

    // Get the highest order value to place the new section at the end
    const highestOrder = await HomepageSection.findOne().sort({ order: -1 });
    const newOrder = highestOrder ? highestOrder.order + 1 : 1;

    const newSection = new HomepageSection({
      title,
      description,
      image,
      sectionType,
      order: newOrder,
      content
    });

    const savedSection = await newSection.save();
    res.status(201).json(savedSection);
  } catch (error) {
    res.status(500).json({ message: 'Error creating section', error });
  }
};

// Update a section
export const updateSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const section = await HomepageSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }

    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error updating section', error });
  }
};

// Delete a section
export const deleteSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const section = await HomepageSection.findByIdAndDelete(req.params.id);
    
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }

    // Re-order remaining sections to close the gap
    await HomepageSection.updateMany(
      { order: { $gt: section.order } },
      { $inc: { order: -1 } }
    );

    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting section', error });
  }
};

// Update the order of sections
export const updateSectionsOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sections } = req.body;
    console.log('Received reorder request:', sections);

    if (!Array.isArray(sections)) {
      console.error('Invalid sections format:', sections);
      res.status(400).json({ message: 'Sections must be an array' });
      return;
    }

    if (sections.length === 0) {
      console.error('Empty sections array received');
      res.status(400).json({ message: 'Sections array cannot be empty' });
      return;
    }

    // Validate section format
    const isValid = sections.every(section => 
      section && typeof section.id === 'string' && typeof section.order === 'number'
    );

    if (!isValid) {
      console.error('Invalid section format in array:', sections);
      res.status(400).json({ message: 'Each section must have id (string) and order (number)' });
      return;
    }

    // Update each section's order
    const updatePromises = sections.map((section: { id: string, order: number }) => {
      console.log(`Updating section ${section.id} to order ${section.order}`);
      return HomepageSection.findByIdAndUpdate(
        section.id,
        { order: section.order },
        { new: true }
      );
    });

    const results = await Promise.all(updatePromises);
    console.log('Update results:', results.map(r => r ? { id: r._id, order: r.order } : null));
    
    // Fetch the updated sections
    const updatedSections = await HomepageSection.find().sort({ order: 1 });
    
    res.status(200).json(updatedSections);
  } catch (error) {
    console.error('Error updating sections order:', error);
    res.status(500).json({ message: 'Error updating sections order', error });
  }
}; 