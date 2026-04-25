import { registerRootComponent } from "expo";
import React, { useEffect, useState } from "react";
import { CountryProvider } from "./context/locationcontext";
import LogoPage from "./page/logopage";
import MainPage from "./page/mainPage";

function App() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CountryProvider>
      {showLogo ? <LogoPage /> : <MainPage />}
    </CountryProvider>
  );
}
export default registerRootComponent(App);
