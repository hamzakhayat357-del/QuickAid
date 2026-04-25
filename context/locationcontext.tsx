import React, { createContext, ReactNode, useContext, useState } from "react";

type CountryContextType = {
  country: string | null;
  setCountry: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [country, setCountry] = useState<string | null>(null);

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error("useCountry must be used inside CountryProvider");
  }

  return context;
};
