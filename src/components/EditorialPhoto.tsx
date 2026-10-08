import { useState, useRef, useEffect, useCallback } from 'react';

// EditorialPhoto: Architectural light study with interactive precision detail loupe.
// Replaces the rigid scroll-jacked zoom with a frictionless editorial spread
// and an agency-grade magnetic 2.4x optical loupe that lets the visitor
// inspect the texture of raw concrete and natural light aperture.
export function EditorialPhoto() {
  const visualRef = useRef<HTMLDivElement>(null);
  const loupeRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const loupeImgRef = useRef<HTMLImageElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);

  const [isInspecting, setIsInspecting] = useState(false);
  const [touchActive, setTouchActive] = useState(false);

  const MAGNIFICATION = 2.4;

  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    width: 0,
    height: 0,
    radius: 105,
    active: false,
    rafId: 0,
  });

  const updateDimensions = useCallback(() => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    stateRef.current.width = rect.width;
    stateRef.current.height = rect.height;

    if (lensRef.current) {
      stateRef.current.radius = lensRef.current.offsetWidth / 2;
    }

    if (loupeImgRef.current && rect.width > 0) {
      loupeImgRef.current.style.width = `${rect.width * MAGNIFICATION}px`;
      loupeImgRef.current.style.height = `${rect.height * MAGNIFICATION}px`;
    }
  }, [MAGNIFICATION]);

  // High-performance RAF lerp loop (damping = 0.22)
  const loop = useCallback(function animate() {
    const s = stateRef.current;
    if (!s.active) {
      s.rafId = 0;
      return;
    }
    if (s.active) {
      s.currentX += (s.targetX - s.currentX) * 0.22;
      s.currentY += (s.targetY - s.currentY) * 0.22;

      if (loupeRef.current && loupeImgRef.current && s.width > 0 && s.height > 0) {
        const radius = s.radius || (lensRef.current?.offsetWidth ? lensRef.current.offsetWidth / 2 : 105);
        loupeRef.current.style.transform = `translate3d(${s.currentX - radius}px, ${s.currentY - radius}px, 0)`;

        const imgX = radius - s.currentX * MAGNIFICATION;
        const imgY = radius - s.currentY * MAGNIFICATION;
        loupeImgRef.current.style.transform = `translate3d(${imgX}px, ${imgY}px, 0)`;

        if (coordsRef.current) {
          const pctX = Math.max(0, Math.min(100, (s.currentX / s.width) * 100)).toFixed(1);
          const pctY = Math.max(0, Math.min(100, (s.currentY / s.height) * 100)).toFixed(1);
          coordsRef.current.textContent = `X: ${pctX}% · Y: ${pctY}%`;
        }
      }
    }
    s.rafId = requestAnimationFrame(animate);
  }, [MAGNIFICATION]);

  const startLoop = () => {
    if (!stateRef.current.rafId) stateRef.current.rafId = requestAnimationFrame(loop);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const state = stateRef.current;

    return () => {
      cancelAnimationFrame(state.rafId);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [loop, updateDimensions]);

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    updateDimensions();
    const rect = visualRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    stateRef.current.targetX = x;
    stateRef.current.targetY = y;
    stateRef.current.currentX = x;
    stateRef.current.currentY = y;
    stateRef.current.active = true;
    startLoop();
    setIsInspecting(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const rect = visualRef.current?.getBoundingClientRect();
    if (!rect) return;

    stateRef.current.targetX = e.clientX - rect.left;
    stateRef.current.targetY = e.clientY - rect.top;

    if (!stateRef.current.active) {
      updateDimensions();
      stateRef.current.active = true;
      startLoop();
      stateRef.current.currentX = stateRef.current.targetX;
      stateRef.current.currentY = stateRef.current.targetY;
      setIsInspecting(true);
    }
  };

  const handlePointerLeave = () => {
    stateRef.current.active = false;
    setIsInspecting(false);
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    updateDimensions();
    const rect = visualRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;

    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    stateRef.current.targetX = x;
    stateRef.current.targetY = y;
    stateRef.current.currentX = x;
    stateRef.current.currentY = y;
    stateRef.current.active = true;
    startLoop();
    setTouchActive(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = visualRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;

    stateRef.current.targetX = e.touches[0].clientX - rect.left;
    stateRef.current.targetY = e.touches[0].clientY - rect.top;
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      stateRef.current.active = false;
      setTouchActive(false);
    }, 1000);
  };

  const showLoupe = isInspecting || touchActive;

  return (
    <section className="editorial-photo" data-theme="light" aria-labelledby="photo-title">
      <div className="photo-track">
        <div className="photo-stage" data-motion-stage="editorial-photo">
          
          {/* Editorial copy with line masks for split-text entrance */}
          <div className="photo-copy">
            <p className="eyebrow section-label">Zur Gestaltung</p>
            <div className="photo-statement">
              <h2 id="photo-title">
                <span className="photo-title-line"><span>Die Details</span></span>
                <span className="photo-title-line"><span>sind die</span></span>
                <span className="photo-title-line"><span><em>Richtung.</em></span></span>
              </h2>
              <p>Komposition, Kontrast und Zurückhaltung machen eine Präsenz unverwechselbar.</p>
            </div>
            <div className="photo-caption-meta">
              <span className="caption-tag">ATELIER-PRINZIP</span>
              <span className="caption-sep">/</span>
              <span className="caption-desc">Substanz vor Spektakel</span>
            </div>
          </div>

          {/* Photo visual column with interactive optical loupe */}
          <div className="photo-visual-column">
            <div 
              ref={visualRef}
              className={`photo-visual ${showLoupe ? 'is-inspecting' : ''}`}
              onPointerEnter={handlePointerEnter}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <figure className="photo-frame">
                <img 
                  src="/assets/editorial_typography_spread.jpg" 
                  alt="Editorial Design und Typografie-Monografie — Satzspiegel und DIN-Buchstabenstudie" 
                  width="1024" 
                  height="768" 
                  loading="lazy" 
                  decoding="async" 
                />
              </figure>

              {/* Optical Precision Loupe Overlay */}
              <div 
                ref={loupeRef} 
                className={`photo-loupe ${showLoupe ? 'is-visible' : ''}`}
                aria-hidden="true"
              >
                <div ref={lensRef} className="loupe-lens">
                  {/* High-res magnified image mirror */}
                  <img 
                    ref={loupeImgRef}
                    className="loupe-inner-img"
                    src="/assets/editorial_typography_spread.jpg"
                    alt=""
                    draggable={false}
                  />

                  {/* Optical Reticle */}
                  <div className="loupe-reticle">
                    <span className="reticle-axis-h" />
                    <span className="reticle-axis-v" />
                    <span className="reticle-ring" />
                    <span className="reticle-tick-top" />
                    <span className="reticle-tick-bottom" />
                    <span className="reticle-tick-left" />
                    <span className="reticle-tick-right" />
                  </div>
                </div>

                {/* Attached floating HUD metadata */}
                <div className="loupe-hud">
                  <span className="loupe-mag">2.4X</span>
                  <span ref={coordsRef} className="loupe-coords">X: 50.0% · Y: 50.0%</span>
                  <span className="loupe-sub">TYPOGRAFIE &amp; DETAIL</span>
                </div>
              </div>

              {/* Inactive state affordance prompt */}
              {!showLoupe && (
                <div className="photo-hint" aria-hidden="true">
                  <span className="hint-dot" />
                  <span className="hint-text">Detail inspizieren</span>
                  <span className="hint-ratio">2.4X</span>
                </div>
              )}

              {/* Architectural crop corners */}
              {['tl', 'tr', 'bl', 'br'].map(corner => (
                <span className={`photo-crop photo-crop-${corner}`} key={corner} aria-hidden="true" />
              ))}
            </div>

            <p className="photo-credit">
              Abb. 01 — Typografische Satzspiegel-Studie / Editorial Layout
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
