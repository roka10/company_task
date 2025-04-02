import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../styles/MapView.css';

class MapView extends Component {
  render() {
    const { profiles, selectedProfile, google } = this.props;

    // Default center coordinates
    const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // India

    return (
      <div className="map-container">
        <h2>Location Map</h2>

        <Map
          google={google}
          zoom={selectedProfile ? 12 : 5}
          initialCenter={defaultCenter}
          center={selectedProfile ? selectedProfile.coordinates : defaultCenter}
          style={{ width: '100%', height: '400px', position: 'relative' }}
        >
          {/* Render markers for each profile */}
          {profiles.map(profile => (
            <Marker
              key={profile.id}
              position={profile.coordinates}
              title={profile.name}
            />
          ))}

          {/* Highlight selected profile */}
          {selectedProfile && (
            <Marker
              position={selectedProfile.coordinates}
              title={selectedProfile.name}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              }}
            />
          )}
        </Map>

        <div className="map-info">
          {selectedProfile ? (
            <>
              <p>Showing location for: <strong>{selectedProfile.name}</strong></p>
              <p>Address: {selectedProfile.address}</p>
            </>
          ) : (
            <p>Select a profile to see its location on the map</p>
          )}
          <p>Total profiles shown: {profiles.length}</p>
        </div>
      </div>
    );
  }
}

// Wrap component with GoogleApiWrapper to provide Google Maps API
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDBnsyHKhW6vf11uG34L_VkutpgIXut184'  // Replace with your actual API Key
})(MapView);
