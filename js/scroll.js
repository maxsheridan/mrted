let items, page, currentPos = 0,
    isVertical = window.innerWidth < 1024,
    isTouching = !1,
    startTouchPos = 0,
    startPos = 0,
    touchVelocity = 0,
    lastTouchPos = 0,
    isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 1024;

function init() {
    if (items = document.querySelectorAll("section"), // Updated selector
        page = document.querySelector(".acme-all-purpose-wrapper"), // Updated selector
        isVertical = window.innerWidth < 1024,
        isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 1024,
        items.length) {
        let e = Array.from(items).reduce(((e, t) => e + (isVertical ? t.offsetHeight : t.offsetWidth)), 0);
        isMobile ? (page.style.width = "100%",
            page.style.height = "100%",
            page.style.overflow = "auto",
            page.style.transform = "none",
            document.body.style.overflow = "auto",
            page.style["-webkit-overflow-scrolling"] = "touch") : (page.style.width = isVertical ? "100%" : `${e}px`,
            page.style.height = isVertical ? `${e}px` : "100%",
            page.style.overflow = "hidden",
            document.body.style.overflow = "hidden",
            page.style["-webkit-overflow-scrolling"] = "auto",
            currentPos = 0,
            updateScroll())
    } else page.style.width = "100%",
        page.style.height = "100%",
        page.style.overflow = "auto",
        page.style.transform = "none",
        document.body.style.overflow = "auto"
}

function updateScroll() {
    if (isMobile) return;
    let e = isVertical ? page.scrollHeight - window.innerHeight : page.scrollWidth - window.innerWidth;
    currentPos = Math.max(0, Math.min(currentPos, e)),
        page.style.transform = isVertical ? `translateY(${-currentPos}px)` : `translateX(${-currentPos}px)`
}

function handleScroll(e) {
    isMobile || (currentPos += isVertical ? 2 * e.deltaY : 2 * (e.deltaY + e.deltaX),
        updateScroll(),
        e.preventDefault())
}

function handleTouchStart(e) {
    isMobile || (isTouching = !0,
        startTouchPos = isVertical ? e.touches[0].clientY : e.touches[0].clientX,
        startPos = currentPos,
        touchVelocity = 0,
        lastTouchPos = startTouchPos)
}

function handleTouchMove(e) {
    if (isMobile) return;
    if (!isTouching) return;
    let t = isVertical ? e.touches[0].clientY : e.touches[0].clientX;
    currentPos = startPos + 2 * (startTouchPos - t),
        touchVelocity = 2 * (lastTouchPos - t),
        lastTouchPos = t,
        requestAnimationFrame(updateScroll),
        e.preventDefault()
}

function handleTouchEnd() {
    isMobile || (isTouching = !1)
}

function animate() {
    isMobile || (isTouching || (currentPos += touchVelocity,
        touchVelocity *= .95,
        Math.abs(touchVelocity) < .1 && (touchVelocity = 0),
        updateScroll()),
        requestAnimationFrame(animate))
}

function handleResize() {
    init()
}

function handleVisibilityChange() {
    document.hidden || (init(), requestAnimationFrame(animate))
}

function handleOrientationChange() {
    setTimeout((() => {
        currentPos = 0,
            init(),
            requestAnimationFrame(animate)
    }), 500)
}

window.addEventListener("resize", handleResize),
    window.addEventListener("orientationchange", handleOrientationChange),
    document.addEventListener("wheel", handleScroll, {
        passive: !1
    }),
    document.addEventListener("touchstart", handleTouchStart, {
        passive: !1
    }),
    document.addEventListener("touchmove", handleTouchMove, {
        passive: !1
    }),
    document.addEventListener("touchend", handleTouchEnd, {
        passive: !1
    }),
    document.addEventListener("visibilitychange", handleVisibilityChange),
    document.addEventListener("DOMContentLoaded", (function () {
        setTimeout((() => {
            init(), requestAnimationFrame(animate)
        }), 100)
    }));