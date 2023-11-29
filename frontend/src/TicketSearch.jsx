import React, { useState } from 'react';
import axios from "axios";
import './App.css';

const formatTime = (time) => {
    let timeStr = String(time).padStart(4, '0');
    return timeStr.slice(0, 2) + ':' + timeStr.slice(2);
};
const SearchForm = ({ ticketIdText, setTicketIdText, firstNameText, setFirstNameText, lastNameText, setLastNameText, handleSearch }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label>
            Ticket Id
            <input type="text" value={ticketIdText} onChange={(e) => setTicketIdText(e.target.value)} />
        </label>
        <label>
            First Name
            <input type="text" value={firstNameText} onChange={(e) => setFirstNameText(e.target.value)} />
        </label>
        <label>
            Last Name
            <input type="text" value={lastNameText} onChange={(e) => setLastNameText(e.target.value)} />
        </label>
        <button onClick={handleSearch}>Search</button>
    </div>
);

const TicketList = ({ tickets, handleCancel, handleUpdate }) => (
    <div>
        {tickets.map((ticket, index) => (
            <div key={index} className="flight-box">
                <p>Ticket Id: {ticket.TicketId}</p>
                <p>Flight: {ticket.AirlineId} {String(ticket.FlightNumber).padStart(4, '0')}</p>
                <p>Passenger: {ticket.PassengerFirstName} {ticket.PassengerLastName}</p>
                <p>Email: {ticket.Email}</p>
                <p>Phone: {ticket.Phone}</p>
                <p>Route: {ticket.DepartureAirport} - {ticket.DestinationAirport}</p>
                <p>Schedule Date: {ticket.ScheduleDate}</p>
                <p>Schedule Time: {formatTime(ticket.ScheduleDepartureTime)} - {formatTime(ticket.ScheduleArrivalTime)}</p>

                <button onClick={() => handleCancel(ticket)}>Cancel</button>
                <button onClick={() => handleUpdate(ticket)}>Update</button>
            </div>
        ))}
    </div>
);
const TicketSearchComponent = () => {
    const [ticketIdText, setTicketIdText] = useState('1');
    const [firstNameText, setFirstNameText] = useState('Victor');
    const [lastNameText, setLastNameText] = useState('Olsen');
    const [tickets, setTickets] = useState([]);

    const handleSearch = () => {
        const url = 'http://localhost:3000/search-ticket';
        const params = { id: ticketIdText, firstName: firstNameText, lastName: lastNameText };

        axios.get(url, { params })
            .then(response => {
                setTickets(response.data);
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
    };

    const handleCancel = (ticket) => {
        const url = 'http://localhost:3000/cancel-ticket';
        const params = { ticketId: ticket.TicketId };
        axios.get(url, { params })
            .then(response => {
                setTickets([]);
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
    }

    const handleUpdate = (ticket) => {
        return;
    }


    return (
        <>
            <SearchForm
                ticketIdText={ticketIdText}
                setTicketIdText={setTicketIdText}
                firstNameText={firstNameText}
                setFirstNameText={setFirstNameText}
                lastNameText={lastNameText}
                setLastNameText={setLastNameText}
                handleSearch={handleSearch}
            />
            <TicketList tickets={tickets} handleCancel={handleCancel} handleUpdate={handleUpdate}></TicketList>
        </>
    )
}

export default TicketSearchComponent;