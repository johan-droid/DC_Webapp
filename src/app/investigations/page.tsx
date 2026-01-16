import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

export default async function InvestigationsPage() {
    const { data: cases, error } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="container">
            <header className="character-header">
                <h1>Case Files</h1>
                <p>Access the latest reports on criminal activities and special operations.</p>
            </header>

            {/* Filter controls could be added here as client component, keeping it simple simple for now */}

            <div className="card-grid">
                {(!cases || cases.length === 0) ? (
                    <p style={{ textAlign: 'center', width: '100%', color: '#aaa' }}>
                        {error ? 'System Malfunction.' : 'Accessing database... No files found.'}
                    </p>
                ) : (
                    cases.map((item: any) => (
                        <article key={item.id} className="card" data-type={item.type}>
                            <div className="card-image" style={{ position: 'relative' }}>
                                <Image
                                    src={item.image || '/assets/conan-mystery-hero.png'}
                                    alt={item.title || 'Case Image'}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="card-content">
                                <span className="card-category">{item.type?.toUpperCase() || 'FILE'}</span>
                                <h3>{item.title}</h3>
                                <p>{item.description.substring(0, 100)}...</p>
                                <a href="#" className="read-more">View Evidence →</a>
                            </div>
                        </article>
                    ))
                )}
            </div>

            <div className="disclaimer-section">
                <p>Classified Information. For Detective Use Only.</p>
            </div>
        </div>
    );
}
