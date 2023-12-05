import React, { useState } from 'react';
import axios from "axios";
import './App.css';
import Button from '@mui/material/Button';
import Modal from "./components/Modal.jsx";
import TicketList from "./components/TicketList.jsx"

const apiUrl = import.meta.env.VITE_API_URL;
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
        <div style={{ flexGrow: 1 }}></div>
        <Button variant="contained" onClick={handleSearch}>Search</Button>
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
    const [hasSearched, setHasSearched] = useState(false);

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
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
        setHasSearched(true);
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
            <TicketList tickets={tickets} handleCancel={handleCancel} handleUpdate={handleUpdate} hasSearched={hasSearched}></TicketList>
        </>
    )
}
export default TicketSearchComponent;