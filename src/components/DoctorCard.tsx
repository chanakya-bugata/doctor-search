import React, { useState } from 'react';
import { Building2, Clock, Stethoscope, IndianRupee, MapPin, Video, User } from 'lucide-react';

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

interface DoctorCardProps {
  doctor: {
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
  };
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="doctor-card">
      <div className={`doctor-image-container ${!imageLoaded ? 'loading' : ''}`}>
        {imageError ? (
          <div className="fallback-image">
            <User size={64} color="var(--text-light)" />
          </div>
        ) : (
          <img
            src={doctor.photo}
            alt={`Dr. ${doctor.name}`}
            className="doctor-image"
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
      </div>
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <div className="consultation-badges">
          {doctor.in_clinic && (
            <div className="consultation-badge">
              <Building2 size={16} />
              <span>In Clinic</span>
            </div>
          )}
          {doctor.video_consult && (
            <div className="consultation-badge video">
              <Video size={16} />
              <span>Video Consult</span>
            </div>
          )}
        </div>
        <p>
          <span className="info-label">
            <Stethoscope size={16} />
            Specialty
          </span>
          <span>{doctor.specialities.map(s => s.name).join(', ')}</span>
        </p>
        <p>
          <span className="info-label">
            <Clock size={16} />
            Experience
          </span>
          <span>{doctor.experience}</span>
        </p>
        <p>
          <span className="info-label">
            <IndianRupee size={16} />
            Consultation Fee
          </span>
          <span>{doctor.fees}</span>
        </p>
        <p>
          <span className="info-label">
            <MapPin size={16} />
            Location
          </span>
          <span>{doctor.clinic.address.locality}, {doctor.clinic.address.city}</span>
        </p>
        {doctor.doctor_introduction && (
          <p className="doctor-intro">{doctor.doctor_introduction}</p>
        )}
        {doctor.languages.length > 0 && (
          <p className="languages">
            <small>Languages: {doctor.languages.join(', ')}</small>
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;