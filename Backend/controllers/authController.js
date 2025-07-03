const jwt = require("jsonwebtoken");
const db = require("../db");

// 🔒 Utility to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "DB error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(user);
    return res.json({ token });
  });
};

// ✅ Register
exports.register = (req, res) => {
  const { name, email, password1, password2 } = req.body;

  if (password1 !== password2) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (results.length > 0) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Insert new user
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password1],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Insert error" });

        const newUser = { id: result.insertId, name };
        const token = generateToken(newUser);
        return res.status(201).json({ token });
      }
    );
  });
};
