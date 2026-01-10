// Global slideshow variables
let slideIndex = 1;
let autoSlideInterval;

/* Character Data & Rendering */
const mainCharactersData = [
    {
        "name": "Shinichi Kudo",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/3/3b/Shinichi_Kudo_Profile.jpg",
        "description": "Main character of the series, and Ran's love interest. He was shrunk into a child after being forced to take APTX 4869."
    },
    {
        "name": "Conan Edogawa",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/0/00/Conan_Edogawa_Profile.jpg",
        "description": "The child form of Shinichi Kudo. He chases the Black Organization to regain his original body while solving cases."
    },
    {
        "name": "Ran Mouri",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/9/93/Ran_Mouri_Profile.jpg",
        "description": "Shinichi's childhood friend and love interest. She takes care of Conan and her father, unaware of Conan's true identity."
    },
    {
        "name": "Kogoro Mouri",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/c/c5/Kogoro_Mouri_Profile.jpg",
        "description": "A private detective and Ran's father. Known as 'Sleeping Kogoro' due to Conan's help in solving cases."
    },
    {
        "name": "Ai Haibara",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/2/23/Ai_Haibara_Profile.jpg",
        "description": "The creator of APTX 4869 who shrunk herself to escape the Black Organization. She now helps Conan."
    },
    {
        "name": "Hiroshi Agasa",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/d/d7/Hiroshi_Agasa_Profile.jpg",
        "description": "An eccentric inventor and the first person to learn Conan's true identity. He provides Conan's gadgets."
    },
    {
        "name": "Heiji Hattori",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/7/75/Heiji_Hattori_Profile.jpg",
        "description": "The 'Great Detective of the West' from Osaka. He is Shinichi's rival and one of his closest friends."
    },
    {
        "name": "Shuichi Akai",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/a/a2/Shuichi_Akai_Profile.jpg",
        "description": "An FBI agent who infiltrated the Black Organization. He is a master sniper and a key ally to Conan."
    },
    {
        "name": "Kaitou Kid",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/0/07/Kaitou_Kid_Profile.jpg",
        "description": "A phantom thief who uses magic tricks and disguises. He is a rival to Conan but often helps him."
    },
    {
        "name": "Juzo Megure",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/1/1a/Juzo_Megure_Profile.jpg",
        "description": "A dedicated police inspector from Tokyo Metropolitan Police District who trusts Shinichi implicitly."
    }
];

const blackOrgCharactersData = [
    {
        "name": "Gin",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/8/8c/Gin_Profile.jpg",
        "description": "A high-ranking executive member. He forced Shinichi to take the poison that shrunk him."
    },
    {
        "name": "Vodka",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/0/06/Vodka_Profile.jpg",
        "description": "Gin's secretary and partner. He is loyal but less intelligent than his counterpart."
    },
    {
        "name": "Vermouth",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/8/87/Vermouth_Profile.jpg",
        "description": "A master of disguise and a favorite of the Boss. She knows Conan's true identity but keeps it secret."
    },
    {
        "name": "Bourbon",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/a/a6/Rei_Furuya_Profile.jpg",
        "description": "An undercover agent working within the organization. He is also known as Amuro Tooru."
    },
    {
        "name": "Kir",
        "image": "https://static.wikia.nocookie.net/detectiveconan/images/4/4b/Rena_Mizunashi_Profile.jpg",
        "description": "An undercover CIA agent posing as a TV reporter. She relays information to the FBI."
    }
];

/* --- 1. Enhanced Animation Observer --- */
const observerOptions = {
    threshold: 0.15, // Trigger slightly later for better effect
    rootMargin: "0px 0px -50px 0px" // Trigger before element hits very bottom
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll-active');
            
            // If it's a grid container, stagger's children
            if (entry.target.classList.contains('card-grid') || 
                entry.target.classList.contains('character-premium-grid')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`; // Stagger delay
                    child.classList.add('animate-on-scroll-active');
                });
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    console.log("Detective Conan Website Loaded");

    /* --- 2. Mobile Menu Logic --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    /* --- 3. Initialize Animations --- */
    // Observe all elements with the class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Also observe grids to trigger children
    document.querySelectorAll('.card-grid, .character-premium-grid').forEach(grid => {
        observer.observe(grid);
    });

    // Initial Character Render
    renderCharacters();
    
    // Check for other components
    if (document.querySelector('.slideshow-container')) {
        showSlides(slideIndex);
        // ... (Include your slideshow event listeners here)
    }
    
    loadQuiz();
});

/* --- 4. Character Rendering --- */
function renderCharacters() {
    const charGrid = document.getElementById('character-grid');
    if (!charGrid) return;

    charGrid.innerHTML = '';

    // Check theme
    const isBoTheme = document.body.classList.contains('bo-theme');
    const charactersData = isBoTheme ? blackOrgCharactersData : mainCharactersData;

    charactersData.forEach((char, index) => {
        const card = document.createElement('div');
        // Add 'animate-on-scroll' class to individual cards so they fade in
        card.className = 'char-card animate-on-scroll'; 
        
        // Use a placeholder if image is empty string
        const bgStyle = char.image ? `background-image: url('${char.image}'); background-size: cover;` : '';

        card.innerHTML = `
            <div class="char-image-wrapper" style="${bgStyle}">
                ${!char.image ? `<div class="char-placeholder">${char.name.charAt(0)}</div>` : ''}
            </div>
            <div class="char-content">
                <h3 class="char-name">${char.name}</h3>
                <div class="char-desc">
                    <p>${char.description}</p>
                </div>
            </div>
        `;
        charGrid.appendChild(card);
    });

    // Re-observe new elements
    document.querySelectorAll('.char-card').forEach(el => observer.observe(el));
}

/* --- 5. Quiz Functions --- */
const questions = [
    {
        question: "What is the name of the drug that shrank Shinichi Kudo?",
        options: ["APTX-4869", "Silver Bullet", "Pandora", "Vermouth"],
        answer: 0
    },
    {
        question: "Which gadget does Conan use to mimic voices?",
        options: ["Stun-Gun Wristwatch", "Voice-Changing Bowtie", "Turbo Engine Skateboard", "Criminal Tracking Glasses"],
        answer: 1
    },
    {
        question: "What is the email address of the Black Organization boss?",
        options: ["The Seven Children", "Nanatsu no Ko", "Boss@dark.net", "Unknown"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
    const quizContainer = document.getElementById('detective-test');
    if (!quizContainer) return;

    const q = questions[currentQuestion];
    document.getElementById('quiz-question').innerText = `Case #${currentQuestion + 1}: ${q.question}`;

    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'option-btn';
        btn.onclick = () => checkAnswer(index, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    const q = questions[currentQuestion];
    const options = document.querySelectorAll('.option-btn');

    options.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.answer) {
        btnElement.classList.add('correct');
        score++;
    } else {
        btnElement.classList.add('wrong');
        options[q.answer].classList.add('correct');
    }

    document.getElementById('next-btn').style.display = 'inline-block';
}

document.getElementById('next-btn')?.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuiz();
        document.getElementById('next-btn').style.display = 'none';
    } else {
        document.querySelector('.quiz-container').innerHTML = `<h3>Investigation Complete!</h3><p>Score: ${score}/${questions.length}</p>`;
    }
});

/* --- 6. Slideshow Functions --- */
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    console.log("showSlides called with n:", n);
    console.log("Slides found:", slides.length);
    console.log("Dots found:", dots.length);

    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    slides[slideIndex - 1].style.display = "block";

    if (dots.length > 0) {
        dots[slideIndex - 1].className += " active-dot";
    }

    console.log("Showing slide:", slideIndex - 1);
}

/* --- 7. Theme Toggle --- */
const themeBtn = document.createElement('button');
themeBtn.innerText = '💊';
themeBtn.className = 'theme-toggle';
themeBtn.title = 'APTX-4869 Mode';
themeBtn.style.cssText = "position:fixed; bottom:20px; right:20px; z-index:9999; font-size:2rem; background:none; border:none; cursor:pointer; transition: transform 0.3s ease;";
document.body.appendChild(themeBtn);

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'bo-theme') {
    document.body.classList.add('bo-theme');
    themeBtn.style.transform = 'rotate(180deg)';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('bo-theme');

    if (document.body.classList.contains('bo-theme')) {
        localStorage.setItem('theme', 'bo-theme');
        themeBtn.style.transform = 'rotate(180deg)';
    } else {
        localStorage.removeItem('theme');
        themeBtn.style.transform = 'rotate(0deg)';
    }

    renderCharacters();
});

/* --- 8. Filter Functions --- */
function filterEpisodes(type) {
    const cards = document.querySelectorAll('.card-grid .card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        if (btn.innerText.toLowerCase().includes(type === 'all' ? 'all' : type)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    cards.forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 50);
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}
