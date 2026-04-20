import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {CountryProvider} from "./context/locationcontext.ts";
import {MainPage} from "./page/mainPage.js";


export default function App() {
  return (
    <CountryProvider>
      <MainPage/>
    </CountryProvider>
);
}
