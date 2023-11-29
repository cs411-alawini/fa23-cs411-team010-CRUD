const express = require("express");
const router = express.Router();
const conn = require("../db");

router.post("/update-email", (req, res) => {
  const { ticketId, email } = req.body;

  if (!ticketId || !email) {
    res.status(400).send("Ticket ID and email are required");
    return;
  }

  const query = "SELECT PassengerId FROM Ticket WHERE TicketId = ?";
  conn.query(query, [ticketId], (err, tickets) => {
    if (err) {
      res.status(500).send("Error retrieving ticket information");
      console.error(err);
      return;
    }

    if (tickets.length === 0) {
      res.status(404).send("Ticket not found");
      return;
    }

    const passengerId = tickets[0].PassengerId;

    // Query to update email
    const updateQuery = "UPDATE Passenger SET Email = ? WHERE PassengerId = ?";
    conn.query(updateQuery, [email, passengerId], (err, result) => {
      if (err) {
        res.status(500).send("Error updating email");
        console.error(err);
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).send("Passenger not found");
      } else {
        res.send(result);
      }
    });
  });
});

router.post("/update-phone", (req, res) => {
  const { ticketId, phone } = req.body;

  // Validate input
  if (!ticketId || !phone) {
    res.status(400).send("Ticket ID and phone are required");
    return;
  }

  // Query to get PassengerId
  const query = "SELECT PassengerId FROM Ticket WHERE TicketId = ?";
  conn.query(query, [ticketId], (err, tickets) => {
    if (err) {
      res.status(500).send("Error retrieving ticket information");
      console.error(err);
      return;
    }

    if (tickets.length === 0) {
      res.status(404).send("Ticket not found");
      return;
    }

    const passengerId = tickets[0].PassengerId;

    // Query to update email
    const updateQuery = "UPDATE Passenger SET Phone = ? WHERE PassengerId = ?";
    conn.query(updateQuery, [phone, passengerId], (err, result) => {
      if (err) {
        res.status(500).send("Error updating phone");
        console.error(err);
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).send("Passenger not found");
      } else {
        res.send(result);
      }
    });
  });
});

module.exports = router;
