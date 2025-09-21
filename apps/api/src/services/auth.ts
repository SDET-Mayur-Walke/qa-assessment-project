import jwt from "jsonwebtoken";
import type { User } from "shared";
import { seedData } from "../data/seed.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function generateLoginCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeLoginCode(email: string): string {
  const code = generateLoginCode();
  seedData.loginCodes.set(email, {
    code,
    createdAt: new Date()
  });
  return code;
}

export function verifyLoginCode(email: string, code: string): boolean {
  const stored = seedData.loginCodes.get(email);
  if (!stored) return false;
  
  // Code expires after 10 minutes
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  if (stored.createdAt < tenMinutesAgo) {
    seedData.loginCodes.delete(email);
    return false;
  }
  
  return stored.code === code;
}

export function generateJWT(user: User): string {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email,
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyJWT(token: string): User | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: payload.userId,
      email: payload.email,
      name: payload.name
    };
  } catch (error) {
    return null;
  }
}

export function getUserFromAuth(authorization?: string): User | null {
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return null;
  }
  
  const token = authorization.substring(7);
  return verifyJWT(token);
}