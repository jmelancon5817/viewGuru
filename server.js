const express = require("express");
const app = express();
const router = express.Router();
const userRoutes = require("./routes/user");
const User = require("../models/user");

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Landing page");
});

app.get("/dashboard", (req, res) => {
  res.send("Dashboard");
});

app.get("/optimize", (req, res) => {
  res.send("Optimize");
});

router.post("/register", async (req, res) => {
  try {
    const { profileObj } = req.body;
    const newUser = new User({
      firstName: profileObj.givenName,
      lastName: profileObj.familyName,
      email: profileObj.email,
      googleId: profileObj.googleId,
    });
    const user = await newUser.save();
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(4000, () => {
  console.log("Server started on http://localhost:4000");
});

module.exports = router;
