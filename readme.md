# 📝 i_Notebook

A **secure and fast** notes app built using the **MERN stack**. i_Notebook lets users **create, edit, and organize** their notes efficiently, with **authentication and user-specific data storage**.

---

## 🚀 Features

✅ **Authentication System** – Secure login & signup (JWT-based)  
✅ **User-Specific Notes** – Notes are stored privately for each user  
✅ **Fast & Responsive UI** – Smooth experience on all devices  
✅ **CRUD Operations** – Create, Read, Update, and Delete notes easily  
✅ **Dark Mode Support** – User-friendly reading experience  
✅ **Cloud Storage** – Store notes securely in the database

---

## 🏗️ Tech Stack

- **Frontend:** React.js, Tailwind
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)

---

## 🎯 Getting Started

### 🔹 Run Locally with Docker Compose

#### 🧰 Prerequisites

- [Docker](https://www.docker.com/) installed
- [Docker Compose](https://docs.docker.com/compose/) installed

#### 📦 Project Structure

i_notebook/ ├── backend/ │ ├── Dockerfile │ ├── .env │ └── ... ├── client/ │ ├── Dockerfile │ └── ... ├── docker-compose.yml └── README.md



#### ⚙️ Setup  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/i_notebook.git
   cd i_notebook


2. **Create and update env file**
   ```bash
   Add JWT_SCREAT

3. **Run The Docker Compose File**
   ```bash 
   Run docker-compose up --d

#### Post Installation Steps
- Once the app is running:

- Create an account – Sign up using the frontend UI

- Login – Use your credentials to access your notes

- Add Notes – Click "Add Note" to create a new note

- Edit Notes – Click an existing note to update it

- Delete Notes – Use the delete icon to remove a note

- Test Authentication – Log out and back in to ensure secure access

- Verify Database – Use MongoDB Compass/Atlas to check note storage

##### Contributing
- Contributions are welcome!

- Fork the repository

- Create a new feature branch

- Make your changes

- Submit a pull request