import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/AdminPanel.css';

function AdminPanel({ profiles, onAdd, onEdit, onDelete }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
    address: '',
    coordinates: { lat: 0, lng: 0 },
    contact: {
      email: '',
      phone: ''
    },
    interests: []
  });

  const fetchCoordinates = async (address) => {
    if (!address) return;
  
    const API_KEY = 'AIzaSyDBnsyHKhW6vf11uG34L_VkutpgIXut184';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        setFormData(prevForm => ({
          ...prevForm,
          address,
          coordinates: {
            lat: location.lat,
            lng: location.lng
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'address') {
      setFormData({ ...formData, address: value });
      fetchCoordinates(value);  // Auto-fetch location when address changes
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else if (name === 'interests') {
      setFormData({
        ...formData,
        interests: value.split(',').map(item => item.trim())
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing && currentProfile) {
      onEdit({ ...formData, id: currentProfile.id });
    } else {
      onAdd(formData);
    }
    
    resetForm();
  };

  const startEditing = (profile) => {
    setIsEditing(true);
    setIsAdding(false);
    setCurrentProfile(profile);
    
    setFormData({
      ...profile,
      interests: profile.interests.join(', ')
    });
  };

  const startAdding = () => {
    setIsAdding(true);
    setIsEditing(false);
    setCurrentProfile(null);
    
    setFormData({
      name: '',
      photo: '',
      description: '',
      address: '',
      coordinates: { lat: 0, lng: 0 },
      contact: {
        email: '',
        phone: ''
      },
      interests: []
    });
  };

  const resetForm = () => {
    setIsAdding(false);
    setIsEditing(false);
    setCurrentProfile(null);
  };

  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      onDelete(id);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      
      <div className="admin-controls">
        <button 
          className="add-button"
          onClick={startAdding}
          disabled={isAdding}
        >
          Add New Profile
        </button>
      </div>
      
      {(isAdding || isEditing) && (
        <div className="profile-form-container">
          <h3>{isEditing ? 'Edit Profile' : 'Add New Profile'}</h3>
          
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
            <label htmlFor="lat">Latitude:</label>
              <input
                type="number"
                id="lat"
                name="coordinates.lat"
                value={formData.coordinates.lat}
                onChange={handleInputChange}
                step="any"
                required
              />
            </div>
            <div className="form-group">
            <label htmlFor="lng">Longitude:</label>
              <input
                type="number"
                id="lng"
                name="coordinates.lng"
                value={formData.coordinates.lng}
                onChange={handleInputChange}
                step="any"
                required
              />
            </div>
            
            <div className="form-group" {...getRootProps()}>
              <label>Upload Profile Image:</label>
              <div className="dropzone">
                <input {...getInputProps()} />
                {formData.photo ? <img src={formData.photo} alt="Profile preview" className="preview" /> : <p>Drag & drop an image here, or click to select one</p>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="contact.email"
                value={formData.contact.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="interests">Interests (comma separated):</label>
              <input
                type="text"
                id="interests"
                name="interests"
                value={Array.isArray(formData.interests) ? formData.interests.join(', ') : formData.interests}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-button">
                {isEditing ? 'Update Profile' : 'Create Profile'}
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
