# Task Management API

Node.js, Express.js ve Microsoft SQL Server kullanılarak geliştirilmiş bir REST API projesidir.

Kullanıcılar sisteme kayıt olabilir, giriş yapabilir ve JWT authentication ile kendi görevlerini yönetebilir.

## Features

- User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Create task
- Get all tasks
- Get task by ID
- Update task
- Delete task
- User-specific task management
- Request validation
- Error handling
- Swagger API documentation
- MSSQL database integration

## Technologies

- Node.js
- Express.js
- Microsoft SQL Server
- JWT
- bcrypt
- express-validator
- Swagger / OpenAPI
- dotenv

## Project Structure

```text
TaskManagementAPI/
│
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
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   └── services/
│       ├── authService.js
│       └── taskService.js
│
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Installation

Projeyi bilgisayarınıza klonlayın:

```bash
git clone <repository-url>
```

Proje klasörüne girin:

```bash
cd TaskManagementAPI
```

Gerekli paketleri yükleyin:

```bash
npm install
```

`.env.example` dosyasını `.env` olarak kopyalayın ve kendi veritabanı bilgilerinizi girin.

Örnek:

```env
PORT=3000

DB_SERVER=localhost
DB_DATABASE=TaskManagementDB
DB_USER=your_database_user
DB_PASSWORD=your_database_password

DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=true

JWT_SECRET=your_jwt_secret
```

## Running the Project

Development modunda çalıştırmak için:

```bash
npm run dev
```

Server varsayılan olarak:

```text
http://localhost:3000
```

adresinde çalışır.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Yeni kullanıcı oluşturur |
| POST | /api/auth/login | Kullanıcı girişi yapar |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | Kullanıcının görevlerini getirir |
| GET | /api/tasks/:id | Belirli bir görevi getirir |
| POST | /api/tasks | Yeni görev oluşturur |
| PUT | /api/tasks/:id | Görevi günceller |
| DELETE | /api/tasks/:id | Görevi siler |

Task endpointleri JWT authentication gerektirir.

## Swagger Documentation

API çalıştırıldıktan sonra Swagger dokümantasyonuna aşağıdaki adresten ulaşabilirsiniz:

```text
http://localhost:3000/api-docs
```

Swagger üzerinden endpointleri görüntüleyebilir ve test edebilirsiniz.

## Authentication

Başarılı giriş işleminden sonra API bir JWT token döndürür.

Korunan endpointlere istek gönderirken token Bearer Token olarak kullanılmalıdır:

```text
Authorization: Bearer <token>
```

## Author

Emre Şenkaya