const express = require("express");
const router = express.Router();
const conn = require("../db");

router.get("/search-ticket-by-passenger", (req, res) => {
  const { firstName, lastName, email, phone } = req.query;
  const query =
    "SELECT * FROM Ticket NATURAL JOIN Passenger NATURAL JOIN Flight WHERE PassengerFirstName = ? AND PassengerLastName = ? AND Email = ? AND Phone = ?";
  conn.query(query, [firstName, lastName, email, phone], (err, tickets) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }
    res.json(tickets);
    console.log(tickets);
  });
});
router.get("/search-flight", (req, res) => {
  const { from, to, date } = req.query;
  const query = `SELECT * FROM Flight WHERE DepartureAirport = '${from}' AND DestinationAirport = '${to}' AND ScheduleDate = '${date}'`;

  conn.query(query, (err, flights) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }
    res.json(flights);
    console.log(flights);
  });
});

router.get("/search-ticket", (req, res) => {
  const { id, firstName, lastName } = req.query;
  console.log(
    "search ticket  -",
    "ticket id:",
    id,
    ",first name:",
    firstName,
    ",last name:",
    lastName,
  );
  const verify = `SELECT * FROM Ticket NATURAL JOIN Passenger WHERE  TicketId = '${id}' AND PassengerFirstName = '${firstName}' AND PassengerLastName = '${lastName}'`;

  conn.query(verify, (err, ticket) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }

    if (ticket.length === 0) {
      res.json([]);
      console.log("invalid search");
      return;
    }
    console.log(ticket);

    const query = `SELECT * FROM Ticket NATURAL JOIN Flight NATURAL JOIN Passenger WHERE TicketId = ${id}`;
    conn.query(query, (err, ticket) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
        return;
      }
      res.json(ticket);
      console.log(ticket);
    });
  });
});
module.exports = router;
