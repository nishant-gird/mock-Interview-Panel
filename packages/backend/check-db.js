require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log("Checking database contents...\n");

    // Check questions count
    const questionCount = await prisma.question.count();
    console.log(`Total questions in DB: ${questionCount}`);

    // Check questions by role
    const roles = [
      "Backend Engineer",
      "Frontend Engineer",
      "Data Scientist",
      "Product Manager",
    ];

    for (const role of roles) {
      const count = await prisma.question.count({
        where: { role },
      });
      console.log(`  ${role}: ${count} questions`);
    }

    console.log("\nSample questions:");
    const samples = await prisma.question.findMany({
      take: 3,
      select: { id: true, role: true, difficulty: true, content: true },
    });

    samples.forEach((q) => {
      console.log(`  - [${q.role}] ${q.difficulty}: ${q.content.substring(0, 50)}...`);
    });

    console.log("\nChecking query for 'Data Scientist' + 'Intermediate':");
    const dsQuestions = await prisma.question.findMany({
      where: {
        role: "Data Scientist",
        difficulty: "Intermediate",
      },
    });

    console.log(`  Found: ${dsQuestions.length} questions`);
    if (dsQuestions.length > 0) {
      console.log(`  First: ${dsQuestions[0].content}`);
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
