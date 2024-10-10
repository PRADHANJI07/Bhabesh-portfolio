// Menu icon toggler
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Select all sections and nav links
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

// On scroll event
window.onscroll = () => {
  // Sticky Navbar
  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // Active links functionality
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // Remove navbar and menu icon toggle when a section is clicked (optional improvement)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// dark mode
let darkModeIcon = document.querySelector("#darkMode-icon"); // Fix the name here

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle("bx-sun");
  document.body.classList.toggle("dark-mode");
};

// scroll reveal
ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 100,
});

// Reveal for multiple elements
ScrollReveal().reveal(".home-content", { origin: 'top' });
ScrollReveal().reveal(".heading", { origin: 'top' });
ScrollReveal().reveal('.home-image img, .project-box, .contact-form', { origin: 'bottom' });
ScrollReveal().reveal(".home-content h1, .about-img img", { origin: 'left' });
ScrollReveal().reveal(".home-content h3, .home-content p, .about-content", { origin: 'right' });

// form submit

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      form.reset();
      document.getElementById('form-message').innerHTML = "<p class='success'>Thank you! Your message has been sent.</p>";
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          document.getElementById('form-message').innerHTML = "<p class='error'>There was an error sending your message.</p>";
        }
      });
    }
  })
  .catch(error => {
    document.getElementById('form-message').innerHTML = "<p class='error'>There was an error sending your message.</p>";
  });
});
