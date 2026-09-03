document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active Nav Link on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links .nav-item');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // Copy to Clipboard functionality for Contact Section
  const copyBtn = document.getElementById('copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'abdelrahimmohamedoffical@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const copyText = copyBtn.querySelector('.copy-text');
        const originalText = copyText.textContent;
        copyText.textContent = 'COPIED TO CLIPBOARD!';
        
        setTimeout(() => {
          copyText.textContent = originalText;
        }, 2500);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  }

  // Scroll Reveal Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        if (entry.boundingClientRect.top > window.innerHeight / 2) {
          entry.target.classList.remove('active');
        }
      } else {
        entry.target.classList.add('active');
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // ScrollSpy for Nav Links
  const navObserverOptions = {
    threshold: 0.2,
    rootMargin: "-10% 0px -10% 0px"
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('a[href^="#"]').forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-primary');
            link.classList.remove('text-on-surface-variant');
          } else {
            // Only remove if it's an actual nav link targeting a section
            if (['#about-section', '#work-section', '#projects-section', '#contact-section'].includes(link.getAttribute('href'))) {
              link.classList.remove('text-primary');
              if(!link.classList.contains('btn-primary')) {
                link.classList.add('text-on-surface-variant');
              }
            }
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    if (section.id) navObserver.observe(section);
  });

  // Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });
  }

  // Initialize Lottie Background Animation
  const lottieContainer = document.getElementById('lottie-background');
  if (lottieContainer && typeof lottie !== 'undefined') {
    const animation = lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/animations/leaves.json'
    });
    animation.setSpeed(0.9);
  }
});
