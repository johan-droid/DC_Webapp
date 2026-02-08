export interface Character {
    id: string;
    name: string;
    japaneseName?: string;
    aliases?: string[];
    voiceActor?: string;
    affiliation: string;
    role: string;
    status: 'Alive' | 'Deceased' | 'Unknown';
    knowsConanIdentity: string;
    romanticLink?: string;
    relationships: string;
    description: string;
    image?: string;
    colorTheme?: string; // Hex code for accent
}

export interface CharacterGroup {
    id: string;
    title: string;
    description: string;
    characters: Character[];
}

export const characterGroups: CharacterGroup[] = [
    {
        id: 'police',
        title: 'Japanese Police & PSB',
        description: 'The guardians of justice in Japan, ranging from the Tokyo MPD to the Public Security Bureau.',
        characters: [
            {
                id: 'megure',
                name: 'Jūzō Megure',
                affiliation: 'Tokyo MPD',
                role: 'Inspector',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Veteran MPD officer',
                description: 'A stern but fatherly Inspector of the Tokyo Metropolitan Police. He wears his hat at all times to hide an old scar.',
                colorTheme: '#d35400'
            },
            {
                id: 'takagi',
                name: 'Wataru Takagi',
                affiliation: 'Tokyo MPD',
                role: 'Detective',
                status: 'Alive',
                knowsConanIdentity: 'Partial',
                romanticLink: 'Miho Sato',
                relationships: 'Trusted junior officer',
                description: 'A gentle and sometimes clumsy detective. He has a strong sense of justice and is in a romantic relationship with Sato.',
                colorTheme: '#7f8c8d'
            },
            {
                id: 'sato',
                name: 'Miho Sato',
                affiliation: 'Tokyo MPD',
                role: 'Detective',
                status: 'Alive',
                knowsConanIdentity: 'No',
                romanticLink: 'Wataru Takagi',
                relationships: 'Highly respected',
                description: 'The "Madonna" of the police force. Tough, smart, and attractive, she is highly respected by her peers.',
                colorTheme: '#e74c3c'
            },
            {
                id: 'shiratori',
                name: 'Ninzaburō Shiratori',
                affiliation: 'Tokyo MPD',
                role: 'Inspector',
                status: 'Alive',
                knowsConanIdentity: 'No',
                romanticLink: 'Sumiko Kobayashi',
                relationships: 'Elite background',
                description: 'An elite inspector from a wealthy family. Initially arrogant, he later finds his true love in Kobayashi-sensei.',
                colorTheme: '#3498db'
            },
            {
                id: 'chiba',
                name: 'Kazunobu Chiba',
                affiliation: 'Tokyo MPD',
                role: 'Detective',
                status: 'Alive',
                knowsConanIdentity: 'No',
                romanticLink: 'Naeko Miike',
                relationships: 'Childhood friends',
                description: 'A kind-hearted detective who loves food. He reunites with his childhood love, Naeko Miike.',
                colorTheme: '#27ae60'
            },
            {
                id: 'miike',
                name: 'Naeko Miike',
                affiliation: 'Tokyo MPD',
                role: 'Traffic Officer',
                status: 'Alive',
                knowsConanIdentity: 'No',
                romanticLink: 'Kazunobu Chiba',
                relationships: 'Romantic arc',
                description: 'Chiba\'s childhood friend and first love. She joined the traffic division to be close to him.',
                colorTheme: '#f1c40f'
            },
            {
                id: 'ayanokoji',
                name: 'Ayanokoji Fumimaro',
                affiliation: 'Kyoto Police',
                role: 'Inspector',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Owns pet squirrel',
                description: 'An inspector from Kyoto Prefecture Police, known for his polite demeanor and his pet squirrel.',
                colorTheme: '#8e44ad'
            },
            {
                id: 'yamato',
                name: 'Kansuke Yamato',
                affiliation: 'Nagano Police',
                role: 'Inspector',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Lost eye in avalanche',
                description: 'A scary-looking inspector from Nagano with a scarred eye and a cane. Extremely sharp.',
                colorTheme: '#2c3e50'
            },
            {
                id: 'morofushi_takaaki',
                name: 'Taka’aki Morofushi',
                affiliation: 'Nagano Police',
                role: 'Inspector',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Brother of Scotch',
                description: 'Known as "Komei". A brilliant strategist who speaks in metaphors and is the brother of Hiromitsu.',
                colorTheme: '#8e44ad'
            },
            {
                id: 'uehara',
                name: 'Yui Uehara',
                affiliation: 'Nagano Police',
                role: 'Officer',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Formerly married',
                description: 'A childhood friend and subordinate of Yamato. She returned to the force after her husband\'s death.',
                colorTheme: '#d35400'
            },
            {
                id: 'toyama_ginshiro',
                name: 'Ginshiro Toyama',
                affiliation: 'Osaka Police',
                role: 'Superintendent',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Heiji’s father’s friend',
                description: 'The head of the Osaka Prefectural Police Criminal Investigation Department. Kazuha\'s father.',
                colorTheme: '#2c3e50'
            },
            {
                id: 'furuya',
                name: 'Rei Furuya / Amuro Tōru',
                affiliation: 'PSB / NPA',
                role: 'Undercover Agent',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Operates as Bourbon',
                description: 'A triple agent working for the PSB. Infiltrates the Black Organization as "Bourbon" and works at Café Poirot.',
                colorTheme: '#e67e22'
            },
            {
                id: 'kazami',
                name: 'Yuya Kazami',
                affiliation: 'PSB',
                role: 'Officer',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Amuro’s subordinate',
                description: 'A PSB officer and Furuya\'s direct subordinate.',
                colorTheme: '#95a5a6'
            },
            {
                id: 'scotch',
                name: 'Hiromitsu Morofushi / Scotch',
                affiliation: 'PSB',
                role: 'Undercover Agent',
                status: 'Deceased',
                knowsConanIdentity: 'Yes',
                relationships: 'Younger Morofushi brother',
                description: 'Furuya\'s childhood friend and fellow PSB agent who infiltrated the Black Organization. Deceased.',
                colorTheme: '#bdc3c7'
            }
        ]
    },
    {
        id: 'foreign_intel',
        title: 'Foreign Law Enforcement & Intelligence',
        description: 'International agencies like the FBI, CIA, and MI6 operating within Japan.',
        characters: [
            {
                id: 'akai',
                name: 'Shūichi Akai',
                affiliation: 'FBI',
                role: 'Sniper / Agent',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                romanticLink: 'Akemi Miyano (deceased)',
                relationships: 'Akai family',
                description: 'The FBI\'s ace sniper, known as the "Silver Bullet". Disguised as Subaru Okiya.',
                colorTheme: '#c0392b'
            },
            {
                id: 'jodie',
                name: 'Jodie Starling',
                affiliation: 'FBI',
                role: 'Agent',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Vermouth target',
                description: 'An FBI agent who posed as an English teacher. Seeking revenge against Vermouth.',
                colorTheme: '#9b59b6'
            },
            {
                id: 'james',
                name: 'James Black',
                affiliation: 'FBI',
                role: 'Supervisor',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Senior agent',
                description: 'The head of the FBI team in Japan. Calm and experienced.',
                colorTheme: '#34495e'
            },
            {
                id: 'camel',
                name: 'Andre Camel',
                affiliation: 'FBI',
                role: 'Agent',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Loyal but clumsy',
                description: 'FBI agent with excellent driving skills and physical strength.',
                colorTheme: '#7f8c8d'
            },
            {
                id: 'kir',
                name: 'Hidemi Hondō / Kir',
                affiliation: 'CIA',
                role: 'Undercover Agent',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Daughter of Eisuke’s father',
                description: 'CIA agent undercover in the Black Organization as TV reporter Rena Mizunashi.',
                colorTheme: '#2980b9'
            },
            {
                id: 'mary',
                name: 'Mary Sera',
                affiliation: 'MI6 (Former)',
                role: 'Intelligence Agent',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Mother of Masumi',
                description: 'The "Sister from Outside the Domain", shrunk by APTX 4869. MI6 agent.',
                colorTheme: '#f39c12'
            }
        ]
    },
    {
        id: 'detectives',
        title: 'Detectives & Investigator Civilians',
        description: 'Private eyes and brilliant minds who operate outside the police force.',
        characters: [
            {
                id: 'conan',
                name: 'Shinichi Kudō / Conan Edogawa',
                affiliation: 'Civilian',
                role: 'Detective',
                status: 'Alive',
                knowsConanIdentity: 'Self',
                romanticLink: 'Ran Mōri',
                relationships: 'Son of Yusaku & Yukiko',
                description: 'The protagonist. High school detective shrunk into a child.',
                colorTheme: '#1e3799'
            },
            {
                id: 'kogoro',
                name: 'Kogorō Mōri',
                affiliation: 'Private Detective',
                role: 'Detective',
                status: 'Alive',
                knowsConanIdentity: 'No',
                romanticLink: 'Eri Kisaki',
                relationships: 'Estranged marriage',
                description: 'Former police officer turned private eye. "Sleeping Kogoro".',
                colorTheme: '#2c3e50'
            },
            {
                id: 'heiji',
                name: 'Heiji Hattori',
                affiliation: 'Civilian',
                role: 'Detective',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                romanticLink: 'Kazuha Tōyama',
                relationships: 'Osaka rival',
                description: 'The "Great Detective of the West". Shinichi\'s rival and best friend.',
                colorTheme: '#16a085'
            },
            {
                id: 'masumi',
                name: 'Masumi Sera',
                affiliation: 'Civilian',
                role: 'Detective',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Akai family',
                description: 'High school detective and Jeet Kune Do practitioner. Akai\'s sister.',
                colorTheme: '#d35400'
            }
        ]
    },
    {
        id: 'civilians',
        title: 'Ordinary Civilians',
        description: 'Friends, family, and those caught in the crossfire.',
        characters: [
            {
                id: 'ran',
                name: 'Ran Mōri',
                affiliation: 'Civilian',
                role: 'Student / Karate',
                status: 'Alive',
                knowsConanIdentity: 'No',
                romanticLink: 'Shinichi Kudō',
                relationships: 'Mōri family',
                description: 'Shinichi\'s childhood friend and karate champion.',
                colorTheme: '#e84393'
            },
            {
                id: 'sonoko',
                name: 'Sonoko Suzuki',
                affiliation: 'Suzuki Group',
                role: 'Student',
                status: 'Alive',
                knowsConanIdentity: 'No',
                romanticLink: 'Makoto Kyōgoku',
                relationships: 'Wealthy heiress',
                description: 'Ran\'s best friend and a wealthy heiress.',
                colorTheme: '#f1c40f'
            },
            {
                id: 'makoto',
                name: 'Makoto Kyōgoku',
                affiliation: 'Civilian',
                role: 'Karate Champion',
                status: 'Alive',
                knowsConanIdentity: 'No',
                romanticLink: 'Sonoko Suzuki',
                relationships: 'Undefeated fighter',
                description: 'The "Prince of Kicks". Karate champion and Sonoko\'s boyfriend.',
                colorTheme: '#c0392b'
            },
            {
                id: 'eri',
                name: 'Eri Kisaki',
                affiliation: 'Civilian',
                role: 'Lawyer',
                status: 'Alive',
                knowsConanIdentity: 'No',
                romanticLink: 'Kogorō Mōri',
                relationships: 'Ran’s mother',
                description: 'A brilliant lawyer known as the "Queen of the Courtroom".',
                colorTheme: '#8e44ad'
            },
            {
                id: 'shiro_suzuki',
                name: 'Shiro Suzuki',
                affiliation: 'Suzuki Group',
                role: 'Chairman',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Sonoko’s father',
                description: 'Chairman of the Suzuki plutocrat. A mild-mannered man.',
                colorTheme: '#f39c12'
            },
            {
                id: 'tomoko_suzuki',
                name: 'Tomoko Suzuki',
                affiliation: 'Suzuki Group',
                role: 'Socialite',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Sonoko’s mother',
                description: 'Wife of Shiro Suzuki. Strong-willed and protective of Sonoko.',
                colorTheme: '#e67e22'
            },
            {
                id: 'jirokichi',
                name: 'Jirokichi Suzuki',
                affiliation: 'Suzuki Group',
                role: 'Advisor',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Obsessed with KID',
                description: 'Sonoko\'s uncle. Obsessed with catching Kaitō Kid to make headlines.',
                colorTheme: '#d35400'
            }
        ]
    },
    {
        id: 'school_life',
        title: 'School & Daily-Life Characters',
        description: 'Teachers and the Detective Boys.',
        characters: [
            {
                id: 'wakasa',
                name: 'Wakasa Rumi',
                affiliation: 'Teitan Elementary',
                role: 'Vice-Teacher',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Suspicious background',
                description: 'Clumsy assistant homeroom teacher with a hidden, dangerous side.',
                colorTheme: '#2c3e50'
            },
            {
                id: 'kobayashi',
                name: 'Sumiko Kobayashi',
                affiliation: 'Teitan Elementary',
                role: 'Homeroom Teacher',
                status: 'Alive',
                knowsConanIdentity: 'No',
                romanticLink: 'Ninzaburō Shiratori',
                relationships: 'Gentle personality',
                description: 'The Detective Boys\' homeroom teacher. Shiratori\'s childhood love.',
                colorTheme: '#27ae60'
            },
            {
                id: 'ayumi',
                name: 'Ayumi Yoshida',
                affiliation: 'Student',
                role: 'Detective Boys',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Child',
                description: 'Cheerful member of the Detective Boys.',
                colorTheme: '#ff7675'
            },
            {
                id: 'mitsuhiko',
                name: 'Mitsuhiko Tsuburaya',
                affiliation: 'Student',
                role: 'Detective Boys',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Intellectual',
                description: 'Analytical member of the Detective Boys.',
                colorTheme: '#e67e22'
            },
            {
                id: 'genta',
                name: 'Genta Kojima',
                affiliation: 'Student',
                role: 'Detective Boys',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Loud leader',
                description: 'Self-proclaimed leader of the Detective Boys. Loves eels.',
                colorTheme: '#d35400'
            }
        ]
    },
    {
        id: 'kaito_group',
        title: 'Kaitō Kid & Related Characters',
        description: 'The world of the Phantom Thief.',
        characters: [
            {
                id: 'kid',
                name: 'Kaitō Kid / Kaitō Kuroba',
                affiliation: 'Phantom Thief',
                role: 'Thief / Magician',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                romanticLink: 'Aoko Nakamori',
                relationships: 'Son of Toichi',
                description: 'The elusive Phantom Thief Kid. A high school magician.',
                colorTheme: '#ecf0f1'
            },
            {
                id: 'toichi',
                name: 'Toichi Kuroba',
                affiliation: 'Magician',
                role: 'Former Phantom Thief',
                status: 'Deceased',
                knowsConanIdentity: 'No',
                relationships: 'Original KID',
                description: 'The original Kaitō Kid and Kaito\'s father. A world-renowned magician.',
                colorTheme: '#bdc3c7'
            },
            {
                id: 'chikage',
                name: 'Chikage Kuroba',
                affiliation: 'Civilian',
                role: 'KID’s Mother',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Former thief',
                description: 'Kaito\'s mother and the former Phantom Lady.',
                colorTheme: '#e84393'
            },
            {
                id: 'nakamori',
                name: 'Ginzo Nakamori',
                affiliation: 'Tokyo MPD',
                role: 'Inspector',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Aoko’s father',
                description: 'Inspector dedicated to catching Kaitō Kid.',
                colorTheme: '#c0392b'
            },
            {
                id: 'aoko',
                name: 'Aoko Nakamori',
                affiliation: 'Civilian',
                role: 'Student',
                status: 'Alive',
                knowsConanIdentity: 'No',
                romanticLink: 'Kaitō Kuroba',
                relationships: 'Childhood friend',
                description: 'Kaito\'s childhood friend and Inspector Nakamori\'s daughter.',
                colorTheme: '#3498db'
            }
        ]
    },
    {
        id: 'black_org',
        title: 'Black Organization',
        description: 'The main antagonists of the series.',
        characters: [
            {
                id: 'gin',
                name: 'Gin',
                affiliation: 'Black Organization',
                role: 'Executive',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Primary antagonist',
                description: 'A cold-blooded executive who transformed Shinichi.',
                colorTheme: '#2c3e50'
            },
            {
                id: 'vodka',
                name: 'Vodka',
                affiliation: 'Black Organization',
                role: 'Operative',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Gin’s partner',
                description: 'Gin\'s loyal subordinate.',
                colorTheme: '#2c3e50'
            },
            {
                id: 'vermouth',
                name: 'Vermouth',
                affiliation: 'Black Organization',
                role: 'Operative',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Secret protector',
                description: 'A master of disguise. She protects Conan and Ran.',
                colorTheme: '#8e44ad'
            },
            {
                id: 'rum',
                name: 'Rum',
                affiliation: 'Black Organization',
                role: 'Second-in-Command',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Multiple identities',
                description: 'The Organization\'s Number 2.',
                colorTheme: '#c0392b'
            },
            {
                id: 'sherry',
                name: 'Shiho Miyano / Sherry',
                affiliation: 'BO (Former)',
                role: 'Scientist',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Haibara',
                description: 'The creator of APTX 4869. Now living as Ai Haibara.',
                colorTheme: '#8e44ad'
            },
            {
                id: 'atsushi',
                name: 'Atsushi Miyano',
                affiliation: 'Black Organization',
                role: 'Scientist',
                status: 'Deceased',
                knowsConanIdentity: 'Yes',
                romanticLink: 'Elena Miyano',
                relationships: 'Shiho’s father',
                description: 'The "Mad Scientist". Shiho and Akemi\'s father.',
                colorTheme: '#95a5a6'
            },
            {
                id: 'elena',
                name: 'Elena Miyano',
                affiliation: 'Black Organization',
                role: 'Scientist',
                status: 'Deceased',
                knowsConanIdentity: 'Yes',
                romanticLink: 'Atsushi Miyano',
                relationships: 'Shiho’s mother',
                description: 'The "Hell\'s Angel". Shiho and Akemi\'s mother.',
                colorTheme: '#95a5a6'
            },
            {
                id: 'akemi',
                name: 'Akemi Miyano',
                affiliation: 'Civilian',
                role: '—',
                status: 'Deceased',
                knowsConanIdentity: 'Yes',
                romanticLink: 'Shūichi Akai',
                relationships: 'Shiho’s sister',
                description: 'Shiho\'s older sister. Killed by Gin.',
                colorTheme: '#e74c3c'
            },
            {
                id: 'curacao',
                name: 'Curacao',
                affiliation: 'BO (Movie)',
                role: 'Operative',
                status: 'Deceased',
                knowsConanIdentity: 'Yes',
                relationships: 'Movie-only',
                description: 'A member with heterochromia and unique memory capabilities. (Movie 20)',
                colorTheme: '#bdc3c7'
            },
            {
                id: 'irish',
                name: 'Irish',
                affiliation: 'BO (Movie)',
                role: 'Operative',
                status: 'Deceased',
                knowsConanIdentity: 'Yes',
                relationships: 'Movie-only',
                description: 'Discovered Conan\'s identity but was killed by Chianti. (Movie 13)',
                colorTheme: '#2c3e50'
            },
            {
                id: 'pinga',
                name: 'Pinga',
                affiliation: 'BO (Movie)',
                role: 'Operative',
                status: 'Deceased',
                knowsConanIdentity: 'Yes',
                relationships: 'Movie-only',
                description: 'A Rum confidant who rivaled Gin. (Movie 26)',
                colorTheme: '#c0392b'
            }
        ]
    }
];
