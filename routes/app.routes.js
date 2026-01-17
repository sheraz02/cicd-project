const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

router.get("/info", (req, res) => {
  res.json({
    name: "devops-project",
    version: "1.0.0",
    author: "Sheraz Ahmad"
  });
});


router.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
  ]);
});


router.post("/users", (req, res) => {
  const user = req.body;

  if (!user.name) {
    return res.status(400).json({ error: "Name is required" });
  }

  res.status(201).json({
    message: "User created successfully",
    user
  });
});

module.exports = router;
