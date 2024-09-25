document.addEventListener('DOMContentLoaded', function () {
    // Function to load the content dynamically
    function loadContent(page) {
        fetch(`/${page}.html`)
            .then(response => response.text())
            .then(data => {
                const contentElement = document.getElementById('dynamic-content');
                contentElement.innerHTML = data;

                // Disable all page-specific stylesheets
                document.querySelectorAll('link[id$="-style"]').forEach(link => {
                    link.disabled = true;
                });

                // Enable the current page's stylesheet
                const activeStyle = document.getElementById(`${page}-style`);
                if (activeStyle) {
                    activeStyle.disabled = false;
                }

                // Reset scroll position
                window.scrollTo(0, 0); // Reset to the top of the page

                // Apply scroll behavior only for the faq page
                if (page === 'faq') {
                    init(); // Initialize scroll.js logic for faq page
                } else {
                    cleanUpScroll(); // Clean up scroll behavior on non-faq pages
                }

                // Check if the contact page is loaded and reinitialize the form
                if (page === 'query') {
                    initContactForm(); // Initialize the form when the query page is loaded
                }
            })
            .catch(error => console.error('Error loading content:', error));
    }

    // Add event listeners to navigation links
    const links = document.querySelectorAll('.links a');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadContent(page);

            // Optionally, update the active class for the clicked link
            links.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Load initial content (default page)
    loadContent('about');
});