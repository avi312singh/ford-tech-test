# Ford Tech Test

## Overview

This repository contains two main components:

- **Frontend (`fe`)**: React and TypeScript project, this frontend application provides a frontend to interact with and view the recipes.
- **Backend (`be`)**: Node.js, Express, and TypeScript project, this backend application is the API server to manage and retrieve recipes and reviews.

## Prerequisites

- Node.js > 18.0 and npm (or yarn)
- Git

## Installation

### Backend and Frontend 

  **Clone Repository:**

   ```bash
   git clone [<frontend-repo-url>](https://github.com/avi312singh/ford-tech-test/tree/main)
   cd ford-be
   npm install
   npm run dev
   cd ../ford-fe
   npm install
   npm run dev
   ```
   - Navigate to URL in terminal

## API Endpoints
- **GET /api/recipes**: Retrieve all recipes.
- **GET /api/recipes/:id**: Retrieve a specific recipe by ID.
- **POST /api/recipes/:id/reviews**: Add a review to a recipe.
- **GET /api/recipes/:id/reviews**: Retrieve reviews for a specific recipe.
