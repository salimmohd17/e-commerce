const heroTrack = $("hero-track");
const heroDotsContainer = $("hero-dots");
let heroTimer;
let isTransitioning = false;

function initHeroSlider() {
  if (!heroTrack) return;

  const realSlides = Array.from(heroTrack.children);
  const total = realSlides.length;

  const cloneLast = realSlides[total - 1].cloneNode(true);
  cloneLast.setAttribute("aria-hidden", "true");
  heroTrack.insertBefore(cloneLast, realSlides[0]);

  const cloneFirst = realSlides[0].cloneNode(true);
  cloneFirst.setAttribute("aria-hidden", "true");
  heroTrack.appendChild(cloneFirst);

  const allSlides = () => Array.from(heroTrack.children);
  let idx = 1;

  heroDotsContainer.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const btn = document.createElement("button");
    btn.className = "hero-dot" + (i === 0 ? " active" : "");
    btn.setAttribute("aria-label", `Slide ${i + 1}`);
    btn.dataset.dot = i;
    heroDotsContainer.appendChild(btn);
  }

  function updateDots(realIdx) {
    const dots = heroDotsContainer.querySelectorAll(".hero-dot");
    dots.forEach((d, i) => d.classList.toggle("active", i === realIdx));
  }

  function setPosition(index, animate) {
    heroTrack.style.transition = animate ? "transform .6s cubic-bezier(.4,0,.2,1)" : "none";
    heroTrack.style.transform = `translateX(-${index * 100}%)`;
  }

  setPosition(idx, false);

  function goTo(newIdx) {
    if (isTransitioning) return;
    isTransitioning = true;
    idx = newIdx;
    setPosition(idx, true);
  }

  heroTrack.addEventListener("transitionend", () => {
    const slides = allSlides();
    const lastReal = slides.length - 1;

    if (idx === lastReal) {
      idx = 1;
      setPosition(idx, false);
    } else if (idx === 0) {
      idx = total;
      setPosition(idx, false);
    }

    const realIdx = Math.min(Math.max(idx - 1, 0), total - 1);
    updateDots(realIdx);
    isTransitioning = false;
  });

  function startAuto() {
    heroTimer = setInterval(() => goTo(idx + 1), 4500);
  }
  function stopAuto() { clearInterval(heroTimer); }

  heroDotsContainer.addEventListener("click", e => {
    const dot = e.target.closest(".hero-dot");
    if (!dot) return;
    stopAuto();
    goTo(Number(dot.dataset.dot) + 1);
    startAuto();
  });

  heroTrack.closest(".hero-scroll-section").addEventListener("mouseenter", stopAuto);
  heroTrack.closest(".hero-scroll-section").addEventListener("mouseleave", startAuto);

  let touchStartX = 0;
  heroTrack.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  heroTrack.addEventListener("touchend", e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      stopAuto();
      goTo(diff > 0 ? idx + 1 : idx - 1);
      startAuto();
    }
  });

  startAuto();
}

window.CoastCartHero = { initHeroSlider };
