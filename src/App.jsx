import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MonAccueil from "./FirstPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LesVols from "./ListesVol";
import Reservation from "./Reservation";
import Details from "./AfficheDetaiils";
import Formulaire from "./Components/formulaires/Formulaire";
import Login from "./Components/formulaires/Login";
import { Reservations } from "./components/Reservations/Reservations";
import { BilletReservation } from "./components/BilletReservation/BilletsReserve";
import Navbar from "./components/Navbar";
// import Vols from "./Components/travelCard/vols";

function App() {
	return (
		<>
			<ToastContainer position="top-right" autoClose={3000} />
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<MonAccueil />} />
					<Route path="/ListesVol" element={<LesVols />} />
					<Route path="/Reservation" element={<Reservation />} />
					<Route path="/AfficheDetaiils/:id" element={<Details />} />
					<Route path="/inscription" element={<Formulaire />} />
					<Route path="/Login" element={<Login />} />
					<Route path="/Reservations" element={<Reservations />} />
					<Route path="/pdfbillets" element={<BilletReservation />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
