MERN Notes App

This project is a full-stack Notes Application built using the MERN stack (MongoDB, Express, React, Node.js).  
Users can create, edit, view, and delete notes with rich text formatting.

1: Features
- Create notes (Title + Rich Text Content)
- Edit existing notes
- Delete notes
- View all notes sorted by latest
- Rich text editor using ReactQuill
- RESTful API
- MongoDB database integration

2: Tech Stack
Frontend:
- React JS
- Axios
- React Router
- ReactQuill (Rich Text Editor)
- CSS
- HTML

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

3: Project Structure

```
fakhir-shaukat-mern-notes-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   │   └── noteController.js
│   ├── middleware/
│   ├── models/
│   │   └── Note.js
│   ├── routes/
│   │   └── noteRoutes.js
│   ├── test/
│   ├── utils/
│   ├── .env
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── test/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```


4: Installation & Setup

1. Clone the repository
   To use the application you first need to clone the repository into your IDE using the following command:
   git clone <your-repo-url>
   cd Notes_Web_App

2. Install dependencies for both backend and frontend folders.
3. Install tailwind CSS also because this application's UI is developed on it.
4. Create environmental variables folder (.env) to run third-party applications.
5. For backend setup:
   cd backend
   npm install or i
   npm start
6. For frontend setup:
   cd frontend
   npm install or i
   npm run dev

4: API Endpoints:
- GET /api/notes
- POST /api/notes
- PUT /api/notes/:id
- DELETE /api/notes/:id

5: Database Schema
{
  title: String (required),
  content: String (required),
  timestamps: true
}

6: System Flow:
- React frontend sends HTTP requests using Axios.
- Express backend handles routes.
- Mongoose interacts with MongoDB.
- Notes are stored with title and rich text content.
- ReactQuill allows formatted note editing.




