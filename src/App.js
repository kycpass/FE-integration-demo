import React from 'react';
import './App.css';
import EntifyVerification from './EntifySDK';
import DashboardContainer from './EntifyBEInt';

function App() {
  return (
    <div className="app">
      <div className="app-header">
          SDK & webhook integration demo
      </div>
      <div className="app-container">
        <div className="app-landingpage">          
          <DashboardContainer />
          <EntifyVerification />
        </div>
      </div>
    </div>
  );
}

export default App;
