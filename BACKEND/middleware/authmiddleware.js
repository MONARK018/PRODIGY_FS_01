import jwt from "jsonwebtoken";

const authmiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || typeof auth !== "string" || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid or missing Authorization header" });
  }

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ message: "Token expired, please log in again." });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authmiddleware;
