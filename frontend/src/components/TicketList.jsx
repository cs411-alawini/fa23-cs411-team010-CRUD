import React from 'react';
import { Box, Button } from "@mui/material";
import { formatTime } from '../utils/helpers';
import MapComponentLighter from "./MapComponentLighter.jsx";

const TicketList = ({ tickets, handleCancel, handleUpdate, hasSearched }) => (
    <div>
        {!hasSearched ? null : tickets.length === 0 ? (
            <p>No results</p>
        ) : (
            tickets.map((ticket, index) => (
                <Box key={index} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    padding: '10px',
                    boxShadow: 2,
                    backgroundColor: 'grey.200',
                    color: 'text.primary',
                    gap: '80px'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <p>Ticket Id: {ticket.TicketId}</p>
                        <p>Flight: {ticket.AirlineId} {String(ticket.FlightNumber).padStart(4, '0')}</p>
                        <p>Passenger: {ticket.PassengerFirstName} {ticket.PassengerLastName}</p>
                        <p>Passenger Id: {ticket.PassengerId}</p>
                        <p>Route: {ticket.DepartureAirport} - {ticket.DestinationAirport}</p>
                        <p>Email: {ticket.Email}</p>
                        <p>Phone: {ticket.Phone}</p>
                        <p>Date: {ticket.ScheduleDate.split('T')[0]}</p>
                        <p>Time: {formatTime(ticket.ScheduleDepartureTime)} - {formatTime(ticket.ScheduleArrivalTime)}</p>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Button variant='contained' size='small' onClick={() => handleUpdate(ticket)} style={{ marginTop: '0px' }}>Update</Button>
                            <Button variant='contained' size='small' onClick={() => handleCancel(ticket)} style={{ marginTop: '0px', marginLeft: '10px' }}>Cancel</Button>
                        </div>
                    </Box>
                    <MapComponentLighter from={[ticket.FromLatitude, ticket.FromLongitude]} to={[ticket.ToLatitude, ticket.ToLongitude]}></MapComponentLighter>
                </Box>
            ))
        )}
    </div>
);
export default TicketList;
