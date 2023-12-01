DELIMITER //
CREATE PROCEDURE BuyTicket(
    IN pFirstName VARCHAR(255),
    IN pLastName VARCHAR(255),
    IN pEmail VARCHAR(100),
    IN pPhone CHAR(10),
    IN pFlightNumber INT,
    IN pAirlineId VARCHAR(10),
    OUT pTicketId INT,
    OUT pPassengerId INT
)
BEGIN
    DECLARE foundPassengerId INT;

    SELECT PassengerId INTO foundPassengerId
    FROM Passenger
    WHERE PassengerFirstName = pFirstName AND PassengerLastName = pLastName
          AND Email = pEmail AND Phone = pPhone
    ORDER BY PassengerId
    LIMIT 1;

    IF foundPassengerId IS NULL THEN
        INSERT INTO Passenger (PassengerFirstName, PassengerLastName, Email, Phone)
        VALUES (pFirstName, pLastName, pEmail, pPhone);

        SET pPassengerId = LAST_INSERT_ID();
    ELSE
        SET pPassengerId = foundPassengerId;
    END IF;

    INSERT INTO Ticket (FlightNumber, AirlineId, PassengerId, TicketStatus)
    VALUES (pFlightNumber, pAirlineId, pPassengerId, 'Booked');

    SET pTicketId = LAST_INSERT_ID();
END //
DELIMITER ;