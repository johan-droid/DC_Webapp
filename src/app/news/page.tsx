"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  author?: string;
  created_at: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))' }}>
        <div className="text-center">
          <h1>Loading News...</h1>
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
              📰 Detective Conan News
            </motion.h1>

            {news.length === 0 ? (
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
                <p>No news available yet. Check back later!</p>
              </motion.div>
            ) : (
              <div className="card-grid">
                {news.map((item, index) => (
                  <motion.article
                    key={item.id}
                    className="card"
                    variants={itemVariants}
                    custom={index}
                  >
                    {item.image_url && (
                      <div className="card-image">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}

                    <div className="card-content">
                      <div className="card-category">News</div>
                      <h3>{item.title}</h3>
                      <p>{item.content}</p>
                      <div style={{
                        fontSize: 'var(--text-xs)',
                        opacity: 0.6,
                        marginTop: 'var(--space-md)',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        {item.author && <span style={{ color: '#e63946' }}>By {item.author}</span>}
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