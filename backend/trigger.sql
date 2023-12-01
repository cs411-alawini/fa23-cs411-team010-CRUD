DELIMITER //

CREATE TRIGGER MergePassengerRecords
AFTER UPDATE ON Passenger
FOR EACH ROW
BEGIN
    DECLARE originalPassengerId INT;

    SELECT PassengerId INTO originalPassengerId
    FROM Passenger
    WHERE PassengerFirstName = NEW.PassengerFirstName AND PassengerLastName = NEW.PassengerLastName
      AND Email = NEW.Email AND Phone = NEW.Phone
      AND PassengerId <> NEW.PassengerId
    ORDER BY PassengerId
    LIMIT 1;

    IF originalPassengerId IS NOT NULL THEN
        UPDATE Ticket
        SET PassengerId = originalPassengerId
        WHERE PassengerId = NEW.PassengerId;
    END IF;
END //

DELIMITER ;