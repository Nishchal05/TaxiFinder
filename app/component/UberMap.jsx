import React, { useContext, useEffect, useState } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../context/SourceContext';
import { DestinationContext } from '../context/Destinationcontext';

const UberMap = () => {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [map, setMap] = useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState(null); 

  const containerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '27px',
  };

  // Default center
  const [center, setCenter] = useState({
    lat: 31.620132,
    lng: 74.876091,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY, // Add your Google Maps API key here
    libraries: ['places'],
  });

  useEffect(() => {
    if (map && source?.lat && source?.lng) {
      const newCenter = {
        lat: Number(source.lat),
        lng: Number(source.lng),
      };
      setCenter(newCenter);
      map.panTo(newCenter); 
    }
    if (source?.lat && destination?.lat) {
      directionRoute(); // Calculate route when both source and destination are available
    }
  }, [source, destination, map]);

  const onLoad = React.useCallback((map) => {
    setMap(map);
    if (source?.lat && source?.lng) {
      map.panTo({ lat: source.lat, lng: source.lng });
    }
  }, [source]);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const directionRoute = () => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result); // Set the directions result
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // Show loading state while the API is loading
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Source Marker */}
      {source?.lat && source?.lng && (
        <MarkerF position={{ lat: source.lat, lng: source.lng }}>
          <OverlayView
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{source.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      )}

      {/* Destination Marker */}
      {destination?.lat && destination?.lng && (
        <MarkerF position={{ lat: destination.lat, lng: destination.lng }}>
          <OverlayView
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{destination.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      )}

      {/* Render Directions if available */}
      {directionRoutePoints && (
        <DirectionsRenderer directions={directionRoutePoints} />
      )}
    </GoogleMap>
  );
};

export default UberMap;
