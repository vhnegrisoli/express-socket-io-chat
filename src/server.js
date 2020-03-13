const server = require("express")();
const http = require("http").createServer(server);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const Log = require("./Log");
const bodyParser = require("body-parser");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/socket_io_analytics", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

server.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

server.get("/log", async (req, res) => {
  const logs = await Log.find();
  res.json({ logs });
});

server.post("/log", async (req, res) => {
  const { usuario, quantidade } = req.body;
  const log = await Log.create({
    usuario,
    quantidade
  });
  io.sockets.emit("chat message", JSON.stringify(log));
  return res.json(JSON.stringify(log));
});

io.on("connection", function(socket) {
  socket.on("chat message", function(log) {
    io.emit("chat message", log);
  });
});

http.listen(3000);
