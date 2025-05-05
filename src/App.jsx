import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MonAccueil from "./firstPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LesVols from "./listesVol.jsx";
import Reservation from "./reservation.jsx";
import Details from "./afficheDetaiils.jsx";
import Formulaire from "./Components/Formulaires/Formulaire";
import Login from "./Components/Formulaires/Login";
import { Reservations } from "./Components/Reservations/Reservations";
import { AuthProvider } from "./Components/Formulaires/UseContext.jsx";
import { ReservationProvider } from "./components/ReservationProvider.jsx";
import Navbar from "./components/Navbar.jsx";
import { FormProvider } from "./Components/Formulaires/FormContext.jsx";
import { BilletReservation } from "./components/billetReservation/billetReservation.jsx";

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
								<Route path="/ListesVol" element={<LesVols />} />
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
