-- News table for storing news articles
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cases table for storing investigation cases
CREATE TABLE IF NOT EXISTS cases (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    episode_number INTEGER,
    case_type VARCHAR(20) CHECK (case_type IN ('episode', 'movie', 'special')) DEFAULT 'episode',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cases_type ON cases(case_type);
CREATE INDEX IF NOT EXISTS idx_cases_episode ON cases(episode_number);

-- Insert sample data
INSERT INTO news (title, content, image_url) VALUES
('Welcome to Detective Conan Database', 'The official Detective Conan case files and news database is now live! Stay updated with the latest mysteries and investigations.', NULL),
('New Movie Announcement', 'Detective Conan Movie 27 has been officially announced! Get ready for another thrilling mystery adventure.', NULL);

INSERT INTO cases (title, description, episode_number, case_type) VALUES
('The Moonlight Sonata Murder Case', 'A mysterious murder case involving Beethoven''s Moonlight Sonata. Conan must solve the puzzle before more victims fall.', 11, 'episode'),
('The Skyscraper Bombing Case', 'A series of bombings targeting skyscrapers in Tokyo. The culprit seems to have a personal vendetta against a famous architect.', NULL, 'movie'),
('The Phantom of Baker Street', 'A virtual reality game turns deadly when players start dying in real life. Conan enters the game to solve the mystery.', NULL, 'movie');