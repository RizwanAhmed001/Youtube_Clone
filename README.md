📺 YouTube Clone – Full Stack MERN Application
A fully functional YouTube-like video sharing platform built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This project mimics the core functionalities of YouTube — including video uploading, playback, user channels, comments, likes/dislikes, and routing — all wrapped in a responsive and intuitive UI.

🚀 Features
🔐 User Authentication

Signup & session-based login

Protected routes for upload and comment features

📤 Video Upload

Upload videos and thumbnails via Cloudinary

Supports MP4, WebM, and other major formats

▶️ Video Playback

Stream videos with native HTML5 player

View likes, dislikes, comments, and uploader info

📡 Channel Management

Create and manage a personal channel

Each channel linked to a unique user profile

💬 Comment System

Add, edit, and delete comments on videos

Live comment updates without page reload

👍👎 Likes & Dislikes

Users can like or dislike videos

Dynamic count updates in real-time

🔍 Search Functionality

Live filtering on Home page via search prop

Easy to integrate with future global search

📱 Responsive UI

Sidebar toggle for mobile views

Grid-based video suggestions

❌ 404 Error Handling

Custom error component shown for all unmatched routes

🛠️ Tech Stack
Frontend

React.js (Hooks, Props)

React Router DOM

Axios

React Icons

Material UI (CircularProgress)

Toastify for notifications

Backend

Node.js & Express.js

MongoDB with Mongoose

Cloudinary (media storage)

JWT for user sessions

CORS, dotenv, cookie-parser

📁 Project Structure
youtube-frontend/
├── components/
│   ├── Navbar/
│   ├── SideNavbar/
│   └── ...
├── pages/
│   ├── Home/
│   ├── Video/
│   ├── Profile/
│   ├── SignUp/
│   ├── Channel/
│   ├── videoUpload/
│   └── Error/
└── App.jsx

youtube-backend/
├── controllers/
├── models/
├── routes/
├── middleware/
└── index.js

⚙️ Installation & Setup
📦 Backend

cd youtube-backend
npm install

Create a .env file inside the youtube-backend/ directory:

env
Copy
Edit

PORT=PORT_number
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

Run the backend:

npm start

🖥️ Frontend
bash
Copy
Edit

cd youtube-frontend
npm install
npm run dev

Make sure your frontend .

<!-- gitHub Project Link  -->
<!-- https://github.com/RizwanAhmed001/Youtube_Clone -->

<!-- A short demo video is in youtube-frontend publib folder -->

🧑‍💻 Author
Rizwan Ahmed

