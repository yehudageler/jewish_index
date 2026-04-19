import React from 'react';

export default function QuoteBlock({ quote }) {
  const date = new Date(quote.dateAdded).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div style={styles.wrapper}>
      <blockquote style={styles.blockquote}>
        "{quote.text}"
      </blockquote>
      <div style={styles.meta}>
        <div style={styles.authorSection}>
          <span style={styles.author}>{quote.author}</span>
          <span style={styles.source}> • {quote.source}</span>
        </div>
        <div style={styles.editorSection}>
          <span style={styles.editor}>נוסף על ידי {quote.editorName}</span>
          <span style={styles.date}>ב-{date}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    padding: '2.5rem 3rem',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
    marginBottom: '2rem',
    position: 'relative',
  },
  blockquote: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.4rem',
    lineHeight: '1.8',
    color: 'var(--text-charcoal)',
    marginBottom: '1.5rem',
    position: 'relative',
    zIndex: 1,
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderTop: '1px solid rgba(194, 168, 120, 0.2)',
    paddingTop: '1rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  authorSection: {
    fontSize: '1rem',
  },
  author: {
    fontWeight: '600',
    color: 'var(--accent-gold-dark)',
  },
  source: {
    fontStyle: 'italic',
    color: 'var(--text-light)',
  },
  editorSection: {
    fontSize: '0.85rem',
    color: '#999',
    display: 'flex',
    gap: '0.5rem',
  },
  editor: {
    fontWeight: '500',
  },
  date: {
  }
};
