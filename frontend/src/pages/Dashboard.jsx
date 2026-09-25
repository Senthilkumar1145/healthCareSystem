import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <h2>Rural Health Care System</h2>
        <div>
          <span>Welcome, <strong>{user.name}</strong> ({user.role}) 👋</span>
          <button onClick={handleLogout} style={{ marginLeft: '15px', padding: '5px 10px' }}>Logout</button>
        </div>
      </header>

      <main style={{ marginTop: '20px' }}>
        <h3>Modules & Services</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
            <h4>📅 Appointments</h4>
            <p>Search doctors, select slots, and book appointments[cite: 1].</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
            <h4>🎙️ Telemedicine / Audio Call</h4>
            <p>Remote audio-call workflow for doctor-patient consultations[cite: 1].</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
            <h4>📁 Healthcare Records</h4>
            <p>Store and view relevant patient medical records securely[cite: 1].</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
            <h4>⏰ Reminders</h4>
            <p>Medicine schedules and basic notifications[cite: 1].</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
            <h4>🏥 Nearby Centres</h4>
            <p>Locate hospitals, clinics, and pharmacies[cite: 1].</p>
          </div>
        </div>
      </main>
    </div>
  );
}