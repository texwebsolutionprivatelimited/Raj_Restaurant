const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("TOKEN =>", token);
    console.log("DECODED =>", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT ERROR =>", error.message);

    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

module.exports = { protect, adminOnly };