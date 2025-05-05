import "./details.css";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../formulaires/useContext.jsx";
import { useReservation } from "../reservationProvider.jsx";

const DetailsVols = () => {
	const { id } = useParams();
	const [vol, setVol] = useState(null);
	const navigate = useNavigate();

	const { setReservation } = useReservation();
	// const { formData } = useContext(FormContext)

	const { url } = useContext(AuthContext);

	useEffect(() => {
		fetch(`${url}/api/vols`)
			.then((res) => res.json())
			.then((donner) => {
				console.log(donner);
				// const volTrouve = donner.find((v) => v.id === id);
				const volTrouve = donner.find((v) => v.id === parseInt(id));
				console.log("resultats vol  trouver ", volTrouve);
				setVol(volTrouve);
			});
		// const volTrouve = data.vols
	}, [url, id]);

	const annuler = () => {
		navigate("/");
	};

	const envoyerReservation = () => {
		const tokenRecup = localStorage.getItem("token");
		console.log(tokenRecup);

		if (tokenRecup === null) {
			alert("Vous devez creer un compte");
		} else {
			const reservationData = {
				nom: "formData.nom",
				prenom: "formData.prenom",
				email: "form?khqd",
				telephone: "+221786452310",
				vol: {
					numeroVols: vol.numeroVol,
					compagnie: vol.compagnie,
					depart: {
						villeDepart: vol.paysDepart,
						dateDepart: vol.heureDepart,
						aeroportDepart: vol.aeroportDepart,
					},
					arrivee: {
						villeArrivee: vol.paysArrivee,
						dateArrivee: vol.heureArrivee,
						aeroportArrivee: vol.aeroportArrivee,
					},
					classe: "Economy",
					prix: vol.prix,
					statut: "En attente",
					duree: vol.duree,
				},
			};

			fetch(
				`http://${url}/api/reservations`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(reservationData),
				},
				{ url }
			)
				.then(() => {
					console.log("Nouveau blog Ajouter");
					// setChargement(false)
					history("/Reservation");
				})
				.catch((err) => console.log(err));

			setReservation(reservationData); // On stocke dans le contexte
			navigate("/Reservations");
		}
	};

	if (!vol) {
		return <p>Chargement en cours...</p>;
	}

	return (
		<div className="details">
			<div className="partDetails">
				<h5>
					{vol.paysDepart} - {vol.paysArrivee}
				</h5>
				<h6>Date du jour: </h6>
				<p>Durée: {vol.duree}</p>
			</div>

			<div className="informations">
				<div className="infos">
					<h5>{vol.paysDepart}</h5>
					<h6>{vol.heureDepart}</h6>
					<p>{vol.aeroportDepart}</p>
				</div>
				<span className="barre"></span>
				<div className="infos-d">
					<h5>{vol.paysArrivee}</h5>
					<h6>{vol.heureArrivee}</h6>
					<p>{vol.aeroportArrivee}</p>
				</div>
			</div>

			<div className="supplementaire">
				<h6>
					<span className="titre">Company</span>{" "}
					<span className="special valeur">{vol.compagnie}</span>
				</h6>
				<h6>
					<span className="titre">Numero de Vol</span>{" "}
					<span className="valeur">{vol.numeroVol}</span>
				</h6>
				<h6>
					<span className="titre">Prix</span>{" "}
					<span className="valeur">{vol.prix}</span>
				</h6>
			</div>

			<div className="connfirmer">
				<button onClick={annuler}>Annuler</button>
				<button onClick={envoyerReservation}>Reserver</button>
			</div>
		</div>
	);
};

export default DetailsVols;
