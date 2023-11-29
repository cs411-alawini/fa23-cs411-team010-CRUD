const express = require("express");
const router = express.Router();
const conn = require("../db");

// Cancel Ticket Route
router.get("/cancel-ticket", (req, res) => {
  const { ticketId } = req.query;

  // Ensure ticketId is provided
  if (!ticketId) {
    res.status(400).send("Ticket ID is required");
    return;
  }

  // SQL query to delete the ticket
  const query = "DELETE FROM Ticket WHERE ticketId = ?";

  // Execute the query
  conn.query(query, [ticketId], (err, result) => {
    if (err) {
      res.status(500).send("Error cancelling the ticket");
      console.error(err);
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send("Ticket not found");
    } else {
      res.send("Ticket cancelled successfully");
    }
  });
});

module.exports = router;
