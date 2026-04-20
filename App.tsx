import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {CountryProvider} from "./context/locationcontext";
import MainPage from "./page/mainPage";


export default function App() {
  return (
    <CountryProvider>
      
      <MainPage/>
    </CountryProvider>
);
}
