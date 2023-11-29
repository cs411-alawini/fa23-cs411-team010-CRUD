import React, { useState } from 'react';
import axios from "axios";
import './App.css';

// Utility function for time formatting
const formatTime = (time) => {
    let timeStr = String(time).padStart(4, '0');
    return timeStr.slice(0, 2) + ':' + timeStr.slice(2);
};

// Modal Component
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

// Search Form Component
const SearchForm = ({ fromText, setFromText, toText, setToText, date, setDate, handleSearch }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label>
            From
            <input type="text" value={fromText} onChange={(e) => setFromText(e.target.value)} />
        </label>
        <label>
            To
            <input type="text" value={toText} onChange={(e) => setToText(e.target.value)} />
        </label>
        <label>
            Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <button onClick={handleSearch}>Search</button>
    </div>
);

// Flight List Component
const FlightList = ({ flights, handleBuy }) => (
    <div>
        {flights.map((flight, index) => (
            <div key={index} className="flight-box">
                <p>Flight: {flight.AirlineId} {String(flight.FlightNumber).padStart(4, '0')}</p>
                <p>Schedule: {formatTime(flight.ScheduleDepartureTime)} - {formatTime(flight.ScheduleArrivalTime)}</p>
                <button onClick={() => handleBuy(flight)}>Buy</button>
            </div>
        ))}
    </div>
);

const FlightSearchComponent = () => {
    // State definitions
    const [fromText, setFromText] = useState('JFK');
    const [toText, setToText] = useState('LAX');
    const [date, setDate] = useState('2015-01-01');
    const [flights, setFlights] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '' });
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);
    const [ticketId, setTicketId] = useState(null);

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
            ...formData,
            airlineId: selectedFlight.AirlineId,
            flightNumber: selectedFlight.FlightNumber
        };

        const url = 'http://localhost:3000/buy-ticket';

        axios.post(url, { params })
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
        const url = 'http://localhost:3000/search-flight';
        const params = { from: fromText, to: toText, date: date };

        axios.get(url, { params })
            .then(response => {
                setFlights(response.data);
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
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
            <FlightList flights={flights} handleBuy={handleBuy} />
            <Modal show={showModal} onClose={handleCloseModal}>
                {purchaseSuccess ? (
                    <div>
                        <p>Purchase Successful!</p>
                        <p>Your Ticket ID: {ticketId}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label>First Name: <input type="text" name="firstName" onChange={handleInputChange}/></label><br/>
                        <label>Last Name: <input type="text" name="lastName" onChange={handleInputChange}/></label><br/>
                        <label>Phone (Optional): <input type="tel" name="phone" onChange={handleInputChange}/></label><br/>
                        <label>Email (Optional): <input type="email" name="email" onChange={handleInputChange}/></label><br/>
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Modal>
        </>
    );
};

export default FlightSearchComponent;