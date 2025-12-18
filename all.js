window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});


// About 背景圖：捲動位移（parallax）+ 進入區塊時淡入
(() => {
  const about = document.querySelector("#about");
  const bg = document.querySelector("#about .about-bg");
  if (!about || !bg) return;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const onScroll = () => {
    const rect = about.getBoundingClientRect();
    const vh = window.innerHeight || 1;

    // 進入視窗範圍才開始動
    const visible = rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
    if (!visible) return;

    // progress: 0（剛進入）→ 1（快離開）
    const t = (vh * 0.85 - rect.top) / (vh * 0.85 + rect.height);
    const p = clamp(t, 0, 1);

    // 位移：往上飄一點 + 微縮放回來
    const y = 60 - p * 110;         // 60px → -50px
    const s = 1.06 - p * 0.04;      // 1.06 → 1.02
    bg.style.opacity = String(0.12 + p * 0.35); // 0.12 → 0.47
    bg.style.transform = `translate3d(0, ${y}px, 0) scale(${s})`;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();


