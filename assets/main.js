// Lokstra Framework Website - Main JavaScript

// Global variables
// (removed mobileNavInitialized flag as it was causing issues)

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

// Mobile navigation functionality
function initMobileNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.querySelector(".nav-overlay");
  const body = document.body;

  if (!navToggle || !navLinks) {
    console.warn("Nav elements not found, retrying...");
    return;
  }

  // Remove existing event listeners if they exist
  if (navToggle._clickHandler) {
    navToggle.removeEventListener("click", navToggle._clickHandler);
  }

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
    navToggle.innerHTML = "✕";
  }

  function closeMobileMenu() {
    navLinks.classList.remove("active");
    if (navOverlay) navOverlay.classList.remove("active");
    body.classList.remove("menu-open");
    navToggle.innerHTML = "☰";
  }

  // Create click handler and store reference for removal
  navToggle._clickHandler = function (e) {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
  };

  // Toggle mobile menu
  navToggle.addEventListener("click", navToggle._clickHandler);

  // Close menu when clicking on overlay
  if (navOverlay) {
    navOverlay.addEventListener("click", () => {
      closeMobileMenu();
    });
  }

  // Close menu with escape key (only add once)
  if (!document._escapeHandler) {
    document._escapeHandler = function (e) {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };
    document.addEventListener("keydown", document._escapeHandler);
  }

  // Close menu when clicking on a link and handle SPA navigation
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // Only handle internal links (not external)
      const href = link.getAttribute("href");
      if (href && !href.startsWith("http")) {
        e.preventDefault();
        closeMobileMenu();
        spaNavigate(href);
      } else {
        // For external links, just close the menu
        closeMobileMenu();
      }
    });
  });

  // Ensure menu is closed on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  console.log("Mobile navigation initialized");
}

// SPA navigation: load page content and update history (supports hash routing)
async function spaNavigate(route, isPopState) {
  // Normalize route from hash or href
  let page = route
    .replace(/^\/?(partials\/)?/, "")
    .replace(/\/.*/, "")
    .replace("#", "")
    .replace("?", "");

  let isHome = false;
  if (
    !page ||
    page === "" ||
    page === "index.html" ||
    page === "/" ||
    page === "home"
  ) {
    page = "index.html";
    isHome = true;
  }
  if (!page.endsWith(".html")) page += ".html";

  // Load navbar, footer, and content (meta tags are static in index.html)
  await loadHTML("navbar-container", "./assets/navbar.html");
  await loadHTML("footer-container", "./assets/footer.html");

  // Always load content from partials
  if (isHome) {
    await loadHTML("main-content", "./partials/home.html");
  } else {
    await loadHTML("main-content", `./partials/${page}`);
  }

  // Re-initialize mobile nav after navbar is loaded
  setTimeout(initMobileNav, 100);

  // Trigger animations after content is loaded
  setTimeout(triggerAnimations, 150);

  // Reinitialize Prism syntax highlighting
  setTimeout(initPrismHighlighting, 200);

  // Update active nav link
  setTimeout(() => {
    setActiveNavigation(page, isHome);
  }, 200);

  // Update hash if not popstate
  if (!isPopState) {
    if (isHome) {
      window.location.hash = "";
    } else {
      window.location.hash = page.replace(".html", "");
    }
  }

  // Reinitialize Prism.js syntax highlighting
  initPrismHighlighting();
}

// Function to trigger animations
function triggerAnimations() {
  try {
    // Reset and trigger section animations
    const sections = document.querySelectorAll("section");
    sections.forEach((section, index) => {
      // Ensure content is always visible first
      section.style.opacity = "1";
      section.style.visibility = "visible";

      // Add animation class if available
      if (section.classList) {
        section.classList.add("fade-in-up");
        // Apply staggered delay
        section.style.animationDelay = `${0.1 + index * 0.15}s`;
      }
    });

    // Ensure main content container is visible
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.style.opacity = "1";
      mainContent.style.visibility = "visible";
    }
  } catch (error) {
    console.warn(
      "Animation trigger failed, but content should remain visible:",
      error
    );
    // Fallback: ensure all content is visible
    const allSections = document.querySelectorAll(
      "section, main, #main-content"
    );
    allSections.forEach((el) => {
      if (el) {
        el.style.opacity = "1";
        el.style.visibility = "visible";
      }
    });
  }
}

// Function to reinitialize Prism.js syntax highlighting
function initPrismHighlighting() {
  // Check if Prism is available
  if (typeof Prism !== "undefined") {
    // Re-highlight all code blocks
    // eslint-disable-next-line no-undef
    Prism.highlightAll();
    console.log("Prism syntax highlighting reinitialized");
  } else {
    console.warn("Prism.js not available");
  }
}

// Initialize the website
async function initWebsite() {
  // Load navbar and footer first
  await loadHTML("navbar-container", "./assets/navbar.html");
  await loadHTML("footer-container", "./assets/footer.html");

  // Check for hash routing
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (hash) {
    // Load specific page from hash
    await spaNavigate(hash, true);
  } else {
    // Load home page by default (meta tags already static in index.html)
    await loadHTML("main-content", "./partials/home.html");
  }

  // Initialize mobile navigation
  setTimeout(initMobileNav, 100);

  // Initialize language switcher
  setTimeout(initLanguageSwitcher, 150);

  // Trigger animations for initial load
  setTimeout(triggerAnimations, 150);

  // Initialize Prism syntax highlighting for initial load
  setTimeout(initPrismHighlighting, 200);

  // Initialize visitor counter
  setTimeout(initVisitorCounter, 250);
}

// Hash-based routing: load correct partial on hash change
window.addEventListener("hashchange", function () {
  const hash = window.location.hash.replace(/^#\/?/, "");
  spaNavigate(hash, true);
});

// Make initMobileNav global for external calls
window.initMobileNav = initMobileNav;

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", initWebsite);

// Listen for hash changes to update active navigation
window.addEventListener("hashchange", () => {
  const currentHash = window.location.hash.replace("#", "");
  const isHome = !currentHash || currentHash === "";
  const currentPage = currentHash ? currentHash + ".html" : "index.html";

  setActiveNavigation(currentPage, isHome);
});

// Listen for popstate (back/forward button)
window.addEventListener("popstate", () => {
  const currentHash = window.location.hash.replace("#", "");
  const isHome = !currentHash || currentHash === "";
  const currentPage = currentHash ? currentHash + ".html" : "index.html";

  setActiveNavigation(currentPage, isHome);
});

// Set active navigation link based on current page/hash
function setActiveNavigation(currentPage, isHome) {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    if (!href) return;

    // Handle home page
    if (isHome && (href === "index.html" || href === "./" || href === "/")) {
      link.classList.add("active");
      return;
    }

    // Handle other pages - use hash-based detection
    const currentHash = window.location.hash.replace("#", "");
    const pageFromHref = href.replace(".html", "").replace("./", "");

    if (currentHash && currentHash === pageFromHref) {
      link.classList.add("active");
    } else if (
      !currentHash &&
      !isHome &&
      currentPage &&
      href.includes(currentPage)
    ) {
      link.classList.add("active");
    }
  });
}

// Set active navigation link based on current page (with delay for navbar loading)
setTimeout(() => {
  const currentHash = window.location.hash.replace("#", "");
  const isHome = !currentHash || currentHash === "";
  const currentPage = currentHash ? currentHash + ".html" : "index.html";

  setActiveNavigation(currentPage, isHome);
}, 500);

// Language switcher functionality
function initLanguageSwitcher() {
  // Handle both desktop and mobile language switches
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = btn.getAttribute("data-lang");
      if (lang) {
        // Update active state for all lang buttons
        document
          .querySelectorAll(".lang-btn")
          .forEach((b) => b.classList.remove("active"));
        document
          .querySelectorAll(`[data-lang="${lang}"]`)
          .forEach((b) => b.classList.add("active"));

        // Store preference
        // eslint-disable-next-line no-undef
        localStorage.setItem("preferred-language", lang);

        // Close mobile menu if open
        closeMobileMenu();

        // Could implement actual language switching here
        console.log(`Language switched to: ${lang}`);
      }
    });
  });

  // Set initial language from localStorage or default to 'en'
  // eslint-disable-next-line no-undef
  const savedLang = localStorage.getItem("preferred-language") || "en";
  document
    .querySelectorAll(`[data-lang="${savedLang}"]`)
    .forEach((btn) => btn.classList.add("active"));
}

// Utility function to close mobile menu
function closeMobileMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.querySelector(".nav-overlay");
  const body = document.body;

  if (navToggle && navLinks && navOverlay) {
    navToggle.classList.remove("active");
    navLinks.classList.remove("active");
    navOverlay.classList.remove("active");
    body.classList.remove("menu-open");
  }
}

// Initialize visitor counter
function initVisitorCounter() {
  const visitorElement = document.getElementById("visitor-count");
  if (!visitorElement) {
    console.log("Visitor counter: element not found");
    return;
  }

  console.log("Visitor counter: initializing...");

  // Try to fetch visitor count from multiple sources
  fetchVisitorCount()
    .then((count) => {
      console.log("Visitor counter: API success, count:", count);
      visitorElement.textContent = formatNumber(count);
    })
    .catch((error) => {
      console.log(
        "Visitor counter: API failed, using localStorage fallback",
        error
      );
      // Fallback to localStorage counter
      const localCount = getLocalVisitorCount();
      console.log("Visitor counter: localStorage count:", localCount);
      visitorElement.textContent = formatNumber(localCount);
    });
}

// Fetch visitor count from external API
async function fetchVisitorCount() {
  try {
    console.log("Visitor counter: attempting API call...");

    // Try multiple APIs in order of preference
    const apis = [
      {
        name: "CountAPI",
        url: "https://api.countapi.xyz/hit/lokstra.dev/visits",
        extractCount: (data) => data.value,
      },
      {
        name: "VisitorBadge",
        url: "https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Flokstra.dev&countColor=%2338bdf8",
        extractCount: (data) => data.count,
      },
    ];

    for (const api of apis) {
      try {
        console.log(`Visitor counter: trying ${api.name}...`);
        const response = await fetch(api.url);
        console.log(
          `Visitor counter: ${api.name} response status:`,
          response.status
        );

        if (response.ok) {
          const data = await response.json();
          console.log(`Visitor counter: ${api.name} response data:`, data);
          const count = api.extractCount(data);
          if (count !== undefined && count !== null) {
            console.log(`Visitor counter: ${api.name} success, count:`, count);
            return count;
          }
        }
      } catch (apiError) {
        console.log(`Visitor counter: ${api.name} failed:`, apiError);
        continue; // Try next API
      }
    }

    throw new Error("All APIs failed");
  } catch (error) {
    console.log("Visitor counter: All APIs failed:", error);
    // Fallback to localStorage
    throw error;
  }
}

// Local visitor counter as fallback
function getLocalVisitorCount() {
  const key = "lokstra-visitor-count";
  let count = parseInt(localStorage.getItem(key) || "0");

  // Check if this is a new visit (simple session-based)
  const sessionKey = "lokstra-session-" + new Date().toDateString();
  if (!sessionStorage.getItem(sessionKey)) {
    count += 1;
    localStorage.setItem(key, count.toString());
    sessionStorage.setItem(sessionKey, "visited");
    console.log("Visitor counter: new visit detected, incremented to:", count);
  } else {
    console.log("Visitor counter: returning existing count:", count);
  }

  return count;
}

// Format number with K/M suffixes
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// Initialize visitor counter on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initVisitorCounter);
