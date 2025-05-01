import express, { Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import homepageSectionRoutes from './routes/homepageSections';
import { IHomepageSection } from './models/HomepageSection';

// Initialize express
const app = express();
dotenv.config();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both default Next.js ports
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// In-memory fallback data if MongoDB connection fails
let isUsingFallbackData = false;
// Using a simple type that matches the structure we need without Document inheritance
type SectionData = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  sectionType: 'hero' | 'about' | 'logos' | 'cta';
  order: number;
  content?: Record<string, any>;
};

const fallbackSections: SectionData[] = [
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
      ]
    }
  },
  {
    _id: 'fallback-about',
    title: 'Our Story',
    description: 'At Mahpatram, we believe in the limitless potential of every individual and the power of collaboration to drive success and well-being.',
    sectionType: 'about',
    order: 2
  },
  {
    _id: 'fallback-logos',
    title: 'Our Clients',
    description: 'We have worked with leading companies across various sectors.',
    sectionType: 'logos',
    order: 3,
    content: {
      logos: ['Adira Finance', 'Holcim', 'MNC', 'Telkomsel', 'Adhamix RMC']
    }
  },
  {
    _id: 'fallback-cta',
    title: 'Ready to Transform Your Life or Business?',
    description: 'Join thousands who have unlocked their potential with our expert coaching.',
    sectionType: 'cta',
    order: 4
  }
];

// Create fallback router for when MongoDB connection fails
const fallbackRouter = express.Router();

// Get all sections
fallbackRouter.get('/', (req: Request, res: Response): void => {
  res.status(200).json(fallbackSections);
});

// Reorder sections - move this BEFORE the /:id route to prevent conflict
fallbackRouter.put('/reorder', (req: Request, res: Response): void => {
  const { sections } = req.body as { sections: { id: string, order: number }[] };
  
  if (!Array.isArray(sections)) {
    res.status(400).json({ message: 'Sections must be an array' });
    return;
  }
  
  // Update orders based on request
  sections.forEach((section: { id: string, order: number }) => {
    const index = fallbackSections.findIndex(s => s._id === section.id);
    if (index !== -1) {
      fallbackSections[index].order = section.order;
    }
  });
  
  // Sort and return
  res.status(200).json(fallbackSections.sort((a, b) => a.order - b.order));
});

// Get section by ID
fallbackRouter.get('/:id', (req: Request, res: Response): void => {
  const section = fallbackSections.findIndex(s => s._id === req.params.id);
  if (section === -1) {
    res.status(404).json({ message: 'Section not found' });
    return;
  }
  res.status(200).json(fallbackSections[section]);
});

// Update section by ID
fallbackRouter.put('/:id', (req: Request, res: Response): void => {
  // Simulate updating a section in memory
  const index = fallbackSections.findIndex(s => s._id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Section not found' });
    return;
  }
  
  fallbackSections[index] = { ...fallbackSections[index], ...req.body };
  res.status(200).json(fallbackSections[index]);
});

// Routes - we'll use either real or fallback routes based on MongoDB connection
app.use('/api/sections/fallback', fallbackRouter);

// Default route
app.get('/', (req: Request, res: Response): void => {
  res.send('Coaching Website API is running');
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coaching-website';
const PORT = process.env.PORT || 5000;

// Start server regardless of MongoDB connection
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (isUsingFallbackData) {
      console.warn('WARNING: Using fallback data as MongoDB connection failed.');
    }
  });
};

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Use actual MongoDB routes
    app.use('/api/sections', homepageSectionRoutes);
    startServer();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Starting server with fallback data...');
    isUsingFallbackData = true;
    
    // Use fallback routes
    app.use('/api/sections', fallbackRouter);
    startServer();
  });

export default app; 