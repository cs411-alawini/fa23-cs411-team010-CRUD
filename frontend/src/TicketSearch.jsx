import React, { useState } from 'react';
import axios from "axios";
import './App.css';
import Button from '@mui/material/Button';
import {Box} from "@mui/material";

const apiUrl = import.meta.env.VITE_API_URL;
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
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid #ccc', // adds a light grey border
        borderRadius: '8px', // rounds the corners
        padding: '10px' // adds space inside the border
    }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            Ticket Id
            <input type="text" value={ticketIdText} onChange={(e) => setTicketIdText(e.target.value)} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            First Name
            <input type="text" value={firstNameText} onChange={(e) => setFirstNameText(e.target.value)} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            Last Name
            <input type="text" value={lastNameText} onChange={(e) => setLastNameText(e.target.value)} />
        </label>
        <Button variant="contained" onClick={handleSearch}>Search</Button>
    </div>
);

const TicketList = ({ tickets, handleCancel, handleUpdate }) => (
    <div>
        {tickets.map((ticket, index) => (
            <Box key={index} sx={{ display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '10px',
                boxShadow: 2,
                backgroundColor: 'grey.200',
                color: 'text.primary'
            }}>
            {/*<div key={index} className="flight-box">*/}
                <p>Ticket Id: {ticket.TicketId}</p>
                <p>Flight: {ticket.AirlineId} {String(ticket.FlightNumber).padStart(4, '0')}</p>
                <p>Passenger: {ticket.PassengerFirstName} {ticket.PassengerLastName}</p>
                <p>Email: {ticket.Email}</p>
                <p>Phone: {ticket.Phone}</p>
                <p>Route: {ticket.DepartureAirport} - {ticket.DestinationAirport}</p>
                <p>Schedule Date: {ticket.ScheduleDate}</p>
                <p>Schedule Time: {formatTime(ticket.ScheduleDepartureTime)} - {formatTime(ticket.ScheduleArrivalTime)}</p>
                <div style={{ display: 'flex' }}>
                    <Button variant='contained' onClick={() => handleCancel(ticket)}>Cancel</Button>
                    <Button variant='contained' onClick={() => handleUpdate(ticket)} style={{ marginLeft: '10px' }}>Update</Button>
                </div>
            {/*</div>*/}
            </Box>
        ))}
    </div>
);
const TicketSearchComponent = () => {
    const [ticketIdText, setTicketIdText] = useState('');
    const [firstNameText, setFirstNameText] = useState('');
    const [lastNameText, setLastNameText] = useState('');
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


        axios.post(apiUrl + '/update-email', data)
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
        axios.post(apiUrl + '/update-phone', dataPhone)
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
        const url = apiUrl + '/search-ticket';
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
        const url = apiUrl + '/cancel-ticket';
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <label style={{ width: '40%' }}>Phone:</label>
                        <input type="tel" name="phone" onChange={e => setNewPhone(e.target.value)} style={{ width: '58%' }}/>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <label style={{ width: '40%' }}>Email:</label>
                        <input type="email" name="email" onChange={e => setNewEmail(e.target.value)} style={{ width: '58%' }}/>
                    </div>
                    <Button variant='contained' type="submit">Submit</Button>
                </form>
            </Modal>
            <TicketList tickets={tickets} handleCancel={handleCancel} handleUpdate={handleUpdate}></TicketList>
        </>
    )
}

export default TicketSearchComponent;
