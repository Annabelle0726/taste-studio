(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const flow = $('.method-workflow');
  if (!flow) return;

  // A single selection drives the label, accessible panel and onward action.
  const tabs = all('.method-tab');
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  const tablist = $('.method-tabs');
  const stage = $('.method-stage');
  const previous = $('.method-prev');
  const next = $('.method-next');
  const count = $('.method-count');
  let currentStep = -1;
  let transitionRevision = 0;
  const panelAnimations = new Map();
  function motionParts(panel) {
    // Animate the changing material and copy, never the panel/window shell or selectors.
    const pictures = [...panel.querySelectorAll('.brief-visual,.concept-card,.detail-original,.detail-crop,.trial-window > img,.review-flower-photo')];
    const copy = [...panel.querySelectorAll('.brief-copy,.sketch-layout > .method-caption,.detail-copy > :not(.detail-crop),.trial-window-copy,.trial-pickup:not([hidden]),.trial-explanation,.review-window-copy,.review-result-note,.review-copy')];
    return [...pictures, ...copy].map(element => ({element}));
  }
  function stopPanelMotion(capture = false) {
    const presentation = new Map();
    for (const [element, animation] of panelAnimations) {
      if (capture) {
        const style = getComputedStyle(element);
        presentation.set(element, {opacity:style.opacity, transform:style.transform});
      }
      animation.cancel();
    }
    panelAnimations.clear();
    panels.forEach(panel => panel.classList.remove('is-leaving'));
    return presentation;
  }
  function releaseAnimation(element, animation) {
    if (panelAnimations.get(element) !== animation) return;
    panelAnimations.delete(element);
    animation.cancel();
  }
  function animateParts(outgoing, incoming, presentation, revision) {
    // The frame never travels. Only one inert outgoing view may remain painted.
    outgoing.classList.add('is-leaving');
    const exits = motionParts(outgoing).map(({element}) => {
      const from = presentation.get(element) ?? {opacity:'1', transform:'none'};
      const animation = element.animate([from, {...from, opacity:0}], {duration:100, easing:'ease-out', fill:'both'});
      panelAnimations.set(element, animation);
      return {element, animation};
    });
    Promise.all(exits.map(({animation}) => animation.finished)).then(() => {
      if (revision !== transitionRevision) return;
      outgoing.classList.remove('is-leaving');
      exits.forEach(({element, animation}) => releaseAnimation(element, animation));
    }).catch(() => {}); // A newer intent cancels this transition.
    for (const {element} of motionParts(incoming)) {
      const interrupted = presentation.get(element);
      const from = {opacity:interrupted?.opacity ?? 0};
      const to = {opacity:1};
      const animation = element.animate([from, to], {
        duration:200,
        easing:'cubic-bezier(.2,.7,.25,1)', fill:'both'
      });
      panelAnimations.set(element, animation);
      animation.finished.then(() => releaseAnimation(element, animation)).catch(() => {});
    }
  }
  function revealTab() {
    const tab = tabs[currentStep];
    const start = tab.offsetLeft;
    const end = start + tab.offsetWidth;
    if (start < tablist.scrollLeft || end > tablist.scrollLeft + tablist.clientWidth) {
      tablist.scrollTo({left:Math.max(0, start - (tablist.clientWidth - tab.offsetWidth) / 2), behavior:reduced.matches ? 'instant' : 'smooth'});
    }
  }
  function goToSection(id) {
    if (window.tasteNavigation) { window.tasteNavigation.go(id); return; }
    const heading = document.getElementById(id);
    if (!heading) return;
    history.pushState(null, '', '#' + id);
    heading.focus({preventScroll:true});
    heading.scrollIntoView({block:'start', behavior:reduced.matches ? 'instant' : 'smooth'});
  }
  function selectStep(index, {focus = false, follow = false, updateHash = true} = {}) {
    if (index < 0 || index >= tabs.length) return;
    if (index === currentStep) {
      if (focus) tabs[index].focus({preventScroll:true});
      return;
    }
    const outgoing = panels[currentStep];
    const compactRail = $('.compact-rail');
    const stickyEdge = Math.max(
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head')),
      getComputedStyle(compactRail).display !== 'none' ? compactRail.getBoundingClientRect().bottom : 0
    );
    const followOnPhone = follow && matchMedia('(max-width: 850px)').matches && stage.getBoundingClientRect().top < stickyEdge;
    const revision = ++transitionRevision;
    const presentation = stopPanelMotion(true);
    currentStep = index;
    for (const [i, panel] of panels.entries()) {
      const active = i === index;
      panel.classList.toggle('is-active', active);
      panel.inert = !active;
      panel.setAttribute('aria-hidden', String(!active));
      tabs[i].setAttribute('aria-selected', String(active));
      tabs[i].tabIndex = active ? 0 : -1;
    }
    previous.disabled = index === 0;
    next.textContent = index === tabs.length - 1 ? '继续：怎样设计页面 →' : '继续：' + tabs[index + 1].textContent.trim() + ' →';
    count.textContent = String(index + 1).padStart(2, '0') + ' / 05 · ' + tabs[index].textContent.trim();
    tabs[index].classList.add('is-visited');
    if (focus) tabs[index].focus({preventScroll:true});
    revealTab();
    if (updateHash) history.replaceState(null, '', '#flow-' + tabs[index].dataset.step);
    if (outgoing && !reduced.matches && !followOnPhone && typeof stage.animate === 'function') {
      animateParts(outgoing, panels[index], presentation, revision);
    }
    // A phone reader may be below the next panel's start. Use the shared section journey,
    // without simultaneously moving/fading content. Desktop next/previous never scroll.
    if (followOnPhone) {
      if (window.tasteNavigation) window.tasteNavigation.go('workflow', {updateHash:false, focus:false});
      else document.getElementById('workflow').scrollIntoView({block:'start', behavior:reduced.matches ? 'instant' : 'smooth'});
    }
    if (previous.disabled && document.activeElement === previous) next.focus({preventScroll:true});
  }
  tabs.forEach((tab, index) => tab.addEventListener('click', () => selectStep(index)));
  tablist.addEventListener('keydown', event => {
    let index = currentStep;
    if (event.key === 'ArrowRight') index = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') index = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = tabs.length - 1;
    else return;
    event.preventDefault();
    selectStep(index, {focus:true});
  });
  previous.addEventListener('click', () => selectStep(currentStep - 1, {follow:true}));
  next.addEventListener('click', () => {
    if (currentStep === tabs.length - 1) goToSection('studio');
    else selectStep(currentStep + 1, {follow:true});
  });
  function restoreStep() {
    const index = panels.findIndex(panel => '#' + panel.id === location.hash);
    if (index >= 0) selectStep(index, {updateHash:false});
  }
  selectStep(Math.max(0, panels.findIndex(panel => '#' + panel.id === location.hash)), {updateHash:false});
  window.addEventListener('hashchange', restoreStep);
  window.addEventListener('popstate', restoreStep);


  const reviewScreen = $('#review-screen');
  const reviewModes = all('[data-review-state]');
  reviewModes.forEach(button => button.addEventListener('click', () => {
    const fixed = button.dataset.reviewState === 'fixed';
    reviewScreen.dataset.reviewResult = fixed ? 'fixed' : 'issue';
    reviewModes.forEach(mode => mode.setAttribute('aria-pressed', String(mode === button)));
    $('[data-review-label]').textContent = fixed ? '03 介绍也同步了' : '03 介绍还停在上一束';
    $('[data-review-description]').textContent = fixed ? '细小的花聚成一团，奶白与浅绿，清透又安静。' : '层层红色花瓣，带着清晨的水珠。';
    $('.review-result-note').textContent = fixed ? '按相同步骤再试：图片、花名、介绍一致。' : '图和花名换了，介绍却没跟上。';
  }));

  const track = $('.concept-track');
  track.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || track.scrollWidth <= track.clientWidth) return;
    event.preventDefault();
    const cards = [...track.querySelectorAll('.concept-card')];
    const distance = cards[1].offsetLeft - cards[0].offsetLeft;
    track.scrollBy({left:distance * (event.key === 'ArrowRight' ? 1 : -1), behavior:reduced.matches ? 'instant' : 'smooth'});
  });
  const trialOpen = $('[data-trial-open]');
  const trialPickup = $('#trial-pickup');
  function setTrial(open) {
    trialPickup.hidden = !open;
    trialOpen.setAttribute('aria-expanded', String(open));
  }
  trialOpen.addEventListener('click', () => setTrial(trialPickup.hidden));
  $('[data-trial-close]').addEventListener('click', () => {
    setTrial(false);
    trialOpen.focus({preventScroll:true});
  });

  // Demonstration records, not a real store inventory.
  const flowers = {
    red:{name:'红色洋牡丹', description:'层层花瓣，带着清晨的水珠。', source:'assets/workflow-detail.webp'},
    white:{name:'奶白绣球', description:'细小的花聚成一团，奶白与浅绿，清透又安静。', source:'assets/florist-bouquets.webp'},
    purple:{name:'淡紫郁金香', description:'轻盈的花苞沿枝条展开，淡紫与绿叶相映。', source:'assets/florist-bouquets.webp'}
  };
  const shops = all('.shop-demo');
  const choices = all('[data-flower-choice]');
  const feedback = $('.shop-feedback');
  const mainShop = $('.shop-main');
  const assets = new Map();
  let selectedFlower = 'red';
  let request = 0;
  function readyImage(source) {
    if (!assets.has(source)) {
      const photo = new Image();
      photo.src = source;
      const ready = photo.decode().catch(error => { assets.delete(source); throw error; });
      assets.set(source, ready);
    }
    return assets.get(source);
  }
  function commitFlower(id) {
    selectedFlower = id;
    const flower = flowers[id];
    shops.forEach(shop => {
      shop.dataset.selectedFlower = id;
      shop.querySelector('[data-flower-name]').textContent = flower.name;
      shop.querySelector('[data-flower-description]').textContent = flower.description;
      shop.querySelectorAll('[data-flower]').forEach(layer => {
        const active = layer.dataset.flower === id;
        layer.classList.toggle('is-current', active);
        layer.setAttribute('aria-hidden', String(!active));
      });
    });
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.flowerChoice === id)));
    $('[data-current-name]').textContent = flower.name;
    $('[data-current-description]').textContent = flower.description;
    feedback.textContent = '当前选择：' + flower.name;
  }
  async function selectFlower(id) {
    if (!flowers[id]) return;
    const ticket = ++request;
    if (id === selectedFlower) {
      mainShop.removeAttribute('aria-busy');
      feedback.textContent = '当前选择：' + flowers[id].name;
      return;
    }
    mainShop.setAttribute('aria-busy', 'true');
    feedback.textContent = '正在准备' + flowers[id].name + '…';
    try {
      await readyImage(flowers[id].source);
      if (ticket !== request) return;
      commitFlower(id);
    } catch {
      if (ticket === request) feedback.textContent = '图片暂未加载，已保留' + flowers[selectedFlower].name + '。点花束可重试。';
    } finally {
      if (ticket === request) mainShop.removeAttribute('aria-busy');
    }
  }
  choices.forEach(button => button.addEventListener('click', () => selectFlower(button.dataset.flowerChoice)));
  const explanations = {
    image:'图片：留下花瓣的质感与水珠；换花时，主图随选择更新。',
    text:'文字：花名与介绍独立排版，在手机上也能清楚阅读。',
    action:'按钮：取花入口是真实控件，点击后显示当前花束的信息。',
    layout:'布局：桌面图文并排，到了手机上按阅读顺序上下排列。'
  };
  const elementButtons = all('[data-element]');
  const ring = mainShop.querySelector('.ink-loop');
  const inkTargets = {
    image: mainShop.querySelector('.shop-photo'),
    text: mainShop.querySelector('.flower-text'),
    action: mainShop.querySelector('[data-open-pickup]'),
    layout: mainShop.querySelector('.shop-content')
  };
  function placeInk() {
    const target = inkTargets[mainShop.dataset.highlight];
    if (!target) return;
    const box = target.getBoundingClientRect();
    const page = mainShop.getBoundingClientRect();
    const pad = 8;
    const w = box.width + 2 * pad;
    const h = box.height + 2 * pad;
    Object.assign(ring.style, {left: (box.left-page.left-mainShop.clientLeft-pad)+'px', top: (box.top-page.top-mainShop.clientTop-pad)+'px', width:w+'px', height:h+'px'});
    ring.setAttribute('viewBox', '0 0 '+w+' '+h);
    // A loose pen stroke with a short overlap at the upper-left shoulder.
    const x = Math.min(26, w*.12), y = Math.min(14,h*.19);
    ring.firstElementChild.setAttribute('d', `M ${x+12} 3 Q ${w*.48} -1 ${w-x} 4 Q ${w-1} 5 ${w-2} ${y+3} C ${w+1} ${h*.47} ${w-2} ${h*.84} ${w-7} ${h-y*.55} Q ${w-12} ${h-1} ${w-x-4} ${h-2} Q ${w*.46} ${h+1} ${x} ${h-3} Q 2 ${h-4} 3 ${h-y} Q -1 ${h*.43} 4 ${y} Q 6 2 ${x+21} 2`);
  }
  function markElement(key) {
    mainShop.dataset.highlight = key;
    elementButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.element === key)));
    $('.element-explanation').textContent = explanations[key];
    placeInk();
  }
  elementButtons.forEach(button => button.addEventListener('click', () => markElement(button.dataset.element)));
  const inkResize = new ResizeObserver(placeInk);
  [mainShop, ...Object.values(inkTargets)].forEach(node => inkResize.observe(node));
  markElement('image');

  const dialog = $('.pickup-dialog');
  let dialogTrigger;
  let closeTimer;
  all('[data-open-pickup]').forEach(button => button.addEventListener('click', () => {
    clearTimeout(closeTimer);
    dialogTrigger = button;
    dialog.classList.remove('is-closing');
    if (!dialog.open) dialog.showModal();
    requestAnimationFrame(() => dialog.classList.add('is-open'));
  }));
  function closePickup() {
    if (!dialog.open) return;
    clearTimeout(closeTimer);
    dialog.classList.remove('is-open');
    dialog.classList.add('is-closing');
    function finish() {
      dialog.close();
      dialog.classList.remove('is-closing');
      dialogTrigger?.focus({preventScroll:true});
    }
    if (reduced.matches) finish();
    else {
      const style = getComputedStyle(dialog);
      const milliseconds = value => parseFloat(value) * (value.trim().endsWith('ms') ? 1 : 1000);
      const durations = style.transitionDuration.split(',').map(milliseconds);
      const delays = style.transitionDelay.split(',').map(milliseconds);
      const duration = Math.max(...durations.map((value, i) => value + delays[i % delays.length]));
      closeTimer = setTimeout(finish, duration);
    }
  }
  $('.dialog-close').addEventListener('click', closePickup);
  $('[data-close-pickup]').addEventListener('click', closePickup);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closePickup(); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closePickup();
  });
  reduced.addEventListener('change', () => { ++transitionRevision; stopPanelMotion(); });
  // Preserve links to the former chapters, now folded into the original three.
  if (location.hash === '#implementation') goToSection('studio');
  if (location.hash === '#review') {
    selectStep(4);
    document.getElementById('workflow').scrollIntoView({block:'start', behavior:'instant'});
  }
})();
