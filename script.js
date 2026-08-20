document.documentElement.classList.add("js");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const revealItems = document.querySelectorAll("[data-reveal]");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10%", threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (!reducedMotion) {
  const art = document.querySelector(".hero-art");

  window.addEventListener(
    "pointermove",
    (event) => {
      if (!art || window.innerWidth < 900) return;

      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      art.style.setProperty("--parallax-x", `${x}px`);
      art.style.setProperty("--parallax-y", `${y}px`);
    },
    { passive: true },
  );
}
