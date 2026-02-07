"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SmartImage from '@/components/SmartImage';

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
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setNews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setNews([]); // Set empty array on error to prevent undefined issues
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
          <div className="card-grid" style={{ marginTop: 'var(--space-2xl)' }}>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card skeleton" style={{ height: '350px' }} />
            ))}
          </div>
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
                  <Link href={`/news/${item.id}`} key={item.id} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    <motion.article
                      className="card"
                      variants={itemVariants}
                      custom={index}
                    >
                      <div className="card-image">
                        <SmartImage
                          src={item.image_url}
                          alt={item.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      <div className="card-content">
                        <div className="card-category">News</div>
                        <h3>{item.title}</h3>
                        <p>{item.content.substring(0, 150)}...</p>
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
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}