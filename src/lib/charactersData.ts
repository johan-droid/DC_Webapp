export interface Character {
    id: string;
    name: string;
    japaneseName?: string;
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
                description: 'A stern but fatherly Inspector of the Tokyo Metropolitan Police. He wears his hat at all times to hide an old scar. He relies heavily on Shinichi/Conan to solve difficult cases.',
                colorTheme: '#d35400' // Orange-ish
            },
            {
                id: 'takagi',
                name: 'Wataru Takagi',
                affiliation: 'Tokyo MPD',
                role: 'Detective',
                status: 'Alive',
                knowsConanIdentity: 'Partial (Suspects intelligence)',
                romanticLink: 'Miho Sato',
                relationships: 'Trusted junior officer',
                description: 'A gentle and sometimes clumsy detective. He has a strong sense of justice and is in a romantic relationship with Sato. He often lets Conan investigate crime scenes.',
                colorTheme: '#7f8c8d' // Grey
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
                description: 'The "Madonna" of the police force. Tough, smart, and attractive, she is highly respected by her peers. She has a tragic past involving the loss of a partner.',
                colorTheme: '#e74c3c' // Red
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
                description: 'An elite inspector from a wealthy family. Initially arrogant and a rival to Takagi for Sato\'s affection, he later finds his true love in Kobayashi-sensei.',
                colorTheme: '#3498db' // Blue
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
                description: 'A kind-hearted and slightly chubby detective who loves food. He is Takagi\'s friend and supports his relationship with Sato.',
                colorTheme: '#27ae60' // Green
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
                description: 'Chiba\'s childhood friend and first love. She joined the traffic division to be close to him, though he took a long time to recognize her.',
                colorTheme: '#f1c40f' // Yellow
            },
            {
                id: 'furuya',
                name: 'Rei Furuya / Amuro Tōru',
                affiliation: 'PSB / NPA',
                role: 'Undercover Agent',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Operates as Bourbon',
                description: 'A triple agent working for the National Police Agency Security Bureau. He infiltrates the Black Organization as "Bourbon" and works at Café Poirot as Amuro. A brilliant detective and rival to Akai.',
                colorTheme: '#e67e22' // Bourbon color
            },
            {
                id: 'kazami',
                name: 'Yuya Kazami',
                affiliation: 'PSB',
                role: 'Officer',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Amuro\'s subordinate',
                description: 'A Public Security Bureau officer and Furuya\'s direct subordinate. He handles the dirty work and logistics for Furuya.',
                colorTheme: '#95a5a6'
            },
            {
                id: 'scotch',
                name: 'Hiromitsu Morofushi / Scotch',
                affiliation: 'PSB',
                role: 'Undercover Agent',
                status: 'Deceased',
                knowsConanIdentity: 'Yes (implied)',
                relationships: 'Younger Morofushi brother',
                description: 'Furuya\'s childhood friend and fellow PSB agent who infiltrated the Black Organization. He committed suicide to protect his identity, an event Furuya blames Akai for.',
                colorTheme: '#bdc3c7'
            },
            {
                id: 'yamato',
                name: 'Kansuke Yamato',
                affiliation: 'Nagano Police',
                role: 'Inspector',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Lost eye in avalanche',
                description: 'A scary-looking inspector from Nagano with a scarred eye and a cane. Despite his appearance, he is extremely sharp and values Conan\'s input.',
                colorTheme: '#2c3e50'
            },
            {
                id: 'morofushi_takaaki',
                name: 'Taka\'aki Morofushi',
                affiliation: 'Nagano Police',
                role: 'Inspector',
                status: 'Alive',
                knowsConanIdentity: 'No (High suspicion)',
                relationships: 'Brother of Scotch',
                description: 'Known as "Komei" after the brilliant strategist Zhuge Liang. He is refined, speaks in metaphors, and is incredibly perceptive.',
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
                description: 'A childhood friend and subordinate of Yamato. She briefly left the force to marry but returned after her husband\'s death.',
                colorTheme: '#d35400'
            }
        ]
    },
    {
        id: 'fbi_cia',
        title: 'Foreign Intelligence (FBI/CIA/MI6)',
        description: 'International agencies operating covertly in Japan to take down the Black Organization.',
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
                description: 'The FBI\'s ace sniper, known as the "Silver Bullet". He faked his death and disguised himself as Subaru Okiya to protect Haibara.',
                colorTheme: '#c0392b' // Dark Red
            },
            {
                id: 'jodie',
                name: 'Jodie Starling',
                affiliation: 'FBI',
                role: 'Agent',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Vermouth target',
                description: 'An FBI agent who posed as an English teacher at Teitan High. She has a personal vendetta against Vermouth for killing her parents.',
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
                description: 'The head of the FBI team in Japan. A calm and experienced leader who trusts Conan\'s intellect.',
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
                description: 'An FBI agent with excellent driving skills and physical strength, though he can be a bit clumsy in delicate situations.',
                colorTheme: '#7f8c8d'
            },
            {
                id: 'kir',
                name: 'Hidemi Hondō / Kir',
                affiliation: 'CIA',
                role: 'Undercover Agent',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Daughter of Eisuke\'s father',
                description: 'A CIA agent undercover in the Black Organization as the TV reporter Rena Mizunashi. She provides critical intel to the FBI.',
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
                description: 'The "Sister from Outside the Domain". She was shrunk by APTX 4869 and is hiding with her daughter Masumi.',
                colorTheme: '#f39c12'
            }
        ]
    },
    {
        id: 'detectives',
        title: 'Detectives & Investigators',
        description: 'The brilliant minds who solve the impossible cases.',
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
                description: 'The protagonist. A high school detective shrunk into a child. He uses his gadgets and intellect to solve cases while hunting the Black Organization.',
                colorTheme: '#1e3799' // Iconic Blue
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
                description: 'A former police officer turned private eye. Known as "Sleeping Kogoro" because Conan knocks him out to solve use him as a mouthpiece.',
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
                description: 'The "Great Detective of the West" from Osaka. A master swordsman and Shinichi\'s best friend/rival who knows his secret.',
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
                description: 'A tomboyish high school detective and practitioner of Jeet Kune Do. She is Akai\'s younger sister and is trying to find a cure for her mother.',
                colorTheme: '#d35400'
            }
        ]
    },
    {
        id: 'civilians',
        title: 'Civilians & Friends',
        description: 'Ordinary people caught up in extraordinary mysteries.',
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
                description: 'Shinichi\'s childhood friend and love interest. She is a karate champion with a strong heart, often protecting Conan.',
                colorTheme: '#e84393' // Pink
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
                description: 'Ran\'s best friend and a wealthy heiress. She loves chasing boys until she met Makoto. Conan often uses her as a backup deduction mouthpiece.',
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
                description: 'The "Prince of Kicks". An impossibly strong karate champion who is shy around girls but fiercely protective of Sonoko.',
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
                relationships: 'Ran\'s mother',
                description: 'A brilliant lawyer known as the "Queen of the Courtroom". She is separated from Kogoro but still cares for him deep down.',
                colorTheme: '#8e44ad'
            },
            {
                id: 'agasa',
                name: 'Hiroshi Agasa',
                affiliation: 'Civilian',
                role: 'Inventor',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Shinichi\'s neighbor',
                description: 'An eccentric inventor who aids Conan with gadgets like the Stun-Gun Watch and Voice-Changing Bowtie.',
                colorTheme: '#f39c12'
            },
            {
                id: 'haibara',
                name: 'Ai Haibara / Shiho Miyano',
                affiliation: 'Civilian (Former BO)',
                role: 'Scientist',
                status: 'Alive',
                knowsConanIdentity: 'Yes',
                relationships: 'Creator of APTX',
                description: 'The creator of the APTX 4869 poison who took it to escape the Black Organization. She lives with Agasa and is Conan\'s partner in crime.',
                colorTheme: '#8e44ad'
            }
        ]
    },
    {
        id: 'kids',
        title: 'Detective Boys',
        description: 'The junior detective league solving local mysteries.',
        characters: [
            {
                id: 'ayumi',
                name: 'Ayumi Yoshida',
                affiliation: 'Student',
                role: 'Detective Boys',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Crush on Conan',
                description: 'A sweet and innocent member of the Detective Boys. She has a crush on Conan and often gets into trouble.',
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
                description: 'The smartest actual child in the group. He likes science and logic, often helping with deductions.',
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
                description: 'The self-proclaimed leader of the Detective Boys. He loves eels and is the muscle of the group.',
                colorTheme: '#d35400'
            }
        ]
    },
    {
        id: 'kaito',
        title: 'Kaitō Kid & Associates',
        description: 'The Phantom Thief and his circle.',
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
                description: 'A magician thief who steals gems to find the Pandora Gem. He is a rival to Conan but sometimes assists him.',
                colorTheme: '#ecf0f1' // White
            },
            {
                id: 'nakamori',
                name: 'Ginzo Nakamori',
                affiliation: 'Tokyo MPD',
                role: 'Inspector',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Aoko\'s father',
                description: 'An inspector obsessed with catching Kaitō Kid. He has been chasing him for decades.',
                colorTheme: '#c0392b'
            }
        ]
    },
    {
        id: 'black_org',
        title: 'The Black Organization',
        description: 'The main antagonists. A shadowy syndicate shrouded in mystery.',
        characters: [
            {
                id: 'gin',
                name: 'Gin',
                affiliation: 'Black Organization',
                role: 'Executive',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Primary antagonist',
                description: 'A cold-blooded executive who gave Shinichi the poison. He drives a Porsche 356A and kills without hesitation.',
                colorTheme: '#2c3e50' // Black/Grey
            },
            {
                id: 'vodka',
                name: 'Vodka',
                affiliation: 'Black Organization',
                role: 'Operative',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Gin\'s partner',
                description: 'Gin\'s loyal subordinate. He is less intelligent but physically imposing and handles logistics.',
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
                description: 'A master of disguise and a favorite of "That Person" (the boss). She knows Conan\'s identity but keeps it a secret.',
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
                description: 'The second-in-command of the organization. He has one artificial eye and operates under the guise of Kanenori Wakita.',
                colorTheme: '#c0392b'
            },
            {
                id: 'chianti',
                name: 'Chianti',
                affiliation: 'Black Organization',
                role: 'Sniper',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Partner of Korn',
                description: 'A skilled sniper with a butterfly tattoo. She is bloodthirsty and hates Vermouth.',
                colorTheme: '#8e44ad'
            },
            {
                id: 'korn',
                name: 'Korn',
                affiliation: 'Black Organization',
                role: 'Sniper',
                status: 'Alive',
                knowsConanIdentity: 'No',
                relationships: 'Partner of Chianti',
                description: 'A stoic sniper who rarely speaks. He is usually paired with Chianti.',
                colorTheme: '#2c3e50'
            }
        ]
    }
];
