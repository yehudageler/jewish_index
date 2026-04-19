import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { X, Home, Settings, LogIn, LogOut, User } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.backdrop} onClick={onClose} className="animate-fade-in" />
      <div style={styles.panel} className="slide-in-right">
        <div style={styles.header}>
          <h2 style={styles.title}>תפריט ניווט</h2>
          <button onClick={onClose} style={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>
        <div style={styles.content}>
          <Link to="/" style={styles.link} onClick={onClose}>
            <Home size={20} /> אנדקס המושגים (דף הבית)
          </Link>
          {user?.role === 'Editor' && (
            <Link to="/admin" style={styles.link} onClick={onClose}>
              <Settings size={20} /> גש לפאנל הניהול
            </Link>
          )}
        </div>
        <div style={styles.footer}>
          {user ? (
            <button style={styles.authBtn} onClick={() => { logout(); onClose(); }}>
              <LogOut size={20} /> התנתק ({user.name})
            </button>
          ) : (
            <Link to="/login" style={styles.authBtn} onClick={onClose}>
              <LogIn size={20} /> כניסת עורכים
            </Link>
          )}
        </div>
      </div>
      <style>{`
        .slide-in-right {
          animation: slideInR 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes slideInR {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'flex-start', // For RTL, panel is on the right side. Wait, if RTL is active, flex-start might mean right? Better to use fixed right.
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(44, 44, 44, 0.3)',
    backdropFilter: 'blur(4px)',
  },
  panel: {
    position: 'absolute',
    top: 0,
    right: 0, /* slide from right */
    width: '100%',
    maxWidth: '300px',
    backgroundColor: 'var(--bg-parchment)',
    height: '100%',
    boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1001,
  },
  header: {
    padding: '2rem',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.2rem',
    fontWeight: '600',
    margin: 0,
  },
  closeBtn: {
    color: 'var(--text-light)',
    transition: 'color 0.2s ease',
  },
  content: {
    padding: '2rem',
    overflowY: 'auto',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    fontSize: '1.1rem',
    color: 'var(--text-charcoal)',
    padding: '0.5rem 0',
    transition: 'color 0.2s ease',
    fontWeight: '500',
  },
  footer: {
    padding: '2rem',
    borderTop: '1px solid rgba(0,0,0,0.05)',
  },
  authBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    fontSize: '1rem',
    color: 'var(--text-light)',
    padding: '0.8rem 1rem',
    width: '100%',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    backgroundColor: 'rgba(0,0,0,0.02)',
    cursor: 'pointer',
    justifyContent: 'center',
  }
};
