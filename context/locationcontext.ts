import React, { createContext, useState } from "react";

export const CountryContext = createContext<any>(null);

export const CountryProvider = ({ children }: any) => {
  const [country, setCountry] = useState("US");

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
};