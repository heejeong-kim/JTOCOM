/* =========================================================
 * 공통 스크립트: 테마 전환, 배경 네트워크 캔버스, 저장소 헬퍼
 * ========================================================= */
(function () {
  'use strict';

  /* ---------- localStorage 안전 래퍼 (file:// / 사생활 보호 모드 대응) ---------- */
  window.store = {
    get(k, d) { try { const v = localStorage.getItem('fusionlab:' + k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('fusionlab:' + k, v); } catch (e) { /* 저장 불가 환경은 무시 */ } }
  };

  /* ---------- 테마 ---------- */
  const root = document.documentElement;
  // 페이지별 테마 저장 키 (교안 페이지는 흰색 배경 기본값을 따로 관리함)
  const THEME_KEY = root.dataset.themeKey || 'theme';
  const saved = store.get(THEME_KEY, null);
  if (saved) root.setAttribute('data-theme', saved);

  window.toggleTheme = function () {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    store.set(THEME_KEY, next);
    document.querySelectorAll('[data-theme-label]').forEach(b => b.textContent = next === 'light' ? '☾' : '☀');
  };
  document.addEventListener('DOMContentLoaded', () => {
    const cur = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    document.querySelectorAll('[data-theme-label]').forEach(b => b.textContent = cur === 'light' ? '☾' : '☀');
  });

  /* ---------- 배경: 분기형 노드 네트워크 (인터랙티브 서사의 '선택 트리' 모티프) ---------- */
  window.startNet = function (canvasId, density) {
    const cv = document.getElementById(canvasId);
    if (!cv || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = cv.getContext('2d');
    let W, H, pts = [], raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function color(name) { return getComputedStyle(root).getPropertyValue(name).trim() || '#3ee9ff'; }
    function resize() {
      W = cv.width = innerWidth * DPR; H = cv.height = innerHeight * DPR;
      cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
      const n = Math.round((innerWidth * innerHeight) / (density || 26000));
      pts = Array.from({ length: Math.min(n, 90) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .25 * DPR, vy: (Math.random() - .5) * .25 * DPR,
        r: (Math.random() * 1.6 + .6) * DPR, c: Math.random()
      }));
    }
    function tick() {
      ctx.clearRect(0, 0, W, H);
      const cA = color('--c-cyan'), cB = color('--c-violet'), cC = color('--c-magenta');
      const max = 150 * DPR;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy);
          if (d < max) {
            ctx.globalAlpha = (1 - d / max) * .35;
            ctx.strokeStyle = p.c < .5 ? cA : cB;
            ctx.lineWidth = DPR * .7;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.globalAlpha = .9;
        ctx.fillStyle = p.c < .33 ? cA : p.c < .66 ? cB : cC;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }
    resize(); tick();
    addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); tick(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else tick(); });
  };
})();
