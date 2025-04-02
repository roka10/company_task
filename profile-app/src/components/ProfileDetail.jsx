import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ProfileDetails.css';

function ProfileDetails({ profiles }) {
  const { id } = useParams();
  const profileId = parseInt(id, 10);
  
  const profile = profiles.find(p => p.id === profileId);

  if (!profile) {
    return (
      <div className="profile-details error-container">
        <h2>Profile Not Found</h2>
        <p>Sorry, the profile you're looking for doesn't exist.</p>
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="profile-details">
      <div className="profile-header">
        <Link to="/" className="back-button">← Back</Link>
        <h2>{profile.name}</h2>
      </div>
      
      <div className="profile-content">
        <div className="profile-main-info">
          {profile.photo ? (
            <img 
              src={profile.photo} 
              alt={profile.name} 
              className="profile-photo-large"
            />
          ) : (
            <div className="profile-photo-placeholder">No Image Available</div>
          )}
          
          <div className="profile-text-info">
            <h3>About</h3>
            <p>{profile.description || 'No description provided.'}</p>
            
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> {profile.contact?.email || 'N/A'}</p>
            <p><strong>Phone:</strong> {profile.contact?.phone || 'N/A'}</p>
            
            <h3>Address</h3>
            <p>{profile.address || 'No address provided.'}</p>
          </div>
        </div>
        
        <div className="profile-interests">
          <h3>Interests</h3>
          <ul className="interests-list">
            {profile.interests && profile.interests.length > 0 ? (
              profile.interests.map((interest, index) => (
                <li key={index} className="interest-tag">{interest}</li>
              ))
            ) : (
              <p>No interests listed.</p>
            )}
          </ul>
        </div>
        
        <div className="profile-location">
  <h3>Location</h3>
  {profile.coordinates?.lat && profile.coordinates?.lng ? (
    <iframe
      title="map"
      width="100%"
      height="300"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDBnsyHKhW6vf11uG34L_VkutpgIXut184&q=${profile.coordinates.lat},${profile.coordinates.lng}`}
    ></iframe>
  ) : (
    <p>No location data available.</p>
  )}
</div>
 </div>
    </div>
  );
}

export default ProfileDetails;