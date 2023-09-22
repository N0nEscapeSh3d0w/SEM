// FAQ data in JSON format
const faqData = {
    "What is this chatbot?": "This is a simple FAQ chatbot.",
    "How can I use it?": "You can ask questions, and I will provide answers.",
    "Can you give an example?": "Sure! Ask me a question."
};

// Chatbox element references
const chatbox = document.querySelector('.chatbox');
const messages = document.querySelector('.messages');
const userInput = document.getElementById('user-input');

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

// Event listeners
document.querySelector('button').addEventListener('click', sendMessage);
document.getElementById('minimize-btn').addEventListener('click', toggleChatbox);
