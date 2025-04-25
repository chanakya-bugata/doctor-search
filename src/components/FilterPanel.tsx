import React, { useState } from 'react';
import { FilterPanelProps } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  specialties,
}) => {
  const [isOpen, setIsOpen] = useState(false); // For mobile collapse

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

  return (
    <div className="filter-panel">
      <div className="filter-header-mobile" onClick={() => setIsOpen(!isOpen)}>
        <h3>Filters</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <div className={`filter-content ${isOpen ? 'open' : ''}`}>
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
  );
};

export default FilterPanel;