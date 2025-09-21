import Fastify from "fastify";
import mercurius from "mercurius";
import cors from "@fastify/cors";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { resolvers } from "./resolvers/index.js";
import { getUserFromAuth } from "./services/auth.js";
import { seedData, resetSeedData } from "./data/seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Fastify({ logger: true });

// Register CORS
await app.register(cors, {
  origin: true,
  credentials: true
});

// Load GraphQL schema
const schema = readFileSync(join(__dirname, "schema.graphql"), "utf8");

// Register Mercurius GraphQL
await app.register(mercurius, {
  schema,
  resolvers,
  context: async (request, reply) => {
    const user = getUserFromAuth(request.headers.authorization);
    const sessionId = request.headers["x-session-id"] as string || 
                     (request as any).cookies?.sessionId || 
                     `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    
    return {
      reply,
      user,
      sessionId
    };
  },
  graphiql: process.env.NODE_ENV !== "production"
});

// Health check endpoint
app.get("/healthz", async (request, reply) => {
  return { status: "ok" };
});

// Test helper endpoints
app.get("/__test__/mailbox", async (request, reply) => {
  const email = (request.query as any)?.email as string;
  if (!email) {
    return reply.code(400).send({ error: "Email parameter required" });
  }
  
  const loginCode = seedData.loginCodes.get(email);
  if (!loginCode) {
    return reply.code(404).send({ error: "No login code found for this email" });
  }
  
  return {
    email,
    lastCode: loginCode.code,
    createdAt: loginCode.createdAt.toISOString()
  };
});

app.post("/__test__/seed", async (request, reply) => {
  resetSeedData();
  return { status: "reset" };
});

const port = parseInt(process.env.PORT || "4000", 10);
const host = process.env.HOST || "localhost";

try {
  await app.listen({ port, host });
  console.log(`🚀 GraphQL server ready at http://${host}:${port}/graphql`);
  console.log(`📊 GraphiQL available at http://${host}:${port}/graphiql`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}