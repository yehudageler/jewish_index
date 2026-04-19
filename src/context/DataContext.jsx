import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [terms, setTerms] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      try {
        const [termsResult, quotesResult] = await Promise.all([
          supabase.from('terms').select('*'),
          supabase.from('quotes').select('*').order('dateAdded', { ascending: false })
        ]);

        if (termsResult.data) setTerms(termsResult.data);
        if (quotesResult.data) setQuotes(quotesResult.data);
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const addTerm = async (name, description) => {
    const { data, error } = await supabase
      .from('terms')
      .insert([{ name, description }])
      .select()
      .single();

    if (error) {
      console.error('Error adding term:', error);
      return null;
    }
    if (data) {
      setTerms(prev => [...prev, data]);
      return data;
    }
  };

  const deleteTerm = async (id) => {
    const { error } = await supabase.from('terms').delete().eq('id', id);
    if (!error) {
      setTerms(prev => prev.filter(t => t.id !== id));
      setQuotes(prev => prev.filter(q => q.termId !== id)); // optimistically clear quotes too
    } else {
      console.error('Error deleting term:', error);
    }
  };

  const addQuote = async (termId, text, author, source, editorName) => {
    const newQuoteObj = {
      termId,
      text,
      author,
      source,
      editorName,
      dateAdded: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('quotes')
      .insert([newQuoteObj])
      .select()
      .single();

    if (error) {
      console.error('Error adding quote:', error);
    } else if (data) {
      setQuotes(prev => [data, ...prev]);
    }
  };
  
  const deleteQuote = async (id) => {
    const { error } = await supabase.from('quotes').delete().eq('id', id);
    if (!error) {
      setQuotes(prev => prev.filter(q => q.id !== id));
    } else {
      console.error('Error deleting quote:', error);
    }
  };

  return (
    <DataContext.Provider value={{ terms, quotes, loading, addTerm, deleteTerm, addQuote, deleteQuote }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
