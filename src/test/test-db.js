import prisma from '../config/prisma.js'; // Adjust this path to your prisma instance file

async function test() {
  try {
    console.log("Checking database connection...");
    
    // 1. Create a test user
    const newUser = await prisma.users.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        user_name: "TestUser",
        password: "hashedpassword123", // In a real app, hash this!
      },
    });
    console.log("✅ User created:", newUser);

    // 2. Create a short URL for that user
    const newUrl = await prisma.short_url.create({
      data: {
        original_url: "https://www.google.com",
        short_code: `goog-${Math.floor(Math.random() * 1000)}`,
        user_id: newUser.id,
      },
    });
    console.log("✅ Short URL created:", newUrl);

    // 3. Fetch the user with their URLs to verify the relation
    const userWithUrls = await prisma.users.findUnique({
      where: { id: newUser.id },
      include: { urls: true },
    });
    console.log("✅ Relation verified:", userWithUrls);

  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();