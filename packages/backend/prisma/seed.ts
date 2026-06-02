import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create test user
  const hashedPassword = await bcrypt.hash("Test1234!", 10);

  const user = await prisma.user.create({
    data: {
      email: "test@mip.local",
      passwordHash: hashedPassword,
      name: "Test User",
      experienceYears: 3,
      targetRole: "Backend Engineer",
    },
  });

  console.log(`✅ Created user: ${user.email}`);

  // Comprehensive question bank
  const questions = [
    // Backend Engineer - Intermediate
    {
      role: "Backend Engineer",
      difficulty: "Intermediate",
      category: "Technical",
      content: "Explain how you would design a REST API for a social media platform.",
      expectedPoints:
        "API design patterns, scalability, error handling, versioning",
      sampleAnswers:
        "Should mention endpoints, HTTP methods, status codes...",
    },
    {
      role: "Backend Engineer",
      difficulty: "Intermediate",
      category: "SystemDesign",
      content: "Design a system to handle 1 million concurrent users.",
      expectedPoints:
        "Caching, load balancing, database sharding, message queues",
      sampleAnswers:
        "Should mention horizontal scaling, CDN, database optimization...",
    },
    {
      role: "Backend Engineer",
      difficulty: "Intermediate",
      category: "Technical",
      content: "How would you optimize a database query that is running slowly?",
      expectedPoints:
        "Indexing, query analysis, caching strategies, data structure optimization",
      sampleAnswers:
        "Check execution plan, add indexes, denormalize if needed...",
    },
    {
      role: "Backend Engineer",
      difficulty: "Intermediate",
      category: "Behavioral",
      content:
        "Tell me about a time you had to debug a production issue. How did you approach it?",
      expectedPoints:
        "Problem-solving approach, communication, collaboration, technical depth",
      sampleAnswers:
        "Should describe systematic debugging approach and communication...",
    },
    {
      role: "Backend Engineer",
      difficulty: "Intermediate",
      category: "Technical",
      content: "What is eventual consistency and when would you use it?",
      expectedPoints: "Distributed systems, CAP theorem, trade-offs",
      sampleAnswers:
        "Should mention DynamoDB, Cassandra, conflict resolution...",
    },
    {
      role: "Backend Engineer",
      difficulty: "Intermediate",
      category: "Technical",
      content: "How would you implement rate limiting in your API?",
      expectedPoints:
        "Token bucket, sliding window, Redis, scalability, fairness",
      sampleAnswers:
        "Should discuss algorithms and implementation considerations...",
    },
    // Backend Engineer - Advanced
    {
      role: "Backend Engineer",
      difficulty: "Advanced",
      category: "SystemDesign",
      content:
        "Design a real-time notification system for a platform with 100M users.",
      expectedPoints:
        "Message queues, WebSockets, scalability, reliability, latency",
      sampleAnswers:
        "Should discuss Kafka, Redis, connection pooling, disaster recovery...",
    },
    {
      role: "Backend Engineer",
      difficulty: "Advanced",
      category: "Technical",
      content:
        "How would you implement distributed transactions across multiple databases?",
      expectedPoints:
        "Two-phase commit, eventual consistency, saga pattern, trade-offs",
      sampleAnswers:
        "Should mention complexities and alternatives to ACID...",
    },
    // Frontend Engineer - Intermediate
    {
      role: "Frontend Engineer",
      difficulty: "Intermediate",
      category: "Technical",
      content: "How would you optimize a React application that is rendering slowly?",
      expectedPoints:
        "Memoization, code splitting, lazy loading, virtual lists, profiling",
      sampleAnswers:
        "Should mention React DevTools, Chrome DevTools, optimization techniques...",
    },
    {
      role: "Frontend Engineer",
      difficulty: "Intermediate",
      category: "Technical",
      content: "Explain the difference between var, let, and const in JavaScript.",
      expectedPoints:
        "Scope, hoisting, temporal dead zone, best practices",
      sampleAnswers:
        "Should explain function vs block scope, hoisting behavior...",
    },
    {
      role: "Frontend Engineer",
      difficulty: "Intermediate",
      category: "Technical",
      content: "How would you handle authentication in a single-page application?",
      expectedPoints:
        "JWT, refresh tokens, secure storage, CORS, XSS protection",
      sampleAnswers:
        "Should mention security considerations and token management...",
    },
    // Frontend Engineer - Advanced
    {
      role: "Frontend Engineer",
      difficulty: "Advanced",
      category: "SystemDesign",
      content:
        "Design a complex state management solution for a large application.",
      expectedPoints:
        "Redux, Context API, MobX, performance, scalability, developer experience",
      sampleAnswers:
        "Should compare different solutions and discuss trade-offs...",
    },
    // Fullstack Engineer - Intermediate
    {
      role: "Fullstack Engineer",
      difficulty: "Intermediate",
      category: "Technical",
      content:
        "How would you structure a web application for both frontend and backend?",
      expectedPoints:
        "Project structure, separation of concerns, API contracts, deployment",
      sampleAnswers:
        "Should mention monorepo vs polyrepo, shared types, CI/CD...",
    },
    // Data Scientist - Intermediate
    {
      role: "Data Scientist",
      difficulty: "Intermediate",
      category: "Technical",
      content: "How would you handle missing data in a dataset?",
      expectedPoints:
        "Understanding of imputation techniques, when to drop data, validation",
      sampleAnswers:
        "Should discuss various imputation methods and their trade-offs...",
    },
    {
      role: "Data Scientist",
      difficulty: "Intermediate",
      category: "Technical",
      content: "Explain the bias-variance tradeoff.",
      expectedPoints:
        "Underfitting, overfitting, regularization, model complexity",
      sampleAnswers:
        "Should explain with examples and mitigation strategies...",
    },
    {
      role: "Data Scientist",
      difficulty: "Intermediate",
      category: "Technical",
      content:
        "How would you evaluate a machine learning model's performance?",
      expectedPoints:
        "Metrics selection, validation strategy, cross-validation, class imbalance",
      sampleAnswers:
        "Should mention precision, recall, ROC-AUC, F1 score...",
    },
    // Product Manager - Intermediate
    {
      role: "Product Manager",
      difficulty: "Intermediate",
      category: "Behavioral",
      content: "How do you prioritize features in a product roadmap?",
      expectedPoints:
        "User research, business impact, technical feasibility, stakeholder management",
      sampleAnswers:
        "Should mention frameworks like RICE, user interviews...",
    },
    {
      role: "Product Manager",
      difficulty: "Intermediate",
      category: "Behavioral",
      content: "Tell me about a product failure and what you learned.",
      expectedPoints:
        "Self-reflection, learning, accountability, user empathy",
      sampleAnswers:
        "Should show honest assessment and learning outcomes...",
    },
    // DevOps Engineer - Intermediate
    {
      role: "DevOps Engineer",
      difficulty: "Intermediate",
      category: "Technical",
      content: "How would you set up a CI/CD pipeline for a microservices application?",
      expectedPoints:
        "Containers, orchestration, automation, monitoring, security",
      sampleAnswers:
        "Should mention Docker, Kubernetes, Jenkins/GitLab CI...",
    },
    {
      role: "DevOps Engineer",
      difficulty: "Intermediate",
      category: "Technical",
      content: "Explain the differences between monolithic and microservices architecture.",
      expectedPoints:
        "Scalability, complexity, deployment, operational overhead",
      sampleAnswers:
        "Should discuss trade-offs and when to use each...",
    },
  ];

  // Delete existing questions to avoid duplicates
  await prisma.question.deleteMany({});

  const createdQuestions = await prisma.question.createMany({
    data: questions,
  });

  console.log(`✅ Created ${createdQuestions.count} questions`);

  // Create sample interview
  const interview = await prisma.interview.create({
    data: {
      userId: user.id,
      role: "Backend Engineer",
      difficulty: "Intermediate",
      panelTypes: ["Technical", "HR"],
      status: "completed",
      totalScore: 82,
      averageScore: 82,
      startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      completedAt: new Date(),
      durationSeconds: 2400,
    },
  });

  console.log(`✅ Created interview: ${interview.id}`);

  // Get first two questions for responses
  const allQuestions = await prisma.question.findMany({
    take: 2,
  });

  // Create sample responses
  for (const q of allQuestions) {
    await prisma.response.create({
      data: {
        interviewId: interview.id,
        questionId: q.id,
        answerText:
          "This is a sample answer to demonstrate the system working correctly.",
        aiScore: Math.random() * 40 + 60,
        aiFeedback:
          "Good understanding of the topic. Could provide more specific examples.",
        strengths: ["Clear explanation", "Technical accuracy"],
        improvements: ["More concrete examples", "Edge case consideration"],
      },
    });
  }

  console.log(`✅ Created sample responses`);

  // Create session for interview
  await prisma.session.create({
    data: {
      userId: user.id,
      interviewId: interview.id,
      durationSeconds: 2400,
      totalScore: 82,
      averageScore: 82,
      status: "completed",
    },
  });

  console.log(`✅ Created session`);
  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

