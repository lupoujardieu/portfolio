# Lucas Poujardieu - Portfolio

This repository contains the source code for my personal portfolio website, built as a responsive single-page application. It leverages a modern tech stack centered around React, TypeScript, and Vite, with a strong focus on creating a dynamic and engaging user experience through interactive 3D graphics and animations.

The live version of the portfolio can be viewed at [lucas-poujardieu.fr](https://lucas-poujardieu.fr/).

## Features

*   **Interactive 3D Graphics**:
    *   A dynamic header animation built with React Three Fiber.
    *   An animated 3D character model (`.fbx`) in the "About" section.
    *   A circular 3D project gallery for personal projects, implemented with OGL (OGL/GL).
*   **Advanced Animations**:
    *   Complex text reveals and scrambling effects using GSAP's `SplitText` and `ScrambleTextPlugin`.
    *   A responsive navigation bar that changes its theme (colors, borders) based on the scroll position.
    *   A horizontal scrolling text marquee showcasing a list of technical skills.
*   **Modern UI/UX**:
    *   A fully responsive design with a separate, cleanly animated mobile navigation menu.
    *   A "bento box" style grid for showcasing professional projects.
    *   Custom, reusable components for buttons, carousels, and circular text effects.

## Technologies Used

*   **Core**: React, TypeScript, Vite
*   **3D & Animation**: Three.js, React Three Fiber (`@react-three/fiber`), React Three Drei (`@react-three/drei`), GSAP, OGL
*   **Styling**: CSS with CSS Variables
*   **Deployment**: Vercel

## Project Structure

The codebase is organized to separate concerns and promote reusability.

```
/
├── public/                 # Static assets (3D models, images, CV)
├── src/
│   ├── assets/             # SVG icons as React components
│   ├── components/         # Reusable components (Button, Navbar, CircularGallery)
│   ├── styles/             # Global CSS files (variables, resets)
│   └── views/              # Main sections of the application (Header, About, Projects)
├── index.html              # Main HTML entry point
├── main.tsx                # Application root
└── vite.config.ts          # Vite configuration
```

## Running the Project Locally

To run this project on your local machine, follow these steps:

**Prerequisites:**
*   Node.js (v18 or newer)
*   npm or yarn

**Installation & Setup:**

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/lupoujardieu/portfolio.git
    ```

2.  Navigate into the project directory:
    ```sh
    cd portfolio
    ```

3.  Install the necessary dependencies:
    ```sh
    npm install
    ```

4.  Start the development server:
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`.