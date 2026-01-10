// Global slideshow variables
let slideIndex = 1;
let autoSlideInterval;

/* Character Data & Rendering */
const mainCharactersData = [
    {
        "name": "Shinichi Kudo",
        "image": "",
        "description": "Main character of the series, and Ran's love interest and later boyfriend. He was shrunk into a child after being forced to take a drug called APTX 4869, which was created by the Black Organization."
    },
    {
        "name": "Conan Edogawa",
        "image": "",
        "description": "\"Child\" version of Shinichi Kudo. He's after the Black Organization to regain his original body. The show follows his journey and the different cases he encounters along the way."
    },
    {
        "name": "Ran Mouri",
        "image": "",
        "description": "Shinichi's childhood friend, and later his girlfriend. She doesn't know Conan's real identity. She's the one taking care of him along with her detective father, Kogoro. She is also skilled in karate."
    },
    {
        "name": "Kogoro Mouri",
        "image": "",
        "description": "Private eye and Ran's father. Separated from Eri Kisaki, Ran's mother."
    },
    {
        "name": "Ai Haibara",
        "image": "",
        "description": "Member of the Detective Boys and an adult shrunken by APTX 4869. Her former identity was a Black Organization scientist codenamed \"Sherry\", real name \"Shiho Miyano\"."
    },
    {
        "name": "Hiroshi Agasa",
        "image": "",
        "description": "Professor who creates gadgets for Conan to use. Is the best friend and the next-door neighbour of the Kudos. He was the first to know about Conan's true identity."
    },
    {
        "name": "Heiji Hattori",
        "image": "",
        "description": "Shinichi's rival detective and best friend from Osaka. Known as \"Great Detective of the West\". He's also a trained Kendo martial artist and the first to deduce Conan's true identity."
    },
    {
        "name": "Shuichi Akai",
        "image": "",
        "description": "FBI agent and rival to Gin. He faked his death to protect Kir and is currently undercover as Subaru Okiya."
    },
    {
        "name": "Kaitou Kid",
        "image": "",
        "description": "Secret identity of Kaito Kuroba. Magician and thief, also known to be \"uncatchable\"."
    },
    {
        "name": "Juzo Megure",
        "image": "",
        "description": "An inspector from the Tokyo Metropolitan Police District."
    }
];

const blackOrgCharactersData = [
    {
        "name": "Gin",
        "image": "",
        "description": "A high ranking executive member of the Black Organization. A highly intelligent and lethal assassin, he tried to kill Shinichi with APTX 4869."
    },
    {
        "name": "Vodka",
        "image": "",
        "description": "Member of the Black Organization. Gin's secretary and partner on most occasions."
    },
    {
        "name": "Vermouth",
        "image": "",
        "description": "Member of the Black Organization. She is an actress and master of disguise. Considered the Boss' \"favorite,\" and knows that Haibara and Conan are Sherry and Shinichi."
    },
    {
        "name": "Rum",
        "image": "",
        "description": "Second-in-command of the Black Organization and close aide of Karasuma. Currently disguises as Kanenori Wakita, a sushi chef, to spy on Kogoro."
    },
    {
        "name": "Bourbon (Rei Furuya)",
        "image": "",
        "description": "Undercover National Police Agency investigator working in the Black Organization. Posed as a private detective and became Kogoro Mouri's apprentice."
    },
    {
        "name": "Kir (Rena Mizunashi)",
        "image": "",
        "description": "Undercover CIA agent infiltrating the Black Organization. Works as a news anchor while gathering intelligence on the organization."
    },
    {
        "name": "Chianti",
        "image": "",
        "description": "Sniper for the Black Organization. Known for her excellent marksmanship and volatile personality. Often works with Korn."
    },
    {
        "name": "Korn",
        "image": "",
        "description": "Sniper for the Black Organization. Chianti's partner and fellow marksman. More calm and collected than his partner."
    },
    {
        "name": "Pisco",
        "image": "",
        "description": "Former member of the Black Organization. Was a company chairman who had been with the organization for 50 years before being eliminated by Gin."
    },
    {
        "name": "Renya Karasuma",
        "image": "",
        "description": "The mysterious boss of the Black Organization. A multi-billionaire who was thought to be dead but is revealed to be the mastermind behind the organization."
    }
];

function renderCharacters() {
    const charGrid = document.getElementById('character-grid');
    if (!charGrid) return;

    charGrid.innerHTML = '';

    const isBoTheme = document.body.classList.contains('bo-theme');
    const charactersData = isBoTheme ? blackOrgCharactersData : mainCharactersData;

    charactersData.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = 'char-card animate-on-scroll';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="char-image-wrapper">
                <div class="char-placeholder">${char.name.charAt(0)}</div>
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll-active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.char-card').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Detective Conan Website Loaded");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll-active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Check if slideshow exists before initializing
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        console.log("Slideshow container found:", !!slideshowContainer);
        const slides = document.getElementsByClassName("mySlides");
        console.log("Slides found:", slides.length);
        showSlides(slideIndex);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                plusSlides(-1);
            } else if (e.key === 'ArrowRight') {
                plusSlides(1);
            }
        });

        let touchStartX = 0;
        let touchEndX = 0;

        slideshowContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slideshowContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                plusSlides(1);
            }
            if (touchEndX > touchStartX + 50) {
                plusSlides(-1);
            }
        }
    } else {
        console.log("Slideshow container not found - slideshow functionality disabled");
    }

    loadQuiz();
    renderCharacters();
});

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