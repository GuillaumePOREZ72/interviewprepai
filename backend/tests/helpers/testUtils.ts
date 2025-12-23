/**
 * Test Utilities and Helpers
 */
import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Express } from "express";
import User from "../../models/User.js";

/**
 * Interface for test user data
 */
export interface TestUserData {
  name: string;
  email: string;
  password: string;
  profileImageUrl?: string;
}

/**
 * Interface for authenticated user response
 */
export interface AuthenticatedUser {
  user: {
    _id: string;
    name: string;
    email: string;
    profileImageUrl?: string | null;
  };
  token: string;
  refreshToken: string;
}

/**
 * Default test user data
 */
export const defaultTestUser: TestUserData = {
  name: "Test User",
  email: "testuser@example.com",
  password: "TestPassword123!",
};

/**
 * Create a test user directly in the database
 */
export const createTestUser = async (
  userData: Partial<TestUserData> = {}
): Promise<AuthenticatedUser> => {
  const data = { ...defaultTestUser, ...userData };
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  // Create user in database
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    profileImageUrl: data.profileImageUrl || null,
  });

  // Generate tokens
  const token = jwt.sign(
    { id: user._id.toString() },
    process.env.JWT_SECRET!,
    { expiresIn: "10m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id.toString() },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" }
  );

  return {
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
    },
    token,
    refreshToken,
  };
};

/**
 * Register a test user via API
 */
export const registerTestUser = async (
  app: Express,
  userData: Partial<TestUserData> = {}
): Promise<request.Response> => {
  const data = { ...defaultTestUser, ...userData };
  
  return request(app)
    .post("/api/auth/register")
    .send(data);
};

/**
 * Login a test user via API
 */
export const loginTestUser = async (
  app: Express,
  credentials: { email: string; password: string }
): Promise<request.Response> => {
  return request(app)
    .post("/api/auth/login")
    .send(credentials);
};

/**
 * Create authenticated request helper
 */
export const authenticatedRequest = (app: Express, token: string) => ({
  get: (url: string) =>
    request(app).get(url).set("Authorization", `Bearer ${token}`),
  post: (url: string) =>
    request(app).post(url).set("Authorization", `Bearer ${token}`),
  put: (url: string) =>
    request(app).put(url).set("Authorization", `Bearer ${token}`),
  delete: (url: string) =>
    request(app).delete(url).set("Authorization", `Bearer ${token}`),
});

/**
 * Generate expired token for testing
 */
export const generateExpiredToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET!,
    { expiresIn: "-1s" } // Already expired
  );
};

/**
 * Generate invalid token for testing
 */
export const generateInvalidToken = (): string => {
  return jwt.sign(
    { id: "fake-user-id" },
    "wrong-secret-key",
    { expiresIn: "10m" }
  );
};

