function initContactForm() {
    let submitted = false;

    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return; // Safeguard: Exit if the form doesn't exist

    contactForm.addEventListener("submit", function (e) {
        if (!submitted) {
            e.preventDefault(); // Prevent the form from submitting normally

            const formElements = contactForm.querySelectorAll("*");
            formElements.forEach(element => {
                element.style.display = "none"; // Hide all elements inside the form
            });

            const thanksMessage = document.createElement("p");
            thanksMessage.textContent = "Thank you for your query!";
            contactForm.insertBefore(thanksMessage, contactForm.firstChild); // Prepend the message

            submitted = true;
            setTimeout(() => contactForm.submit(), 1000); // Submit the form after a delay
        }
    });

    document.getElementById("hidden_iframe").onload = function () {
        if (submitted) {
            submitted = false; // Reset the variable if needed
        }
    };
}

// Initialize form when content is loaded dynamically
document.addEventListener("DOMContentLoaded", initContactForm);