document.addEventListener("DOMContentLoaded",(function(){function t(t){fetch(`/${t}.html`).then((t=>t.text())).then((e=>{document.getElementById("dynamic-content").innerHTML=e,document.querySelectorAll('link[id$="-style"]').forEach((t=>{t.disabled=!0}));const n=document.getElementById(`${t}-style`);n&&(n.disabled=!1),window.scrollTo(0,0),"faq"===t?init():cleanUpScroll(),"query"===t&&initContactForm()})).catch((t=>console.error("Error loading content:",t)))}const e=document.querySelectorAll(".links a");e.forEach((n=>{n.addEventListener("click",(function(n){n.preventDefault();t(this.getAttribute("data-page")),e.forEach((t=>t.classList.remove("active"))),this.classList.add("active")}))})),t("about")}));