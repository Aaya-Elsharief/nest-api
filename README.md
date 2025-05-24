
# NestAuthAPI

A modular, scalable backend API built with **NestJS** and **MongoDB** demonstrating user authentication with JWT and clean architecture.

## 📖 About

This project was developed during my internship journey to build production-grade APIs using NestJS. It features modular design, JWT authentication, MongoDB integration via Mongoose, and DTO validation for input data.

## 🚀 Features

- User registration and login with JWT authentication
- Modular architecture for easy scalability and maintenance
- MongoDB integration using Mongoose
- DTO validation with class-validator
- Environment variable configuration with @nestjs/config

## 🛠️ Tech Stack

- NestJS (TypeScript)
- MongoDB / Mongoose
- JSON Web Token (JWT)
- class-validator
- dotenv

## 📦 Installation

```
git clone https://github.com/Aaya-Elsharief/nest-api.git
cd nest-api
npm install
```
🧾 Environment Variables
Create a `.env` file in the root directory with:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
```
▶️ Running the Project
```npm run start:dev```


📝 Notes
This project showcases scalable backend development with NestJS using best practices like dependency injection, DTO validation, and modularity.
