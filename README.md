📚 MERN Bookstore App

🚀 Overview

The MERN Bookstore App is a full-stack web application that allows users to buy and rent books. Unlike traditional bookstore apps, this application features a unique book rental system, where users can rent books for a day, week, or month. The app is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

🎯 Features

📖 General Features

Browse and search for books.

View book details, including price and availability.

Add books to cart and proceed to checkout.

User authentication (sign-up, login, logout).

Order history tracking.

🔥 Unique Rental Feature

Users can rent books for a specific duration (day, week, month).

Rental pricing is calculated based on the selected duration.

Users can extend rentals before they expire.

A notification system alerts users when their rental period is about to end.

🛒 Checkout & Payment

Cash on delivery option.

SSLCommerz payment gateway integration for secure online payments.

🔐 Authentication & Authorization

User authentication with JWT-based authentication.

Admin panel to manage books, users, and orders.

⚙️ Tech Stack

Frontend: React.js, Redux Toolkit, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JWT, bcrypt

Payment Gateway: SSLCommerz

State Management: Redux Toolkit

🏗️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/yourusername/mern-bookstore.git
cd mern-bookstore

2️⃣ Install Dependencies

Backend

cd backend
npm install

Frontend

cd ../frontend
npm install

3️⃣ Configure Environment Variables

Create a .env file in the backend directory and set the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
SSL_COMMERZ_STORE_ID=your_sslcommerz_store_id
SSL_COMMERZ_STORE_PASSWORD=your_sslcommerz_password

4️⃣ Run the Application

Start Backend

cd backend
npm start

Start Frontend

cd ../frontend
npm start

The application will be available at http://localhost:3000.

🔥 API Endpoints

📚 Books

GET /api/books - Fetch all books

GET /api/books/:id - Fetch a single book by ID

POST /api/books - Add a new book (Admin only)

PUT /api/books/:id - Update book details (Admin only)

DELETE /api/books/:id - Remove a book (Admin only)

🛒 Orders & Rentals

POST /api/orders - Place a new order (purchase or rental)

GET /api/orders - Get user’s orders

POST /api/rentals - Rent a book

PUT /api/rentals/:id/extend - Extend rental period

🔐 Authentication

POST /api/auth/register - User registration

POST /api/auth/login - User login

GET /api/auth/profile - Get user profile

🚀 Future Improvements

Add book return reminders via email notifications.

Implement rental reviews and feedback system.

Introduce loyalty points for frequent renters.

Add admin dashboard analytics for book sales and rentals.

📜 License

This project is licensed under the MIT License.

💡 Contributing

Contributions are welcome! If you’d like to improve this project, feel free to fork the repository and submit a pull request.

📞 Contact

If you have any questions or feedback, reach out to me at your.email@example.com or open an issue in the repository.

Enjoy Reading & Renting! 📚🚀
