const express = require("express");
const { getDashboardSummary } = require("../controllers/adminController");

const router = express.Router();

// GET /api/admin/dashboard
router.get("/dashboard", getDashboardSummary);

module.exports = router;
