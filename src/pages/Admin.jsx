import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Trash2 } from 'lucide-react';

export default function Admin() {
  const { user } = useAuth();
  const { terms, quotes, deleteTerm, deleteQuote } = useData();

  if (user?.role !== 'Editor') {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <main className="container" style={{paddingTop: '3rem', paddingBottom: '4rem'}}>
        <h1 style={{fontSize: '2.5rem', marginBottom: '2rem'}}>פאנל ניהול (מנהלים/עורכים)</h1>
        
        <div style={styles.section}>
          <h2>ניהול מושגים ({terms.length})</h2>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>מזהה</th>
                  <th>שם המושג</th>
                  <th>תיאור קצר</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {terms.map(t => (
                  <tr key={t.id}>
                    <td style={{color: 'var(--text-light)', fontSize: '0.85rem'}}>{t.id}</td>
                    <td style={{fontWeight: '600'}}>{t.name}</td>
                    <td>{t.description}</td>
                    <td>
                      <button onClick={() => deleteTerm(t.id)} style={styles.deleteBtn}>
                        <Trash2 size={16} /> מחק
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.section}>
          <h2>ניהול ציטוטים ({quotes.length})</h2>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>מזהה</th>
                  <th>טקסט הציטוט</th>
                  <th>מחבר / שייכות למושג</th>
                  <th>מקור</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map(q => {
                  const parentTerm = terms.find(t => t.id.toString() === q.termId.toString());
                  return (
                    <tr key={q.id}>
                      <td style={{color: 'var(--text-light)', fontSize: '0.85rem'}}>{q.id}</td>
                      <td style={{maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        "{q.text}"
                      </td>
                      <td>
                        <strong>{q.author}</strong>
                        <br />
                        <span style={{fontSize: '0.85rem', color: 'var(--text-light)'}}>מושג: {parentTerm?.name || 'נמחק'}</span>
                      </td>
                      <td>{q.source}</td>
                      <td>
                        <button onClick={() => deleteQuote(q.id)} style={styles.deleteBtn}>
                          <Trash2 size={16} /> מחק
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

const styles = {
  section: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
  },
  tableWrapper: {
    overflowX: 'auto',
    marginTop: '1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'right', /* Right aligned for Hebrew */
  },
  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    color: '#e53e3e',
    fontSize: '0.85rem',
    backgroundColor: 'rgba(229, 62, 62, 0.1)',
    padding: '0.3rem 0.6rem',
    borderRadius: '4px',
    transition: 'all 0.2s',
  }
};
