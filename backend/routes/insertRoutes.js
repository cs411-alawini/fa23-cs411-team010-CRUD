// const express = require("express");
// const router = express.Router();
// const conn = require("../db");
//
// function createTicket(
//   firstName,
//   lastName,
//   airlineId,
//   flightNumber,
//   email,
//   phone,
// ) {
//   return new Promise((resolve, reject) => {
//     conn.beginTransaction((err) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//
//       const passengerQuery =
//         "INSERT INTO Passenger (PassengerFirstName, PassengerLastName, Email, Phone) VALUES (?, ?, ?, ?)";
//       conn.query(
//         passengerQuery,
//         [firstName, lastName, email, phone],
//         (error, passengerResults) => {
//           if (error) {
//             return conn.rollback(() => {
//               reject(error);
//             });
//           }
//
//           const passengerId = passengerResults.insertId;
//           console.log("Passenger ID:", passengerId);
//
//           const ticketQuery =
//             "INSERT INTO Ticket (FlightNumber, AirlineId, PassengerId, TicketStatus) VALUES (?, ?, ?, ?)";
//           conn.query(
//             ticketQuery,
//             [flightNumber, airlineId, passengerId, ""],
//             (error, ticketResults) => {
//               if (error) {
//                 return conn.rollback(() => {
//                   reject(error);
//                 });
//               }
//
//               conn.commit((err) => {
//                 if (err) {
//                   return conn.rollback(() => {
//                     reject(err);
//                   });
//                 }
//                 resolve({ ticketId: ticketResults.insertId, passengerId });
//               });
//             },
//           );
//         },
//       );
//     });
//   });
// }
//
// router.post("/buy-ticket", (req, res) => {
//   const { firstName, lastName, airlineId, flightNumber, email, phone } =
//     req.body;
//   console.log(firstName, lastName, airlineId, flightNumber, email, phone);
//
//   createTicket(firstName, lastName, airlineId, flightNumber, email, phone)
//     .then((result) => {
//       res.json(result);
//       console.log(
//         `Ticket added with ID: ${result.ticketId}, Passenger ID: ${result.passengerId}`,
//       );
//     })
//     .catch((err) => {
//       res.json({ error: "Cannot buy the ticket" });
//       console.error(err);
//     });
// });
//
// module.exports = router;

const express = require("express");
const router = express.Router();
const conn = require("../db");

function buyTicket(firstName, lastName, airlineId, flightNumber, email, phone) {
  return new Promise((resolve, reject) => {
    // First, call the stored procedure
    conn.query(
      "CALL BuyTicket(?, ?, ?, ?, ?, ?, @pTicketId, @pPassengerId);",
      [firstName, lastName, email, phone, flightNumber, airlineId],
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        // Then, select the output parameters
        conn.query("SELECT @pTicketId, @pPassengerId", (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log(results);
            resolve(results[0]); // results[0] should contain the output parameters
          }
        });
      },
    );
  });
}

router.post("/buy-ticket", (req, res) => {
  const { firstName, lastName, airlineId, flightNumber, email, phone } =
    req.body;

  buyTicket(firstName, lastName, airlineId, flightNumber, email, phone)
    .then((result) => {
      res.json({
        message: "Ticket successfully purchased",
        ticketId: result["@pTicketId"],
        passengerId: result["@pPassengerId"],
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "Cannot buy the ticket" });
      console.error(err);
    });
});

module.exports = router;
