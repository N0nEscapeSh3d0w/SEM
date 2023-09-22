let chatbotOpen = false;

function toggleChat() {
    const chatBody = document.getElementById('chat-body');
    const chatIcon = document.getElementById('chat-icon');
    
    chatbotOpen = !chatbotOpen;
    if (chatbotOpen) {
        chatBody.style.display = 'block';
        chatIcon.innerHTML = '-';
    } else {
        chatBody.style.display = 'none';
        chatIcon.innerHTML = '+';
    }
}

function askQuestion() {
    const userMessage = document.getElementById('user-message').value;
    const chatContent = document.getElementById('chat-content');
    
    // You can implement the chatbot's response logic here
    // For simplicity, let's assume the chatbot responds immediately
    const botResponse = "Chatbot: You asked: " + userMessage;
    
    // Display user's question and chatbot's response
    chatContent.innerHTML += '<p>User: ' + userMessage + '</p>';
    chatContent.innerHTML += '<p>' + botResponse + '</p>';
    
    // Clear user's input
    document.getElementById('user-message').value = '';
    
    // Scroll to the bottom of the chat content
    chatContent.scrollTop = chatContent.scrollHeight;
}

// You can further enhance this script by adding more chatbot functionality and interactions.
