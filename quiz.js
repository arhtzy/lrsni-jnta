let timer = 15;
let interval;
let attempts = 2;  // Setiap soal memiliki 2 kesempatan
let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "Apa makanan favorit Gilang?",
        answers: ["Dimsum", "Sate Taichan", "Mie Ayam", "Ayam Geprek"],
        correctAnswer: 2
    },
    {
        question: "Siapa yang lebih pintar dalam emosional?",
        answers: ["Gilang", "Larasani", "Kedua-duanya", "Gak tau"],
        correctAnswer: 1
    },
    {
        question: "Siapa yang lebih pintar dalam akademik?",
        answers: ["Gilang", "Larasani", "Kedua-duanya", "Gak tau"],
        correctAnswer: 2
    },
    {
        question: "Apa ukuran baju Gilang?",
        answers: ["XL", "L", "M", "XXL"],
        correctAnswer: 0
    },
    {
        question: "Apa warna baju favorit Gilang?",
        answers: ["Merah", "Biru", "Hijau", "Hitam"],
        correctAnswer: 3
    },
    {
        question: "Berapa lama kita sudah kenal?",
        answers: ["1 tahun", "2 tahun", "3 tahun", "4 tahun"],
        correctAnswer: 1
    },
    {
        question: "Apa arti kata 'Cinta' bagi kamu?",
        answers: ["Emosi", "Keinginan", "Komitmen", "Kesepian"],
        correctAnswer: 2
    },
    {
        question: "Siapakah tokoh cinta terkenal dalam sejarah?",
        answers: ["Romeo dan Juliet", "Bonnie dan Clyde", "Tristan dan Isolden", "Jack dan Rose"],
        correctAnswer: 1
    },
    {
        question: "Siapa yang pertama kali mengungkapkan perasaan?",
        answers: ["gilang", "laras", "keduanya", "tidak ingat"],
        correctAnswer: 0
    },
    {
        question: "Apa yang paling penting dalam hubungan?",
        answers: ["Kepercayaan", "Kekayaan", "Ketertarikan", "Cinta"],
        correctAnswer: 0
    },
    {
        question: "Berapa jarak usia antara kalian berdua?",
        answers: ["1-2 tahun", "3-5 tahun", "5-10 tahun", "lebih dari 10 tahun"],
        correctAnswer: 0
    },
    {
        question: "Bagaimana Gilang mengungkapkan rasa sayang?",
        answers: ["Memberi hadiah", "Menghabiskan waktu bersama", "Menyentuh dengan lembut", "Melalui kata-kata"],
        correctAnswer: 0
    },
    {
        question: "Kapan kamu pertama kali jatuh cinta?",
        answers: ["Saat pertama kali bertemu", "Setelah mengenal lebih dalam", "Ketika merasa nyaman", "Tidak tahu"],
        correctAnswer: 1
    },
    {
        question: "Apa yang paling membuat Gilang bahagia?",
        answers: ["Waktu berkualitas", "Pencapaian besar", "Bersama orang tersayang", "Kebebasan"],
        correctAnswer: 2
    },
    {
        question: "Bagaimana cara terbaik mengatasi masalah dalam hubungan?",
        answers: ["Menghindar", "Berbicara dengan jujur", "Berdiam diri", "Mencari solusi bersama"],
        correctAnswer: 1
    },
    {
        question: "Kapan kita jadian?",
        answers: ["23-12-22", "23-06-21", "23-12-23", "20-02-06"],
        correctAnswer: 0
    }
];

const timeDisplay = document.getElementById('time');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const questionDisplay = document.getElementById('question');
const answerOptions = document.getElementById('answer-options');
const progress = document.getElementById('progress');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');
const badge = document.getElementById('badge');

// Function to start the timer
function startTimer() {
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            timeDisplay.textContent = timer;
        } else {
            clearInterval(interval);
            showFeedback("Waktu habis!", false);
            nextQuestion();
        }
    }, 1000);
}

// Function to load questions
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionDisplay.textContent = question.question;
    answerOptions.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');
        answerDiv.textContent = answer;
        answerDiv.onclick = () => checkAnswer(index === question.correctAnswer);
        answerOptions.appendChild(answerDiv);
    });

    updateProgress();
    timer = 15;
    timeDisplay.textContent = timer;
    startTimer();
}

// Function to update the progress bar
function updateProgress() {
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progress.style.width = `${progressPercentage}%`;
}

// Function to check if the selected answer is correct
function checkAnswer(isCorrect) {
    clearInterval(interval);
    if (attempts <= 0) return;

    if (isCorrect) {
        score++;
        showFeedback('Benar! 💖', true);
        setTimeout(() => {
            nextQuestion();
        }, 2000);
    } else {
        attempts--;
        attemptsDisplay.textContent = attempts;
        if (attempts > 0) {
            showFeedback('Salah! 😢 Coba lagi!', false);
        } else {
            showFeedback('Salah! 😢 Kesempatan habis!', false);
            setTimeout(() => {
                nextQuestion();
            }, 2000);
        }
    }
}

// Function to show feedback messages with fade effect
function showFeedback(message, isCorrect) {
    feedback.textContent = message;
    feedback.className = isCorrect ? 'correct' : 'wrong';
    feedback.style.opacity = '1';    // Set to fully visible
    feedback.style.display = 'block'; // Make sure it is displayed

    // Hide feedback after 2 seconds with fade-out effect
    setTimeout(() => {
        feedback.style.opacity = '0'; // Set to fully transparent
        setTimeout(() => {
            feedback.style.display = 'none'; // Hide after transition
        }, 300); // Add delay for transition
    }, 2000);
}

// Function to load the next question
function nextQuestion() {
    currentQuestionIndex++;
    attempts = 2;  // Reset attempts
    attemptsDisplay.textContent = attempts;
    loadQuestion();
}

// Function to show the results
function showResults() {
    document.querySelector('.quiz-container').style.display = 'none';
    resultContainer.style.display = 'block';
    scoreText.textContent = `Skor Anda: ${score} dari ${questions.length}`;
    if (score > 3) {
        badge.style.display = 'block';
    }
}

// Function to share results to WhatsApp
function shareToWhatsApp() {
    const message = `Saya mendapat skor ${score} dari ${questions.length} di quiz romantis ini!`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Function to share results to Instagram
function shareToInstagram() {
    const message = `Saya mendapat skor ${score} dari ${questions.length} di quiz romantis ini!`;
    const url = `https://www.instagram.com/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Function to restart the quiz
function restartQuiz() {
    score = 0;
    attempts = 2;
    currentQuestionIndex = 0;
    document.querySelector('.result-container').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    loadQuestion();
}
// Function to navigate to pesan.html
function goToMessagePage() {
    window.location.href = "pesan.html";
}
loadQuestion();

