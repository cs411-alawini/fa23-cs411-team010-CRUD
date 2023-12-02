import FlightSearchComponent from "./FlightSearch.jsx";
import TicketSearchComponent from "./TicketSearch.jsx";
import './App.css'
import TicketSearchByPassengerComponent from "./TicketSearchByPassenger.jsx";

function App() {

  return (
    <>
        <TicketSearchByPassengerComponent></TicketSearchByPassengerComponent>
        <br></br>
        <TicketSearchComponent></TicketSearchComponent>
        <br></br>
        <FlightSearchComponent></FlightSearchComponent>
    </>
  )
}
export default App
