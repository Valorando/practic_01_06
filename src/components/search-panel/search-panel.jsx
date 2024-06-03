import React, { useState } from 'react';
import './search-panel.css';

export default function SearchPanel({ onSearchChange = () => {} }) {
  const [term, setTerm] = useState('');

  const onTermChange = (e) => {
    const searchTerm = e.target.value;
    setTerm(searchTerm);
    onSearchChange(searchTerm);
  };

  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="type to search"
      value={term}
      onChange={onTermChange}
    />
  );
}
