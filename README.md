# 🎬 Netflix Clone

A modern and responsive **Netflix-inspired movie streaming web application** built using **React.js, Vite, Firebase Authentication, and TMDB API**.

This project recreates the core experience of a movie streaming platform, allowing users to browse movies, search for content, view movie information, watch trailers, and securely authenticate using Firebase.

---

## 🚀 Live Demo

🌐 **[View Live Project](https://netflix-clone-phi-cyan-66.vercel.app/)**

---

## 📸 Screenshots

### 🏠 Home Page

![Home Page](./screenshots/homepage%20screenshot.png)

### 🔐 Login Page

![Login Page](./screenshots/login%20screenshot.png)

### 📝 Signup Page

![Signup Page](./screenshots/signup%20screenshot.png)

---

## ✨ Features

* 🎬 Netflix-inspired user interface
* 🏠 Dynamic home page
* 🔎 Movie search functionality
* 🎞️ Browse movies and TV shows
* 📄 Movie details
* ▶️ Watch movie trailers
* 🔐 Firebase Authentication
* 👤 User registration and login
* 🚪 Secure logout functionality
* 📱 Responsive design
* ⚡ Fast loading with Vite
* 🌐 TMDB API integration
* 🧭 Client-side routing
* 🎨 Modern and responsive UI

---

## 🛠️ Technologies Used

### Frontend

* **React.js**
* **JavaScript (ES6+)**
* **HTML5**
* **CSS3**
* **Vite**
* **React Router**

### APIs & Services

* **TMDB API** — Movie and TV show data
* **Firebase Authentication** — User authentication
* **Firebase** — Backend services

### Tools

* **Git**
* **GitHub**
* **VS Code**
* **npm**
* **Vercel**

---

## 📂 Project Structure

```text
Netflix-clone/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Player/
│   │   └── ...
│   │
│   ├── firebase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── screenshots/
│   ├── homepage screenshot.png
│   ├── login screenshot.png
│   └── signup screenshot.png
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/lokeshkumar72/Netflix-clone.git
```

### 2. Navigate to the project

```bash
cd Netflix-clone
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

Add your Firebase configuration according to your project's Firebase setup.

### 5. Start the development server

```bash
npm run dev
```

The application will run at:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

The project requires environment variables for API access.

| Variable                 | Description           |
| ------------------------ | --------------------- |
| `VITE_TMDB_ACCESS_TOKEN` | TMDB API access token |

> ⚠️ Never upload private API keys, passwords, or sensitive credentials to GitHub.

---

## 🔥 Firebase Authentication

Firebase Authentication is used to handle user authentication.

### Authentication Features

* User Sign Up
* User Login
* User Logout
* Authentication state management
* Protected user functionality

Firebase makes it possible to securely manage user authentication without building a custom authentication backend.

---

## 🎞️ TMDB API

The **TMDB API** is used to retrieve movie and TV show information.

The application uses TMDB data for:

* Movie posters
* Backdrop images
* Movie titles
* Movie descriptions
* Ratings
* Release information
* Trailers
* Movie videos

> This project is for educational and portfolio purposes and is not affiliated with Netflix.

---

## 🧭 Application Flow

```text
User
 │
 ▼
Netflix Clone
 │
 ├── Sign Up
 │      └── Firebase Authentication
 │
 ├── Login
 │      └── Firebase Authentication
 │
 ▼
Home Page
 │
 ├── Browse Movies
 ├── Search
 ├── Movie Details
 └── Trailers
        │
        ▼
     TMDB API
```

---

## 📱 Responsive Design

The application is designed to provide a consistent experience across:

* 💻 Desktop
* 📱 Mobile
* 📲 Tablet

The UI adapts to different screen sizes for better usability and accessibility.

---

## 💡 Key React Concepts Used

This project helped me practice several important React concepts:

* Functional Components
* React Hooks
* `useState`
* `useEffect`
* Props
* Component Reusability
* Conditional Rendering
* API Integration
* Asynchronous JavaScript
* React Router
* Environment Variables

---

## 🧠 Challenges & Solutions

### 🔹 API Integration

**Challenge:** Fetching and displaying dynamic movie data.

**Solution:** Integrated TMDB API and handled asynchronous API requests using JavaScript and React.

### 🔹 Authentication

**Challenge:** Implementing user registration and login.

**Solution:** Integrated Firebase Authentication for secure user authentication.

### 🔹 Responsive UI

**Challenge:** Making the application work across different screen sizes.

**Solution:** Used responsive CSS techniques and flexible layouts.

### 🔹 API Errors

**Challenge:** Handling failed API requests and unavailable movie data.

**Solution:** Added error handling and fallback behavior when API requests fail.

---

## 🚀 Future Improvements

The following features can be added in future versions:

* ❤️ Add to Watchlist
* ⭐ Personalized recommendations
* 👤 User profile page
* 🎥 Continue Watching
* 📜 Watch History
* 🔔 Notifications
* 🌙 Dark/Light theme options
* 🎬 Improved video player
* 🔍 Advanced movie filtering
* 📱 Progressive Web App (PWA)
* 🎯 Personalized content based on user activity

---

## 📊 Project Highlights

| Category       | Details      |
| -------------- | ------------ |
| Frontend       | React.js     |
| Build Tool     | Vite         |
| Authentication | Firebase     |
| Movie API      | TMDB         |
| Routing        | React Router |
| Deployment     | Vercel       |
| Repository     | GitHub       |
| Responsive     | Yes          |

---

## 📚 Learning Outcomes

By building this project, I gained practical experience with:

* Building real-world React applications
* Consuming REST APIs
* Firebase Authentication
* React component architecture
* Client-side routing
* Responsive web development
* Environment variable management
* Git and GitHub workflows
* Deploying applications with Vercel
* Debugging frontend issues

---

## 🔮 Future Vision

The goal is to continue improving this project by adding more advanced streaming-platform features, improving performance, enhancing the user experience, and introducing personalized recommendations and user-specific content.

---

## 👨‍💻 Author

### Lokesh Kumar

**Frontend / Full Stack Developer**

I enjoy building modern, responsive web applications and learning new technologies through real-world projects.

### 🔗 Connect With Me

* 🐙 **GitHub:** [github.com/lokeshkumar72](https://github.com/lokeshkumar72)
* 💼 **LinkedIn:**[linkedin.com/lokesh-kumar-singh-] https://www.linkedin.com/in/lokesh-kumar-singh-

---

## ⭐ Show Your Support

If you like this project, please consider giving it a ⭐ on GitHub.

Your support is appreciated!

---

## 📄 Disclaimer

This project is created **for educational and portfolio purposes only**.

Netflix is a registered trademark of Netflix, Inc. This project is not affiliated with, sponsored by, or endorsed by Netflix.

Movie and TV show data is provided through the TMDB API.

