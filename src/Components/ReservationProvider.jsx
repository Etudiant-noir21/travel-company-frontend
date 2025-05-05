/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservation, setReservation] = useState(null);

  return (
    <ReservationContext.Provider value={{ reservation, setReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => useContext(ReservationContext);
