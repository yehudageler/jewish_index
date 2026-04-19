import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import QuoteBlock from '../components/QuoteBlock';
import SlideOver from '../components/SlideOver';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Plus, Filter } from 'lucide-react';

const COMMON_AUTHORS = ['רמב״ם', 'מהר״ל מסמוץ', 'מלבי״ם', 'רש״י', 'רבי עקיבא', 'רבי משה שפירא', 'אחר'];

export default function TermPage() {
  const { id } = useParams();
  const { terms, quotes, addQuote } = useData();
  const { user } = useAuth();
  
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [selectedAuthorFilter, setSelectedAuthorFilter] = useState('הכל');
  
  const [qText, setQText] = useState('');
  const [qAuthor, setQAuthor] = useState(COMMON_AUTHORS[0]);
  const [qCustomAuthor, setQCustomAuthor] = useState('');
  const [qSource, setQSource] = useState('');

  const term = terms.find(t => t.id.toString() === id.toString());
  const termQuotes = quotes.filter(q => q.termId.toString() === id.toString());

  const existingAuthors = useMemo(() => {
    const authors = new Set(termQuotes.map(q => q.author));
    return ['הכל', ...Array.from(authors).sort()];
  }, [termQuotes]);

  const filteredQuotes = useMemo(() => {
    if (selectedAuthorFilter === 'הכל') return termQuotes;
    return termQuotes.filter(q => q.author === selectedAuthorFilter);
  }, [termQuotes, selectedAuthorFilter]);

  if (!term) {
    return (
      <>
        <Navbar />
        <div className="container" style={{paddingTop: '4rem', textAlign: 'center'}}>
          <h2>המושג לא נמצא.</h2>
          <Link to="/" className="btn-secondary" style={{marginTop: '1rem', display: 'inline-block'}}>חזרה לאינדקס</Link>
        </div>
      </>
    );
  }

  const handleAddQuote = (e) => {
    e.preventDefault();
    if (!qText.trim() || !qSource.trim() || !user) return;
    
    const finalAuthor = qAuthor === 'אחר' ? qCustomAuthor : qAuthor;
    if (!finalAuthor.trim()) return;

    addQuote(term.id, qText, finalAuthor, qSource, user.name);
    
    setQText('');
    setQAuthor(COMMON_AUTHORS[0]);
    setQCustomAuthor('');
    setQSource('');
    setIsSlideOverOpen(false);
  };

  return (
    <>
      <Navbar />
      <main className="container" style={styles.main}>
        <div style={styles.backWrapper}>
          {/* Use ArrowRight for RTL "back" direction */}
          <Link to="/" style={styles.backLink}>
            <ArrowRight size={18} /> חזרה לאינדקס
          </Link>
        </div>

        <header style={styles.termHeader}>
          <h1 style={styles.termTitle}>{term.name}</h1>
          <p style={styles.termDesc}>{term.description}</p>
        </header>

        <div style={styles.controlsSection}>
          <div style={styles.filterBar}>
            <Filter size={18} style={{color: 'var(--text-light)'}} />
            <div style={styles.filterButtons}>
              {existingAuthors.map(author => (
                <button 
                  key={author} 
                  style={{
                    ...styles.filterTab,
                    ...(selectedAuthorFilter === author ? styles.filterTabActive : {})
                  }}
                  onClick={() => setSelectedAuthorFilter(author)}
                >
                  {author}
                </button>
              ))}
            </div>
          </div>
          
          {user?.role === 'Editor' && (
            <button className="btn-primary" onClick={() => setIsSlideOverOpen(true)}>
              <Plus size={18} /> הוסף ציטוט
            </button>
          )}
        </div>

        <div style={styles.quotesFeed}>
          {filteredQuotes.map(quote => (
            <QuoteBlock key={quote.id} quote={quote} />
          ))}
          {filteredQuotes.length === 0 && (
            <div style={styles.emptyQuotes}>לא נמצאו ציטוטים עבור בחירה זו.</div>
          )}
        </div>
      </main>

      <SlideOver 
        isOpen={isSlideOverOpen} 
        onClose={() => setIsSlideOverOpen(false)}
        title={`הוסף ציטוט: ${term.name}`}
      >
        <form onSubmit={handleAddQuote}>
          <div className="form-group">
            <label className="form-label">טקסט הציטוט</label>
            <textarea 
              className="form-textarea" 
              required
              value={qText}
              onChange={(e) => setQText(e.target.value)}
              placeholder="הזן את לשון המקור..."
              style={{minHeight: '200px'}}
            />
          </div>
          <div className="form-group">
            <label className="form-label">מחבר / אומר</label>
            <select 
              className="form-select" 
              value={qAuthor}
              onChange={(e) => setQAuthor(e.target.value)}
            >
              {COMMON_AUTHORS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          {qAuthor === 'אחר' && (
            <div className="form-group animate-fade-in">
              <label className="form-label">ציין מחבר</label>
              <input 
                type="text" 
                className="form-input" 
                required
                value={qCustomAuthor}
                onChange={(e) => setQCustomAuthor(e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">מקור (ספר / דף)</label>
            <input 
              type="text" 
              className="form-input" 
              required
              value={qSource}
              onChange={(e) => setQSource(e.target.value)}
              placeholder="לדוגמא: אבות ג, יב"
            />
          </div>
          <button type="submit" className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>
            שמור ציטוט
          </button>
        </form>
      </SlideOver>
    </>
  );
}

const styles = {
  main: {
    paddingTop: '2rem',
    paddingBottom: '4rem',
    maxWidth: '800px', // clean focused reading layout
  },
  backWrapper: {
    marginBottom: '2rem',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: 'var(--text-light)',
    fontWeight: '500',
  },
  termHeader: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  termTitle: {
    fontSize: '4rem',
    color: 'var(--accent-gold-dark)',
    marginBottom: '1.5rem',
  },
  termDesc: {
    fontSize: '1.2rem',
    color: 'var(--text-charcoal)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.8',
  },
  controlsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    paddingBottom: '1rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  filterBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    overflowX: 'auto',
    paddingBottom: '0.5rem',
  },
  filterButtons: {
    display: 'flex',
    gap: '0.5rem',
  },
  filterTab: {
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    backgroundColor: '#fff',
    border: '1px solid #e2e0db',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  filterTabActive: {
    backgroundColor: 'var(--text-charcoal)',
    color: '#fff',
    borderColor: 'var(--text-charcoal)',
  },
  quotesFeed: {
    display: 'flex',
    flexDirection: 'column',
  },
  emptyQuotes: {
    textAlign: 'center',
    padding: '4rem',
    color: 'var(--text-light)',
    fontStyle: 'italic',
  }
};
