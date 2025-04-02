import React, { useState } from 'react';
import '../styles/SearchFilter.css';

function SearchFilter({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, locationFilter);
  };
  
  const handleClear = () => {
    setSearchTerm('');
    setLocationFilter('');
    onSearch('', '');
  };

  return (
    <div className="search-filter">
      <h2>Search & Filter</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="search">Search by Name:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter name..."
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Filter by Location:</label>
          <input
            type="text"
            id="location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            placeholder="Enter location..."
          />
        </div>
        
        <div className="search-actions">
          <button type="submit" className="search-button">
            Search
          </button>
          <button 
            type="button" 
            className="clear-button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchFilter;