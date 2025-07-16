// Lokstra Framework Website - Main JavaScript

// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active");
      }
    });
  }

  // Set active navigation link based on current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
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
