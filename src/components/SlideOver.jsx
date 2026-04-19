import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function SlideOver({ isOpen, onClose, title, children }) {
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
      <div style={styles.panel} className="slide-in">
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button onClick={onClose} style={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>
        <div style={styles.content}>
          {children}
        </div>
      </div>
      <style>{`
        .slide-in {
          /* RTL: slide in from left side (since left is end), wait actually we can just slide from left */
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); }
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
    justifyContent: 'flex-end', /* RTL flex-end means it aligns to the left box constraint */
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
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'var(--bg-parchment)',
    height: '100%',
    boxShadow: '4px 0 20px rgba(0,0,0,0.1)', /* Shadow on right */
    display: 'flex',
    flexDirection: 'column',
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
  }
};
