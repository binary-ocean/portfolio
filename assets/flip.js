// ---------- FLIP-CLOCK LETTER ANIMATION (single-face) ----------
(function(){
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (REDUCED) return;

  const NBSP = '\u00a0';
  const FLIP_MS = 280; // must match CSS .letter-card transition

  // Build a letter row for `text`. Each letter starts in the 'hidden' class
  // (rotated -90deg) and will be settled later. Spaces use NBSP so Flexbox
  // keeps them as siblings.
  function buildLetters(container, text){
    const row = container.querySelector('.flip-letters');
    row.innerHTML = '';
    const chars = [...text];
    const letters = chars.map(ch => {
      const l = document.createElement('span');
      l.className = 'letter hidden';
      const card = document.createElement('span');
      card.className = 'letter-card';
      card.textContent = (ch === ' ' ? NBSP : ch);
      l.appendChild(card);
      row.appendChild(l);
      return l;
    });
    return letters;
  }

  // Flip letters IN one-by-one with stagger. Returns ms until last letter settles.
  function flipIn(container, text, startDelay, perLetter){
    const letters = buildLetters(container, text);
    letters.forEach((l, i) => {
      setTimeout(() => {
        l.classList.remove('hidden');
        l.classList.add('settled');
      }, startDelay + i * perLetter);
    });
    return startDelay + letters.length * perLetter + FLIP_MS;
  }

  // Swap visible text letter-by-letter. Each letter rotates out (to +90deg);
  // at the edge-on moment we swap textContent and set `.settled`, so the CSS
  // transition carries the card from +90deg back through 0deg naturally.
  // A `busy` flag on the container prevents overlapping cycles.
  function flipSwap(container, newText, perLetter){
    if (container._flipBusy) return;
    container._flipBusy = true;

    const row = container.querySelector('.flip-letters');
    const newChars = [...newText];

    // Pad row to at least newText length (hidden letters for the newcomers
    // will animate in from -90deg via .hidden -> .settled).
    while (row.children.length < newChars.length){
      const l = document.createElement('span');
      l.className = 'letter hidden';
      const card = document.createElement('span');
      card.className = 'letter-card';
      card.textContent = NBSP;
      l.appendChild(card);
      row.appendChild(l);
    }

    const letters = [...row.querySelectorAll('.letter')];
    const total = letters.length;

    letters.forEach((l, i) => {
      const targetCh = i < newChars.length ? (newChars[i] === ' ' ? NBSP : newChars[i]) : NBSP;
      const start = i * perLetter;
      const wasHidden = l.classList.contains('hidden');

      // phase 1: rotate out (existing letters only; padded newcomers stay hidden)
      setTimeout(() => {
        if (!wasHidden){
          l.classList.remove('settled');
          l.classList.add('out');
        }
      }, start);

      // phase 2: swap text at edge-on, then settle directly.
      // From +90 (out) -> 0 (settled): card transitions through, reading in.
      // From -90 (hidden) -> 0 (settled): newcomer flips in fresh.
      setTimeout(() => {
        const card = l.querySelector('.letter-card');
        card.textContent = targetCh;
        l.classList.remove('out');
        l.classList.remove('hidden');
        l.classList.add('settled');
      }, start + FLIP_MS - 10);
    });

    // Trim excess letters and sync ghost after cycle completes
    const totalMs = total * perLetter + FLIP_MS * 2 + 80;
    setTimeout(() => {
      while (row.children.length > newChars.length){
        row.removeChild(row.lastChild);
      }
      const ghost = container.querySelector('.flip-ghost');
      if (ghost) ghost.textContent = newText;
      container._flipBusy = false;
    }, totalMs);
  }

  // ---------- WIRE UP ----------
  const PER_LETTER = 55;
  const PER_WORD_GAP = 180;
  const START = 220;

  const sequence = [
    {sel: '.flip[data-flip="games"]',            text: 'Games'},
    {sel: '.flip[data-flip="top-predicate"]',    text: NBSP + 'by passion.'},
    {sel: '.flip[data-flip="apps"]',             text: 'Apps'},
    {sel: '.flip[data-flip="bottom-predicate"]', text: NBSP + 'by design.'},
  ];

  let cursor = START;
  let lastEnd = cursor;
  sequence.forEach(({sel, text}) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const endAt = flipIn(el, text, cursor, PER_LETTER);
    lastEnd = Math.max(lastEnd, endAt);
    cursor += text.length * PER_LETTER + PER_WORD_GAP;
  });

  // ---------- CYCLE PREDICATES ----------
  function startCycle(el, words){
    // words already includes the initial visible text at index 0.
    let idx = 0;
    const INTERVAL = 5200;
    setInterval(() => {
      idx = (idx + 1) % words.length;
      flipSwap(el, words[idx], 45);
    }, INTERVAL);
  }

  setTimeout(() => {
    document.querySelectorAll('.flip[data-flip-role="cycle"]').forEach(el => {
      const list = (el.dataset.cycle || '').split('|').map(s => NBSP + s);
      if (list.length > 1) startCycle(el, list);
    });
  }, lastEnd + 2400); // give the hero a beat before cycling kicks in
})();
