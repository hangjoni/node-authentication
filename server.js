const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);

    const user = {
      name: req.body.name,
      password: hashedPassword,
    };

    users.push(user);
    res.status(200).send("Saved user");
  } catch {
    res.status(500).send("error");
  }
});

// login
app.post("/users/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("not allowed");
    }
  } catch {
    res.status(500).send("error");
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
