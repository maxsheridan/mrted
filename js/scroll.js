let items = document.querySelectorAll(".section");
let page = document.querySelector(".page");
let currentPos = 0;
let isVertical = window.innerWidth < 768;
let isTouching = false;
let startTouchPos = 0;
let startPos = 0;
let touchVelocity = 0;
let lastTouchPos = 0;
let isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;

function init() {
  isVertical = window.innerWidth < 768;
  isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
  let totalSize = Array.from(items).reduce((acc, item) => acc + (isVertical ? item.offsetHeight : item.offsetWidth), 0);

  if (isMobile) {
    page.style.width = '100%';
    page.style.height = '100%';
    page.style.overflow = 'auto';
    page.style.transform = 'none';
    document.body.style.overflow = 'auto';
    page.style['-webkit-overflow-scrolling'] = 'touch';
  } else {
    page.style.width = isVertical ? '100%' : `${totalSize}px`;
    page.style.height = isVertical ? `${totalSize}px` : '100%';
    page.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    page.style['-webkit-overflow-scrolling'] = 'auto';
    updateScroll();
  }
}

function updateScroll() {
  if (isMobile) return;
  let maxPos = isVertical ? page.scrollHeight - window.innerHeight : page.scrollWidth - window.innerWidth;
  currentPos = Math.max(0, Math.min(currentPos, maxPos));
  page.style.transform = isVertical ? `translateY(${-currentPos}px)` : `translateX(${-currentPos}px)`;
}

function handleScroll(event) {
  if (isMobile) return;
  currentPos += isVertical ? event.deltaY * 2 : (event.deltaY + event.deltaX) * 2;
  updateScroll();
  event.preventDefault();
}

function handleTouchStart(event) {
  if (isMobile) return;
  isTouching = true;
  startTouchPos = isVertical ? event.touches[0].clientY : event.touches[0].clientX;
  startPos = currentPos;
  touchVelocity = 0;
  lastTouchPos = startTouchPos;
}

function handleTouchMove(event) {
  if (isMobile) return;
  if (!isTouching) return;
  let currentTouchPos = isVertical ? event.touches[0].clientY : event.touches[0].clientX;
  let delta = startTouchPos - currentTouchPos;
  currentPos = startPos + delta * 2;
  touchVelocity = (lastTouchPos - currentTouchPos) * 2;
  lastTouchPos = currentTouchPos;
  requestAnimationFrame(updateScroll);
  event.preventDefault();
}

function handleTouchEnd() {
  if (isMobile) return;
  isTouching = false;
}

function animate() {
  if (isMobile) return;
  if (!isTouching) {
    currentPos += touchVelocity;
    touchVelocity *= 0.95; // Damping factor to simulate friction
    if (Math.abs(touchVelocity) < 0.1) touchVelocity = 0;
    updateScroll();
  }
  requestAnimationFrame(animate);
}

function handleResize() {
  init();
}

function handleVisibilityChange() {
  if (!document.hidden) {
    init();
    requestAnimationFrame(animate);
  }
}

function handleOrientationChange() {
  setTimeout(() => {
    currentPos = 0;
    init();
    requestAnimationFrame(animate);
  }, 500); // Delay to ensure layout is settled
}

window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleOrientationChange);
document.addEventListener('wheel', handleScroll, { passive: false });
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd, { passive: false });
document.addEventListener('visibilitychange', handleVisibilityChange);

window.onload = function() {
  init();
  requestAnimationFrame(animate);
};