# 🏡 StayBnB Clone

A full‑stack **Airbnb-inspired web application** built using **Node.js, Express.js, MongoDB, EJS, and TailwindCSS**, designed to provide listing management, user authentication, and a clean UI — deployed live on **Render**.

## ✨ Features

* 🔐 **User Authentication** (Login, Signup, Logout)
* 🏠 **Create, Edit & Delete Listings**
* 📸 **Image Uploads** using multer
* 🗂️ **Fully Functional Dashboard** for users
* 🎨 **TailwindCSS UI** for clean and modern styling
* 🧮 **Server-side Validation** using express-validator
* 💾 **MongoDB Database** using Mongoose
* 🔒 **Secure Sessions** with express-session
* 🌍 Fully deployed and cloud-hosted

---

## 📂 Project Structure

```
root
├── public
│   ├── css
│   ├── js
│   └── uploads
├── views
│   ├── partials
│   └── pages
├── models
├── routes
├── app.js
└── package.json
```

---

## 🛠️ Technologies Used

* **Node.js** + **Express.js** — Backend
* **MongoDB Atlas** — Database
* **EJS** — Templating Engine
* **TailwindCSS** — Styling
* **Multer** — File Uploads
* **dotenv** — Environment Variables
* **Render** — Deployment

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the repository

```bash
git clone https://github.com/sk1a345/staybnb-clone.git
cd staybnb-clone
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` file

```
DB_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

### 4️⃣ Start the server

```bash
npm start
```

The server will run at:

```
http://localhost:3000
```

---

## 🔥 Deployment (Render)

1. Push your project to GitHub.
2. Go to **Render → New Web Service**.
3. Connect your repository.
4. Add required Environment Variables:

```
DB_URL=your_atlas_url
SESSION_SECRET=your_secret
```

5. Set **Start Command:**

```
npm start
```

6. Deploy 🚀

---
## 📸 Screenshots

Below are the main interfaces of the **StayBnB Clone** project — showcasing both the user side and host side experience.

---

### 🧑‍💻 User Interface  
<p align="center">
  <img src="https://github.com/sk1a345/staybnb-clone/blob/main/Screenshot%202025-11-20%20204509.png?raw=true" alt="User Interface" width="700">
</p>

---

### 🏠 Host Interface  
<p align="center">
  <img src="https://github.com/sk1a345/staybnb-clone/blob/main/Screenshot%202025-11-20%20204543.png?raw=true" alt="Host Interface" width="700">
</p>

---

### 📝 Signup Page  
<p align="center">
  <img src="https://github.com/sk1a345/staybnb-clone/blob/main/Screenshot%202025-11-20%20204326.png?raw=true" alt="Signup Page" width="600">
</p>

---

### 🔐 Login Page  
<p align="center">
  <img src="https://github.com/sk1a345/staybnb-clone/blob/main/Screenshot%202025-11-20%20204257.png?raw=true" alt="Login Page" width="600">
</p>

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

## 🧑‍💻 Author

**Sneha Kohale**

---

## ⭐ Show Your Support

If you like this project, please ⭐ the repo!
