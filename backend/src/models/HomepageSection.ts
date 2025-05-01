import mongoose, { Document, Schema } from 'mongoose';

export interface IHomepageSection extends Document {
  title: string;
  description: string;
  image?: string;
  sectionType: 'hero' | 'about' | 'logos' | 'cta';
  order: number;
  content?: Record<string, any>;
}

const HomepageSectionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  sectionType: { 
    type: String, 
    required: true,
    enum: ['hero', 'about', 'logos', 'cta']
  },
  order: { type: Number, required: true },
  content: { type: Schema.Types.Mixed }
}, {
  timestamps: true
});

export default mongoose.model<IHomepageSection>('HomepageSection', HomepageSectionSchema); 