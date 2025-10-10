// middleware/auth.js
const FAKE_TOKEN = "fake-jwt-token"; // same token returned on login

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");

  if (token !== FAKE_TOKEN) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  next(); // ✅ allow request to continue
}

module.exports = auth;
