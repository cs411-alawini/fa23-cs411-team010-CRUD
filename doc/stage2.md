# Description #
1. Passengers are uniquely identified by the passenger ID. Each passenger also has information about his/her first name, last name, date of birth, email address, and phone number.
2. Airlines are uniquely identified by the airline ID. Each airline also has information about its name.
3. Airports are uniquely identified by the airport ID. Each airport also has information about its name and location (city and state).
4. Tickets are uniquely identified by the ticket ID. Each ticket also has information about the airline ID, flight number, passenger ID, and ticket status.
5. Flights are uniquely identified by the flight number and airline ID. Each flight also has information about its departure airport, destination airport, scheduled date, scheduled departure time, scheduled arrival time, actual departure time, actual arrival time, flight status, cancellation reason, delay reason.

6. Each passenger can purchase multiple tickets. Each ticket is purchased by exactly one passenger.
7. Each passenger can take multiple flights. Each flight includes multiple passengers.
8. Each airline can operate multiple flights. Each flight is operated by exactly one airline.
9. Each airport can have multiple flights. Each flight includes exactly two airports (departure airport and desination airport).
10. Each ticket shows the infomation of exactly one flight. Each flight can include multiple tickets.

# ER Diagram # 
## Entities: ## 
1. Passenger(PassengerId, PassengerFirstName, PassengerLastName, DateOfBirth, Email, Phone)
2. Airline(AirlineId, AirlineName)
3. Airport(AirportId, AirportName, City, State)
4. Ticket(TicketId, FlightNumber, AirlineId, PassengerId, TicketStatus)
5. Flight(FlightNumber, AirlineId, DepartureAirport, DestinationAirport, ScheduleDate, ScheduleDeparetureTime, ScheduleArrivalTime, ActualDepartureTime, ActualArrivalTime, FlightStatus, CancellationReason, DelayReason)

## Relationships: ##
1. 1 passenger - multiple tickets, 1 ticket - 1 passenger | "many-to-one"
2. 1 passenger - multiple flights, 1 flight - multiple passengers | "many-to-many"
3. 1 airline - multiple flights, 1 flight - 1 airline | "many-to-one"
4. 1 airport - multiple flights, 1 flight - 2 airports
5. 1 ticket - 1 flight, 1 flight - multiple tickets | "many-to-one"

## Diagram: ##
![erd](https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/84d441fb-e943-4cca-9232-5d1f173783ce)

# Relational Schema #
```sql
CREATE TABLE Passenger (
    PassengerId INT PRIMARY KEY,
    PassengerFirstName VARCHAR(255),
    PassengerLastName VARCHAR(255),
    DateOfBirth DATE,
    Email VARCHAR(100),
    Phone INT
);

CREATE TABLE Airline (
    AirlineId VARCHAR(10) PRIMARY KEY,
    AirlineName VARCHAR(1000)
);

CREATE TABLE Airport (
    AirportId VARCHAR(10) PRIMARY KEY,
    AirportName VARCHAR(1000),
    City VARCHAR(100),
    State VARCHAR(50),
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
1. Passenger (PassengerId: INT [PK], PassengerFirstName: VARCHAR(255), PassengerLastName: VARCHAR(255), DateOfBirth: DATE, Email: VARCHAR(100), Phone: INT)
2. Airline (AirlineId: VARCHAR(10) [PK], AirlineName: VARCHAR(1000))
3. Airport (AirportId: VARCHAR(10) [PK], AirportName: VARCHAR(1000), City: VARCHAR(100), State: VARCHAR(50))
4. Flight (FlightNumber: INT [PK], AirlineId: VARCHAR(10) [PK], DepartureAirport: VARCHAR(10) [FK to Airport.AirportId], DestinationAirport: VARCHAR(10) [FK to Airport.AirportId], ScheduleDate: DATE, ScheduleDepartureTime: INT, ScheduleArrivalTime: INT, ActualDepartureTime: INT, ActualArrivalTime: INT, FlightStatus: VARCHAR(20), CancellationReason: VARCHAR(100), DelayReason: VARCHAR(100))
5. Ticket (TicketId: INT [PK], FlightNumber: INT [FK to Flight.FlightNumber], AirlineId: VARCHAR(10) [FK to Flight.AirlineId], PassengerId: INT [FK to Passenger.PassengerId], TicketStatus: VARCHAR(20))
6. PassengerFlight (PassengerId: INT [FK to Passenger.PassengerId], FlightNumber: INT [FK to Flight.FlightNumber], AirlineId: VARCHAR(10) [FK to Flight.AirlineId], PRIMARY KEY (PassengerId, FlightNumber, AirlineId))

# Normalization: #
Based on the relational schema, we have six tables/relations: Passenger, Airline, Airport, Flight, Ticket, and PassengerFlight. 

1. Dependencies for Passenger: PassengerId -> PassengerFirstName, PassengerLastName, DateOfBirth, Email, Phone   
Since PassengerId + = PassengerId, PassengerFirstName, PassengerLastName, DateOfBirth, Email, Phone, we can conclude that PassengerId is the superkey for Passenger table, thus Passenger is in BCNF.
2. Dependencies for Airline: AirlineId -> AirlineName   
Since AirlineId + = AirlineId, AirlineName, we can conclude that AirlineId is the superkey for Airline table, thus Airline is in BCNF.
3. Dependencies for Airport: AirportId -> AirportName, City, State   
Since AirportId + = AirportId, AirportName, City, State, we can conclude that AirportId is the superkey for Airport table, thus Airport is in BCNF.
4. Dependencies for Flight: FlightNumber, AirlineId -> DepartureAirport, DestinationAirport, ScheduleDate, ScheduleDepartureTime, ScheduleArrivalTime, ActualDepartureTime, ActualArrivalTime, FlightStatus, CancellationReason, DelayReason   
Since FlightNumber, AirlineId + = FlightNumber, AirlineId, DepartureAirport, DestinationAirport, ScheduleDate, ScheduleDepartureTime, ScheduleArrivalTime, ActualDepartureTime, ActualArrivalTime, FlightStatus, CancellationReason, DelayReason, we can conclude that (FlightNumber, AirlineId) is the superkey for Flight table, thus Flight is in BCNF.
5. Dependencies for Ticket: TicketId -> FlightNumber, AirlineId, PassengerId, TicketStatus   
Since TicketId + = TicketId, FlightNumber, AirlineId, PassengerId, TicketStatus, we can conclude that TicketeId is the superkey for Ticket table, thus Ticket is in BCNF.
6. Dependencies for PassengerFlight: PassengerId, FlightNumber, AirlineId -> PassengerId, FlightNumber, AirlineId   
Since PassengerId, FlightNumber, AirlineId -> PassengerId, FlightNumber, AirlineId, we can conclude that (PassengerId, FlightNumber, AirlineId) is the superkey for PassengerFlight table, thus PassengerFlight is in BCNF.

To sum up, our schema is already in BCNF and we don't have to do any further normalization. The reason why we choose BCNF instead of 3NF is that BCNF can minimize redundancy which can make our application more efficient.
