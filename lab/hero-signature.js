document.addEventListener('DOMContentLoaded', () => {
  
  const COLORS = {
    white: '#ffffff',
    cherry: '#c93b3b', // Accent red
    darkCherry: '#2b1216'
  }

  // ==========================================
  // LAYER 1: PARTICLES
  // ==========================================
  function initParticles() {
    const container = document.getElementById('particles-container')
    const particleCount = 60
    
    // Generate particles
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div')
      p.classList.add('particle')
      
      // Random properties
      const isCherry = Math.random() < 0.15 // 15% cherry
      const size = gsap.utils.random(1, 3.5)
      const x = gsap.utils.random(0, 100)
      const y = gsap.utils.random(0, 100)
      const opacity = gsap.utils.random(0.1, 0.6)
      
      p.style.width = `${size}px`
      p.style.height = `${size}px`
      p.style.backgroundColor = isCherry ? COLORS.cherry : COLORS.white
      p.style.left = `${x}%`
      p.style.top = `${y}%`
      p.style.opacity = opacity
      
      container.appendChild(p)
      
      // Continuous drifting motion
      gsap.to(p, {
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-80, 80),
        duration: gsap.utils.random(10, 20),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      })
      
      // Continuous pulsing opacity for some
      if (Math.random() < 0.3) {
        gsap.to(p, {
          opacity: opacity * 0.2,
          duration: gsap.utils.random(1.5, 4),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    }
  }

  // ==========================================
  // LAYER 2: ARCHITECTURAL LINE & GRID
  // ==========================================
  function initBlueprint() {
    // 1. Generate Micro Grid
    const microGrid = document.querySelector('.bp-micro-grid')
    const spacing = 50
    const fragment = document.createDocumentFragment()
    
    for (let i = spacing; i < 1000; i += spacing) {
      if (i === 500) continue; // Skip center axis
      // V-line
      const vLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
      vLine.setAttribute("x1", i)
      vLine.setAttribute("y1", 0)
      vLine.setAttribute("x2", i)
      vLine.setAttribute("y2", 1000)
      fragment.appendChild(vLine)
      
      // H-line
      const hLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
      hLine.setAttribute("x1", 0)
      hLine.setAttribute("y1", i)
      hLine.setAttribute("x2", 1000)
      hLine.setAttribute("y2", i)
      fragment.appendChild(hLine)
    }
    microGrid.appendChild(fragment)

    // 2. Generate Registration Marks
    const regContainer = document.getElementById('reg-marks-container')
    const regPositions = [
      {x: 200, y: 200}, {x: 800, y: 200},
      {x: 200, y: 800}, {x: 800, y: 800},
      {x: 350, y: 500}, {x: 650, y: 500}
    ]
    
    regPositions.forEach(pos => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
      g.setAttribute("transform", `translate(${pos.x}, ${pos.y})`)
      g.classList.add('reg-mark')
      
      const l1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
      l1.setAttribute("x1", "-15")
      l1.setAttribute("y1", "0")
      l1.setAttribute("x2", "15")
      l1.setAttribute("y2", "0")
      l1.setAttribute("stroke-width", "0.5")
      
      const l2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
      l2.setAttribute("x1", "0")
      l2.setAttribute("y1", "-15")
      l2.setAttribute("x2", "0")
      l2.setAttribute("y2", "15")
      l2.setAttribute("stroke-width", "0.5")
      
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      dot.setAttribute("cx", "0")
      dot.setAttribute("cy", "0")
      dot.setAttribute("r", "2")
      dot.setAttribute("fill", COLORS.cherry)
      dot.setAttribute("stroke", "none")
      dot.classList.add('reg-dot')
      
      g.appendChild(l1)
      g.appendChild(l2)
      g.appendChild(dot)
      regContainer.appendChild(g)
    })

    // 3. Alive Motion for Layer 2
    const aliveTl = gsap.timeline({ repeat: -1 })
    
    // Rotate circles
    aliveTl.to('.bp-circle-1', { rotation: 360, transformOrigin: 'center center', duration: 80, ease: 'none', repeat: -1 }, 0)
    aliveTl.to('.bp-circle-3', { rotation: -360, transformOrigin: 'center center', duration: 45, ease: 'none', repeat: -1 }, 0)
    
    // Micro grid subtle drift
    aliveTl.to(microGrid, { x: 10, y: 10, duration: 25, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0)
    
    // Pulse registration dots
    aliveTl.to('.reg-dot', { opacity: 0.2, scale: 0.5, transformOrigin: 'center center', duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.3 }, 0)
    
    // Axes subtle pulse
    aliveTl.to('.bp-axis', { strokeOpacity: 0.5, strokeWidth: 1.5, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 1 }, 0)
  }

  // ==========================================
  // LAYER 3: PIXEL / DOT MATRIX WORDS
  // ==========================================
  function initMatrixWords() {
    const mask = document.getElementById('matrix-mask')
    const words = document.querySelectorAll('.matrix-word')
    
    gsap.set(words, { opacity: 0 })
    gsap.set(words[0], { opacity: 1 })
    
    // Generate the matrix mask grid
    // We cover a box large enough for the text. Center is 500,500. Box: 200 to 800 (W: 600), 400 to 600 (H: 200).
    // Cell size 6px gives a very fine, premium dot-matrix feel. (100 cols x 33 rows ~ 3300 cells)
    const cellSize = 6
    const cols = 120
    const rows = 40
    const startX = 500 - (cols * cellSize) / 2
    const startY = 500 - (rows * cellSize) / 2
    
    const fragment = document.createDocumentFragment()
    const cells = []
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Drop ~8% of cells randomly for that slightly technical/imperfect blueprint look
        if (Math.random() < 0.08) continue;
        
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        // Leave 1px gap for the grid effect
        rect.setAttribute("x", startX + c * cellSize)
        rect.setAttribute("y", startY + r * cellSize)
        rect.setAttribute("width", cellSize - 1.5)
        rect.setAttribute("height", cellSize - 1.5)
        rect.setAttribute("fill", "#ffffff")
        rect.classList.add('mask-cell')
        
        fragment.appendChild(rect)
        cells.push(rect)
      }
    }
    mask.appendChild(fragment)
    
    // Initial setup for GSAP
    gsap.set(cells, { transformOrigin: '50% 50%' })
    
    // Continuous subtle breathing of the mask
    gsap.to(cells, {
      opacity: () => gsap.utils.random(0.7, 1),
      duration: () => gsap.utils.random(2, 4),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: { amount: 2, from: 'random' }
    })

    // Word Transition Loop
    const wordTl = gsap.timeline({ repeat: -1 })
    const wordCount = words.length
    const HOLD_TIME = 4 // ~5 seconds total with transition
    
    for (let i = 0; i < wordCount; i++) {
      const currentWord = words[i]
      const nextWord = words[(i + 1) % wordCount]
      
      wordTl.addLabel(`start_${i}`, `+=${HOLD_TIME}`)
      
      // BREAKUP: Cells scatter and shrink
      wordTl.to(cells, {
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-60, 60),
        scale: () => gsap.utils.random(0, 0.4),
        opacity: 0,
        rotation: () => gsap.utils.random(-180, 180),
        duration: 1.2,
        ease: 'power3.inOut',
        stagger: { amount: 0.5, from: 'random' }
      }, `start_${i}`)
      
      // SWAP: Swap the text under the completely shattered mask
      wordTl.set(currentWord, { opacity: 0 }, `start_${i}+=1.2`)
      wordTl.set(nextWord, { opacity: 1 }, `start_${i}+=1.2`)
      
      // REALIGN: Cells pull back into the perfect grid
      wordTl.to(cells, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: { amount: 0.6, from: 'edges' }
      }, `start_${i}+=1.4`)
    }
  }

  // Initialize
  initParticles()
  initBlueprint()
  initMatrixWords()

})
