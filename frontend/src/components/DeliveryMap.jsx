import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS

// Set your Mapbox access token here
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const DeliveryMap = ({ deliveryLocation }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Choose a map style
      center: deliveryLocation, // Initial map center [lng, lat]
      zoom: 12,
    });

    // Add navigation control (zoom in/out)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add a marker for the delivery location
    new mapboxgl.Marker()
      .setLngLat(deliveryLocation)
      .addTo(map);

    // Clean up on unmount
    return () => map.remove();
  }, [deliveryLocation]); // Rerender the map if deliveryLocation changes

  return (
    <div className="h-96 w-full" ref={mapContainerRef} />
  );
};

export default DeliveryMap;
