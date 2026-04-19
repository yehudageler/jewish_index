import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    if (email && password) {
      login(email.split('@')[0]); // Use email prefix as name
      navigate('/');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.pageWrapper}>
        <div style={styles.loginCard} className="animate-fade-in">
          <div style={styles.iconCircle}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--accent-gold)'}}>
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
            </svg>
          </div>
          
          <h1 style={styles.title}>ברוכים הבאים ל-Base44</h1>
          <p style={styles.subtitle}>התחבר כדי להמשיך בעריכה</p>

          <button style={styles.googleBtn}>
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" style={{width: 20}} />
            המשך עם Google
          </button>

          <div style={styles.divider}>
            <div style={styles.line}></div>
            <span style={styles.orText}>או</span>
            <div style={styles.line}></div>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div className="form-group" style={{position: 'relative'}}>
              <label className="form-label">אימייל</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} style={styles.fieldIcon} />
                <input 
                  type="email" 
                  className="form-input" 
                  style={styles.fieldInput}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{position: 'relative'}}>
              <label className="form-label">סיסמה</label>
              <div style={styles.inputWrapper}>
                <Lock size={18} style={styles.fieldIcon} />
                <input 
                  type="password" 
                  className="form-input" 
                  style={styles.fieldInput}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={styles.submitBtn}>
              <LogIn size={20} /> התחברות
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  pageWrapper: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  loginCard: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '440px',
    padding: '3rem',
    borderRadius: '16px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  iconCircle: {
    width: '80px',
    height: '80px',
    backgroundColor: 'rgba(194, 168, 120, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'var(--text-light)',
    fontSize: '1rem',
    marginBottom: '2.5rem',
  },
  googleBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '0.8rem',
    border: '1px solid #e2e0db',
    borderRadius: '8px',
    backgroundColor: '#fff',
    fontWeight: '500',
    fontSize: '1rem',
    color: 'var(--text-charcoal)',
    transition: 'all 0.2s',
    marginBottom: '1.5rem',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  line: {
    flex: 1,
    height: '1px',
    backgroundColor: '#eee',
  },
  orText: {
    fontSize: '0.85rem',
    color: '#999',
    textTransform: 'uppercase',
  },
  form: {
    textAlign: 'right',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  fieldIcon: {
    position: 'absolute',
    right: '12px',
    color: '#999',
  },
  fieldInput: {
    paddingRight: '40px',
  },
  submitBtn: {
    width: '100%',
    marginTop: '1rem',
    padding: '1rem',
    fontSize: '1.1rem',
  }
};
