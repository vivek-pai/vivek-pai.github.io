<script lang="ts">
  import { onMount } from 'svelte';
  import { hotspots } from '@lib/schematic-hotspots';
  import HotspotRegion from './HotspotRegion.svelte';
  import { playBootSound } from '@lib/sounds';

  let hoveredId: string | null = null;
  let svgEl: SVGSVGElement;
  let mounted = false;

  // Pre-compute hotspot lookups so template doesn't need non-null assertions
  const hs = Object.fromEntries(hotspots.map((h) => [h.id, h])) as Record<string, typeof hotspots[0]>;

  function handleHover(id: string | null) {
    hoveredId = id;
  }

  onMount(async () => {
    mounted = true;
    playBootSound();
    const anime = (await import('animejs/lib/anime.es.js')).default;

    // Phase 1: outer frame lines draw in
    anime({
      targets: svgEl.querySelectorAll('.frame-line'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 900,
      delay: anime.stagger(80),
    });

    // Phase 2: interior construction lines
    anime({
      targets: svgEl.querySelectorAll('.construction-line'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 700,
      delay: anime.stagger(40, { start: 500 }),
    });

    // Phase 3: annotation text fades in
    anime({
      targets: svgEl.querySelectorAll('.annotation-fade'),
      opacity: [0, 1],
      easing: 'easeOutSine',
      duration: 400,
      delay: anime.stagger(60, { start: 1000 }),
    });

    // Phase 3b: section detail art — primary blueprint layer, fades in prominently
    anime({
      targets: svgEl.querySelectorAll('.detail-fade'),
      opacity: [0, 0.78],
      easing: 'easeOutSine',
      duration: 500,
      delay: anime.stagger(80, { start: 1100 }),
    });

    // Phase 3c: leader lines + callout codes — atmospheric, secondary layer
    anime({
      targets: svgEl.querySelectorAll('.callout-fade'),
      opacity: [0, 0.3],
      easing: 'easeOutSine',
      duration: 400,
      delay: anime.stagger(50, { start: 1300 }),
    });

    // Phase 4: idle pulse on active hotspot dots
    anime({
      targets: svgEl.querySelectorAll('.hotspot-dot'),
      opacity: [0.35, 0.85],
      easing: 'easeInOutSine',
      duration: 2200,
      delay: anime.stagger(300),
      loop: true,
      direction: 'alternate',
    });
  });

  // Coordinate readout for hovered hotspot
  const coordMap: Record<string, string> = {
    hci: 'X: 072.4  Y: 031.2',
    research: 'X: 108.7  Y: 028.5',
    fabrication: 'X: 042.1  Y: 068.9',
    music: 'X: 115.3  Y: 071.4',
    about: 'X: 078.9  Y: 108.6',
  };

  $: activeCoords = hoveredId ? (coordMap[hoveredId] ?? '') : '';
</script>

<div class="schematic-wrapper" class:mounted>
  <!-- Fallback nav for screen readers / mobile -->
  <nav class="schematic-fallback" aria-label="Site sections">
    <header class="fallback-header">
      <div class="fallback-id">
        <span class="fallback-name">VIVEK PAI</span>
        <span class="fallback-vessel">// VP-01</span>
      </div>
      <p class="fallback-tagline">Builder. Researcher. Occasional performer.</p>
      <div class="fallback-rule"></div>
    </header>
    <ul>
      {#each hotspots.filter((h) => h.active) as h (h.id)}
        <li><a href={h.href}>{h.label} <span class="fallback-sub">— {h.sublabel}</span></a></li>
      {/each}
    </ul>
  </nav>

  <!-- The SVG schematic -->
  <svg
    bind:this={svgEl}
    class="schematic-svg"
    viewBox="0 0 900 620"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-label="Interactive vessel schematic — click a section to navigate"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- ░░░ BACKGROUND GRID ░░░ -->
    <defs>
      <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(139,115,85,0.12)" stroke-width="0.4"/>
      </pattern>
      <pattern id="grid-major" width="90" height="90" patternUnits="userSpaceOnUse">
        <path d="M 90 0 L 0 0 0 90" fill="none" stroke="rgba(139,115,85,0.2)" stroke-width="0.6"/>
      </pattern>
    </defs>
    <rect width="900" height="620" fill="var(--color-bg, #F9F8F8)"/>
    <rect width="900" height="620" fill="url(#grid)"/>
    <rect width="900" height="620" fill="url(#grid-major)"/>

    <!-- ░░░ VESSEL HULL — Da Vinci flying machine meets hard sci-fi ░░░
         Design: asymmetric lifting-body form, top-down view.
         A broad, slightly swept central hull; forward observation section;
         two asymmetric lateral booms/pontoons; rear propulsion cluster.
         Think a Da Vinci ornithopter's planform, enlarged.
    -->

    <!-- OUTER HULL PERIMETER -->
    <path
      class="frame-line"
      d="
        M 450 55
        C 510 55, 590 70, 640 100
        L 720 140
        C 770 165, 810 200, 820 240
        L 822 310
        C 820 345, 800 375, 770 395
        L 700 430
        C 660 448, 610 458, 570 460
        L 540 505
        C 530 528, 510 545, 480 550
        L 450 555
        L 420 550
        C 390 545, 370 528, 360 505
        L 330 460
        C 290 458, 240 448, 200 430
        L 130 395
        C 100 375, 80 345, 78 310
        L 80 240
        C 90 200, 130 165, 180 140
        L 260 100
        C 310 70, 390 55, 450 55
        Z
      "
      fill="rgba(241,239,237,0.7)"
      stroke="#8B7355"
      stroke-width="1.2"
    />

    <!-- FORWARD OBSERVATION NOSE — blunt ellipsoid -->
    <ellipse class="frame-line" cx="450" cy="80" rx="60" ry="28" fill="rgba(196,184,168,0.2)" stroke="#8B7355" stroke-width="0.8"/>

    <!-- CENTRAL SPINE -->
    <line class="construction-line" x1="450" y1="55" x2="450" y2="555" stroke="#8B7355" stroke-width="0.6" stroke-dasharray="6 3" opacity="0.5"/>

    <!-- CROSS-SECTION RIBS -->
    <line class="construction-line" x1="200" y1="210" x2="700" y2="210" stroke="#8B7355" stroke-width="0.5" stroke-dasharray="4 4" opacity="0.4"/>
    <line class="construction-line" x1="140" y1="310" x2="760" y2="310" stroke="#8B7355" stroke-width="0.5" stroke-dasharray="4 4" opacity="0.4"/>
    <line class="construction-line" x1="185" y1="400" x2="715" y2="400" stroke="#8B7355" stroke-width="0.5" stroke-dasharray="4 4" opacity="0.4"/>

    <!-- LEFT LATERAL BOOM -->
    <path class="frame-line" d="M 200 250 C 140 265, 90 285, 72 310 L 78 340 C 100 320, 150 305, 200 300 Z"
      fill="rgba(196,184,168,0.15)" stroke="#8B7355" stroke-width="0.9"/>

    <!-- RIGHT LATERAL BOOM -->
    <path class="frame-line" d="M 700 250 C 760 265, 810 285, 828 310 L 822 340 C 800 320, 750 305, 700 300 Z"
      fill="rgba(196,184,168,0.15)" stroke="#8B7355" stroke-width="0.9"/>

    <!-- AFT PROPULSION CLUSTER -->
    <path class="frame-line" d="M 380 530 C 370 540, 360 555, 362 570 L 380 572 L 420 572 L 450 572 L 480 572 L 520 572 L 538 570 C 540 555, 530 540, 520 530 Z"
      fill="rgba(196,184,168,0.2)" stroke="#8B7355" stroke-width="0.9"/>

    <!-- PROPULSION NOZZLE DETAILS -->
    <ellipse class="construction-line" cx="410" cy="568" rx="14" ry="6" fill="none" stroke="#8B7355" stroke-width="0.6" opacity="0.7"/>
    <ellipse class="construction-line" cx="450" cy="570" rx="14" ry="6" fill="none" stroke="#8B7355" stroke-width="0.6" opacity="0.7"/>
    <ellipse class="construction-line" cx="490" cy="568" rx="14" ry="6" fill="none" stroke="#8B7355" stroke-width="0.6" opacity="0.7"/>

    <!-- ░░░ HOTSPOT SECTIONS ░░░ -->

    <!-- BRIDGE / HCI — forward command section, centered around nose -->
    <HotspotRegion hotspot={hs['hci']} onHover={handleHover}>
      <!-- Hit area -->
      <ellipse class="hotspot-outline" cx="450" cy="145" rx="130" ry="90"
        fill={hoveredId === 'hci' ? 'rgba(218,79,46,0.08)' : 'rgba(218,79,46,0)'}
        stroke={hoveredId === 'hci' ? '#da4f2e' : 'rgba(218,79,46,0.3)'}
        stroke-width="0.8" stroke-dasharray="5 3"
        style="transition: fill 200ms, stroke 200ms"/>
      <!-- Indicator dot -->
      <circle class="hotspot-dot" cx="450" cy="145" r="3.5" fill="#da4f2e"/>
      <!-- Labels -->
      <text class="annotation-fade" x="450" y="130" text-anchor="middle"
        font-family="Signika, sans-serif" font-size="7" font-weight="600"
        fill={hoveredId === 'hci' ? '#da4f2e' : '#8B7355'}
        letter-spacing="0.12em" text-transform="uppercase"
        style="transition: fill 200ms">BRIDGE</text>
      <text class="annotation-fade" x="450" y="162" text-anchor="middle"
        font-family="Signika, sans-serif" font-size="5.5"
        fill="#8B7355" letter-spacing="0.08em" opacity="0.7">HCI / WORK</text>
      <!-- Leader to edge -->
      <line class="callout-fade" x1="580" y1="130" x2="620" y2="112"
        stroke="#8B7355" stroke-width="0.5" stroke-dasharray="3 2"/>
      <text class="callout-fade" x="625" y="110"
        font-family="Courier New, monospace" font-size="5" fill="#6b6060">FWD.COMMAND</text>
    </HotspotRegion>

    <!-- SCIENCE BAY / RESEARCH — starboard mid -->
    <HotspotRegion hotspot={hs['research']} onHover={handleHover}>
      <rect class="hotspot-outline" x="580" y="195" width="160" height="130" rx="4"
        fill={hoveredId === 'research' ? 'rgba(218,79,46,0.08)' : 'rgba(218,79,46,0)'}
        stroke={hoveredId === 'research' ? '#da4f2e' : 'rgba(218,79,46,0.3)'}
        stroke-width="0.8" stroke-dasharray="5 3"
        style="transition: fill 200ms, stroke 200ms"/>
      <circle class="hotspot-dot" cx="660" cy="260" r="3.5" fill="#da4f2e"/>
      <text class="annotation-fade" x="660" y="248" text-anchor="middle"
        font-family="Signika, sans-serif" font-size="7" font-weight="600"
        fill={hoveredId === 'research' ? '#da4f2e' : '#8B7355'}
        letter-spacing="0.12em" style="transition: fill 200ms">SCIENCE BAY</text>
      <text class="annotation-fade" x="660" y="270" text-anchor="middle"
        font-family="Signika, sans-serif" font-size="5.5" fill="#8B7355" letter-spacing="0.08em" opacity="0.7">RESEARCH</text>
      <line class="callout-fade" x1="740" y1="230" x2="790" y2="215"
        stroke="#8B7355" stroke-width="0.5" stroke-dasharray="3 2"/>
      <text class="callout-fade" x="795" y="213"
        font-family="Courier New, monospace" font-size="5" fill="#6b6060">SCI-LAB/01</text>
    </HotspotRegion>

    <!-- ENGINEERING DECK / FABRICATION — port mid -->
    <HotspotRegion hotspot={hs['fabrication']} onHover={handleHover}>
      <rect class="hotspot-outline" x="160" y="195" width="160" height="130" rx="4"
        fill={hoveredId === 'fabrication' ? 'rgba(218,79,46,0.08)' : 'rgba(218,79,46,0)'}
        stroke={hoveredId === 'fabrication' ? '#da4f2e' : 'rgba(218,79,46,0.3)'}
        stroke-width="0.8" stroke-dasharray="5 3"
        style="transition: fill 200ms, stroke 200ms"/>
      <circle class="hotspot-dot" cx="240" cy="260" r="3.5" fill="#da4f2e"/>
      <text class="annotation-fade" x="240" y="248" text-anchor="middle"
        font-family="Signika, sans-serif" font-size="6.5" font-weight="600"
        fill={hoveredId === 'fabrication' ? '#da4f2e' : '#8B7355'}
        letter-spacing="0.10em" style="transition: fill 200ms">ENG. DECK</text>
      <text class="annotation-fade" x="240" y="270" text-anchor="middle"
        font-family="Signika, sans-serif" font-size="5.5" fill="#8B7355" letter-spacing="0.08em" opacity="0.7">FABRICATION</text>
      <line class="callout-fade" x1="160" y1="230" x2="110" y2="215"
        stroke="#8B7355" stroke-width="0.5" stroke-dasharray="3 2"/>
      <text class="callout-fade" x="30" y="213"
        font-family="Courier New, monospace" font-size="5" fill="#6b6060">ENG-DECK/P</text>
    </HotspotRegion>

    <!-- RECREATION DECK / MUSIC — starboard aft -->
    <HotspotRegion hotspot={hs['music']} onHover={handleHover}>
      <rect class="hotspot-outline" x="565" y="345" width="155" height="120" rx="4"
        fill={hoveredId === 'music' ? 'rgba(218,79,46,0.08)' : 'rgba(218,79,46,0)'}
        stroke={hoveredId === 'music' ? '#da4f2e' : 'rgba(218,79,46,0.3)'}
        stroke-width="0.8" stroke-dasharray="5 3"
        style="transition: fill 200ms, stroke 200ms"/>
      <circle class="hotspot-dot" cx="643" cy="405" r="3.5" fill="#da4f2e"/>
      <text class="annotation-fade" x="643" y="393" text-anchor="middle"
        font-family="Signika, sans-serif" font-size="6.5" font-weight="600"
        fill={hoveredId === 'music' ? '#da4f2e' : '#8B7355'}
        letter-spacing="0.10em" style="transition: fill 200ms">REC. DECK</text>
      <text class="annotation-fade" x="643" y="415" text-anchor="middle"
        font-family="Signika, sans-serif" font-size="5.5" fill="#8B7355" letter-spacing="0.08em" opacity="0.7">PERFORMANCE</text>
      <line class="callout-fade" x1="720" y1="380" x2="760" y2="365"
        stroke="#8B7355" stroke-width="0.5" stroke-dasharray="3 2"/>
      <text class="callout-fade" x="765" y="363"
        font-family="Courier New, monospace" font-size="5" fill="#6b6060">REC-DECK/S</text>
    </HotspotRegion>

    <!-- CAPTAIN'S QUARTERS / ABOUT — aft center -->
    <HotspotRegion hotspot={hs['about']} onHover={handleHover}>
      <rect class="hotspot-outline" x="360" y="415" width="180" height="100" rx="4"
        fill={hoveredId === 'about' ? 'rgba(218,79,46,0.08)' : 'rgba(218,79,46,0)'}
        stroke={hoveredId === 'about' ? '#da4f2e' : 'rgba(218,79,46,0.3)'}
        stroke-width="0.8" stroke-dasharray="5 3"
        style="transition: fill 200ms, stroke 200ms"/>
      <circle class="hotspot-dot" cx="450" cy="465" r="3.5" fill="#da4f2e"/>
      <text class="annotation-fade" x="450" y="453" text-anchor="middle"
        font-family="Signika, sans-serif" font-size="7" font-weight="600"
        fill={hoveredId === 'about' ? '#da4f2e' : '#8B7355'}
        letter-spacing="0.12em" style="transition: fill 200ms">CAPTAIN'S QTR</text>
      <text class="annotation-fade" x="450" y="473" text-anchor="middle"
        font-family="Signika, sans-serif" font-size="5.5" fill="#8B7355" letter-spacing="0.08em" opacity="0.7">ABOUT</text>
    </HotspotRegion>

    <!-- SILENT SECTIONS — port aft & starboard forward -->
    <g class="hotspot hotspot--silent" aria-hidden="true" style="pointer-events:none">
      <!-- Trade Deck placeholder — port aft -->
      <rect x="160" y="345" width="155" height="120" rx="4"
        fill="none" stroke="rgba(139,115,85,0.15)" stroke-width="0.6" stroke-dasharray="3 4"/>
      <text x="237" y="408" text-anchor="middle"
        font-family="Signika, sans-serif" font-size="5.5" fill="rgba(139,115,85,0.3)" letter-spacing="0.08em">[RESTRICTED]</text>
    </g>
    <g class="hotspot hotspot--silent" aria-hidden="true" style="pointer-events:none">
      <!-- Atelier placeholder — central upper port -->
      <rect x="280" y="195" width="140" height="130" rx="4"
        fill="none" stroke="rgba(139,115,85,0.15)" stroke-width="0.6" stroke-dasharray="3 4"/>
      <text x="350" y="263" text-anchor="middle"
        font-family="Signika, sans-serif" font-size="5.5" fill="rgba(139,115,85,0.3)" letter-spacing="0.08em">[RESTRICTED]</text>
    </g>

    <!-- ░░░ SECTION DETAIL ARTWORK ░░░ -->

    <!-- BRIDGE details — command chair, side consoles, forward viewports -->
    <g class="detail-fade">
      <!-- Forward viewport arcs (inside nose ellipse) -->
      <path d="M 415 72 Q 450 62 485 72" fill="none" stroke="#8B7355" stroke-width="1.2"/>
      <path d="M 422 82 Q 450 73 478 82" fill="none" stroke="#8B7355" stroke-width="1.0"/>
      <path d="M 430 91 Q 450 83 470 91" fill="none" stroke="#8B7355" stroke-width="0.8"/>
      <!-- Port console panel -->
      <rect x="340" y="118" width="40" height="26" rx="2" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.0"/>
      <line x1="344" y1="126" x2="376" y2="126" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="344" y1="132" x2="372" y2="132" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="344" y1="138" x2="376" y2="138" stroke="#8B7355" stroke-width="0.8"/>
      <!-- Starboard console panel -->
      <rect x="520" y="118" width="40" height="26" rx="2" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.0"/>
      <line x1="524" y1="126" x2="556" y2="126" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="524" y1="132" x2="552" y2="132" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="524" y1="138" x2="556" y2="138" stroke="#8B7355" stroke-width="0.8"/>
      <!-- Command chair (top-down oval) -->
      <ellipse cx="450" cy="182" rx="22" ry="16" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.0"/>
      <path d="M 428 180 Q 450 194 472 180" fill="none" stroke="#8B7355" stroke-width="0.8"/>
    </g>

    <!-- SCIENCE BAY details — lab bench, flasks, waveform readout -->
    <g class="detail-fade">
      <!-- Top bench along upper wall -->
      <rect x="590" y="200" width="130" height="18" rx="2" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.0"/>
      <!-- Flask circles along bench -->
      <circle cx="610" cy="209" r="6" fill="none" stroke="#8B7355" stroke-width="1.0"/>
      <circle cx="626" cy="209" r="6" fill="none" stroke="#8B7355" stroke-width="1.0"/>
      <circle cx="642" cy="209" r="5" fill="none" stroke="#8B7355" stroke-width="1.0"/>
      <line x1="626" y1="203" x2="626" y2="198" stroke="#8B7355" stroke-width="1.0"/>
      <!-- Right wall equipment rack -->
      <rect x="713" y="212" width="16" height="88" rx="2" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.0"/>
      <line x1="713" y1="228" x2="729" y2="228" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="713" y1="244" x2="729" y2="244" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="713" y1="260" x2="729" y2="260" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="713" y1="276" x2="729" y2="276" stroke="#8B7355" stroke-width="0.8"/>
      <!-- Data waveform readout -->
      <rect x="591" y="290" width="62" height="24" rx="2" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.0"/>
      <path d="M 597 302 L 604 302 L 607 294 L 612 310 L 617 297 L 621 302 L 649 302" fill="none" stroke="#8B7355" stroke-width="1.2"/>
    </g>

    <!-- ENGINEERING DECK details — workbench, 3D printer, tool rack -->
    <g class="detail-fade">
      <!-- Top workbench along upper wall -->
      <rect x="170" y="200" width="130" height="18" rx="2" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.0"/>
      <!-- Tool rack — left wall with shelves -->
      <rect x="170" y="222" width="14" height="78" rx="2" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.0"/>
      <line x1="170" y1="236" x2="184" y2="236" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="170" y1="250" x2="184" y2="250" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="170" y1="264" x2="184" y2="264" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="170" y1="278" x2="184" y2="278" stroke="#8B7355" stroke-width="0.8"/>
      <!-- 3D printer build platform with crosshair -->
      <rect x="190" y="288" width="52" height="32" rx="2" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.0"/>
      <line x1="216" y1="288" x2="216" y2="320" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="190" y1="304" x2="242" y2="304" stroke="#8B7355" stroke-width="0.8"/>
      <!-- Print head arm -->
      <line x1="188" y1="281" x2="244" y2="281" stroke="#8B7355" stroke-width="1.4"/>
      <line x1="216" y1="281" x2="216" y2="288" stroke="#8B7355" stroke-width="1.2"/>
      <!-- Pipe / conduit run -->
      <path d="M 184 304 Q 184 322 202 322 L 258 322" fill="none" stroke="#8B7355" stroke-width="1.0" stroke-dasharray="5 3"/>
    </g>

    <!-- RECREATION DECK details — stage circles, piano keys, musical staff -->
    <g class="detail-fade">
      <!-- Musical staff lines -->
      <line x1="572" y1="357" x2="634" y2="357" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="572" y1="362" x2="634" y2="362" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="572" y1="367" x2="634" y2="367" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="572" y1="372" x2="634" y2="372" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="572" y1="377" x2="634" y2="377" stroke="#8B7355" stroke-width="0.8"/>
      <!-- Piano key strip -->
      <rect x="646" y="350" width="64" height="20" rx="2" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.0"/>
      <line x1="655" y1="350" x2="655" y2="370" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="664" y1="350" x2="664" y2="370" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="673" y1="350" x2="673" y2="370" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="682" y1="350" x2="682" y2="370" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="691" y1="350" x2="691" y2="370" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="700" y1="350" x2="700" y2="370" stroke="#8B7355" stroke-width="0.8"/>
      <!-- Stage concentric circles -->
      <circle cx="607" cy="440" r="26" fill="none" stroke="#8B7355" stroke-width="1.0"/>
      <circle cx="607" cy="440" r="16" fill="none" stroke="#8B7355" stroke-width="0.8"/>
      <!-- Spotlight arm -->
      <line x1="698" y1="369" x2="626" y2="428" stroke="#8B7355" stroke-width="0.8" stroke-dasharray="4 3"/>
      <circle cx="701" cy="367" r="5" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.0"/>
    </g>

    <!-- CAPTAIN'S QUARTERS details — porthole, desk, bookshelf -->
    <g class="detail-fade">
      <!-- Porthole with crosshair -->
      <circle cx="520" cy="434" r="22" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.2"/>
      <circle cx="520" cy="434" r="14" fill="none" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="520" y1="417" x2="520" y2="451" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="503" y1="434" x2="537" y2="434" stroke="#8B7355" stroke-width="0.8"/>
      <!-- Desk footprint (L-shape) -->
      <path d="M 366 426 L 420 426 L 420 456 L 392 456 L 392 502 L 366 502 Z" fill="rgba(196,184,168,0.08)" stroke="#8B7355" stroke-width="1.0"/>
      <!-- Bookshelf with dividers -->
      <rect x="430" y="480" width="60" height="26" rx="2" fill="rgba(196,184,168,0.12)" stroke="#8B7355" stroke-width="1.0"/>
      <line x1="440" y1="480" x2="440" y2="506" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="450" y1="480" x2="450" y2="506" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="460" y1="480" x2="460" y2="506" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="470" y1="480" x2="470" y2="506" stroke="#8B7355" stroke-width="0.8"/>
      <line x1="480" y1="480" x2="480" y2="506" stroke="#8B7355" stroke-width="0.8"/>
    </g>

    <!-- ░░░ SCHEMATIC ANNOTATIONS ░░░ -->

    <!-- Ship designation + name -->
    <text class="annotation-fade" x="30" y="21"
      font-family="Signika, sans-serif" font-size="8" font-weight="600"
      fill="#8B7355" letter-spacing="0.15em">VIVEK PAI // VP-01</text>
    <text class="callout-fade" x="30" y="31"
      font-family="Courier New, monospace" font-size="4.5"
      fill="#8B7355" letter-spacing="0.08em">CLASSIFICATION: PERSONAL  //  MISSION: DISCOVERY + EXPERIENCE</text>
    <line class="callout-fade" x1="30" y1="35" x2="870" y2="35" stroke="#8B7355" stroke-width="0.5"/>

    <!-- Scale / dimension callouts -->
    <text class="callout-fade" x="30" y="603"
      font-family="Courier New, monospace" font-size="5" fill="#6b6060">SCALE 1:∞  |  REF. VP-2026  |  SECTION: ALL</text>

    <!-- Navigation hint (center bottom) -->
    <text class="callout-fade" x="450" y="603" text-anchor="middle"
      font-family="Courier New, monospace" font-size="5" fill="#8B7355"
      letter-spacing="0.12em">SELECT SECTION TO NAVIGATE</text>

    <!-- Compass rose — lower right -->
    <g class="callout-fade" transform="translate(848, 582)">
      <circle cx="0" cy="0" r="14" fill="none" stroke="#8B7355" stroke-width="0.5"/>
      <line x1="0" y1="-11" x2="0" y2="11" stroke="#8B7355" stroke-width="0.7"/>
      <line x1="-11" y1="0" x2="11" y2="0" stroke="#8B7355" stroke-width="0.7"/>
      <text x="0" y="-16" text-anchor="middle" font-family="Signika, sans-serif" font-size="5" fill="#8B7355">N</text>
    </g>

    <!-- Coordinate readout — updates on hover -->
    {#if hoveredId && activeCoords}
      <text x="450" y="590" text-anchor="middle"
        font-family="Courier New, monospace" font-size="6" fill="#da4f2e" opacity="0.8"
        class="coord-readout">⬡ {activeCoords}</text>
    {/if}
  </svg>
</div>

<style>
  .schematic-wrapper {
    width: 100%;
    max-width: 900px;
    height: 100%;
    margin-inline: auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Visually hidden on desktop — AT can still reach it; sighted users see the SVG */
  @media (min-width: 600px) {
    .schematic-fallback {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  }

  .schematic-fallback {
    padding: 3rem 1.5rem 2rem;
  }

  .fallback-header {
    margin-bottom: 2rem;
  }

  .fallback-id {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 0.6rem;
  }

  .fallback-name {
    font-family: var(--font-heading, 'Signika', sans-serif);
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--color-text, #1a1a1a);
  }

  .fallback-vessel {
    font-family: var(--font-mono, monospace);
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: var(--color-line, #8B7355);
    opacity: 0.6;
  }

  .fallback-tagline {
    font-family: var(--font-body, 'PT Serif', serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--color-text-muted, #6b6060);
    margin: 0 0 1.25rem;
    line-height: 1.5;
  }

  .fallback-rule {
    width: 2.5rem;
    height: 2px;
    background: var(--color-accent, #da4f2e);
  }

  .schematic-fallback ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .schematic-fallback a {
    font-family: var(--font-heading, 'Signika', sans-serif);
    font-size: 1rem;
    color: var(--color-text, #1a1a1a);
    text-decoration: none;
    letter-spacing: 0.04em;
  }

  .schematic-fallback a:hover {
    color: var(--color-accent, #da4f2e);
  }

  .fallback-sub {
    font-size: 0.8rem;
    color: var(--color-text-muted, #6b6060);
  }

  .schematic-svg {
    /* Fill the flex container; preserveAspectRatio="xMidYMid meet" letterboxes the content */
    width: 100%;
    height: 100%;
    /* Annotations start invisible — JS fades them in */
    opacity: 0;
    transition: opacity 300ms ease;
  }

  .schematic-wrapper.mounted .schematic-svg {
    opacity: 1;
  }

  /* Hide SVG on very small screens */
  @media (max-width: 599px) {
    .schematic-svg {
      display: none;
    }
  }

  /* Decorative layers — must not intercept pointer events from hotspot regions */
  :global(.detail-fade),
  :global(.callout-fade),
  :global(.frame-line),
  :global(.construction-line) {
    pointer-events: none;
  }

  /* annotation-fade elements start hidden for JS to animate */
  :global(.annotation-fade) {
    opacity: 0;
    pointer-events: none;
  }

  :global(.coord-readout) {
    animation: blink 1.4s step-start infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.3; }
  }
</style>
