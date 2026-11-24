const headings = document.querySelectorAll('.section-heading');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (headings.length && !reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-enabled');
  const headingObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  headings.forEach((heading) => headingObserver.observe(heading));
}
