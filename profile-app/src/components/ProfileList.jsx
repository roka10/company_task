import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfileList.css';

function ProfileList({ profiles, onSelectProfile }) {
  if (profiles.length === 0) {
    return <div className="no-profiles">No profiles found.</div>;
  }

  return (
    <div className="profile-list">
      <h2>User Profiles</h2>
      <ul>
        {profiles.map(profile => (
          <li key={profile.id} className="profile-item">
            <div className="profile-card">
              <img 
                src={profile.photo} 
                alt={`${profile.name}`} 
                className="profile-photo"
              />
              <div className="profile-info">
                <h3>{profile.name}</h3>
                <p className="profile-description">{profile.description}</p>
                <div className="profile-actions">
                  <button 
                    className="location-button"
                    onClick={() => onSelectProfile(profile)}
                  >
                    Show Location
                  </button>
                  <Link to={`/profile/${profile.id}`} className="details-link">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProfileList;