import Decouvertes from "./components/decouvertes/decouvertes.jsx";
import Footer from "./components/footer/footer.jsx";
import RechercheVols from "./components/rechercheVol/rechercheVol.jsx";
import MainTravel from "./components/mainTravel.jsx";
import useAffichageVols from "./components/useVols.jsx";
import Vols from "./components/travelCard/vols.jsx";
// import Vols from "./Components/travelCard/vols";

const MonAccueil = () => {
	const { vols } = useAffichageVols(3);

	return (
		<div>
			<MainTravel />
			<RechercheVols />
			<Decouvertes />
			<Vols tableau={vols} afficheButton={true} titre={"Nos Vols"} />
			<Footer />
		</div>
	);
};

export default MonAccueil;
