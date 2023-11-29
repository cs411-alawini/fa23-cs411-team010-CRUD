import React, { useState } from 'react';
import axios from "axios";
import './App.css';

const Modal = ({ show, onClose, children }) => {
    if (!show) return null;
    return (
        <div className="modal-backdrop">
            <div className="modal">
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
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
    const [updateTicket, setUpdateTicket] = useState(null);
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleUpdate = (ticket) => {
        setUpdateTicket(ticket);
        setNewEmail(ticket.Email);
        setNewPhone(ticket.Phone);
        setShowUpdateModal(true);
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        const data = {
            ticketId: updateTicket.TicketId,
            email: newEmail
        };


        axios.post('http://localhost:3000/update-email', data)
            .then(response => {
                // Handle response
                // setShowUpdateModal(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        const dataPhone = {
            ticketId: updateTicket.TicketId,
            phone: newPhone
        }
        axios.post('http://localhost:3000/update-phone', dataPhone)
            .then(response => {
                // Handle response
                handleSearch();
                setShowUpdateModal(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
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
        axios.post(url, params)
            .then(() => {
                setTickets([]);
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
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
            <Modal show={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
                <form onSubmit={handleUpdateSubmit}>
                    <label>Email: <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} /></label><br/>
                    <label>Phone: <input type="tel" value={newPhone} onChange={e => setNewPhone(e.target.value)} /></label><br/>
                    <button type="submit">Submit</button>
                </form>
            </Modal>
            <TicketList tickets={tickets} handleCancel={handleCancel} handleUpdate={handleUpdate}></TicketList>
        </>
    )
}

export default TicketSearchComponent;