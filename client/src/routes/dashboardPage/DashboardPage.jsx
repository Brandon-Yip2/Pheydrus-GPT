import "./dashboardPage.css";
import { useState } from "react";

const PROXY_URL = "https://plutofunctionapp-dyfvhpatbmc7dyg5.eastus2-01.azurewebsites.net/api/chat";

const DashboardPage = () => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const testProxyConnection = async () => {
    console.log("DashboardPage: Starting proxy connection test...");
    setIsTestingConnection(true);
    setConnectionStatus(null);
    
    try {
      console.log("DashboardPage: Sending test request to:", PROXY_URL);
      const resp = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Test connection", threadId: null }),
      });

      console.log("DashboardPage: Response received:", resp.status, resp.statusText);

      if (resp.ok) {
        console.log("DashboardPage: Proxy connection successful!");
        setConnectionStatus("success");
        setTimeout(() => setConnectionStatus(null), 3000);
      } else {
        console.log("DashboardPage: Proxy connection failed with status:", resp.status);
        setConnectionStatus("error");
        setTimeout(() => setConnectionStatus(null), 3000);
      }
    } catch (err) {
      console.error("DashboardPage: Proxy connection test failed:", err);
      setConnectionStatus("error");
      setTimeout(() => setConnectionStatus(null), 3000);
    } finally {
      console.log("DashboardPage: Proxy connection test completed");
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <h1>Check Connection</h1>
          <p>Test the connection to your Azure Function App proxy server</p>
        </div>
        
        {/* Test Proxy Connection Button */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <button 
            onClick={testProxyConnection}
            disabled={isTestingConnection}
            style={{ 
              padding: '12px 24px', 
              backgroundColor: connectionStatus === 'success' ? '#28a745' : 
                             connectionStatus === 'error' ? '#dc3545' : '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: isTestingConnection ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
          >
            {isTestingConnection ? 'Testing...' : 
             connectionStatus === 'success' ? '✅ Connected' :
             connectionStatus === 'error' ? '❌ Connection Failed' :
             'Test Proxy Connection'}
          </button>
          {connectionStatus && (
            <div style={{ 
              marginTop: '8px', 
              fontSize: '12px', 
              color: connectionStatus === 'success' ? '#28a745' : '#dc3545' 
            }}>
              {connectionStatus === 'success' ? 'Proxy server is accessible' : 'Unable to reach proxy server'}
            </div>
          )}
        </div>
        
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Connection Status</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Server Health</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>API Endpoints</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
