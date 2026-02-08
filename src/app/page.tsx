"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Stagger animation variants (Performance: reduce calculations)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <main>
      {/* Hero Section with Parallax */}
      <motion.header
        ref={heroRef}
        className="hero"
        style={{ opacity: heroOpacity }}
      >
        <div className="container hero-content">
          <motion.div
            style={{ scale: heroScale }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="mystery-reveal">ONE TRUTH PREVAILS</h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              "When you have eliminated the impossible, whatever remains, however improbable,
              must be the truth."
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link href="/news" className="btn">
                Latest News
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Welcome Section */}
      <section className="section" id="welcome" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="container">
          <motion.div
            className="welcome-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-gradient"
              style={{ fontSize: 'var(--text-3xl)', textAlign: 'center', marginBottom: 'var(--space-md)' }}
              variants={itemVariants}
            >
              Welcome to the World of Detective Conan
            </motion.h2>

            <motion.p
              style={{
                textAlign: 'center',
                fontSize: 'var(--text-lg)',
                fontStyle: 'italic',
                maxWidth: '700px',
                margin: '0 auto',
                opacity: 0.9
              }}
              variants={itemVariants}
            >
              Step into the shoes of a high school detective turned child sleuth
            </motion.p>

            <motion.div
              style={{
                width: '120px',
                height: '3px',
                background: 'var(--gradient-evidence)',
                margin: 'var(--space-xl) auto'
              }}
              variants={itemVariants}
            />
          </motion.div>
        </div>
      </section>

      {/* About Section - Refined Layout */}
      <section className="section" id="about">
        <div className="container">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            style={{
              maxWidth: '1000px',
              margin: '0 auto',
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-2xl)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <motion.h2
              variants={itemVariants}
              style={{
                textAlign: 'center',
                marginBottom: 'var(--space-xl)',
                fontSize: 'var(--text-2xl)'
              }}
            >
              About Detective Conan
            </motion.h2>

            <motion.div variants={itemVariants}>
              <p style={{
                fontSize: 'var(--text-lg)',
                textAlign: 'center',
                padding: 'var(--space-lg)',
                background: 'rgba(211, 47, 47, 0.1)',
                borderLeft: '4px solid var(--detective-red)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 'var(--space-xl)'
              }}>
                <strong>Detective Conan</strong> (名探偵コナン), also known as <strong>Case Closed</strong>,
                is a Japanese detective manga series written and illustrated by Gosho Aoyama.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--detective-red)',
                marginBottom: 'var(--space-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)'
              }}>
                <span style={{
                  width: '4px',
                  height: '24px',
                  background: 'var(--detective-red)',
                  borderRadius: '2px'
                }} />
                The Story Begins
              </h3>
              <p style={{ lineHeight: '1.8', marginBottom: 'var(--space-xl)' }}>
                <strong>Shinichi Kudo</strong> is a brilliant high school detective who frequently assists the
                police in solving complex cases. During an investigation, he is ambushed by members of a crime
                syndicate known as the <strong>Black Organization</strong>. They force-feed him an experimental
                poison intended to kill him, but instead of causing death, the drug mysteriously shrinks his body
                to that of a six-year-old child.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--detective-red)',
                marginBottom: 'var(--space-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)'
              }}>
                <span style={{
                  width: '4px',
                  height: '24px',
                  background: 'var(--detective-red)',
                  borderRadius: '2px'
                }} />
                The Detective Method
              </h3>
              <p style={{ lineHeight: '1.8' }}>
                Conan's unique approach involves using Dr. Agasa's special tranquilizer watch to sedate Kogoro
                Mouri, then employing a voice-changing bowtie to present his deductions.
              </p>
            </motion.div>
          </motion.article>
        </div>
      </section>


    </main>
  );
}