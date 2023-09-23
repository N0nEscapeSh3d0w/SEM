// Select all toggle buttons
const toggleButtons = document.querySelectorAll('.toggle-button');

// Add click event listeners to toggle buttons
toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Toggle the visibility of the answer section
        const answer = button.parentElement.nextElementSibling;
        answer.classList.toggle('hidden');
        
        // Change the button text from "+" to "-" or vice versa
        button.textContent = button.textContent === '+' ? '-' : '+';
    });
});



