// Progressive homepage enhancements. All content remains usable without motion.
const body = document.querySelector('.home-refined');
if (body) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionButton = document.querySelector('.motion-toggle');
  const stage = document.querySelector('#heroPhoneShowcase');
  const wrapper = document.querySelector('.hero-showcase-wrapper');
  let userPaused = false;
  try { userPaused = localStorage.getItem('cs_motion_paused') === 'true'; } catch { /* Storage is optional. */ }
  let observer;
  let tiltFrame = 0;
  const motionOff = () => userPaused || reducedMotion.matches;

  function resetTilt() {
    cancelAnimationFrame(tiltFrame);
    wrapper?.style.removeProperty('--tilt-x');
    wrapper?.style.removeProperty('--tilt-y');
  }

  function syncMotion() {
    const paused = motionOff();
    body.dataset.motion = paused ? 'paused' : 'enabled';
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', paused ? 'Animasyonları etkinleştir' : 'Animasyonları duraklat');
    motionButton.title = reducedMotion.matches ? 'Sisteminde azaltılmış hareket açık' : motionButton.getAttribute('aria-label');
    motionButton.querySelector('span').textContent = paused ? '▷' : 'Ⅱ';
    // A system-level reduced-motion preference always wins.
    motionButton.disabled = reducedMotion.matches;
    if (paused) {
      observer?.disconnect();
      document.querySelectorAll('.reveal-ready').forEach(element => element.classList.remove('reveal-ready'));
      resetTilt();
    }
  }
  motionButton.addEventListener('click', () => {
    userPaused = !userPaused;
    try { localStorage.setItem('cs_motion_paused', String(userPaused)); } catch { /* Storage is optional. */ }
    syncMotion();
  });
  reducedMotion.addEventListener('change', syncMotion);
  finePointer.addEventListener('change', resetTilt);
  syncMotion();

  if ('IntersectionObserver' in window && !motionOff()) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.remove('reveal-ready');
        target.classList.add('reveal-in');
        target.addEventListener('animationend', () => target.classList.remove('reveal-in'), { once: true });
        observer.unobserve(target);
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.section-head, .why-layout, .feature-band, .karat-grid, .app-experience, .steps, .cta').forEach(element => {
      if (element.getBoundingClientRect().top > innerHeight) {
        element.classList.add('reveal-ready');
        observer.observe(element);
      }
    });
    document.addEventListener('focusin', event => {
      const hidden = event.target.closest('.reveal-ready');
      if (hidden) { hidden.classList.remove('reveal-ready'); observer.unobserve(hidden); }
    });
  }

  stage?.addEventListener('pointermove', event => {
    if (motionOff() || !finePointer.matches) return;
    cancelAnimationFrame(tiltFrame);
    tiltFrame = requestAnimationFrame(() => {
      const box = stage.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      wrapper.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`);
      wrapper.style.setProperty('--tilt-y', `${(x * 6).toFixed(2)}deg`);
    });
  });
  stage?.addEventListener('pointerleave', resetTilt);

  let progressFrame = 0;
  function updateProgress() {
    const height = document.documentElement.scrollHeight - innerHeight;
    body.style.setProperty('--reading-progress', String(height > 0 ? Math.min(1, Math.max(0, scrollY / height)) : 0));
    progressFrame = 0;
  }
  const queueProgress = () => { if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress); };
  window.addEventListener('scroll', queueProgress, { passive: true });
  window.addEventListener('resize', queueProgress);
  window.addEventListener('load', queueProgress);
  updateProgress();

  const descriptions = {
    8: ['8 ayar takı.', 'Düşük ayarlı takını kendi ayarıyla değerlendir. Hesaplamada ürün türünü ve gram ağırlığını birlikte seç.'],
    14: ['14 ayar takı.', 'Takının ayarı ve gram ağırlığı, hesaplamada birlikte değerlendirilir.'],
    18: ['18 ayar takı.', 'Daha yüksek saflıktaki takıları ayrı değerlendir. Farklı ayarları aynı hesapta birbirine karıştırma.'],
  };
  const description = document.querySelector('#karat-description p');
  document.querySelectorAll('[data-karat]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-karat]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      const [title, text] = descriptions[button.dataset.karat];
      const strong = document.createElement('strong');
      strong.textContent = title;
      description.replaceChildren(strong, document.createTextNode(` ${text}`));
    });
  });
}
