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
<img width="512" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/97b16fcc-7bbe-4e35-b0be-65759ed91e68">

### EXPLAIN ANALYZE After Adding Index to Passenger.PassengerId
<img width="747" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/084e7cec-cd5a-49af-b47d-73f5e0ca7371">
<img width="756" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/aeb08aea-07d4-47cc-93e1-64d356546087">


# Advanced Query 2

# Indexing Analysis 2
