# Database Implementation
### Proof of Connection
<img width="1561" alt="Screenshot 2023-10-31 at 11 57 46 PM" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/470994f1-faf1-4754-978c-c93d94fb87cd">




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

<img width="600" alt="Screenshot 2023-10-31 at 11 57 50 PM" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/bef8cefa-46db-4dc7-8b86-d42332d6efda">



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

### EXPLAIN ANALYZE After Adding Index to (Passenger.PassengerFirstName, Passenger.PassengerLastName)
<img width="693" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/b7a69c06-9043-4b6b-be7a-c940c95b6bb2">
<img width="756" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/aeb08aea-07d4-47cc-93e1-64d356546087">

The reason why I add index to (Passenger.PassengerFirstName, Passenger.PassengerLastName) is that this combination of attributes is used in SELECT clause, so that adding an index can improve the query performance. Based on the screenshot, the actual execution time before adding the index is between 0.579 and 1.09 seconds, after adding the index, the actual execution time is between 0.359 and 0.654 seconds, the query performance is improved.

### EXPLAIN ANALYZE After Adding Index to (Ticket.PassengerId, Ticket.FlightNumber)
<img width="566" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/774ffe82-77ff-4a80-9129-69b3bb7a1feb">
<img width="754" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/33bd2214-1e44-45b1-a563-2f07eeb67466">

The reason why I add index to (Ticket.PassengerId, Ticket.FlightNumber) is that this combination of attributes is used in JOIN clause and SELECT clause of the subquery, so that adding an index can improve the query performance. Based on the screenshot, the actual execution time before adding the index is between 0.579 and 1.09 seconds, after adding the index, the actual execution time is between 0.362 and 0.635 seconds, the query performance is improved.

### EXPLAIN ANALYZE After Adding Index to Flight.FlightNumber
<img width="463" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/e6e8420a-0bb4-4ff3-9199-c7a15877632d">
<img width="757" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143149260/d7568c02-4db4-4d8f-a88c-12c63ea3dc5d">

The reason why I add index to Flight.FlightNumber is that this attribute is used in JOIN clause, so that adding an index can improve the query performance. Based on the screenshot, the actual execution time before adding the index is between 0.579 and 1.09 seconds, after adding the index, the actual execution time is between 0.373 and 0.689 seconds, the query performance is improved.

# Advanced Query 2
### Description 
For each airport, count the number of ticket departures from it for passengers born before January 1, 1970, where the actual departure time was before the scheduled time.

*This query involves concepts "Join of multiple relations", "Subqueries", and "Aggregation via GROUP BY".

### Code
<img width="756" alt="Screenshot 2023-10-31 at 11 09 58 PM" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/280586ce-44c4-4a2b-8d3e-fdf0bab7458f">

### Result
<img width="356" alt="Screenshot 2023-10-31 at 11 09 58 PM copy" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/94a3ac10-af99-4286-b5c7-06ee70089604">

# Indexing Analysis 2
### EXPLAIN ANALYZE Before Adding Indexes
<img width="821" alt="before" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/5f8a8940-7623-4d58-8ea2-02b00b63775b">

### EXPLAIN ANALYZE After Adding Index to Passenger.DateOfBirth
<img width="759" alt="Screenshot 2023-10-31 at 11 20 28 PM" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/0eba5e22-7433-4fdf-9395-4ff8d87800f2">
<img width="810" alt="birth" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/0c8e20bc-3341-49bd-bd2f-41f8b31a7858">

The reason why I add index to Passenger.DateOfBirth is that this attribute is used in WHERE clause, so that adding an index can improve the query performance.

### EXPLAIN ANALYZE After Adding Index to Airport.AirportName
<img width="757" alt="Screenshot 2023-10-31 at 11 22 15 PM" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/c7201c52-323b-45b6-a365-8d6b481b905f">
<img width="817" alt="a" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/1b57b0a2-0bdd-42bd-9dab-288f6f8cb5f2">

The reason why I add index to Airport.AirportName is that this attribute is selected, so that adding an index can improve the query performance.

### EXPLAIN ANALYZE After Adding Index to (Flight.ScheduleDepartureTime, Flight.ActualDepartureTime)
<img width="881" alt="Screenshot 2023-10-31 at 11 21 52 PM" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/047c7de2-3e12-4929-871d-b32db3ff409c">
<img width="827" alt="de" src="https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/3d976353-39b3-4d6f-87b6-94797ff0d23f">

The reason why I add index to Flight.ScheduleDepartureTime and Flight.ActualDepartureTime is that this attribute is used in WHERE clause, so that adding an index can improve the query performance.

