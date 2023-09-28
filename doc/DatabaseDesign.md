# Description #
1. Passengers are uniquely identified by the passenger ID. Each passenger also has information about his/her first name, last name, date of birth, email address, and phone number.
2. Airlines are uniquely identified by the airline ID. Each airline also has information about its name.
3. Airports are uniquely identified by the airport ID. Each airport also has information about its name and location (city, state, latitude, and longitude).
4. Tickets are uniquely identified by the ticket ID. Each ticket also has information about the airline ID, flight number, passenger ID, and ticket status.
5. Flights are uniquely identified by the flight number and airline ID. Each flight also has information about its departure airport, destination airport, scheduled date, scheduled departure time, scheduled arrival time, actual departure time, actual arrival time, flight status, cancellation reason, delay reason.

6. Each passenger can purchase multiple tickets. Each ticket is purchased by exactly one passenger.
7. Each passenger can take multiple flights. Each flight includes multiple passengers.
8. Each airline can sell multiple tickets. Each ticket is sold by exactly on airline.
9. Each airline can operate multiple flights. Each flight is operated by exactly one airline.
10. Each airport can have multiple flights. Each flight includes exactly two airports (departure airport and desination airport).
11. Each ticket shows the infomation of exactly one flight. Each flight can include multiple tickets.

# Normalization #



# ER Diagram # 
Entities: 
A. Passenger(PassengerId (PK), PassengerFirstName, PassengerLastName, DateOfBirth, Email, Phone)
B. Airline(AirlineId (PK), AirlineName)
C. Airport(AirportId (PK), AirportName, City, State, Latitude, Longitude)
D. Ticket(TicketId (PK), (AirlineId, FlightNumber) (FK), PassengerId (FK), TickStatus)
E. Flight((FlightNumber, AirlineId) (PK), DepartureAirport (FK), DestinationAirport (FK), ScheduleDate, ScheduleDeparetureTime, ScheduleArrivalTime, ActualDepartureTime, ActualArrivalTime, FlightStatus, CancellationReason, DelayReason)

Relationship:
1. 1 passenger - multiple tickets, 1 ticket - 1 passenger | "many-to-one"
2. 1 passenger - multiple flights, 1 flight - multiple passengers | "many-to-many"
3. 1 airline - multiple tickets, 1 ticket - 1 airline | "many-to-one"
4. 1 airline - multiple flights, 1 flight - 1 airline | "many-to-one"
5. 1 airport - multiple flights, 1 flight - 2 airports
6. 1 ticket - 1 flight, 1 flight - multiple tickets | "many-to-one"
   

# Normalization
BCNF or 3NF?
Dependencies: 

# Relational Schema #


