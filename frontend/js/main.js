/* frontend/js/main.js */

// Global slideshow variables
let slideIndex = 1;
let autoSlideInterval;

// --- DATA CONFIGURATION ---
const mainCharactersData = [
    {
        name: "Conan Edogawa",
        image: "assets/conan-mystery-hero.png",
        description: "The child form of Shinichi Kudo. "
    },
    {
        name: "Shinichi Kudo",
        image: "assets/hero-bg.png",
        description: "The high school detective shrunk by APTX 4869."
    },
    {
        name: "Ran Mouri",
        image: null,
        description: "Shinichi's childhood friend and karate champion."
    },
    {
        name: "Kogoro Mouri",
        image: null,
        description: "Private investigator known as 'Sleeping Kogoro'."
    }
];

const blackOrgCharactersData = [
    {
        name: "Gin",
        image: "assets/gin-villain.png",
        description: "Executive member of the Black Organization."
    },
    {
        name: "Vodka",
        image: null,
        description: "Gin's partner and secretary."
    },
    {
        name: "Vermouth",
        image: null,
        description: "A master of disguise with a secret agenda."
    }
];

/* --- Animation Observer --- */
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll-active');
            if (entry.target.classList.contains('card-grid') ||
                entry.target.classList.contains('character-premium-grid')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('animate-on-scroll-active');
                });
            }
        }
    });
}, observerOptions);

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("Detective Conan System: Online");

    // 1. Setup Theme (APTX Mode)
    setupAptxSystem();

    // 2. Setup Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 3. Render Content
    renderCharacters();
    
    // 4. Load Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate-on-scroll-active');
        });
    });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});

// --- CHARACTER RENDERER ---
function renderCharacters() {
    const grid = document.getElementById('character-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    // Choose data based on theme
    const isBO = document.body.classList.contains('bo-theme');
    const data = isBO ? blackOrgCharactersData : mainCharactersData;

    data.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = 'char-card animate-on-scroll';
        card.style.transitionDelay = `${index * 0.1}s`;

        const hasImage = char.image && char.image.trim() !== '';
        
        card.innerHTML = `
            <div class="char-placeholder">${char.name.charAt(0)}</div>
            ${hasImage ? `<img src="${char.image}" alt="${char.name}" class="char-img-element">` : ''}
            <div class="char-content">
                <h3>${char.name}</h3>
                <p style="font-size: 0.85rem; margin:0; opacity:0.8;">${char.description}</p>
            </div>
        `;

        // Robust Error Handling
        if (hasImage) {
            const img = card.querySelector('img');
            img.onerror = function() {
                this.style.display = 'none';
            };
        }

        grid.appendChild(card);
    });
}


/* --- Slideshow Functions --- */
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
    if (!slides.length) return;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    slides[slideIndex - 1].style.display = "block";
    if (dots.length > 0) dots[slideIndex - 1].className += " active-dot";
}

/* --- Quiz Functions --- */
const quizData = [
    {
        question: "What is Shinichi Kudo's favorite novel?",
        options: ["Sherlock Holmes", "Agatha Christie", "Arsene Lupin", "Ellery Queen"],
        correct: 0
    },
    {
        question: "What is the name of the drug that shrunk Shinichi?",
        options: ["APTX-4869", "Silver Bullet", "Pandora", "Vermouth"],
        correct: 0
    },
    {
        question: "Who is the boss of the Black Organization?",
        options: ["Gin", "Rum", "Renya Karasuma", "Vermouth"],
        correct: 2
    }
];

function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    let quizHTML = "<h2>Detective Mystery Quiz</h2>";

    quizData.forEach((q, index) => {
        quizHTML += `
            <div class="quiz-question">
                <p>${index + 1}. ${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((opt, i) =>
            `<button class="option-btn" onclick="checkAnswer(this, ${index}, ${i})">${opt}</button>`
        ).join('')}
                </div>
                <p class="feedback" id="feedback-${index}"></p>
            </div>
        `;
    });

    quizContainer.innerHTML = quizHTML;
}

function checkAnswer(btn, questionIndex, optionIndex) {
    const feedback = document.getElementById(`feedback-${questionIndex}`);
    const correct = quizData[questionIndex].correct;

    // Reset buttons in this group
    const parent = btn.parentElement;
    const buttons = parent.getElementsByClassName('option-btn');
    for (let b of buttons) {
        b.disabled = true;
        if (b.innerText === quizData[questionIndex].options[correct]) {
            b.classList.add('correct');
        }
    }

    if (optionIndex === correct) {
        btn.classList.add('correct');
        feedback.innerText = "Correct! Great deduction.";
        feedback.style.color = "#2a9d8f";
    } else {
        btn.classList.add('wrong');
        feedback.innerText = "Incorrect. Try again next time.";
        feedback.style.color = "#e63946";
    }
}

// --- CAPSULE SYSTEM (APTX TOGGLE) ---
function setupAptxSystem() {
    // Check saved preference
    if (localStorage.getItem('theme') === 'bo-theme') {
        document.body.classList.add('bo-theme');
    }

    // Inject the Capsule HTML
    const toggle = document.createElement('div');
    toggle.className = 'aptx-toggle-container animate-on-scroll';
    toggle.innerHTML = `
        <div class="aptx-pill">
            <span class="pill-text pill-left">APTX</span>
            <span class="pill-text pill-right">4869</span>
        </div>
    `;

    // Toggle Logic
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('bo-theme');
        const isDark = document.body.classList.contains('bo-theme');
        localStorage.setItem('theme', isDark ? 'bo-theme' : 'light');
        
        // Re-render characters to switch between Conan/Gin lists
        renderCharacters();
    });

    document.body.appendChild(toggle);
}

/* --- Enhanced Image Loading with Better Fallbacks --- */
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;

        // Timeout after 3 seconds
        setTimeout(() => reject(new Error('Image load timeout')), 3000);
    });
}

async function loadDynamicContent() {
    // 1. Load News (if on news page)
    const newsContainer = document.getElementById('news-feed');
    if (newsContainer) {
        try {
            const res = await fetch('/api/news');
            const news = await res.json();

            if (news.length === 0) {
                newsContainer.innerHTML = '<p>No recent signals intercepted.</p>';
                return;
            }

            newsContainer.innerHTML = news.map(item => `
                <article class="card animate-on-scroll">
                    <div class="card-image" style="background-image: url('${item.image}');"></div>
                    <div class="card-content">
                        <span class="card-category">${item.category} • ${item.date}</span>
                        <h3>${item.title}</h3>
                        <p>${item.content}</p>
                        <a href="${item.link}" class="read-more">Read Full Report →</a>
                    </div>
                </article>
            `).join('');

            // Re-trigger animation observer for new elements
            document.querySelectorAll('.card').forEach(el => observer.observe(el));
        } catch (err) {
            console.error('Failed to load news:', err);
        }
    }

    // 2. Load Cases (if on updates page)
    const caseContainer = document.getElementById('case-feed');
    if (caseContainer) {
        try {
            const res = await fetch('/api/cases');
            const cases = await res.json();

            caseContainer.innerHTML = cases.map(item => `
                <article class="card animate-on-scroll" data-type="${item.type}">
                    <div class="card-image" style="background-image: url('${item.image}');"></div>
                    <div class="card-content">
                        <span class="card-category">${item.type.toUpperCase()} • ${item.date}</span>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <a href="#" class="read-more">View Evidence →</a>
                    </div>
                </article>
            `).join('');

            // Re-trigger animation observer
            document.querySelectorAll('.card').forEach(el => observer.observe(el));
        } catch (err) {
            console.error('Failed to load cases:', err);
        }
    }
}
