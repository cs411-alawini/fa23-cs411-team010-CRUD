# Flight Scheduling System #

## Project Summary ##
This group project is an online flight scheduling system which helps passengers search for ticket information, purchase tickets, cancel tickets, transfer flights, etc. This group project uses React as the front-end framework, Node.js as the back-end framework, and MySQL as the database. The data stored in the database is "2015 Flight Delays and Cancellations" which consists of 5.8M records.

## Application Description ##
Nowadays there are many flight scheduling systems, but most of them contains a lot of redundant information and each functionality requires complex steps. Thus our group decide to build a web application that focuses on the functionalities that passengers need the most with the minimum number of steps. This application will solve the most common problems passengers have: 1. How to find the ticket information, will the plane arrive on time or is it delayed (for how long)? 2. How to buy a ticket from one airport to another airport within the time range? 3. If the plane is delayed longer than expected, how to cancel the ticket or reschedule the ticket？See Functionality for details, our group will implement more functions in the future.

## Usefulness ##
The proposed database and web application project, centered around the 2015 Flight Delays and Cancellations dataset will offer significant usefulness and value to both passengers and the aviation industry.

1. Passenger Convenience: This project will greatly benefit passengers by providing them with a user-friendly platform to access real-time flight information. Passengers can search for their flights using various parameters, such as passenger ID, passenger name, departure and destination airports, and estimated departure dates. This feature will streamline the travel experience, helping passengers stay updated on their flight status, departure delays, and other crucial information.

2. Flight Rescheduling: Passengers often need to reschedule their flights due to unforeseen circumstances (as provided in the dataset). Our application will offer a way for passengers to update their flight details, including departure airport, destination airport, and other related information. This flexibility will ensure that passengers can adapt to changing travel plans more easily.

3. Cancellation and Refund: Passengers who wish to cancel their flights can do so easily through the system, leading to the automatic deletion of their flight records. This will simplify the cancellation process and will ensure that the database remains up-to-date.

4. Capacity Management: The system will also assist airlines in managing flight capacity. By tracking booked tickets and adjusting the capacity attribute, airlines can ensure optimal seat availability and prevent overbooking, improving overall customer satisfaction.

5. Unique Features: While there are existing flight booking and tracking websites, our project will stand out with its focus on real-time flight data from 2015, providing a historical perspective. Additionally, features like capacity management and automatic record deletion upon cancellation will offer unique benefits not commonly found in other flight booking and tracking platforms.

6. Calendar and Visualization: The inclusion of a Calendar feature and a world map visualization further will enhance the project's usefulness. Passengers can easily view all flights scheduled for the day, helping them plan their journeys efficiently. The world map visualization adds a visual element to flight tracking, making it more engaging and informative.

## Realness ##
The dataset for this project is derived from the U.S. Department of Transportation's (DOT) Bureau of Transportation Statistics, which meticulously monitors the on-time performance of domestic flights operated by major air carriers. The data is sourced from the DOT's monthly Air Travel Consumer Report and provides a comprehensive view of flight operations during the year 2015. We will utilize the 2015 Flight Delays and Cancellations dataset available on Kaggle (https://www.kaggle.com/datasets/usdot/flight-delays). This dataset comprises three CSV files: airlines, airports, and flights. The flights.csv file serves as the central component, connecting information about airlines, airports, and individual flights. It encompasses various attributes, including:

Flight Information: Year, month, day, day of the week, airline, flight number, tail number, origin airport, destination airport, scheduled departure and arrival times, actual departure and arrival times, departure and arrival delays, distance traveled, and whether the flight was diverted or canceled.

Operational Delays: Detailed information about the causes of delays, including air system delays, security delays, airline delays, late aircraft delays, and weather delays.

Airport Details: Information about the airports, including IATA codes, airport names, city, state, country, latitude, and longitude coordinates.

This rich and real-world dataset will serve as the foundation for our database and web application project, providing authentic historical flight data from 2015. Through careful data processing, database implementation, and web application development, we will leverage this dataset to create a practical and user-friendly tool for passengers and airlines to manage and access critical flight information.

## Functionality ##
### Basic Functions ###
This website serves as a platform for users to efficiently search, create, and manage their flight bookings. Users can initiate flight searches by specifying their
departure airport or city, destination airport or city, and the desired departure date. Once the search is complete, all available flight information, including any connecting flights, will be displayed. Users can then proceed to book their preferred flight, generating a unique booking ID in the process. The booking details will encompass the booking ID, the user's full name, as well as comprehensive flight information such as the departure and destination airports, departure date, etc. In the future, users will be required to provide their booking ID, full name, and the current date to access the booking information on that day, including flight delay and cancellation information. Customers can review this information and decide to update their booking details or cancel their booking.

### Creative Functions ###
This web application will include capacity management by adding a new attribute named "Capacity" with a default value 1000. Each time a passenger books a ticket, cancels a ticket, or reschdules a ticket, the Capacity attribute will automatically add 1 or minus 1. If the Capacity attributs is below 0, the system will give a "Sold Out" warning! This web application will also include a clendar and a world map to further visualize all flights scheduled for the day, helping passengers plan their journeys efficiently. 

## Low-fidelity UI Mockup ##
![Flight](https://github.com/cs411-alawini/fa23-cs411-team010-CRUD/assets/143434843/b654cb61-0f63-4e18-afa1-b49746f7c25e)

## Project Work Distribution (Temporary) ##
1. Liam Li: Add(book a ticket), Search(search ticket information)      
2. Yifan Zhong: Delete(cancel a ticket), Update(reschedule a ticket)       
3. Nimit Kapadia: Capacity management, visualization   
