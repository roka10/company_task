import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProfileList from './components/ProfileList';
import MapView from './components/MapView';
import ProfileDetails from './components/ProfileDetail';
import AdminPanel from './components/AdminPanel';
import SearchFilter from './components/SearchFilter';
import './App.css';

// Sample data for initial state
const initialProfiles = [
  {
    id: 1,
    name: 'Jane Smith',
    photo: './images/pic1.jpg',
    description: 'Full-stack developer with 5 years of experience',
    address: '350 5th Ave, New York, NY 10118',
    coordinates: { lat: 40.748817, lng: -73.985428 },
    contact: {
      email: 'jane.smith@example.com',
      phone: '(212) 555-1234'
    },
    interests: ['Hiking', 'Photography', 'Cooking']
  },
  {
    id: 2,
    name: 'John Davis',
    photo: '/api/placeholder/150/150',
    description: 'UX Designer focused on creating intuitive experiences',
    address: '1600 Amphitheatre Parkway, Mountain View, CA',
    coordinates: { lat: 37.422, lng: -122.084 },
    contact: {
      email: 'john.davis@example.com',
      phone: '(650) 555-4321'
    },
    interests: ['Cycling', 'Drawing', 'Travel']
  },
  {
    id: 3,
    name: 'Maria Garcia',
    photo: '/api/placeholder/150/150',
    description: 'Data scientist specializing in machine learning',
    address: '233 S Wacker Dr, Chicago, IL 60606',
    coordinates: { lat: 41.8789, lng: -87.6359 },
    contact: {
      email: 'maria.garcia@example.com',
      phone: '(312) 555-6789'
    },
    interests: ['Chess', 'Running', 'Reading']
  }
];

function App() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [filteredProfiles, setFilteredProfiles] = useState(initialProfiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProfileSelection = (profile) => {
    setSelectedProfile(profile);
  };

  const handleSearchFilter = (searchTerm, filterLocation) => {
    setIsLoading(true);
    
    try {
      const filtered = profiles.filter(profile => {
        const nameMatch = profile.name.toLowerCase().includes(searchTerm.toLowerCase());
        const locationMatch = !filterLocation || profile.address.toLowerCase().includes(filterLocation.toLowerCase());
        return nameMatch && locationMatch;
      });
      
      setFilteredProfiles(filtered);
      setError(null);
    } catch (err) {
      setError('Error filtering profiles. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProfile = (newProfile) => {
    const updatedProfiles = [...profiles, { ...newProfile, id: profiles.length + 1 }];
    setProfiles(updatedProfiles);
    setFilteredProfiles(updatedProfiles);
  };

  const handleEditProfile = (updatedProfile) => {
    const updatedProfiles = profiles.map(profile => 
      profile.id === updatedProfile.id ? updatedProfile : profile
    );
    setProfiles(updatedProfiles);
    setFilteredProfiles(updatedProfiles);
    
    if (selectedProfile && selectedProfile.id === updatedProfile.id) {
      setSelectedProfile(updatedProfile);
    }
  };

  const handleDeleteProfile = (id) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== id);
    setProfiles(updatedProfiles);
    setFilteredProfiles(updatedProfiles);
    
    if (selectedProfile && selectedProfile.id === id) {
      setSelectedProfile(null);
    }
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Profile Map App</h1>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/admin" className="nav-link">Admin Panel</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={
            <main className="main-content">
              <div className="left-panel">
                <SearchFilter onSearch={handleSearchFilter} />
                
                {isLoading && <div className="loading">Loading profiles...</div>}
                {error && <div className="error-message">{error}</div>}
                
                <ProfileList 
                  profiles={filteredProfiles} 
                  onSelectProfile={handleProfileSelection}
                />
              </div>
              
              <div className="right-panel">
                <MapView 
                  profiles={filteredProfiles}
                  selectedProfile={selectedProfile}
                />
              </div>
            </main>
          } />
          
          <Route path="/profile/:id" element={
            <ProfileDetails 
              profiles={profiles}
            />
          } />
          
          <Route path="/admin" element={
            <AdminPanel 
              profiles={profiles}
              onAdd={handleAddProfile}
              onEdit={handleEditProfile}
              onDelete={handleDeleteProfile}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;