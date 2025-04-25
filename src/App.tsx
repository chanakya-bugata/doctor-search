import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import DoctorCard from './components/DoctorCard';
import './App.css';
import axios from 'axios';

interface Specialty {
  name: string;
}

interface Address {
  locality: string;
  city: string;
  address_line1: string;
  location: string;
  logo_url: string;
}

interface Clinic {
  name: string;
  address: Address;
}

interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: Specialty[];
  fees: string;
  experience: string;
  languages: string[];
  clinic: Clinic;
  video_consult: boolean;
  in_clinic: boolean;
}

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'experience' | 'fees' | ''>('');
  const [inClinicOnly, setInClinicOnly] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [specialties, setSpecialties] = useState<string[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<Doctor[]>(API_URL);
        setDoctors(response.data);
        
        // Extract unique specialties
        const uniqueSpecialties = Array.from(
          new Set(
            response.data.flatMap(doctor => 
              doctor.specialities.map(specialty => specialty.name)
            )
          )
        );
        setSpecialties(uniqueSpecialties);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialities.some(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesSpecialties = 
      selectedSpecialties.length === 0 || 
      doctor.specialities.some(s => selectedSpecialties.includes(s.name));
    const matchesClinicFilter = !inClinicOnly || doctor.in_clinic;
    
    return matchesSearch && matchesSpecialties && matchesClinicFilter;
  }).sort((a, b) => {
    if (sortBy === 'experience') {
      const getYears = (exp: string) => parseInt(exp.split(' ')[0]);
      return getYears(b.experience) - getYears(a.experience);
    }
    if (sortBy === 'fees') {
      const getFees = (fees: string) => parseInt(fees.replace('₹', '').trim());
      return getFees(a.fees) - getFees(b.fees);
    }
    return 0;
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedSpecialties([]);
    setSortBy('');
    setInClinicOnly(false);
  };

  if (loading) {
    return (
      <div className="app">
        <header className="header">
          <h1>Doctor Search</h1>
        </header>
        <div className="loading">
          <div className="spinner" />
          <p>Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Doctor Search</h1>
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Search doctors by name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <main className="main-content">
        <aside className="filter-panel">
          <div className="filter-content">
            <h3>Consultation Mode</h3>
            <div className="toggle-group">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={inClinicOnly}
                  onChange={(e) => setInClinicOnly(e.target.checked)}
                />
                <span className="slider"></span>
                <span>In Clinic Only</span>
              </label>
            </div>

            <h3>Specialties</h3>
            <div className="checkbox-group">
              {specialties.map(specialty => (
                <label key={specialty}>
                  <input
                    type="checkbox"
                    checked={selectedSpecialties.includes(specialty)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSpecialties([...selectedSpecialties, specialty]);
                      } else {
                        setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
                      }
                    }}
                  />
                  <span>{specialty}</span>
                </label>
              ))}
            </div>

            <h3>Sort By</h3>
            <div className="sort-filter">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'experience' | 'fees' | '')}
              >
                <option value="">None</option>
                <option value="experience">Experience</option>
                <option value="fees">Consultation Fee</option>
              </select>
            </div>

            <button className="clear-filters" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        </aside>

        <section className="doctor-list">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
          {filteredDoctors.length === 0 && (
            <div className="no-results">
              No doctors found matching your criteria
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;