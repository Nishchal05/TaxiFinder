"use client";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "../../components/ui/button";
import RoomIcon from "@mui/icons-material/Room";
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
import dynamic from "next/dynamic";
import { SourceContext } from "../context/SourceContext";
import { DestinationContext } from "../context/Destinationcontext";
import RenderRides from "./RenderRides";

const GooglePlacesAutocomplete = dynamic(() => import('react-google-places-autocomplete'), { ssr: false });

const Search = () => {
  const [data, setData] = useState({
    pickupValue: null,
    dropValue: null,
  });
  const [distance, setdistance] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const { source, setsource } = useContext(SourceContext);
  const { destination, setdestination } = useContext(DestinationContext);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (value, type) => {
    setData((prevData) => ({
      ...prevData,
      [type]: value,
    }));
  };

  const getLongitudeAndLatitude = (place, type) => {
    const placeId = place?.value?.place_id;
    if (!placeId) return;

    const service = new google.maps.places.PlacesService(document.createElement("div"));
    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place.geometry && place.geometry.location) {
        const locationData = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.formatted_address,
          label: place.name,
        };

        if (type === "pickupValue") {
          setsource(locationData);
        } else {
          setdestination(locationData);
        }
      }
    });
  };

  // Effect to compute the distance when both source and destination are set
  const distanceCal=()=>{
    if (source && destination && google?.maps?.geometry) {
      const dist = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(source.lat, source.lng),
        new google.maps.LatLng(destination.lat, destination.lng)
      );
      const distanceInMile=dist * 0.000621374;
      setdistance(distanceInMile.toFixed(2)); 
    }
  }
    

  return (
    <div className="flex flex-col border p-5 gap-4 rounded-lg shadow-lg">
      <h2 className="text-black font-bold text-center text-3xl">Get Ride</h2>

      <div className="flex items-center bg-slate-300 rounded-lg">
        <RoomIcon />
        {isMounted && (
          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            selectProps={{
           
              onChange: (place) => getLongitudeAndLatitude(place,"pickupValue"),
              placeholder: "Pickup Location",
              isClearable: true,
              className: "w-full",
              components: {
                DropdownIndicator: false,
              },
            }}
          />
        )}
      </div>

      <div className="flex items-center bg-slate-300 rounded-lg">
        <GpsNotFixedIcon />
        {isMounted && (
          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            selectProps={{
              onChange: (place) => getLongitudeAndLatitude(place,"dropValue"),
              placeholder: "Drop Location",
              isClearable: true,
              className: "w-full",
              components: {
                DropdownIndicator: false,
              },
            }}
          />
        )}
      </div>

      <Button
        disabled={!source || !destination}
        onClick={
          distanceCal
        }
      >
        Search
      </Button>
      {distance ? <div>
      <h2 className=" font-bold text-lg">Recommeded:-</h2>
        <RenderRides distance={distance}/> 
      </div>: null}
    </div>
  );
};

export default Search;
