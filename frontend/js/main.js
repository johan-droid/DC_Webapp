/* frontend/js/main.js */

// Global slideshow variables
let slideIndex = 1;
let autoSlideInterval;

/* Character Data & Rendering - UPDATED with stable URLs */
const mainCharactersData = [
    {
        "name": "Shinichi Kudo",
        "image": "https://www.detectiveconanworld.com/wiki/images/3/3b/Shinichi_Kudo_Profile.jpg",
        "description": "Main character of the series, and Ran's love interest. He was shrunk into a child after being forced to take APTX 4869."
    },
    {
        "name": "Conan Edogawa",
        "image": "https://www.detectiveconanworld.com/wiki/images/0/00/Conan_Edogawa_Profile.jpg",
        "description": "The child form of Shinichi Kudo. He chases the Black Organization to regain his original body while solving cases."
    },
    {
        "name": "Ran Mouri",
        "image": "https://www.detectiveconanworld.com/wiki/images/9/93/Ran_Mouri_Profile.jpg",
        "description": "Shinichi's childhood friend and love interest. She takes care of Conan and her father, unaware of Conan's true identity."
    },
    {
        "name": "Kogoro Mouri",
        "image": "https://www.detectiveconanworld.com/wiki/images/c/c5/Kogoro_Mouri_Profile.jpg",
        "description": "A private detective and Ran's father. Known as 'Sleeping Kogoro' due to Conan's help in solving cases."
    },
    {
        "name": "Ai Haibara",
        "image": "https://www.detectiveconanworld.com/wiki/images/2/23/Ai_Haibara_Profile.jpg",
        "description": "The creator of APTX 4869 who shrunk herself to escape the Black Organization. She now helps Conan."
    },
    {
        "name": "Hiroshi Agasa",
        "image": "https://www.detectiveconanworld.com/wiki/images/d/d7/Hiroshi_Agasa_Profile.jpg",
        "description": "An eccentric inventor and the first person to learn Conan's true identity. He provides Conan's gadgets."
    },
    {
        "name": "Heiji Hattori",
        "image": "https://www.detectiveconanworld.com/wiki/images/7/75/Heiji_Hattori_Profile.jpg",
        "description": "The 'Great Detective of the West' from Osaka. He is Shinichi's rival and one of his closest friends."
    },
    {
        "name": "Shuichi Akai",
        "image": "https://www.detectiveconanworld.com/wiki/images/a/a2/Shuichi_Akai_Profile.jpg",
        "description": "An FBI agent who infiltrated the Black Organization. He is a master sniper and a key ally to Conan."
    },
    {
        "name": "Kaitou Kid",
        "image": "https://www.detectiveconanworld.com/wiki/images/0/07/Kaitou_Kid_Profile.jpg",
        "description": "A phantom thief who uses magic tricks and disguises. He is a rival to Conan but often helps him."
    },
    {
        "name": "Juzo Megure",
        "image": "https://www.detectiveconanworld.com/wiki/images/1/1a/Juzo_Megure_Profile.jpg",
        "description": "A dedicated police inspector from the Tokyo Metropolitan Police District who trusts Shinichi implicitly."
    }
];

const blackOrgCharactersData = [
    {
        "name": "Gin",
        "image": "https://www.detectiveconanworld.com/wiki/images/7/77/Gin_Profile.jpg",
        "description": "A high-ranking executive member. He forced Shinichi to take the poison that shrunk him."
    },
    {
        "name": "Vodka",
        "image": "https://www.detectiveconanworld.com/wiki/images/c/c5/Vodka_Profile.jpg",
        "description": "Gin's secretary and partner. He is loyal but less intelligent than his counterpart."
    },
    {
        "name": "Vermouth",
        "image": "https://www.detectiveconanworld.com/wiki/images/4/4c/Vermouth_Profile.jpg",
        "description": "A master of disguise and a favorite of the Boss. She knows Conan's true identity but keeps it secret."
    },
    {
        "name": "Bourbon",
        "image": "https://www.detectiveconanworld.com/wiki/images/e/e8/Rei_Furuya_Profile.jpg",
        "description": "An undercover agent working within the organization. He is also known as Amuro Tooru."
    },
    {
        "name": "Kir",
        "image": "https://www.detectiveconanworld.com/wiki/images/8/85/Hidemi_Hondou_Profile.jpg",
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
        if(!autoSlideInterval) {
            autoSlideInterval = setInterval(() => plusSlides(1), 5000);
        }
    }
    
    loadQuiz();
});

/* --- Character Rendering (FIXED for Broken Images) --- */
function renderCharacters() {
    const charGrid = document.getElementById('character-grid');
    if (!charGrid) return;

    charGrid.innerHTML = '';

    const isBoTheme = document.body.classList.contains('bo-theme');
    const charactersData = isBoTheme ? blackOrgCharactersData : mainCharactersData;

    charactersData.forEach((char, index) => {
        const card = document.createElement('div');
        // Add animation class
        card.className = 'char-card animate-on-scroll'; 
        // Stagger animation
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
        charGrid.appendChild(card);
        
        // Add additional image loading handling
        const img = card.querySelector('.char-img-element');
        const placeholder = card.querySelector('.char-placeholder');
        
        if (img && placeholder) {
            // Hide placeholder initially if image is provided
            placeholder.style.display = 'none';
            
            // Show placeholder if image fails to load
            img.addEventListener('error', () => {
                img.style.display = 'none';
                placeholder.style.display = 'flex';
            });
            
            // Hide placeholder if image loads successfully
            img.addEventListener('load', () => {
                placeholder.style.display = 'none';
            });
            
            // Timeout fallback - if image takes too long, show placeholder
            setTimeout(() => {
                if (!img.complete || img.naturalHeight === 0) {
                    img.style.display = 'none';
                    placeholder.style.display = 'flex';
                }
            }, 5000); // 5 second timeout
        }
    });

    // Re-observe new elements
    document.querySelectorAll('.char-card').forEach(el => observer.observe(el));
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

    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    slides[slideIndex-1].style.display = "block";  
    if(dots.length > 0) dots[slideIndex-1].className += " active-dot";
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
    for(let b of buttons) {
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

/* --- Theme Toggle (APTX Mode) --- */
function toggleTheme() {
    document.body.classList.toggle('bo-theme');
    
    // Re-render characters to switch between Main and Black Org
    renderCharacters();
    
    // Add visual feedback or sound effect here if desired
    const btn = document.querySelector('.theme-toggle');
    if(document.body.classList.contains('bo-theme')) {
        if(btn) btn.innerText = "Return to Normal";
    } else {
        if(btn) btn.innerText = "APTX-4869 Mode";
    }
}

// Create theme toggle button
const themeBtn = document.createElement('button');
themeBtn.innerText = '💊';
themeBtn.className = 'theme-toggle';
themeBtn.title = 'APTX-4869 Mode';
themeBtn.style.cssText = "position:fixed; bottom:20px; right:20px; z-index:9999; font-size:2rem; background:none; border:none; cursor:pointer; transition: transform 0.3s ease; padding:10px; border-radius:50%; background:rgba(230,57,70,0.1); backdrop-filter:blur(10px);";
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
