import React from 'react';
import { Box, Button } from "@mui/material";
import { formatTime } from '../utils/helpers';
import MapComponent from "./MapComponent.jsx"; // Adjust the path to where your helper function is located

const TicketList = ({ tickets, handleCancel, handleUpdate, hasSearched }) => (
    <div>
        {!hasSearched ? null : tickets.length === 0 ? (
            <p>No results</p>
        ) : (
            tickets.map((ticket, index) => (
                <Box key={index} sx={{
                    display: 'flex',
                    flexDirection: 'row', // Parent Box in row direction for columns
                    alignItems: 'flex-start',
                    padding: '10px',
                    boxShadow: 2,
                    backgroundColor: 'grey.200',
                    color: 'text.primary',
                    gap: '80px' // Adds space between columns
                }}>
                    {/*<p>Ticket Id: {ticket.TicketId}</p>*/}
                    {/*<p>Flight: {ticket.AirlineId} {String(ticket.FlightNumber).padStart(4, '0')}</p>*/}
                    {/*<p>Passenger: {ticket.PassengerFirstName} {ticket.PassengerLastName}</p>*/}
                    {/*<p>Route: {ticket.DepartureAirport} - {ticket.DestinationAirport}</p>*/}
                    {/*<p>Email: {ticket.Email}</p>*/}
                    {/*<p>Phone: {ticket.Phone}</p>*/}
                    {/*<p>Date: {ticket.ScheduleDate.split('T')[0]}</p>*/}
                    {/*<p>Time: {formatTime(ticket.ScheduleDepartureTime)} - {formatTime(ticket.ScheduleArrivalTime)}</p>*/}
                    {/* First Column */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <p>Ticket Id: {ticket.TicketId}</p>
                        <p>Flight: {ticket.AirlineId} {String(ticket.FlightNumber).padStart(4, '0')}</p>
                        <p>Passenger: {ticket.PassengerFirstName} {ticket.PassengerLastName}</p>
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

                    {/* Second Column */}
                    {/*<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>*/}
                    {/*    <p>Email: {ticket.Email}</p>*/}
                    {/*    <p>Phone: {ticket.Phone}</p>*/}
                    {/*    <p>Date: {ticket.ScheduleDate.split('T')[0]}</p>*/}
                    {/*    <p>Time: {formatTime(ticket.ScheduleDepartureTime)} - {formatTime(ticket.ScheduleArrivalTime)}</p>*/}
                    {/*</Box>*/}

                    {/*<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>*/}
                    {/*    <Button variant='contained' size='small' onClick={() => handleUpdate(ticket)} style={{ marginTop: '0px' }}>Update</Button>*/}
                    {/*    <Button variant='contained' size='small' onClick={() => handleCancel(ticket)} style={{ marginTop: '0px', marginLeft: '10px' }}>Cancel</Button>*/}
                    {/*</div>*/}
                    <MapComponent from={ticket.DepartureAirport} to={ticket.DestinationAirport}></MapComponent>
                </Box>


            ))
        )}
    </div>
);

export default TicketList;
