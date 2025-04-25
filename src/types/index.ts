export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  fees: number;
  consultationMode: 'Video' | 'In Clinic';
  imageUrl?: string;
}

export interface FilterState {
  searchQuery: string;
  consultationMode: 'Video' | 'In Clinic' | '';
  specialties: string[];
  sortBy: 'fees' | 'experience' | '';
}

export interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: Doctor[];
  onSelect: (doctor: Doctor) => void;
}

export interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  specialties: string[];
}

export interface DoctorCardProps {
  doctor: Doctor;
}