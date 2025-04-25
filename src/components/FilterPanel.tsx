import React, { useState } from 'react';
import { FilterPanelProps } from '../types';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  specialties,
}) => {
  const [isOpen, setIsOpen] = useState(false); // For mobile collapse
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleConsultationModeChange = (mode: 'Video' | 'In Clinic') => {
    onFilterChange({
      consultationMode: filters.consultationMode === mode ? '' : mode,
    });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter((s: string) => s !== specialty)
      : [...filters.specialties, specialty];
    onFilterChange({ specialties: newSpecialties });
  };

  const handleSortChange = (sortBy: 'fees' | 'experience') => {
    onFilterChange({ sortBy: filters.sortBy === sortBy ? '' : sortBy });
  };

  const clearFilters = () => {
    onFilterChange({
      consultationMode: '',
      specialties: [],
      sortBy: '',
    });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    document.body.style.overflow = !isFilterOpen ? 'hidden' : '';
  };

  return (
    <>
      <div className={`filter-panel ${isFilterOpen ? 'active' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Filters</h2>
          <button
            onClick={toggleFilter}
            className="close-filter-button"
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>
        </div>
        <div className="filter-content">
          <div className="consultation-mode-filter">
            <h3>Consultation Mode</h3>
            <div className="toggle-group">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={filters.consultationMode === 'Video'}
                  onChange={() => handleConsultationModeChange('Video')}
                  data-testid="consultation-mode-video"
                />
                <span className="slider">Video Consult</span>
              </label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={filters.consultationMode === 'In Clinic'}
                  onChange={() => handleConsultationModeChange('In Clinic')}
                  data-testid="consultation-mode-clinic"
                />
                <span className="slider">In Clinic</span>
              </label>
            </div>
          </div>

          <div className="specialties-filter">
            <h3>Specialties</h3>
            <div className="checkbox-group">
              {specialties.map((specialty: string) => (
                <label key={specialty} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.specialties.includes(specialty)}
                    onChange={() => handleSpecialtyChange(specialty)}
                    data-testid={`filter-specialty-${specialty}`}
                  />
                  <span>{specialty}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="sort-filter">
            <h3>Sort By</h3>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as 'fees' | 'experience')}
              data-testid="sort-select"
            >
              <option value="">None</option>
              <option value="fees">Fees (Low to High)</option>
              <option value="experience">Experience (High to Low)</option>
            </select>
          </div>

          <button className="clear-filters" onClick={clearFilters} data-testid="clear-filters">
            Clear Filters
          </button>
        </div>
      </div>
      <button className="mobile-filter-button" onClick={toggleFilter}>
        <Filter size={24} />
      </button>
    </>
  );
};

export default FilterPanel;