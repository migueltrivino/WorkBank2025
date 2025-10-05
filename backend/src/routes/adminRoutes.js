const express = require("express");
const { getDashboardSummary, getUserStats } = require("../controllers/adminController");

const router = express.Router();

// GET /api/admin/dashboard
router.get("/dashboard", getDashboardSummary);

// GET /api/admin/users/stats
router.get("/users/stats", getUserStats);

module.exports = router;
