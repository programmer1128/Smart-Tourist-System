import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard"); // default

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      <div style={{ flex: 1, padding: "20px" }}>
        {activeSection === "dashboard" && <DashboardHome />}
        {activeSection === "map" && <MapPage />}
        {/* You can add other sections similarly */}
      </div>
    </div>
  );
}

// Mock data for the dashboard
const mockTourists = [
  {lat: 18.9220, lng: 72.8347, count: 45, name: "Gateway of India"},
  {lat: 18.9067, lng: 72.8147, count: 78, name: "Marine Drive"},
  {lat: 18.9388, lng: 72.8356, count: 23, name: "Crawford Market"},
  {lat: 18.9056, lng: 72.8137, count: 67, name: "Colaba Causeway"},
  {lat: 18.9298, lng: 72.8271, count: 34, name: "CST Station"}
];

const mockAlerts = [
  {id: 1, type: 'MISSING', time: '2 min ago', desc: 'Tourist John Doe (ID: T1247) lost contact near Gateway of India'},
  {id: 2, type: 'HIGH RISK', time: '15 min ago', desc: 'Large crowd detected at Marine Drive - Risk level elevated'},
  {id: 3, type: 'DEVICE', time: '32 min ago', desc: 'GPS device T0892 showing low battery warning'}
];

const mockRecords = [
  {id: 'T1234', name: 'Sarah Johnson', location: 'Gateway of India', status: 'online'},
  {id: 'T1235', name: 'Michael Chen', location: 'Colaba Causeway', status: 'warning'},
  {id: 'T1247', name: 'John Doe', location: 'Marine Drive', status: 'offline'}
];

const TouristSafetyDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMapLayer, setActiveMapLayer] = useState('clusters');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  const StatCard = ({ title, value, description, icon, gradient }) => (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        <div className={`stat-icon ${gradient}`}>
          <i className={icon}></i>
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-desc">{description}</div>
    </div>
  );

  const AlertItem = ({ alert }) => (
    <div className="alert-item">
      <div className="alert-header">
        <span className={`alert-type ${alert.type.toLowerCase().replace(' ', '-')}`}>
          {alert.type}
        </span>
        <span className="alert-time">{alert.time}</span>
      </div>
      <div className="alert-desc">{alert.desc}</div>
    </div>
  );

  const RecordItem = ({ record }) => (
    <div className="record-item">
      <div className="record-name">
        <span className={`status-indicator status-${record.status}`}></span>
        {record.name}
      </div>
      <div className="record-details">
        ID: {record.id} | Last seen: {record.location} | Status: {record.status}
      </div>
    </div>
  );

  const MapView = () => (
    <div className="map-view">
      <div className="map-placeholder">
        <div className="map-info">
          <h4>Interactive Map View</h4>
          <p>Showing: {activeMapLayer === 'clusters' ? 'Tourist Clusters' : 
                      activeMapLayer === 'heatmap' ? 'Heat Map' : 'Risk Zones'}</p>
          
          {activeMapLayer === 'clusters' && (
            <div className="cluster-points">
              {mockTourists.map((tourist, index) => (
                <div key={index} className="cluster-point" 
                     style={{
                       left: `${20 + index * 15}%`,
                       top: `${30 + (index % 2) * 20}%`,
                       width: `${20 + tourist.count/3}px`,
                       height: `${20 + tourist.count/3}px`
                     }}>
                  {tourist.count}
                </div>
              ))}
            </div>
          )}
          
          {activeMapLayer === 'heatmap' && (
            <div className="heatmap-zones">
              {mockTourists.map((tourist, index) => (
                <div key={index} className="heat-zone"
                     style={{
                       left: `${15 + index * 18}%`,
                       top: `${25 + (index % 3) * 15}%`,
                       opacity: tourist.count / 100
                     }}>
                </div>
              ))}
            </div>
          )}
          
          {activeMapLayer === 'risks' && (
            <div className="risk-zones">
              {[0.8, 0.6, 0.9, 0.5, 0.7].map((risk, index) => (
                <div key={index} 
                     className={`risk-zone ${risk > 0.7 ? 'high' : risk > 0.5 ? 'medium' : 'low'}`}
                     style={{
                       left: `${10 + index * 20}%`,
                       top: `${20 + (index % 2) * 25}%`
                     }}>
                  {Math.round(risk * 100)}%
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="logo">
        <i className="fas fa-shield-alt"></i>
        {!sidebarCollapsed && (
          <div className="logo-text">
            <div>SafeTrail</div>
            <div className="logo-subtitle">Management System</div>
          </div>
        )}
      </div>
      
      <nav className="nav-menu">
        <div className="nav-section">
          <ul>
            <li className="nav-item">
              <a href="#" 
                 className={`nav-link ${activeSection === 'dashboard' ? 'active' : ''}`}
                 onClick={() => setActiveSection('dashboard')}>
                <i className="fas fa-tachometer-alt"></i>
                {!sidebarCollapsed && <span>Dashboard</span>}
              </a>
            </li>
            <li className="nav-item">
  <a 
    href="#" 
    className={`nav-link ${activeSection === 'map' ? 'active' : ''}`}
    onClick={(e) => { 
      e.preventDefault(); 
      setActiveSection('map'); 
    }}
  >
    <i className="fas fa-map-marked-alt"></i>
    {!sidebarCollapsed && <span>Live Tracking</span>}
  </a>
</li>

            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fas fa-users"></i>
                {!sidebarCollapsed && <span>Tourist Clusters</span>}
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fas fa-fire"></i>
                {!sidebarCollapsed && <span>Heat Maps</span>}
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fas fa-exclamation-triangle"></i>
                {!sidebarCollapsed && <span>Risk Zones</span>}
              </a>
            </li>
          </ul>
        </div>
        
        {!sidebarCollapsed && (
          <>
            <div className="nav-section">
              <div className="nav-section-title">Safety Management</div>
              <ul>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-bell"></i>
                    <span>Active Alerts</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-id-card"></i>
                    <span>Digital ID Records</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-search-location"></i>
                    <span>Last Known Locations</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-history"></i>
                    <span>Alert History</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="nav-section">
              <div className="nav-section-title">Emergency Response</div>
              <ul>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-file-medical"></i>
                    <span>E-FIR System</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-user-slash"></i>
                    <span>Missing Persons</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-ambulance"></i>
                    <span>Emergency Services</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-phone-alt"></i>
                    <span>Quick Response</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="nav-section">
              <div className="nav-section-title">Analytics & Reports</div>
              <ul>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-chart-line"></i>
                    <span>Analytics</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-file-chart"></i>
                    <span>Reports</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-cog"></i>
                    <span>Settings</span>
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>
      
      <button 
        className="sidebar-toggle"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      >
        <i className={`fas fa-${sidebarCollapsed ? 'chevron-right' : 'chevron-left'}`}></i>
      </button>
    </div>
  );

  return (
    <div className="dashboard-container">
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet" 
      />
      
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #2d3748 100%);
          color: #ffffff;
          min-height: 100vh;
        }

        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #2d3748 100%);
        }

        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, #1a202c 0%, #2d3748 100%);
          backdrop-filter: blur(15px);
          padding: 20px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);
          position: relative;
          overflow-y: auto;
          transition: all 0.3s ease;
        }

        .sidebar.collapsed {
          width: 80px;
        }

        .sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(74, 144, 226, 0.1), rgba(80, 200, 120, 0.1));
          pointer-events: none;
        }

        .logo {
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          font-size: 20px;
          font-weight: 600;
          position: relative;
          z-index: 2;
        }

        .logo i {
          background: linear-gradient(45deg, #4a90e2, #50c878);
          padding: 12px;
          border-radius: 12px;
          margin-right: 12px;
          color: white;
          box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
          min-width: 44px;
          text-align: center;
        }

        .logo-text {
          line-height: 1.2;
        }

        .logo-subtitle {
          font-size: 11px;
          opacity: 0.7;
          font-weight: 400;
          color: #a0aec0;
        }

        .nav-menu {
          position: relative;
          z-index: 2;
        }

        .nav-menu ul {
          list-style: none;
        }

        .nav-item {
          margin-bottom: 4px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          color: #a0aec0;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          font-weight: 500;
          font-size: 14px;
        }

        .nav-link:hover {
          background: rgba(74, 144, 226, 0.1);
          color: #ffffff;
          transform: translateX(4px);
        }

        .nav-link.active {
          background: linear-gradient(90deg, rgba(74, 144, 226, 0.2), rgba(80, 200, 120, 0.1));
          color: #ffffff;
          border-left: 3px solid #4a90e2;
        }

        .nav-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #4a90e2, #50c878);
          border-radius: 0 2px 2px 0;
        }

        .nav-link i {
          margin-right: 12px;
          width: 18px;
          height: 18px;
          text-align: center;
          font-size: 16px;
          opacity: 0.8;
          min-width: 18px;
        }

        .nav-link.active i {
          opacity: 1;
          color: #4a90e2;
        }

        .nav-section {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-section:first-child {
          margin-top: 0;
          padding-top: 0;
          border-top: none;
        }

        .nav-section-title {
          font-size: 11px;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 15px;
          padding-left: 16px;
        }

        .sidebar-toggle {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: rgba(74, 144, 226, 0.2);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          color: #4a90e2;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sidebar-toggle:hover {
          background: rgba(74, 144, 226, 0.3);
        }

        .main-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .header-info h1 {
          font-size: 28px;
          margin-bottom: 5px;
        }

        .header-info p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .time-display {
          font-size: 24px;
          font-weight: 600;
          color: #4a90e2;
        }

        .alert-badge {
          background: #ff4757;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: linear-gradient(145deg, rgba(45, 55, 72, 0.8), rgba(26, 32, 44, 0.6));
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(74, 144, 226, 0.05), rgba(80, 200, 120, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .stat-title {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-weight: 500;
        }

        .stat-icon {
          padding: 8px;
          border-radius: 8px;
          color: white;
        }

        .stat-icon.safe { background: linear-gradient(45deg, #4CAF50, #45a049); }
        .stat-icon.alert { background: linear-gradient(45deg, #ff6b6b, #ee5a52); }
        .stat-icon.tourist { background: linear-gradient(45deg, #3498db, #2980b9); }
        .stat-icon.device { background: linear-gradient(45deg, #f39c12, #e67e22); }

        .stat-value {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .stat-desc {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }

        .map-container {
          background: linear-gradient(145deg, rgba(45, 55, 72, 0.8), rgba(26, 32, 44, 0.6));
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          min-height: 400px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .map-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .map-title {
          font-size: 18px;
          font-weight: 600;
        }

        .map-controls {
          display: flex;
          gap: 10px;
        }

        .map-btn {
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.3s ease;
        }

        .map-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .map-btn.active {
          background: #4a90e2;
        }

        .map-view {
          height: 350px;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }

        .map-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #2d3748, #4a5568);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .map-info {
          text-align: center;
          z-index: 2;
        }

        .cluster-point {
          position: absolute;
          background: linear-gradient(45deg, #3498db, #2980b9);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          animation: pulse 2s infinite;
        }

        .heat-zone {
          position: absolute;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, #ff4757, transparent);
          border-radius: 50%;
          animation: heatPulse 3s infinite;
        }

        .risk-zone {
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
          animation: riskPulse 2.5s infinite;
        }

        .risk-zone.high { background: #ff4757; color: white; }
        .risk-zone.medium { background: #ffa502; color: white; }
        .risk-zone.low { background: #26de81; color: white; }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes heatPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }

        @keyframes riskPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .alerts-panel {
          background: linear-gradient(145deg, rgba(45, 55, 72, 0.8), rgba(26, 32, 44, 0.6));
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .panel-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }

        .panel-title i {
          margin-right: 10px;
          color: #ff6b6b;
        }

        .alert-item {
          background: rgba(255, 107, 107, 0.1);
          border: 1px solid rgba(255, 107, 107, 0.3);
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
        }

        .alert-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .alert-type {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
        }

        .alert-type.missing { background: #ff6b6b; color: white; }
        .alert-type.high-risk { background: #ff9500; color: white; }
        .alert-type.device { background: #5856d6; color: white; }

        .alert-time {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
        }

        .alert-desc {
          font-size: 14px;
          line-height: 1.4;
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .records-panel, .efir-panel {
          background: linear-gradient(145deg, rgba(45, 55, 72, 0.8), rgba(26, 32, 44, 0.6));
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .search-box {
          width: 100%;
          padding: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          margin-bottom: 20px;
        }

        .search-box::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .record-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .record-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .record-name {
          font-weight: 600;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
        }

        .record-details {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }

        .status-indicator {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
        }

        .status-online { background: #4CAF50; }
        .status-offline { background: #ff6b6b; }
        .status-warning { background: #f39c12; }

        .efir-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(45deg, #ff6b6b, #ee5a52);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease;
          margin-bottom: 15px;
        }

        .efir-btn:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .sidebar {
            width: 80px;
          }
          
          .sidebar:not(.collapsed) {
            width: 250px;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .bottom-grid {
            grid-template-columns: 1fr;
          }
          
          .sidebar {
            width: 60px;
          }
          
          .header {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
      
      <Sidebar />
      
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-info">
            <h1>Tourist Safety Dashboard</h1>
            <p>Wednesday, Friday 24, 2025</p>
          </div>
          <div className="header-actions">
            <div className="time-display">{formatTime(currentTime)}</div>
            <div className="alert-badge">3</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard 
            title="E-firs"
            value="98"
            description="All systems operational"
            icon="fas fa-check-circle"
            gradient="safe"
          />
          <StatCard 
            title="Active Alerts"
            value="3"
            description="Critical issues"
            icon="fas fa-exclamation-triangle"
            gradient="alert"
          />
          <StatCard 
            title="Active Tourists"
            value="1,247"
            description="Currently tracked"
            icon="fas fa-users"
            gradient="tourist"
          />
          <StatCard 
            title="Checked ins"
            value="892"
            description="98.8% online"
            icon="fas fa-wifi"
            gradient="device"
          />
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Map Container */}
          <div className="map-container">
            <div className="map-header">
              <h3 className="map-title">Real-time Tourist Tracking</h3>
              <div className="map-controls">
                <button 
                  className={`map-btn ${activeMapLayer === 'clusters' ? 'active' : ''}`}
                  onClick={() => setActiveMapLayer('clusters')}
                >
                  Clusters
                </button>
                <button 
                  className={`map-btn ${activeMapLayer === 'heatmap' ? 'active' : ''}`}
                  onClick={() => setActiveMapLayer('heatmap')}
                >
                  Heat Map
                </button>
                <button 
                  className={`map-btn ${activeMapLayer === 'risks' ? 'active' : ''}`}
                  onClick={() => setActiveMapLayer('risks')}
                >
                  Risk Zones
                </button>
              </div>
            </div>
            <MapView />
          </div>

          {/* Alerts Panel */}
          <div className="alerts-panel">
            <h3 className="panel-title">
              <i className="fas fa-bell"></i>
              Recent Alerts
            </h3>
            
            {mockAlerts.map(alert => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="bottom-grid">
          {/* Records Panel */}
          <div className="records-panel">
            <h3 className="panel-title">
              <i className="fas fa-search"></i>
              Digital ID Records
            </h3>
            
            <input 
              type="text" 
              className="search-box" 
              placeholder="Search tourist records..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {mockRecords
              .filter(record => 
                record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.id.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(record => (
                <RecordItem key={record.id} record={record} />
              ))
            }
          </div>

          {/* E-FIR Panel */}
          <div className="efir-panel">
            <h3 className="panel-title">
              <i className="fas fa-file-medical"></i>
              Automated E-FIR System
            </h3>
            
            <button 
              className="efir-btn"
              onClick={() => alert('E-FIR generation initiated for missing person case. Automated form will be submitted to local authorities within 30 seconds.')}
            >
              <i className="fas fa-plus-circle"></i> Generate Missing Person E-FIR
            </button>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '15px', 
              borderRadius: '8px', 
              marginBottom: '15px'
            }}>
              <strong>Recent E-FIRs:</strong><br />
              <small style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                • FIR #MP2025001 - John Doe (Filed: 2:04 AM)<br />
                • FIR #MP2025002 - Jane Smith (Filed: Yesterday)<br />
                • FIR #MP2025003 - Robert Wilson (Filed: Yesterday)
              </small>
            </div>
            
            <div style={{
              textAlign: 'center', 
              color: 'rgba(255, 255, 255, 0.6)', 
              fontSize: '12px'
            }}>
              <i className="fas fa-shield-alt"></i>
              <br />Automated system active
              <br />Response time: &lt;30 seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristSafetyDashboard;
          
          