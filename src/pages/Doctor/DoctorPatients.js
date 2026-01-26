import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaNotesMedical,
  FaPlus,
  FaHistory,
} from 'react-icons/fa';
import DoctorLayout from '../../components/Doctor/DoctorLayout';
import toast from 'react-hot-toast';
import './DoctorPages.css';

const DoctorPatients = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [experienceType, setExperienceType] = useState('online');

  const patients = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@email.com',
      phone: '+1 234-567-8900',
      lastVisit: '2026-01-15',
      condition: 'Hypertension',
      notes: [
        { date: '2026-01-15', text: 'Patient showing improvement. Continue current medication.', type: 'online' },
        { date: '2026-01-10', text: 'Initial consultation. Prescribed medication.', type: 'in-person' },
      ],
    },
    {
      id: 2,
      name: 'Emma Wilson',
      email: 'emma@email.com',
      phone: '+1 234-567-8901',
      lastVisit: '2026-01-20',
      condition: 'Diabetes Type 2',
      notes: [
        { date: '2026-01-20', text: 'Blood sugar levels stable. Diet plan working well.', type: 'online' },
      ],
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael@email.com',
      phone: '+1 234-567-8902',
      lastVisit: '2026-01-18',
      condition: 'Asthma',
      notes: [
        { date: '2026-01-18', text: 'Experiencing seasonal symptoms. Adjusted inhaler dosage.', type: 'in-person' },
      ],
    },
  ];

  const handleAddNote = () => {
    if (!noteText.trim()) {
      toast.error('Please enter a note');
      return;
    }
    toast.success('Patient note added successfully!');
    setNoteText('');
  };

  return (
    <DoctorLayout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Patient Records</h1>
            <p className="page-subtitle">Manage patient information and add clinical notes</p>
          </div>
        </div>

        <div className="patients-layout">
          <div className="patients-list-section">
            <h2 className="section-title">My Patients</h2>
            <div className="patients-list">
              {patients.map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`patient-list-item ${selectedPatient?.id === patient.id ? 'active' : ''}`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="patient-list-avatar">
                    <FaUser />
                  </div>
                  <div className="patient-list-info">
                    <h4>{patient.name}</h4>
                    <p>{patient.condition}</p>
                    <span className="last-visit">Last visit: {patient.lastVisit}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="patient-details-section">
            {selectedPatient ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="patient-details"
              >
                <div className="patient-header-card">
                  <div className="patient-avatar-large">
                    <FaUser />
                  </div>
                  <div className="patient-header-info">
                    <h2>{selectedPatient.name}</h2>
                    <p className="patient-condition">{selectedPatient.condition}</p>
                    <div className="patient-contact">
                      <div className="contact-item">
                        <FaEnvelope />
                        <span>{selectedPatient.email}</span>
                      </div>
                      <div className="contact-item">
                        <FaPhone />
                        <span>{selectedPatient.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="add-note-section">
                  <h3 className="subsection-title">
                    <FaPlus /> Add New Note/Experience
                  </h3>
                  <div className="experience-type-selector">
                    <label>
                      <input
                        type="radio"
                        value="online"
                        checked={experienceType === 'online'}
                        onChange={(e) => setExperienceType(e.target.value)}
                      />
                      <span>Website Consultation</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="in-person"
                        checked={experienceType === 'in-person'}
                        onChange={(e) => setExperienceType(e.target.value)}
                      />
                      <span>In-Person Visit</span>
                    </label>
                  </div>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Enter clinical notes, observations, treatment updates..."
                    rows="4"
                    className="note-textarea"
                  />
                  <button className="btn btn-primary" onClick={handleAddNote}>
                    <FaPlus /> Add Note
                  </button>
                </div>

                <div className="notes-history-section">
                  <h3 className="subsection-title">
                    <FaHistory /> Clinical Notes History
                  </h3>
                  <div className="notes-timeline">
                    {selectedPatient.notes.map((note, index) => (
                      <div key={index} className="note-item">
                        <div className="note-header">
                          <span className="note-date">{note.date}</span>
                          <span className={`note-type ${note.type}`}>
                            {note.type === 'online' ? 'Website' : 'In-Person'}
                          </span>
                        </div>
                        <p className="note-text">{note.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="no-selection">
                <FaNotesMedical className="no-selection-icon" />
                <p>Select a patient to view details and add notes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorPatients;
