# Coaching Website

This is a full-stack web application for a coaching website based on Next.js 14 (frontend), Node.js with TypeScript (backend), and MongoDB (database). It features a responsive homepage with dynamic sections and an admin panel for managing content.

## Features

- **Responsive Design**: Adapts to various screen sizes (mobile, tablet, desktop)
- **Dynamic Homepage Sections**: Four main sections managed via backend API
  - Hero Section with title, subtitle, and call-to-action buttons
  - About Section with introductory text and image
  - Featured Logos Section with client logos in horizontal scroll
  - CTA/Footer Section with final call to action
- **Admin Panel**: 
  - Edit content for each section
  - Drag-and-drop to reorder sections
  - Full CRUD operations for homepage content
- **MongoDB Integration**: Persistently store homepage section data
- **Modern UI**: Built with TailwindCSS and custom UI components

## Technology Stack

- **Frontend**: Next.js 14 with App Router, React 19, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Libraries**: react-beautiful-dnd (for drag-and-drop functionality)

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local installation or MongoDB Atlas account)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd coaching-website
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install --legacy-peer-deps

# Install backend dependencies
cd backend
npm install
cd ..
```

3. Configure environment variables:
   - Create a `.env` file in the `backend` directory with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/coaching-website
   ```

4. Seed the database:
```bash
cd backend
npm run seed
cd ..
```

### Running the Application

#### Development mode (with hot-reloading):
```bash
# Run both frontend and backend concurrently
npm run start:all

# Or run them separately
npm run dev        # Frontend
npm run backend    # Backend
```

#### Production mode:
```bash
# Build frontend
npm run build

# Build backend
cd backend
npm run build
cd ..

# Start both
npm start          # Frontend
npm run start:backend  # Backend
```

## Accessing the Application

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Backend API**: http://localhost:5000

## API Endpoints

- `GET /api/sections` - Get all homepage sections
- `GET /api/sections/:id` - Get a specific section
- `POST /api/sections` - Create a new section
- `PUT /api/sections/:id` - Update a section
- `DELETE /api/sections/:id` - Delete a section
- `PUT /api/sections/reorder` - Update section order
