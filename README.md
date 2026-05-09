# 📊 Trello Web Clone

A modern, feature-rich project management application built with React and Material UI, inspired by Trello. Manage your boards, lists, and cards with real-time updates and intuitive drag-and-drop functionality.

![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-4.3-646CFF?style=flat-square&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-2.0-764ABC?style=flat-square&logo=redux&logoColor=white)
![Material UI](https://img.shields.io/badge/Material%20UI-7.3-007FFF?style=flat-square&logo=mui&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Project Architecture](#project-architecture)
- [API Integration](#api-integration)
- [Roadmap](#roadmap)

---

## Overview

Trello Web Clone is a full-featured project management tool that brings the power of task organization and team collaboration to your workflow. Built with modern web technologies and best practices, it provides an intuitive interface for managing projects through boards, columns, and cards.

**Key Highlights:**
- ⚡ **Fast Development & Production Build** — Powered by Vite for lightning-fast HMR
- 🎨 **Material Design** — Beautiful, responsive UI with Material UI v7
- 🔄 **Drag & Drop** — Smooth drag-and-drop experience using dnd-kit library
- 🔐 **User Authentication** — Secure login/register with JWT tokens
- 📱 **Responsive Design** — Works seamlessly on desktop and mobile devices
- ✨ **Real-time Updates** — Redux state management for instant data synchronization
- 🎯 **Redux + React Query** — Optimal state management for both local and server state

---

## Features

### Core Features
- **Authentication**
  - User registration with email verification
  - Secure login with JWT tokens
  - Account verification flow
  - User session management

- **Board Management**
  - Create, read, update, and delete boards
  - Organize boards with custom titles and descriptions
  - Board ownership and sharing
  - Quick board access and navigation

- **Lists & Columns**
  - Create multiple columns within boards
  - Rename and delete columns
  - Reorder columns with drag-and-drop
  - Automatic column state persistence

- **Cards Management**
  - Add, edit, and delete cards within lists
  - Move cards between columns seamlessly
  - Card titles and descriptions
  - Card state management and organization

- **User Experience**
  - Light/Dark mode toggle
  - Toast notifications for user feedback
  - Form validation and error handling
  - Loading states and spinners
  - User profile management

### Advanced Features
- **Drag & Drop** — Seamless reordering of columns and cards
- **Real-time State Updates** — Redux-powered instant synchronization
- **Responsive UI** — Works perfectly on all screen sizes
- **API Caching** — TanStack React Query for optimized data fetching

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.2.0 | UI framework with hooks |
| **Vite** | 4.3.2 | Build tool and dev server |
| **Redux Toolkit** | 2.0.1 | State management |
| **redux-persist** | 6.0.0 | Persist Redux state across sessions |
| **React Query** | 5.90.21 | Server state management & caching |
| **Axios** | 1.5.1 | HTTP client |
| **Material UI** | 7.3.9 | Component library |
| **@emotion** | 11.14.x | CSS-in-JS styling |
| **React Hook Form** | 7.49.3 | Form state management |
| **React Router** | 6.21.3 | Client-side routing |
| **dnd-kit** | 6.0.8+ | Drag and drop utilities |
| **React Toastify** | 11.0.5 | Toast notifications |
| **Lodash** | 4.17.21 | Utility functions |

### Dev Tools
| Tool | Purpose |
|---|---|
| **ESLint** | Code quality and linting |
| **React SWC** | Fast JSX compilation |
| **SVG as React Components** | Optimized icon imports |
| **cross-env** | Cross-platform environment variables |

---

## Project Structure

```
trello-web-clone/
├── src/
│   ├── components/
│   │   ├── AppBar/                 # Main navigation bar
│   │   │   ├── AppBar.jsx
│   │   │   └── Menus/
│   │   │       ├── Profiles.jsx    # User profile menu
│   │   │       ├── Recent.jsx      # Recent boards
│   │   │       ├── Starred.jsx     # Starred boards
│   │   │       ├── Templates.jsx   # Templates menu
│   │   │       └── Workspaces.jsx  # Workspaces menu
│   │   ├── Form/                   # Reusable form components
│   │   │   ├── FieldErrorAlert.jsx # Error display component
│   │   │   └── ToggleFocusInput.jsx # Editable input field
│   │   ├── Loading/
│   │   │   └── PageLoadingSpinner.jsx # Loading indicator
│   │   └── ModeSelect/
│   │       └── ModeSelect.jsx      # Theme toggle (light/dark)
│   │
│   ├── pages/
│   │   ├── 404/
│   │   │   └── NotFound.jsx        # 404 error page
│   │   ├── Auth/                   # Authentication pages
│   │   │   ├── Auth.jsx            # Auth layout wrapper
│   │   │   ├── LoginForm.jsx       # Login form
│   │   │   ├── RegisterForm.jsx    # Registration form
│   │   │   └── AccountVerification.jsx # Email verification
│   │   ├── Boards/                 # Board management pages
│   │   │   ├── index.jsx           # Boards list
│   │   │   ├── create.jsx          # Create board
│   │   │   ├── _id.jsx             # Board detail
│   │   │   ├── BoardBar/
│   │   │   │   └── BoardBar.jsx    # Board toolbar
│   │   │   └── BoardContent/
│   │   │       ├── BoardContent.jsx
│   │   │       └── ListColumns/
│   │   │           ├── ListColumns.jsx
│   │   │           └── Columns/
│   │   │               ├── Column.jsx       # Single column
│   │   │               └── ListCards/
│   │   │                   ├── ListCards.jsx
│   │   │                   └── Card/
│   │   │                       └── Card.jsx # Single card
│   │   ├── Settings/               # User settings pages
│   │   │   ├── Settings.jsx
│   │   │   ├── AccountTab.jsx      # Account settings
│   │   │   └── SecurityTab.jsx     # Security settings
│   │   └── Users/
│   │       ├── index.jsx           # Users list
│   │       └── _id.jsx             # User profile
│   │
│   ├── redux/                      # State management
│   │   ├── store.js                # Redux store configuration
│   │   ├── activeBoard/
│   │   │   └── activeBoardSlice.js # Active board state
│   │   └── user/
│   │       └── userSlice.js        # User state
│   │
│   ├── apis/                       # API integration
│   │   ├── index.js                # API endpoints
│   │   └── mock_data.js            # Mock data for development
│   │
│   ├── utils/                      # Utility functions
│   │   ├── authorizeAxios.js       # Axios interceptor setup
│   │   ├── constants.js            # App constants
│   │   ├── formatters.js           # Data formatting utilities
│   │   ├── sorts.js                # Sorting utilities
│   │   └── validators.js           # Form validation rules
│   │
│   ├── assets/                     # Static assets
│   │   ├── 404/                    # 404 page assets
│   │   └── auth/                   # Auth page assets
│   │
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # App entry point
│   └── theme.js                    # Material UI theme configuration
│
├── public/                         # Static files served as-is
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── jsconfig.json                   # JS path aliases configuration
├── package.json                    # Project dependencies
└── README.md                       # This file
```

### Path Aliases
Configure in `jsconfig.json` for cleaner imports:

| Alias | Resolves to |
|---|---|
| `~/*` | `./src/*` |

**Usage Examples:**
```jsx
// Instead of:
import Component from '../../../components/Button'

// Use:
import Component from '~/components/Button'
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 22.x
- **npm** >= 9.x or **yarn** >= 1.22.x
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/trello-web-clone.git
cd trello-web-clone

# Install dependencies
npm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the project root with the following configuration:

```env
# ── API Configuration ──────────────────────
VITE_API_URL=http://localhost:5000
# or your backend URL

# ── Feature Flags ───────────────────────── 
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_NOTIFICATIONS=true
```

**Note:** Environment variables must be prefixed with `VITE_` to be accessible in the browser.

---

## Running the Application

### Development Mode

Start the Vite development server with hot module replacement (HMR):

```bash
npm run dev
# or
yarn dev
```

**Output:**
```
  VITE v4.3.2  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Access the application at `http://localhost:5173`

### Production Build

Create an optimized production build:

```bash
npm run build
# or
yarn build
```

This generates optimized assets in the `dist/` folder.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

---

## Available Scripts

```bash
# Development
npm run dev           # Start dev server with HMR
npm run build         # Build for production
npm run preview       # Preview production build locally
npm run lint          # Run ESLint on src files

# Linting & Code Quality
npm run lint          # Check for linting errors
npm run lint -- --fix # Auto-fix linting issues
```

---

## Project Architecture

### State Management Flow

```
┌─────────────────┐
│   React UI      │
│  (Components)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Redux Toolkit  │ ← redux-persist
│   (Local State) │   (Auto-sync)
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│  React Query    │──────│ Backend API  │
│ (Server State)  │      │ (Axios)      │
└─────────────────┘      └──────────────┘
```

### Component Hierarchy

```
App
├── Router
│   ├── Auth Layout
│   │   ├── LoginForm
│   │   ├── RegisterForm
│   │   └── AccountVerification
│   ├── Main Layout
│   │   ├── AppBar (Navigation)
│   │   ├── Boards Page
│   │   ├── Board Detail
│   │   │   ├── BoardBar
│   │   │   └── BoardContent
│   │   │       └── ListColumns (Drag & Drop)
│   │   │           ├── Column
│   │   │           │   └── ListCards
│   │   │           │       └── Card
│   │   └── Settings
│   └── 404 Page
```

---

## API Integration

### Axios Configuration

The app uses interceptors for:
- **Authentication** — Automatic JWT token injection
- **Error Handling** — Centralized error management
- **Request/Response** — Automatic payload formatting

**Key Endpoints:**

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/v1/users/register` | User registration |
| PUT | `/v1/users/verify` | Email verification |
| GET | `/v1/users/refresh_token` | Token refresh |
| GET | `/v1/boards` | Fetch all boards |
| POST | `/v1/boards` | Create board |
| PUT | `/v1/boards/{id}` | Update board |
| DELETE | `/v1/boards/{id}` | Delete board |
| POST | `/v1/columns` | Create column |
| PUT | `/v1/columns/{id}` | Update column |
| DELETE | `/v1/columns/{id}` | Delete column |
| POST | `/v1/cards` | Create card |
| PUT | `/v1/boards/supports/moving_card` | Move card |

**Example API Call:**

```jsx
import { updateBoardDetailsAPI } from '~/apis'

const handleUpdateBoard = async (boardId, newData) => {
  try {
    const updatedBoard = await updateBoardDetailsAPI(boardId, newData)
    console.log('Board updated:', updatedBoard)
  } catch (error) {
    console.error('Failed to update board:', error)
  }
}
```

---

## Theming

The application uses Material UI's theming system with light and dark modes.

**Theme Configuration** — See [src/theme.js](src/theme.js)

```jsx
import { ThemeProvider, createTheme } from '@mui/material/styles'
import theme from '~/theme'

// Theme automatically applied in main.jsx
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

---

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
npm run dev -- --port 3000
```

### Module Not Found

Ensure `jsconfig.json` is properly configured with path aliases.

### API Connection Issues

- Verify backend server is running
- Check `VITE_API_URL` environment variable
- Ensure CORS is enabled on backend

### Redux State Not Persisting

- Clear browser localStorage
- Restart dev server
- Check redux-persist configuration

---

## Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Material UI](https://mui.com)
- [React Query](https://tanstack.com/query/latest)
- [dnd-kit](https://docs.dndkit.com)

## License

This project is licensed under the MIT License — see the LICENSE file for details.

---

## Author

**TrungQuanDev** — [YouTube Channel](https://youtube.com/@trungquandev)

For questions and support, feel free to reach out or open an issue in the repository.

---

Made with ❤️ by the Trello Web Clone Team
