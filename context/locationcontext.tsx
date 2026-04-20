import React, { createContext, useState, ReactNode } from "react";

type CountryContextType = {
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
};

export const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [country, setCountry] = useState("US");

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
};