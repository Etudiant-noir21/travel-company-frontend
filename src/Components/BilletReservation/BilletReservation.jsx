import { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useLocation } from 'react-router-dom';
// import './BilletReservation.css';

export const BilletReservation = () => {
  const location = useLocation();
  const billetRef = useRef(null);

  // Vérification que la référence est bien assignée
  useEffect(() => {
    console.log('Référence actuelle:', billetRef.current);
  }, [billetRef]);

  const handlePrint = useReactToPrint({
    content: () => billetRef.current,
    pageStyle: `
      @page { size: A4; margin: 10mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none !important; }
      }
    `,
    documentTitle: `Billet_${location.state?.reservationData?.numeroVol || 'VOL'}`,
    onBeforeGetContent: () => console.log('Début de la génération'),
    onBeforePrint: () => console.log('Impression démarrée'),
    onAfterPrint: () => console.log('Impression terminée'),
    onPrintError: (error) => console.error('Erreur:', error)
  });

  console.log("handle print",handlePrint);
  

  if (!location.state?.reservationData) {
    return (
      <div className="content_billets">
        <div className="error-message">
          <h2>Aucune donnée de réservation trouvée</h2>
          <p>Veuillez effectuer une réservation avant d'accéder à cette page.</p>
        </div>
      </div>
    );
  }

  const { nom, prenom, villeDepart, villeArrivee, dateDepart, dateArrivee, 
          heureDepart, heureArrivee, compagnie, numeroVol, prix, duree } = location.state.reservationData;

  return (
    <div className="content_billets">
      <h1>Ma Réservation</h1>

      {/* Contenu à imprimer - Doit être une div directe avec la ref */}
      <div className="pdf-container">
        <div ref={billetRef} className="pdf_content">
          <div className="header">
            <h2>Billet d'Avion</h2>
            <p className="reference">N° Vol: {numeroVol}</p>
          </div>
          
          <div className="passenger-info">
            <h3>Passager</h3>
            <p><strong>Nom:</strong> {nom} {prenom}</p>
          </div>

          <div className="flight-details">
            <div className="departure">
              <h4>Départ</h4>
              <p><strong>De:</strong> {villeDepart}</p>
              <p><strong>Date:</strong> {new Date(dateDepart).toLocaleDateString('fr-FR')}</p>
              <p><strong>Heure:</strong> {heureDepart?.substring(11, 16)}</p>
            </div>

            <div className="arrival">
              <h4>Arrivée</h4>
              <p><strong>À:</strong> {villeArrivee}</p>
              <p><strong>Date:</strong> {new Date(dateArrivee).toLocaleDateString('fr-FR')}</p>
              <p><strong>Heure:</strong> {heureArrivee?.substring(11, 16)}</p>
            </div>
          </div>

          <div className="flight-info">
            <p><strong>Compagnie:</strong> {compagnie}</p>
            <p><strong>Durée:</strong> {duree}</p>
            <p className="price"><strong>Prix:</strong> {prix} €</p>
          </div>

          <div className="footer">
            <p>Présentez ce billet à l'enregistrement</p>
          </div>
        </div>
      </div>

      <button 
        onClick={handlePrint} 
        className="download-btn no-print"
      >
        Télécharger le PDF
      </button>
    </div>
  );
};