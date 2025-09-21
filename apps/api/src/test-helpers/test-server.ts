// apps/api/src/test-helpers/test-server.ts
import Fastify from "fastify";
import mercurius from "mercurius";
import cors from "@fastify/cors";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { resolvers } from "../resolvers/index.js";
import { getUserFromAuth } from "../services/auth.js";
import { resetSeedData } from "../data/seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function createTestServer() {
  const app = Fastify({ logger: false }); // Disable logging in tests

  // Register CORS
  await app.register(cors, {
    origin: true,
    credentials: true
  });

  // Load GraphQL schema
  const schema = readFileSync(join(__dirname, "../schema.graphql"), "utf8");

  // Register Mercurius GraphQL
  await app.register(mercurius, {
    schema,
    resolvers,
    context: async (request, reply) => {
      const user = getUserFromAuth(request.headers.authorization);
      const sessionId = request.headers['x-session-id'] as string;
      
      return {
        reply,
        user,
        sessionId
      };
    },
    path: '/graphql',
    graphiql: false, // Disable GraphiQL in test mode
  });

  // Test endpoints
  app.get('/healthz', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  app.get('/__test__/mailbox', async (request) => {
    const { email } = request.query as { email: string };
    // Mock implementation - in real tests, you'd get this from the auth service
    return { code: '123456' };
  });

  app.post('/__test__/seed', async () => {
    resetSeedData();
    return { message: 'Database seeded' };
  });

  return app;
}

export async function startTestServer(port = 0) {
  const server = await createTestServer();
  const address = await server.listen({ port, host: '127.0.0.1' });
  return { server, address };
}
