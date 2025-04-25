import React, { useState, useRef, useEffect } from 'react';
import { AutocompleteProps, Doctor } from '../types';
import { Search } from 'lucide-react'; // Using lucide-react for icons

const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  onChange,
  suggestions,
  onSelect,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        setIsOpen(true);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          onSelect(suggestions[selectedIndex]);
          setIsOpen(false);
          setSelectedIndex(-1);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setSelectedIndex(-1);
    setIsOpen(true);
  };

  const handleSuggestionClick = (doctor: Doctor) => {
    onSelect(doctor);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  return (
    <div className="autocomplete-wrapper" ref={wrapperRef}>
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search doctors..."
          className="search-input"
          data-testid="autocomplete-input"
        />
      </div>
      {isOpen && suggestions.length > 0 && (
        <div className="suggestions-dropdown" data-testid="suggestions-dropdown">
          {suggestions.slice(0, 5).map((doctor, index) => (
            <div
              key={doctor.id}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSuggestionClick(doctor)}
              onMouseEnter={() => setSelectedIndex(index)}
              data-testid={`suggestion-${doctor.id}`}
            >
              <img
                src={doctor.imageUrl || 'https://via.placeholder.com/40'}
                alt={doctor.name}
                className="suggestion-image"
              />
              <div>
                <div className="suggestion-name">{doctor.name}</div>
                <div className="suggestion-specialty">{doctor.specialty}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isOpen && suggestions.length === 0 && value && (
        <div className="no-suggestions" data-testid="no-suggestions">
          No matches found
        </div>
      )}
    </div>
  );
};

export default Autocomplete;