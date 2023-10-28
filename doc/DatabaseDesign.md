# Database Implementation
### Proof of Connection

### DDL
```sql
CREATE TABLE Passenger (
    PassengerId INT PRIMARY KEY,
    PassengerFirstName VARCHAR(255),
    PassengerLastName VARCHAR(255),
    DateOfBirth DATE,
    Email VARCHAR(100),
    Phone CHAR(10)
);

CREATE TABLE Airline (
    AirlineId VARCHAR(10) PRIMARY KEY,
    AirlineName VARCHAR(1000)
);

CREATE TABLE Airport (
    AirportId VARCHAR(10) PRIMARY KEY,
    AirportName VARCHAR(1000),
    City VARCHAR(100),
    State VARCHAR(50)
);

CREATE TABLE Flight (
    FlightNumber INT,
    AirlineId VARCHAR(10),
    DepartureAirport VARCHAR(10),
    DestinationAirport VARCHAR(10),
    ScheduleDate DATE,
    ScheduleDepartureTime INT,
    ScheduleArrivalTime INT,
    ActualDepartureTime INT,
    ActualArrivalTime INT,
    FlightStatus VARCHAR(20),
    CancellationReason VARCHAR(100),
    DelayReason VARCHAR(100),
    PRIMARY KEY (FlightNumber, AirlineId),
    FOREIGN KEY (DepartureAirport) REFERENCES Airport(AirportId) ON DELETE CASCADE,
    FOREIGN KEY (DestinationAirport) REFERENCES Airport(AirportId) ON DELETE CASCADE,
    FOREIGN KEY (AirlineId) REFERENCES Airline(AirlineId) ON DELETE CASCADE
);

CREATE TABLE Ticket (
    TicketId INT PRIMARY KEY,
    FlightNumber INT,
    AirlineId VARCHAR(10),
    PassengerId INT,
    TicketStatus VARCHAR(20),
    FOREIGN KEY (FlightNumber, AirlineId) REFERENCES Flight(FlightNumber, AirlineId) ON DELETE CASCADE,
    FOREIGN KEY (PassengerId) REFERENCES Passenger(PassengerId) ON DELETE CASCADE
);

CREATE TABLE PassengerFlight (
    PassengerId INT REFERENCES Passenger(PassengerId) ON DELETE CASCADE,
    FlightNumber INT REFERENCES Flight(FlightNumber) ON DELETE CASCADE,
    AirlineId VARCHAR(10) REFERENCES Flight(AirlineId) ON DELETE CASCADE,
    PRIMARY KEY (PassengerId, FlightNumber, AirlineId)
);
```
### Tables With At Least 1000 Rows

# Advanced Query 1
### Description 
Provide the Id and name of the passenger who booked a ticket for flights departing and arriving at a specific airport, the ticket also has a specific status. Here, I use departureAirport = 'ORD', DestinationAirport = 'JFK', TicketStatus <> 'CANCELLED' as an example.   

*This query involves concepts "JOIN" and "Subquery".

### Code
<img width="806" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/1c62ab78-3113-4ece-b0ff-02016ce52142">

### Result
<img width="154" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/8fe30efa-2f34-4c25-bdf6-428bc707a8a3">

*The output result is less than 15 rows.

# Indexing Analysis 1
### EXPLAIN ANALYZE Before Adding Indexes
<img width="747" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/084e7cec-cd5a-49af-b47d-73f5e0ca7371">

### EXPLAIN ANALYZE After Adding Index to Passenger.PassengerId
<img width="495" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/464b7c3e-6d51-410d-abae-c5c36939baf5">
<img width="756" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/aeb08aea-07d4-47cc-93e1-64d356546087">

The reason why I add index to Passenger.PassengerId is that this attribute is used in SELECT clause and JOIN clause, so that adding an index can improve the query performance. Based on the screenshot, 

### EXPLAIN ANALYZE After Adding Index to (Ticket.PassengerId, Ticket.FlightNumber)
<img width="566" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/774ffe82-77ff-4a80-9129-69b3bb7a1feb">
<img width="754" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/33bd2214-1e44-45b1-a563-2f07eeb67466">

The reason why I add index to (Ticket.PassengerId, Ticket.FlightNumber) is that this combination of attributes is used in JOIN clause and SELECT clause of the subquery, so that adding an index can improve the query performance.

### EXPLAIN ANALYZE After Adding Index to Flight.FlightNumber
<img width="459" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/fda6e9be-4579-4aee-841c-156c0d58937f">
<img width="757" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/d7568c02-4db4-4d8f-a88c-12c63ea3dc5d">

The reason why I add index to Flight.FlightNumber is that this attribute is used in JOIN clause, so that adding an index can improve the query performance.

# Advanced Query 2

# Indexing Analysis 2
