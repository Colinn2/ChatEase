// Demo chat animation and UI interactions
document.addEventListener('DOMContentLoaded', function() {
    // Demo chat animation
    const chatDemo = document.getElementById('chatDemo');
    if (chatDemo) {  // Check if element exists
        const demoMessages = [
            { type: 'user', text: "Hi ChatEase! Can you help me plan a trip to Japan?" },
            { type: 'bot', text: "Of course! I'd be happy to help you plan a trip to Japan. When are you planning to visit, and how long will your trip be?" },
            { type: 'user', text: "I'm thinking about going for 2 weeks in spring to see the cherry blossoms." },
            { type: 'bot', text: "Great choice! Cherry blossom (sakura) season is beautiful in Japan. It typically runs from late March to early April in most regions. For a 2-week trip, I recommend spending time in Tokyo, Kyoto, and Osaka with day trips to places like Nara and Hakone. Would you like a sample itinerary?" }
        ];

        let messageIndex = 0;
        let charIndex = 0;
        let currentMessageElement = null;
        let typingIndicator = null;

        function addMessage(message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${message.type}-message`;

            if (message.type === 'bot') {
                // For bot messages, start with empty content and add typing indicator
                messageDiv.textContent = '';
                typingIndicator = document.createElement('span');
                typingIndicator.className = 'typing-indicator';
                for (let i = 0; i < 3; i++) {
                    const dot = document.createElement('span');
                    typingIndicator.appendChild(dot);
                }
                messageDiv.appendChild(typingIndicator);
            } else {
                // For user messages, show full content immediately
                messageDiv.textContent = message.text;
            }

            chatDemo.appendChild(messageDiv);
            chatDemo.scrollTop = chatDemo.scrollHeight;

            if (message.type === 'bot') {
                // For bot messages, simulate typing
                currentMessageElement = messageDiv;
                charIndex = 0;
                setTimeout(typeCharacter, 800); // Wait before starting to type
            } else {
                // For user messages, proceed to next message after a delay
                setTimeout(showNextMessage, 1000);
            }
        }

        function typeCharacter() {
            const currentMessage = demoMessages[messageIndex].text;

            if (charIndex === 0) {
                // Remove typing indicator when actual text starts
                currentMessageElement.removeChild(typingIndicator);
            }

            currentMessageElement.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex < currentMessage.length) {
                // Continue typing
                const randomDelay = Math.floor(Math.random() * 30) + 20; // Random typing speed
                setTimeout(typeCharacter, randomDelay);
            } else {
                // Move to next message after completing this one
                setTimeout(showNextMessage, 1000);
            }

            chatDemo.scrollTop = chatDemo.scrollHeight;
        }

        function showNextMessage() {
            messageIndex++;
            if (messageIndex < demoMessages.length) {
                addMessage(demoMessages[messageIndex]);
            } else {
                // Restart the demo after a longer pause
                setTimeout(resetDemo, 5000);
            }
        }

        function resetDemo() {
            // Clear chat and start over
            chatDemo.innerHTML = '';
            messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            messageDiv.textContent = "Hello! I'm ChatEase, your personal AI assistant. How can I help you today?";
            chatDemo.appendChild(messageDiv);
            messageIndex = 0;
            setTimeout(() => {
                addMessage(demoMessages[0]);
            }, 1500);
        }

        // Start the demo
        setTimeout(() => {
            addMessage(demoMessages[0]);
        }, 1500);
    }

    // Handle CTA button animation
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Handle feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f0f0ff';
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '#f8f9fa';
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-btn');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.body.classList.toggle('menu-open');
        });
    }
});

// Utility function for copying text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show copied notification
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Copied to clipboard!';
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
