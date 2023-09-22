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
        chatIcon.innerHTML = '-';
    } else {
        chatBody.style.display = 'none';
        chatIcon.innerHTML = '+';
    }
}

function askQuestion() {
    const userMessage = document.getElementById('user-message').value;
    const chatContent = document.getElementById('chat-content');
    
    // Check if the user's question matches any FAQ
    const matchedFAQ = faqs.find(faq => userMessage.toLowerCase().includes(faq.question.toLowerCase()));
    
    if (matchedFAQ) {
        // If a matching FAQ is found, display the answer
        const botResponse = "Chatbot: " + matchedFAQ.answer;
        chatContent.innerHTML += '<p>User: ' + userMessage + '</p>';
        chatContent.innerHTML += '<p>' + botResponse + '</p>';
    } else {
        // If no matching FAQ is found, provide a generic response
        const botResponse = "Chatbot: I'm sorry, I don't have the answer to that question.";
        chatContent.innerHTML += '<p>User: ' + userMessage + '</p>';
        chatContent.innerHTML += '<p>' + botResponse + '</p>';
    }
    
    // Clear user's input
    document.getElementById('user-message').value = '';
    
    // Scroll to the bottom of the chat content
    chatContent.scrollTop = chatContent.scrollHeight;
}

// You can further enhance this script by adding more FAQs and answers as needed.
