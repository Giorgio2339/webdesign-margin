// Constants and State
const CONSTANTS = {
  DOT_SPACING: 9,       
  ALPHA_THRESHOLD: 20,  
  
  // Interaction
  POINTER_RADIUS: 120,  
  INERTIA_FACTOR: 0.12, // Easing factor (~80ms lag)
  
  // Echo delays for trailing memory (closely spaced for fluid blend)
  ECHO1_DELAY: 2,       
  ECHO2_DELAY: 4,      
  ECHO3_DELAY: 6,
  
  // Hotspot
  HOTSPOT_X: 0.345,
  HOTSPOT_Y: 0.15,
  HOTSPOT_RADIUS: 50,
  
  // Shapes
  SHAPE_DOT: 0,
  SHAPE_RECT: 1,
  SHAPE_DIAMOND: 2
};

let state = {
  fragments: [],
  imageWidth: 0,
  imageHeight: 0,
  
  pointer: { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false },
  pointerHistory: [],
  easedPointer: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  velocity: { x: 0, y: 0 },
  
  canvasRect: { left: 0, top: 0, width: 0, height: 0 },
  debug: false
};

// DOM Elements
const container = document.getElementById('interactive-container');
const canvas = document.getElementById('dots-canvas');
const ctx = canvas.getContext('2d', { alpha: true }); // Need alpha true for transparent background
const realHandImg = document.getElementById('real-hand');

// Debug Elements
const debugOverlay = document.getElementById('debug-overlay');
const debugFps = document.getElementById('debug-fps');
const debugInfo = document.getElementById('debug-info');

// Check Debug Mode
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('debug') === '1') {
  state.debug = true;
  debugOverlay.style.display = 'block';
}

let lastTime = performance.now();
let frameCount = 0;
let timeElapsedMs = 0; // Better for exact cycle timings

function init() {
  if (realHandImg.complete) {
    setupCanvas();
  } else {
    realHandImg.addEventListener('load', setupCanvas);
  }
  
  window.addEventListener('resize', handleResize);
  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);
  container.addEventListener('mouseenter', handleMouseEnter);
  
  for(let i=0; i<20; i++) {
    state.pointerHistory.push({x: window.innerWidth/2, y: window.innerHeight/2});
  }
  
  requestAnimationFrame(render);
}

const randomRange = (min, max) => Math.random() * (max - min) + min;

// Linear interpolation for color
const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

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
        
        // Jitter position slightly
        const jx = x + randomRange(-1.5, 1.5);
        const jy = y + randomRange(-1.5, 1.5);
        
        // Shape distribution: 70% dot, 20% rect, 10% diamond
        const randShape = Math.random();
        let shapeType = CONSTANTS.SHAPE_DOT;
        if (randShape > 0.9) shapeType = CONSTANTS.SHAPE_DIAMOND;
        else if (randShape > 0.7) shapeType = CONSTANTS.SHAPE_RECT;

        // Size distribution: 80% small, 15% medium, 5% accent
        // (Luminance also biases towards slightly larger sizes)
        const randSize = Math.random();
        let baseSize = 0;
        if (randSize > 0.95) { // 5% Accent
          baseSize = randomRange(1.9, 2.6);
        } else if (randSize > 0.8) { // 15% Medium
          baseSize = randomRange(1.3, 1.8);
        } else { // 80% Small
          baseSize = randomRange(0.7, 1.2);
        }
        
        // Brighter areas map to slightly higher base size
        baseSize += luminance * 0.3;

        // Opacity: 0.30 - 0.90 mapped to luminance
        const baseAlpha = lerp(0.3, 0.9, luminance) * (alpha / 255);

        // Color mapped from #D8D1C7 (rgb: 216, 209, 199) to #F3F0E8 (rgb: 243, 240, 232) based on luminance
        const colR = Math.round(lerp(216, 243, luminance));
        const colG = Math.round(lerp(209, 240, luminance));
        const colB = Math.round(lerp(199, 232, luminance));
        
        // Micro-motion setup (Cycle lengths 3-8 seconds)
        const cycleLength = randomRange(3000, 8000);
        const driftSpeed = (Math.PI * 2) / cycleLength;
        
        let driftRadius = randomRange(0.4, 1.5);
        // Rare chance for up to 1.8px
        if (Math.random() > 0.95) driftRadius = randomRange(1.5, 1.8);

        // Micro CTA behavior for hotspot
        const hDist = Math.hypot(jx - imgWidth * CONSTANTS.HOTSPOT_X, jy - imgHeight * CONSTANTS.HOTSPOT_Y);
        const isNearHotspot = hDist < (imgWidth * 0.15); // 15% of width radius
        if (isNearHotspot && Math.random() > 0.7) {
          // Increase breathing slightly for particles near fingertip
          driftRadius += randomRange(0.2, 0.4);
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
          // Micro-motion variables
          driftSpeed: driftSpeed,
          driftPhaseX: randomRange(0, Math.PI * 2),
          driftPhaseY: randomRange(0, Math.PI * 2),
          driftRadius: driftRadius,
          isHotspotAccent: isNearHotspot && Math.random() > 0.8
        });
      }
    }
  }
}

function handleResize() {
  resizeElements();
}

function resizeElements() {
  if (state.imageWidth === 0) return;
  
  const viewportWidth = window.innerWidth * 0.9; 
  const viewportHeight = window.innerHeight * 0.9;
  
  const aspect = state.imageWidth / state.imageHeight;
  
  let drawWidth = viewportWidth;
  let drawHeight = viewportWidth / aspect;
  
  if (drawHeight > viewportHeight) {
    drawHeight = viewportHeight;
    drawWidth = drawHeight * aspect;
  }
  
  canvas.width = drawWidth;
  canvas.height = drawHeight;
  
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
  state.easedPointer.x = e.clientX;
  state.easedPointer.y = e.clientY;
  for(let i=0; i<state.pointerHistory.length; i++) {
    state.pointerHistory[i] = {x: e.clientX, y: e.clientY};
  }
}

function render(time) {
  const dtMs = time - lastTime;
  timeElapsedMs += dtMs;
  
  if (state.debug) {
    frameCount++;
    if (time - lastTime >= 1000) {
      debugFps.textContent = `FPS: ${frameCount}`;
      frameCount = 0;
      lastTime = time;
    }
  } else {
    lastTime = time;
  }

  // Pointer Easing & Velocity
  const prevEx = state.easedPointer.x;
  const prevEy = state.easedPointer.y;
  
  state.easedPointer.x += (state.pointer.x - state.easedPointer.x) * CONSTANTS.INERTIA_FACTOR;
  state.easedPointer.y += (state.pointer.y - state.easedPointer.y) * CONSTANTS.INERTIA_FACTOR;
  
  state.velocity.x = state.easedPointer.x - prevEx;
  state.velocity.y = state.easedPointer.y - prevEy;
  const speed = Math.sqrt(state.velocity.x**2 + state.velocity.y**2);
  
  // Update History Array (push front, pop back)
  state.pointerHistory.unshift({x: state.easedPointer.x, y: state.easedPointer.y});
  if (state.pointerHistory.length > 20) {
    state.pointerHistory.pop();
  }

  // Clear Canvas (Transparent)
  ctx.clearRect(0, 0, state.imageWidth, state.imageHeight);
  
  if (state.fragments.length > 0) {
    const scaleX = state.imageWidth / canvas.width;
    const scaleY = state.imageHeight / canvas.height;
    
    // Pointer relative to canvas, scaled to image space
    const pointerLocalX = (state.easedPointer.x - state.canvasRect.left) * scaleX;
    const pointerLocalY = (state.easedPointer.y - state.canvasRect.top) * scaleY;
    
    const interactionRadius = CONSTANTS.POINTER_RADIUS * scaleX;
    
    // Check Hotspot
    const hotspotLocalX = state.imageWidth * CONSTANTS.HOTSPOT_X;
    const hotspotLocalY = state.imageHeight * CONSTANTS.HOTSPOT_Y;
    const hotspotDist = Math.hypot(pointerLocalX - hotspotLocalX, pointerLocalY - hotspotLocalY);
    const hotspotActive = (hotspotDist < CONSTANTS.HOTSPOT_RADIUS * scaleX);

    // Normalize velocity for direction push
    const velNormX = speed > 0.1 ? (state.velocity.x / speed) : 0;
    const velNormY = speed > 0.1 ? (state.velocity.y / speed) : 0;

    for (let i = 0; i < state.fragments.length; i++) {
      const frag = state.fragments[i];
      
      // 1. Idle Micro-motion
      // Slow, deterministic, stable sine drift
      const driftX = Math.sin(timeElapsedMs * frag.driftSpeed + frag.driftPhaseX) * frag.driftRadius;
      const driftY = Math.cos(timeElapsedMs * frag.driftSpeed + frag.driftPhaseY) * frag.driftRadius;
      
      let breathAlpha = frag.baseAlpha;
      if (frag.isHotspotAccent) {
        // More noticeable opacity breathing for selected particles near hotspot
        breathAlpha += Math.sin(timeElapsedMs * frag.driftSpeed * 1.5 + frag.driftPhaseX) * 0.15;
      } else {
        // Very subtle breathing for regular particles
        breathAlpha += Math.sin(timeElapsedMs * frag.driftSpeed + frag.driftPhaseX) * 0.05;
      }
      
      let targetFX = frag.ox + driftX;
      let targetFY = frag.oy + driftY;
      let targetRot = frag.baseRotation;
      let drawAlpha = Math.max(0.1, Math.min(1.0, breathAlpha));
      let drawSize = frag.baseSize;
      
      // 2. Pointer Interaction
      const dx = pointerLocalX - targetFX;
      const dy = pointerLocalY - targetFY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (state.pointer.active && dist < interactionRadius) {
        const force = (interactionRadius - dist) / interactionRadius; 
        
        // Push in direction of pointer velocity, and cluster/loosen slightly based on force
        // Max displacement around 2-6px
        targetFX += (velNormX * 4 + (dx/dist)*1.5) * force;
        targetFY += (velNormY * 4 + (dy/dist)*1.5) * force;
        
        targetRot += force * (Math.PI / 30); 
        
        drawSize += force * 0.5;
        drawAlpha = Math.min(1.0, drawAlpha + force * 0.3);
      }
      
      // 3. Hotspot Interaction (material gather)
      if (hotspotActive && Math.hypot(hotspotLocalX - targetFX, hotspotLocalY - targetFY) < interactionRadius) {
        const hDist = Math.hypot(hotspotLocalX - targetFX, hotspotLocalY - targetFY);
        const hForce = Math.max(0, (interactionRadius - hDist) / interactionRadius);
        
        targetFX += (hotspotLocalX - targetFX) * hForce * 0.12;
        targetFY += (hotspotLocalY - targetFY) * hForce * 0.12;
        drawSize += hForce * 0.3;
        drawAlpha = Math.min(1.0, drawAlpha + hForce * 0.2);
      }
      
      // Apply spring easing back to target
      frag.x += (targetFX - frag.x) * 0.15;
      frag.y += (targetFY - frag.y) * 0.15;
      frag.currentRotation += (targetRot - frag.currentRotation) * 0.1;
      
      // Rendering
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
    
    // --- CSS MASK REVEAL ---
    if (state.pointer.active || state.pointerHistory.length > 0) {
      const pMaskX = state.easedPointer.x - state.canvasRect.left;
      const pMaskY = state.easedPointer.y - state.canvasRect.top;
      
      const e1 = state.pointerHistory[Math.min(CONSTANTS.ECHO1_DELAY, state.pointerHistory.length-1)] || state.easedPointer;
      const e2 = state.pointerHistory[Math.min(CONSTANTS.ECHO2_DELAY, state.pointerHistory.length-1)] || state.easedPointer;
      const e3 = state.pointerHistory[Math.min(CONSTANTS.ECHO3_DELAY, state.pointerHistory.length-1)] || state.easedPointer;
      
      // Expand mask subtly on hotspot
      const expand = hotspotActive ? 15 : 0;
      
      let coreR = 45 + expand;
      let softR = 85 + expand;
      
      // Fade out mask if pointer is inactive
      if (!state.pointer.active && speed < 0.2) {
        coreR = 0; softR = 0;
      }
      
      realHandImg.style.setProperty('--p-x', `${pMaskX}px`);
      realHandImg.style.setProperty('--p-y', `${pMaskY}px`);
      realHandImg.style.setProperty('--core-r', `${coreR}px`);
      realHandImg.style.setProperty('--soft-r', `${softR}px`);
      
      realHandImg.style.setProperty('--e1-x', `${e1.x - state.canvasRect.left}px`);
      realHandImg.style.setProperty('--e1-y', `${e1.y - state.canvasRect.top}px`);
      
      realHandImg.style.setProperty('--e2-x', `${e2.x - state.canvasRect.left}px`);
      realHandImg.style.setProperty('--e2-y', `${e2.y - state.canvasRect.top}px`);
      
      realHandImg.style.setProperty('--e3-x', `${e3.x - state.canvasRect.left}px`);
      realHandImg.style.setProperty('--e3-y', `${e3.y - state.canvasRect.top}px`);
    }
    
    // --- DEBUG ---
    if (state.debug) {
      debugInfo.innerHTML = `
        Fragments: ${state.fragments.length}<br>
        Speed: ${Math.round(speed)}<br>
        Hotspot: ${hotspotActive ? 'Active' : 'Idle'}<br>
        <span style="color: #666">Grey: Echoes, Red: Hotspot</span>
      `;
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,0,0,0.5)';
      ctx.lineWidth = 1;
      ctx.arc(hotspotLocalX, hotspotLocalY, CONSTANTS.HOTSPOT_RADIUS * scaleX, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
      ctx.arc(pointerLocalX, pointerLocalY, 45 * scaleX, 0, Math.PI * 2);
      ctx.stroke();
      
      const e1 = state.pointerHistory[Math.min(CONSTANTS.ECHO1_DELAY, state.pointerHistory.length-1)] || state.easedPointer;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.arc((e1.x - state.canvasRect.left) * scaleX, (e1.y - state.canvasRect.top) * scaleY, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  requestAnimationFrame(render);
}

init();
