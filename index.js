const app = require("./app");
const config = require("./utils/config");
const http = require("http");

const server = http.createServer(app);

server.listen(process.env.PORT || 3001);
