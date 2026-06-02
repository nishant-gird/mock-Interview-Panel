#!/bin/bash

# This script inserts questions into the PostgreSQL database directly

PGPASSWORD="mip_password" psql -h localhost -p 5432 -U mip_user -d mip_db << EOF

-- Delete existing questions to avoid duplicates
DELETE FROM questions;

-- Insert comprehensive question bank
INSERT INTO questions (role, difficulty, category, content, "expectedPoints", "sampleAnswers", "createdAt", "updatedAt")
VALUES
-- Backend Engineer - Intermediate
('Backend Engineer', 'Intermediate', 'Technical', 'Explain how you would design a REST API for a social media platform.', 'API design patterns, scalability, error handling, versioning', 'Should mention endpoints, HTTP methods, status codes...', NOW(), NOW()),
('Backend Engineer', 'Intermediate', 'SystemDesign', 'Design a system to handle 1 million concurrent users.', 'Caching, load balancing, database sharding, message queues', 'Should mention horizontal scaling, CDN, database optimization...', NOW(), NOW()),
('Backend Engineer', 'Intermediate', 'Technical', 'How would you optimize a database query that is running slowly?', 'Indexing, query analysis, caching strategies, data structure optimization', 'Check execution plan, add indexes, denormalize if needed...', NOW(), NOW()),
('Backend Engineer', 'Intermediate', 'Behavioral', 'Tell me about a time you had to debug a production issue. How did you approach it?', 'Problem-solving approach, communication, collaboration, technical depth', 'Should describe systematic debugging approach and communication...', NOW(), NOW()),
('Backend Engineer', 'Intermediate', 'Technical', 'What is eventual consistency and when would you use it?', 'Distributed systems, CAP theorem, trade-offs', 'Should mention DynamoDB, Cassandra, conflict resolution...', NOW(), NOW()),
('Backend Engineer', 'Intermediate', 'Technical', 'How would you implement rate limiting in your API?', 'Token bucket, sliding window, Redis, scalability, fairness', 'Should discuss algorithms and implementation considerations...', NOW(), NOW()),

-- Backend Engineer - Advanced
('Backend Engineer', 'Advanced', 'SystemDesign', 'Design a real-time notification system for a platform with 100M users.', 'Message queues, WebSockets, scalability, reliability, latency', 'Should discuss Kafka, Redis, connection pooling, disaster recovery...', NOW(), NOW()),
('Backend Engineer', 'Advanced', 'Technical', 'How would you implement distributed transactions across multiple databases?', 'Two-phase commit, eventual consistency, saga pattern, trade-offs', 'Should mention complexities and alternatives to ACID...', NOW(), NOW()),

-- Frontend Engineer - Intermediate
('Frontend Engineer', 'Intermediate', 'Technical', 'How would you optimize a React application that is rendering slowly?', 'Memoization, code splitting, lazy loading, virtual lists, profiling', 'Should mention React DevTools, Chrome DevTools, optimization techniques...', NOW(), NOW()),
('Frontend Engineer', 'Intermediate', 'Technical', 'Explain the difference between var, let, and const in JavaScript.', 'Scope, hoisting, temporal dead zone, best practices', 'Should explain function vs block scope, hoisting behavior...', NOW(), NOW()),
('Frontend Engineer', 'Intermediate', 'Technical', 'How would you handle authentication in a single-page application?', 'JWT, refresh tokens, secure storage, CORS, XSS protection', 'Should mention security considerations and token management...', NOW(), NOW()),

-- Frontend Engineer - Advanced
('Frontend Engineer', 'Advanced', 'SystemDesign', 'Design a complex state management solution for a large application.', 'Redux, Context API, MobX, performance, scalability, developer experience', 'Should compare different solutions and discuss trade-offs...', NOW(), NOW()),

-- Fullstack Engineer - Intermediate
('Fullstack Engineer', 'Intermediate', 'Technical', 'How would you structure a web application for both frontend and backend?', 'Project structure, separation of concerns, API contracts, deployment', 'Should mention monorepo vs polyrepo, shared types, CI/CD...', NOW(), NOW()),

-- Data Scientist - Intermediate
('Data Scientist', 'Intermediate', 'Technical', 'How would you handle missing data in a dataset?', 'Understanding of imputation techniques, when to drop data, validation', 'Should discuss various imputation methods and their trade-offs...', NOW(), NOW()),
('Data Scientist', 'Intermediate', 'Technical', 'Explain the bias-variance tradeoff.', 'Underfitting, overfitting, regularization, model complexity', 'Should explain with examples and mitigation strategies...', NOW(), NOW()),
('Data Scientist', 'Intermediate', 'Technical', 'How would you evaluate a machine learning model'\''s performance?', 'Metrics selection, validation strategy, cross-validation, class imbalance', 'Should mention precision, recall, ROC-AUC, F1 score...', NOW(), NOW()),

-- Product Manager - Intermediate
('Product Manager', 'Intermediate', 'Behavioral', 'How do you prioritize features in a product roadmap?', 'User research, business impact, technical feasibility, stakeholder management', 'Should mention frameworks like RICE, user interviews...', NOW(), NOW()),
('Product Manager', 'Intermediate', 'Behavioral', 'Tell me about a product failure and what you learned.', 'Self-reflection, learning, accountability, user empathy', 'Should show honest assessment and learning outcomes...', NOW(), NOW()),

-- DevOps Engineer - Intermediate
('DevOps Engineer', 'Intermediate', 'Technical', 'How would you set up a CI/CD pipeline for a microservices application?', 'Containers, orchestration, automation, monitoring, security', 'Should mention Docker, Kubernetes, Jenkins/GitLab CI...', NOW(), NOW()),
('DevOps Engineer', 'Intermediate', 'Technical', 'Explain the differences between monolithic and microservices architecture.', 'Scalability, complexity, deployment, operational overhead', 'Should discuss trade-offs and when to use each...', NOW(), NOW());

SELECT COUNT(*) as total_questions FROM questions;
SELECT role, COUNT(*) as count FROM questions GROUP BY role;

EOF
