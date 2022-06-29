// Create express app
const express = require("express");
const app = express();
var cors = require("cors");
const db = require("./database");
var bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000;
// Start server
server.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

app.get("/api/submissions", (req, res, next) => {
  db.all("SELECT * FROM submissions", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: rows.map((row) => ({
        id: row.id,
        form: JSON.parse(row.form),
        status: row.status,
      })),
    });
  });
});

// Create a new submission
app.post("/api/submissions", (req, res, next) => {
  const form = req.body.data;
  db.run(`INSERT INTO submissions (form, status) VALUES (?, ?)`, [JSON.stringify(form), 1], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: { id: this.lastID },
    });
  });
});

// Delete a submission
app.delete("/api/submissions/:id", (req, res, next) => {
  const id = req.params.id;
  db.run(`DELETE FROM submissions WHERE id = ?`, [id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Success" });
  });
});

// change submissions status
app.put("/api/submissions/:id", (req, res, next) => {
  const id = req.params.id;
  const status = req.body.status;
  db.run(`UPDATE submissions SET status = ? WHERE id = ?`, [status, id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Success" });
  });
});

// search student numbers by name
app.get("/api/search/:name", (req, res, next) => {
  const name = req.params.name;
  db.all(`SELECT * FROM submissions`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: rows
        .filter((i) => {
          const parsed = JSON.parse(i.form);
          return parsed.student_number === name;
        })
        .map((row) => ({
          id: row.id,
          form: JSON.parse(row.form),
          status: row.status,
        })),
    });
  });
});

// login by email and password
app.post("/api/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const findUser = rows.find((i) => {
      return i.email === email && i.password === password;
    });
    if (findUser) {
      res.json({
        message: "Success",
        data: {
          id: findUser.id,
          email: findUser.email,
          password: findUser.password,
        },
      });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  });
});

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  socket.on("submission", () => {
    console.log("new submission");
    socket.broadcast.emit("submitted", { message: "new submission" });
  });
});
