// Cepte Sarraf - Client Interactions & Theme Persistence

(function() {
  const THEME_KEY = 'cs_theme';

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getCurrentTheme() {
    const stored = getStoredTheme();
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return getSystemTheme();
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(btn => {
      const label = btn.querySelector('.theme-toggle-text');
      if (label) {
        label.textContent = theme === 'dark' ? 'Gündüz Modu' : 'Gece Modu';
      }
      btn.setAttribute('aria-label', theme === 'dark' ? 'Gündüz moduna geç' : 'Gece moduna geç (Yatırımcı Görünümü)');
      btn.setAttribute('title', theme === 'dark' ? 'Gündüz moduna geç' : 'Gece moduna geç (Yatırımcı Görünümü)');
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
    applyTheme(next);
  }

  // Initialize theme on load
  const initialTheme = getCurrentTheme();
  applyTheme(initialTheme);

  // Setup click listeners when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getCurrentTheme());
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // Listen to system preference changes if user hasn't explicitly chosen
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!getStoredTheme()) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // Cookie Banner
    const cookie = document.querySelector('.cookie');
    const cookieBtn = document.querySelector('[data-cookie-accept]');
    try {
      if (cookie && localStorage.getItem('cs-cookie-consent') === 'accepted') {
        cookie.classList.add('hidden');
      }
    } catch (e) {}

    if (cookieBtn) {
      cookieBtn.addEventListener('click', () => {
        try {
          localStorage.setItem('cs-cookie-consent', 'accepted');
        } catch (e) {}
        if (cookie) cookie.classList.add('hidden');
      });
    }

    // Demo Forms
    const demoForms = document.querySelectorAll('[data-demo-form]');
    demoForms.forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const status = form.querySelector('.status');
        if (status) {
          status.textContent = 'Talebiniz alındı. Gelişmeler ve duyurular kayıtlı adresinize iletilecektir.';
          status.style.color = 'var(--accent)';
        }
      });
    });

    // Dynamic Year
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });

    // In-Place Page Skeleton Loading Handler (html.page-is-loading)
    const removePageSkeleton = () => {
      document.documentElement.classList.remove('page-is-loading');
      const legacyLoader = document.getElementById('siteLoader');
      if (legacyLoader) legacyLoader.remove();
    };

    if (document.documentElement.classList.contains('page-is-loading')) {
      const startTime = Date.now();
      const minDisplayTime = 750; // Visible duration for the skeleton shimmer

      const onPageReady = () => {
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, minDisplayTime - elapsed);
        setTimeout(removePageSkeleton, delay);
      };

      if (document.readyState === 'complete') {
        onPageReady();
      } else {
        window.addEventListener('load', onPageReady);
        setTimeout(onPageReady, 2000); // Safety fallback
      }
    } else {
      removePageSkeleton();
    }

    // Expose preview helper so the in-place shimmer can be previewed anytime in console
    window.retriggerSkeletonLoading = (duration = 1500) => {
      document.documentElement.classList.add('page-is-loading');
      setTimeout(removePageSkeleton, duration);
    };
  });
})();
