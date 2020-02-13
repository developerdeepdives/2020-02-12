import fastify from "fastify";

const port = Number(process.env.SERVER_PORT) || 8080;

export const server: fastify.FastifyInstance = fastify({ logger: true });

server.get("/", async (request, reply) => {
  return { body: "HELLOOOOOOOOOOOOO" };
});

const startServer = async () => {
  try {
    const serverResponse = await server.listen(port, "0.0.0.0");
    server.log.info(serverResponse);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
