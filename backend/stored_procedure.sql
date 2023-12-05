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
    DECLARE done INT DEFAULT FALSE;
    DECLARE curPassengerId INT;
    DECLARE curFirstName VARCHAR(255);
    DECLARE curLastName VARCHAR(255);
    DECLARE curEmail VARCHAR(100);
    DECLARE curPhone CHAR(10);
    DECLARE curPassenger CURSOR FOR
        SELECT PassengerId, PassengerFirstName, PassengerLastName, Email, Phone
        FROM Passenger
        ORDER BY PassengerId;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN curPassenger;

    passenger_loop: LOOP
        FETCH curPassenger INTO curPassengerId, curFirstName, curLastName, curEmail, curPhone;
        IF done THEN
            LEAVE passenger_loop;
        END IF;

        IF curFirstName = pFirstName AND curLastName = pLastName AND curEmail = pEmail AND curPhone = pPhone THEN
            SET pPassengerId = curPassengerId;
            LEAVE passenger_loop;
        END IF;
    END LOOP;

    CLOSE curPassenger;

    IF pPassengerId IS NULL THEN
        INSERT INTO Passenger (PassengerFirstName, PassengerLastName, Email, Phone)
        VALUES (pFirstName, pLastName, pEmail, pPhone);

        SET pPassengerId = LAST_INSERT_ID();
    END IF;

    INSERT INTO Ticket (FlightNumber, AirlineId, PassengerId, TicketStatus)
    VALUES (pFlightNumber, pAirlineId, pPassengerId, 'Booked');

    SET pTicketId = LAST_INSERT_ID();
END //

DELIMITER ;
