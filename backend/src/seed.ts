import mongoose from 'mongoose';
import dotenv from 'dotenv';
import HomepageSection from './models/HomepageSection';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coaching-website';

// Initial sections data
const initialSections = [
  {
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
        description: 'True transformation is a balance of mind, body, and purpose. These pillars represent the core areas we help you strengthen. Track your journey and celebrate your growth as you progress toward a more empowered and fulfilled life.'
      }
    }
  },
  {
    title: 'Our Story',
    description: 'At Mahpatram, we believe in the limitless potential of every individual and the power of collaboration to drive success and well-being. MAHPATRAM is dedicated to empowering individuals, businesses, and coaches to unlock their full potential. With a focus on transformation and growth, we provide holistic solutions that foster personal and professional excellence.',
    sectionType: 'about',
    order: 2,
  },
  {
    title: 'Our Clients',
    description: 'We have worked with leading companies across various sectors.',
    sectionType: 'logos',
    order: 3,
    content: {
      logos: [
        'Adira Finance',
        'Holcim',
        'MNC',
        'Telkomsel',
        'Adhamix RMC'
      ]
    }
  },
  {
    title: 'Ready to Transform Your Life or Business?',
    description: 'Join thousands who have unlocked their potential with our expert coaching. Take the first step towards a more empowered and fulfilled future today.',
    sectionType: 'cta',
    order: 4,
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await HomepageSection.deleteMany({});
    console.log('Cleared existing homepage sections');

    // Insert new data
    await HomepageSection.insertMany(initialSections);
    console.log('Seeded homepage sections successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 