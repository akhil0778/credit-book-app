# Credit Book App (Node.js + SQLite)

A backend application for managing customers, loans, repayments, and generating receipts. Built using **Node.js**, **Express**, **Knex.js**, and **SQLite**.

---

## Features

- Register/Login users with authentication middleware
- Manage customers and loans
- Add repayments and generate PDF receipts
- View loan summary and reminders
- RESTful API tested using Thunder Client/Postman

---

## Tech Stack

| Tool         | Description                                     |
|--------------|-------------------------------------------------|
| **Node.js**  | JavaScript runtime for building backend services |
| **Express.js** | Web framework for routing and middleware         |
| **Knex.js**  | SQL query builder for migrations and DB access  |
| **SQLite3**  | Lightweight embedded database for development   |
| **PDFKit**   | To generate repayment receipts in PDF format    |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/akhil0778/credit-book-app.git
cd credit-book-app
2. Install Dependencies
npm install
3. Run Migrations
npx knex migrate:latest
This will create necessary tables (users, customers, loans, repayments, etc.) inside the SQLite database.

4. Start the Server
node server.js
Your server will run on http://localhost:3000

🧪 API Testing
Use Thunder Client or Postman to test endpoints like:

POST /register – Register new users

POST /login – Login and receive a token

POST /customers – Add customers (requires token)

POST /loans – Add loans

POST /repayments – Make repayments

GET /repayment/:id/receipt – Download PDF receipt

Make sure to send the JWT token in Authorization: Bearer <token> header for protected routes.

