import { supabase } from '@/lib/supabaseClient';

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
                            <div className="card-image" style={{ backgroundImage: `url('${item.image || '/assets/conan-mystery-hero.png'}')` }}></div>
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
