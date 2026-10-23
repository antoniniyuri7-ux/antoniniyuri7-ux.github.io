const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function reveal(elements) {
  if (reduceMotion || !('IntersectionObserver' in window) || elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );

  for (const element of elements) {
    element.classList.add('reveal');
    observer.observe(element);
  }
}

reveal([...document.querySelectorAll('.section')]);

document.addEventListener('projetos:renderizados', (event) => {
  const cards = event.detail?.cards ?? [];
  reveal(cards.filter((card) => card instanceof Element));
});

const sections = [...document.querySelectorAll('#hero, #projetos, #contato')];
const navLinks = new Map(
  [...document.querySelectorAll('.nav__link')].map((link) => [
    link.getAttribute('href')?.slice(1),
    link,
  ])
);

if ('IntersectionObserver' in window && sections.length > 0) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const [id, link] of navLinks) {
          if (id === entry.target.id) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        }
      }
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  for (const section of sections) navObserver.observe(section);
}

for (const element of document.querySelectorAll('[data-ano]')) {
  element.textContent = String(new Date().getFullYear());
}
