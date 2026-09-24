/**
 * SMART KHADHI CHAKRA - Master Script
 * Vanilla JavaScript for modern interactions, telemetry simulation,
 * navigation scroll spy, mobile drawer, and scroll reveal animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollSpy();
  initScrollAnimations();
  initArchitectureToggle();
  initSpindleSimulator();
  initSmoothScroll();
});

/**
 * Navbar scroll behavior & mobile drawer
 */
function initNavbar() {
  const navbar = document.getElementById('mainNavbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow & shrink on scroll
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/**
 * Scroll spy to highlight active section link
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let id = entry.target.getAttribute('id');
        if (id === 'testing') id = 'comparison';
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => spyObserver.observe(sec));
}

/**
 * Staggered on-scroll reveal animations using IntersectionObserver
 */
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Interactive Architecture Flow Switcher
 */
function initArchitectureToggle() {
  const tabMechanical = document.getElementById('tabMechanical');
  const tabMonitoring = document.getElementById('tabMonitoring');
  const flowMechanical = document.getElementById('flowMechanical');
  const flowMonitoring = document.getElementById('flowMonitoring');
  const modeBadge = document.getElementById('archModeBadge');

  if (!tabMechanical || !tabMonitoring) return;

  tabMechanical.addEventListener('click', () => {
    tabMechanical.classList.add('active');
    tabMonitoring.classList.remove('active');

    if (flowMechanical) flowMechanical.style.display = 'block';
    if (flowMonitoring) flowMonitoring.style.display = 'none';
    if (modeBadge) modeBadge.textContent = 'MODE: MECHANICAL POWER TRANSMISSION';

    if (window.charkha3DEngine) {
      window.charkha3DEngine.setMode('mechanical');
    }
  });

  tabMonitoring.addEventListener('click', () => {
    tabMonitoring.classList.add('active');
    tabMechanical.classList.remove('active');

    if (flowMonitoring) flowMonitoring.style.display = 'block';
    if (flowMechanical) flowMechanical.style.display = 'none';
    if (modeBadge) modeBadge.textContent = 'MODE: SMART MONITORING & POWER LOOP';

    if (window.charkha3DEngine) {
      window.charkha3DEngine.setMode('monitoring');
    }
  });
}

/**
 * Interactive Live Spindle Telemetry Simulator (in Hero & Dashboard)
 * Allows testing yarn break indicator states
 */
function initSpindleSimulator() {
  const spindleNodes = document.querySelectorAll('.spindle-node');
  const alertDisplay = document.getElementById('telemetryAlertStatus');

  if (!spindleNodes.length) return;

  spindleNodes.forEach(node => {
    node.addEventListener('click', () => {
      const spindleId = node.getAttribute('data-spindle');
      const isBroken = node.classList.toggle('broken');

      if (alertDisplay) {
        if (isBroken) {
          alertDisplay.innerHTML = `<span style="color:#ef4444;">⚠️ Alert: Yarn break on Spindle ${spindleId}! LED & Buzzer Active</span>`;
        } else {
          // Check if any other is broken
          const anyBroken = document.querySelector('.spindle-node.broken');
          if (anyBroken) {
            alertDisplay.innerHTML = `<span style="color:#ef4444;">⚠️ Alert: Yarn break on Spindle ${anyBroken.getAttribute('data-spindle')}!</span>`;
          } else {
            alertDisplay.innerHTML = `<span style="color:var(--color-green-eco);">● All 8 Spindles Active & Monitored</span>`;
          }
        }
      }
    });
  });
}

/**
 * Smooth anchor scrolling with offset for sticky navbar
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
