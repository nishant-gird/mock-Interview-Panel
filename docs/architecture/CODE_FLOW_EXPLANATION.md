# MIP Application Code Flow Explanation

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React/TanStack)                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Routes (__root.tsx, login, signup, etc)     │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │   API Client (api-client.ts)                 │   │    │
│  │  │   - Handles all HTTP requests                │   │    │
│  │  │   - Manages auth tokens                      │   │    │
│  │  │   - Stores user data in localStorage         │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────┬─────────────────────────────────┘
                             │ HTTP Requests/Responses
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (NestJS)                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           Controllers (API Endpoints)               │    │
│  │  - /auth (register, login, profile, update)         │    │
│  │  - /interviews (CRUD + roles/interviewers)          │    │
│  │  - /questions (get by role, random)                 │    │
│  │  - /responses (submit, fetch)                       │    │
│  │  - /sessions (create, fetch)                        │    │
│  └──────────────────────┬───────────────────────────────┘    │
│  ┌──────────────────────↓───────────────────────────────┐    │
│  │        Services (Business Logic)                     │    │
│  │  - AuthService, InterviewsService, etc              │    │
│  └──────────────────────┬───────────────────────────────┘    │
│  ┌──────────────────────↓───────────────────────────────┐    │
│  │        Prisma (ORM)                                  │    │
│  │  - Database queries and operations                   │    │
│  └──────────────────────┬───────────────────────────────┘    │
└────────────────────────────┬─────────────────────────────────┘
                             │ SQL Queries
                             ↓
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │    Database     │
                    └─────────────────┘
```

---

## 2. Authentication Flow

### Login/Register Flow:

```
User Action (Login/Register)
         ↓
    signup.tsx / login.tsx
    (Component with form)
         ↓
    apiClient.register() / apiClient.login()
    (POST /auth/register or /auth/login)
         ↓
    BACKEND: AuthController
         ↓
    AuthService:
    - Hash password (bcryptjs)
    - Check if user exists
    - Create user in database
    - Generate JWT token
         ↓
    Response: { token, user: {id, email, name} }
         ↓
    FRONTEND: apiClient.setToken() & apiClient.setUser()
    - Store token in localStorage
    - Store user data in localStorage
    - Navigation to next page
         ↓
    Success ✅
```

**Code Example:**

```typescript
// Frontend: signup.tsx
const handleSubmit = async (e: React.FormEvent) => {
  const response = await apiClient.register(email, pw, name);
  if (response.token) {
    apiClient.setToken(response.token);        // Store JWT
    apiClient.setUser(response.user);          // Store user info
    nav({ to: "/onboarding" });                // Navigate
  }
};

// Backend: auth.service.ts
async register(dto: RegisterDto) {
  const hashedPassword = await bcrypt.hash(dto.password, 10);
  const user = await this.prisma.user.create({
    data: {
      email: dto.email,
      passwordHash: hashedPassword,
      name: dto.name,
    },
  });
  const token = this.jwtService.sign({
    sub: user.id,
    email: user.email,
  });
  return { token, user };
}
```

---

## 3. Dashboard Data Flow

### How Dashboard Fetches and Displays Real Data:

```
Dashboard Component Mounts
         ↓
useEffect Hook Triggers
         ↓
apiClient.getInterviews()
(GET /interviews with JWT token)
         ↓
BACKEND: InterviewsController.findAll()
         ↓
InterviewsService.findAll(userId)
Prisma Query:
  SELECT * FROM interviews 
  WHERE userId = 'xxx'
  ORDER BY createdAt DESC
         ↓
Returns: Interview[]
[
  { id, role, difficulty, averageScore, createdAt, ...},
  { id, role, difficulty, averageScore, createdAt, ...},
]
         ↓
FRONTEND: setInterviews(data)
         ↓
Calculate Statistics:
  - totalSessions = interviews.length
  - avgScore = interviews.reduce() / length
  - streak = calculateStreak(interviews)
  - recent = interviews.slice(0, 4)
         ↓
Render Components with Real Data ✅
```

**Code Example:**

```typescript
// Frontend: dashboard.tsx
function Dashboard() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getInterviews();
        const data = Array.isArray(response.data) ? response.data : response;
        setInterviews(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate from real data
  const totalSessions = interviews.length;
  const avgScore = interviews.length > 0
    ? Math.round(
        interviews.reduce((sum, i) => sum + (i.averageScore || 0), 0) / 
        interviews.length
      )
    : 0;

  return (
    <Stat value={totalSessions.toString()} />
    <Stat value={`${avgScore}%`} />
  );
}
```

---

## 4. API Client Architecture

### How apiClient Works:

```typescript
// api-client.ts
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;
  private user: any = null;

  constructor(baseUrl: string) {
    // Load saved token from localStorage on init
    this.token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('currentUser');
    this.user = userStr ? JSON.parse(userStr) : null;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);  // Persist
  }

  setUser(user: any) {
    this.user = user;
    localStorage.setItem('currentUser', JSON.stringify(user)); // Persist
  }

  private getHeaders(): HeadersInit {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;  // Add JWT
    }
    return headers;
  }

  async request<T>(endpoint: string, method: string, data?: any): Promise<T> {
    const response = await fetch(
      `${this.baseUrl}${endpoint}`,
      {
        method,
        headers: this.getHeaders(),  // Includes JWT token
        body: data ? JSON.stringify(data) : undefined,
      }
    );
    return response.json();
  }

  // Public methods for each endpoint
  async getInterviews() {
    return this.request('/interviews', 'GET');
  }

  async getRoles() {
    return this.request('/interviews/config/roles', 'GET');
  }

  async updateProfile(data) {
    return this.request('/auth/profile', 'PUT', data);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
```

**Flow:**
```
apiClient.getInterviews()
    ↓
this.request('/interviews', 'GET')
    ↓
fetch(url, {
  method: 'GET',
  headers: { Authorization: 'Bearer jwt_token_here' }
})
    ↓
BACKEND receives request with JWT
    ↓
JwtAuthGuard validates token
    ↓
Extract userId from token
    ↓
Pass to controller & service
```

---

## 5. Protected Route & JWT Flow

### How JWT Protection Works:

```
Frontend Request
with Authorization Header:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

         ↓
BACKEND: JwtAuthGuard (Middleware)
         ↓
Extract token from header
         ↓
Verify signature with JWT_SECRET
         ↓
Decode token:
  {
    sub: 'user-id-uuid',
    email: 'user@example.com',
    iat: 1234567890,
    exp: 1234654290
  }
         ↓
Is token expired?
  YES → Reject 401 Unauthorized ✗
  NO  → Continue ✓
         ↓
Pass userId to controller/service:
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    req.user.userId  // Available here
  }
         ↓
Database query filters by userId
```

**Code Example:**

```typescript
// Backend: jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

// Backend: interviews.controller.ts
@Get()
@UseGuards(JwtAuthGuard)
async findAll(@Request() req) {
  // req.user.userId is available here (from JWT)
  return this.interviewsService.findAll(req.user.userId);
}
```

---

## 6. Settings Profile Update Flow

### How Profile Updates Work:

```
User Edits Form & Clicks "Save"
         ↓
handleSave() called
         ↓
apiClient.updateProfile({
  name: "New Name",
  experienceYears: 5,
  targetRole: "Senior Backend Engineer"
})
         ↓
BACKEND: PUT /auth/profile
         ↓
JwtAuthGuard validates JWT
         ↓
AuthController.updateProfile()
         ↓
AuthService.updateProfile(userId, data)
         ↓
Prisma.user.update({
  where: { id: userId },
  data: { name, experienceYears, targetRole }
})
         ↓
Database updated
         ↓
Return updated user object
         ↓
FRONTEND: apiClient.setUser(updatedUser)
         ↓
localStorage updated
         ↓
Success message displayed ✅
```

---

## 7. Schedule Page - Roles & Interviewers Fetch

### Dynamic Configuration Loading:

```
Schedule Component Mounts
         ↓
useEffect hook
         ↓
Parallel API calls:
  Promise.all([
    apiClient.getRoles(),
    apiClient.getInterviewers()
  ])
         ↓
REQUEST 1: GET /interviews/config/roles
  BACKEND: InterviewsController.getRoles()
  Returns:
  {
    roles: [
      { id: "backend-engineer", name: "Backend Engineer", ... },
      { id: "frontend-engineer", name: "Frontend Engineer", ... },
      ...
    ]
  }
         ↓
REQUEST 2: GET /interviews/config/interviewers
  BACKEND: InterviewsController.getInterviewers()
  Returns:
  {
    interviewers: [
      { id: "priya-rao", name: "Priya Rao", role: "HR Interviewer", ... },
      { id: "arjun-sharma", name: "Arjun Sharma", role: "Technical Lead", ... },
      ...
    ]
  }
         ↓
Both responses received
         ↓
setRoles(rolesList)
setInterviewers(interviewersList)
         ↓
Render role cards with real data
Render interviewer selection with real data ✅
```

**Code Example:**

```typescript
// Frontend: schedule.tsx
useEffect(() => {
  const fetchData = async () => {
    const [rolesRes, interviewersRes] = await Promise.all([
      apiClient.getRoles(),
      apiClient.getInterviewers(),
    ]);
    setRoles(rolesRes.roles);
    setInterviewers(interviewersRes.interviewers);
  };
  fetchData();
}, []);

// Backend: interviews.controller.ts
@Get('config/roles')
async getRoles() {
  return {
    roles: [
      { id: 'backend-engineer', name: 'Backend Engineer', description: '...' },
      // ... more roles
    ],
  };
}
```

---

## 8. Sessions Page - Filter & Display

### How Sessions Are Fetched and Filtered:

```
Sessions Component Mounts
         ↓
useEffect hook
         ↓
apiClient.getInterviews()
(GET /interviews with JWT)
         ↓
BACKEND: InterviewsService.findAll(userId)
Prisma Query:
  SELECT * FROM interviews 
  WHERE userId = 'xxx'
  ORDER BY createdAt DESC
         ↓
FRONTEND: setInterviews(allInterviews)
         ↓
User selects role filter
         ↓
filteredPast = interviews.filter(i => i.role === selectedRole)
         ↓
Render table with filtered data:
  - Date column: formatDate(createdAt)
  - Role column: i.role
  - Duration: formatDuration(durationSeconds)
  - Score: i.averageScore (with color coding)
  - Status: capitalize(i.status)
         ↓
Click "View report" → Navigate to report page ✅
```

---

## 9. Component Hierarchy & State Flow

```
__root.tsx (Root Layout)
├── AppLayout (Header + Sidebar)
│   └── Router Outlet
│       ├── login.tsx
│       │   └── FormFields → apiClient.login() → Navigate to dashboard
│       │
│       ├── signup.tsx
│       │   └── FormFields → apiClient.register() → Navigate to onboarding
│       │
│       ├── dashboard.tsx
│       │   ├── useEffect → apiClient.getInterviews()
│       │   ├── State: [interviews, loading, error]
│       │   ├── Calculate: totalSessions, avgScore, streak
│       │   └── Render: Stats, SkillPerformance, RecentSessions
│       │
│       ├── sessions.tsx
│       │   ├── useEffect → apiClient.getInterviews()
│       │   ├── Filter logic (upcoming vs past)
│       │   └── Render: Calendar view + Table
│       │
│       ├── settings.tsx
│       │   ├── Profile tab
│       │   │   ├── useEffect → apiClient.getProfile()
│       │   │   ├── Form state: [name, experienceYears, targetRole]
│       │   │   └── Save → apiClient.updateProfile()
│       │   ├── Resume tab
│       │   ├── Notifications tab
│       │   └── Account tab
│       │
│       ├── schedule.tsx
│       │   ├── useEffect → Promise.all([getRoles, getInterviewers])
│       │   ├── State: [step, role, panel, difficulty, date, time]
│       │   ├── Step 0: Role selection
│       │   ├── Step 1: Interviewer selection
│       │   ├── Step 2: Difficulty & round type
│       │   ├── Step 3: Date & time picker
│       │   └── Step 4: Confirmation
│       │
│       └── interview.$id.tsx (Still has hardcoded questions)
│           └── TODO: Fetch from /questions/random

AppLayout (Shared)
├── Header
│   ├── Logo
│   ├── Notification bell
│   └── User menu (Profile, Settings, Logout)
└── Sidebar Navigation
    ├── Dashboard
    ├── New Interview
    ├── Sessions
    ├── Progress
    ├── Resume
    ├── Goals
    └── Settings
```

---

## 10. Data Persistence Strategy

### Local Storage:

```
Key: "authToken"
Value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
Purpose: JWT token for authenticated requests

Key: "currentUser"
Value: {
  "id": "uuid-user-id",
  "email": "user@example.com",
  "name": "User Name",
  "experienceYears": 5,
  "targetRole": "Senior Backend Engineer"
}
Purpose: Display user info in UI, avoid extra API calls
```

### Browser Lifecycle:

```
App Load
  ↓
api-client.constructor()
  ├── localStorage.getItem('authToken')
  ├── localStorage.getItem('currentUser')
  └── Initialize this.token and this.user
  ↓
User logged in?
  YES → this.token exists → All requests have JWT header ✅
  NO  → this.token is null → Can only access public routes
  ↓
User navigates pages
  ↓
Components use apiClient
  ├── Already has token from constructor
  ├── No need to re-authenticate
  └── Direct API calls with JWT ✅
  ↓
User logs out
  ↓
apiClient.clearToken()
  ├── localStorage.removeItem('authToken')
  ├── localStorage.removeItem('currentUser')
  ├── this.token = null
  ├── this.user = null
  └── Navigate to login ✅
```

---

## 11. Error Handling Flow

### API Error Handling:

```
apiClient.request()
  ↓
fetch(url)
  ↓
Response received
  ├── response.ok === true
  │   └── return response.json() ✅
  │
  └── response.ok === false
      ├── await response.json() to get error details
      ├── throw new Error(error.message)
      └── Catch in component
          ├── setError(err.message)
          ├── Display error UI
          └── No navigation ✗

Component Example:
  try {
    const response = await apiClient.getInterviews();
    setInterviews(response);
  } catch (err) {
    setError(err.message);  // Display error message
  } finally {
    setLoading(false);
  }
```

---

## 12. Summary of Key Flows

| Flow | Start | End | Key Point |
|------|-------|-----|-----------|
| **Login** | Login form → POST /auth/login | Token stored in localStorage | JWT enables protected routes |
| **Dashboard** | Component mount → GET /interviews | Display real interview data | No hardcoding, dynamic calculation |
| **Profile Update** | Save button → PUT /auth/profile | localStorage updated | User sees changes immediately |
| **Schedule Roles** | Page mount → GET /interviews/config/roles | Render role cards | Dynamic role list |
| **Sessions Filter** | GET /interviews → User filters | Display filtered table | All data from API |
| **Protected Routes** | Request with JWT → JwtAuthGuard | Controller executes | userId extracted from token |

---

## 13. What's Dynamic vs Static (Current State)

### ✅ Fully Dynamic (Data from Backend)
- Login & authentication
- Dashboard stats and recent sessions
- Sessions page data
- Settings profile data
- Schedule roles and interviewers

### ⚠️ Partially Dynamic
- Interview flow (questions still hardcoded)
- Progress analytics (data structure ready, calculations hardcoded)
- Reports (structure ready, data hardcoded)

### ❌ Still Hardcoded
- Interview questions (interview.$id.tsx)
- Progress trends (progress.tsx)
- Report feedback (report.$id.tsx)
