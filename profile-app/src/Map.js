import { useEffect, useRef } from 'react';

// Example for Google Maps integration
export const useGoogleMaps = (apiKey, selectedProfile, profiles) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Initialize the map
  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      // In a real implementation, you would load the Google Maps API and create a map
       const script = document.createElement('script');
       script.src = `https://maps.googleapis.com/maps/api/js?key=${'AIzaSyCQVER1yDFwpwM_gRVNs-leHEXqbvsDcAI'}&callback=initMap`;
       script.async = true;
       document.body.appendChild(script);
      
      // For demonstration purposes:
      console.log('Map initialized with API key:','AIzaSyCQVER1yDFwpwM_gRVNs-leHEXqbvsDcAI');
      mapInstanceRef.current = {
        setCenter: (coordinates) => {
          console.log('Map center set to:', coordinates);
        }
      };
    }

    return () => {
      // Cleanup
      if (markersRef.current.length > 0) {
        console.log('Clearing markers');
        markersRef.current = [];
      }
    };
  }, [apiKey]);

  // Add markers for all profiles
  useEffect(() => {
    if (mapInstanceRef.current && profiles.length > 0) {
      // Clear existing markers
      markersRef.current = [];
      
      // Add new markers for each profile
      profiles.forEach(profile => {
        console.log('Adding marker for:', profile.name);
        const marker = {
          id: profile.id,
          position: profile.coordinates,
          title: profile.name
        };
        markersRef.current.push(marker);
      });
    }
  }, [profiles]);

  // Center map on selected profile
  useEffect(() => {
    if (mapInstanceRef.current && selectedProfile) {
      console.log('Centering map on selected profile:', selectedProfile.name);
      mapInstanceRef.current.setCenter(selectedProfile.coordinates);
    }
  }, [selectedProfile]);

  return mapRef;
};