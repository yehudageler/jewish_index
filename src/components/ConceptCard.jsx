import React from 'react';
import { Link } from 'react-router-dom';

export default function ConceptCard({ term }) {
  return (
    <Link to={`/term/${term.id}`} style={{ textDecoration: 'none' }}>
      <div className="card concept-card" style={styles.card}>
        <h2 style={styles.title}>{term.name}</h2>
        <p style={styles.description}>{term.description}</p>
        <div style={styles.cardFooter}>
          <span style={styles.readMore}>המשך קריאה</span>
        </div>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(194, 168, 120, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  title: {
    fontSize: '2rem',
    color: 'var(--accent-gold-dark)',
    marginBottom: '1rem',
    fontFamily: 'var(--font-serif)',
  },
  description: {
    color: 'var(--text-charcoal)',
    fontSize: '1rem',
    flex: 1,
  },
  cardFooter: {
    marginTop: '1.5rem',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    paddingTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-start', /* RTL left side = flex-end in english, wait flex-start is right edge? Actually RTL flex-start is the right side. but read more should go on the left, so let's do flex-end */
  },
  readMore: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-light)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  }
};
