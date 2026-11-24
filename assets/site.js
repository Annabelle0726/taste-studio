(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  // A small, one-time entrance for each visible part; controls are usable throughout.
  const homeEntrances = new Set();
  const homeParts = new Map([
    ...all('.hero-copy h1 > span').map((node, i) => [node, {delay:i * 35, rise:4}]),
    ...all('.hero-copy > p').map(node => [node, {delay:65, rise:0}]),
    ...all('.feature-links a').map((node, i) => [node, {delay:80 + i * 20, rise:0}]),
    ...all('.landing .slides,.landing .silk,.landing .opening-copy').map(node => [node, {delay:30, rise:0}])
  ]);
  let homeObserver;
  function settleHome() {
    homeEntrances.forEach(animation => animation.cancel());
    homeEntrances.clear();
  }
  if (!reduced.matches && 'IntersectionObserver' in window) {
    homeObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const node = entry.target;
        homeObserver.unobserve(node);
        if (reduced.matches || navigationTarget || typeof node.animate !== 'function') continue;
        const {delay, rise} = homeParts.get(node);
        const opacity = parseFloat(getComputedStyle(node).opacity);
        const from = {opacity:opacity * .72};
        const to = {opacity};
        if (rise) { from.transform = `translateY(${rise}px)`; to.transform = 'none'; }
        const animation = node.animate([from, to], {
          duration:260, delay, easing:'cubic-bezier(.2,.7,.25,1)', fill:'backwards'
        });
        homeEntrances.add(animation);
        animation.finished.then(() => homeEntrances.delete(animation)).catch(() => {});
      }
    }, {threshold:0});
    homeParts.forEach((_, node) => homeObserver.observe(node));
  }
  reduced.addEventListener('change', () => {
    if (reduced.matches) { homeObserver?.disconnect(); settleHome(); }
  });
  document.querySelector('.landing')?.addEventListener('pointerdown', settleHome, {passive:true});
  document.addEventListener('keydown', settleHome);
  addEventListener('pagehide', settleHome);
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
    .filter(heading => chapterLinks.some(link => link.hash === '#' + heading.id) || heading.id === 'examples' || heading.id === 'question');
  const exampleButtons = all('.example-list button');
  let exampleImage = $('.example-frame img');
  let exampleRequest = 0;
  let requestedExample = '';
  const exampleFrame = exampleImage.parentElement;
  const exampleStatus = document.createElement('p');
  exampleStatus.className = 'example-status';
  exampleStatus.setAttribute('role', 'status');
  exampleFrame.after(exampleStatus);
  const exampleAssets = new Map();
  const exampleLayers = new Map();
  let displayedExample = null;
  function loadExample(source) {
    if (!exampleAssets.has(source)) {
      const image = new Image();
      image.src = source;
      exampleAssets.set(source, image.decode().catch(error => {
        exampleAssets.delete(source);
        throw error;
      }));
    }
    return exampleAssets.get(source);
  }
  async function previewExample(button) {
    const source = button.dataset.preview;
    if (requestedExample === source) return;
    requestedExample = source;
    const request = ++exampleRequest;
    exampleFrame.setAttribute('aria-busy', 'true');
    exampleButtons.forEach(item => item.classList.toggle('is-pending', item === button));
    exampleStatus.textContent = '正在准备' + button.textContent.trim() + '…';
    try {
      await loadExample(source);
      if (request !== exampleRequest) return;
      // Retarget persistent image layers from their currently rendered opacity.
      // Four choices bound the layer count; rapid reversal never resets a fade.
      let layer = exampleLayers.get(source);
      if (!layer) {
        layer = exampleLayers.size ? exampleImage.cloneNode() : exampleImage;
        layer.className = '';
        layer.src = source;
        layer.style.visibility = 'visible';
        layer.alt = '';
        layer.setAttribute('aria-hidden', 'true');
        if (exampleLayers.size) exampleFrame.append(layer);
        exampleLayers.set(source, layer);
        layer.getBoundingClientRect(); // Establish opacity:0 before the first transition.
      }
      exampleImage = layer;
      displayedExample = button;
      for (const [key, image] of exampleLayers) {
        const active = key === source;
        image.classList.toggle('is-current', active);
        image.setAttribute('aria-hidden', String(!active));
        image.alt = active ? button.textContent.trim() + '预览' : '';
      }
      exampleButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      exampleStatus.textContent = '当前案例：' + button.textContent.trim();

    } catch {
      if (request === exampleRequest) {
        requestedExample = '';
        exampleStatus.textContent = '图片暂未载入，已保留当前案例。再次点击该案例重试。';
      }
    } finally {
      if (request === exampleRequest) {
        exampleFrame.removeAttribute('aria-busy');
        exampleButtons.forEach(item => item.classList.remove('is-pending'));
      }
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
    button.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') loadExample(button.dataset.preview).catch(() => {});
    });
  }
  $('.example-list').addEventListener('keydown', event => {
    const index = exampleButtons.indexOf(document.activeElement);
    if (index < 0) return;
    let selected = index;
    if (event.key === 'ArrowRight') selected = (index + 1) % exampleButtons.length;
    else if (event.key === 'ArrowLeft') selected = (index + exampleButtons.length - 1) % exampleButtons.length;
    else if (event.key === 'Home') selected = 0;
    else if (event.key === 'End') selected = exampleButtons.length - 1;
    else return;
    event.preventDefault();
    exampleButtons[selected].focus({preventScroll:true});
    previewExample(exampleButtons[selected]);
  });
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
    if (!displayedExample) return;
    exampleViewer.showModal();
    viewerScroll.scrollTop = 0;
    viewerScroll.scrollLeft = 0;
    if (!reduced.matches) exampleViewer.animate([{opacity:0}, {opacity:1}], {duration:200, easing:'ease-out'});
    $('.example-close').focus({preventScroll:true});
  });
  $('.example-close').addEventListener('click', () => exampleViewer.close());
  exampleViewer.addEventListener('close', () => $('.example-enlarge').focus({preventScroll:true}));
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
  // Every chapter uses one continuous, interruptible journey; no distance-based teleport.
  let navigationTarget = null;
  let navigationFrame = 0;
  let arrivalTarget = null;
  let arrivalTimer = 0;
  function clearArrival() {
    clearTimeout(arrivalTimer);
    arrivalTarget?.classList.remove('nav-arrival');
    arrivalTarget = null;
  }
  function showArrival(target) {
    clearArrival();
    if (reduced.matches || !target.matches('h1,h2')) return;
    arrivalTarget = target;
    target.classList.add('nav-arrival');
    arrivalTimer = setTimeout(clearArrival, 850);
  }
  function cancelNavigation() {
    clearArrival();
    cancelAnimationFrame(navigationFrame);
    navigationFrame = 0;
    navigationTarget = null;
    queuePosition();
  }
  function navigateTo(id, {updateHash = true, focus = true} = {}) {
    const target = document.getElementById(id);
    if (!target) return;
    cancelNavigation();
    settleHome();
    closeMenu(false);
    const style = getComputedStyle(target);
    const inset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const margin = parseFloat(style.scrollMarginTop) || 0;
    const start = scrollY;
    const destination = Math.max(0, Math.min(start + target.getBoundingClientRect().top - inset - margin,
      document.documentElement.scrollHeight - innerHeight));
    const distance = destination - start;
    if (updateHash && location.hash !== '#' + id) history.pushState(null, '', '#' + id);
    function arrive() {
      navigationFrame = 0;
      navigationTarget = null;
      if (focus) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({preventScroll:true});
      }
      showArrival(target);
      queuePosition();
    }
    navigationTarget = id;
    markPosition();
    if (reduced.matches || Math.abs(distance) < 1) {
      window.scrollTo({top:destination, behavior:'instant'});
      arrive();
      return;
    }
    const began = performance.now();
    const screens = Math.abs(distance) / Math.max(1, innerHeight);
    const duration = Math.min(1600, 380 + 260 * Math.sqrt(screens));
    function move(now) {
      const t = Math.min(1, (now - began) / duration);
      // Zero speed and acceleration at both ends avoids a shove at the start or stop.
      const progress = t * t * t * (10 + t * (-15 + 6 * t));
      window.scrollTo({top:start + distance * progress, behavior:'instant'});
      if (t < 1) navigationFrame = requestAnimationFrame(move);
      else arrive();
    }
    navigationFrame = requestAnimationFrame(move);
  }
  window.tasteNavigation = {go:navigateTo};
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || link.target) return;
    const id = link.hash.slice(1);
    if (!document.getElementById(id)) return;
    // Case links use the native anchor: history, focus and scrolling also work without our animation loop.
    if (id === 'examples') {
      cancelNavigation();
      closeMenu(false);
      return;
    }
    event.preventDefault();
    navigateTo(id);
  });
  for (const type of ['wheel', 'touchstart', 'pointerdown']) addEventListener(type, cancelNavigation, {passive:true});
  addEventListener('keydown', event => {
    if (['ArrowUp','ArrowDown','PageUp','PageDown','Home','End','Escape','Tab',' '].includes(event.key)) cancelNavigation();
  });
  addEventListener('popstate', cancelNavigation);
  addEventListener('resize', cancelNavigation);
  reduced.addEventListener('change', () => {
    const id = navigationTarget;
    if (reduced.matches && id) navigateTo(id, {updateHash:false, focus:false});
    else cancelNavigation();
  });
  let scrollQueued = false;
  const chapterNavs = [$('.rail nav'), compact.querySelector('nav')];
  function updateDirectory(id) {
    const hash = '#' + id;
    for (const nav of chapterNavs) {
      const link = chapterLinks.find(item => item.hash === hash && nav.contains(item));
      const last = nav.querySelector('[aria-current]');
      if (last !== link) {
        last?.removeAttribute('aria-current');
        link?.setAttribute('aria-current', 'location');
      }
      nav.toggleAttribute('data-marked', !!link);
      if (link && nav.clientHeight) {
        const y = link.getBoundingClientRect().top - nav.getBoundingClientRect().top - nav.clientTop + nav.scrollTop + (link.offsetHeight - 14) / 2;
        nav.style.setProperty('--marker-y', y + 'px');
      }
    }
    const label = (chapterNavs[0].querySelector('[aria-current]') || chapterLinks[0]).textContent.trim();
    if (compactSummary.textContent !== label) compactSummary.textContent = label;
  }
  compact.addEventListener('toggle', queuePosition);
  document.fonts.ready.then(queuePosition);

  function markPosition() {
    scrollQueued = false;
    syncWorkshop();
    mast.classList.toggle('at-top', window.scrollY <= 1);
    const threshold = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) + 6;
    const passed = headings.filter(h => h.getBoundingClientRect().top <= threshold + parseFloat(getComputedStyle(h).scrollMarginTop));
    const id = passed.at(-1)?.id;
    const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3;
    const active = navigationTarget || (atEnd ? 'question' : id);
    const headerSection = active === 'top' ? '#top' : active === 'examples' ? '#examples' :
      ['workflow','studio','preferences'].includes(active) || active?.startsWith('flow-') ? '#workflow' :
      active && active !== 'question' ? '#article' : active === 'question' ? '' : '#top';
    for (const link of headerLinks) {
      if (link.hash === headerSection) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    updateDirectory(active?.startsWith('flow-') ? 'workflow' : active);

  }
  function queuePosition() {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(markPosition); }
  }
  addEventListener('scroll', queuePosition, {passive:true});
  addEventListener('resize', queuePosition);
  addEventListener('hashchange', queuePosition);
  markPosition();
})();
