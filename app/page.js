"use client"
import { useState } from "react";
import Header from "./component/header";
import Search from "./component/Search";
import { SourceContext } from "./context/SourceContext";
import { DestinationContext } from "./context/Destinationcontext";
import UberMap from "./component/UberMap";
import { LoadScript } from "@react-google-maps/api";

export default function Home() {
  const [source,setsource]=useState([]);
  const [destination,setdestination]=useState([]);
  return (
    <SourceContext.Provider value={{source,setsource}}>
    <DestinationContext.Provider value={{destination,setdestination}}><div>
    <Header/>
    <LoadScript
    libraries={['places']}
     googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
    <div className=" p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className=" col-span-1">
        <Search/>
      </div>
      <div className=" shadow-lg rounded-lg col-span-2">
        <UberMap/>
      </div>
    </div>
    </LoadScript>
    </div></DestinationContext.Provider></SourceContext.Provider>
  );
}
