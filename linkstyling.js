var currentPath=window.location.pathname;var navLinks=document.querySelectorAll(".bunch-of-links a");navLinks.forEach(function(t){if(t.getAttribute("href")===currentPath){t.classList.add("active")}})