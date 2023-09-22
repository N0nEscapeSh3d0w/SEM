let chatbotOpen = false;

let faqs = []; // Array to store FAQs

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

// Fetch FAQs from the JSON file
fetch('./faqs.json')
    .then(response => response.json())
    .then(data => {
        faqs = data; // Store FAQs in the 'faqs' array
    })
    .catch(error => {
        console.error('Error fetching FAQs:', error);
    });
