# Electromart Backend

This is the backend service for the Electromart e-commerce application. It is built with Node.js, Express, and MongoDB, and provides RESTful APIs for order management.

## Features

- Create and store customer orders
- MongoDB integration using Mongoose
- Environment variable support with dotenv
- CORS enabled for frontend-backend communication

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up your environment variables in a `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/electromart
   PORT=5000
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```