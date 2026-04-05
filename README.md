# Unit Management Frontend

A Next.js frontend application for managing hotel units with a modern, responsive UI built with React, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js 18+ and yarn
- Backend API running at `http://localhost:8080` (See [Unit API](../unit-api/README.md))
- Git

## Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/reinatakidd/hotel-unit-management
cd frontend
yarn install
```

## Environment Configuration

Create a `.env.local` file in the project root with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Adjust the API URL based on your backend setup.

## Running Locally

### 1. Start the Development Server

```bash
yarn dev
```

The application will start on `http://localhost:3000`.

### 2. Build for Production

```bash
yarn build
yarn start
```

### 3. Linting

Check for code quality issues:

```bash
yarn lint
```

---

## Running with Docker

### 1. Build and Start Services

From the project root directory:

```bash
docker-compose up --build
```

This will:

- Build the frontend image from the Dockerfile
- Start the Next.js container on port 3000
- Link to the backend API (ensure it's running on localhost:8080)

### 2. Access the Application

The application is available at `http://localhost:3000`.

### 3. Stop Services

```bash
docker-compose down
```

---

## Architecture

The application follows a modular component-based architecture:

- **app/** - Next.js App Router pages and layouts
- **components/** - Reusable React components organized by feature
  - `layout/` - Layout components (Sidebar, etc.)
  - `modal/` - Modal dialogs (NewUnitModal, etc.)
  - `unit-management/` - Unit management specific components
- **services/** - API service layer (unitService)
- **hooks/** - Custom React hooks (useUnits)
- **constants/** - Application constants (API endpoints, etc.)
- **types/** - TypeScript type definitions
- **utils/** - Utility functions and helpers

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx      # Navigation sidebar
│   ├── modal/
│   │   └── NewUnitModal.tsx # Create/edit unit modal
│   └── unit-management/
│       ├── UnitManagementContent.tsx
│       ├── UnitManagementDesktopTable.tsx
│       ├── UnitManagementMobileList.tsx
│       └── UnitManagementNavbar.tsx
├── services/
│   └── unitService.ts       # API calls for units
├── hooks/
│   └── useUnits.tsx         # Custom hook for unit management
├── types/
│   └── unit.ts              # Unit type definitions
├── constants/
│   └── api.ts               # API configuration
└── utils/                   # Utility functions
```

## Technology Stack

| Technology   | Version | Purpose                                    |
| ------------ | ------- | ------------------------------------------ |
| Next.js      | 16.2.2  | React framework with server-side rendering |
| React        | 19.2.4  | UI library                                 |
| TypeScript   | 5+      | Type-safe JavaScript                       |
| Tailwind CSS | 4.2.2   | Utility-first CSS framework                |
| Axios        | 1.14.0  | HTTP client for API requests               |
| ESLint       | 9+      | Code quality and linting                   |

## Environment Variables

| Variable              | Default                     | Description          |
| --------------------- | --------------------------- | -------------------- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080/api` | Backend API base URL |

## Available Scripts

| Command      | Description                                      |
| ------------ | ------------------------------------------------ |
| `yarn dev`   | Start development server (http://localhost:3000) |
| `yarn build` | Build for production                             |
| `yarn start` | Start production server                          |
| `yarn lint`  | Run ESLint to check code quality                 |

## Features

- **Responsive Design** - Mobile-first responsive UI with separate desktop and mobile components
- **Unit Management** - Create, read, update, and delete hotel units
- **Real-time Updates** - Custom hooks for reactive state management
- **Type Safety** - Full TypeScript support throughout the application
- **Modern Styling** - Tailwind CSS for rapid UI development

## Troubleshooting

### Development: "Cannot GET /" or blank page

1. Ensure the development server is running: `yarn dev`
2. Check that `http://localhost:3000` is accessible
3. Clear browser cache (Ctrl+Shift+Delete in most browsers)
4. Check browser console for errors (F12)

### Build Errors

1. Ensure all dependencies are installed: `yarn install`
2. Clear cache: `rm -r .next` (Windows: `rmdir /s /q .next`)
3. Reinstall dependencies: `rm -r node_modules && yarn install`

### API Connection Issues

1. Verify backend API is running on `http://localhost:8080`
2. Check `NEXT_PUBLIC_API_URL` in `.env.local` matches your backend URL
3. Ensure CORS is properly configured on the backend
4. Check browser Network tab (F12) for API request errors

### Docker Build Failures

1. Ensure Docker and Docker Compose are installed and running
2. Clean up old containers: `docker-compose down -v`
3. Rebuild: `docker-compose up --build`
4. Check Docker logs: `docker-compose logs frontend`
