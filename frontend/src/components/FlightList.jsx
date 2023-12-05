import {Box} from "@mui/material";
import {formatTime} from "../utils/helpers.js";
import Button from "@mui/material/Button";
import React from "react";
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
export default FlightList;