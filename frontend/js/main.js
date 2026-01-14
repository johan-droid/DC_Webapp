/* frontend/js/main.js */

// Global slideshow variables
let slideIndex = 1;
let autoSlideInterval;

// API Helper (Injected to support the new data fetching logic)
// API Helper is now provided by api.js (window.api)
// Ensure api.js is loaded before this script.

/* Character Data & Rendering - UPDATED with stable URLs */
const mainCharactersData = [
    {
        "name": "Shinichi Kudo",
        "image": null,
        "description": "Main character of the series, and Ran's love interest. He was shrunk into a child after being forced to take APTX 4869."
    },
    {
        "name": "Conan Edogawa",
        "image": "assets/conan-mystery-hero.png",
        "description": "The child form of Shinichi Kudo. He chases the Black Organization to regain his original body while solving cases."
    },
    {
        "name": "Ran Mouri",
        "image": null,
        "description": "Shinichi's childhood friend and love interest. She takes care of Conan and her father, unaware of Conan's true identity."
    },
    {
        "name": "Kogoro Mouri",
        "image": null,
        "description": "A private detective and Ran's father. Known as 'Sleeping Kogoro' due to Conan's help in solving cases."
    },
    {
        "name": "Ai Haibara",
        "image": null,
        "description": "The creator of APTX 4869 who shrunk herself to escape the Black Organization. She now helps Conan."
    },
    {
        "name": "Hiroshi Agasa",
        "image": null,
        "description": "An eccentric inventor and the first person to learn Conan's true identity. He provides Conan's gadgets."
    },
    {
        "name": "Heiji Hattori",
        "image": null,
        "description": "The 'Great Detective of the West' from Osaka. He is Shinichi's rival and one of his closest friends."
    },
    {
        "name": "Shuichi Akai",
        "image": null,
        "description": "An FBI agent who infiltrated the Black Organization. He is a master sniper and a key ally to Conan."
    },
    {
        "name": "Kaitou Kid",
        "image": null,
        "description": "A phantom thief who uses magic tricks and disguises. He is a rival to Conan but often helps him."
    },
    {
        "name": "Juzo Megure",
        "image": null,
        "description": "A dedicated police inspector from the Tokyo Metropolitan Police District who trusts Shinichi implicitly."
    }
];

const blackOrgCharactersData = [
    {
        "name": "Gin",
        "image": "assets/gin-villain.png",
        "description": "A high-ranking executive member. He forced Shinichi to take the poison that shrunk him."
    },
    {
        "name": "Vodka",
        "image": null,
        "description": "Gin's secretary and partner. He is loyal but less intelligent than his counterpart."
    },
    {
        "name": "Vermouth",
        "image": null,
        "description": "A master of disguise and a favorite of the Boss. She knows Conan's true identity but keeps it secret."
    },
    {
        "name": "Bourbon",
        "image": null,
        "description": "An undercover agent working within the organization. He is also known as Amuro Tooru."
    },
    {
        "name": "Kir",
        "image": null,
        "description": "An undercover CIA agent posing as a TV reporter. She relays information to the FBI."
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

document.addEventListener('DOMContentLoaded', () => {
    console.log("Detective Conan Website Loaded");

    /* --- Mobile Menu Logic --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    /* --- Initialize Animations --- */
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    document.querySelectorAll('.card-grid, .character-premium-grid').forEach(grid => observer.observe(grid));

    // Initial Character Render
    renderCharacters();

    // Check for other components
    if (document.querySelector('.slideshow-container')) {
        showSlides(slideIndex);
        if (!autoSlideInterval) {
            autoSlideInterval = setInterval(() => plusSlides(1), 5000);
        }
    }

    loadQuiz();
    loadDynamicContent();
});

/* --- Character Rendering (Updated for Separate Sections) --- */
function renderCharacters() {
    const mainGrid = document.getElementById('main-char-grid');
    const boGrid = document.getElementById('bo-char-grid');

    // Helper function to render a list into a grid
    const populateGrid = (gridElement, data) => {
        if (!gridElement) return;

        gridElement.innerHTML = '';
        data.forEach((char, index) => {
            const card = document.createElement('div');
            card.className = 'char-card animate-on-scroll';
            card.style.transitionDelay = `${index * 0.1}s`;

            card.innerHTML = `
                <div class="char-image-wrapper">
                    <div class="char-placeholder">${char.name.charAt(0)}</div>
                    ${char.image ? `<img src="${char.image}" alt="${char.name}" class="char-img-element" style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:1; border-radius: 16px 16px 0 0;" onerror="this.style.display='none'; this.parentElement.querySelector('.char-placeholder').style.display='flex';">` : ''}
                </div>
                <div class="char-content">
                    <h3 class="char-name">${char.name}</h3>
                    <div class="char-desc">
                        <p>${char.description}</p>
                    </div>
                </div>
            `;
            gridElement.appendChild(card);

            // Image handling logic
            const img = card.querySelector('.char-img-element');
            const placeholder = card.querySelector('.char-placeholder');
            if (img && placeholder) {
                placeholder.style.display = 'none';
                img.addEventListener('error', () => {
                    img.style.display = 'none';
                    placeholder.style.display = 'flex';
                });
                img.addEventListener('load', () => {
                    placeholder.style.display = 'none';
                });
            }
        });

        // Observe new elements
        gridElement.querySelectorAll('.char-card').forEach(el => observer.observe(el));
    };

    // Render both sections
    populateGrid(mainGrid, mainCharactersData);
    populateGrid(boGrid, blackOrgCharactersData);
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

/* --- Dynamic Content Loading --- */
async function loadDynamicContent() {
    // 1. Load News
    const newsContainer = document.getElementById('news-feed');
    if (newsContainer) {
        try {
            const res = await api.getNews();
            const news = res;

            if (news.length === 0) {
                newsContainer.innerHTML = '<p>No recent signals intercepted.</p>';
                return;
            }

            newsContainer.innerHTML = news.map(item => `
                <article class="card animate-on-scroll">
                    <div class="card-image" style="background-image: url('${item.image || 'assets/hero-bg.png'}');"></div>
                    <div class="card-content">
                        <span class="card-category">${item.category} • ${new Date(item.created_at).toLocaleDateString()}</span>
                        <h3>${item.title}</h3>
                        <p>${item.content.substring(0, 100)}...</p>
                        <a href="${item.link || '#'}" class="read-more">Read Full Report →</a>
                    </div>
                </article>
            `).join('');

            document.querySelectorAll('.card').forEach(el => observer.observe(el));
        } catch (err) {
            console.error('Failed to load news:', err);
            newsContainer.innerHTML = '<p style="text-align:center;">Database offline.</p>';
        }
    }

    // 2. Load Cases
    const caseContainer = document.getElementById('case-feed');
    if (caseContainer) {
        try {
            const res = await api.getCases();
            const cases = res;

            caseContainer.innerHTML = cases.map(item => `
                <article class="card animate-on-scroll" data-type="${item.type}">
                    <div class="card-image" style="background-image: url('${item.image || 'assets/conan-mystery-hero.png'}');"></div>
                    <div class="card-content">
                        <span class="card-category">${item.type.toUpperCase()}</span>
                        <h3>${item.title}</h3>
                        <p>${item.description.substring(0, 100)}...</p>
                        <a href="#" class="read-more">View Evidence →</a>
                    </div>
                </article>
            `).join('');

            document.querySelectorAll('.card').forEach(el => observer.observe(el));
        } catch (err) {
            console.error('Failed to load cases:', err);
            caseContainer.innerHTML = '<p style="text-align:center;">Restricted Access.</p>';
        }
    }
}
