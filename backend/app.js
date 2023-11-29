const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 3000;

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "a7875747",
  database: "crud",
});

conn.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err);
    return;
  }
  console.log("Connected to the MySQL server.");
});

app.use(express.json());
app.get("/", (req, res) => {
  console.log("Home Page");
  res.send("<h1>Welcome!<h1/>");
});

app.get("/search-flight", (req, res) => {
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

app.get("/search-ticket", (req, res) => {
  const { id, firstName, lastName, date } = req.query;
  const verify = `SELECT * FROM Ticket NATURAL JOIN Passenger WHERE PassengerFirstName = '${firstName}' AND PassengerLastName = '${lastName}'`;

  conn.query(verify, (err, ticket) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }

    if (ticket.length === 0) {
      res.json([]);
      return;
    }

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

function createTicket(firstName, lastName, airlineId, flightNumber) {
  return new Promise((resolve, reject) => {
    conn.beginTransaction((err) => {
      if (err) {
        reject(err);
        return;
      }

      const passengerQuery =
        "INSERT INTO Passenger (PassengerFirstName, PassengerLastName) VALUES (?, ?)";
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

app.get("/buy-ticket", (req, res) => {
  const { firstName, lastName, airlineId, flightNumber } = req.query;
  console.log(firstName, lastName, airlineId, flightNumber);

  createTicket(firstName, lastName, airlineId, flightNumber)
    .then((result) => {
      res.json({
        message: `Ticket added with ID: ${result.ticketId}, Passenger ID: ${result.passengerId}`,
      });
      console.log(
        `Ticket added with ID: ${result.ticketId}, Passenger ID: ${result.passengerId}`,
      );
    })
    .catch((err) => {
      res.json({ error: "Cannot buy the ticket" });
      console.error(err);
    });
});

app.get("/cancel-ticket", (req, res) => {
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

app.get("/update-email", (req, res) => {
  const { ticketId, email } = req.query;

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

app.get("/update-phone", (req, res) => {
  const { ticketId, phone } = req.query;

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
    const updateQuery = "UPDATE Passenger SET Email = ? WHERE PassengerId = ?";
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
