import React from "react";
import Reserve from "./reserve";
import { Link } from 'react-router-dom'

const VolsInfos = ({
  compagnie,
  departLieu,
  departPays,
  departHeure,
  arriveLieu,
  arrivePays,
  arriveHeure,
  id,
  placesDisponibles,
  
}) => {
  return (
    <Link to={`/AfficheDetaiils/${id}`} >
    <div className="row flex-column flex-md-row mb-4 border lashadow p-1">
      <div className="col-12 col-md-10 row align-items-center justify-content-around gap-2 border-end border-5 m-0 p-0 p-md-0">
        <div className="col-12">
          <p
            style={{
              position: "relative",
              // right: "60px",
            }}
            className="mb-3 mb-md-0 text-primary border-primary fw-bolder m-auto text1"
          >
            {compagnie}
          </p>
        </div>
        <div className="col-4 col-md-2 text-center text-primary p-0">
          <p className="primary bg-primary text-light rounded">Depart</p>
          <p className="text">
            {departLieu},{departPays}
          </p>
          <p className="text">{departHeure}</p>
        </div>
        <div className="col-1 border hr"></div>
        <div className="col-4 col-md-2 text-center text-primary">
          <p className="primary bg-primary text-light rounded">Arrivée</p>
          <p className="text">
            {arriveLieu},{arrivePays}
          </p>
          <p className="text">{arriveHeure}</p>
        </div>
      </div>
      <Reserve places={placesDisponibles} />
    </div>
    </Link>
  );
};

export default VolsInfos;
