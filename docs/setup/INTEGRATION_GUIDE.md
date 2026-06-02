# MIP Frontend-Backend Integration Guide

## ✅ Current Status

Both services are running and integrated:

- **Backend (NestJS)**: http://localhost:3000
  - API Documentation: http://localhost:3000/api/docs
  - Authentication, Interviews, Questions, Responses, Sessions endpoints
  - PostgreSQL database with Prisma ORM

- **Frontend (TanStack Start)**: http://localhost:8081
  - React with TypeScript
  - Integrated API client connected to backend
  - Authentication pages (login/signup) with backend integration

## 🔄 Integration Architecture

### API Client (`src/lib/api-client.ts`)
The frontend uses a centralized API client that:
- Manages authentication tokens
- Handles all backend API calls
- Stores tokens in localStorage
- Provides typed methods for all endpoints

### Authentication Flow
1. User signs up/logs in on frontend
2. Frontend calls backend `/auth/register` or `/auth/login`
3. Backend returns JWT token
4. Frontend stores token and uses it for authenticated requests
5. Subsequent API calls include `Authorization: Bearer <token>` header

## 🚀 Quick Start

### 1. Backend Setup (Already Done)
```bash
cd mip-backend
npm run start:dev
```
Server runs on http://localhost:3000

### 2. Frontend Setup (Already Done)
```bash
cd mock-Interview-Panel
npm run dev
```
Server runs on http://localhost:8081

### 3. First Login/Signup
Visit http://localhost:8081 and:
- Click "Sign up" to create a new account
- Or use credentials: email: `test@example.com`, password: `test123456`

## 📚 Available Endpoints

### Authentication
- `POST /auth/register` - Create account
- `POST /auth/login` - Login
- `GET /auth/profile` - Get current user (protected)

### Interviews
- `POST /interviews` - Create interview
- `GET /interviews` - List user's interviews
- `GET /interviews/:id` - Get interview details
- `PUT /interviews/:id` - Update interview
- `DELETE /interviews/:id` - Delete interview
- `POST /interviews/:id/start` - Start interview
- `POST /interviews/:id/complete` - Complete interview

### Questions
- `GET /questions?role=...&difficulty=...` - Get filtered questions
- `GET /questions/random?role=...&difficulty=...&count=8` - Get random questions
- `GET /questions/:id` - Get single question

### Responses
- `POST /responses` - Submit response
- `GET /responses/interview/:interviewId` - Get responses for interview
- `GET /responses/:id` - Get single response

### Sessions
- `POST /sessions` - Create session
- `GET /sessions` - List user's sessions
- `GET /sessions/:id` - Get session details

## 🧪 Testing the Integration

### 1. Test Registration
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Password123!",
    "name": "Test User"
  }'
```

### 2. Test Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Password123!"
  }'
```

Copy the returned `token` and use it for authenticated requests:

### 3. Test Protected Endpoint
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:3000
VITE_ANTHROPIC_API_KEY=sk-ant-your-key
```

### Backend (.env)
```
DATABASE_URL=postgresql://mip_user:mip_password@localhost:5432/mip_db
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-xxxxx
JWT_EXPIRATION=7d
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:8081
```

## 📱 Frontend Routes

- `/` - Home page
- `/login` - Login page (integrated with backend)
- `/signup` - Sign up page (integrated with backend)
- `/dashboard` - User dashboard (protected)
- `/onboarding` - Onboarding flow
- `/schedule` - Interview scheduler
- `/interview/:id` - Active interview page
- `/sessions` - Sessions history
- `/progress` - Progress tracking
- `/report/:id` - Interview report

## 🔧 Development Workflow

### Making Changes to Frontend
1. Edit files in `mock-Interview-Panel/src/`
2. Vite automatically reloads the browser
3. Check http://localhost:8081

### Making Changes to Backend
1. Edit files in `mip-backend/src/`
2. NestJS hot reload automatically recompiles
3. Check http://localhost:3000/api/docs for API changes

### Testing API Changes
1. View Swagger docs at http://localhost:3000/api/docs
2. Or use curl/Postman
3. Frontend changes will automatically use new endpoints

## 🐛 Troubleshooting

### Frontend can't reach backend
- Check backend is running: `curl http://localhost:3000`
- Check `.env` has correct `VITE_API_BASE_URL`
- Check CORS is enabled in backend (should be, for localhost:8081)

### Login fails
- Ensure user exists in database
- Check credentials are correct
- Verify backend is returning token in response

### Port conflicts
- Backend port can be changed in `.env` (PORT=3000)
- Frontend will automatically use available port (8081, 8082, etc.)

## 🚀 Next Steps

1. **Implement Interview Flow**
   - Update `interview.$id.tsx` to fetch questions from backend
   - Connect response submission to backend API
   - Integrate AI evaluation

2. **Add Real Data**
   - Seed database with interview questions
   - Create sample interviews for testing
   - Run: `npm run prisma:seed` in backend

3. **Deploy**
   - Build frontend: `npm run build`
   - Deploy backend to cloud (Vercel, Railway, Fly.io)
   - Update `VITE_API_BASE_URL` to production API URL

## 📞 Support

- Backend API Docs: http://localhost:3000/api/docs
- Prisma Studio: `npm run prisma:studio` (in backend)
- Frontend Dev Server: http://localhost:8081
