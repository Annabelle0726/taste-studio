(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const preferenceCards = all('.preference-steps li');
  const preferenceStudy = $('.preference-study');
  if (preferenceStudy && preferenceCards.length && 'IntersectionObserver' in window) {
    let shown = 0;
    let visible = false;
    let timer;
    const progress = $('.preference-progress');
    const exit = $('.preference-exit');
    preferenceCards.forEach(card => {
      card.classList.add('pending');
      card.querySelector('.step-content').setAttribute('inert', '');
      card.querySelector('.step-content').setAttribute('aria-hidden', 'true');
    });
    exit.hidden = true;
    function revealStep() {
      const card = preferenceCards[shown++];
      card.classList.remove('pending');
      card.querySelector('.step-content').removeAttribute('inert');
      card.querySelector('.step-content').removeAttribute('aria-hidden');
      card.classList.add('revealed');
      progress.textContent = '已展开 ' + shown + ' / 3 步';
      exit.hidden = shown !== preferenceCards.length;
    }
    function scheduleSteps() {
      clearTimeout(timer);
      if (reduced.matches) {
        while (shown < preferenceCards.length) revealStep();
        return;
      }
      if (!visible || document.hidden || shown === preferenceCards.length) return;
      timer = setTimeout(() => {
        revealStep();
        scheduleSteps();
      }, shown === 0 ? 300 : 2200);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      scheduleSteps();
    }, {rootMargin: '-15% 0px -20% 0px'});
    observer.observe($('.preference-steps'));
    document.addEventListener('visibilitychange', scheduleSteps);
    reduced.addEventListener('change', scheduleSteps);
    scheduleSteps();
  }
  const templateSequence = $('.template-sequence');
  if (templateSequence && !reduced.matches && 'IntersectionObserver' in window) {
    templateSequence.classList.add('is-ready');
    const reveal = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.intersectionRatio >= .4)) return;
      templateSequence.classList.add('is-playing');
      reveal.disconnect();
    }, {threshold: .4});
    reveal.observe(templateSequence);
  }
  const silk = $('.silk');
  const wave = $('#silk-wave');
  const matrix = $('#silk-phase');
  const depth = $('#silk-depth');
  let silkVisible = false;
  let frame = 0, elapsed = 0, lastPaint = 0;

  // The sides catch more air than the fold beneath the headline.
  function prepareWave() {
    const field = document.createElement('canvas');
    field.width = 256;
    field.height = 96;
    const ctx = field.getContext('2d');
    if (!ctx) return false;
    const pixels = ctx.createImageData(field.width, field.height);
    for (let y = 0; y < field.height; y++) {
      const v = y / (field.height - 1);
      const envelope = Math.sin(Math.PI * v);
      for (let x = 0; x < field.width; x++) {
        const u = x / (field.width - 1);
        const edge = Math.abs(2 * u - 1);
        const lift = envelope * (.16 + .84 * edge);
        const angle = 2.8 * u + 1.4 * v + .5 * Math.sin(5 * u + v);
        const offset = 4 * (y * field.width + x);
        pixels.data[offset] = 128 + 125 * lift * Math.sin(angle);
        pixels.data[offset + 1] = 128 + 125 * lift * Math.cos(angle);
        pixels.data[offset + 3] = 255;
      }
    }
    ctx.putImageData(pixels, 0, 0);
    wave.setAttribute('href', field.toDataURL());
    return true;
  }

  let waveReady = false;
  function sizeSilk() {
    depth.setAttribute('scale', Math.min(11, silk.clientWidth * .013));
  }

  function tick(now) {
    if (!lastPaint || now - lastPaint >= 1000 / 30) {
      const step = lastPaint ? Math.min(now - lastPaint, 100) / 1000 : 0;

      if (silkVisible && waveReady) {
        elapsed += step;
        const phase = elapsed * (2 * Math.PI / 18);
        const gust = .62 + .38 * Math.sin(phase * .71);
        const a = gust * Math.cos(phase);
        const b = -gust * Math.sin(phase);
        const bias = .5 - (a + b) * 128 / 255;
        matrix.setAttribute('values', `0 0 0 0 .5  ${a} ${b} 0 0 ${bias}  0 0 0 0 0  0 0 0 0 1`);
      }
      lastPaint = now;
    }
    frame = requestAnimationFrame(tick);
  }

  const gallery = $('.opening');
  const slides = all('.slide');
  const panels = all('.copy-panel');
  const buttons = all('.gallery-controls button');
  const captions = all('.gallery-bar .caption');
  let current = slides.findIndex(slide => slide.classList.contains('active'));
  let timer = 0;
  let galleryVisible = false, hovering = false;
  function show(index) {
    current = index;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
      slide.setAttribute('aria-hidden', String(i !== current));
      panels[i].classList.toggle('active', i === current);
      panels[i].setAttribute('aria-hidden', String(i !== current));
      captions[i].hidden = i !== current;
      buttons[i].setAttribute('aria-pressed', String(i === current));
    });
  }
  function scheduleSlides() {
    clearTimeout(timer);
    if (!reduced.matches && galleryVisible && !document.hidden && !hovering && !gallery.contains(document.activeElement)) {
      timer = setTimeout(() => { show((current + 1) % slides.length); scheduleSlides(); }, 6500);
    }
  }
  $('.gallery-prev').addEventListener('click', () => {
    show((current + slides.length - 1) % slides.length);
    scheduleSlides();
  });
  $('.gallery-next').addEventListener('click', () => {
    show((current + 1) % slides.length);
    scheduleSlides();
  });
  show(0);
  function syncPlayback() {
    cancelAnimationFrame(frame);
    lastPaint = 0;
    const play = !reduced.matches && silkVisible && !document.hidden;
    if (play && !waveReady) waveReady = prepareWave();
    silk.classList.toggle('is-moving', play && waveReady);
    if (play && waveReady) frame = requestAnimationFrame(tick);
    scheduleSlides();
  }
  $('.gallery-controls').hidden = false;
  reduced.addEventListener('change', syncPlayback);
  buttons.forEach((button, i) => button.addEventListener('click', () => { show(i); scheduleSlides(); }));
  gallery.addEventListener('pointerenter', event => { hovering = event.pointerType === 'mouse'; scheduleSlides(); });
  gallery.addEventListener('pointerleave', () => { hovering = false; scheduleSlides(); });
  gallery.addEventListener('focusin', scheduleSlides);
  gallery.addEventListener('focusout', () => setTimeout(scheduleSlides, 0));
  document.addEventListener('visibilitychange', syncPlayback);
  const visibility = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.target === silk) silkVisible = entry.isIntersecting;
      if (entry.target === gallery) galleryVisible = entry.isIntersecting;
    }
    syncPlayback();
  });
  visibility.observe(silk);
  visibility.observe(gallery);
  new ResizeObserver(sizeSilk).observe(silk);
  sizeSilk();
  syncPlayback();

  const chapterLinks = all('.reader-tools nav a');
  const headerLinks = all('.mast nav a');
  const study = $('.book-study');
  const overview = $('.book-overview');
  const detail = $('.book-detail');
  const guide = $('.stitch-guide');
  const stitchTrigger = $('.stitch-trigger');
  const stitchPath = guide.querySelector('path');
  const stitchEnd = guide.querySelector('.stitch-end');
  function connectStitch() {
    const bounds = study.getBoundingClientRect();
    const frame = overview.getBoundingClientRect();
    const photoWidth = Math.min(frame.width, frame.height * 1.5);
    const photo = {left:frame.left, top:frame.top + (frame.height - photoWidth / 1.5) / 2,
      width:photoWidth, height:photoWidth / 1.5, right:frame.left + photoWidth};
    const x = photo.left - bounds.left + photo.width * 467 / 1200;
    const y = photo.top - bounds.top + photo.height * 452 / 800;
    // Both views use the same photograph coordinates, including the visible crop.
    const transform = detail.getScreenCTM();
    const knot = new DOMPoint(467, 452).matrixTransform(transform);
    const endX = knot.x - bounds.left;
    const endY = knot.y - bounds.top;
    const ring = guide.querySelector('.stitch-start');
    ring.setAttribute('cx', x);
    ring.setAttribute('cy', y);
    stitchTrigger.style.left = x + 'px';
    stitchTrigger.style.top = y + 'px';
    stitchEnd.setAttribute('cx', endX);
    stitchEnd.setAttribute('cy', endY);
    const closeup = detail.getBoundingClientRect();
    const inverse = transform.inverse();
    const topLeft = new DOMPoint(closeup.left, closeup.top).matrixTransform(inverse);
    const bottomRight = new DOMPoint(closeup.right, closeup.bottom).matrixTransform(inverse);
    const crop = guide.querySelector('.stitch-crop');
    const cropX = photo.left - bounds.left + photo.width * topLeft.x / 1200;
    const cropY = photo.top - bounds.top + photo.height * topLeft.y / 800;
    const cropWidth = photo.width * (bottomRight.x - topLeft.x) / 1200;
    crop.setAttribute('x', cropX);
    crop.setAttribute('y', cropY);
    crop.setAttribute('width', cropWidth);
    crop.setAttribute('height', photo.height * (bottomRight.y - topLeft.y) / 800);
    const exitX = photo.right - bounds.left + 8;
    const exitY = photo.top - bounds.top - 10;
    stitchPath.setAttribute('d',
      `M ${cropX + cropWidth} ${cropY} L ${exitX} ${exitY} Q ${exitX + 16} ${exitY} ${endX} ${endY}`);
  }
  const studyLayout = new ResizeObserver(connectStitch);
  for (const element of [study, overview, detail]) studyLayout.observe(element);
  document.fonts.ready.then(connectStitch);
  function traceStitch() {
    study.classList.remove('trace-pending');
    for (const target of [stitchPath, detail, stitchEnd]) {
      target.getAnimations().forEach(animation => animation.cancel());
    }
    if (reduced.matches) return;
    stitchPath.animate([{strokeDashoffset:1}, {strokeDashoffset:0}],
      {duration:1050, easing:'ease-in-out'});
    detail.animate([{opacity:0}, {opacity:1}],
      {delay:1050, duration:450, fill:'backwards', easing:'ease-out'});
    stitchEnd.animate([{opacity:0, r:'14px'}, {opacity:1, r:'7px'}],
      {delay:1050, duration:450, fill:'backwards', easing:'ease-out'});
  }
  stitchTrigger.hidden = false;
  if (!reduced.matches) study.classList.add('trace-pending');
  const firstTrace = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.intersectionRatio >= .65)) {
      firstTrace.disconnect();
      traceStitch();
    }
  }, {threshold:.65});
  firstTrace.observe(overview);
  stitchTrigger.addEventListener('click', traceStitch);
  reduced.addEventListener('change', () => {
    if (reduced.matches) traceStitch();
  });
  const headings = all('.prose [tabindex="-1"][id],#examples,#question')
    .filter(heading => chapterLinks.some(link => link.hash === '#' + heading.id) || heading.id === 'question');
  const flow = $('.workflow');
  const sketchTrack = $('.flow-proofs');
  const sketchFigures = all('.flow-proofs figure');
  const mobileSketches = matchMedia('(max-width:650px)');
  function updateSketchProgress() {
    if (!mobileSketches.matches || !sketchTrack.clientWidth) return;
    const left = sketchTrack.getBoundingClientRect().left;
    const active = sketchFigures.reduce((best, item, index) =>
      Math.abs(item.getBoundingClientRect().left - left) < Math.abs(sketchFigures[best].getBoundingClientRect().left - left) ? index : best, 0);
    $('.sketch-current-name').textContent = sketchFigures[active].querySelector('figcaption').textContent;
    $('.sketch-current-count').textContent = (active + 1) + ' / 3';
  }
  function configureSketchTrack() {
    if (mobileSketches.matches) {
      sketchTrack.tabIndex = 0;
      sketchTrack.setAttribute('aria-label', '三种首页草图，可左右滑动或按方向键浏览');
    } else {
      sketchTrack.removeAttribute('tabindex');
      sketchTrack.removeAttribute('aria-label');
      sketchTrack.scrollLeft = 0;
    }
    updateSketchProgress();
  }
  sketchTrack.addEventListener('scroll', updateSketchProgress, {passive:true});
  sketchTrack.addEventListener('keydown', event => {
    if (!mobileSketches.matches || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const distance = sketchFigures[1].offsetLeft - sketchFigures[0].offsetLeft;
    sketchTrack.scrollBy({left:distance * (event.key === 'ArrowRight' ? 1 : -1), behavior:reduced.matches ? 'instant' : 'smooth'});
  });
  mobileSketches.addEventListener('change', configureSketchTrack);
  configureSketchTrack();
  const stepLinks = all('.workflow-nav a');
  const stepPanels = stepLinks.map(link => document.querySelector(link.hash));
  const trial = $('#flow-page');
  const sheet = $('.trial-sheet');
  const trialOpen = $('.trial-open');
  function closeTrial(restoreFocus) {
    sheet.hidden = true;
    trial.classList.remove('sheet-open');
    trialOpen.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trialOpen.focus();
  }
  trialOpen.addEventListener('click', () => {
    sheet.hidden = false;
    trial.classList.add('sheet-open');
    trialOpen.setAttribute('aria-expanded', 'true');
    $('.trial-confirm').hidden = false;
    $('.trial-success').hidden = true;
    $('.trial-close').focus({preventScroll:true});
  });
  $('.trial-close').addEventListener('click', () => closeTrial(true));
  trial.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !sheet.hidden) closeTrial(true);
  });
  $('.trial-confirm').addEventListener('click', () => {
    $('.trial-confirm').hidden = true;
    $('.trial-success').hidden = false;
    $('.trial-close').focus({preventScroll:true});
  });
  $('.trial-droplet').addEventListener('click', event => {
    trial.classList.add('detail-matched');
    event.currentTarget.setAttribute('aria-pressed', 'true');
  });
  function alignDroplets() {
    const stage = $('.trial-stage').getBoundingClientRect();
    if (!stage.width) return;
    const stacked = matchMedia('(max-width:650px)').matches;
    $('.trial-detail').style.paddingTop = stacked ? '0px' : ($('.flow-phone header').getBoundingClientRect().height + 1) + 'px';
    const points = ['.trial-photo', '.trial-enlargement'].map((selector, index) => {
      const box = $(selector).getBoundingClientRect();
      const scale = Math.max(box.width / 370, box.height / 365);
      const x = box.width / 2 + (153 - 185) * scale;
      const y = box.height / 2 + (216 - 182.5) * scale;
      const marker = index ? $('.trial-ring') : $('.trial-droplet');
      marker.style.left = x + 'px';
      marker.style.top = y + 'px';
      return {x:box.left-stage.left+x,y:box.top-stage.top+y};
    });
    const [start, end] = points;
    const path = stacked
      ? 'M '+(start.x-22)+' '+start.y+' H 6 V '+end.y+' H '+(end.x-22)
      : 'M '+(start.x+22)+' '+start.y+' C '+((start.x+end.x)/2)+' '+start.y+' '+((start.x+end.x)/2)+' '+end.y+' '+(end.x-22)+' '+end.y;
    $('.trial-connector path').setAttribute('d', path);
  }
  const trialLayout = new ResizeObserver(alignDroplets);
  for (const selector of ['.trial-photo', '.trial-enlargement']) trialLayout.observe($(selector));
  function showFlowStep(link) {
    for (const [i, item] of stepLinks.entries()) {
      const selected = item === link;
      stepPanels[i].hidden = !selected;
      if (selected) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    }
    closeTrial(false);
  }
  showFlowStep(stepLinks.find(link => link.hash === location.hash) || stepLinks[0]);
  flow.addEventListener('click', event => {
    const target = event.target.closest('a');
    const step = target && stepLinks.find(link => link.hash === target.hash);
    if (!step || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showFlowStep(step);
    step.focus({preventScroll:true});
    const heading = flow.querySelector('h2');
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) + parseFloat(getComputedStyle(heading).scrollMarginTop);
    window.scrollTo({top:window.scrollY + flow.getBoundingClientRect().top - offset,behavior:'instant'});
  });
  const exampleButtons = all('.example-list button');
  const exampleImage = $('.example-frame img');
  let exampleRequest = 0;
  let requestedExample = '';
  let exampleAnimation;
  async function previewExample(button) {
    const source = button.dataset.preview;
    if (requestedExample === source) return;
    requestedExample = source;
    const request = ++exampleRequest;
    for (const item of exampleButtons) {
      item.setAttribute('aria-pressed', String(item === button));
    }
    exampleImage.parentElement.setAttribute('aria-busy', 'true');
    const incoming = new Image();
    incoming.src = source;
    try {
      await incoming.decode();
      if (request !== exampleRequest) return;
      exampleAnimation?.cancel();
      exampleImage.src = source;
      exampleImage.alt = button.textContent + '预览';
      exampleImage.style.visibility = 'visible';
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        exampleAnimation = exampleImage.animate(
          [{opacity:0, transform:'translateY(8px)'}, {opacity:1, transform:'translateY(0)'}],
          {duration:480, easing:'cubic-bezier(.22,.68,.3,1)'}
        );
      }
    } catch {
      if (request === exampleRequest) requestedExample = '';
    } finally {
      if (request === exampleRequest) exampleImage.parentElement.removeAttribute('aria-busy');
    }
  }
  const exampleObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    if (!requestedExample) previewExample(exampleButtons.find(button => button.getAttribute('aria-pressed') === 'true'));
    exampleObserver.disconnect();
  }, {threshold:0.15});
  exampleObserver.observe(exampleImage.parentElement);
  for (const button of exampleButtons) {
    button.addEventListener('click', () => previewExample(button));
    button.addEventListener('focus', () => previewExample(button));
    button.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') previewExample(button);
    });
  }
  const exampleViewer = $('.example-viewer');
  const viewerImage = $('.example-viewer-scroll img');
  const viewerScroll = $('.example-viewer-scroll');
  let viewerScale = 1;
  function setViewerScale(scale) {
    viewerScale = Math.max(1, Math.min(3, scale));
    viewerImage.style.setProperty('--viewer-width', `${viewerScale * 100}%`);
    $('.example-zoom-out').disabled = viewerScale === 1;
    $('.example-zoom-in').disabled = viewerScale === 3;
  }
  $('.example-enlarge').addEventListener('click', () => {
    viewerImage.src = exampleImage.src;
    viewerImage.alt = exampleImage.alt;
    $('.example-viewer-title').textContent = exampleImage.alt;
    setViewerScale(1);
    viewerScroll.scrollTop = 0;
    viewerScroll.scrollLeft = 0;
    exampleViewer.showModal();
    $('.example-close').focus();
  });
  $('.example-close').addEventListener('click', () => exampleViewer.close());
  $('.example-zoom-in').addEventListener('click', () => setViewerScale(viewerScale + 0.5));
  $('.example-zoom-out').addEventListener('click', () => setViewerScale(viewerScale - 0.5));
  const compact = $('.compact-rail details');
  const compactSummary = compact.querySelector('summary');
  function closeMenu(restoreFocus) {
    if (!compact.open) return;
    compact.open = false;
    if (restoreFocus) compactSummary.focus();
  }
  document.addEventListener('click', e => {
    if (!compact.contains(e.target) || e.target.closest('a[href^="#"]')) closeMenu(false);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(true); });
  const mast = $('.mast');
  const workshop = $('.eras-workshop');
  const workshopText = $('.eras-copy');
  const passages = all('.eras-copy [data-step]');
  const caption = workshop.querySelector('figcaption');
  const choice = workshop.querySelector('.choice');
  const detailButtons = [...choice.querySelectorAll('button')];
  const sceneNotes = [
    caption.textContent,
    '当课程页面看得多了，一个具体的手势比一排相似的介绍更容易被记住。',
      '准备报名时，先看周六的场次和还剩几个位置。',
    '想了解手艺时，视线靠近刻刀碰到陶土的地方。',
      '你先注意到刻线，还是成品上的釉光？选一处细看。'
  ];
  const detailNotes = {
    hand: '刀尖划过湿陶土，槽口一侧留下了一道细细的凸边。',
    glaze: '右侧的深红陶罐已经烧成，窗光落在罐肩上，衬出釉面的光泽。'
  };
  function syncWorkshop() {
    const bounds = workshopText.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > innerHeight) return;
    const readingLine = innerHeight * (innerWidth <= 600 ? .72 : .36);
    const passage = passages.findLast(el => el.getBoundingClientRect().top <= readingLine);
    const step = passage?.dataset.step || '0';
    if (workshop.dataset.step === step) return;
    workshop.dataset.step = step;
    passages.forEach(el => el.classList.toggle('is-reading', el === passage));
    caption.textContent = detailNotes[workshop.dataset.focus] || sceneNotes[step];
  }
  choice.hidden = false;
  for (const button of detailButtons) {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      workshop.dataset.focus = button.dataset.focus;
      caption.textContent = detailNotes[button.dataset.focus];
      detailButtons.forEach(option => option.setAttribute('aria-pressed', String(option === button)));
    });
  }
  document.fonts.ready.then(syncWorkshop);
  let scrollQueued = false;
  function markPosition() {
    scrollQueued = false;
    syncWorkshop();
    mast.classList.toggle('at-top', window.scrollY <= 1);
    const threshold = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) + 6;
    const passed = headings.filter(h => h.getBoundingClientRect().top <= threshold + parseFloat(getComputedStyle(h).scrollMarginTop));
    const id = passed.at(-1)?.id;
    const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3;
    const active = atEnd ? 'question' : id;
    const headerSection = active === 'examples' ? '#examples' :
      active && active !== 'question' ? '#article' : active === 'question' ? '' : '#top';
    for (const link of headerLinks) {
      if (link.hash === headerSection) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    for (const link of chapterLinks) {
      if (link.hash === '#' + active) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    }

  }
  function queuePosition() {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(markPosition); }
  }
  addEventListener('scroll', queuePosition, {passive:true});
  addEventListener('resize', queuePosition);
  addEventListener('hashchange', queuePosition);
  markPosition();
})();
