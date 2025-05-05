import React from "react";
import VolInfo from "./volsInfos";

const CarteVoyage = ({ donner }) => {
  if (!Array.isArray(donner) || donner.length === 0) {
    return <p>Aucun vol à afficher.</p>;
  }

  return (
    <div className="shadow py-2 px-2 rounded">
      {donner.map((vol,index)=><VolInfo
          key={index}
          compagnie={vol.compagnie}
          departLieu={vol.aeroportDepart}
          arriveLieu={vol.aeroportArrivee}
          departPays={vol.paysDepart}
          arrivePays={vol.paysArrivee}
          departHeure={vol.heureDepart}
          arriveHeure={vol.heureArrivee}
          id={vol.id}
          placesDisponibles={vol.placesDisponibles}
        />) }
    </div>
  );
};

export default CarteVoyage;
