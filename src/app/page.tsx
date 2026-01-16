"use client";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main>
      <header className="hero">
        <div className="container hero-content">
          <h1 className="mystery-reveal">ONE TRUTH PREVAILS</h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            "When you have eliminated the impossible, whatever remains, however improbable,
            must be the truth."
          </motion.p>
          <Link href="/investigations" className="btn animate-on-scroll">
            View Case Files
          </Link>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="welcome-section" id="welcome">
        <div className="container">
          <motion.div
            className="welcome-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="welcome-title">Welcome to the World of Detective Conan</h2>
            <p className="welcome-subtitle">Step into the shoes of a high school detective turned child sleuth</p>
            <div className="welcome-divider"></div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <motion.article
            className="about-article"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="article-title">About Detective Conan</h2>

            <div className="article-content">
              <p className="article-intro">
                <strong>Detective Conan</strong> (名探偵コナン, Meitantei Konan), also known as <strong>Case
                  Closed</strong> in English-speaking countries,
                is a Japanese detective manga series written and illustrated by Gosho Aoyama.
              </p>

              <h3 className="article-heading">The Story Begins</h3>
              <p className="article-text">
                <strong>Shinichi Kudo</strong> is a brilliant high school detective who frequently assists the
                police in solving complex cases.
                During an investigation, he is ambushed by members of a crime syndicate known as the
                <strong>Black Organization</strong>.
                They force-feed him an experimental poison intended to kill him, but instead of causing death,
                the drug mysteriously shrinks his body to that of a six-year-old child.
              </p>

              <h3 className="article-heading">The Detective Method</h3>
              <p className="article-text">
                Conan's unique approach involves using Dr. Agasa's special tranquilizer watch to sedate Kogoro
                Mouri, then employing a voice-changing bowtie to present his deductions.
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Latest Investigations
          </motion.h2>
          <motion.p
            style={{ maxWidth: '600px', margin: '0 auto 2rem auto' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Explore the complete database of canon episodes, movies, and special cases. The truth is hidden in the files.
          </motion.p>
          <Link href="/investigations" className="btn">
            Open Case Database
          </Link>
        </div>
      </section>

      {/* Characters Teaser */}
      <section className="section character-section" id="characters">
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Key Characters
          </motion.h2>
          <motion.p
            style={{ marginBottom: '2rem' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Meet the detectives, friends, and foes of the Detective Conan universe.
          </motion.p>
          <Link href="/characters" className="btn">
            View All Characters
          </Link>
        </div>
      </section>
    </main>
  );
}
