// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================

// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll(".section, .hero-section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});
// ========================================
// CLOSE MENU ON OUTSIDE CLICK
// ========================================
document.addEventListener("click", (event) => {
  // Check if the menu is currently open
  const isMenuOpen = navMenu.classList.contains("active");

  // Check if the click happened OUTSIDE the menu and OUTSIDE the hamburger button
  const clickedOutsideMenu = !navMenu.contains(event.target);
  const clickedOutsideToggle = !navToggle.contains(event.target);

  // If the menu is open and the user clicked outside of it, close it!
  if (isMenuOpen && clickedOutsideMenu && clickedOutsideToggle) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Trigger the animation when it enters the screen
      entry.target.classList.add("visible");
    } else {
      // Reset the animation when it leaves the screen
      entry.target.classList.remove("visible");
    }
  });
}, observerOptions);

// Add fade-in class to elements
const animatedElements = document.querySelectorAll(
  ".about-content, .experience-card, .skill-category, .education-card, .project-card, .contact-content",
);

animatedElements.forEach((el) => {
  el.classList.add("fade-in");
  observer.observe(el);
});

// ========================================
// SKILLS PROGRESS BARS ANIMATION
// ========================================
const skillsSection = document.querySelector(".skills-section");

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkills();
      } else {
        resetSkills(); // Instantly resets them to 0 when out of view
      }
    });
  },
  { threshold: 0.3 },
);

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

function animateSkills() {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    setTimeout(() => {
      bar.style.width = progress + "%";
    }, 200);
  });
}

function resetSkills() {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    bar.style.width = "0"; // Pulls the bar back to the start
  });
}
// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ========================================
// CONTACT FORM HANDLING
// ========================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // Here you would typically send the data to a server
    console.log("Form submitted:", formData);

    // Show success message
    alert("Thank you for your message! I will get back to you soon.");

    // Reset form
    contactForm.reset();
  });
}

// ========================================
// TYPING EFFECT FOR HERO TITLE (Optional)
// ========================================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Uncomment below to enable typing effect
// const heroName = document.querySelector('.title-name');
// if (heroName) {
//     const originalText = heroName.textContent;
//     typeWriter(heroName, originalText, 80);
// }

// ========================================
// CURSOR EFFECT (Optional)
// ========================================
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const delay = 0.1;
  cursorX += (mouseX - cursorX) * delay;
  cursorY += (mouseY - cursorY) * delay;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  requestAnimationFrame(animateCursor);
}

// Uncomment to enable custom cursor
// animateCursor();

// ========================================
// PARALLAX EFFECT FOR HERO SHAPES
// ========================================
const heroShapes = document.querySelectorAll(".hero-shape");

window.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  heroShapes.forEach((shape, index) => {
    const speed = (index + 1) * 20;
    const x = (mouseX - 0.5) * speed;
    const y = (mouseY - 0.5) * speed;

    shape.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// ========================================
// DARK MODE TOGGLE (ANIMATED SWITCH)
// ========================================
const darkModeCheckbox = document.getElementById("dark_mode_checkbox");

function toggleDarkMode(e) {
  // Check if triggered by the event listener or manual page load
  const isDarkMode = e ? e.target.checked : darkModeCheckbox.checked;

  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  // Save preference
  localStorage.setItem("darkMode", isDarkMode);
}

// Check for saved preference on load
window.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    // Ensure the switch slider moves to the correct position on load
    if (darkModeCheckbox) {
      darkModeCheckbox.checked = true;
    }
  }
});

// Listen for the switch being toggled
if (darkModeCheckbox) {
  darkModeCheckbox.addEventListener("change", toggleDarkMode);
}
// ========================================
// CONSOLE LOG
// ========================================
console.log("Resume Website Loaded Successfully! ");
