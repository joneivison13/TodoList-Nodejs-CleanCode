# TodoList API

Welcome to the TodoList API documentation. This project is a robust Todo List API built with Prisma, Express, and TypeScript, designed to help you manage your tasks efficiently and effectively.

## Prerequisites

Before you begin, ensure you have Node.js version 20 installed on your system to run this project successfully.

## Configuration

To configure the environment for the TodoList API, you need to set up the environment variables. Create a `.env` file in the root directory and add the following configurations:

```plaintext
DATABASE_URL=your_database_url
PORT=3333
JWT_KEY=your_jwt_key
JWT_REFRESH_KEY=your_jwt_refresh_key
JWT_EXPIRES=7d
JWT_REFRESH_EXPIRES=7d
```

Replace `your_database_url`, `your_jwt_key`, and `your_jwt_refresh_key` with your actual database URL and JWT secrets.

## Installation

To install the necessary packages, run the following command:

```bash
npm install
```

After the installation is complete, you can start the server with:

```bash
npm start
```

## Documentation

For a detailed overview of the available API routes and their usage, visit the route documentation at:

```
http://localhost:3333/api-docs
```

## Project Structure

The TodoList API project is organized into several directories:

- `docs/`: Contains documents and project documentation.
- `logs/`: Stores log files for the project.
  - `logs/combined.log`: All logs of the project.
  - `logs/error.log`: All error logs of the project.
  - `logs/info.log`: All informational logs of the project.
- `prisma/`: Default directory for Prisma.
- `src/`: Source code of the project.
  - `src/config/`: Default configurations for the code.
  - `src/controllers/`: Controllers of the project, the first function called when a route is accessed.
  - `src/infra/`: Project infrastructure.
    - `src/infra/http/`: Infrastructure for HTTP routes.
    - `src/infra/http/db/`: Database infrastructure.
    - `src/infra/logger/`: Logging infrastructure.
  - `src/repositories/`: Repositories, used to call and return data from the database.
  - `src/schemas/`: Returns functions for object and data validation.
  - `src/services/`: Used to manipulate and process data coming from a controller.
  - `src/types/`: TypeScript typings.
  - `src/use_cases/`: Used for validation + processing of information.
  - `src/utils/`: Utility functions for assistance.
  - `src/app.ts`: Used to define the routing scheme and return the Express.js application.
  - `src/server.ts`: The main file, used to initialize the application.
- `utilities/`: Helper functions.
- `.env`: Environment variables file.
