import { useContext, useEffect, useState } from "react";
import AuthContext from "../Formulaires/AuthContext";
import "./Reservation.css";
import { useNavigate } from "react-router-dom";

export const Reservations = () => {
	// infos personnels reservation
	const [reservation, setReservation] = useState({
		nom: "",
		prenom: "",
		email: "",
		telephone: "",
	});

	const navigation = useNavigate();
	// infos vols
	const [infosVols, setInfosVols] = useState({
		villeDepart: "",
		villeArrivee: "",
		dateDepart: "",
		dateArrivee: "",
		heureDepart: "",
		heureArrivee: "",
		compagnie: "",
		numeroVol: "",
		prix: "",
		duree: "",
		places: "",
	});

	const [dataVols, setDataVols] = useState([]);

	const { url } = useContext(AuthContext);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setReservation((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// pour le choix des vols
	useEffect(() => {
		const FetchVols = async () => {
			try {
				const response = await fetch(`${url}/api/vols`);
				if (!response.ok) {
					throw new Error("mauvais response ", response);
				} else {
					const data = await response.json();
					setDataVols(data);
					// console.log("donnes recuperer :", data);
				}
			} catch (err) {
				console.error("erreur de recuperation :", err);
			}
		};

		// appel de fetchVols
		FetchVols();
	}, [url]);

	console.log("dataVols :", dataVols);
	console.log("infos vols", infosVols);

	// pour l'enregistrement de la reservation
	const handleSubmit = async (e) => {
		e.preventDefault();
		const reservationData = {
			...reservation,
			...infosVols,
		};

		try {
			const response = await fetch(`${url}/api/reservations`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(reservationData),
			});

			if (!response.ok) throw new Error("Échec de l'envoi des données");

			const resultats = await response.json();
			console.log("Données envoyées dans la BD", resultats);

			// Navigation avec les données
			sessionStorage.setItem(
				"currentReservation",
				JSON.stringify(reservationData)
			);
			navigation("/pdfbillets", { state: { reservationData } });
			// navigation("/pdfbillets", {
			//   state: {
			//     reservationData: {
			//       ...reservation,
			//       ...infosVols,
			//       id: resultats.id // Ajout de l'ID de la réservation
			//     }
			//   }
			// });
		} catch (err) {
			console.error("Erreur lors de l'envoi des données", err.message);
		}
	};

	return (
		<>
			<div className="content">
				<h1>Faites vos reservations de billets d'avions </h1>
				<form action="" className="form">
					<h2>Informations Personelles</h2>
					<div className="infos-personels">
						<div className="mb-2 inputs">
							<label htmlFor="nom">Nom</label>
							<input
								type="text"
								name="nom"
								placeholder="Nom"
								className=""
								id="nom"
								value={reservation.nom}
								onChange={handleChange}
							/>
						</div>
						<div className="mb-2 inputs">
							<label htmlFor="prenom">Prenom</label>
							<input
								type="text"
								name="prenom"
								placeholder="Prenom"
								className=""
								id="prenom"
								value={reservation.prenom}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="infos-personels">
						<div className="mb-2 inputs">
							<label htmlFor="email">E-mail</label>
							<input
								type="email"
								name="email"
								placeholder="email"
								className=""
								id="email"
								value={reservation.email}
								onChange={handleChange}
							/>
						</div>
						<div className="mb-2 inputs">
							<label htmlFor="telephone">Telephone</label>
							<input
								type="number"
								name="telephone"
								placeholder="telephone"
								className=""
								id="telephone"
								value={reservation.telephone}
								onChange={handleChange}
							/>
						</div>
					</div>

					<h2 style={{ marginTop: "2rem" }}>Informations sur le vol</h2>

					{/* informations sur le vol */}
					<div className="infos-vol">
						<div className="mb-2 inputs choix_vol">
							<label htmlFor="vols">Choisir une vol</label>

							<select
								id="vol"
								onChange={(e) => {
									const vol = dataVols.find(
										(v) => v.id === Number(e.target.value)
									);
									console.log("vol trouver :", vol);

									console.log("id trouver", e.target.value);
									console.log(
										"Liste des ids trouves",
										dataVols.map((v) => v.id)
									);

									if (vol) {
										setInfosVols((prev) => ({
											...prev,
											villeDepart: vol.paysDepart,
											villeArrivee: vol.paysArrivee,
											dateDepart: vol.dateDepart?.substring(0, 10),
											dateArrivee: vol.dateArrivee?.substring(0, 10),
											heureDepart: vol.heureDepart,
											heureArrivee: vol.heureArrivee,
											compagnie: vol.compagnie,
											numeroVol: vol.numeroVol,
											prix: vol.prix,
											duree: vol.duree,
											// places: vol.places,
										}));
										console.log("infos sur le vol trouver", vol);
									} else {
										console.log("aucune vol trouver ", vol);
									}
								}}
							>
								<option value="">-- Sélectionnez un vol --</option>
								{dataVols.map((vol, index) => (
									<option key={index} value={vol.id}>
										{vol.paysDepart} → {vol.paysArrivee} ({vol.numeroVol})
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="infos-vol">
						<div className="mb-2 inputs">
							<label htmlFor="villeDepart">Ville Depart</label>
							<input
								type="text"
								name="villeDepart"
								placeholder="villeDepart"
								className=""
								id="villeDepart"
								value={infosVols.villeDepart}
								readOnly
							/>
						</div>
						<div className="mb-2 inputs">
							<label htmlFor="villeArrivee">Ville Arrivee</label>
							<input
								type="text"
								name="villeArrivee"
								placeholder="villeArrivee"
								className=""
								id="villeArrivee"
								value={infosVols.villeArrivee}
								readOnly
							/>
						</div>
					</div>

					<div className="infos-vol">
						<div className="mb-2 inputs">
							<label htmlFor="dateDepart">Date Depart</label>
							<input
								type="date"
								name="dateDepart"
								placeholder="dateDepart"
								className=""
								id="dateDepart"
								value={infosVols.dateDepart}
								readOnly
							/>
						</div>
						<div className="mb-2 inputs">
							<label htmlFor="dateArrivee">Date Arrivee</label>
							<input
								type="date"
								name="dateArrivee"
								placeholder="dateArrivee"
								className=""
								id="dateArrivee"
								value={infosVols.dateArrivee}
								readOnly
							/>
						</div>
					</div>

					<div className="infos-vol">
						<div className="mb-2 inputs">
							<label htmlFor="heureDepart">Heure Depart</label>
							<input
								type="time"
								name="heureDepart"
								placeholder="heureDepart"
								className=""
								id="heureDepart"
								value={infosVols.heureDepart?.substring(11, 16)}
								readOnly
							/>
						</div>
						<div className="mb-2 inputs">
							<label htmlFor="heureArrivee">Heure Arrivee</label>
							<input
								type="time"
								name="heureArrivee"
								placeholder="heureArrivee"
								className=""
								id="heureArrivee"
								value={infosVols.heureArrivee?.substring(11, 16)}
								readOnly
							/>
						</div>
					</div>

					<div className="infos-vol">
						<div className="mb-2 inputs">
							<label htmlFor="compagnie">Compagnie</label>
							<input
								type="text"
								name="compagnie"
								placeholder="compagnie"
								className=""
								id="compagnie"
								value={infosVols.compagnie}
								readOnly
							/>
						</div>
						<div className="mb-2 inputs">
							<label htmlFor="numeroVol">N° Vol</label>
							<input
								type="text"
								name="numeroVol"
								placeholder="numeroVol"
								className=""
								id="numeroVol"
								value={infosVols.numeroVol}
								readOnly
							/>
						</div>
					</div>

					<div className="infos-vol">
						<div className="mb-2 inputs">
							<label htmlFor="prix">Prix</label>
							<input
								type="number"
								name="prix"
								placeholder="prix"
								className=""
								id="prix"
								value={infosVols.prix}
								readOnly
							/>
						</div>
						<div className="mb-2 inputs">
							<label htmlFor="duree">Duree</label>
							<input
								type="text"
								name="duree"
								placeholder="duree"
								className=""
								id="duree"
								value={infosVols.duree}
								readOnly
							/>
						</div>
					</div>

					<button
						type="submit"
						className="btn"
						style={{ marginTop: "2rem" }}
						onClick={handleSubmit}
					>
						Valider
					</button>
				</form>
			</div>
		</>
	);
};
