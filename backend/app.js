const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3000

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'a7875747',
    database: 'crud'
});

conn.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

app.use(express.json());
app.get('/', (req, res) => {
    console.log('Home Page')
    res.send('<h1>Welcome!<h1/>')
})

app.get('/search-flight', (req, res) => {
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
})

app.get('/search-ticket', (req, res) => {
    const { id, firstName, lastName, date } = req.query;
    const verify = `SELECT * FROM Ticket NATURAL JOIN Passenger WHERE PassengerFirstName = '${firstName}' AND PassengerLastName = '${lastName}'`;
    conn.query(verify, (err, ticket) => {
        if (err) {
            res.status(500).send(err);
            console.log(err);
            return
        }
        if (ticket.length === 0) {
            res.json([])
            return
        }
        const query = `SELECT * FROM Ticket NATURAL JOIN Flight WHERE TicketId = ${id}`;
        conn.query(query, (err, ticket) => {
            if (err) {
                res.status(500).send(err);
                console.log(err);
                return;
            }
            res.json(ticket);
            console.log(ticket);
        });
    })
})

app.listen(port, () => {
    console.log('Server is running on port 3000')
})