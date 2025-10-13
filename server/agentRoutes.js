// server/agentRoutes.js
const express = require("express");
const db = require("./db");
const { requireAdmin } = require("./authMiddleware"); // For protecting routes

const router = express.Router();

// === GET ALL AGENTS (PUBLIC) ===
// We need this to be public so the PropertyForm can fetch a list of agents to choose from.
// Path: GET /api/agents
router.get("/", async (req, res) => {
  try {
    const agents = await db("agents").select("*").orderBy("id");
    res.json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    res.status(500).json({ message: "Error fetching agents" });
  }
});

// === GET A SINGLE AGENT BY ID (PUBLIC) ===
// Path: GET /api/agents/:id
router.get("/:id", async (req, res) => {
  try {
    const agentId = parseInt(req.params.id, 10);
    if (isNaN(agentId)) {
      return res.status(400).json({ message: "Invalid agent ID." });
    }
    const agent = await db("agents").where({ id: agentId }).first();
    if (agent) {
      res.json(agent);
    } else {
      res.status(404).json({ message: "Agent not found." });
    }
  } catch (error) {
    console.error(`Error fetching agent with ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Error fetching agent." });
  }
});

// === CREATE A NEW AGENT (ADMIN ONLY) ===
// Path: POST /api/agents
router.post("/", requireAdmin, async (req, res) => {
  try {
    const [newAgent] = await db("agents").insert(req.body).returning("*");
    res.status(201).json(newAgent);
  } catch (error) {
    console.error("Error creating agent:", error);
    res.status(500).json({ message: "Error creating agent." });
  }
});

// === UPDATE AN AGENT (ADMIN ONLY) ===
// Path: PUT /api/agents/:id
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const agentId = parseInt(req.params.id, 10);
    if (isNaN(agentId)) {
      return res.status(400).json({ message: "Invalid agent ID." });
    }
    const count = await db("agents").where({ id: agentId }).update(req.body);
    if (count > 0) {
      const updatedAgent = await db("agents").where({ id: agentId }).first();
      res.json(updatedAgent);
    } else {
      res.status(404).json({ message: "Agent not found" });
    }
  } catch (error) {
    console.error(`Error updating agent with ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Error updating agent." });
  }
});

// === DELETE AN AGENT (ADMIN ONLY) ===
// Path: DELETE /api/agents/:id
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const agentId = parseInt(req.params.id, 10);
    if (isNaN(agentId)) {
      return res.status(400).json({ message: "Invalid agent ID." });
    }
    // Important: Check if any properties are assigned to this agent first
    const assignedProperties = await db("properties")
      .where({ agent_id: agentId })
      .first();
    if (assignedProperties) {
      return res.status(400).json({
        message:
          "Cannot delete agent. They are still assigned to one or more properties.",
      });
    }
    const count = await db("agents").where({ id: agentId }).del();
    if (count > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Agent not found" });
    }
  } catch (error) {
    console.error(`Error deleting agent with ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Error deleting agent." });
  }
});

module.exports = router;
