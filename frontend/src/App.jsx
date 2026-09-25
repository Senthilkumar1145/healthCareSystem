import React, { useState, useEffect } from 'react';
import API from './services/api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Auth Form States
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Patient');
  const [language, setLanguage] = useState('en');
  const [error, setError] = useState('');

  // Module Data States
  const [activeTab, setActiveTab] = useState('home');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [centres, setCentres] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [records, setRecords] = useState([]);

  // New Appointment / Reminder Input States
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [medName, setMedName] = useState('');
  const [medSchedule, setMedSchedule] = useState('');

  // Check stored user on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { phone, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { name, phone, password, role, language });
      alert('Registration successful! Please login.');
      setIsRegistering(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setActiveTab('home');
  };

  // Fetch functions for tabs
  const fetchDoctors = async () => {
    try {
      const res = await API.get('/doctors');
      setDoctors(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments');
      setAppointments(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchCentres = async () => {
    try {
      const res = await API.get('/centres');
      setCentres(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchReminders = async () => {
    try {
      const res = await API.get('/reminders');
      setReminders(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchRecords = async () => {
    try {
      const res = await API.get('/records');
      setRecords(res.data);
    } catch (err) { console.error(err); }
  };

  // Actions
  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      await API.post('/appointments/book', { doctor_id: selectedDoctor, date_time: appointmentDate });
      alert('Appointment booked successfully[cite: 1]!');
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || 'Error booking appointment');
    }
  };

  const handleAddReminder = async (e) => {
    e.preventDefault();
    try {
      await API.post('/reminders/add', { medicine: medName, schedule: medSchedule });
      alert('Medicine reminder added successfully[cite: 1]!');
      setMedName('');
      setMedSchedule('');
      fetchReminders();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding reminder');
    }
  };

  useEffect(() => {
    if (user) {
      if (activeTab === 'appointments') { fetchDoctors(); fetchAppointments(); }
      if (activeTab === 'centres') fetchCentres();
      if (activeTab === 'reminders') fetchReminders();
      if (activeTab === 'records') fetchRecords();
    }
  }, [activeTab, user]);

  if (!user) {
    return (
      <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto', fontFamily: 'Arial' }}>
        <h2>Rural Health Care System</h2>
        <h3>{isRegistering ? 'Register Account' : 'Login'}</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {isRegistering ? (
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '10px' }}><label>Name:</label><br/><input type="text" value={name} onChange={e => setName(e.target.value)} required style={{width:'100%', padding:'8px'}}/></div>
            <div style={{ marginBottom: '10px' }}><label>Phone:</label><br/><input type="text" value={phone} onChange={e => setPhone(e.target.value)} required style={{width:'100%', padding:'8px'}}/></div>
            <div style={{ marginBottom: '10px' }}><label>Password:</label><br/><input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{width:'100%', padding:'8px'}}/></div>
            <div style={{ marginBottom: '10px' }}><label>Role:</label><br/>
              <select value={role} onChange={e => setRole(e.target.value)} style={{width:'100%', padding:'8px'}}>
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
              </select>
            </div>
            <button type="submit" style={{width:'100%', padding:'10px', background:'#28a745', color:'#fff', border:'none'}}>Register</button>
            <p style={{cursor:'pointer', color:'blue', marginTop:'10px'}} onClick={() => setIsRegistering(false)}>Already have an account? Login</p>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '10px' }}><label>Phone Number:</label><br/><input type="text" value={phone} onChange={e => setPhone(e.target.value)} required style={{width:'100%', padding:'8px'}}/></div>
            <div style={{ marginBottom: '10px' }}><label>Password:</label><br/><input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{width:'100%', padding:'8px'}}/></div>
            <button type="submit" style={{width:'100%', padding:'10px', background:'#007bff', color:'#fff', border:'none'}}>Login</button>
            <p style={{cursor:'pointer', color:'blue', marginTop:'10px'}} onClick={() => setIsRegistering(true)}>Don't have an account? Register</p>
          </form>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: 'auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
        <h2>Rural Health Care Dashboard</h2>
        <div>
          <span>Welcome, <strong>{user.name}</strong> ({user.role})</span>
          <button onClick={handleLogout} style={{ marginLeft: '15px', padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none' }}>Logout</button>
        </div>
      </header>

      <nav style={{ display: 'flex', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('home')} style={{ padding: '8px 12px' }}>Home</button>
        <button onClick={() => setActiveTab('appointments')} style={{ padding: '8px 12px' }}>Appointments</button>
        <button onClick={() => setActiveTab('telemedicine')} style={{ padding: '8px 12px' }}>Telemedicine</button>
        <button onClick={() => setActiveTab('records')} style={{ padding: '8px 12px' }}>Records</button>
        <button onClick={() => setActiveTab('reminders')} style={{ padding: '8px 12px' }}>Reminders</button>
        <button onClick={() => setActiveTab('centres')} style={{ padding: '8px 12px' }}>Nearby Centres</button>
      </nav>

      <main style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        {activeTab === 'home' && (
          <div>
            <h3>Overview</h3>
            <p>Select a module above to manage appointments[cite: 1], view medical records[cite: 1], set medicine reminders[cite: 1], or locate nearby healthcare centres[cite: 1].</p>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <h3>Book Appointment</h3>
            {user.role === 'Patient' && (
              <form onSubmit={handleBookAppointment} style={{ background: '#fff', padding: '15px', marginBottom: '20px', border: '1px solid #ccc' }}>
                <div style={{ marginBottom: '10px' }}>
                  <label>Select Doctor:</label><br/>
                  <select value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)} required style={{width:'100%', padding:'6px'}}>
                    <option value="">-- Choose Doctor --</option>
                    {doctors.map(doc => (
                      <option key={doc._id} value={doc._id}>{doc.name} ({doc.specialization})</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>Date & Time:</label><br/>
                  <input type="datetime-local" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} required style={{width:'100%', padding:'6px'}}/>
                </div>
                <button type="submit" style={{padding:'8px 15px', background:'#007bff', color:'#fff', border:'none'}}>Book Now</button>
              </form>
            )}

            <h3>Your Appointments</h3>
            {appointments.length === 0 ? <p>No appointments found.</p> : appointments.map(app => (
              <div key={app._id} style={{background:'#fff', padding:'10px', marginBottom:'10px', border:'1px solid #ccc'}}>
                <p><strong>Doctor:</strong> {app.doctor_id?.name || 'N/A'} ({app.doctor_id?.specialization})</p>
                <p><strong>Date/Time:</strong> {new Date(app.date_time).toLocaleString()}</p>
                <p><strong>Status:</strong> {app.status}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'telemedicine' && (
          <div>
            <h3>Telemedicine / Audio Call</h3>
            <p>{user.role === 'Doctor' ? 'Manage and start audio consultations for patients[cite: 1].' : 'Join remote audio consultation calls with your assigned doctor[cite: 1].'}</p>
          </div>
        )}

        {activeTab === 'records' && (
          <div>
            <h3>Patient Healthcare Records</h3>
            {records.length === 0 ? <p>No records found.</p> : records.map(rec => (
              <div key={rec._id} style={{background:'#fff', padding:'10px', marginBottom:'10px', border:'1px solid #ccc'}}>
                <p><strong>Diagnosis:</strong> {rec.diagnosis}</p>
                <p><strong>Notes:</strong> {rec.notes}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reminders' && (
          <div>
            <h3>Medicine Schedules & Reminders</h3>
            <form onSubmit={handleAddReminder} style={{ background: '#fff', padding: '15px', marginBottom: '20px', border: '1px solid #ccc' }}>
              <div style={{ marginBottom: '10px' }}>
                <label>Medicine Name:</label><br/>
                <input type="text" value={medName} onChange={e => setMedName(e.target.value)} required style={{width:'100%', padding:'6px'}}/>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Schedule (e.g., Morning & Night):</label><br/>
                <input type="text" value={medSchedule} onChange={e => setMedSchedule(e.target.value)} required style={{width:'100%', padding:'6px'}}/>
              </div>
              <button type="submit" style={{padding:'8px 15px', background:'#28a745', color:'#fff', border:'none'}}>Add Reminder</button>
            </form>

            {reminders.map(rem => (
              <div key={rem._id} style={{background:'#fff', padding:'10px', marginBottom:'10px', border:'1px solid #ccc'}}>
                <p><strong>Medicine:</strong> {rem.medicine}</p>
                <p><strong>Schedule:</strong> {rem.schedule}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'centres' && (
          <div>
            <h3>Nearby Hospitals, Clinics & Pharmacies</h3>
            <ul>
              {centres.map(centre => (
                <li key={centre._id} style={{ marginBottom: '10px' }}>
                  <strong>{centre.name}</strong> ({centre.type}) - Location: {centre.location}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;