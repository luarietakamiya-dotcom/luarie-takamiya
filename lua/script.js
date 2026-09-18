const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach((el) => el.classList.add('is-visible'));
});
document.querySelectorAll('img').forEach((img) => {
  const applyFallback = () => {
    img.style.display = 'none';
    const parent = img.parentElement;
    if (parent) parent.classList.add('is-fallback');
  };
  if (img.complete && !img.naturalWidth) applyFallback();
  img.addEventListener('error', applyFallback, { once:true });
});
