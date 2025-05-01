import express from 'express';
import {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  updateSectionsOrder
} from '../controllers/HomepageSectionController';

const router = express.Router();

// Get all sections
router.get('/', getAllSections);

// Reorder sections - placing this BEFORE the /:id routes to prevent conflict
router.put('/reorder', updateSectionsOrder);

// Get a specific section
router.get('/:id', getSectionById);

// Create a new section
router.post('/', createSection);

// Update a section
router.put('/:id', updateSection);

// Delete a section
router.delete('/:id', deleteSection);

export default router; 