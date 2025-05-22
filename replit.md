# Project Overview

This is a modern Google Drive file manager application called "DriveHub" built with a full-stack TypeScript architecture. The application provides a responsive interface for managing Google Drive files with features like file preview, upload, organization, and advanced filtering.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React-based SPA with TypeScript
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build System**: Vite for frontend, esbuild for backend
- **Styling**: Tailwind CSS with shadcn/ui components
- **External APIs**: Google Drive API integration

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI
- **Styling**: Tailwind CSS with custom Google Drive-inspired theme
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for optimized bundling

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Shared TypeScript schema definitions

### Authentication & External Services
- **Google APIs**: Direct integration with Google Drive API
- **Storage**: Google Cloud Storage integration for file handling
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **Server Processing**: Express routes handle API requests and business logic
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **External APIs**: Server communicates with Google Drive API for file operations
5. **Response Handling**: Client updates UI based on server responses

### File Management Flow
- Users authenticate with Google Drive through the frontend
- File operations (list, upload, download, preview) go through Google Drive API
- Metadata and user preferences stored in PostgreSQL
- Real-time updates handled through query invalidation

## External Dependencies

### Core Dependencies
- **@google-cloud/storage**: Google Cloud Storage integration
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **cmdk**: Command palette functionality

### Development Dependencies
- **vite**: Frontend build tool with HMR
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling
- **drizzle-kit**: Database schema management

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with Replit integration
- **Database**: PostgreSQL 16 module
- **Development Server**: Vite dev server with Express backend
- **Hot Reload**: Enabled for both frontend and backend

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: esbuild creates optimized server bundle
- **Deployment**: Autoscale deployment target on Replit
- **Port Configuration**: Server runs on port 5000, exposed on port 80

### Database Configuration
- **Schema Location**: `./shared/schema.ts`
- **Migrations**: Generated in `./migrations` directory
- **Connection**: Environment variable `DATABASE_URL` required

### File Structure
```
├── client/           # React frontend application
├── server/           # Express backend application
├── shared/           # Shared TypeScript definitions
├── migrations/       # Database migration files
└── dist/            # Production build output
```

The application is designed to be cloud-native with serverless database support and can scale horizontally based on demand.