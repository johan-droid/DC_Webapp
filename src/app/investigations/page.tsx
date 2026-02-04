"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CaseItem {
  id: number;
  title: string;
  description: string;
  episode_number?: number;
  case_type: 'episode' | 'movie' | 'special';
  created_at: string;
}

export default function InvestigationsPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'episode' | 'movie' | 'special'>('all');

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await fetch('/api/cases');
      if (response.ok) {
        const data = await response.json();
        setCases(data);
      }
    } catch (error) {
      console.error('Failed to fetch cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCases = filter === 'all' 
    ? cases 
    : cases.filter(case_ => case_.case_type === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const getCaseIcon = (type: string) => {
    switch (type) {
      case 'episode': return '📺';
      case 'movie': return '🎬';
      case 'special': return '⭐';
      default: return '📁';
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))' }}>
        <div className="text-center">
          <h1>Loading Cases...</h1>
        </div>
      </div>
    );
  }

  return (
    <main>
      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              variants={itemVariants}
              className="text-center"
              style={{ marginBottom: 'var(--space-xl)' }}
            >
              🔍 Case Files Database
            </motion.h1>

            <motion.div 
              variants={itemVariants}
              className="tabs"
              style={{ justifyContent: 'center', marginBottom: 'var(--space-2xl)' }}
            >
              <button
                className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Cases
              </button>
              <button
                className={`tab-btn ${filter === 'episode' ? 'active' : ''}`}
                onClick={() => setFilter('episode')}
              >
                📺 Episodes
              </button>
              <button
                className={`tab-btn ${filter === 'movie' ? 'active' : ''}`}
                onClick={() => setFilter('movie')}
              >
                🎬 Movies
              </button>
              <button
                className={`tab-btn ${filter === 'special' ? 'active' : ''}`}
                onClick={() => setFilter('special')}
              >
                ⭐ Specials
              </button>
            </motion.div>

            {filteredCases.length === 0 ? (
              <motion.div 
                variants={itemVariants}
                className="text-center"
                style={{ 
                  padding: 'var(--space-2xl)',
                  background: 'var(--glass-bg)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <p>No cases found. The mystery continues...</p>
              </motion.div>
            ) : (
              <div className="card-grid">
                {filteredCases.map((case_, index) => (
                  <motion.article
                    key={case_.id}
                    className="card"
                    variants={itemVariants}
                    custom={index}
                  >
                    <div className="card-content">
                      <div className="card-category">
                        {getCaseIcon(case_.case_type)} {case_.case_type.toUpperCase()}
                        {case_.episode_number && ` #${case_.episode_number}`}
                      </div>
                      <h3>{case_.title}</h3>
                      <p>{case_.description}</p>
                      <div style={{ 
                        fontSize: 'var(--text-xs)', 
                        opacity: 0.6,
                        marginTop: 'var(--space-md)',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span>Filed: {new Date(case_.created_at).toLocaleDateString()}</span>
                        <span className="read-more">
                          Case #{case_.id}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}