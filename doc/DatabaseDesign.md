### Description ###


# ER Diagram # 
Entities: 
A. Passenger(PassengerId (PK), PassengerFirstName, PassengerLastName, DateOfBirth, Email, Phone)
B. Airline(AirlineId (PK), AirlineName)
C. Airport(AirportId (PK), AirportName, City, State, Latitude, Longitude)
D. Ticket(TicketId (PK), (AirlineId, FlightNumber) (FK), PassengerId (FK), TickStatus)
E. Flight((AirlineId, FlightNumber) (PK), FlightStatus, DelayReason, DestinationAirport (FK), DepartureAirport (FK), ScheduleDate, ScheduleDeparetureTime, ScheduleArrivalTime)

Relationship:
1. 1 ticket - 1 passenger, 1 passenger - multiple tickets "many-to-one" 
2. 1 ticket - 1 flight, 1 flight - multiple tickest "many-to-one"
3. 1 flight - 1 airline, 1 airline - many flights "many-to-one"
4. 1 passenger - multiple airlines, 1 airline - multiple passengers "many-to-many"
5. 1 airport - 
   

# Normalization
BCNF or 3NF?
Dependencies: 

# Relational Schema #


