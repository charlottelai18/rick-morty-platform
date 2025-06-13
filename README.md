# Rick and Morty App

A full-stack web application that allows users to register, log in, explore Rick and Morty characters, and save their favourites. Built with React, Express, and the Rick and Morty API.

## Features

* User authentication (register & login)
* Persistent login session using JWT
* Character explorer powered by Rick and Morty API
* Save characters to personal favourites list
* View detailed character profiles
* Profile page displaying user info
* Modern responsive UI styled with Tailwind CSS
* Protected routes and route redirection

---

## Folder Structure

```bash
client/
├── pages/
│   ├── Characters.jsx
│   ├── CharacterProfile.jsx
│   ├── Favourites.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Profile.jsx
├── App.jsx
├── main.jsx
└── index.css

server/
└── index.js
```

---

## Running Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/rick-morty-explorer.git
cd rick-morty-explorer
```

### 2. Install dependencies

```bash
cd client
npm install
```

### 3. Start the backend server

```bash
cd ../server
npm install
node index.js
```

### 4. Start the React app

```bash
cd ../client
npm run dev
```

---

## 🔗 Live Demo

* Frontend (Netlify): [https://rickyandmortyproject.netlify.app/](https://rickyandmortyproject.netlify.app/)
* Backend (Render): [https://rick-morty-platform.onrender.com](https://rick-morty-platform.onrender.com)

## ⚠️ Note on Free Hosting

> The backend is hosted on Render's free tier, which may spin down after periods of inactivity.
> The first login or register request may take **30–60 seconds** to respond as the server "wakes up."
> All subsequent requests will be fast and responsive.

This is expected behavior on free hosting and does not reflect a bug in the application.

---

## Deployment Info

Frontend is deployed via **Netlify**, and the backend server is deployed using **Render**.

1. Pushed frontend (client folder) to a GitHub repo and link it to Netlify.

   * Base directory: `client`
   * Build command: `npm run build`
   * Publish directory: `client/dist`

2. Pushed backend (server folder) to GitHub and deploy as a Node Web Service on Render.

   * Root directory: `server`
   * Build command: `npm install`
   * Start command: `node index.js`

Environment variable JWT_SECRET is securely configured on Render

## Technologies Used

    *Frontend: React, Vite, Tailwind CSS, React Router
    *Backend: Express.js, Node.js, JWT
    *Deployment: Netlify (frontend) & Render (backend)
    *External API: Rick and Morty API