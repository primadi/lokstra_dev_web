// Lokstra Framework Website - Main JavaScript

// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation functionality
  function initMobileNav() {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navOverlay = document.querySelector(".nav-overlay");
    const body = document.body;

    if (navToggle && navLinks) {
      // Toggle mobile menu
      navToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
      });

      // Close menu when clicking on overlay
      if (navOverlay) {
        navOverlay.addEventListener("click", () => {
          closeMobileMenu();
        });
      }

      // Close mobile menu when clicking on a link
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
          closeMobileMenu();
        });
      });

      // Close menu with escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeMobileMenu();
        }
      });

      function toggleMobileMenu() {
        const isActive = navLinks.classList.contains("active");
        if (isActive) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      }

      function openMobileMenu() {
        navLinks.classList.add("active");
        if (navOverlay) navOverlay.classList.add("active");
        body.classList.add("menu-open");

        // Update hamburger icon
        navToggle.innerHTML = "✕";
      }

      function closeMobileMenu() {
        navLinks.classList.remove("active");
        if (navOverlay) navOverlay.classList.remove("active");
        body.classList.remove("menu-open");

        // Reset hamburger icon
        navToggle.innerHTML = "☰";
      }

      // Ensure menu is closed on window resize
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          closeMobileMenu();
        }
      });
    }
  }

  // Initialize mobile nav after a small delay to ensure navbar is loaded
  setTimeout(initMobileNav, 100);

  // Set active navigation link based on current page (with delay for navbar loading)
  setTimeout(() => {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks_a = document.querySelectorAll(".nav-links a");

    navLinks_a.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (
        href === currentPage ||
        (currentPage === "" && href === "index.html") ||
        (currentPage === "index.html" && href === "index.html") ||
        (currentPage === "about.html" && href === "about.html") ||
        (currentPage === "architecture.html" && href === "architecture.html") ||
        (currentPage === "blog.html" && href === "blog.html")
      ) {
        link.classList.add("active");
      }
    });
  }, 200);
});

// Utility function to load meta tags
async function loadMetaTags(baseMeta, pageMeta) {
  try {
    // Load base meta tags first
    const baseResponse = await fetch(baseMeta);
    if (baseResponse.ok) {
      const baseMetaHTML = await baseResponse.text();
      document.head.insertAdjacentHTML("afterbegin", baseMetaHTML);
    }

    // Then load page-specific meta tags
    const pageResponse = await fetch(pageMeta);
    if (pageResponse.ok) {
      const pageMetaHTML = await pageResponse.text();
      document.head.insertAdjacentHTML("afterbegin", pageMetaHTML);
    }
  } catch (error) {
    console.warn(`Error loading meta tags:`, error);
  }
}

// Utility function to load HTML content
async function loadHTML(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (response.ok) {
      const html = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = html;
      }
    } else {
      console.warn(`Could not load ${filePath}`);
    }
  } catch (error) {
    console.warn(`Error loading ${filePath}:`, error);
  }
}
