const { PrismaClient } = require("@prisma/client");

/**
 * Prisma Client Instance
 *
 * This file creates a single Prisma client instance
 * that can be reused across the entire application.
 *
 * Why?
 * - Prevents multiple database connections
 * - Keeps database access centralized
 * - Makes code cleaner and maintainable
 */

// In development, we avoid creating multiple Prisma instances
// because nodemon restarts can create duplicate connections.

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

module.exports = prisma;