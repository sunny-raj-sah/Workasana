# Workasana — Task Management Application

Workasana is a full-stack task management application built with **React, Node.js, Express.js, and MongoDB**.

The application provides a centralized workspace for managing projects, tasks, teams, users, tags, progress, and productivity reports. It also implements **JWT-based authentication**, protected API routes, frontend authentication state management, task filtering, CRUD operations, and dashboard analytics.

## Live Application

* **Frontend:** https://workasana-task-management-applicati-phi.vercel.app/login
* **Backend API:** https://workasana-task-management-applicati.vercel.app/

## Repository

https://github.com/sunny-raj-sah/Workasana---Task-Management-Application

---

## Features

### Authentication

* User registration
* User login
* JWT-based authentication
* Protected frontend routes
* Protected backend APIs
* Persistent authentication using `localStorage`
* Logout
* Current-user/profile retrieval
* Profile information update
* Password update

### Dashboard

* Task overview
* Project overview
* Task status statistics
* Progress visualization
* Quick task filtering

### Task Management

* Create tasks
* View task details
* Update tasks
* Delete tasks
* Change task status
* Assign tasks to projects
* Assign tasks to teams
* Assign multiple task owners
* Add task tags
* Set due dates
* Set estimated completion time
* Filter tasks by project, team, status, and owner
* Search tasks from the frontend

### Project Management

* Create projects
* View projects
* View individual project details
* Update projects
* Delete projects

### Team Management

* Create teams
* View teams
* Update teams
* Delete teams

### User Management

* Create users
* View users
* Update users
* Delete users

### Tag Management

* Create tags
* View tags
* Update tags
* Delete tags

### Reports

* Task statistics
* Project statistics
* Visual charts
* Bar and pie chart visualizations using Chart.js

### Settings

* Update profile information
* Change password

---

# Tech Stack

## Frontend

* React
* Vite
* React Router
* React Hooks
* Context API
* `useReducer`
* Axios
* Bootstrap
* React-Bootstrap
* Bootstrap Icons
* React Hot Toast
* Chart.js
* React Chart.js 2

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv

## Development & Deployment

* Git
* GitHub
* Postman
* VS Code
* Vercel
* MongoDB Atlas

---

# Architecture

```text
                    ┌──────────────────────┐
                    │      React App       │
                    │       Vite SPA       │
                    └──────────┬───────────┘
                               │
                               │ Axios / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Express Server    │
                    │      Node.js         │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
             JWT Middleware          Controllers
                    │                      │
                    └──────────┬───────────┘
                               │
                               ▼
                         Mongoose ODM
                               │
                               ▼
                         MongoDB Atlas
```

The frontend communicates with the backend through REST APIs using Axios.

The backend exposes separate route modules for authentication, projects, tasks, teams, users, tags, and profile settings.

---

# Project Structure

```text
Workasana/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── CreateProjectModal.jsx
│   │   │   ├── CreateTaskModal.jsx
│   │   │   ├── EditTaskModal.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskSearch.jsx
│   │   │   └── TeamModal.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AppContext.jsx
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   ├── TaskDetails.jsx
│   │   │   ├── Teams.jsx
│   │   │   ├── Reports.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── settingsService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── profileController.js
│   │   │   ├── projectController.js
│   │   │   ├── tagController.js
│   │   │   ├── taskController.js
│   │   │   ├── teamController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── AuthUser.js
│   │   │   ├── Project.js
│   │   │   ├── Tag.js
│   │   │   ├── Task.js
│   │   │   ├── Team.js
│   │   │   └── User.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── profileRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   ├── tagRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   ├── teamRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── data.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── vercel.json
│
└── Readme.md
```

---

# Authentication Architecture

Workasana uses JWT authentication.

The authentication flow is:

```text
User
 │
 ├── Signup
 │      │
 │      ▼
 │   bcrypt password hashing
 │      │
 │      ▼
 │   Create AuthUser
 │      │
 │      ▼
 │   Generate JWT
 │
 └── Login
        │
        ▼
   Find AuthUser
        │
        ▼
   bcrypt.compare()
        │
        ▼
   Generate JWT
        │
        ▼
   Return token
        │
        ▼
   localStorage
```

The backend generates a JWT containing the authenticated user's ID:

```js
jwt.sign(
  { id },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);
```

Passwords are hashed using `bcryptjs` before being stored.

---

# Protected API Architecture

Protected route modules use the authentication middleware before exposing their CRUD operations.

For example:

```text
Request
   │
   ▼
Authorization: Bearer <token>
   │
   ▼
authMiddleware
   │
   ├── Missing token → 401
   │
   ├── Invalid token → 401
   │
   └── Valid token
          │
          ▼
       Controller
          │
          ▼
       MongoDB
```

The middleware verifies the JWT using the configured `JWT_SECRET`.

---

# Frontend Authentication State

Authentication state is managed through `AuthContext`.

The context stores:

```text
user
token
isAuthenticated
loading
```

The token is persisted in browser `localStorage`.

On application startup:

```text
React App
   │
   ▼
AuthProvider
   │
   ▼
Check localStorage
   │
   ├── No token
   │      └── Continue as unauthenticated
   │
   └── Token exists
          │
          ▼
       /auth/me
          │
          ▼
      Load user
```

If the token is invalid, the stored token is removed and the user is logged out.

---

# Axios Authentication

A centralized Axios instance is used for API communication.

The request interceptor reads the JWT from `localStorage` and attaches it to requests:

```text
localStorage
     │
     ▼
JWT Token
     │
     ▼
Axios Interceptor
     │
     ▼
Authorization Header
     │
     ▼
Express API
```

The resulting header is:

```http
Authorization: Bearer <JWT>
```

This avoids manually attaching the token to every API request.

---

# Protected Frontend Routes

The application uses a reusable `ProtectedRoute` component.

Authenticated pages include:

```text
/dashboard
/projects
/projects/:id
/tasks/:id
/teams
/reports
/settings
```

Unauthenticated users are restricted from these application areas.

Public authentication routes include:

```text
/login
/signup
```

---

# Data Models

## AuthUser

The authentication-specific user model contains:

```text
AuthUser
├── name
├── email
├── password
└── timestamps
```

Passwords are stored as bcrypt hashes.

---

## User

The application-level user model contains:

```text
User
├── name
└── email
```

Task owners reference these users.

---

## Project

```text
Project
├── name
├── description
└── timestamps
```

---

## Team

```text
Team
├── name
└── description
```

---

## Tag

```text
Tag
└── name
```

---

## Task

The Task model connects the major entities of the application:

```text
Task
├── name
├── project → Project
├── team → Team
├── owners → User[]
├── tags → String[]
├── dueDate
├── timeToComplete
├── status
└── timestamps
```

Task status is restricted to:

```text
To Do
In Progress
Completed
Blocked
```

---

# Task Filtering

The backend supports query-based task filtering.

Example:

```http
GET /api/tasks?project=<id>&team=<id>&status=In%20Progress&owner=<id>
```

The server constructs a MongoDB filter based on the supplied query parameters.

```text
project
team
status
owner
```

Only provided filters are included in the database query.

---

# Task Population

Tasks store references to projects, teams, and owners.

When tasks are returned, Mongoose `populate()` is used to retrieve useful related information.

For example:

```js
.populate("project", "name")
.populate("team", "name")
.populate("owners", "name email")
```

This allows the frontend to receive task information together with the relevant project, team, and owner details.

---

# REST API

## Authentication

| Method | Endpoint             | Purpose                |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register user          |
| POST   | `/api/auth/login`    | Login                  |
| GET    | `/api/auth/me`       | Get authenticated user |

## Projects

| Method | Endpoint            | Purpose        |
| ------ | ------------------- | -------------- |
| POST   | `/api/projects`     | Create project |
| GET    | `/api/projects`     | Get projects   |
| GET    | `/api/projects/:id` | Get project    |
| PUT    | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

## Tasks

| Method | Endpoint                | Purpose            |
| ------ | ----------------------- | ------------------ |
| POST   | `/api/tasks`            | Create task        |
| GET    | `/api/tasks`            | Get/filter tasks   |
| GET    | `/api/tasks/:id`        | Get task           |
| PUT    | `/api/tasks/:id`        | Update task        |
| PATCH  | `/api/tasks/:id/status` | Update task status |
| DELETE | `/api/tasks/:id`        | Delete task        |

## Teams

| Method | Endpoint         | Purpose     |
| ------ | ---------------- | ----------- |
| POST   | `/api/teams`     | Create team |
| GET    | `/api/teams`     | Get teams   |
| PUT    | `/api/teams/:id` | Update team |
| DELETE | `/api/teams/:id` | Delete team |

## Users

| Method | Endpoint         | Purpose     |
| ------ | ---------------- | ----------- |
| POST   | `/api/users`     | Create user |
| GET    | `/api/users`     | Get users   |
| PUT    | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

## Tags

| Method | Endpoint        | Purpose    |
| ------ | --------------- | ---------- |
| POST   | `/api/tags`     | Create tag |
| GET    | `/api/tags`     | Get tags   |
| PUT    | `/api/tags/:id` | Update tag |
| DELETE | `/api/tags/:id` | Delete tag |

## Settings

| Method | Endpoint                 | Purpose         |
| ------ | ------------------------ | --------------- |
| PUT    | `/api/settings/profile`  | Update profile  |
| PUT    | `/api/settings/password` | Change password |

---

# Frontend State Management

The project uses React Context API with `useReducer`.

## AuthContext

Responsible for authentication state:

```text
AuthContext
├── user
├── token
├── isAuthenticated
├── loading
└── reducer actions
```

## AppContext

Provides application-level state such as:

```text
projects
tasks
teams
users
tags
loading
```

The reducer currently handles project state updates such as:

```text
SET_LOADING
SET_PROJECTS
ADD_PROJECT
REMOVE_PROJECT
```

This keeps shared state outside individual page components.

---

# Dashboard and Reports

The application provides visual productivity information through a dashboard and reports section.

Chart.js is used for visualization through `react-chartjs-2`.

The reports area can represent task and project statistics using:

* Bar charts
* Pie charts

This turns raw task data into a more understandable overview of project progress.

---

# CRUD Architecture

The backend follows a route → controller → model flow.

For example, creating a task:

```text
React CreateTaskModal
        │
        ▼
      Axios
        │
        ▼
POST /api/tasks
        │
        ▼
  authMiddleware
        │
        ▼
 createTask()
        │
        ▼
   Task.create()
        │
        ▼
     MongoDB
        │
        ▼
 Populate related data
        │
        ▼
    JSON response
        │
        ▼
       React
```

This separation keeps HTTP routing, business operations, and persistence responsibilities distinct.

---

# Seed Data

The backend contains a seed script:

```bash
npm run seed
```

The script creates sample:

* Teams
* Users
* Tags
* Projects
* Tasks

It is useful for quickly populating a development database with realistic task-management data.

---

# Environment Variables

## Client

Create:

```env
VITE_API_URL=http://localhost:5000/api
```

## Server

Create:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit real environment variables or secrets to GitHub.

---

# Local Development

## 1. Clone the repository

```bash
git clone https://github.com/sunny-raj-sah/Workasana---Task-Management-Application.git
cd Workasana---Task-Management-Application
```

## 2. Start the backend

```bash
cd server
npm install
npm run dev
```

The backend uses:

```text
http://localhost:5000
```

## 3. Start the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The Vite development server normally runs on:

```text
http://localhost:5173
```

---

# Deployment

The application is separated into frontend and backend deployments.

```text
                 ┌─────────────────────┐
                 │      Vercel         │
                 │  React Frontend     │
                 └──────────┬──────────┘
                            │
                            │ REST API
                            ▼
                 ┌─────────────────────┐
                 │      Vercel         │
                 │ Node/Express API    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    MongoDB Atlas    │
                 │      Database       │
                 └─────────────────────┘
```

The frontend uses:

```env
VITE_API_URL
```

to determine the backend API base URL.

---

# Engineering Decisions

## 1. JWT Authentication

JWT provides a stateless authentication mechanism between the React client and Express API.

The server does not need to maintain a server-side session for every authenticated request.

## 2. Axios Interceptor

Instead of manually adding authentication headers to every API call, the Axios interceptor attaches the token automatically.

## 3. Context API + useReducer

Context API provides shared state while `useReducer` gives a predictable way to update that state.

This is useful for application-wide data without introducing a larger state-management library.

## 4. Mongoose References

Task relationships are represented using MongoDB ObjectId references.

For example:

```text
Task
 ├── project → Project
 ├── team → Team
 └── owners → User[]
```

Mongoose `populate()` is then used when related data is required by the frontend.

## 5. Separate Controllers

Authentication, tasks, projects, teams, users, tags, and profile operations have separate controllers.

This makes the backend easier to navigate and extend.

---

# Security Considerations

The project implements several basic security mechanisms:

* Password hashing with bcryptjs
* JWT-based authentication
* Protected backend routes
* Protected frontend routes
* Environment-based JWT secret
* Environment-based MongoDB connection string
* Authorization header using Bearer tokens
* Authentication validation through JWT middleware

### Production consideration

The current frontend stores the JWT in `localStorage`.

For a production system handling sensitive authentication data, an HTTP-only secure cookie-based session/token strategy can reduce exposure to token theft through client-side JavaScript.

---

# Error Handling

The backend controllers use `try/catch` blocks and return JSON error messages.

Typical responses include:

```json
{
  "message": "Task not found"
}
```

or:

```json
{
  "message": "Invalid credentials"
}
```

Resource-not-found cases return HTTP `404`, while authentication failures return `401`.

---

# Current Scope

Workasana currently focuses on:

* Authentication
* Project management
* Task management
* Team management
* User management
* Tags
* Task filtering
* Dashboard statistics
* Reports
* Profile management

The application is designed as a practical full-stack project demonstrating how these modules can be connected through a REST API.

---

# Potential Future Improvements

Possible next iterations include:

* Role-based access control
* Granular resource ownership/authorization
* HTTP-only refresh-token authentication
* Task comments
* Task attachments
* Notifications
* Activity history/audit logs
* Pagination for large task collections
* Advanced server-side search
* Real-time task updates using WebSockets
* Automated backend and frontend tests
* Stronger request validation
* Centralized error-handling middleware
* API documentation with Swagger/OpenAPI

---

# Key Engineering Concepts Demonstrated

* React functional components
* React Hooks
* `useState`
* `useEffect`
* Context API
* `useReducer`
* React Router
* Protected routes
* Axios
* Axios interceptors
* REST APIs
* CRUD operations
* JWT authentication
* bcrypt password hashing
* Express middleware
* MVC-style backend organization
* MongoDB
* Mongoose
* MongoDB ObjectId references
* Mongoose `populate()`
* Query-based filtering
* Form handling
* Responsive UI
* Data visualization
* Environment configuration
* Vercel deployment

---

# What I Learned

Building Workasana strengthened my understanding of full-stack application architecture.

The project required connecting multiple layers:

```text
React UI
   ↓
Context / Hooks
   ↓
Axios
   ↓
REST API
   ↓
Express Routes
   ↓
Authentication Middleware
   ↓
Controllers
   ↓
Mongoose
   ↓
MongoDB
```

The most important learning areas were:

1. Designing RESTful CRUD APIs.
2. Implementing JWT authentication end-to-end.
3. Protecting frontend and backend routes.
4. Managing authentication state with Context API and `useReducer`.
5. Connecting MongoDB documents through Mongoose references.
6. Filtering database queries using request parameters.
7. Structuring a React application into pages, components, contexts, and services.
8. Deploying frontend and backend separately.
9. Connecting a production React application to a cloud-hosted API and database.

---

# Author

**Sunny Raj**

Full Stack Engineer

### Technologies

`React` · `Node.js` · `Express.js` · `MongoDB` · `JavaScript` · `JWT` · `REST API`

---

## Links

* **Live Application:** https://workasana-task-management-applicati-phi.vercel.app/login
* **GitHub Repository:** https://github.com/sunny-raj-sah/Workasana---Task-Management-Application
