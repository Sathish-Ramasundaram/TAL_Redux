
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@test.com" && password === "1234") {
    return res.json({
      success: true,
      token: "demo-token-123",
      user: { name: "Admin" }
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});