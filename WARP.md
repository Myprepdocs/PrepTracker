# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## High-level Architecture

The Guide Dog PREP Tracker is a Progressive Web Application (PWA) built with vanilla HTML, CSS, and JavaScript. It's designed to help puppy raisers track the progress of multiple puppies through the Puppy Raising and Education Programme (PREP).

**Key Architectural features:**

*   **Frontend:** The application is a single-page application (SPA) with a multi-puppy dashboard. It uses a modular, class-based JavaScript architecture.
*   **Data Storage:** The application uses `IndexedDB` for client-side data persistence, with a fallback to `localStorage`. The data is structured to ensure complete isolation between puppy profiles.
*   **PWA Features:** The application is a PWA with offline capabilities, enabled by a service worker (`sw.js`).
*   **File Structure:**
    *   `index.html`: The main application shell.
    *   `js/app.js`: The main application controller.
    *   `js/storage.js`: Handles data management with `IndexedDB`.
    *   `styles/main.css`: The application's stylesheet.
    *   `sw.js`: The service worker for offline functionality.

## Commonly Used Commands

Since this is a simple web application with no build system, there are no specific build, lint, or test commands.

To run the application, you can serve the files using a simple web server.

### Running the application

To run the application, you can use a simple web server. For example, using Python's built-in HTTP server:

```bash
python -m http.server
```

Then, open your web browser and navigate to `http://localhost:8000`.


