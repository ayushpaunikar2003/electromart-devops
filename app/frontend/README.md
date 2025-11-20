# ElectroShop - Your Digital Gadget Hub

Welcome to ElectroShop, a modern, fully responsive e-commerce web application built with React. This project serves as a comprehensive frontend demonstration for an electronics store.

## Features

- **Modern UI/UX:** Clean, professional, and intuitive design using Material-UI.
- **Fully Responsive:** Adapts seamlessly to desktop, tablet, and mobile devices.
- **Product Catalog:** Browse, search, filter by category, and sort products.
- **Shopping Cart:** Add, remove, and update product quantities.
- **Simulated Checkout:** A multi-step checkout process to simulate placing an order.
- **State Management:** Centralized state management with Redux Toolkit.
- **Client-Side Routing:** Fast and smooth navigation with React Router.

## Technology Stack

- **Core:** React.js
- **Routing:** React Router DOM v6
- **State Management:** Redux Toolkit
- **UI Components:** Material-UI (MUI) v5
- **Data:** Local JavaScript array (no backend required)

## Project Structure

The project follows a feature-sliced structure to maintain scalability and organization.

- `src/assets`: Static assets like images.
- `src/components`: Reusable, presentational UI components.
- `src/data`: Local product data.
- `src/features`: Redux Toolkit slices and logic.
- `src/layouts`: Main application layout components.
- `src/pages`: Page-level components mapped to routes.
- `src/app`: Redux store configuration.
- `src/styles`: Global styles and MUI theme customization.
- `src/utils`: Utility functions.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation & Setup

1.  **Clone the repository (or download the source code):**
    ```sh
    git clone [https://github.com/your-username/electromart-app.git](https://github.com/your-username/electromart-app.git)
    cd electromart-app
    ```

2.  **Install the dependencies:**
    ```sh
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```sh
    npm start
    ```

2.  Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm run eject`: Removes the single dependency configuration (use with caution).