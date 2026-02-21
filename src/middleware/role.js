/**
 * Role-Based Authorization Middleware
 *
 * Purpose:
 *  - Restrict access based on user role
 *  - Must be used AFTER auth middleware
 *
 * Example usage:
 *   router.get("/admin", auth, role("ADMIN"), handler)
 */

const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // 1. Ensure user is attached by auth middleware
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized. Please login."
        });
      }

      // 2. Normalize allowedRoles to array
      const rolesArray = Array.isArray(allowedRoles)
        ? allowedRoles
        : [allowedRoles];

      // 3. Check if user's role is allowed
      if (!rolesArray.includes(req.user.role)) {
        return res.status(403).json({
          message: "Forbidden. You do not have permission."
        });
      }

      // 4. Role allowed → continue
      next();

    } catch (error) {
      return res.status(500).json({
        message: "Role validation failed."
      });
    }
  };
};

module.exports = roleMiddleware;