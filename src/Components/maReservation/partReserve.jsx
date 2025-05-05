
const PartReserve = ({ information }) => {
    if (!information || !information.vol) {
      return <p>Aucune information de réservation disponible.</p>;
    }
  
    const { nom, prenom, email } = information;
    const { vol } = information;
    const { depart, arrivee, compagnie, numeroVol, prix, duree } = vol;
  
    return (
      <div className="reservation">
        <div className="infos">
          <div className="Person">
            <h5><u>Nom</u>: {prenom} {nom}</h5>
            <h6><u>Mail</u>: {email}</h6>
            <p><u>Sexe</u>: Masculin</p>
            <p><u>Nationalité</u>: Sénégal</p>
            <p><u>Numéro Passeport</u>: 201802180</p>
          </div>
          <div className="voyage">
            <h5>{depart.villeDepart} - {arrivee.villeArrivee}</h5>
            <h6>Durée: {duree}</h6>
          </div>
        </div>
  
        <div className="company">
          <h6>{compagnie}</h6>
          <p><u>N° Vol</u>: {numeroVol}</p>
        </div>
  
        <div className="infosVols">
          <div className="right">
            <p><u>Départ</u>: {depart.villeDepart}</p>
            <p><u>Heure</u>: {new Date(depart.dateDepart).toLocaleTimeString()}</p>
            <p><u>Aéroport</u>: {depart.aeroportDepart}</p>
          </div>
          <div className="left">
            <p><u>Arrivée</u>: {arrivee.villeArrivee}</p>
            <p><u>Heure</u>: {new Date(arrivee.dateArrivee).toLocaleTimeString()}</p>
            <p><u>Aéroport</u>: {arrivee.aeroportArrivee}</p>
          </div>
        </div>
  
        <div className="prix">
          <div className="prixDownload">
            <h5>Total:</h5>
            <p>{prix} fr</p>
          </div>
          <a href="#">Download</a>
        </div>
      </div>
    );
  };
  
  export default PartReserve;
  