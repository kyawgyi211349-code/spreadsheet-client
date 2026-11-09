import React, { useState } from 'react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPassword === '1111') {
      setIsAuthenticated(true);
    } else {
      alert('Password မှားယွင်းနေပါသည်။');
    }
  };

  // Password မထည့်ရသေးရင် Login မျက်နှာပြင်ပြမယ်
  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f6f8' }}>
        <form onSubmit={handleLogin} style={{ textAlign: 'center', padding: '30px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <h3>Spreadsheet ဝင်ရန် Password ထည့်ပါ</h3>
          <p style={{ color: '#23b78f', fontSize: '14px' }}>ဝင်ရောက်ရန် Password ထည့်ပါ။</p>
          <input 
            type="password" 
            value={inputPassword} 
            onChange={(e) => setInputPassword(e.target.value)} 
            placeholder="Password..."
            style={{ padding: '8px', marginRight: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#434fca', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Login
          </button>
        </form>
      </div>
    );
  }

  // Password မှန်သွားရင် မူလ Spreadsheet ဇယား ပေါ်လာမယ်
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
      <div style={{ padding: '13px', background: '#858fd8', color: 'white', fontSize: '15px', fontWeight: 'bold' }}>
        Mr:Kyaw - KPG Immigration Sheet :
      </div>
      <iframe
        src="https://docs.google.com/spreadsheets/d/1_6AnuJ08wMM6H9VkhyqR3QlspIIYhMc92ph1UaLII2c/edit?usp=sharing&rm=embedded"
        style={{ flex: 1, width: '100%', border: 'none' }}
        title="Google Sheet"
      />
    </div>
  );
}