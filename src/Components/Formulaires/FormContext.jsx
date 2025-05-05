import React, { createContext, useState } from "react";

 const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
  });

  const updateFormData = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFormData = () => {
    setFormData({
      prenom: "",
      nom: "",
      email: "",
      password: "",
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData , resetFormData}}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
