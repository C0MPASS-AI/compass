# C0MPASS Frontend Coding Standards

Welcome to the C0MPASS frontend codebase. To maintain code readability, ensure high performance, and prevent runtime errors, all developers must adhere to the following standards.

## 1. Tech Stack & Tools
* **Framework:** React 19 (via Vite)
* **Styling:** Tailwind CSS v4.0
* **Component Library:** Shadcn UI (Radix Primitives)
* **Language:** JavaScript (ES6+) / TypeScript (Strict Mode)
* **Linter/Formatter:** ESLint + Prettier

## 2. File and Directory Naming
* **Directories:** Always use lowercase, kebab-case (e.g., `components/itinerary-view/`, `hooks/use-auth/`).
* **React Components:** PascalCase (e.g., `WelcomeCard.jsx`, `TimelineDay.jsx`).
* **Utility Files/Hooks:** camelCase (e.g., `formatDate.js`, `useLocalStorage.js`).

## 3. React Component Best Practices
* **Functional Components only:** Never use Class components. Use arrow functions:
  ```javascript
  const ItineraryCard = ({ activity }) => { ... };
  export default ItineraryCard;