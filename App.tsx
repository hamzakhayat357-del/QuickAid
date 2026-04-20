import { registerRootComponent } from "expo";
import React from "react";
import { CountryProvider } from "./context/locationcontext";
import MainPage from "./page/mainPage";

function App() {
  return (
    <CountryProvider>
      <MainPage />
    </CountryProvider>
  );
}
export default registerRootComponent(App);
