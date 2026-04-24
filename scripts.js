/* ============================================================
 * scripts.js — Économie de la Défense
 * Premium JavaScript interactions and animations
 * ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // READING PROGRESS BAR
  // ============================================================
  function initReadingProgress() {
    var bar = document.getElementById('reading-progress-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'reading-progress-bar';
      document.body.prepend(bar);
    }

    function updateProgress() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = Math.min(progress, 100) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ============================================================
  // STICKY NAVBAR WITH SCROLL CLASS
  // ============================================================
  function initStickyNavbar() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function handleScroll() {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ============================================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================================
  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal, .reveal-left, .module-card, .timeline-item, .counter-item, .institution-card, .author-card, .week-card');

    if (!elements.length) return;

    // Add reveal class to elements that don't already have it
    elements.forEach(function (el) {
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left')) {
        el.classList.add('reveal');
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
          // Stagger delay for grouped elements
          var delay = Math.min(idx * 80, 400);
          setTimeout(function () {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ============================================================
  // ANIMATED COUNTERS
  // ============================================================
  function animateCounter(el, target, duration) {
    var start = 0;
    var startTime = null;
    var isFloat = target % 1 !== 0;
    var suffix = el.dataset.suffix || '';

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current = eased * target;

      if (isFloat) {
        el.textContent = current.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = (isFloat ? target.toFixed(1) : target) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('.counter-number[data-target]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseFloat(el.dataset.target);
          animateCounter(el, target, 2000);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  // ============================================================
  // PROGRESS BAR ANIMATION (LEARNING BARS)
  // ============================================================
  function initProgressBars() {
    var bars = document.querySelectorAll('.progress-fill[data-width]');
    if (!bars.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var width = el.dataset.width || '0';
          setTimeout(function () {
            el.style.width = width + '%';
          }, 300);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(function (el) { observer.observe(el); });
  }

  // ============================================================
  // ACTIVE NAV HIGHLIGHTING ON SCROLL
  // ============================================================
  function initActiveSection() {
    var sections = document.querySelectorAll('section[id], h2[id], h3[id]');
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.remove('section-active');
            if (link.getAttribute('href') && link.getAttribute('href').includes('#' + id)) {
              link.classList.add('section-active');
            }
          });
        }
      });
    }, { rootMargin: '-30% 0px -65% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  // ============================================================
  // SMOOTH INTERNAL LINKS
  // ============================================================
  function initSmoothLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href').slice(1);
        var target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          var offset = 80; // navbar height
          var top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  // ============================================================
  // MODULE CARD INTERACTIONS
  // ============================================================
  function initModuleCards() {
    var cards = document.querySelectorAll('.module-card');
    cards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        var marker = this.querySelector('.timeline-marker');
        if (marker) marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
      });
      card.addEventListener('mouseleave', function () {
        var marker = this.querySelector('.timeline-marker');
        if (marker) marker.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  // ============================================================
  // PAGE TRANSITION — FADE IN ON LOAD
  // ============================================================
  function initPageTransition() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    window.addEventListener('load', function () {
      document.body.style.opacity = '1';
    });
  }

  // ============================================================
  // ACTIVE PAGE HIGHLIGHTING IN NAVBAR
  // ============================================================
  function initActiveNavPage() {
    var currentPath = window.location.pathname;
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;

      // Normalize both paths
      var normalizedHref = href.replace(/\.html$/, '').replace(/index$/, '');
      var normalizedPath = currentPath.replace(/\.html$/, '').replace(/index$/, '');

      if (normalizedPath.endsWith(normalizedHref.replace(/^.*\//, '')) && normalizedHref !== '/') {
        link.classList.add('active');
      }
    });
  }

  // ============================================================
  // TOOLTIP INIT (if Bootstrap tooltips are available)
  // ============================================================
  function initTooltips() {
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
      var tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipEls.forEach(function (el) {
        new bootstrap.Tooltip(el);
      });
    }
  }

  // ============================================================
  // BACK TO TOP BUTTON
  // ============================================================
  function initBackToTop() {
    var btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Retour en haut');
    btn.style.cssText = [
      'position:fixed', 'bottom:2rem', 'right:2rem',
      'width:44px', 'height:44px', 'border-radius:50%',
      'background:linear-gradient(135deg,#1a3a5c,#2d6a9f)',
      'color:#fff', 'border:none', 'cursor:pointer',
      'font-size:1.1rem', 'font-weight:bold',
      'box-shadow:0 4px 16px rgba(0,0,0,0.2)',
      'transition:all 0.3s ease', 'opacity:0',
      'transform:translateY(10px)', 'z-index:1000'
    ].join(';');

    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
      } else {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(10px)';
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.addEventListener('mouseenter', function () {
      this.style.background = 'linear-gradient(135deg,#e8a020,#f5c842)';
      this.style.color = '#0d1b2a';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.background = 'linear-gradient(135deg,#1a3a5c,#2d6a9f)';
      this.style.color = '#fff';
    });
  }

  // ============================================================
  // INITIALIZE ALL
  // ============================================================
  function init() {
    initReadingProgress();
    initStickyNavbar();
    initScrollReveal();
    initCounters();
    initProgressBars();
    initActiveSection();
    initSmoothLinks();
    initModuleCards();
    initActiveNavPage();
    initTooltips();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run scroll reveal after Quarto's lazy loading
  window.addEventListener('load', function () {
    initPageTransition();
    setTimeout(initScrollReveal, 300);
    setTimeout(initCounters, 300);
    setTimeout(initProgressBars, 300);
  });

})();
