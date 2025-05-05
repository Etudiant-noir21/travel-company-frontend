import MaReservation from "./components/maReservation/reservation.jsx";
import './components/maReservation/reservation.css'


const Reservation = () => {
    return(
        <div className="reserve">
            <h4>Mes Reservations</h4>
            <MaReservation />
        </div>
    )
}
 
export default Reservation;