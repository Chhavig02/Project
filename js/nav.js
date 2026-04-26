// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) {
      navLinks.classList.remove('open');
    }
  });
}

// Smooth scroll offset for sticky nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Design System scrollspy — highlight active sub-nav link on scroll
const dsSubLinks = document.querySelectorAll('.ds-sub-link, .ds-nav-link');
if (dsSubLinks.length > 0) {
  const sections = Array.from(document.querySelectorAll('.ds-section, [id]')).filter(s => s.id);
  const onScroll = () => {
    const scrollY = window.scrollY + 120;
    let current = '';
    sections.forEach(sec => { if (sec.offsetTop <= scrollY) current = sec.id; });
    dsSubLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.includes('#' + current)) {
        link.classList.add('active');
      } else if (!link.classList.contains('active') || href) {
        // only remove if it's a hash link
        if (href && href.startsWith('#')) link.classList.remove('active');
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}
