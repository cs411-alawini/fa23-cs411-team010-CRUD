import React, { useState } from 'react';
import axios from "axios";
import './App.css';
import Button from '@mui/material/Button';
import {Box} from "@mui/material";
import Modal from "./components/Modal.jsx";
import { formatTime } from "./utils/helpers.js"

const apiUrl = import.meta.env.VITE_API_URL;
const SearchForm = ({ fromText, setFromText, toText, setToText, date, setDate, handleSearch }) => (

    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid #ccc', // adds a light grey border
            borderRadius: '8px', // rounds the corners
            padding: '10px' // adds space inside the border
        }}
    >
        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            From
            <input type="text" value={fromText} onChange={(e) => setFromText(e.target.value)} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            To
            <input type="text" value={toText} onChange={(e) => setToText(e.target.value)} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <div style={{ flexGrow: 1 }}></div>
        <Button variant="contained" onClick={handleSearch}>Search</Button>
    </div>
);

// Flight List Component
const FlightList = ({ flights, handleBuy, hasSearched }) => (
    <div>
        {!hasSearched ? null : flights.length === 0 ? (
            <p>No results</p>
        ) : (
            flights.map((flight, index) => (
                <Box key={index} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '10px',
                    boxShadow: 2,
                    backgroundColor: 'grey.200',
                    color: 'text.primary'
                }}>
                    <p>Flight: {flight.AirlineId} {String(flight.FlightNumber).padStart(4, '0')}</p>
                    <p>Schedule: {formatTime(flight.ScheduleDepartureTime)} - {formatTime(flight.ScheduleArrivalTime)}</p>
                    <Button variant="contained" onClick={() => handleBuy(flight)}>Buy</Button>
                </Box>
            ))
        )}
    </div>

);

const FlightSearchComponent = () => {
    // State definitions
    const [fromText, setFromText] = useState('JFK');
    const [toText, setToText] = useState('LAX');
    const [date, setDate] = useState('2015-01-02');
    const [flights, setFlights] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '' });
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);
    const [ticketId, setTicketId] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    // Handler for input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const params = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            airlineId: selectedFlight.AirlineId,
            flightNumber: selectedFlight.FlightNumber,
            email: formData.email,
            phone: formData.phone
        };

	const url = apiUrl + '/buy-ticket';

        axios.post(url, params)
            .then(response => {
                setTicketId(response.data.ticketId);
                setPurchaseSuccess(true);
            })
            .catch(error => {
                console.error('Error during fetch:', error);
                setPurchaseSuccess(false);
            });
    };

    // Handler for flight search
    const handleSearch = () => {
        const url = apiUrl + '/search-flight';
        const params = { from: fromText, to: toText, date: date };

        axios.get(url, { params })
            .then(response => {
		    console.log('API Response:', response.data);
                setFlights(response.data);
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
        setHasSearched(true)
    };

    // Handler for initiating a buy
    const handleBuy = (flight) => {
        setSelectedFlight(flight);
        setShowModal(true);
    };

    // Handler for closing the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setPurchaseSuccess(false);
        setTicketId(null);
    };

    return (
        <>
            <SearchForm
                fromText={fromText}
                setFromText={setFromText}
                toText={toText}
                setToText={setToText}
                date={date}
                setDate={setDate}
                handleSearch={handleSearch}
            />
            <FlightList flights={flights} handleBuy={handleBuy} hasSearched={hasSearched}/>
            <Modal show={showModal} onClose={handleCloseModal}>
                {purchaseSuccess ? (
                    <div>
                        <p>Purchase Successful!</p>
                        <p>Your Ticket ID: {ticketId}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <label style={{ width: '40%' }}>First Name:</label>
                            <input type="text" name="firstName" onChange={handleInputChange} style={{ width: '58%' }}/>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <label style={{ width: '40%' }}>Last Name:</label>
                            <input type="text" name="lastName" onChange={handleInputChange} style={{ width: '58%' }}/>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <label style={{ width: '40%' }}>Phone:</label>
                            <input type="tel" name="phone" onChange={handleInputChange} style={{ width: '58%' }}/>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <label style={{ width: '40%' }}>Email:</label>
                            <input type="email" name="email" onChange={handleInputChange} style={{ width: '58%' }}/>
                        </div>
                        <Button variant='contained' type="submit">Submit</Button>
                    </form>
                )}
            </Modal>
        </>
    );
};

export default FlightSearchComponent;
