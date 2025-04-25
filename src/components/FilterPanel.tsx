import React, { useState } from 'react';
import { FilterPanelProps } from '../types';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  specialties,
}) => {
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
      <aside className={`filter-panel ${isFilterOpen ? 'active' : ''}`}>
        <div className="filter-header">
          <h2>Filters</h2>
          <button
            onClick={toggleFilter}
            className="close-filter-button"
            aria-label="Close filters"
          >
            <X size={24} />
          </button>
        </div>

        <div className="filter-content">
          <section className="filter-section">
            <h3>Consultation Mode</h3>
            <div className="toggle-group">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={filters.consultationMode === 'Video'}
                  onChange={() => handleConsultationModeChange('Video')}
                  data-testid="consultation-mode-video"
                />
                <span className="slider"></span>
                <span className="toggle-label">Video Consult</span>
              </label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={filters.consultationMode === 'In Clinic'}
                  onChange={() => handleConsultationModeChange('In Clinic')}
                  data-testid="consultation-mode-clinic"
                />
                <span className="slider"></span>
                <span className="toggle-label">In Clinic</span>
              </label>
            </div>
          </section>

          <section className="filter-section">
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
          </section>

          <section className="filter-section">
            <h3>Sort By</h3>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as 'fees' | 'experience')}
              data-testid="sort-select"
              className="sort-select"
            >
              <option value="">None</option>
              <option value="fees">Fees (Low to High)</option>
              <option value="experience">Experience (High to Low)</option>
            </select>
          </section>

          <button className="clear-filters" onClick={clearFilters} data-testid="clear-filters">
            Clear Filters
          </button>
        </div>
      </aside>
      <button className="mobile-filter-button" onClick={toggleFilter} aria-label="Show filters">
        <Filter size={24} />
      </button>
    </>
  );
};

export default FilterPanel;