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
        question: "Can I transfer credits from another institution to your diploma program in Computer Science?",
        answer: "Yes, we do consider credit transfers from other recognized institutions. Contact our academic advisors for more information and to evaluate your transfer credits."
    },
    {
        question: "Where can I find the staff directory for the Faculty of Computer Science?",
        answer: "Our staff directory is available on the staff page."
    },
    {
        question: "What undergraduate degree programs are available at the Faculty of Computer Science?",
        answer: "We offer a range of undergraduate degree programs in Computer Science, including Bachelor of Science (B.Sc.) in Computer Science and related fields. You can find more information on the particular programme page."
    },
    {
        question: "How can I get in touch with the main reception or information desk of your Faculty of Computer Science?",
        answer: "The contact number and address of the TARUMT campus can be found at the bottom of the website page."
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
