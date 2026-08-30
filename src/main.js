import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isDesktop = window.innerWidth > 768

/* Scroll-driven and pointer-driven motion is registered through matchMedia so
   it also initialises after a resize (or when the page first renders at zero
   width, e.g. in a background tab) instead of being decided once at load. */
const mm = gsap.matchMedia()
const DESKTOP = '(min-width: 769px)'

// Dev-only handle so timelines can be scrubbed from the console.
// Stripped from production builds by Vite.
if (import.meta.env.DEV) window.__margin = { gsap, ScrollTrigger }

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
      desc: 'Ein fokussierter Webauftritt mit klarer Struktur und starkem Design. Ohne unnötigen Overhead.',
      price: 'AB 690 €'
    },
    {
      id: 'business',
      title: 'BUSINESS',
      desc: 'Mehr Umfang, mehr Seiten — eine spürbar stärkere digitale Positionierung.',
      price: 'AB 1.290 €'
    },
    {
      id: 'signature',
      title: 'SIGNATURE',
      desc: 'Individuelle Art Direction, ausgefeilte Interaktionen und ein digitaler Auftritt, der niemandem sonst gehört.',
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
    { label: 'DISCOVER', desc: 'Wir analysieren das Unternehmen, die Zielgruppe und die digitale Ausgangslage.' },
    { label: 'DIRECTION', desc: 'Wir legen Struktur, Positionierung und visuelle Richtung fest.' },
    { label: 'DESIGN', desc: 'Wir übersetzen die Strategie in ein eigenständiges Interface.' },
    { label: 'BUILD', desc: 'Wir entwickeln die Website — responsiv, schnell und technisch präzise.' },
    { label: 'LAUNCH', desc: 'Wir testen, optimieren und bringen alles live.' }
  ]
}


/* =========================================
   SHARED SVG / RASTER TOOLKIT
   The dot-raster is the studio's signature mark: it builds the hero
   wordmark and the process stage words with the exact same mechanics,
   so both sections read as one instrument rather than two effects.
========================================= */

const SVG_NS = 'http://www.w3.org/2000/svg'

function svgEl(name, attrs = {}) {
  const el = document.createElementNS(SVG_NS, name)
  for (const key in attrs) el.setAttribute(key, attrs[key])
  return el
}

/**
 * Fills a <mask> with a grid of white cells. Everything drawn through the
 * mask therefore appears as a fine printed raster instead of solid type.
 * Returns the cells so a timeline can scatter and reassemble them.
 */
function buildRasterMask(maskEl, { x, y, width, height, cell = 10, dropout = 0.05 }) {
  const cols = Math.ceil(width / cell)
  const rows = Math.ceil(height / cell)
  const fragment = document.createDocumentFragment()
  const cells = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // A few missing cells keep the raster from looking mechanically perfect
      if (Math.random() < dropout) continue
      const rect = svgEl('rect', {
        x: x + col * cell,
        y: y + row * cell,
        width: cell - 1,
        height: cell - 1,
        fill: '#ffffff'
      })
      // Normalised position drives directional (sweep) staggers
      rect._u = cols > 1 ? col / (cols - 1) : 0
      rect._v = rows > 1 ? row / (rows - 1) : 0
      fragment.appendChild(rect)
      cells.push(rect)
    }
  }

  maskEl.appendChild(fragment)
  gsap.set(cells, { transformOrigin: '50% 50%' })
  return cells
}

/** Radial dial ticks — the "measuring device" read of an instrument. */
function buildDial(group, { cx = 500, cy = 500, radius = 300, count = 72, className = 'bp-tick' }) {
  const fragment = document.createDocumentFragment()
  const ticks = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2
    const major = i % 6 === 0
    const inner = radius - (major ? 16 : 7)
    const tick = svgEl('line', {
      x1: cx + Math.cos(angle) * inner,
      y1: cy + Math.sin(angle) * inner,
      x2: cx + Math.cos(angle) * radius,
      y2: cy + Math.sin(angle) * radius,
      class: major ? `${className} ${className}-major` : className
    })
    fragment.appendChild(tick)
    ticks.push(tick)
  }
  group.appendChild(fragment)
  return ticks
}

/**
 * Draughting lines for one word, derived from its live glyph metrics:
 * a vertical through every letter boundary, horizontals on the type's own
 * cap and baseline, and registration crosses where they meet — the way a
 * letterform is constructed on a drawing board before it is inked.
 */
function buildConstruction(group, textEl, { top, bottom, left, right, baseline }) {
  while (group.firstChild) group.removeChild(group.firstChild)

  const parts = []
  const frag = document.createDocumentFragment()
  const add = (el) => { frag.appendChild(el); parts.push(el); return el }

  let bbox
  try { bbox = textEl.getBBox() } catch { return parts }
  if (!bbox || !bbox.width) return parts

  // Vertical through each glyph boundary
  const count = textEl.getNumberOfChars()
  const xs = []
  for (let i = 0; i < count; i++) {
    try { xs.push(textEl.getStartPositionOfChar(i).x) } catch { /* glyph not laid out */ }
  }
  if (count) {
    try { xs.push(textEl.getEndPositionOfChar(count - 1).x) } catch { /* ignore */ }
  }

  // Extents are varied per glyph so the sheet reads as drafted by hand
  // rather than as a machine-perfect ruling.
  xs.forEach((x, i) => {
    const edge = i === 0 || i === xs.length - 1
    const reach = i % 3
    const y1 = edge ? top - 20 : top + (reach === 1 ? 46 : reach === 2 ? 18 : 0)
    const y2 = edge ? bottom + 20 : bottom - (reach === 2 ? 54 : reach === 1 ? 12 : 0)
    add(svgEl('line', {
      x1: x, y1, x2: x, y2,
      class: edge ? 'pp-c-line pp-c-strong' : 'pp-c-line'
    }))
  })

  // Horizontals taken from the type itself
  add(svgEl('line', { x1: left, y1: bbox.y, x2: right, y2: bbox.y, class: 'pp-c-line' }))
  add(svgEl('line', { x1: left, y1: bbox.y + bbox.height, x2: right, y2: bbox.y + bbox.height, class: 'pp-c-line' }))
  add(svgEl('line', { x1: left, y1: baseline, x2: right, y2: baseline, class: 'pp-c-line pp-c-strong' }))

  // Registration crosses where every third vertical meets the cap line
  xs.forEach((x, i) => {
    if (i % 3 !== 1) return
    const g = svgEl('g', { class: 'pp-c-mark', transform: `translate(${x}, ${bbox.y})` })
    g.appendChild(svgEl('line', { x1: -9, y1: 0, x2: 9, y2: 0 }))
    g.appendChild(svgEl('line', { x1: 0, y1: -9, x2: 0, y2: 9 }))
    add(g)
  })

  // Closing circle, echoing the full stop in the wordmark
  add(svgEl('circle', {
    cx: bbox.x + bbox.width + 42, cy: baseline, r: 15, class: 'pp-c-circle'
  }))

  group.appendChild(frag)
  return parts
}

/** Evenly spaced hairline grid inside a viewBox region. */
function buildGrid(group, { width, height, step, className = '' }) {
  const fragment = document.createDocumentFragment()
  const lines = []
  for (let x = step; x < width; x += step) {
    const line = svgEl('line', { x1: x, y1: 0, x2: x, y2: height, class: className })
    fragment.appendChild(line)
    lines.push(line)
  }
  for (let y = step; y < height; y += step) {
    const line = svgEl('line', { x1: 0, y1: y, x2: width, y2: y, class: className })
    fragment.appendChild(line)
    lines.push(line)
  }
  group.appendChild(fragment)
  return lines
}


/* =========================================
   DOM HYDRATION
========================================= */

function hydrateDOM() {
  // 1. Preload Process Editorial Board Images
  const processImages = [
    '/process/01-discover.jpg',
    '/process/02-direction.jpg',
    '/process/03-design.jpg',
    '/process/04-build.jpg',
    '/process/05-launch.jpg'
  ]
  processImages.forEach(src => {
    const img = new Image()
    img.src = src
  })

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

}

hydrateDOM()


/* =========================================
   FORM LOGIC — EDITORIAL MULTI-STEP
========================================= */

const FORM_STEP_ORDER = ['step-1', 'step-2', 'step-3', 'step-4']

const updateFormProgress = (stepIndex) => {
  const fill = document.getElementById('form-progress-fill')
  const currLabel = document.querySelector('[data-progress-curr]')
  const total = FORM_STEP_ORDER.length
  
  if (fill) {
    fill.style.width = `${(stepIndex / total) * 100}%`
  }
  if (currLabel) {
    currLabel.textContent = String(stepIndex).padStart(2, '0')
  }
}

/**
 * Calm, architectural step transition.
 * Fades and slides slightly in direction of movement, maintaining editorial poise.
 */
const transitionFormStep = (currentStep, targetStep, direction) => {
  if (!currentStep || !targetStep || currentStep === targetStep) return

  const outY = direction === 'back' ? 14 : -14
  const inFromY = direction === 'back' ? -14 : 14

  gsap.to(currentStep, {
    opacity: 0,
    y: outY,
    duration: 0.28,
    ease: 'power2.inOut',
    onComplete: () => {
      currentStep.classList.remove('active')
      currentStep.style.display = 'none'

      targetStep.style.display = 'block'
      targetStep.classList.add('active')

      const stepIndex = Number(targetStep.getAttribute('data-step-index')) || 1
      updateFormProgress(stepIndex)

      gsap.fromTo(targetStep,
        { opacity: 0, y: inFromY },
        {
          opacity: 1,
          y: 0,
          duration: 0.38,
          ease: 'power2.out',
          onComplete: () => {
            // Accessible autofocus on first visible text input
            const firstInput = targetStep.querySelector('input:not([type="hidden"])')
            if (firstInput) {
              firstInput.focus({ preventScroll: true })
            }
          }
        }
      )
    }
  })
}

const setupForm = () => {
  const form = document.getElementById('project-form')
  if (!form) return

  // Apply Web3Forms Key
  const keyInput = document.getElementById('web3forms-key')
  if (keyInput) keyInput.value = CONFIG.WEB3FORMS_ACCESS_KEY || ''

  updateFormProgress(1)

  // Text Choice Selection (Step 2 & 3)
  document.querySelectorAll('.text-choice-group').forEach(group => {
    const inputId = group.getAttribute('data-input-id')
    const hiddenInput = document.getElementById(inputId)
    const choices = group.querySelectorAll('.text-choice-item')
    const step = group.closest('.form-step')
    const stepNextBtn = step?.querySelector('.form-btn-next')

    choices.forEach(choice => {
      choice.addEventListener('click', () => {
        choices.forEach(c => c.classList.remove('selected'))
        choice.classList.add('selected')
        if (hiddenInput) {
          hiddenInput.value = choice.getAttribute('data-value') || ''
        }
        if (stepNextBtn) {
          stepNextBtn.disabled = false
        }
      })
    })
  })

  // Next Step Action
  document.querySelectorAll('.form-btn-next').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      if (btn.disabled) return

      const currentStep = btn.closest('.form-step')
      const nextId = btn.getAttribute('data-next')
      const nextStep = nextId ? document.getElementById(nextId) : null
      if (!currentStep || !nextStep) return

      // Validate required visible text inputs
      const requiredInputs = currentStep.querySelectorAll('input[required]:not([type="hidden"])')
      for (const input of requiredInputs) {
        if (!input.value.trim()) {
          input.focus()
          input.classList.add('field-invalid')
          setTimeout(() => input.classList.remove('field-invalid'), 1200)
          return
        }
      }

      transitionFormStep(currentStep, nextStep, 'forward')
    })
  })

  // Back Step Action
  document.querySelectorAll('.form-btn-back').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const currentStep = btn.closest('.form-step')
      const prevId = btn.getAttribute('data-prev')
      const prevStep = prevId ? document.getElementById(prevId) : null
      if (!currentStep || !prevStep) return

      transitionFormStep(currentStep, prevStep, 'back')
    })
  })

  // Enter Key Navigation for Text Inputs
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const activeEl = document.activeElement
      if (activeEl && activeEl.tagName === 'INPUT' && activeEl.type !== 'submit') {
        e.preventDefault()
        const currentStep = activeEl.closest('.form-step')
        if (!currentStep) return

        const nextBtn = currentStep.querySelector('.form-btn-next')
        const submitBtn = currentStep.querySelector('.form-btn-submit')

        if (nextBtn && !nextBtn.disabled) {
          nextBtn.click()
        } else if (submitBtn) {
          submitBtn.click()
        }
      }
    }
  })

  // Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const submitBtn = form.querySelector('.form-btn-submit')
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null
    
    if (btnText) btnText.textContent = 'Wird gesendet...'
    if (submitBtn) submitBtn.disabled = true

    if (CONFIG.WEB3FORMS_ACCESS_KEY) {
      try {
        const formData = new FormData(form)
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        })
        if (response.ok) {
          showFormSuccess()
        } else {
          throw new Error('Submit failed')
        }
      } catch (err) {
        console.error(err)
        if (btnText) btnText.textContent = 'Fehler — erneut versuchen'
        if (submitBtn) submitBtn.disabled = false
      }
    } else {
      // Presentation fallback
      setTimeout(showFormSuccess, 800)
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

// Capabilities row hover — dims siblings, nudges the title. The instrument
// visual itself is wired up in initCapabilitiesInstrument() inside initMotion().
const serviceRows = document.querySelectorAll('.service-row')
if (serviceRows.length) {
  serviceRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      serviceRows.forEach(r => { if (r !== row) r.style.opacity = '0.4' })
      row.style.opacity = '1'
      const title = row.querySelector('.service-title')
      if (title) title.style.transform = 'translateX(8px)'
    })

    row.addEventListener('mouseleave', () => {
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
  if (import.meta.env.DEV) window.__margin.masterTl = masterTl

  if (loader) {
    masterTl
      .fromTo('.loader-brand', { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: 'power4.out' })
      .to('.loader-brand .dot', { opacity: 1, duration: 0.4 }, '-=0.2')
      .to('.loader-progress-fill', { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, '-=0.4')
      .to(loader, { yPercent: -100, duration: 0.8, ease: 'expo.inOut', delay: 0.2 })
  }

  // 1. Hero Text Reveal — hard mask openings, nothing fades in unmotivated
  const heroLines = document.querySelectorAll('.hero-headline .hl-inner')
  const heroEntry = loader ? '-=0.45' : 0

  if (heroLines.length) {
    masterTl.fromTo(heroLines,
      { yPercent: 112 },
      { yPercent: 0, duration: 1.1, stagger: 0.085, ease: 'expo.out' },
      heroEntry
    )
  }

  masterTl.fromTo('.hero-eyebrow',
    { opacity: 0, x: -14 },
    { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
    heroEntry
  )

  masterTl.fromTo('.hero-copy',
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
    '-=0.65'
  )

  masterTl.fromTo('.hero-scroll-cue',
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: 'power2.out' },
    '-=0.4'
  )

  // The architectural hairlines build like scanner beams, not fades
  masterTl.fromTo('.hero-grid-lines .line-v-1, .hero-grid-lines .line-v-2',
    { scaleY: 0, transformOrigin: 'top center' },
    { scaleY: 1, duration: 1.3, stagger: 0.12, ease: 'power3.inOut' },
    heroEntry
  )
  masterTl.fromTo('.hero-grid-lines .line-h-1',
    { scaleX: 0, transformOrigin: 'left center' },
    { scaleX: 1, duration: 1.3, ease: 'power3.inOut' },
    heroEntry
  )

  /* 1b. THE INSTRUMENT — hero signature visual
     A precision measuring device rather than a background loop: it is built
     on load, driven by the cursor, and dollied by scroll. */
  function initHeroInstrument() {
    const heroSection = document.getElementById('home')
    const instrument = document.getElementById('hero-instrument')
    const sigWords = gsap.utils.toArray('.bp-word')
    const rasterMask = document.getElementById('raster-mask')

    if (!heroSection || !instrument || !sigWords.length || !rasterMask) return

    const gridGroup = instrument.querySelector('.bp-grid')
    const dialGroup = instrument.querySelector('.bp-dial')
    const layers = gsap.utils.toArray(instrument.querySelectorAll('.bp-layer'))
    const hudCoords = instrument.querySelector('[data-hud="coords"]')
    const hudMode = instrument.querySelector('[data-hud="mode"]')
    const hudScale = instrument.querySelector('[data-hud="scale"]')
    const hudTitle = instrument.querySelector('.hud-tl')

    // ---- Build the geometry -------------------------------------------
    if (gridGroup) buildGrid(gridGroup, { width: 1000, height: 1000, step: 50, className: 'bp-grid-line' })
    const dialTicks = dialGroup ? buildDial(dialGroup, { radius: 300, count: 72 }) : []

    // Sized to the cap-height band of the widest word (BRANDING, x 227–773)
    // cell 11 rather than 8: the mask is ~700 rects instead of ~1250, and it
    // sits in the hero, so every frame the lens's backdrop-filter moves the
    // compositor re-rasterises it. Coarser raster, same printed-dot language.
    const maskCells = buildRasterMask(rasterMask, {
      x: 200, y: 435, width: 600, height: 135, cell: 11, dropout: 0.02
    })

    gsap.set(sigWords, { opacity: 0 })
    gsap.set(sigWords[0], { opacity: 1 })

    // ---- Intro: the device powers up ----------------------------------
    const bootTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Corner brackets draw themselves via native stroke dashing
    const framePaths = gsap.utils.toArray(instrument.querySelectorAll('.bp-frame path'))
    framePaths.forEach(path => {
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
    })

    bootTl
      .to(framePaths,
        { strokeDashoffset: 0, duration: 1.1, stagger: 0.08, ease: 'power3.inOut' }, 0)
      .fromTo(dialTicks,
        { opacity: 0, scale: 0.4, transformOrigin: '500px 500px' },
        { opacity: 1, scale: 1, duration: 0.9, stagger: { amount: 0.5, from: 'start' } }, 0.1)
      .fromTo('.bp-ring',
        { scale: 0.55, opacity: 0, transformOrigin: '500px 500px' },
        { scale: 1, opacity: 1, duration: 1.4, stagger: 0.1, ease: 'expo.out' }, 0.15)
      .fromTo('.bp-axis',
        { scaleX: 0, scaleY: 0, transformOrigin: '500px 500px' },
        { scaleX: 1, scaleY: 1, duration: 1.2, ease: 'power3.inOut' }, 0.2)
      .fromTo('.bp-grid-line',
        { opacity: 0 },
        { opacity: 1, duration: 0.9, stagger: { amount: 0.6, from: 'random' } }, 0.25)
      .fromTo('.bp-mark',
        { opacity: 0, scale: 0.5, transformOrigin: '50% 50%' },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.07, ease: 'back.out(2)' }, 0.5)
      // The wordmark prints itself cell by cell
      .fromTo(maskCells,
        { scale: 0.15, opacity: 0, rotation: () => gsap.utils.random(-60, 60) },
        {
          scale: 1, opacity: 1, rotation: 0,
          duration: 0.9, ease: 'expo.out',
          stagger: { amount: 0.7, from: 'center', grid: 'auto' }
        }, 0.55)

    masterTl.add(bootTl, loader ? '-=1.5' : 0.1)

    // ---- Idle: quiet, continuous life ---------------------------------
    const idleTl = gsap.timeline({ paused: true })
    idleTl.to('.bp-ring-1', { rotation: 360, transformOrigin: '500px 500px', duration: 120, ease: 'none', repeat: -1 }, 0)
    idleTl.to('.bp-ring-3', { rotation: -360, transformOrigin: '500px 500px', duration: 80, ease: 'none', repeat: -1 }, 0)
    idleTl.to('.bp-dial', { rotation: 360, transformOrigin: '500px 500px', duration: 240, ease: 'none', repeat: -1 }, 0)
    idleTl.to('.bp-pulse', { opacity: 0.25, scale: 0.75, transformOrigin: '50% 50%', duration: 1.6, yoyo: true, ease: 'sine.inOut', repeat: -1, stagger: 0.22 }, 0)
    idleTl.to('.bp-grid', { x: -6, y: -4, duration: 11, yoyo: true, ease: 'sine.inOut', repeat: -1 }, 0)

    // Cherry measuring sweep, deliberately rare so it stays an event
    const scanTl = gsap.timeline({ repeat: -1, repeatDelay: 5.5, paused: true })
    scanTl.fromTo('.bp-scanline',
      { attr: { y1: 60, y2: 60 }, opacity: 0 },
      { attr: { y1: 940, y2: 940 }, opacity: 1, duration: 2.6, ease: 'power2.inOut' })
      .to('.bp-scanline', { opacity: 0, duration: 0.5 }, '-=0.5')

    // ---- Word cycle: disperse, re-print --------------------------------
    const wordTl = gsap.timeline({ repeat: -1, paused: true })
    const wordCount = sigWords.length

    for (let i = 0; i < wordCount; i++) {
      const currentWord = sigWords[i]
      const nextWord = sigWords[(i + 1) % wordCount]

      wordTl.addLabel(`start_${i}`, '+=3.6')

      wordTl.to(maskCells, {
        x: () => gsap.utils.random(-44, 44),
        y: () => gsap.utils.random(-44, 44),
        scale: 0.18,
        opacity: 0,
        rotation: () => gsap.utils.random(-90, 90),
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: { amount: 0.4, from: 'random' }
      }, `start_${i}`)

      wordTl.set(currentWord, { opacity: 0 }, `start_${i}+=0.85`)
      wordTl.set(nextWord, { opacity: 1 }, `start_${i}+=0.85`)
      // The readout names whatever the instrument is currently resolving
      wordTl.call(() => {
        if (hudTitle) hudTitle.textContent = `MARGIN / ${nextWord.textContent.replace('.', '')}`
      }, null, `start_${i}+=0.85`)

      wordTl.to(maskCells, {
        x: 0, y: 0, scale: 1, opacity: 1, rotation: 0,
        duration: 0.85,
        ease: 'expo.out',
        stagger: { amount: 0.32, from: 'random' }
      }, `start_${i}+=0.95`)
    }

    /* ---- Living measurement field --------------------------------------
       A sparse field of points that drifts on its own and is pushed aside by
       the cursor, plus a reticle that snaps to the nearest grid intersection.
       The snap is what makes the pointer feel intentional: the instrument is
       taking a reading, not following a mouse. */
    const dotsGroup = instrument.querySelector('.bp-dots')
    const linksGroup = instrument.querySelector('.bp-links')
    const reticle = instrument.querySelector('.bp-reticle')
    const reticleLabel = instrument.querySelector('.bp-ret-label')

    const points = []
    if (dotsGroup) {
      const STEP = 100
      const frag = document.createDocumentFragment()
      for (let gx = 1; gx < 10; gx++) {
        for (let gy = 1; gy < 10; gy++) {
          // Thin the field out so it reads as scattered survey points
          if ((gx + gy) % 2 === 0) continue
          const bx = gx * STEP + gsap.utils.random(-16, 16)
          const by = gy * STEP + gsap.utils.random(-16, 16)
          const dot = svgEl('circle', { cx: bx, cy: by, r: gsap.utils.random(1, 2.1), class: 'bp-dot' })
          frag.appendChild(dot)
          points.push({
            el: dot, bx, by, x: bx, y: by,
            ampX: gsap.utils.random(3, 9), ampY: gsap.utils.random(3, 9),
            spX: gsap.utils.random(0.00012, 0.00032), spY: gsap.utils.random(0.00012, 0.00032),
            phX: Math.random() * Math.PI * 2, phY: Math.random() * Math.PI * 2
          })
        }
      }
      dotsGroup.appendChild(frag)
    }

    // Reusable link lines drawn between the cursor and the points it reaches
    const LINK_MAX = 6
    const links = []
    if (linksGroup) {
      for (let i = 0; i < LINK_MAX; i++) {
        const l = svgEl('line', { x1: 0, y1: 0, x2: 0, y2: 0, class: 'bp-link', opacity: 0 })
        linksGroup.appendChild(l)
        links.push(l)
      }
    }

    // Pointer position in viewBox units; -1 means "not over the instrument"
    const ptr = { x: -1, y: -1, active: false }
    const ret = { x: 500, y: 500 }
    let fieldRAF = null
    // Reused nearest-point buffers for the link pass — see renderField()
    const nearD = new Float64Array(LINK_MAX)
    const nearP = new Array(LINK_MAX)
    let linksVisible = false

    function renderField(t) {
      const REACH = 190

      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        let tx = p.bx + Math.sin(t * p.spX + p.phX) * p.ampX
        let ty = p.by + Math.cos(t * p.spY + p.phY) * p.ampY

        if (ptr.active) {
          const dx = tx - ptr.x
          const dy = ty - ptr.y
          const d = Math.hypot(dx, dy)
          if (d < REACH && d > 0.001) {
            const force = (REACH - d) / REACH
            tx += (dx / d) * force * 34
            ty += (dy / d) * force * 34
          }
        }

        p.x += (tx - p.x) * 0.09
        p.y += (ty - p.y) * 0.09
        p.el.setAttribute('cx', p.x.toFixed(2))
        p.el.setAttribute('cy', p.y.toFixed(2))
      }

      /* Link the reticle to the nearest points, closest first.
         Insertion into a fixed LINK_MAX buffer instead of map→filter→sort→
         slice: same result, but it allocates nothing per frame (the old
         version built 40 wrapper objects plus three arrays every frame). */
      if (links.length) {
        if (ptr.active) {
          let nearCount = 0
          for (let i = 0; i < points.length; i++) {
            const p = points[i]
            const d = Math.hypot(p.x - ret.x, p.y - ret.y)
            if (d >= 230) continue
            if (nearCount === LINK_MAX && d >= nearD[nearCount - 1]) continue
            let slot = Math.min(nearCount, LINK_MAX - 1)
            while (slot > 0 && nearD[slot - 1] > d) {
              nearD[slot] = nearD[slot - 1]
              nearP[slot] = nearP[slot - 1]
              slot--
            }
            nearD[slot] = d
            nearP[slot] = p
            if (nearCount < LINK_MAX) nearCount++
          }

          for (let i = 0; i < links.length; i++) {
            const l = links[i]
            if (i >= nearCount) { l.setAttribute('opacity', '0'); continue }
            l.setAttribute('x1', ret.x.toFixed(1))
            l.setAttribute('y1', ret.y.toFixed(1))
            l.setAttribute('x2', nearP[i].x.toFixed(1))
            l.setAttribute('y2', nearP[i].y.toFixed(1))
            l.setAttribute('opacity', (0.5 * (1 - nearD[i] / 230)).toFixed(3))
          }
        } else if (linksVisible) {
          // Only clear once on the transition, not on every idle frame
          for (let i = 0; i < links.length; i++) links[i].setAttribute('opacity', '0')
        }
        linksVisible = ptr.active
      }

      // Reticle eases toward the snapped reading
      if (reticle && ptr.active) {
        const snapX = Math.round(ptr.x / 50) * 50
        const snapY = Math.round(ptr.y / 50) * 50
        ret.x += (snapX - ret.x) * 0.06
        ret.y += (snapY - ret.y) * 0.06
        reticle.setAttribute('transform', `translate(${ret.x.toFixed(1)}, ${ret.y.toFixed(1)})`)
        if (reticleLabel) {
          reticleLabel.textContent = `${String(Math.round(snapX)).padStart(3, '0')} · ${String(Math.round(snapY)).padStart(3, '0')}`
        }
      }

      fieldRAF = requestAnimationFrame(renderField)
    }

    function startField() {
      if (fieldRAF === null) fieldRAF = requestAnimationFrame(renderField)
    }
    function stopField() {
      if (fieldRAF !== null) { cancelAnimationFrame(fieldRAF); fieldRAF = null }
    }

    // ---- Cursor: the instrument tracks the visitor ----------------------
    mm.add(`${DESKTOP} and (hover: hover)`, () => {
      const quickTilt = {
        rx: gsap.quickTo(instrument, 'rotationX', { duration: 0.8, ease: 'power3.out' }),
        ry: gsap.quickTo(instrument, 'rotationY', { duration: 0.8, ease: 'power3.out' })
      }
      const layerMovers = layers.map(layer => {
        const depth = parseFloat(layer.dataset.depth) || 0.5
        return {
          depth,
          x: gsap.quickTo(layer, 'x', { duration: 1, ease: 'power3.out' }),
          y: gsap.quickTo(layer, 'y', { duration: 1, ease: 'power3.out' })
        }
      })

      /* Both rects are cached and only re-read when the layout can actually
         have changed (scroll/resize). Measuring them inside the handler
         forced a synchronous layout on every single mousemove — with a
         high-polling-rate mouse that alone was enough to stall the frame. */
      let heroRect = heroSection.getBoundingClientRect()
      let instRect = instrument.getBoundingClientRect()
      let rectsDirty = false
      const markRects = () => { rectsDirty = true }
      window.addEventListener('scroll', markRects, { passive: true })
      window.addEventListener('resize', markRects)

      let moveRAF = null
      let latest = { u: 0.5, v: 0.5 }
      let pending = null

      /* Mousemove events fire far more often than the screen refreshes, so
         the work is coalesced into one rAF — several events per frame now
         cost the same as one. */
      const applyMove = () => {
        moveRAF = null
        const e = pending
        if (!e) return

        if (rectsDirty) {
          heroRect = heroSection.getBoundingClientRect()
          instRect = instrument.getBoundingClientRect()
          rectsDirty = false
        }

        const u = (e.x - heroRect.left) / heroRect.width
        const v = (e.y - heroRect.top) / heroRect.height
        const nx = u - 0.5
        const ny = v - 0.5
        latest = { u, v }

        // Pointer in the instrument's own viewBox units, for the dot field
        if (instRect.width && instRect.height) {
          ptr.x = ((e.x - instRect.left) / instRect.width) * 1000
          ptr.y = ((e.y - instRect.top) / instRect.height) * 1000
          const inside = ptr.x > -160 && ptr.x < 1160 && ptr.y > -160 && ptr.y < 1160
          if (inside !== ptr.active) {
            ptr.active = inside
            gsap.to(reticle, { opacity: inside ? 1 : 0, duration: 0.4, ease: 'power2.out' })
          }
        }

        quickTilt.ry(nx * 9)
        quickTilt.rx(-ny * 7)
        for (let i = 0; i < layerMovers.length; i++) {
          const m = layerMovers[i]
          m.x(nx * 46 * m.depth)
          m.y(ny * 46 * m.depth)
        }

        if (hudCoords) hudCoords.textContent = `X ${latest.u.toFixed(3)} · Y ${latest.v.toFixed(3)}`
        if (hudMode && hudMode.textContent !== 'TRACKING') hudMode.textContent = 'TRACKING'
      }

      const onMove = (e) => {
        pending = { x: e.clientX, y: e.clientY }
        if (moveRAF === null) moveRAF = requestAnimationFrame(applyMove)
      }

      const onLeave = () => {
        quickTilt.rx(0); quickTilt.ry(0)
        layerMovers.forEach(m => { m.x(0); m.y(0) })
        if (hudMode) hudMode.textContent = 'IDLE'
        ptr.active = false
        gsap.to(reticle, { opacity: 0, duration: 0.4, ease: 'power2.out' })
      }

      heroSection.addEventListener('mousemove', onMove, { passive: true })
      heroSection.addEventListener('mouseleave', onLeave)

      return () => {
        heroSection.removeEventListener('mousemove', onMove)
        heroSection.removeEventListener('mouseleave', onLeave)
        window.removeEventListener('scroll', markRects)
        window.removeEventListener('resize', markRects)
        if (moveRAF) cancelAnimationFrame(moveRAF)
        gsap.set(instrument, { rotationX: 0, rotationY: 0 })
        gsap.set(layers, { x: 0, y: 0 })
      }
    })

    // ---- Scroll: dolly the device away as the page hands off ------------
    mm.add(DESKTOP, () => {
      gsap.to(instrument, {
        scale: 1.28,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          onUpdate: (self) => {
            if (hudScale) hudScale.textContent = `SCALE ${(1 + self.progress * 0.28).toFixed(3)}`
          }
        }
      })

      gsap.to('.hero-subtext', {
        y: 70,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '65% top',
          scrub: 0.6
        }
      })
    })

    // Pause every loop while the hero is off-screen
    ScrollTrigger.create({
      trigger: heroSection,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => { idleTl.play(); wordTl.play(); scanTl.play(); startField() },
      onLeave: () => { idleTl.pause(); wordTl.pause(); scanTl.pause(); stopField() },
      onEnterBack: () => { idleTl.play(); wordTl.play(); scanTl.play(); startField() },
      onLeaveBack: () => { idleTl.pause(); wordTl.pause(); scanTl.pause(); stopField() }
    })

    startField()
  }

  initHeroInstrument()
  initHeroLens()

  /* 1c. THE DRAFTING TABLE — capabilities instrument
     Same mechanics as the hero and process instruments (grid, dial, glyph-
     derived construction lines, raster print), inverted for the ivory page:
     ink on paper instead of light on glass. At rest it is a blank sheet with
     quiet ambient motion; each service drafts its own tool on hover, so this
     reads as a working desk rather than a list next to swapped clipart. */
  function initCapabilitiesInstrument() {
    const section = document.getElementById('capabilities')
    const instrument = document.getElementById('capabilities-instrument')
    const rows = gsap.utils.toArray('.service-row')
    const mask = document.getElementById('cap-raster-mask')
    if (!section || !instrument || !rows.length || !mask) return

    const gridGroup = instrument.querySelector('.cap-grid')
    const dialGroup = instrument.querySelector('.cap-dial')
    const dotsGroup = instrument.querySelector('.cap-dots')
    const toolsGroup = instrument.querySelector('.cap-tools')
    const constructionGroup = instrument.querySelector('.cap-construction')
    const outlineGroup = instrument.querySelector('.cap-outline')
    const typoGroup = instrument.querySelector('.cap-typo')
    const hudLabel = instrument.querySelector('[data-hud="state"]')

    if (gridGroup) buildGrid(gridGroup, { width: 600, height: 600, step: 30, className: 'cap-grid-line' })
    if (dialGroup) buildDial(dialGroup, { cx: 300, cy: 300, radius: 184, count: 48, className: 'cap-tick' })

    // One outline + printed word per service, invisible until its row drafts
    const words = rows.map(row => {
      const essence = row.dataset.essence || ''
      const outline = svgEl('text', { x: 300, y: 300, class: 'cap-word-outline', opacity: 0 })
      outline.textContent = essence
      outlineGroup.appendChild(outline)

      const solid = svgEl('text', { x: 300, y: 300, class: 'cap-word', opacity: 0 })
      solid.textContent = essence
      typoGroup.appendChild(solid)

      return { row, outline, solid, tool: row.dataset.tool }
    })

    // Sized to the cap-height band of the longest essence word (STRUCTURE),
    // with margin so no glyph is clipped by the mask edge
    const cells = buildRasterMask(mask, { x: 100, y: 235, width: 400, height: 130, cell: 9, dropout: 0.03 })

    // Idle dust: a dozen points on their own slow independent drift
    const DOT_COUNT = 12
    for (let i = 0; i < DOT_COUNT; i++) {
      const angle = (i / DOT_COUNT) * Math.PI * 2
      const r = gsap.utils.random(95, 250)
      const dot = svgEl('circle', {
        cx: 300 + Math.cos(angle) * r, cy: 300 + Math.sin(angle) * r,
        r: gsap.utils.random(1, 1.8), class: 'cap-dot'
      })
      dotsGroup.appendChild(dot)
      gsap.to(dot, {
        x: () => gsap.utils.random(-14, 14),
        y: () => gsap.utils.random(-14, 14),
        duration: gsap.utils.random(6, 11),
        repeat: -1, yoyo: true, ease: 'sine.inOut'
      })
    }

    // Ring and dial idle-rotate in opposite directions, paused off-screen
    const idleTl = gsap.timeline({ paused: true })
    idleTl.to('.cap-ring', { rotation: 360, transformOrigin: '300px 300px', duration: 150, ease: 'none', repeat: -1 }, 0)
    idleTl.to('.cap-dial', { rotation: -360, transformOrigin: '300px 300px', duration: 200, ease: 'none', repeat: -1 }, 0)

    ScrollTrigger.create({
      trigger: section, start: 'top bottom', end: 'bottom top',
      onEnter: () => idleTl.play(), onLeave: () => idleTl.pause(),
      onEnterBack: () => idleTl.play(), onLeaveBack: () => idleTl.pause()
    })

    /* Draws the construction tool for one service: a compass arc for design,
       a module rail for development, a locking crosshair for direction. Built
       fresh on every hover so the stroke-draw always plays. */
    function drawTool(tool) {
      const g = svgEl('g', { class: 'cap-tool-mark' })

      if (tool === 'compass') {
        g.appendChild(svgEl('line', { x1: 300, y1: 300, x2: 300, y2: 150, class: 'cap-tool-line' }))
        g.appendChild(svgEl('path', { d: 'M 300 150 A 150 150 0 0 1 440 380', class: 'cap-tool-line' }))
        g.appendChild(svgEl('circle', { cx: 300, cy: 300, r: 3, class: 'cap-tool-dot' }))
        g.appendChild(svgEl('circle', { cx: 300, cy: 150, r: 3, class: 'cap-tool-dot' }))
      } else if (tool === 'rail') {
        for (let i = -2; i <= 2; i++) {
          g.appendChild(svgEl('line', { x1: 300 + i * 44, y1: 130, x2: 300 + i * 44, y2: 470, class: 'cap-tool-line' }))
        }
        ;[190, 260, 330, 400].forEach(y => {
          g.appendChild(svgEl('line', { x1: 212, y1: y, x2: 388, y2: y, class: 'cap-tool-line cap-tool-faint' }))
        })
      } else if (tool === 'lock') {
        ;[70, 110, 150].forEach(r => g.appendChild(svgEl('circle', { cx: 300, cy: 300, r, class: 'cap-tool-line' })))
      }

      toolsGroup.appendChild(g)

      g.querySelectorAll('line.cap-tool-line, path.cap-tool-line').forEach(l => {
        const len = l.getTotalLength()
        gsap.set(l, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(l, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' })
      })

      const toolDots = g.querySelectorAll('.cap-tool-dot')
      if (toolDots.length) {
        gsap.fromTo(toolDots,
          { opacity: 0, scale: 0, transformOrigin: '50% 50%' },
          { opacity: 1, scale: 1, duration: 0.4, delay: 0.5, ease: 'back.out(2)' })
      }
    }

    let activeTl = null

    function activate(entry) {
      if (activeTl) activeTl.kill()
      const tl = gsap.timeline()
      activeTl = tl

      if (toolsGroup.children.length) {
        tl.to([...toolsGroup.children], {
          opacity: 0, duration: 0.25, ease: 'power2.in',
          onComplete: () => { toolsGroup.innerHTML = '' }
        }, 0)
      }
      if (constructionGroup.children.length) {
        tl.to([...constructionGroup.children], { opacity: 0, duration: 0.25, ease: 'power2.in' }, 0)
      }
      words.forEach(w => { if (w !== entry) tl.to([w.outline, w.solid], { opacity: 0, duration: 0.2 }, 0) })
      tl.to(cells, { opacity: 0, scaleX: 0.2, duration: 0.25, ease: 'power2.in', stagger: { amount: 0.15, from: 'random' } }, 0)

      tl.call(() => {
        drawTool(entry.tool)
        if (hudLabel) hudLabel.textContent = entry.row.dataset.essence

        const parts = buildConstruction(constructionGroup, entry.outline, {
          top: 220, bottom: 380, left: 90, right: 510, baseline: 300
        })
        parts.forEach(p => {
          if (p.tagName === 'line') {
            const len = p.getTotalLength()
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
            gsap.to(p, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' })
          } else {
            gsap.fromTo(p, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' },
              { opacity: 1, scale: 1, duration: 0.4, delay: 0.2, ease: 'back.out(2)' })
          }
        })
        gsap.set(entry.outline, { opacity: 0, scaleY: 0.94, transformOrigin: '300px 300px' })
        gsap.set(entry.solid, { opacity: 0 })
      }, null, 0.3)

      tl.to(entry.outline, { opacity: 1, scaleY: 1, duration: 0.4, ease: 'expo.out' }, 0.45)
      tl.to(cells, { opacity: 1, scaleX: 1, duration: 0.4, ease: 'expo.out', stagger: { amount: 0.28, from: 'center' } }, 0.55)
      tl.set(entry.solid, { opacity: 1 }, 0.55)
    }

    function deactivate() {
      if (activeTl) activeTl.kill()
      const tl = gsap.timeline()
      activeTl = tl
      if (toolsGroup.children.length) {
        tl.to([...toolsGroup.children], {
          opacity: 0, duration: 0.3, ease: 'power2.in',
          onComplete: () => { toolsGroup.innerHTML = '' }
        }, 0)
      }
      if (constructionGroup.children.length) {
        tl.to([...constructionGroup.children], {
          opacity: 0, duration: 0.3, ease: 'power2.in',
          onComplete: () => { constructionGroup.innerHTML = '' }
        }, 0)
      }
      words.forEach(w => tl.to([w.outline, w.solid], { opacity: 0, duration: 0.25 }, 0))
      tl.to(cells, { opacity: 0, duration: 0.25 }, 0)
      if (hudLabel) tl.call(() => { hudLabel.textContent = 'DRAFTING TABLE' }, null, 0.1)
    }

    words.forEach(entry => entry.row.addEventListener('mouseenter', () => activate(entry)))
    section.querySelector('.services-list')?.addEventListener('mouseleave', deactivate)

    if (import.meta.env.DEV) {
      window.__margin.cap = { words, activate, deactivate }
    }

    // Whole instrument tilts very slightly toward the cursor — same physical
    // language as the hero, at a fraction of the intensity.
    mm.add('(hover: hover)', () => {
      const tiltX = gsap.quickTo(instrument, 'rotationX', { duration: 0.9, ease: 'power3.out' })
      const tiltY = gsap.quickTo(instrument, 'rotationY', { duration: 0.9, ease: 'power3.out' })
      const onMove = (e) => {
        const r = instrument.getBoundingClientRect()
        const nx = (e.clientX - r.left) / r.width - 0.5
        const ny = (e.clientY - r.top) / r.height - 0.5
        tiltY(nx * 5)
        tiltX(-ny * 4)
      }
      const onLeave = () => { tiltX(0); tiltY(0) }
      instrument.addEventListener('mousemove', onMove)
      instrument.addEventListener('mouseleave', onLeave)
      return () => {
        instrument.removeEventListener('mousemove', onMove)
        instrument.removeEventListener('mouseleave', onLeave)
        gsap.set(instrument, { rotationX: 0, rotationY: 0 })
      }
    })
  }

  initCapabilitiesInstrument()

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


  /* ==========================================================
     5. PROCESS — EDITORIAL PINNED BOARD EXPERIENCE
     5 custom design boards with alternating composition, heavy
     calm entry, subtle parallax, deconstruct transition, and
     the monumental expanded LAUNCH finale.
  ========================================================== */
  const processTrack = document.querySelector('.process-track')
  if (processTrack) {
    const PROCESS_DESKTOP = '(min-width: 961px)'
    const PROCESS_MOBILE = '(max-width: 960px)'

    mm.add(PROCESS_DESKTOP, () => {
      const stepItems = gsap.utils.toArray('.process-step-item')
      const boards = gsap.utils.toArray('.process-board')
      const progressFill = document.querySelector('.process-progress-fill')
      const progressCurr = document.querySelector('[data-progress-curr]')
      const finaleCta = document.querySelector('.process-finale-cta')
      const finaleBoard = document.querySelector('.board-finale')

      if (!stepItems.length) return

      // Initial state
      stepItems.forEach((item, i) => {
        gsap.set(item, {
          opacity: i === 0 ? 1 : 0,
          visibility: i === 0 ? 'visible' : 'hidden'
        })
      })

      if (boards[0]) {
        gsap.set(boards[0], { opacity: 1, scale: 1, x: 0, y: 0, rotation: 0 })
      }
      boards.slice(1).forEach(b => {
        gsap.set(b, { opacity: 0, scale: 0.94, y: 100 })
      })

      if (progressFill) gsap.set(progressFill, { scaleX: 0.2 })
      if (progressCurr) progressCurr.textContent = '01'

      // Master scrub timeline across the entire track
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: processTrack,
          pin: '.process-sticky',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })

      // Total timeline length: 5.0 units
      // Phase 1 (0 -> 0.8): Step 01 active with subtle image parallax
      tl.to('.step-01 .board-img', { y: -24, ease: 'none', duration: 0.8 }, 0)

      // Transition 1 -> 2 (0.8 -> 1.5)
      // Step 1 exits: drifts back and up, fades to subtle layer then out
      tl.to('.step-01 .process-board', {
        y: -90,
        x: -35,
        scale: 0.93,
        opacity: 0.15,
        duration: 0.5,
        ease: 'power3.inOut'
      }, 0.8)
      tl.to('.step-01 .process-step-text', {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      }, 0.8)
      tl.set('.step-01', { visibility: 'hidden', opacity: 0 }, 1.3)

      // Progress bar updates
      tl.to(progressFill, { scaleX: 0.4, duration: 0.5, ease: 'power2.out' }, 0.9)
      tl.call(() => { if (progressCurr) progressCurr.textContent = '02' }, null, 0.95)

      // Step 2 enters from left
      tl.set('.step-02', { visibility: 'visible', opacity: 1 }, 0.9)
      tl.fromTo('.step-02 .process-board',
        { x: -160, y: 120, scale: 0.93, rotation: -4.0, rotationX: 25, rotationY: -15, transformPerspective: 1200, opacity: 0 },
        { x: 0, y: 0, scale: 1, rotation: 0, rotationX: 6, rotationY: -4, transformPerspective: 1200, opacity: 1, duration: 0.65, ease: 'power3.out' },
        0.95
      )
      tl.fromTo('.step-02 .process-step-text',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
        1.05
      )

      // Phase 2 active parallax (1.3 -> 1.9)
      tl.to('.step-02 .board-img', { y: -24, ease: 'none', duration: 0.6 }, 1.3)

      // Transition 2 -> 3 (1.9 -> 2.6)
      // Step 2 exits
      tl.to('.step-02 .process-board', {
        y: -90,
        x: 35,
        scale: 0.93,
        opacity: 0.15,
        duration: 0.5,
        ease: 'power3.inOut'
      }, 1.9)
      tl.to('.step-02 .process-step-text', {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      }, 1.9)
      tl.set('.step-02', { visibility: 'hidden', opacity: 0 }, 2.4)

      // Progress bar updates
      tl.to(progressFill, { scaleX: 0.6, duration: 0.5, ease: 'power2.out' }, 2.0)
      tl.call(() => { if (progressCurr) progressCurr.textContent = '03' }, null, 2.05)

      // Step 3 enters from right
      tl.set('.step-03', { visibility: 'visible', opacity: 1 }, 2.0)
      tl.fromTo('.step-03 .process-board',
        { x: 160, y: 120, scale: 0.93, rotation: 4.0, rotationX: 25, rotationY: 15, transformPerspective: 1200, opacity: 0 },
        { x: 0, y: 0, scale: 1, rotation: 0, rotationX: 6, rotationY: 4, transformPerspective: 1200, opacity: 1, duration: 0.65, ease: 'power3.out' },
        2.05
      )
      tl.fromTo('.step-03 .process-step-text',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
        2.15
      )

      // Phase 3 active parallax (2.4 -> 2.9)
      tl.to('.step-03 .board-img', { y: -24, ease: 'none', duration: 0.5 }, 2.4)

      // ==========================================
      // SPECIAL TRANSITION: DESIGN -> BUILD
      // Deconstruction of layers, brief split, snap-back
      // ==========================================
      tl.to('.step-03 .line-h', { opacity: 0.85, scaleX: 1, duration: 0.25, ease: 'power2.out' }, 2.9)
      tl.to('.step-03 .line-v', { opacity: 0.85, scaleY: 1, duration: 0.25, ease: 'power2.out' }, 2.9)
      tl.to('.step-03 .board-inner', { x: -10, y: -6, scale: 0.98, duration: 0.25, ease: 'power2.out' }, 2.9)

      // Re-collapse and exit into BUILD
      tl.to('.step-03 .deconstruct-line', { opacity: 0, duration: 0.2, ease: 'power2.in' }, 3.15)
      tl.to('.step-03 .process-board', {
        y: -90,
        x: -35,
        scale: 0.93,
        opacity: 0.15,
        duration: 0.5,
        ease: 'power3.inOut'
      }, 3.1)
      tl.to('.step-03 .process-step-text', {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      }, 3.1)
      tl.set('.step-03', { visibility: 'hidden', opacity: 0 }, 3.5)

      // Progress bar updates
      tl.to(progressFill, { scaleX: 0.8, duration: 0.5, ease: 'power2.out' }, 3.1)
      tl.call(() => { if (progressCurr) progressCurr.textContent = '04' }, null, 3.15)

      // Step 4 enters from left
      tl.set('.step-04', { visibility: 'visible', opacity: 1 }, 3.1)
      tl.fromTo('.step-04 .process-board',
        { x: -160, y: 120, scale: 0.93, rotation: -4.0, rotationX: 25, rotationY: -15, transformPerspective: 1200, opacity: 0 },
        { x: 0, y: 0, scale: 1, rotation: 0, rotationX: 6, rotationY: -4, transformPerspective: 1200, opacity: 1, duration: 0.65, ease: 'power3.out' },
        3.15
      )
      tl.fromTo('.step-04 .process-step-text',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
        3.25
      )

      // Phase 4 active parallax (3.5 -> 3.9)
      tl.to('.step-04 .board-img', { y: -24, ease: 'none', duration: 0.4 }, 3.5)

      // ==========================================
      // FINALE TRANSITION: BUILD -> LAUNCH
      // Monumental Expansion & Calm Focus
      // ==========================================
      tl.to('.step-04 .process-board', {
        y: -90,
        scale: 0.93,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut'
      }, 3.9)
      tl.to('.step-04 .process-step-text', {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      }, 3.9)
      tl.set('.step-04', { visibility: 'hidden', opacity: 0 }, 4.3)

      // Progress bar to 100%
      tl.to(progressFill, { scaleX: 1.0, duration: 0.5, ease: 'power2.out' }, 3.9)
      tl.call(() => { if (progressCurr) progressCurr.textContent = '05' }, null, 3.95)

      // Step 5 enters
      tl.set('.step-05', { visibility: 'visible', opacity: 1 }, 3.9)
      tl.fromTo('.step-05 .process-step-finale',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        3.95
      )
      tl.fromTo('.board-finale',
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.65, ease: 'power3.out' },
        3.95
      )

      // Finale Expansion: Board becomes larger and dominant
      tl.to('.board-finale', {
        scale: 1.14,
        transformOrigin: 'center center',
        duration: 0.65,
        ease: 'power2.out'
      }, 4.3)
      tl.to('.process-guide-line', { opacity: 0.01, duration: 0.5 }, 4.3)
      tl.to('.process-header', { opacity: 0.4, duration: 0.5 }, 4.3)
      tl.to(finaleCta, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 4.4)
      
      // Smooth exit so the unpin is buttery
      tl.to('.step-05', { y: -50, scale: 0.97, opacity: 0, duration: 0.5, ease: 'power2.in' }, 5.2)
      tl.to('.process-header', { y: -30, opacity: 0, duration: 0.5, ease: 'power2.in' }, 5.2)
    })

    // Mobile: Clean, lightweight reveals for each step
    mm.add(PROCESS_MOBILE, () => {
      const stepItems = gsap.utils.toArray('.process-step-item')
      stepItems.forEach(item => {
        const board = item.querySelector('.process-board')
        const text = item.querySelector('.process-step-text, .process-finale-text')

        if (text) {
          gsap.fromTo(text,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 82%',
                once: true
              }
            }
          )
        }

        if (board) {
          gsap.fromTo(board,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 78%',
                once: true
              }
            }
          )
        }
      })
    })
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

      /* Mouse parallax for the kinetic typography lines.
         quickTo setters created once, instead of four gsap.to() calls per
         mousemove — each of those re-ran a document-wide selector lookup and
         allocated a fresh tween, several hundred times a second. The rect is
         cached and the work is coalesced into one rAF for the same reason. */
      const lineMovers = [
        { el: manifesto.querySelector('.line-1'), amt: -12 },
        { el: manifesto.querySelector('.line-2'), amt: 14 },
        { el: manifesto.querySelector('.line-3'), amt: -6 },
        { el: manifesto.querySelector('.line-4'), amt: 10 }
      ].filter(m => m.el).map(m => ({
        amt: m.amt,
        set: gsap.quickTo(m.el, 'x', { duration: 0.6, ease: 'power2.out' })
      }))

      let mRect = manifesto.getBoundingClientRect()
      let mRectDirty = false
      const markMRect = () => { mRectDirty = true }
      window.addEventListener('scroll', markMRect, { passive: true })
      window.addEventListener('resize', markMRect)

      let mMoveRAF = null
      let mPendingX = 0

      manifesto.addEventListener('mousemove', (e) => {
        mPendingX = e.clientX
        if (mMoveRAF !== null) return
        mMoveRAF = requestAnimationFrame(() => {
          mMoveRAF = null
          if (mRectDirty) { mRect = manifesto.getBoundingClientRect(); mRectDirty = false }
          const x = (mPendingX - mRect.left) / mRect.width - 0.5
          for (let i = 0; i < lineMovers.length; i++) {
            lineMovers[i].set(x * lineMovers[i].amt)
          }
        })
      }, { passive: true })
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

}

/* The hero reveal masks type by its own line height, so it must not start
   before the display face has swapped in — otherwise the fallback metrics
   are baked into the mask offset and the lines land misaligned. The loader
   covers this wait; a timeout keeps a slow font from blocking motion. */
function startMotion() {
  if (startMotion.done) return
  startMotion.done = true
  initMotion()
  ScrollTrigger.refresh()
}

function bootstrap() {
  if (document.fonts && document.fonts.ready) {
    Promise.race([
      document.fonts.ready,
      new Promise(resolve => setTimeout(resolve, 1500))
    ]).then(startMotion)
  } else {
    startMotion()
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap)
} else {
  bootstrap()
}

// Late font swaps still change type metrics; re-measure scroll distances.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh())
}

// --- MANIFESTO HAND INTERACTION MODULE ---
function initManifestoHand(sectionElement) {
  const CONSTANTS = {
    // 9 → 12: the sampling step is 2D, so this is ~4900 fragments down to
    // ~2750 (-44%). Every fragment costs trig + distance work + a draw call
    // each frame, and at 9 the dots overlapped more than the raster needed.
    DOT_SPACING: 12,
    ALPHA_THRESHOLD: 20,
    POINTER_RADIUS: 140,
    INERTIA_FACTOR: 0.12,
    HOTSPOT_X: 0.345,
    HOTSPOT_Y: 0.15,
    HOTSPOT_RADIUS: 55,
    SHAPE_DOT: 0,
    SHAPE_RECT: 1,
    SHAPE_DIAMOND: 2,
    // Idle drift is authored in source-image-space px, then squashed down by
    // ctx.scale() to fit the on-screen canvas — at typical draw sizes that
    // downscale eats most of the motion before it ever reaches the screen,
    // which is why it read as "too static". This boosts it back up without
    // touching the per-fragment amplitude values themselves.
    IDLE_DRIFT_BOOST: 2.4,
    // Reassembly has two tiers: a broad "approaching" pull based on distance
    // to the hand's own centroid (global, affects every fragment a little),
    // and the existing tight per-fragment pointer radius (local, affects only
    // fragments right under the cursor a lot). Both damp idle drift back
    // toward the fragment's true position — they never push it away.
    APPROACH_RADIUS: 340,
    REASSEMBLY_GLOBAL: 0.45,
    REASSEMBLY_LOCAL: 0.85,
    GLOBAL_LERP: 0.08
  };

  const initialX = window.innerWidth * 0.72;
  const initialY = window.innerHeight * 0.62;

  let state = {
    fragments: [],
    imageWidth: 0,
    imageHeight: 0,
    pointer: { x: initialX, y: initialY, active: false },
    // 4-node fluid spring chain for the aerodynamic comet/teardrop tail.
    // Was 6; each node drives two live radial-gradients in the CSS mask plus
    // four custom-property writes per frame, and the last two carried so
    // little alpha they were not worth the repaint.
    trailNodes: [
      { x: initialX, y: initialY },
      { x: initialX, y: initialY },
      { x: initialX, y: initialY },
      { x: initialX, y: initialY }
    ],
    velocity: { x: 0, y: 0 },
    canvasRect: { left: 0, top: 0, width: 0, height: 0 },
    maskIntensity: 0.0,
    // Smoothed 0..1 "cursor is approaching the hand" value, and the hand's
    // own centroid (in source-image space) it's measured against — both set
    // once fragments exist, see setupCanvas().
    globalInfluence: 0.0,
    handCenterX: 0,
    handCenterY: 0
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
  // Reused scratch for the mask trail so the render loop allocates no arrays
  const maskCore = new Float64Array(4);
  const maskSoft = new Float64Array(4);
  let maskCleared = true;
  // Canvas rect is cached; these events are the only things that move it
  let rectDirty = true;
  const markRectDirty = () => { rectDirty = true; };
  window.addEventListener('scroll', markRectDirty, { passive: true });
  
  const randomRange = (min, max) => Math.random() * (max - min) + min;
  const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

  // Fine ambient studio motes drifting calmly across the hand space
  const ambientMotes = [];
  const moteCount = 16;
  for (let i = 0; i < moteCount; i++) {
    const moteAlpha = Math.random() * 0.22 + 0.08;
    ambientMotes.push({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.1 + 0.6,
      speedY: Math.random() * 0.00010 + 0.00003,
      speedX: (Math.random() - 0.5) * 0.00005,
      alpha: moteAlpha,
      // A mote's alpha never changes, so its fill string is built once
      fill: `rgba(243, 240, 232, ${(moteAlpha * 0.45).toFixed(3)})`
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
        // Re-measure on entry: the cached rect is normally refreshed by
        // scroll/resize, but a reflow from a late font or image load can move
        // the canvas without either firing.
        rectDirty = true;
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

    // Centroid of the actual fragments, not the raw canvas center — the hand
    // doesn't fill its bounding box evenly, so this is a truer "hand center"
    // for the approach-radius reassembly pull below.
    if (state.fragments.length > 0) {
      let sumX = 0, sumY = 0;
      for (let i = 0; i < state.fragments.length; i++) {
        sumX += state.fragments[i].ox;
        sumY += state.fragments[i].oy;
      }
      state.handCenterX = sumX / state.fragments.length;
      state.handCenterY = sumY / state.fragments.length;
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
      // Scale hand proportionally to viewport height with ample headroom so fingertips are 100% visible on MacBook
      let targetH = Math.min(window.innerHeight * 0.85, 860);
      drawHeight = targetH;
      drawWidth = targetH * aspect;
      
      const maxW = window.innerWidth * 0.65;
      if (drawWidth > maxW) {
        drawWidth = maxW;
        drawHeight = drawWidth / aspect;
      }
      if (drawWidth < 680 && window.innerWidth >= 1240) {
        drawWidth = Math.min(740, window.innerWidth * 0.58);
        drawHeight = drawWidth / aspect;
      }
      // Strict headroom safeguard: height never exceeds 86% of viewport height
      const maxH = window.innerHeight * 0.86;
      if (drawHeight > maxH) {
        drawHeight = maxH;
        drawWidth = drawHeight * aspect;
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
    rectDirty = true;
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
    
    /* The rect only changes when the page scrolls or resizes, so it is
       re-read on those events instead of every single frame — a
       getBoundingClientRect() inside the loop forces a synchronous layout
       of the whole document on each tick. */
    if (rectDirty && state.fragments.length > 0) {
      state.canvasRect = canvas.getBoundingClientRect();
      rectDirty = false;
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
    
    // Subsequent nodes (1-3) follow previous node with progressive damping
    // This creates a smooth aerodynamic teardrop/comet tail along the motion curve
    const trailFactors = [0.28, 0.23, 0.19];
    for (let i = 1; i < 4; i++) {
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
      ctx.fillStyle = m.fill;
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

      /* The gradient runs p0→p3, and only the control points wave — so its
         endpoints never move. Built once per strand instead of allocating a
         fresh CanvasGradient with four colour stops every frame. */
      if (!s._grad) {
        const g = ctx.createLinearGradient(p0x, p0y, p3x, p3y);
        g.addColorStop(0, 'rgba(243, 240, 232, 0)');
        g.addColorStop(0.35, `rgba(243, 240, 232, ${s.alpha})`);
        g.addColorStop(0.7, `rgba(225, 185, 195, ${s.alpha * 0.8})`);
        g.addColorStop(1, 'rgba(243, 240, 232, 0)');
        s._grad = g;
      }

      ctx.beginPath();
      ctx.moveTo(p0x, p0y);
      ctx.bezierCurveTo(p1x, p1y, p2x, p2y, p3x, p3y);
      ctx.strokeStyle = s._grad;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    
    if (state.fragments.length > 0) {
      // Correct coordinate mapping for CSS scaled canvas (e.g. scale(1.3))
      const scaleX = state.imageWidth / state.canvasRect.width;
      const scaleY = state.imageHeight / state.canvasRect.height;
      
      const head = state.trailNodes[0];
      const pointerLocalX = (head.x - state.canvasRect.left) * scaleX;
      const pointerLocalY = (head.y - state.canvasRect.top) * scaleY;
      
      const interactionRadius = CONSTANTS.POINTER_RADIUS * scaleX;

      const hotspotLocalX = state.imageWidth * CONSTANTS.HOTSPOT_X;
      const hotspotLocalY = state.imageHeight * CONSTANTS.HOTSPOT_Y;
      const hotspotDist = Math.hypot(pointerLocalX - hotspotLocalX, pointerLocalY - hotspotLocalY);
      const hotspotActive = (hotspotDist < CONSTANTS.HOTSPOT_RADIUS * scaleX);

      // Broad "approaching the hand" pull: distance from the cursor to the
      // hand's centroid, smoothed so it rises/falls gradually rather than
      // switching on the moment the pointer crosses some line. Combined
      // per-fragment with the tight local pointer radius below, so the hand
      // both "notices" an approaching cursor everywhere at once and sharpens
      // further right where the cursor actually sits.
      const approachRadius = CONSTANTS.APPROACH_RADIUS * scaleX;
      const centerDist = Math.hypot(pointerLocalX - state.handCenterX, pointerLocalY - state.handCenterY);
      const globalTarget = state.pointer.active ? Math.max(0, 1 - centerDist / approachRadius) : 0;
      state.globalInfluence += (globalTarget - state.globalInfluence) * CONSTANTS.GLOBAL_LERP;

      // Fragments the cursor is currently reaching, sampled for the
      // constellation pass below. Capped so the pair test stays cheap.
      const linkNodes = [];
      // The constellation pass is O(n²) over this cap: 34 nodes meant 561
      // pair tests per frame, 16 means 120 for a near-identical read.
      const LINK_CAP = 16;

      for (let i = 0; i < state.fragments.length; i++) {
        const frag = state.fragments[i];

        // 1. Idle Micro-Motion: Dual-harmonic smooth organic drift, boosted
        // back up after the canvas's downscale so it actually reads on screen
        const driftX = (Math.sin(timeElapsedMs * frag.speedX1 + frag.phaseX1) * (frag.ampX * 0.7) +
                       Math.sin(timeElapsedMs * frag.speedX2 + frag.phaseX2) * (frag.ampX * 0.3)) * CONSTANTS.IDLE_DRIFT_BOOST;
        const driftY = (Math.cos(timeElapsedMs * frag.speedY1 + frag.phaseY1) * (frag.ampY * 0.7) +
                       Math.cos(timeElapsedMs * frag.speedY2 + frag.phaseY2) * (frag.ampY * 0.3)) * CONSTANTS.IDLE_DRIFT_BOOST;

        const breath = Math.sin(timeElapsedMs * frag.breathSpeed + frag.breathPhase) * frag.breathAmp;

        // Continuous subtle architectural grazing gleam
        const gleamPhase = Math.sin(timeElapsedMs * 0.00085 + (frag.ox + frag.oy) * 0.0035);
        const gleamBoost = gleamPhase > 0 ? gleamPhase * 0.12 : 0;

        let drawAlpha = Math.max(0.12, Math.min(1.0, frag.baseAlpha + breath + gleamBoost));
        let drawSize = frag.baseSize;
        let targetRot = frag.baseRotation;

        // Provisional (undamped) drifted position, used only to gauge
        // proximity to the pointer for the local reassembly term below.
        const driftedX = frag.ox + driftX;
        const driftedY = frag.oy + driftY;

        // 2. Cursor proximity → reassembly. Both terms only ever DAMPEN the
        // idle drift back toward the fragment's true (ox, oy) position — the
        // hand tightens as the cursor nears it, it never scatters further.
        const dx = pointerLocalX - driftedX;
        const dy = pointerLocalY - driftedY;
        const dist = Math.hypot(dx, dy);

        let localForce = 0;
        if (state.pointer.active && dist < interactionRadius) {
          localForce = (interactionRadius - dist) / interactionRadius;
          // Sample a sparse subset for the constellation, so the links read
          // as a survey of the surface rather than a solid web
          if (linkNodes.length < LINK_CAP && (i & 7) === 0) {
            linkNodes.push({ x: driftedX, y: driftedY, force: localForce });
          }
        }

        const reassembly = Math.min(1, state.globalInfluence * CONSTANTS.REASSEMBLY_GLOBAL + localForce * CONSTANTS.REASSEMBLY_LOCAL);
        let targetFX = frag.ox + driftX * (1 - reassembly);
        let targetFY = frag.oy + driftY * (1 - reassembly);

        // A hint of extra definition as fragments lock into place — never a
        // size explosion, just enough to read as "coming into focus"
        drawAlpha = Math.min(1.0, drawAlpha + reassembly * 0.12);
        drawSize += reassembly * 0.15;

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
        
        /* Alpha is quantised into 32 steps and the resulting fill string is
           memoised on the fragment. Building `rgba(...)` inline meant one
           string allocation per fragment per frame — thousands of short-lived
           strings a frame, which is real GC pressure. The step is far finer
           than the eye resolves at these opacities. */
        const aStep = (drawAlpha * 32) | 0;
        if (frag._aStep !== aStep) {
          frag._aStep = aStep;
          frag._fill = `rgba(${frag.colorStr}, ${(aStep / 32).toFixed(3)})`;
        }
        ctx.fillStyle = frag._fill;

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
      
      /* --- CONSTELLATION: the cursor surveys the surface ---
         Hairlines between nearby sampled fragments, plus a tie from each back
         to the pointer. Borrows the blueprint line language from the hero so
         the hand reads as part of the same instrument. */
      if (linkNodes.length > 1) {
        const LINK_DIST = 46;
        ctx.lineWidth = 0.4;

        for (let a = 0; a < linkNodes.length; a++) {
          const na = linkNodes[a];
          for (let b = a + 1; b < linkNodes.length; b++) {
            const nb = linkNodes[b];
            const ld = Math.hypot(na.x - nb.x, na.y - nb.y);
            if (ld > LINK_DIST) continue;
            const alpha = (1 - ld / LINK_DIST) * 0.30 * Math.min(na.force, nb.force);
            if (alpha < 0.012) continue;
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.strokeStyle = `rgba(243, 240, 232, ${alpha.toFixed(3)})`;
            ctx.stroke();
          }

          // Tie the strongest samples back to the pointer itself
          if (na.force > 0.55) {
            ctx.beginPath();
            ctx.moveTo(pointerLocalX, pointerLocalY);
            ctx.lineTo(na.x, na.y);
            ctx.strokeStyle = `rgba(138, 48, 64, ${(na.force * 0.34).toFixed(3)})`;
            ctx.stroke();
          }
        }
      }

      // --- CSS MASK REVEAL: TEARDROP COMET TRAIL ---
      // Each setProperty here invalidates the element's mask and forces a
      // repaint, so the writes are skipped entirely once the trail has
      // faded out rather than re-zeroing the same values every idle frame.
      if (state.maskIntensity > 0.01) {
        const expand = hotspotActive ? 16 : 0;
        const speedStretch = Math.min(speed * 0.7, 14);

        maskCore[0] = 46 + expand;
        maskCore[1] = 38 + expand * 0.75;
        maskCore[2] = 30 + expand * 0.5;
        maskCore[3] = 22 + expand * 0.3;
        maskSoft[0] = 92 + expand + speedStretch;
        maskSoft[1] = 78 + expand * 0.75 + speedStretch * 0.8;
        maskSoft[2] = 64 + speedStretch * 0.6;
        maskSoft[3] = 50 + speedStretch * 0.4;

        for (let i = 0; i < 4; i++) {
          const node = state.trailNodes[i];
          const nx = (node.x - state.canvasRect.left) * (canvas.width / state.canvasRect.width);
          const ny = (node.y - state.canvasRect.top) * (canvas.height / state.canvasRect.height);

          realHandImg.style.setProperty(`--n${i}-x`, `${nx.toFixed(1)}px`);
          realHandImg.style.setProperty(`--n${i}-y`, `${ny.toFixed(1)}px`);
          realHandImg.style.setProperty(`--n${i}-core`, `${(maskCore[i] * state.maskIntensity).toFixed(1)}px`);
          realHandImg.style.setProperty(`--n${i}-soft`, `${(maskSoft[i] * state.maskIntensity).toFixed(1)}px`);
        }
        maskCleared = false;
      } else if (!maskCleared) {
        for (let i = 0; i < 4; i++) {
          realHandImg.style.setProperty(`--n${i}-core`, '0px');
          realHandImg.style.setProperty(`--n${i}-soft`, '0px');
        }
        maskCleared = true;
      }
    }

    renderRAF = requestAnimationFrame(render);
  }
}

// --- HERO INVERSION LENS ---
// A square "liquid glass" plate that trails the cursor inside the hero and
// inverts whatever it passes over. The invert itself is one element:
// backdrop-filter:invert(1) samples the actual rendered hero pixels behind
// the square and flips them (dark becomes light, light becomes dark, any
// color or image content included) directly in the compositor — no white
// fill, no canvas/pixel work. A second, purely cosmetic plate rides on top,
// re-filtering that inverted backdrop (contrast/saturation + a hint of SVG
// edge displacement) and carrying the hairline edge + specular corner, so
// the square reads as glass rather than a painted card. The two are flat
// siblings of the hero's other content (see the HTML comment by their
// markup), so JS moves them in lockstep by writing the same transform to
// both.
function initHeroLens() {
  const heroSection = document.getElementById('home');
  const invertEl = document.getElementById('hero-lens-invert');
  const glassEl = document.getElementById('hero-lens-glass');
  if (!heroSection || !invertEl || !glassEl) return;

  // Touch / coarse-pointer devices get no lens at all, not a hobbled one —
  // there is no cursor there for it to trail.
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover) return;

  // If the browser can't backdrop-filter, fail clean instead of showing a
  // dead, un-inverting square (CSS also hides it as a belt-and-suspenders).
  const supportsBackdropInvert = window.CSS && (
    CSS.supports('backdrop-filter', 'invert(1)') ||
    CSS.supports('-webkit-backdrop-filter', 'invert(1)')
  );
  if (!supportsBackdropInvert) return;

  const CONSTANTS = {
    EASE: 0.16,             // position lag per frame — lower = softer trail
    INTRO_EASE: 0.14,       // how quickly the enter/exit pop-scale settles
    RESTING_SCALE: 0.88,    // pop-scale at rest (pre-entry / post-exit)
    MAX_STRETCH: 0.02,      // liquid squash/stretch ceiling — 2%, barely conscious
    MAX_ROTATION_DEG: 0.4,  // liquid twist ceiling, in degrees
    VELOCITY_SCALE: 0.045,  // how readily speed maps to the 0..1 deformation intensity
    SETTLE_EPSILON: 0.03    // below this, treat position/scale as arrived
  };

  let rect = heroSection.getBoundingClientRect();
  let halfSize = invertEl.offsetWidth / 2;
  const target = { x: rect.width / 2, y: rect.height / 2 };
  const pos = { x: target.x, y: target.y };
  const prev = { x: target.x, y: target.y };
  let introScale = CONSTANTS.RESTING_SCALE;
  let introTarget = CONSTANTS.RESTING_SCALE;
  let active = false;
  let rafId = null;

  function measure() {
    rect = heroSection.getBoundingClientRect();
    halfSize = invertEl.offsetWidth / 2;
  }

  function applyTransform(x, y, angleDeg, sx, sy) {
    const t =
      `translate3d(${(x - halfSize).toFixed(2)}px, ${(y - halfSize).toFixed(2)}px, 0) ` +
      `rotate(${angleDeg.toFixed(3)}deg) scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`;
    invertEl.style.transform = t;
    glassEl.style.transform = t;
  }

  function tick() {
    pos.x += (target.x - pos.x) * CONSTANTS.EASE;
    pos.y += (target.y - pos.y) * CONSTANTS.EASE;
    introScale += (introTarget - introScale) * CONSTANTS.INTRO_EASE;

    const vx = pos.x - prev.x;
    const vy = pos.y - prev.y;
    prev.x = pos.x;
    prev.y = pos.y;

    // Axis-aligned liquid deformation, not a rotate-to-heading stretch: moving
    // mostly horizontally nudges scaleX up / scaleY down (and vice versa for
    // vertical), so the square keeps its edges instead of tilting into a
    // diamond. `intensity` is how fast the lens is moving right now (0..1);
    // `axisBias` is which axis dominates that motion (-1 vertical .. +1
    // horizontal). Their product is the actual per-axis stretch, so a fast
    // perfectly-diagonal flick still nets ~0 bias and stays square.
    const speedX = Math.abs(vx);
    const speedY = Math.abs(vy);
    const speedSum = speedX + speedY;
    const intensity = Math.min(1, Math.hypot(vx, vy) * CONSTANTS.VELOCITY_SCALE);
    const axisBias = speedSum > 0.0001 ? (speedX - speedY) / speedSum : 0;
    const stretch = intensity * axisBias * CONSTANTS.MAX_STRETCH;
    const twistDeg = Math.max(-CONSTANTS.MAX_ROTATION_DEG, Math.min(CONSTANTS.MAX_ROTATION_DEG, vx * 0.018));

    applyTransform(
      pos.x, pos.y, twistDeg,
      introScale * (1 + stretch),
      introScale * (1 - stretch)
    );

    const settled = !active &&
      Math.abs(target.x - pos.x) < CONSTANTS.SETTLE_EPSILON &&
      Math.abs(target.y - pos.y) < CONSTANTS.SETTLE_EPSILON &&
      Math.abs(introTarget - introScale) < 0.001 &&
      Math.hypot(vx, vy) < CONSTANTS.SETTLE_EPSILON;

    rafId = settled ? null : requestAnimationFrame(tick);
  }

  function ensureRunning() {
    if (rafId === null) rafId = requestAnimationFrame(tick);
  }

  function onEnter(e) {
    measure();
    target.x = e.clientX - rect.left;
    target.y = e.clientY - rect.top;
    // Snap position to the entry point instead of trailing in from wherever
    // it last idled, but let the pop-scale animate in — that's the "soft"
    // part of the entrance.
    pos.x = prev.x = target.x;
    pos.y = prev.y = target.y;

    active = true;
    introTarget = 1;
    heroSection.classList.add('hero-lens-active');
    invertEl.classList.add('is-active');
    glassEl.classList.add('is-active');
    ensureRunning();
  }

  function onMove(e) {
    target.x = e.clientX - rect.left;
    target.y = e.clientY - rect.top;
  }

  function onLeave() {
    active = false;
    introTarget = CONSTANTS.RESTING_SCALE;
    heroSection.classList.remove('hero-lens-active');
    invertEl.classList.remove('is-active');
    glassEl.classList.remove('is-active');
    ensureRunning();
  }

  heroSection.addEventListener('pointerenter', onEnter);
  heroSection.addEventListener('pointermove', onMove);
  heroSection.addEventListener('pointerleave', onLeave);
  window.addEventListener('resize', measure);
}
