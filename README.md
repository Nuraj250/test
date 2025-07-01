# 🎫 Mini Event Booking System

A full-stack application to create and book events with limited seating , built using **NestJS (backend)** and **Next.js (frontend)**. Uses in-memory storage (array) with no external database.

---

## 🧠 Features

### ✅ Backend (NestJS)
- `POST /events`: Create a new event (name, capacity)
- `POST /events/:id/book`: Book a seat (prevents overbooking)
- `GET /events`: List all events with capacity and booking status
- In-memory array used to simulate storage

### ✅ Frontend (Next.js + Tailwind CSS)
- `/events` page
- Displays all events with seat status
- "Book Seat" button (disabled if full)
- Handles errors (e.g., overbooking)
- Responsive and modern dark UI

---

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/Nuraj250/test.git
cd mini-event-booking
````

### 2. Run the Backend (NestJS)

```bash
cd backend
npm install
npm run start
```

📍 **API runs on**: `http://localhost:3001`

### 3. Run the Frontend (Next.js)

```bash
cd ../frontend
npm install
npm run dev
```

📍 **Frontend runs on**: `http://localhost:3000`

---

## 🔍 Testing the API

### ➕ Create a new event

```http
POST /events
Content-Type: application/json

{
  "name": "Sample Event",
  "capacity": 5
}
```

### 🎟️ Book a seat

```http
POST /events/:id/book
```

Returns error if event is full.

## 🛠️ Tech Stack

* **Backend**: NestJS, TypeScript
* **Frontend**: Next.js (App Router), Tailwind CSS, React Hooks
* **Storage**: In-memory Array (no DB)

---

## 📂 Folder Structure

```
/backend
  ├── main.ts
  ├── events/
  └── app.module.ts

/frontend
  ├── app/
  │   └── events/page.tsx
  ├── tailwind.config.js
  └── globals.css
```

---

## 📌 Notes

* This app is not persistent; restarting the server resets events.
* The system is built for demo/testing purposes.

---

## ✍️ Author

* **Name**: Nuraj Shaminda
* **Email**: [nurajshaminda200@gmail.com](mailto:nurajshaminda200@gmail.com)



