import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MonAccueil from "./acceuil.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservation from "./reservation.jsx";
import Details from "./afficheDetaiils.jsx";
import Formulaire from "./components/formulaires/formulaire";
import Login from "./components/formulaires/login";
import { Reservations } from "./components/reservations/reservations";
import { ReservationProvider } from "./components/reservationProvider.jsx";
import Navbar from "./components/navbar.jsx";
import { BilletReservation } from "./components/billetReservation/billetReservation.jsx";
import { AuthProvider } from "./Components/formulaires/useContext.jsx";
import { FormProvider } from "./components/formulaires/FormContext.jsx";
import Lesvols from "./ListesVol.jsx";

function App() {
	return (
		<>
			<AuthProvider>
				<FormProvider>
					<ReservationProvider>
						<ToastContainer position="top-right" autoClose={3000} />
						<BrowserRouter>
							<Navbar />
							<Routes>
								<Route path="/" element={<MonAccueil/>} />
								<Route path="/ListesVol" element={<Lesvols />} />
								<Route path="/Reservation" element={<Reservation />} />
								<Route path="/AfficheDetaiils/:id" element={<Details />} />
								<Route path="/inscription" element={<Formulaire />} />
								<Route path="/Login" element={<Login />} />
								<Route path="/Reservations" element={<Reservations />} />
								<Route path="/pdfbillets" element={<BilletReservation />} />
							</Routes>
						</BrowserRouter>
					</ReservationProvider>
				</FormProvider>
			</AuthProvider>
		</>
	);
}

export default App;
