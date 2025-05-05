import { useState, useEffect, useContext } from "react";
import AuthContext from "./Formulaires/AuthContext";

const useAffichageVols = (limit = null) => {
	const [vols, setVols] = useState([]);

	const { url } = useContext(AuthContext);

	useEffect(() => {
		fetch(`${url}/api/vols`)
			.then((res) => res.json())
			.then((donner) => {
				console.log(donner);
				const result = limit ? donner.slice(0, limit) : donner;
				setVols(result);
			})
			.catch((err) =>
				console.error("Erreur lors du chargement des vols :", err)
			);
	}, [url, limit]);

	return { vols };
};

export default useAffichageVols;
