import { supabase } from '@/lib/supabase';
import CharacterList from '@/components/CharacterList';

export const revalidate = 3600; // Revalidate every hour

export default async function CharactersPage() {
    const { data: characters, error } = await supabase
        .from('characters')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error("Error fetching characters:", error);
    }

    return (
        <div className="container">
            <header className="character-header animate-on-scroll-active">
                <h1>The Key Players</h1>
                <p>Unravel the mystery behind the faces.</p>
            </header>

            <CharacterList characters={characters || []} />

            <div className="disclaimer-section">
                <p>
                    All character data and images are sourced from <a href="https://www.detectiveconanworld.com" target="_blank">Detective Conan World</a>.
                    This content is used for informational purposes only.
                </p>
            </div>
        </div>
    );
}
