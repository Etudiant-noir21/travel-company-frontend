import Decouvertes from "./components/decouvertes/decouvertes";
import Footer from "./components/footer/footer";
import RechercheVols from "./components/rechercheVol/rechercheVol";
import MainTravel from "./components/mainTravel";
import useAffichageVols from "./Components/useVols";
import Vols from "./components/travelCard/vols";
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
