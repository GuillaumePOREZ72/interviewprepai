/**
 * Jest Global Teardown
 * Runs once after all test suites complete
 */

export default async function globalTeardown(): Promise<void> {
  console.log("\n🧹 Running global teardown...");
  
  // Stop MongoDB Memory Server if it exists
  if (global.__MONGO_INSTANCE__) {
    await global.__MONGO_INSTANCE__.stop();
    console.log("✅ MongoDB Memory Server stopped");
  }

  console.log("✅ Global teardown complete\n");
}

