import { useState } from 'react'
import FlightSearchComponent from "./FlightSearch.jsx";
import TicketSearchComponent from "./TicketSearch.jsx";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <TicketSearchComponent></TicketSearchComponent>
        <FlightSearchComponent></FlightSearchComponent>
    </>
  )
}

export default App
