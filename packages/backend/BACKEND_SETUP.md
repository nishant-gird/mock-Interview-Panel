# MIP Backend - NestJS Development Guide

## ⚡ Quick Start (5 Minutes)

### Prerequisites
- Node.js v20+
- npm v10+
- PostgreSQL 14+ (or Docker)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database

#### Option A: Local PostgreSQL
```bash
# Create database user
psql -U postgres

postgres=# CREATE USER mip_user WITH PASSWORD 'mip_password';
postgres=# CREATE DATABASE mip_db OWNER mip_user;
postgres=# \q
```

#### Option B: Docker PostgreSQL
```bash
docker run --name mip-postgres \
  -e POSTGRES_USER=mip_user \
  -e POSTGRES_PASSWORD=mip_password \
  -e POSTGRES_DB=mip_db \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### 3. Setup .env
```bash
# Already created with default values
cat .env
```

Update if your database credentials differ:
```env
DATABASE_URL="postgresql://mip_user:mip_password@localhost:5432/mip_db"
```

### 4. Run Migrations
```bash
npm run prisma:migrate
```

### 5. Seed Sample Data
```bash
npm run prisma:seed
```

### 6. Start Development Server
```bash
npm run start:dev
```

You should see:
```
✅ Server running on http://localhost:3000
📚 API Docs: http://localhost:3000/api/docs
```

### 7. Open Swagger Docs
Visit: **http://localhost:3000/api/docs**

---

## 🧪 Testing Your API

### Register a New User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "Password123!",
    "name": "New User"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "Password123!"
  }'
```

This returns a JWT token:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}
```

### Get Profile (Protected Route)
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Interview
```bash
curl -X POST http://localhost:3000/interviews \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "Backend Engineer",
    "difficulty": "Intermediate",
    "panelTypes": ["Technical", "HR"]
  }'
```

### Get Questions
```bash
curl -X GET "http://localhost:3000/questions?role=Backend%20Engineer&difficulty=Intermediate" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Submit Response
```bash
curl -X POST http://localhost:3000/responses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "interviewId": "interview-id-here",
    "questionId": "question-id-here",
    "answerText": "This is my answer...",
    "aiScore": 85,
    "aiFeedback": "Good response!",
    "strengths": ["Clear", "Accurate"],
    "improvements": ["More examples"]
  }'
```

---

## 📊 Available Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user profile (protected)

### Interviews
- `POST /interviews` - Create interview (protected)
- `GET /interviews` - List user's interviews (protected)
- `GET /interviews/:id` - Get interview details (protected)
- `PUT /interviews/:id` - Update interview (protected)
- `DELETE /interviews/:id` - Delete interview (protected)
- `POST /interviews/:id/start` - Start interview (protected)
- `POST /interviews/:id/complete` - Complete interview (protected)

### Questions
- `GET /questions?role=...&difficulty=...` - Get questions by role/difficulty (protected)
- `GET /questions/random?role=...&difficulty=...&count=8` - Get random questions (protected)
- `GET /questions/:id` - Get single question (protected)

### Responses
- `POST /responses` - Submit response (protected)
- `GET /responses/interview/:interviewId` - Get interview responses (protected)
- `GET /responses/:id` - Get single response (protected)

### Sessions
- `POST /sessions` - Create session (protected)
- `GET /sessions` - List user's sessions (protected)
- `GET /sessions/:id` - Get session details (protected)

---

## 🗄️ Database Structure

### User Table
- `id` (UUID) - Primary key
- `email` (String) - Unique email
- `passwordHash` (String) - Hashed password
- `name` (String) - User's name
- `experienceYears` (Int) - Years of experience
- `targetRole` (String) - Target job role
- `createdAt`, `updatedAt` - Timestamps

### Interview Table
- `id` (UUID) - Primary key
- `userId` (UUID) - Foreign key to User
- `role` (String) - Job role
- `difficulty` (String) - Beginner/Intermediate/Advanced
- `panelTypes` (String[]) - Array of panel types
- `status` (String) - scheduled/in_progress/completed/cancelled
- `totalScore` (Float) - Overall score
- `averageScore` (Float) - Average score
- `startedAt`, `completedAt` (DateTime) - Timestamps
- `durationSeconds` (Int) - Interview duration
- `createdAt`, `updatedAt` - Timestamps

### Question Table
- `id` (UUID) - Primary key
- `role` (String) - Target role
- `difficulty` (String) - Beginner/Intermediate/Advanced
- `category` (String) - Technical/Behavioral/SystemDesign
- `content` (Text) - Question text
- `expectedPoints` (Text) - Expected answer points
- `sampleAnswers` (Text) - Sample answers
- `createdAt`, `updatedAt` - Timestamps

### Response Table
- `id` (UUID) - Primary key
- `interviewId` (UUID) - Foreign key to Interview
- `questionId` (UUID) - Foreign key to Question
- `answerText` (Text) - User's answer
- `aiScore` (Float) - AI-generated score (0-100)
- `aiFeedback` (Text) - AI feedback
- `strengths` (String[]) - Array of strengths
- `improvements` (String[]) - Array of improvements
- `submittedAt` (DateTime) - Submission timestamp

### Session Table
- `id` (UUID) - Primary key
- `userId` (UUID) - Foreign key to User
- `interviewId` (UUID) - Foreign key to Interview
- `durationSeconds` (Int) - Session duration
- `totalScore` (Float) - Total score
- `averageScore` (Float) - Average score
- `status` (String) - completed/cancelled
- `completedAt` (DateTime) - Completion time

---

## 🛠️ Development Commands

```bash
# Start dev server with hot reload
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod

# Run tests
npm run test

# Format code
npm run format

# Lint code
npm run lint

# Database commands
npm run prisma:migrate   # Run pending migrations
npm run prisma:seed      # Seed sample data
npm run prisma:studio    # Open Prisma Studio GUI
```

---

## 🔍 Debugging

### View Database in GUI
```bash
npm run prisma:studio
```
Opens at: **http://localhost:5555**

### View Logs
Check terminal output for logs. Server logs all requests and errors.

### Common Issues

**"Connection refused" error:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Try Docker if local installation has issues

**"Password does not match" error:**
- Make sure to use correct PostgreSQL password
- Update DATABASE_URL if credentials differ

**Port 3000 already in use:**
- Change PORT in .env
- Or kill process: `kill -9 $(lsof -ti:3000)`

---

## 📚 Project Structure

```
mip-backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── strategies/
│   │   │   ├── guards/
│   │   │   └── dtos/
│   │   ├── interviews/
│   │   ├── questions/
│   │   ├── responses/
│   │   └── sessions/
│   ├── prisma/
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── .env
├── .env.example
└── package.json
```

---

## 🚀 Next Steps

### Phase 2: Connect to Frontend
1. Start the backend: `npm run start:dev`
2. Verify it's running on http://localhost:3000
3. Check Swagger docs at http://localhost:3000/api/docs
4. Connect TanStack Start frontend to use these endpoints

### Phase 3: Advanced Features
- Add caching with Redis
- Add rate limiting
- Setup CI/CD
- Deploy to production

---

## 💡 Tips

1. **Use Swagger Docs** - Try endpoints directly in browser
2. **Seed Data** - Run `npm run prisma:seed` to get test data
3. **Prisma Studio** - Run `npm run prisma:studio` to view database
4. **JWT Token** - Valid for 7 days, regenerate with login
5. **CORS** - Frontend on http://localhost:5173 is allowed

---

## 📞 Support

- **Swagger Docs:** http://localhost:3000/api/docs
- **GitHub:** [Project Repo]
- **Database Issues:** Check `npm run prisma:studio`

---

**Happy coding! 🚀**
