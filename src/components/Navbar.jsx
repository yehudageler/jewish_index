import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, UserCircle, LogOut, Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export default function Navbar({ onSearch }) {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav style={styles.navbar}>
        <div className="container" style={styles.navContainer}>
          <div style={styles.leftSection}>
            <button style={styles.hamburgerBtn} onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <Link to="/" style={styles.logo}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--accent-gold)'}}>
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              </svg>
              Base44
            </Link>
          </div>
          
          {onSearch && (
            <div style={styles.searchWrapper}>
              <Search size={18} style={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="חפש מושג..." 
                style={styles.searchInput}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          )}

          <div style={styles.userSection}>
            {user ? (
              <div style={styles.loggedIn}>
                <span style={styles.userName}>{user.name}</span>
                <span style={styles.roleBadge}>{user.role === 'Editor' ? 'עורך' : user.role}</span>
              </div>
            ) : (
              <div style={styles.loginWrapper}>
                <button onClick={() => setIsSidebarOpen(true)} style={styles.loginBtn}>
                  <UserCircle size={20} />
                  <span>כניסה</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

const styles = {
  navbar: {
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    backgroundColor: 'rgba(249, 247, 242, 0.8)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: '1rem 0'
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem'
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  hamburgerBtn: {
    color: 'var(--text-charcoal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.2rem',
  },
  logo: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.5rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-charcoal)'
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    maxWidth: '400px',
  },
  searchIcon: {
    position: 'absolute',
    right: '12px', /* Moved to right for RTL */
    color: 'var(--text-light)',
  },
  searchInput: {
    width: '100%',
    padding: '0.6rem 2.5rem 0.6rem 1rem', /* Adjust padding for RTL */
    borderRadius: '20px',
    border: '1px solid #e2e0db',
    backgroundColor: '#fff',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '200px',
    justifyContent: 'flex-end',
  },
  loginBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-light)',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'color 0.2s ease',
  },
  loginWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },
  loginForm: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  loggedIn: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userName: {
    fontWeight: '500',
    color: 'var(--text-charcoal)',
  },
  roleBadge: {
    backgroundColor: 'rgba(194, 168, 120, 0.15)',
    color: 'var(--accent-gold-dark)',
    padding: '0.2rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  iconButton: {
    color: 'var(--text-light)',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s ease',
  }
};
