function initHeaderEvents() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const closeMenuBtn = document.querySelector(".close-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const header = document.querySelector(".header");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!mobileMenuBtn || !closeMenuBtn || !mobileMenu) {
    console.warn("Alguns elementos do header não foram encontrados.");
    return;
  }

  function openMenu() {
    mobileMenu.style.right = "0";
    document.body.style.overflow = "hidden";
  }
  
  function closeMenu() {
    mobileMenu.style.right = "-100%";
    document.body.style.overflow = "";
  }

  mobileMenuBtn.addEventListener("click", openMenu);
  closeMenuBtn.addEventListener("click", closeMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      closeMenu();
    }
  });

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (header) {
      if (currentScroll > lastScroll && currentScroll > 80) {
        header.classList.add("header-hidden");
      } else {
        header.classList.remove("header-hidden");
      }
    }

    lastScroll = currentScroll;

    updateActiveLink();
  });

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));

        const correspondingLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`
        );
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        scroll({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  updateActiveLink();
}
