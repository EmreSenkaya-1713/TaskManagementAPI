# Task Management API

A RESTful Task Management API built with Node.js, Express, Microsoft SQL Server, and JWT authentication.

This backend provides authentication, task management, validation, and protected API endpoints for the Task Management frontend application.

## Features

- User registration
- User login
- Password hashing with bcrypt
- JWT authentication
- Protected routes
- User-specific task management
- Create tasks
- Get all tasks
- Get task by ID
- Update tasks
- Delete tasks
- Mark tasks as completed
- Request validation
- Error handling
- Swagger API documentation
- Microsoft SQL Server integration

## Technologies

- Node.js
- Express.js
- Microsoft SQL Server
- mssql
- bcrypt
- jsonwebtoken
- express-validator
- Swagger
- swagger-ui-express
- swagger-jsdoc
- dotenv
- cors

## Project Structure

```text
TaskManagementAPI/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── authValidation.js
│   │   ├── errorMiddleware.js
│   │   ├── taskValidation.js
│   │   └── validationMiddleware.js
│   ├── models/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   └── taskService.js
│   └── utils/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js