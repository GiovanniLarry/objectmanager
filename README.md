# Objects Manager

A full-stack web application for managing objects with real-time updates. Built with NestJS backend, MongoDB database, and Next.js frontend.

## Tech Stack

### Backend
- **NestJS** - TypeScript framework for building efficient server-side applications
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.io** - Real-time bidirectional event-based communication
- **Cloudinary** - Cloud-based image upload and management

### Frontend
- **Next.js** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible component library
- **Socket.io Client** - Real-time client-side communication

## Features

- 📝 Create objects with title, description, and image
- 🖼️ Image upload to Cloudinary cloud storage
- 📋 View all objects in a responsive grid layout
- 🔍 View detailed information about each object
- 🗑️ Delete objects (removes from MongoDB and Cloudinary)
- ⚡ Real-time updates via Socket.io
- 📱 Fully responsive design

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image storage)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "object manager"
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/objects-manager

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server
PORT=3001
```

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.local.example .env.local
```

Update the `.env.local` file:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Run the Application

Start the backend server:

```bash
# In backend directory
npm run start:dev
```

Start the frontend development server:

```bash
# In frontend directory (in a new terminal)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Endpoints

### Objects API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/objects` | Create a new object with image |
| `GET` | `/objects` | Get all objects (sorted by newest) |
| `GET` | `/objects/:id` | Get a specific object by ID |
| `DELETE` | `/objects/:id` | Delete an object by ID |

### Socket.io Events

| Event | Description |
|-------|-------------|
| `new_object` | Emitted when a new object is created |
| `delete_object` | Emitted when an object is deleted |

## Project Structure

```
object manager/
├── backend/
│   ├── src/
│   │   ├── objects/
│   │   │   ├── objects.controller.ts
│   │   │   ├── objects.service.ts
│   │   │   ├── objects.gateway.ts
│   │   │   ├── objects.module.ts
│   │   │   ├── cloudinary.service.ts
│   │   │   └── schemas/
│   │   │       └── object.schema.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   └── object/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   ├── components/ui/
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── socket.ts
│   │   │   └── utils.ts
│   │   └── globals.css
│   ├── .env.local.example
│   └── package.json
└── README.md
```

## Usage

1. **Create an Object**: Navigate to `/create` and fill in the title, description, and upload an image
2. **View Objects**: The home page displays all objects in a responsive grid
3. **View Details**: Click "View Details" on any object to see full information
4. **Delete Object**: On the detail page, click "Delete Object" to remove it
5. **Real-time Updates**: Changes are automatically reflected across all connected clients

## Development

### Running in Development Mode

Both backend and frontend support hot reloading in development mode.

```bash
# Backend (with hot reload)
npm run start:dev

# Frontend (with hot reload)
npm run dev
```

### Building for Production

```bash
# Backend
npm run build

# Frontend
npm run build
```

## Environment Variables

### Backend (.env)

- `MONGODB_URI`: MongoDB connection string
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `PORT`: Server port (default: 3001)

### Frontend (.env.local)

- `NEXT_PUBLIC_API_URL`: Backend API URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
