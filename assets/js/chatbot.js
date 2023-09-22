let chatbotOpen = false;

// Define FAQs and their answers
const faqs = [
    {
        question: "What programmes does the Faculty of Computer Science offer for enrollment?",
        answer: "The Faculty of Computer Science offers a variety of programmes, including diploma and degree programmes. You can explore our programme offerings on our official website."
    },
    {
        question: "How can I enroll in a diploma programme in Computer Science at your faculty?",
        answer: "To enroll in a diploma programme, go to our website's diploma page and select your favourite programme from the list. After that, you can fill out the form by clicking the enroll button."
    },
    {
        question: "Do you offer refunds?",
        answer: "Yes, we offer refunds within 30 days of purchase. Please contact our support for assistance."
    },
    // Add more FAQs and answers here
];

function toggleChat() {
    const chatBody = document.getElementById('chat-body');
    const chatIcon = document.getElementById('chat-icon');
    
    chatbotOpen = !chatbotOpen;
    if (chatbotOpen) {
        chatBody.style.display = 'block';
        chatIcon.classList.add('open');
    } else {
        chatBody.style.display = 'none';
        chatIcon.classList.remove('open');
    }
}

function askQuestion() {
    const userMessage = document.getElementById('user-message').value;
    const chatContent = document.getElementById('chat-content');
    
    // User message
    chatContent.innerHTML += `
        <div class="user-message">
            <div class="message-content user">
                ${userMessage}
            </div>
        </div>
    `;
    
    // Check if the user's question matches any FAQ
    const matchedFAQ = faqs.find(faq => userMessage.toLowerCase().includes(faq.question.toLowerCase()));
    
    if (matchedFAQ) {
        // If a matching FAQ is found, display the answer
        const botResponse = matchedFAQ.answer;
        
        // Chatbot message
        chatContent.innerHTML += `
            <div class="chatbot-message">
                <div class="message-content chatbot">
                    ${botResponse}
                </div>
            </div>
        `;
    } else {
        // If no matching FAQ is found, provide a generic response
        const botResponse = "I'm sorry, I don't have the answer to that question.";
        
        // Chatbot message
        chatContent.innerHTML += `
            <div class="chatbot-message">
                <div class="message-content chatbot">
                    ${botResponse}
                </div>
            </div>
        `;
    }
    
    // Clear user's input
    document.getElementById('user-message').value = '';
    
    // Scroll to the bottom of the chat content
    chatContent.scrollTop = chatContent.scrollHeight;
}

// Initial greeting message from the chatbot
const initialGreeting = "Hello! How can I assist you today?";

// Display the initial greeting when the page loads
const chatContent = document.getElementById('chat-content');
chatContent.innerHTML += `
    <div class="chatbot-message">
        <div class="message-content chatbot">
            ${initialGreeting}
        </div>
    </div>
`;
