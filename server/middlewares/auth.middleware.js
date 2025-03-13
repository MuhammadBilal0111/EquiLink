const UserRepo = require("../repos/UserRepo.js");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config.js");

// ibad:
// const authorize = (requiredRole) => {
//   return async (req, res, next) => {
//     const token =
//       req?.headers?.authorization?.split(" ")[1] || req?.cookies?.jwt;

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     try {
//       const decoded = jwt.verify(token, jwtSecret);
//       const customQuery = { id: decoded?.id };

//       const user = await UserRepo.findUserWithInclude(customQuery);

//       requiredRole = user?.role?.roleName;

//       if (!user) {
//         return res.status(401).json({ message: "Unauthorized" });
//       }

//       if (
//         user?.role?.roleName === "admin" ||
//         user?.role?.roleName === "Super Admin"
//       ) {
//         return next();
//       }

//       if (user?.role?.roleName === requiredRole) {
//         const permissions = await UserRepo.getRolePermissions(user?.roleId);

//         const hasPermission = permissions.map((permission) => {
//           return permission?.Permission?.name;
//         });
//         const originalUrl = req?.originalUrl?.split("/")[3];

//         if (!hasPermission.includes(originalUrl)) {
//           return res.status(403).json({ message: "Forbidden" });
//         }

//         return next();
//       }
//     } catch (error) {
//       console.log(error);
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//   };
// };

const authMiddleware = (req, res, next) => {
  const token = req?.cookies?.token || req?.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.log("error : ", err);
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    try {
      req.user = JSON.parse(decoded.data);
    } catch (parseError) {
      console.log("Failed to parse user data from token", parseError);
      return res.status(500).json({ message: "Failed to parse user data" });
    }

    next();
  });
};

module.exports = { authMiddleware };
