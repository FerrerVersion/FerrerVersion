(() => {
  "use strict";

  /* ---- Navbar: sombra/blur al hacer scroll ---- */
  const navbar = document.querySelector("[data-navbar]");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Menú móvil ---- */
  const toggle = document.querySelector("[data-menu-toggle]");
  const panel = document.querySelector("[data-mobile-panel]");

  if (toggle && panel) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      panel.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    const openMenu = () => {
      toggle.setAttribute("aria-expanded", "true");
      panel.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    panel.querySelectorAll("[data-menu-link]").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- Revelado del hero ---- */
  const hero = document.querySelector("[data-hero]");
  if (hero) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => hero.classList.add("is-revealed"));
    });
  }

  /* ---- Aparición progresiva de secciones al entrar en viewport ---- */
  const revealTargets = document.querySelectorAll("[data-reveal]");
  if (revealTargets.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Formulario de contacto: compone un mailto: con lo escrito ---- */
  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(contactForm);
      const nombre = (data.get("nombre") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const tipo = (data.get("tipo") || "").toString().trim();
      const mensaje = (data.get("mensaje") || "").toString().trim();

      const to = contactForm.getAttribute("data-mail");
      const subject = contactForm.getAttribute("data-subject") || "";

      const bodyLines = [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        tipo ? `Tipo de proyecto: ${tipo}` : null,
        "",
        mensaje,
      ].filter((line) => line !== null);

      const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        bodyLines.join("\n")
      )}`;

      window.location.href = mailto;
    });
  }

  /* ---- Carrusel de capturas (caso de estudio) ---- */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const dotsWrap = carousel.parentElement.querySelector("[data-carousel-dots]");
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll("[data-carousel-dot]")) : [];

    if (!track || slides.length < 2) return;

    track.scrollLeft = 0;

    const currentIndex = () => Math.round(track.scrollLeft / track.clientWidth);

    const goTo = (index) => {
      const clamped = Math.max(0, Math.min(index, slides.length - 1));
      track.scrollTo({
        left: slides[clamped].offsetLeft,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    };

    const updateDots = () => {
      const idx = currentIndex();
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === idx));
    };

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(currentIndex() - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(currentIndex() + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

    let scrollTimeout;
    track.addEventListener(
      "scroll",
      () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateDots, 80);
      },
      { passive: true }
    );

    updateDots();
  });
})();
