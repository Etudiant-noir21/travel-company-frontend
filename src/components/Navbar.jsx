import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
// import AuthContext from "../components/Formulaire/AuthContext";
import "./navbar.css";
import AuthContext from "./Formulaires/UseContext";

const Navbar = () => {
	const { utilisateur, setUtilisateur } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		setUtilisateur(null);
		navigate("/login");
	};

	return (
		<>
			{/* ==========================Navbar========================== */}
			<nav className="navbar navbar-expand-lg bg-white p-1">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						TravelCompany
						{/* <img src="/Logo (1).png" alt="" /> */}
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-collapse gap-5"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav mx-auto gap-5  mb-2 mb-lg-0">
							<li className="nav-item">
								<NavLink
									to="/"
									style={({ isActive }) => ({
										backgroundColor: isActive ? "#040265" : "#f1f1f1",
										color: isActive ? "white" : "#040265",
									})}
								>
									Accueil
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									to="/ListesVol"
									style={({ isActive }) => ({
										backgroundColor: isActive ? "#040265" : "#f1f1f1",
										color: isActive ? "white" : "#040265",
									})}
								>
									Listes des Vols
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									to="/Reservation"
									style={({ isActive }) => ({
										backgroundColor: isActive ? "#040265" : "#f1f1f1",
										color: isActive ? "white" : "#040265",
									})}
								>
									Reservations
								</NavLink>
							</li>
						</ul>

						<div className="d-flex align-items-center gap-3">
							{utilisateur ? (
								<div className="dropdown">
									<button
										className="btn btn-outline-primary dropdown-toggle"
										type="button"
										id="userDropdown"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										{utilisateur.prenom} {utilisateur.nom}
									</button>
									<ul
										className="dropdown-menu dropdown-menu-end"
										aria-labelledby="userDropdown"
									>
										<li>
											<Link className="dropdown-item" to="/profil">
												Détails utilisateur
											</Link>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li>
											<button
												className="dropdown-item text-danger"
												onClick={handleLogout}
											>
												Déconnexion
											</button>
										</li>
									</ul>
								</div>
							) : (
								<>
									<Link to="/login">
										<button className="btn btn-outline-primary rounded-5">
											Connexion
										</button>
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
