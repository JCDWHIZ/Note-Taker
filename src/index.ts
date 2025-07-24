import express from "express";
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
import { connectToDb } from "./config/db";
const app = express();
const port = 3000;
require("dotenv").config();

app.use((req, res, next) => {
  console.log(
    `Date: ${new Date().toISOString()} Request Method: ${
      req.method
    }, Request URL: ${req.url}`
  );
  next(); // Call
});

//"/" route - localhost:3000/
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

connectToDb();

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

// "/users/:id" route - e.g localhost:3000/user/1
// anything passed will be more like a parameter in the route
// app.get("/user/:id/:username", (req, res) => {
//   const number = req.params.id;
//   const username = req.params.username;
//   res.send({
//     message: "Sucessful",
//     data: users[1],
//     userId: req.params.id,
//     number: number,
//     username: username,
//   });
// });

// app.post("/user", (req, res) => {
//   console.log(req.body);
//   console.log("Destructuring the body of the request");
//   const { username, email } = req.body;
//   console.log("Destructured the body of the request", username, email);

//   // processsing
//   console.log("creating the user in the database");

//   res.send({
//     message: "Sucessful",
//     data: users[1],
//     email: email,
//     username: username,
//   });
//   console.log("respond to the client");

//   // destructure the body of the request

//   // processing - checking if the user exist
//   // processing -  saving the user to the database
//   // respond - sending a response back to the client
// });

//"/" route - localhost:3000/pricing to show html content
app.get("/pricing", (req, res) => {
  res.send("<h1>Hello World!</h1> <p>Pricing Page</p>");
});

// Start the server and list on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.get("/user/:id", (req, res) => {
//   const id = Number(req.params.id);
//   if (isNaN(id)) {
//     return res.status(400).send({ message: "Invalid user id" });
//   }
//   const user = users.find((u) => u.id === id);
//   if (!user) {
//     return res.status(404).send({ message: "User not found" });
//   }
//   res.send({
//     message: "Successful",
//     data: user,
//     userId: id,
//   });
// });
