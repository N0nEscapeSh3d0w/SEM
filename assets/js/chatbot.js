let chatbotOpen = false;

// Define FAQs and their answers
const faqs = [
    {
        question: "What is your company?",
        answer: "We are a tech company that specializes in AI and chatbot development."
    },
    {
        question: "How can I contact support?",
        answer: "You can contact our support team at support@example.com."
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
