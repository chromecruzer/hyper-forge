import http from "node:http";
import { z } from "zod";
import { WebSocketServer } from "ws"; // WebSocket server
import { useServer } from "graphql-ws/lib/use/ws"; // Use server for graphql-ws
import connect from "connect";
import router from "router";
import { createYoga } from "graphql-yoga";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";
import { queryResolvers } from "./resolvers/queryResolvers.js";
import { mutationResolvers } from "./resolvers/mutationResolvers.js";

// Create the Connect app
const app = connect();
const route = router();

// Load schema files
const typesArray = loadFilesSync(
    path.join(process.cwd(), "schema", "typeDefs"),
    { extensions: ["gql", "graphql"] },
);
if (typesArray.length === 0) {
    throw new Error("No GraphQL type definitions found.");
}

const typeDefs = mergeTypeDefs(typesArray);

// Build the executable schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
        ...queryResolvers,
        ...mutationResolvers,
    },
});

// Create the Yoga instance
const yoga = createYoga({
    graphqlEndpoint: "/graphql",
    schema,
    healthCheckEndpoint: false,
    graphiql: { subscriptionsProtocol: "WS" },
});

// Create WebSocket server instance
const wsServer = new WebSocketServer({
    noServer: true,
    path: "/graphql", // This should match your GraphQL endpoint
});

// Integrate the subscription server
useServer(
    {
        schema,
        execute: (args) => args.rootValue.execute(args),
        subscribe: (args) => args.rootValue.subscribe(args),
        onSubscribe: async (ctx, msg) => {
            const {
                schema,
                execute,
                subscribe,
                contextFactory,
                parse,
                validate,
            } = yoga.getEnveloped({
                ...ctx,
                req: ctx.extra.request,
                socket: ctx.extra.socket,
                params: msg.payload,
            });

            const args = {
                schema,
                operationName: msg.payload.operationName,
                document: parse(msg.payload.query),
                variableValues: msg.payload.variables,
                contextValue: await contextFactory(),
                rootValue: { execute, subscribe },
            };

            const errors = validate(args.schema, args.document);
            if (errors.length) return errors;
            return args;
        },
    },
    wsServer,
);

// Define the route for GraphQL and WebSocket handling
route.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!");
});

// Add Yoga middleware to Connect app
app.use("/graphql", yoga);

// Add the router to the Connect app
app.use(route);

// Start the HTTP server
const server = http.createServer(app);

// Handle WebSocket upgrade for subscription connections
server.on("upgrade", (request, socket, head) => {
    if (request.url === "/graphql") {
        wsServer.handleUpgrade(request, socket, head, (ws) => {
            wsServer.emit("connection", ws, request);
        });
    } else {
        socket.destroy();
    }
});

// ts zod
let number = z.number();
let string = z.string();
const add = (a, b) => number.parse(a) + number.parse(b);
console.log(number.parse(add(5, 5)));

// Start the server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});
