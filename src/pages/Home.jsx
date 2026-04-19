import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import ConceptCard from '../components/ConceptCard';
import SlideOver from '../components/SlideOver';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Plus } from 'lucide-react';

export default function Home() {
  const { terms, addTerm } = useData();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  
  // New Term Form State
  const [newTermName, setNewTermName] = useState('');
  const [newTermDesc, setNewTermDesc] = useState('');

  const filteredTerms = useMemo(() => {
    if (!searchQuery) return terms;
    return terms.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [terms, searchQuery]);

  const handleAddTerm = (e) => {
    e.preventDefault();
    if (!newTermName.trim() || !newTermDesc.trim()) return;
    addTerm(newTermName, newTermDesc);
    setIsSlideOverOpen(false);
    setNewTermName('');
    setNewTermDesc('');
  };

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <main className="container" style={styles.main}>
        <div style={styles.headerWrapper}>
          <h1 style={styles.pageTitle}>אינדקס המושגים</h1>
          {user?.role === 'Editor' && (
            <button className="btn-primary" onClick={() => setIsSlideOverOpen(true)}>
              <Plus size={18} /> הוסף מושג חדש
            </button>
          )}
        </div>
        
        <div style={styles.grid}>
          {filteredTerms.map(term => (
            <ConceptCard key={term.id} term={term} />
          ))}
          {filteredTerms.length === 0 && (
            <div style={styles.emptyState}>לא נמצאו מושגים.</div>
          )}
        </div>
      </main>

      <SlideOver 
        isOpen={isSlideOverOpen} 
        onClose={() => setIsSlideOverOpen(false)}
        title="הוספת מושג חדש"
      >
        <form onSubmit={handleAddTerm}>
          <div className="form-group">
            <label className="form-label">שם המושג</label>
            <input 
              type="text" 
              className="form-input" 
              required
              value={newTermName}
              onChange={(e) => setNewTermName(e.target.value)}
              placeholder="לדוגמא: חסד"
            />
          </div>
          <div className="form-group">
            <label className="form-label">הסבר קצר</label>
            <textarea 
              className="form-textarea" 
              required
              value={newTermDesc}
              onChange={(e) => setNewTermDesc(e.target.value)}
              placeholder="תיאור קצר, משפט אחד או שניים..."
            />
          </div>
          <button type="submit" className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>
            שמור מושג
          </button>
        </form>
      </SlideOver>
    </>
  );
}

const styles = {
  main: {
    paddingTop: '3rem',
    paddingBottom: '4rem',
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem',
  },
  pageTitle: {
    fontSize: '2.5rem',
    margin: 0,
    color: 'var(--text-charcoal)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '4rem',
    color: 'var(--text-light)',
    fontStyle: 'italic',
  }
};
