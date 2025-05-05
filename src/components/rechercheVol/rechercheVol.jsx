import "./Recherche.css"
// import { FiExternalLink } from 'react-icons/fi';
import { FaPlaneDeparture, FaPlaneArrival, FaUser } from 'react-icons/fa';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RechercheVols = () => {
    const [depart, setDepart] = useState("")
    const [destination, setDestinations] = useState("")

    const navigate = useNavigate()

    const MyRecherche = (e) => {
        e.preventDefault()
        navigate(`/ListesVol?depart=${depart}&destination=${destination}`)
    }

    return ( 
        <div className="sectionVol">
            <h5>Rechercher de vol</h5>
            <form onSubmit={MyRecherche}>
              
                <div className="part">
                    <FaPlaneDeparture />
                    <input type="text" placeholder="Départ" value={depart} onChange={(e) => setDepart(e.target.value)} />
                </div>
                <div className="part">
                    <FaPlaneArrival />
                    <input type="text" placeholder="Destinations" value={destination} onChange={(e) => setDestinations(e.target.value)} />
                </div>
                <span className="btn" type="submit">Recherche</span>
            </form>
        </div>
     );
}
 
export default RechercheVols;