import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isDesktop = window.innerWidth > 768

/* =========================================
   CONFIG & DATA
========================================= */

const CONFIG = {
  showPricing: true,
  WEB3FORMS_ACCESS_KEY: '', // Add key here for live form
  
  pricing: [
    {
      id: 'essential',
      title: 'ESSENTIAL',
      desc: 'Fokussierte Website für kleinere Unternehmen. Klare Struktur, starkes Branding.',
      price: 'AB 690 €'
    },
    {
      id: 'business',
      title: 'BUSINESS',
      desc: 'Mehr Tiefe, mehr Seiten und eine stärkere digitale Positionierung.',
      price: 'AB 1.290 €'
    },
    {
      id: 'signature',
      title: 'SIGNATURE',
      desc: 'Individuelle Art Direction, fortgeschrittene Interaktionen und ein hochgradig maßgeschneidertes Erlebnis.',
      price: 'AB 2.490 €'
    }
  ],

  budgets: [
    'Unter 1.000 €',
    '1.000–2.500 €',
    '2.500–5.000 €',
    '5.000 €+',
    'Noch offen'
  ],

  processStages: [
    { label: 'DISCOVER', desc: 'Wir verstehen Unternehmen, Zielgruppe und bestehende digitale Präsenz.' },
    { label: 'DIRECTION', desc: 'Wir definieren Struktur, Positionierung und visuelle Richtung.' },
    { label: 'DESIGN', desc: 'Wir übersetzen die Strategie in ein eigenständiges digitales Interface.' },
    { label: 'BUILD', desc: 'Wir entwickeln die Website responsiv und präzise.' },
    { label: 'LAUNCH', desc: 'Wir testen, optimieren und bringen die Experience live.' }
  ]
}


/* =========================================
   DOM HYDRATION
========================================= */

function hydrateDOM() {
  // 1. Hydrate Process
  const processContentWrapper = document.querySelector('.process-content-wrapper')
  const processWordsWrapper = document.querySelector('.process-words-wrapper')
  
  if (processContentWrapper && processWordsWrapper) {
    CONFIG.processStages.forEach((stage, idx) => {
      // Left text content
      const stageDiv = document.createElement('div')
      stageDiv.className = `process-stage ${idx === 0 ? 'active' : ''}`
      stageDiv.setAttribute('data-stage', idx)
      stageDiv.innerHTML = `
        <span class="process-label">${stage.label}</span>
        <p>${stage.desc}</p>
      `
      processContentWrapper.appendChild(stageDiv)

      // Right large word
      const wordDiv = document.createElement('div')
      wordDiv.className = `process-word ${idx === 0 ? 'active' : ''}`
      wordDiv.setAttribute('data-stage', idx)
      wordDiv.textContent = stage.label
      processWordsWrapper.appendChild(wordDiv)
    })
  }

  // 2. Hydrate Pricing
  const pricingSection = document.getElementById('pricing')
  const pricingContainer = document.getElementById('pricing-list-container')
  
  if (pricingSection && pricingContainer) {
    if (!CONFIG.showPricing) {
      pricingSection.style.display = 'none'
    } else {
      pricingSection.style.display = 'block'
      CONFIG.pricing.forEach(pkg => {
        const row = document.createElement('div')
        row.className = 'pricing-row'
        row.innerHTML = `
          <div class="pricing-row-hover"></div>
          <h3 class="pricing-row-title">${pkg.title}</h3>
          <p class="pricing-row-desc">${pkg.desc}</p>
          <span class="pricing-row-price">${pkg.price}</span>
        `
        pricingContainer.appendChild(row)
      })
    }
  }

  // 3. Hydrate Budget Chips
  const budgetContainer = document.getElementById('budget-chips-container')
  if (budgetContainer) {
    CONFIG.budgets.forEach(budget => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'chip'
      btn.setAttribute('data-value', budget)
      btn.textContent = budget
      budgetContainer.appendChild(btn)
    })
    document.getElementById('budget-group').style.display = 'block'
  }
}

hydrateDOM()


/* =========================================
   FORM LOGIC
========================================= */

const setupForm = () => {
  const form = document.getElementById('project-form')
  if (!form) return

  // Apply Web3Forms Key
  const keyInput = document.getElementById('web3forms-key')
  if (keyInput) keyInput.value = CONFIG.WEB3FORMS_ACCESS_KEY || ''

  // Text Choice Logic (replaced Chips)
  document.querySelectorAll('.text-choice-group').forEach(group => {
    const inputId = group.getAttribute('data-input-id')
    const hiddenInput = document.getElementById(inputId)
    const choices = group.querySelectorAll('.text-choice')

    choices.forEach(choice => {
      choice.addEventListener('click', () => {
        choices.forEach(c => c.classList.remove('selected'))
        choice.classList.add('selected')
        if (hiddenInput) {
          hiddenInput.value = choice.getAttribute('data-value')
        }
      })
    })
  })

  // Next Step Logic
  const nextBtns = document.querySelectorAll('.next-btn')
  nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const currentStep = btn.closest('.form-step')
      const nextStepId = btn.getAttribute('data-next')
      const nextStep = document.getElementById(nextStepId)
      
      if (currentStep && nextStep) {
        // Premium Mask/Slide Transition
        const currentLine = currentStep.querySelector('.form-group-line') || currentStep
        
        gsap.to(currentLine, {
          yPercent: -100, // Slide up into overflow hidden
          duration: 0.5,
          ease: 'power3.in',
          onComplete: () => {
            currentStep.classList.remove('active')
            currentStep.style.display = 'none'
            
            nextStep.style.display = 'block'
            void nextStep.offsetWidth
            
            nextStep.classList.add('active')
            const nextLine = nextStep.querySelectorAll('.form-group-line')
            
            gsap.fromTo(nextLine, 
              { yPercent: 100 },
              { yPercent: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
            )
          }
        })
      }
    })
  })

  // Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const submitBtn = form.querySelector('.submit-btn')
    submitBtn.textContent = 'SENDING...'
    submitBtn.style.opacity = '0.5'

    if (CONFIG.WEB3FORMS_ACCESS_KEY) {
      try {
        const formData = new FormData(form)
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        })
        if (response.ok) {
          showFormSuccess()
        }
      } catch (err) {
        console.error(err)
        submitBtn.textContent = 'ERROR, TRY AGAIN'
      }
    } else {
      // Fake successful state for presentation
      setTimeout(showFormSuccess, 1000)
    }
  })
}

const showFormSuccess = () => {
  const form = document.getElementById('project-form')
  const successBox = document.getElementById('form-success')
  
  gsap.to(form, {
    opacity: 0,
    y: -20,
    duration: 0.6,
    ease: 'power3.inOut',
    onComplete: () => {
      form.style.display = 'none'
      successBox.style.display = 'flex'
      gsap.fromTo(successBox, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      )
    }
  })
}

setupForm()


/* =========================================
   LENIS SCROLLING
========================================= */

let lenis = null

if (!prefersReducedMotion) {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.5,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
}

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle')
const mobileMenu = document.querySelector('.mobile-menu')
if (mobileToggle && mobileMenu) {
  const toggleMenu = () => {
    const isActive = mobileMenu.classList.toggle('active')
    mobileToggle.setAttribute('aria-expanded', isActive)
    const spans = mobileToggle.querySelectorAll('span')
    if (isActive) {
      spans[0].style.transform = 'translateY(3.5px) rotate(45deg)'
      spans[1].style.transform = 'translateY(-3.5px) rotate(-45deg)'
    } else {
      spans.forEach(s => s.style.transform = 'none')
    }
  }
  mobileToggle.addEventListener('click', toggleMenu)
  document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', () => {
    if(mobileMenu.classList.contains('active')) toggleMenu()
  }))
}

// Capabilities Interactivity
const capVisual = document.getElementById('cap-visual')
const serviceRows = document.querySelectorAll('.service-row')
if (capVisual && serviceRows.length && isDesktop) {
  serviceRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      const state = row.getAttribute('data-service')
      capVisual.className = `capabilities-visual state-${state}`
      
      serviceRows.forEach(r => {
        if (r !== row) r.style.opacity = '0.4'
      })
      row.style.opacity = '1'
      const title = row.querySelector('.service-title')
      if (title) title.style.transform = 'translateX(8px)'
    })
    
    row.addEventListener('mouseleave', () => {
      capVisual.className = 'capabilities-visual'
      serviceRows.forEach(r => r.style.opacity = '1')
      const title = row.querySelector('.service-title')
      if (title) title.style.transform = 'none'
    })
  })
}

// Header Theme Logic
const header = document.querySelector('.header')
if (header) {
  const lightSections = document.querySelectorAll('.section-work, .section-capabilities, .section-proof, .section-studio, .section-pricing')
  lightSections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 32px',
      end: 'bottom 32px',
      onEnter: () => header.classList.add('theme-dark-text'),
      onLeave: () => header.classList.remove('theme-dark-text'),
      onEnterBack: () => header.classList.add('theme-dark-text'),
      onLeaveBack: () => header.classList.remove('theme-dark-text'),
    })
  })
}


/* =========================================
   SENIOR MOTION SYSTEM (GSAP)
========================================= */

function initMotion() {
  if (prefersReducedMotion) {
    const loader = document.getElementById('loader')
    if (loader) {
      loader.style.opacity = '0'
      loader.style.pointerEvents = 'none'
      loader.style.display = 'none'
    }
    return
  }

  // 1. Loader & Hero Reveal Sequence
  const loader = document.getElementById('loader')
  const masterTl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

  if (loader) {
    masterTl
      .fromTo('.loader-brand', { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: 'power4.out' })
      .to('.loader-brand .dot', { opacity: 1, duration: 0.4 }, '-=0.2')
      .to('.loader-progress-fill', { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, '-=0.4')
      .to(loader, { yPercent: -100, duration: 0.8, ease: 'expo.inOut', delay: 0.2 })
  }

  // 1. Hero Text Reveal
  const heroFades = document.querySelectorAll('.section-hero .hero-copy, .section-hero .headline-hero')
  if (heroFades.length > 0) {
    masterTl.fromTo(heroFades,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      loader ? '-=0.3' : 0
    )
  }

  // 1b. Hero Signature Visual Animation (Raster Blueprint)
  function initHeroSignature() {
    const signatureSection = document.getElementById('home')
    const sigWords = document.querySelectorAll('.bp-word')
    const rasterMask = document.getElementById('raster-mask')
    
    if (!signatureSection || sigWords.length === 0 || !rasterMask) return

    // Setup Words
    gsap.set(sigWords, { opacity: 0 })
    gsap.set(sigWords[0], { opacity: 1 })
    
    // Generate Mask Cells
    // We cover a central bounding box: X: 100-900, Y: 300-700
    // Box is 800x400. Cell size: 10x10.
    const cols = 80;
    const rows = 40;
    const cellSize = 10;
    const startX = 100;
    const startY = 300;
    
    // Create a document fragment to minimize DOM reflows
    const fragment = document.createDocumentFragment()
    const maskCells = []
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Skip some cells randomly to give it a slightly degraded/architectural look natively
        if (Math.random() < 0.05) continue;
        
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        // Gap of 1px for the grid/raster effect
        rect.setAttribute("x", startX + col * cellSize)
        rect.setAttribute("y", startY + row * cellSize)
        rect.setAttribute("width", cellSize - 1)
        rect.setAttribute("height", cellSize - 1)
        rect.setAttribute("fill", "#ffffff")
        // Add to fragment and store reference
        fragment.appendChild(rect)
        maskCells.push(rect)
      }
    }
    rasterMask.appendChild(fragment)

    // Set initial transform origin for cells
    gsap.set(maskCells, { transformOrigin: '50% 50%' })

    // Blueprint Idle Motion (Continuous alive feeling)
    const idleTl = gsap.timeline({ repeat: -1, paused: true })
    
    // Subtle rotation of circles
    idleTl.to('.bp-circle-1', { rotation: 360, transformOrigin: 'center', duration: 120, ease: 'none', repeat: -1 }, 0)
    idleTl.to('.bp-circle-3', { rotation: -360, transformOrigin: 'center', duration: 80, ease: 'none', repeat: -1 }, 0)
    
    // Subtle pulsing of registration marks
    idleTl.to('.bp-pulse', { opacity: 0.3, scale: 0.8, duration: 1.5, yoyo: true, ease: 'sine.inOut', repeat: -1, stagger: 0.2 }, 0)
    
    // Subtle drifting of the micro grids
    idleTl.to('.bp-v-lines', { x: -5, duration: 10, yoyo: true, ease: 'sine.inOut', repeat: -1 }, 0)
    idleTl.to('.bp-h-lines', { y: -5, duration: 12, yoyo: true, ease: 'sine.inOut', repeat: -1 }, 0)
    
    // Word Transition Loop
    const wordTl = gsap.timeline({ repeat: -1, paused: true })
    const wordCount = sigWords.length
    
    for (let i = 0; i < wordCount; i++) {
      const currentWord = sigWords[i]
      const nextWord = sigWords[(i + 1) % wordCount]
      
      wordTl.addLabel(`start_${i}`, `+=${3.5}`)
      
      // Pixel Breakup: Randomly scatter and scale down cells
      wordTl.to(maskCells, {
        x: () => gsap.utils.random(-40, 40),
        y: () => gsap.utils.random(-40, 40),
        scale: 0.2,
        opacity: 0,
        rotation: () => gsap.utils.random(-90, 90),
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: { amount: 0.4, from: 'random' }
      }, `start_${i}`)
      
      // Swap Words while mask is completely scattered/invisible
      wordTl.set(currentWord, { opacity: 0 }, `start_${i}+=0.8`)
      wordTl.set(nextWord, { opacity: 1 }, `start_${i}+=0.8`)
      
      // Realignment: Bring cells back to form the new word
      wordTl.to(maskCells, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: { amount: 0.3, from: 'random' }
      }, `start_${i}+=0.9`)
    }

    // ScrollTrigger to pause/play for performance
    ScrollTrigger.create({
      trigger: signatureSection,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => { idleTl.play(); wordTl.play(); },
      onLeave: () => { idleTl.pause(); wordTl.pause(); },
      onEnterBack: () => { idleTl.play(); wordTl.play(); },
      onLeaveBack: () => { idleTl.pause(); wordTl.pause(); }
    })
  }

  if (!prefersReducedMotion) {
    initHeroSignature()
  }

  // 2. Global Text & Label Reveals
  document.querySelectorAll('.section:not(.section-hero) .headline-mask').forEach(hl => {
    const spans = hl.querySelectorAll('.mask-wrap span')
    if (spans.length) {
      gsap.fromTo(spans,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: hl, start: 'top 85%', once: true }
        }
      )
    }
  })

  // Footer Huge MARGIN Reveal
  const footerLogo = document.querySelector('.footer-huge-logo')
  if (footerLogo && !prefersReducedMotion) {
    gsap.to(footerLogo, {
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer-bottom',
        start: 'top 95%',
        once: true
      }
    })
  }

  document.querySelectorAll('.section:not(.section-hero) .label-fade, .section-header .label').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 12 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      }
    )
  })

  // 3. Project Reveals
  if (isDesktop) {
    // Project 1: Left Margin Reveal
    const p1Img = document.querySelector('.project-centered .project-visual')
    const p1Inner = document.querySelector('.project-centered .project-visual img')
    if (p1Img && p1Inner) {
      gsap.fromTo(p1Img,
        { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.6,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: p1Img, start: 'top 85%', once: true }
        }
      )
      gsap.fromTo(p1Inner,
        { scale: 1.1, x: -30 },
        {
          scale: 1, x: 0,
          duration: 1.6,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: p1Img, start: 'top 85%', once: true }
        }
      )
    }

    // Project 2: Signature MARGIN EXPANSION
    const p2Wrapper = document.querySelector('.project-asymmetric .project-visual-wrapper')
    const p2Img = document.querySelector('.project-asymmetric .project-visual img')
    if (p2Wrapper && p2Img) {
      gsap.set(p2Wrapper, { paddingLeft: 'clamp(40px, 10vw, 140px)', paddingRight: 'clamp(40px, 10vw, 140px)' })
      gsap.set(p2Img, { scale: 1.15 })
      
      gsap.to(p2Wrapper, {
        paddingLeft: '0px',
        paddingRight: '0px',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: p2Wrapper,
          start: 'top 95%',
          end: 'top 35%',
          scrub: 1.5
        }
      })
      gsap.to(p2Img, {
        scale: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: p2Wrapper,
          start: 'top 95%',
          end: 'top 35%',
          scrub: 1.5
        }
      })
    }

    // Project 3: Vertical Aperture
    const p3Img = document.querySelector('.project-cinematic .project-visual')
    const p3Inner = document.querySelector('.project-cinematic .project-visual img')
    if (p3Img && p3Inner) {
      gsap.fromTo(p3Img,
        { clipPath: 'inset(45% 0 45% 0)' },
        {
          clipPath: 'inset(0% 0 0% 0)',
          duration: 1.6,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: p3Img, start: 'top 85%', once: true }
        }
      )
      gsap.fromTo(p3Inner,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.6,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: p3Img, start: 'top 85%', once: true }
        }
      )
    }
  }

  // 4. Line Draws
  document.querySelectorAll('.margin-line-inner').forEach(line => {
    gsap.fromTo(line, { scaleY: 0 }, {
      scaleY: 1, duration: 1.2, ease: 'power3.inOut',
      scrollTrigger: { trigger: line.closest('.margin-line') || line, start: 'top 80%', once: true }
    })
  })

  // 5. Sticky Process Transitions
  const processWrapper = document.querySelector('.process-wrapper')
  if (processWrapper && isDesktop) {
    const totalStages = CONFIG.processStages.length
    const stages = document.querySelectorAll('.process-stage')
    const words = document.querySelectorAll('.process-word')
    const railFill = document.querySelector('.process-rail-fill')

    // Initial positioning for words (except first)
    gsap.set(words, { yPercent: 100 })
    gsap.set(words[0], { yPercent: 0 })

    ScrollTrigger.create({
      trigger: processWrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1,
      onUpdate: (self) => {
        const progress = self.progress
        // Calculate active index based on scroll progress
        let activeIdx = Math.floor(progress * totalStages)
        if (activeIdx >= totalStages) activeIdx = totalStages - 1

        // Update Rail fill
        gsap.set(railFill, { height: `${progress * 100}%` })

        // Switch stages if changed
        stages.forEach((stage, i) => {
          if (i === activeIdx && !stage.classList.contains('active')) {
            // Enter
            stage.classList.add('active')
            gsap.fromTo(stage, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
            
            words[i].classList.add('active')
            gsap.fromTo(words[i], { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: 'power3.out' })
          } else if (i !== activeIdx && stage.classList.contains('active')) {
            // Leave
            stage.classList.remove('active')
            gsap.to(stage, { opacity: 0, y: -15, duration: 0.3, ease: 'power2.in' })
            
            words[i].classList.remove('active')
            gsap.to(words[i], { yPercent: -100, duration: 0.5, ease: 'power3.in' })
          }
        })
      }
    })

    // 3D Scene Timeline
    const process3D = document.querySelector('.process-3d-scene')
    if (process3D) {
      const p3dTl = gsap.timeline({
        scrollTrigger: {
          trigger: processWrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      })
      
      // 0-20% Discover (Base visible)
      gsap.set('.layer-base', { opacity: 0.8, rotateX: 0, rotateY: 0, z: 0 })
      gsap.set('.layer-grid', { opacity: 0, rotateX: 0, rotateY: 0, z: 0 })
      gsap.set('.layer-content', { opacity: 0, rotateX: 0, rotateY: 0, z: 0 })
      gsap.set('.layer-cherry', { opacity: 0, rotateX: 0, rotateY: 0, z: 0 })

      p3dTl
        // 20-40% Direction (Grid appears)
        .to('.layer-grid', { opacity: 1, duration: 1 }, 0.2)
        // 40-60% Design (Content appears)
        .to('.layer-content', { opacity: 1, duration: 1 }, 0.4)
        // 60-80% Build (Explosion 3D)
        .to('.process-layer', { rotateX: 55, rotateY: 0, rotationZ: -25, duration: 1.5, ease: 'power1.inOut' }, 0.6)
        .to('.layer-grid', { z: 60, duration: 1.5, ease: 'power1.inOut' }, 0.6)
        .to('.layer-content', { z: 120, duration: 1.5, ease: 'power1.inOut' }, 0.6)
        .to('.layer-cherry', { opacity: 1, z: 180, duration: 1.5, ease: 'power1.inOut' }, 0.6)
        // 80-100% Launch (Resolve)
        .to('.process-layer', { rotateX: 0, rotateY: 0, rotationZ: 0, z: 0, duration: 1, ease: 'power2.inOut' }, 1.8)
        .to('.layer-base', { opacity: 1, duration: 1 }, 1.8)
    }
  }

  // 6. Manifesto Kinetic Typography & Hand Interaction
  const manifesto = document.getElementById('manifesto')
  if (manifesto) {
    if (!prefersReducedMotion) {
      const mTl = gsap.timeline({
        scrollTrigger: {
          trigger: manifesto,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      })

      // Initial kinetic states
      gsap.set('.line-1', { xPercent: -14, opacity: 0 })
      gsap.set('.line-2', { xPercent: 14, opacity: 0 })
      gsap.set('.line-3', { letterSpacing: '0.22em', opacity: 0 })
      gsap.set('.line-4', { opacity: 0 })
      gsap.set('.manifesto-label', { opacity: 0, y: 15 })
      gsap.set('.manifesto-footer', { opacity: 0, y: 20 })

      mTl
        .to('.manifesto-label', { opacity: 1, y: 0, duration: 0.35 }, 0)
        .to('.line-1', { xPercent: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0)
        .to('.line-2', { xPercent: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.12)
        .to('.line-3', { letterSpacing: '-0.02em', opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.22)
        .to('.line-4', { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.42)
        .to('.manifesto-footer', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.48)

      // Mouse parallax for the kinetic typography lines
      manifesto.addEventListener('mousemove', (e) => {
        const rect = manifesto.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        gsap.to('.line-1', { x: x * -12, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
        gsap.to('.line-2', { x: x * 14, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
        gsap.to('.line-3', { x: x * -6, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
        gsap.to('.line-4', { x: x * 10, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
      })
    } else {
      gsap.set(['.manifesto-line', '.manifesto-label', '.manifesto-footer'], {
        opacity: 1,
        xPercent: 0,
        letterSpacing: '-0.02em',
        y: 0
      })
    }

    // Initialize hand canvas
    if (typeof initManifestoHand === 'function') {
      initManifestoHand(manifesto);
    }
  }

  // 7. Pricing Editorial Entrance
  document.querySelectorAll('.pricing-row').forEach((row, i) => {
    gsap.fromTo(row,
      { opacity: 0, x: -15 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#pricing', start: 'top 75%', once: true }
      }
    )
  })

  // 8. Monumental Final CTA Zoom Out
  const ctaSection = document.querySelector('.section-cta')
  const monumentalBg = document.querySelector('.cta-monumental-bg')
  if (ctaSection && monumentalBg && isDesktop) {
    gsap.to(monumentalBg, {
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: ctaSection,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true
      }
    })
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMotion)
} else {
  initMotion()
}

// --- MANIFESTO HAND INTERACTION MODULE ---
function initManifestoHand(sectionElement) {
  const CONSTANTS = {
    DOT_SPACING: 9,       
    ALPHA_THRESHOLD: 20,  
    POINTER_RADIUS: 140,  
    INERTIA_FACTOR: 0.12, 
    HOTSPOT_X: 0.345,
    HOTSPOT_Y: 0.15,
    HOTSPOT_RADIUS: 55,
    SHAPE_DOT: 0,
    SHAPE_RECT: 1,
    SHAPE_DIAMOND: 2
  };

  const initialX = window.innerWidth * 0.72;
  const initialY = window.innerHeight * 0.62;

  let state = {
    fragments: [],
    imageWidth: 0,
    imageHeight: 0,
    pointer: { x: initialX, y: initialY, active: false },
    // 6-node fluid spring chain for continuous aerodynamic comet/teardrop tail
    trailNodes: [
      { x: initialX, y: initialY },
      { x: initialX, y: initialY },
      { x: initialX, y: initialY },
      { x: initialX, y: initialY },
      { x: initialX, y: initialY },
      { x: initialX, y: initialY }
    ],
    velocity: { x: 0, y: 0 },
    canvasRect: { left: 0, top: 0, width: 0, height: 0 },
    maskIntensity: 0.0
  };

  const container = document.getElementById('manifesto-hand-interaction');
  const canvas = document.getElementById('manifesto-dots-canvas');
  const realHandImg = document.getElementById('manifesto-real-hand');
  if (!container || !canvas || !realHandImg) return;
  
  const ctx = canvas.getContext('2d', { alpha: true }); 
  
  let lastTime = performance.now();
  let timeElapsedMs = 0; 
  let renderRAF;
  let isInView = false;
  
  const randomRange = (min, max) => Math.random() * (max - min) + min;
  const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

  // Fine ambient studio motes drifting calmly across the hand space
  const ambientMotes = [];
  const moteCount = 28;
  for (let i = 0; i < moteCount; i++) {
    ambientMotes.push({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.1 + 0.6,
      speedY: Math.random() * 0.00010 + 0.00003,
      speedX: (Math.random() - 0.5) * 0.00005,
      alpha: Math.random() * 0.22 + 0.08
    });
  }

  // Whisper-thin anatomical flow strands tracing forearm and fingertips
  const anatomicalStrands = [
    {
      p0: { x: 0.85, y: 0.95 },
      p1: { x: 0.62, y: 0.60 },
      p2: { x: 0.45, y: 0.35 },
      p3: { x: 0.345, y: 0.15 },
      speed: 0.0006,
      phase: 0.2,
      amp: 8,
      alpha: 0.13
    },
    {
      p0: { x: 0.78, y: 0.98 },
      p1: { x: 0.55, y: 0.64 },
      p2: { x: 0.40, y: 0.42 },
      p3: { x: 0.28, y: 0.22 },
      speed: 0.0005,
      phase: 1.5,
      amp: 7,
      alpha: 0.11
    },
    {
      p0: { x: 0.92, y: 0.85 },
      p1: { x: 0.72, y: 0.58 },
      p2: { x: 0.58, y: 0.48 },
      p3: { x: 0.48, y: 0.38 },
      speed: 0.0007,
      phase: 3.1,
      amp: 6,
      alpha: 0.09
    },
    {
      p0: { x: 0.70, y: 0.90 },
      p1: { x: 0.50, y: 0.55 },
      p2: { x: 0.32, y: 0.32 },
      p3: { x: 0.22, y: 0.26 },
      speed: 0.00055,
      phase: 4.8,
      amp: 7,
      alpha: 0.10
    }
  ];

  // Use IntersectionObserver to pause rendering when section is not in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isInView = entry.isIntersecting;
      if (isInView && state.fragments.length > 0) {
        lastTime = performance.now();
        renderRAF = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(renderRAF);
      }
    });
  }, { rootMargin: '250px' });
  observer.observe(sectionElement);

  if (realHandImg.complete) {
    setupCanvas();
  } else {
    realHandImg.addEventListener('load', setupCanvas);
  }
  
  window.addEventListener('resize', handleResize);
  
  // Scoped event listeners on the entire section for expansive cursor capture
  sectionElement.addEventListener('mousemove', handleMouseMove);
  sectionElement.addEventListener('mouseleave', handleMouseLeave);
  sectionElement.addEventListener('mouseenter', handleMouseEnter);

  // Touch support for mobile tactile reveal
  sectionElement.addEventListener('touchstart', handleTouchStart, { passive: true });
  sectionElement.addEventListener('touchmove', handleTouchMove, { passive: true });
  sectionElement.addEventListener('touchend', handleTouchEnd, { passive: true });
  sectionElement.addEventListener('touchcancel', handleTouchEnd, { passive: true });

  function setupCanvas() {
    const imgWidth = realHandImg.naturalWidth;
    const imgHeight = realHandImg.naturalHeight;
    state.imageWidth = imgWidth;
    state.imageHeight = imgHeight;
    
    resizeElements();
    
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = imgWidth;
    offscreenCanvas.height = imgHeight;
    const offCtx = offscreenCanvas.getContext('2d');
    
    offCtx.drawImage(realHandImg, 0, 0, imgWidth, imgHeight);
    const imageData = offCtx.getImageData(0, 0, imgWidth, imgHeight);
    const data = imageData.data;
    
    state.fragments = [];
    
    for (let y = 0; y < imgHeight; y += CONSTANTS.DOT_SPACING) {
      for (let x = 0; x < imgWidth; x += CONSTANTS.DOT_SPACING) {
        const index = (y * imgWidth + x) * 4;
        const alpha = data[index + 3];
        
        if (alpha > CONSTANTS.ALPHA_THRESHOLD) {
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const luminance = (0.299*r + 0.587*g + 0.114*b) / 255; 
          
          // Subtle organic jitter on base position
          const jx = x + randomRange(-1.5, 1.5);
          const jy = y + randomRange(-1.5, 1.5);
          
          // Shape distribution: 70% dot, 20% rect, 10% diamond
          const randShape = Math.random();
          let shapeType = CONSTANTS.SHAPE_DOT;
          if (randShape > 0.90) shapeType = CONSTANTS.SHAPE_DIAMOND;
          else if (randShape > 0.70) shapeType = CONSTANTS.SHAPE_RECT;

          // Controlled size distribution: 80% small, 15% medium, 5% accent
          const randSize = Math.random();
          let baseSize = 0;
          if (randSize > 0.95) {
            baseSize = randomRange(2.0, 2.7); // 5% Accent
          } else if (randSize > 0.80) {
            baseSize = randomRange(1.4, 1.9); // 15% Medium
          } else {
            baseSize = randomRange(0.8, 1.3); // 80% Small
          }
          baseSize += luminance * 0.35;

          // Opacity variation mapped from luminance
          const baseAlpha = lerp(0.32, 0.88, luminance) * (alpha / 255);

          // Restrained warm ivory palette
          const colR = Math.round(lerp(214, 243, luminance));
          const colG = Math.round(lerp(208, 240, luminance));
          const colB = Math.round(lerp(198, 232, luminance));
          
          // Living Idle Particle Motion: Dual-harmonic desynchronized smooth drift
          const speedX1 = (Math.PI * 2) / randomRange(3500, 7500);
          const speedX2 = (Math.PI * 2) / randomRange(2200, 4800);
          const speedY1 = (Math.PI * 2) / randomRange(3200, 7000);
          const speedY2 = (Math.PI * 2) / randomRange(2400, 5200);

          let ampX = randomRange(0.6, 1.6);
          let ampY = randomRange(0.6, 1.8);
          if (Math.random() > 0.94) {
            ampX = randomRange(1.7, 2.1);
            ampY = randomRange(1.8, 2.3);
          }

          // Subtle opacity breathing cycle
          const breathSpeed = (Math.PI * 2) / randomRange(3000, 6000);
          const breathPhase = randomRange(0, Math.PI * 2);
          let breathAmp = randomRange(0.04, 0.09);

          // Micro CTA behavior for raised fingertip hotspot
          const hDist = Math.hypot(jx - imgWidth * CONSTANTS.HOTSPOT_X, jy - imgHeight * CONSTANTS.HOTSPOT_Y);
          const isNearHotspot = hDist < (imgWidth * 0.16); 
          if (isNearHotspot) {
            ampX += 0.40;
            ampY += 0.40;
            breathAmp += 0.08;
          }

          state.fragments.push({
            ox: jx, 
            oy: jy, 
            x: jx, 
            y: jy,  
            baseAlpha: baseAlpha, 
            colorStr: `${colR}, ${colG}, ${colB}`,
            baseSize: baseSize,
            shape: shapeType,
            baseRotation: randomRange(0, Math.PI),
            currentRotation: 0,
            speedX1: speedX1,
            speedX2: speedX2,
            speedY1: speedY1,
            speedY2: speedY2,
            phaseX1: randomRange(0, Math.PI * 2),
            phaseX2: randomRange(0, Math.PI * 2),
            phaseY1: randomRange(0, Math.PI * 2),
            phaseY2: randomRange(0, Math.PI * 2),
            ampX: ampX,
            ampY: ampY,
            breathSpeed: breathSpeed,
            breathPhase: breathPhase,
            breathAmp: breathAmp,
            isHotspotAccent: isNearHotspot
          });
        }
      }
    }
    
    if (isInView) {
      lastTime = performance.now();
      cancelAnimationFrame(renderRAF);
      renderRAF = requestAnimationFrame(render);
    }
  }

  function handleResize() {
    resizeElements();
  }

  function resizeElements() {
    if (state.imageWidth === 0) return;
    
    const isDesktop = window.innerWidth > 1024;
    const aspect = state.imageWidth / state.imageHeight; // ~1.066
    
    let drawWidth, drawHeight;
    
    if (isDesktop) {
      // Much larger overall scale: anchor forearm to bottom right, allow diagonal sweep
      let targetH = Math.min(window.innerHeight * 0.98, 930);
      drawHeight = targetH;
      drawWidth = targetH * aspect;
      
      const maxW = window.innerWidth * 0.65;
      if (drawWidth > maxW) {
        drawWidth = maxW;
        drawHeight = drawWidth / aspect;
      }
      if (drawWidth < 680 && window.innerWidth >= 1240) {
        drawWidth = Math.min(740, window.innerWidth * 0.60);
        drawHeight = drawWidth / aspect;
      }
    } else {
      // Mobile / Tablet: responsive scale with comfortable breathing room
      const targetW = Math.min(window.innerWidth * 0.92, 500);
      drawWidth = targetW;
      drawHeight = targetW / aspect;
    }
    
    canvas.width = drawWidth;
    canvas.height = drawHeight;
    canvas.style.width = `${drawWidth}px`;
    canvas.style.height = `${drawHeight}px`;
    
    realHandImg.style.width = `${drawWidth}px`;
    realHandImg.style.height = `${drawHeight}px`;
    
    ctx.setTransform(1, 0, 0, 1, 0, 0); 
    ctx.scale(drawWidth / state.imageWidth, drawHeight / state.imageHeight);
    
    state.canvasRect = canvas.getBoundingClientRect();
  }

  function handleMouseMove(e) {
    state.pointer.x = e.clientX;
    state.pointer.y = e.clientY;
    state.pointer.active = true;
  }

  function handleMouseLeave(e) {
    state.pointer.active = false;
  }

  function handleMouseEnter(e) {
    state.pointer.active = true;
    state.pointer.x = e.clientX;
    state.pointer.y = e.clientY;
  }

  function handleTouchStart(e) {
    if (e.touches.length > 0) {
      state.pointer.x = e.touches[0].clientX;
      state.pointer.y = e.touches[0].clientY;
      state.pointer.active = true;
    }
  }

  function handleTouchMove(e) {
    if (e.touches.length > 0) {
      state.pointer.x = e.touches[0].clientX;
      state.pointer.y = e.touches[0].clientY;
      state.pointer.active = true;
    }
  }

  function handleTouchEnd() {
    state.pointer.active = false;
  }

  function render(time) {
    if (!isInView) return;
    
    const dtMs = time - lastTime;
    timeElapsedMs += dtMs;
    lastTime = time;
    
    if (state.fragments.length > 0) {
      // Continuously update rect to account for scrolling
      state.canvasRect = canvas.getBoundingClientRect();
    }

    // --- CURSOR INERTIA & FLUID TRAIL CHAIN ---
    // Node 0 (head) follows pointer with inertia (~80ms lag)
    const prevHx = state.trailNodes[0].x;
    const prevHy = state.trailNodes[0].y;
    
    state.trailNodes[0].x += (state.pointer.x - state.trailNodes[0].x) * CONSTANTS.INERTIA_FACTOR;
    state.trailNodes[0].y += (state.pointer.y - state.trailNodes[0].y) * CONSTANTS.INERTIA_FACTOR;
    
    state.velocity.x = state.trailNodes[0].x - prevHx;
    state.velocity.y = state.trailNodes[0].y - prevHy;
    const speed = Math.hypot(state.velocity.x, state.velocity.y);
    
    // Subsequent nodes (1-5) follow previous node with progressive damping
    // This creates a smooth aerodynamic teardrop/comet tail along the motion curve
    const trailFactors = [0.28, 0.23, 0.19, 0.15, 0.12];
    for (let i = 1; i < 6; i++) {
      const prev = state.trailNodes[i - 1];
      const curr = state.trailNodes[i];
      curr.x += (prev.x - curr.x) * trailFactors[i - 1];
      curr.y += (prev.y - curr.y) * trailFactors[i - 1];
    }

    // Smooth entrance / exit for the reveal mask
    const targetIntensity = state.pointer.active ? 1.0 : (speed > 0.25 ? 0.6 : 0.0);
    state.maskIntensity += (targetIntensity - state.maskIntensity) * 0.12;

    // Canvas rendering is purely transparent
    ctx.clearRect(0, 0, state.imageWidth, state.imageHeight);

    // A. Living Ambient Studio Motes across the hand space
    for (let i = 0; i < moteCount; i++) {
      const m = ambientMotes[i];
      m.y -= m.speedY * dtMs;
      m.x += m.speedX * dtMs;
      if (m.y < 0) m.y = 1;
      if (m.x < 0) m.x = 1;
      if (m.x > 1) m.x = 0;

      const mx = m.x * state.imageWidth;
      const my = m.y * state.imageHeight;
      ctx.beginPath();
      ctx.arc(mx, my, m.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(243, 240, 232, ${m.alpha * 0.45})`;
      ctx.fill();
    }

    // B. Living Whisper-Thin Anatomical Strands along Hand Form
    for (let i = 0; i < anatomicalStrands.length; i++) {
      const s = anatomicalStrands[i];
      const tOsc = timeElapsedMs * s.speed + s.phase;
      const wave1 = Math.sin(tOsc) * s.amp;
      const wave2 = Math.cos(tOsc * 0.85) * s.amp;

      const p0x = s.p0.x * state.imageWidth;
      const p0y = s.p0.y * state.imageHeight;
      const p1x = s.p1.x * state.imageWidth + wave1;
      const p1y = s.p1.y * state.imageHeight + wave2;
      const p2x = s.p2.x * state.imageWidth + wave2;
      const p2y = s.p2.y * state.imageHeight + wave1;
      const p3x = s.p3.x * state.imageWidth;
      const p3y = s.p3.y * state.imageHeight;

      const grad = ctx.createLinearGradient(p0x, p0y, p3x, p3y);
      grad.addColorStop(0, 'rgba(243, 240, 232, 0)');
      grad.addColorStop(0.35, `rgba(243, 240, 232, ${s.alpha})`);
      grad.addColorStop(0.7, `rgba(225, 185, 195, ${s.alpha * 0.8})`);
      grad.addColorStop(1, 'rgba(243, 240, 232, 0)');

      ctx.beginPath();
      ctx.moveTo(p0x, p0y);
      ctx.bezierCurveTo(p1x, p1y, p2x, p2y, p3x, p3y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    
    if (state.fragments.length > 0) {
      const scaleX = state.imageWidth / canvas.width;
      const scaleY = state.imageHeight / canvas.height;
      
      const head = state.trailNodes[0];
      const pointerLocalX = (head.x - state.canvasRect.left) * scaleX;
      const pointerLocalY = (head.y - state.canvasRect.top) * scaleY;
      
      const interactionRadius = CONSTANTS.POINTER_RADIUS * scaleX;
      
      const hotspotLocalX = state.imageWidth * CONSTANTS.HOTSPOT_X;
      const hotspotLocalY = state.imageHeight * CONSTANTS.HOTSPOT_Y;
      const hotspotDist = Math.hypot(pointerLocalX - hotspotLocalX, pointerLocalY - hotspotLocalY);
      const hotspotActive = (hotspotDist < CONSTANTS.HOTSPOT_RADIUS * scaleX);

      const velNormX = speed > 0.1 ? (state.velocity.x / speed) : 0;
      const velNormY = speed > 0.1 ? (state.velocity.y / speed) : 0;

      for (let i = 0; i < state.fragments.length; i++) {
        const frag = state.fragments[i];
        
        // 1. Idle Micro-Motion: Dual-harmonic smooth organic drift (±0.5px to ±2px)
        const driftX = Math.sin(timeElapsedMs * frag.speedX1 + frag.phaseX1) * (frag.ampX * 0.7) +
                       Math.sin(timeElapsedMs * frag.speedX2 + frag.phaseX2) * (frag.ampX * 0.3);
        const driftY = Math.cos(timeElapsedMs * frag.speedY1 + frag.phaseY1) * (frag.ampY * 0.7) +
                       Math.cos(timeElapsedMs * frag.speedY2 + frag.phaseY2) * (frag.ampY * 0.3);
        
        const breath = Math.sin(timeElapsedMs * frag.breathSpeed + frag.breathPhase) * frag.breathAmp;
        
        // Continuous subtle architectural grazing gleam
        const gleamPhase = Math.sin(timeElapsedMs * 0.00085 + (frag.ox + frag.oy) * 0.0035);
        const gleamBoost = gleamPhase > 0 ? gleamPhase * 0.12 : 0;
        
        let targetFX = frag.ox + driftX;
        let targetFY = frag.oy + driftY;
        let targetRot = frag.baseRotation;
        let drawAlpha = Math.max(0.12, Math.min(1.0, frag.baseAlpha + breath + gleamBoost));
        let drawSize = frag.baseSize;
        
        // 2. Cursor Influence Reaction (energize, brighten, slight deflection)
        const dx = pointerLocalX - targetFX;
        const dy = pointerLocalY - targetFY;
        const dist = Math.hypot(dx, dy);
        
        if (state.pointer.active && dist < interactionRadius) {
          const force = (interactionRadius - dist) / interactionRadius; 
          targetFX += (velNormX * 3.8 + (dx / dist) * 1.6) * force;
          targetFY += (velNormY * 3.8 + (dy / dist) * 1.6) * force;
          targetRot += force * (Math.PI / 25); 
          drawSize += force * 0.45;
          drawAlpha = Math.min(1.0, drawAlpha + force * 0.25);
        }
        
        // 3. Fingertip Hotspot Material Interaction
        if (hotspotActive && Math.hypot(hotspotLocalX - targetFX, hotspotLocalY - targetFY) < interactionRadius) {
          const hDistPoint = Math.hypot(hotspotLocalX - targetFX, hotspotLocalY - targetFY);
          const hForce = Math.max(0, (interactionRadius - hDistPoint) / interactionRadius);
          targetFX += (hotspotLocalX - targetFX) * hForce * 0.12;
          targetFY += (hotspotLocalY - targetFY) * hForce * 0.12;
          drawSize += hForce * 0.30;
          drawAlpha = Math.min(1.0, drawAlpha + hForce * 0.20);
        }
        
        // Spring easing for physical settling
        frag.x += (targetFX - frag.x) * 0.14;
        frag.y += (targetFY - frag.y) * 0.14;
        frag.currentRotation += (targetRot - frag.currentRotation) * 0.1;
        
        ctx.fillStyle = `rgba(${frag.colorStr}, ${drawAlpha})`;
        
        if (frag.shape === CONSTANTS.SHAPE_DOT) {
          ctx.beginPath();
          ctx.arc(frag.x, frag.y, drawSize, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.save();
          ctx.translate(frag.x, frag.y);
          ctx.rotate(frag.currentRotation);
          if (frag.shape === CONSTANTS.SHAPE_DIAMOND) {
            ctx.rotate(Math.PI / 4);
          }
          ctx.fillRect(-drawSize, -drawSize, drawSize * 2, drawSize * 2);
          ctx.restore();
        }
      }
      
      // --- CSS MASK REVEAL: TEARDROP COMET TRAIL ---
      if (state.maskIntensity > 0.01) {
        const expand = hotspotActive ? 16 : 0;
        const speedStretch = Math.min(speed * 0.7, 14);
        
        const baseCore = [46 + expand, 38 + expand * 0.75, 30 + expand * 0.5, 22 + expand * 0.3, 15, 8];
        const baseSoft = [92 + expand + speedStretch, 78 + expand * 0.75 + speedStretch * 0.8, 64 + speedStretch * 0.6, 50 + speedStretch * 0.4, 38, 25];

        for (let i = 0; i < 6; i++) {
          const node = state.trailNodes[i];
          const nx = node.x - state.canvasRect.left;
          const ny = node.y - state.canvasRect.top;
          
          const c = baseCore[i] * state.maskIntensity;
          const s = baseSoft[i] * state.maskIntensity;
          
          realHandImg.style.setProperty(`--n${i}-x`, `${nx.toFixed(1)}px`);
          realHandImg.style.setProperty(`--n${i}-y`, `${ny.toFixed(1)}px`);
          realHandImg.style.setProperty(`--n${i}-core`, `${c.toFixed(1)}px`);
          realHandImg.style.setProperty(`--n${i}-soft`, `${s.toFixed(1)}px`);
        }
      } else {
        for (let i = 0; i < 6; i++) {
          realHandImg.style.setProperty(`--n${i}-core`, '0px');
          realHandImg.style.setProperty(`--n${i}-soft`, '0px');
        }
      }
    }
    
    renderRAF = requestAnimationFrame(render);
  }
}
