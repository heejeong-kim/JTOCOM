(() => {
  const carousel = document.querySelector('[data-case-carousel]');
  if (!carousel) return;

  const previous = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  const shell = carousel.closest('.case-carousel-shell');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer = null;
  let hovering = false;
  let focused = false;

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const cardStep = () => {
    const card = carousel.querySelector('.case');
    if (!card) return carousel.clientWidth;
    return card.getBoundingClientRect().width + parseFloat(getComputedStyle(carousel).columnGap || '0');
  };

  const move = (direction) => {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const step = cardStep();
    if (direction < 0 && carousel.scrollLeft <= 3) {
      carousel.scrollTo({ left: maxScroll, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    } else if (direction > 0 && carousel.scrollLeft >= maxScroll - 3) {
      carousel.scrollTo({ left: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    } else {
      carousel.scrollBy({ left: step * direction, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }
  };

  const start = () => {
    stop();
    if (reduceMotion.matches || hovering || focused) return;
    timer = window.setInterval(() => move(1), 4200);
  };

  previous?.addEventListener('click', () => move(-1));
  next?.addEventListener('click', () => move(1));

  const pauseOnPointer = () => { hovering = true; stop(); };
  const resumeOnPointer = () => { hovering = false; start(); };
  [shell || carousel].forEach((element) => {
    element.addEventListener('pointerenter', pauseOnPointer);
    element.addEventListener('pointerleave', resumeOnPointer);
    element.addEventListener('focusin', () => { focused = true; stop(); });
    element.addEventListener('focusout', (event) => {
      if (!element.contains(event.relatedTarget)) { focused = false; start(); }
    });
  });

  reduceMotion.addEventListener?.('change', start);
  start();
})();
