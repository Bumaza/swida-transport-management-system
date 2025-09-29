# 🚚 Transport Orders Fullstack App  

This is a **fullstack assignment** built with **Django + Django REST Framework (backend)** and **Vue 3 + TypeScript + Vite (frontend)**.  
It demonstrates API design, state management, validation, and a simple transport order system (Orders + Customers + Waypoints).  

---

## 🛠 Tech Stack Overview  

Frontend (Vue 3 + TS + Vite)  
        │  
        ▼  
REST API (Django + DRF)  
        │  
        ▼  
Database (SQLite for demo)  

---

## ⚙️ Backend (Django)

### 1. Setup  
cd backend  
python -m venv venv  
source venv/bin/activate   # on Windows: venv\Scripts\activate  
pip install -r requirements.txt  

### 2. Environment Variables  
A `.env` file is provided **for demo purposes only** (⚠️ not recommended in real projects).  

DEBUG=True  
SECRET_KEY=django-insecure-example  
TIME_ZONE=Europe/Bratislava  
DATABASE_URL=sqlite:///db.sqlite3  

### 3. Migrations + Load Backup Data  
python manage.py migrate  
python manage.py loaddata backup/29_09_2025_8:59.json  

### 4. Run Server  
python manage.py runserver  

### 5. Access Backend  
- **API Root** → http://localhost:8000/api/  
- **Swagger/OpenAPI** → http://localhost:8000/api/schema  
- **Redoc Docs** → http://localhost:8000/api/docs  
- **Django Admin (CRM)** → http://localhost:8000/admin  
  - Username: `admin`  
  - Password: `ggiuo4`  

---

## 💻 Frontend (Vue 3 + TS + Vite)

### 1. Setup  
cd frontend  
npm install  

### 2. Environment Variables  
A `.env` file is provided **for demo purposes only**.  

VITE_API_URL=http://127.0.0.1:8000/api  

### 3. Run Dev Server  
npm run dev  

### 4. Access Frontend  
- Web App → http://localhost:5173  

---

## 📦 Features

- **Orders** → create, list, detail (via API + frontend)  
- **Waypoints** → pickup & delivery per order  
- **Customers** → automatically created from `customer_name`  
- **Admin Panel** → manage everything via Django Admin  
- **API Docs** → Swagger & Redoc auto-generated  

---

## 🚀 Quick Links
- Frontend: http://localhost:5173  
- Backend Admin: http://localhost:8000/admin  
- API Swagger: http://localhost:8000/api/schema  
- API Redoc: http://localhost:8000/api/docs  

---

⚠️ **Note:** `.env` files are committed here **only for demonstration**. In real projects, never commit secrets or credentials.  

