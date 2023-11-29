const express = require("express");
const router = express.Router();
const conn = require("../db");

function createTicket(firstName, lastName, airlineId, flightNumber) {
  return new Promise((resolve, reject) => {
    conn.beginTransaction((err) => {
      if (err) {
        reject(err);
        return;
      }

      const passengerQuery =
        "INSERT INTO Passenger (PassengerFirstName, PassengerLastName, Email, Phone) VALUES (?, ?, '', '')";
      conn.query(
        passengerQuery,
        [firstName, lastName],
        (error, passengerResults) => {
          if (error) {
            return conn.rollback(() => {
              reject(error);
            });
          }

          const passengerId = passengerResults.insertId;
          console.log("Passenger ID:", passengerId);

          const ticketQuery =
            "INSERT INTO Ticket (FlightNumber, AirlineId, PassengerId, TicketStatus) VALUES (?, ?, ?, ?)";
          conn.query(
            ticketQuery,
            [flightNumber, airlineId, passengerId, ""],
            (error, ticketResults) => {
              if (error) {
                return conn.rollback(() => {
                  reject(error);
                });
              }

              conn.commit((err) => {
                if (err) {
                  return conn.rollback(() => {
                    reject(err);
                  });
                }
                resolve({ ticketId: ticketResults.insertId, passengerId });
              });
            },
          );
        },
      );
    });
  });
}

router.post("/buy-ticket", (req, res) => {
  const { firstName, lastName, airlineId, flightNumber } = req.body;
  console.log(firstName, lastName, airlineId, flightNumber);

  createTicket(firstName, lastName, airlineId, flightNumber)
    .then((result) => {
      res.json(result);
      console.log(
        `Ticket added with ID: ${result.ticketId}, Passenger ID: ${result.passengerId}`,
      );
    })
    .catch((err) => {
      res.json({ error: "Cannot buy the ticket" });
      console.error(err);
    });
});

module.exports = router;
