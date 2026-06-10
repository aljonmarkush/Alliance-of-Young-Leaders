import { loadComponent } from './utils/componentLoader.js';

import { initCounters } from './animations/counters.js';
import { initParallax } from './animations/parallax.js';
import { initReveal } from './animations/reveal.js';
import { initSectionObserver } from './animations/sectionObserver.js';
import { initStaggerCards } from './animations/staggerCards.js';

import { initActiveNav } from './core/activeNav.js';
import { initCommittees } from './core/committees.js';
import { initGallery } from './core/gallery.js';
import { initNavbar } from './core/navbar.js';
import { initLogoText } from './core/logoText.js';
import { initOfficers } from './core/officers.js';
import { initPrograms } from './core/programs.js';
import { initScrollProgress } from './core/scrollProgress.js';
import { initSmoothScroll } from './core/smoothScroll.js';

import { initBackToTop } from './ui/back-to-top.js';
import { initLightbox } from './ui/lightbox.js';
import { initPdfViewer } from './ui/pdfViewer.js';

import { initScrollManager } from './utils/scrollManager.js';

document.addEventListener('DOMContentLoaded', async () => {

  console.log('🚀 Loading AYL Components...');

// ✅ LOAD ALL COMPONENTS FIRST (Paths pointing directly to your root components folder)
  await Promise.all([
    loadComponent('navbar-container', './components/navbar.html'),
    loadComponent('hero-container', './components/hero.html'),
    loadComponent('about-container', './components/about.html'),
    loadComponent('mission-container', './components/mission.html'),
    loadComponent('officers-container', './components/officers.html'),
    loadComponent('committees-container', './components/committees.html'),
    loadComponent('members-container', './components/members.html'),
    loadComponent('program-container', './components/program.html'),
    loadComponent('gallery-container', './components/gallery.html'),
    loadComponent('join-container', './components/join.html'),
    loadComponent('contact-container', './components/contact.html'),
    loadComponent('footer-container', './components/footer.html'),
    loadComponent('back-to-top-container', './components/back-to-top.html'),
    loadComponent('lightbox-container', './components/lightbox.html'),
  ]);
  

  console.log('✅ Components loaded');

  await initOfficers();
  await initCommittees();
  await initGallery();
  await initPrograms();

  // ── INIT SYSTEMS ──
  const updateNavbar = initNavbar?.() || (() => {});
  const updateProgress = initScrollProgress?.() || (() => {});
  const updateActiveNav = initActiveNav?.() || (() => {});
  const updateBackToTop = initBackToTop?.() || (() => {});
  const updateParallax = initParallax?.() || (() => {});
  const updateLogoText = initLogoText?.() || (() => {});

  initCounters?.();
  initReveal?.();
  initLightbox?.();
  initPdfViewer?.();
  initSmoothScroll?.();
  initStaggerCards?.();
  initSectionObserver?.();

  const scrollHandlers = [
    updateNavbar,
    updateProgress,
    updateActiveNav,
    updateBackToTop,
    updateParallax,
    updateLogoText
  ].filter(Boolean);

  initScrollManager(scrollHandlers);
  scrollHandlers.forEach(fn => fn());

  console.log('🌟 AYL Website Fully Initialized');
});