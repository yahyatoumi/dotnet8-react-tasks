# dotnet8-react-tasks

A full-stack ticket management application built with .NET 8 and Next.js.

## Technologies Used

- **Backend**: .NET 8 with Entity Framework
- **Frontend**: Next.js/React (TypeScript)
- **Database**: 
  - PostgreSQL (Docker environments)
  - SQLite (Local development)
- **Infrastructure**: 
  - Nginx (Reverse proxy)
  - Docker
- **UI/State**: 
  - TailwindCSS
  - Redux Toolkit

## Features

- **Ticket Management**
  - Full CRUD functionality
  - Status tracking (Open/Closed)
  - Search and filtering
  - Pagination
  - Client-side validation
  
- **UI/UX**
  - Responsive design
  - Searching capabilities
  - Modern styling with TailwindCSS

## Branches & Setup

### Main Branch (`localhost:3000`)
Uses SQLite for local development
```bash
# Requirements: .NET 8, npm

#terminal 1:
make client

#terminal 2:
make server
```

### Dev-with-Docker (`localhost:8080`)
Development environment with PostgreSQL
```bash
# Requirements: Docker
make
```

### Prod-with-Docker (`localhost:8080`)
Production-ready setup with PostgreSQL
```bash
# Requirements: Docker
make
```

## Infrastructure
- Nginx reverse proxy in Docker environments
- Containerized services for easy deployment
- Database persistence with volume mounting

## Development Notes
- Main branch accessible on `localhost:3000`
- Docker environments accessible on `localhost:8080`
- Each branch includes appropriate configuration and database setup
- Ensure that ports `3000` and `8080` are free for use on your machine.