const correctUsername = "Larasani Junita";
const correctPassword = "230608";

const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const togglePassword = document.getElementById('togglePassword');

// Handle login form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === correctUsername && password === correctPassword) {
        window.location.href = "home.html"; 
    } else {
        errorMessage.style.display = 'block';
    }
});

// Toggle password visibility
togglePassword.addEventListener('click', function() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

function createFallingHeart() {
    const hearts = ["❤️", "💖", "💘", "💞", "💕"]; // Array berisi emoji hati
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Pilih emoji hati secara acak
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    // Posisi acak di seluruh layar (left dan top)
    heart.style.left = Math.random() * 100 + 'vw'; // Horizontal acak
    heart.style.top = Math.random() * 100 + 'vh';  // Vertikal acak
    // Ukuran font acak antara 20px hingga 50px
    heart.style.fontSize = (Math.random() * 30 + 20) + 'px';

    document.body.appendChild(heart);

    heart.addEventListener('animationend', () => heart.remove());
}

setInterval(createFallingHeart, 5000);
