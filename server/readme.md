#  Finance Dashboard Backend API

## Overview

This project is a backend system for a Finance Dashboard that allows users to manage financial transactions with **role-based access control**.

The system supports:

* User authentication (JWT-based)
* Role-based permissions (Admin, Analyst, Viewer)
* Transaction management (CRUD)
* Dashboard analytics (income, expenses, balance)

---

##  Tech Stack

* **Node.js**
* **Express.js**
* **TypeScript**
* **MongoDB (Mongoose)**
* **JWT Authentication**
* **bcrypt (password hashing)**

---

##  Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=8000
MONGO_URI=your_mongodb_connection
SECRET_KEY=your_jwt_secret
```

### 4. Run Server

```bash
npm run dev
```

---

## Authentication & Roles

### Roles:

* **Viewer**

  * Can view transactions & dashboard only

* **Analyst**

  * Can view transactions + dashboard insights

* **Admin**

  * Full access (create, update, delete, manage users)

---

##  API Endpoints

### Auth APIs

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login & get JWT

---

### Transaction APIs

* `POST /api/transactions` → Create transaction *(Admin only)*
* `GET /api/transactions` → Get all transactions *(All roles)*
* `PUT /api/transactions/:id` → Update transaction *(Admin only)*
* `DELETE /api/transactions/:id` → Delete transaction *(Admin only)*

---

### Dashboard API

* `GET /api/dashboard/summary`
  Returns:

  * Total income
  * Total expense
  * Net balance
  * Category-wise breakdown

---

## Authorization

All protected routes require JWT token:

```
Authorization: Bearer <token>
```

---

## Features Implemented

* User authentication (JWT)
* Role-based access control
* Secure password hashing
* Transaction CRUD operations
* Filtering (type, category)
* Dashboard analytics
* Input validation
* Error handling

---

## Project Structure

```
src/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── middleware/
 ├── config/
 └── app.ts
```

---

##  Assumptions

* Each user manages their own transactions
* Role-based access is enforced via middleware
* MongoDB is used for persistence

---

## Future Improvements (Optional)

* Pagination
* Search functionality
* Rate limiting
* Unit testing
* API documentation (Swagger)

---

## Author

**Rohit**

---

## License

This project is for assessment purposes only.
