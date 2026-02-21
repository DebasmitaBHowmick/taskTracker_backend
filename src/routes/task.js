//this is for CRUD
const router = require("express").Router();
const prisma = require("../prisma");
const auth = require("../middleware/auth");


/**
 * CREATE TASK
 * Only authenticated users can create tasks
 */

router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.id
      }
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({
      message: "Failed to create task"
    });
  }
});

/**
 * GET TASKS
 * - ADMIN → gets all tasks
 * - USER → gets only their own tasks
 */
router.get("/", auth, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "ADMIN") {
      tasks = await prisma.task.findMany();
    } else {
      tasks = await prisma.task.findMany({
        where: { userId: req.user.id }
      });
    }

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks"
    });
  }
});


/**
 * UPDATE TASK
 * - USER can update only their own task
 * - ADMIN can update any task
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    // If user is not admin, check ownership
    if (
      req.user.role !== "ADMIN" &&
      existingTask.userId !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can only update your own tasks"
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: req.body
    });

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({
      message: "Failed to update task"
    });
  }
});


/**
 * DELETE TASK
 * - USER can delete only their own task
 * - ADMIN can delete any task
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    // Ownership check
    if (
      req.user.role !== "ADMIN" &&
      existingTask.userId !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can only delete your own tasks"
      });
    }

    await prisma.task.delete({
      where: { id: taskId }
    });

    res.json({ message: "Task deleted successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task"
    });
  }
});

module.exports= router;