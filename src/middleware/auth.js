const jwt = require("jsonwebtoken");

/**
 * Authentication Middleware
 *
 * Purpose:
 *  - Verify JWT token from Authorization header
 *  - Decode user data (id + role)
 *  - Attach user info to request object
 *  - Block request if token is missing or invalid
 *
 * This protects all private routes.
 */
const authMiddleware = (req, res, next) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.headers.authorization;

    // 2. If header is missing → user is not authenticated
    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided."
      });
    }

    /**
     * Expected format:
     * Authorization: Bearer <token>
     */
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format."
      });
    }

    // 3. Verify token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /**
     * decoded contains:
     * {
     *   id: userId,
     *   role: "USER" or "ADMIN",
     *   iat,
     *   exp
     * }
     */

    // 4. Attach decoded user data to request
    req.user = decoded;

    // 5. Continue to next middleware / route handler
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token."
    });
  }
};

module.exports = authMiddleware;
