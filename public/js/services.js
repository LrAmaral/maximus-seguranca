// Slideshow functionality - make it globally accessible
window.initSlideshow = function initSlideshow() {
  const slideshowContainer = document.querySelector(".slideshow-container");
  if (!slideshowContainer) return;

  // Avoid multiple initializations
  if (slideshowContainer.dataset.initialized === "true") {
    return;
  }
  slideshowContainer.dataset.initialized = "true";

  let slideIndex = 0;
  let slideInterval = null;
  const slides = slideshowContainer.getElementsByClassName("slide");
  const dots = slideshowContainer.getElementsByClassName("dot");
  const prevButton = slideshowContainer.querySelector(".prev");
  const nextButton = slideshowContainer.querySelector(".next");

  if (slides.length === 0) return;

  function showSlide(n) {
    // Remove active class from all slides and dots
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }

    // Adjust index if out of bounds
    if (n >= slides.length) {
      slideIndex = 0;
    } else if (n < 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex = n;
    }

    // Add active class to current slide and dot
    if (slides[slideIndex]) {
      slides[slideIndex].classList.add("active");
    }
    if (dots[slideIndex]) {
      dots[slideIndex].classList.add("active");
    }
  }

  function nextSlide() {
    showSlide(slideIndex + 1);
  }

  function prevSlide() {
    showSlide(slideIndex - 1);
  }

  function goToSlide(n) {
    showSlide(n);
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Add event listeners
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide();
      startAutoSlide();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      startAutoSlide();
    });
  }

  // Add click events to dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", () => {
      goToSlide(i);
      startAutoSlide();
    });
  }

  // Pause auto-slide on hover
  slideshowContainer.addEventListener("mouseenter", stopAutoSlide);
  slideshowContainer.addEventListener("mouseleave", startAutoSlide);

  // Initialize: show first slide
  showSlide(0);

  // Start auto-advance
  startAutoSlide();
};

// Auto-initialize when services section is loaded
const servicesSection = document.getElementById("services");
if (servicesSection) {
  const observer = new MutationObserver(() => {
    const slideshowContainer = document.querySelector(".slideshow-container");
    if (
      slideshowContainer &&
      slideshowContainer.dataset.initialized !== "true"
    ) {
      initSlideshow();
    }
  });

  observer.observe(servicesSection, {
    childList: true,
    subtree: true,
  });
}

// Also try to initialize if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initSlideshow, 200);
  });
} else {
  setTimeout(initSlideshow, 200);
}
