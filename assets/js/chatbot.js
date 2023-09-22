// Define an empty faqData object
let faqData = {};

// Function to load FAQ data from the JSON file
function loadFAQData() {
    fetch('faq.json') // Assuming the JSON file is in the same directory as your HTML
        .then(response => response.json())
        .then(data => {
            faqData = data; // Assign the loaded JSON data to the faqData object
        })
        .catch(error => {
            console.error('Error loading FAQ data:', error);
        });
}

// Function to add a user message to the chat
function addUserMessage(message) {
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = message;
    messages.appendChild(userMessage);
}

// Function to add a bot response to the chat
function addBotResponse(response) {
    const botResponse = document.createElement('div');
    botResponse.className = 'bot-response';
    botResponse.textContent = response;
    messages.appendChild(botResponse);
}

// Function to handle user input and generate bot response
function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() !== '') {
        addUserMessage(userMessage);
        if (faqData[userMessage]) {
            addBotResponse(faqData[userMessage]);
        } else {
            addBotResponse("I don't have an answer to that question.");
        }
        userInput.value = '';
    }
}

// Function to toggle the chatbox (minimize/maximize)
function toggleChatbox() {
    const chatbox = document.getElementById('chatbox');
    const chatIcon = document.getElementById('chat-icon');
    chatbox.classList.toggle('minimized');
    chatIcon.classList.toggle('minimized');
}

// Event listener for page load
window.addEventListener('DOMContentLoaded', () => {
    loadFAQData(); // Load FAQ data when the page loads
});

// Rest of your JavaScript code
