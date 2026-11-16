// ===== 히어로 배경 모션: '물결'과 '문서 흐름'이 자동으로 번갈아 재생 =====
//  - waves : 실크처럼 흐르는 빛의 물결
//  - docs  : 엑셀·PDF·메일 등 업무 문서가 떠오르며 AI 처리(✓)되는 장면
//  ROTATE_MS 간격으로 자연스럽게 페이드 전환 (버튼 없이 자동 롤링)
(() => {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || reduce) return;
  const ctx = canvas.getContext('2d');
  const hero = canvas.closest('.hero');
  const MODES = ['waves', 'docs'];
  const ROTATE_MS = 12000; // 자동 전환 간격 (12초)
  const LABEL = { waves: '물결', docs: '문서 흐름' };
  let mode = MODES.includes(hero.dataset.fx) ? hero.dataset.fx : MODES[Math.floor(Math.random() * MODES.length)];
  let w = 0, h = 0, dpr = 1, t = 0, running = true, rafId = 0;
  const pointer = { x: -9999, y: -9999 };

  // ---------- 공통: 캔버스 크기 ----------
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    measureText();
    init();
  }

  // 왼쪽 텍스트 영역(공식 교육명 ~ 교육 대상)의 위치 — 문서 아이콘이 이 위에 그려지지 않게 함
  let textBox = null;
  function measureText() {
    const col = hero.querySelector('.hero-inner > div');
    if (!col) { textBox = null; return; }
    const hr = hero.getBoundingClientRect(), r = col.getBoundingClientRect();
    const pad = 36; // 텍스트 주변 여유
    textBox = { l: r.left - hr.left - pad, r: r.right - hr.left + pad, t: r.top - hr.top - pad, b: r.bottom - hr.top + pad };
  }
  // 텍스트 영역과 겹치는 정도(0~1) — 경계 바깥 60px에서 서서히 사라짐
  function textFade(x, y, size) {
    if (!textBox) return 1;
    const dx = Math.max(textBox.l - x, 0, x - textBox.r) - size / 2;
    const dy = Math.max(textBox.t - y, 0, y - textBox.b) - size / 2;
    const dist = Math.max(dx, dy);
    return Math.max(0, Math.min(1, dist / 60));
  }
  // 텍스트 영역 바깥에서 x 위치 고르기 (텍스트가 화면 대부분을 덮으면 전체에서 고름)
  function pickX() {
    if (textBox && textBox.r < w * .75) return textBox.r + Math.random() * (w - textBox.r);
    return Math.random() * w;
  }

  // ---------- 1) 물결 ----------
  const ribbons = [
    { y: .30, amp: 46, f: .0032, s: .55, c: [143, 195, 255] },
    { y: .48, amp: 58, f: .0024, s: .38, c: [110, 231, 200] },
    { y: .66, amp: 40, f: .0040, s: .70, c: [90, 162, 255] },
    { y: .82, amp: 52, f: .0028, s: .45, c: [18, 168, 138] }
  ];
  function drawWaves() {
    const step = Math.max(6, Math.round(w / 220));
    for (const r of ribbons) {
      for (let k = 0; k < 14; k++) {               // 한 리본을 14개의 가는 선으로 구성
        const off = (k - 7) * 3.2;
        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const d = Math.hypot(x - pointer.x, h * r.y - pointer.y);
          const bump = d < 220 ? (1 - d / 220) * 26 : 0; // 마우스 근처에서 살짝 부풀어 오름
          const y = h * r.y + off
            + Math.sin(x * r.f + t * r.s + k * .09) * (r.amp + bump)
            + Math.sin(x * r.f * 2.3 - t * r.s * .7) * r.amp * .35;
          x === -step ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const a = .07 + (1 - Math.abs(k - 7) / 7) * .26;
        ctx.strokeStyle = `rgba(${r.c[0]},${r.c[1]},${r.c[2]},${a})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  // ---------- 2) 문서 흐름 ----------
  const DOC_TYPES = [
    { label: 'XLSX', c: '#3ddc97' }, { label: 'PDF', c: '#ff7b7b' }, { label: 'MAIL', c: '#8fc3ff' },
    { label: 'DOC', c: '#5aa2ff' }, { label: 'CSV', c: '#6ee7c8' }, { label: 'CHART', c: '#ffc542' }
  ];
  let docs = [];
  function makeDoc(randomY) {
    const tp = DOC_TYPES[Math.floor(Math.random() * DOC_TYPES.length)];
    const size = 34 + Math.random() * 30;
    return {
      tp, size, x: pickX(), y: randomY ? Math.random() * h : h + size,
      vy: .25 + Math.random() * .45, rot: (Math.random() - .5) * .5, vr: (Math.random() - .5) * .004,
      done: false, glow: 0, sway: Math.random() * Math.PI * 2
    };
  }
  function roundRect(x, y, ww, hh, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + ww, y, x + ww, y + hh, r); ctx.arcTo(x + ww, y + hh, x, y + hh, r);
    ctx.arcTo(x, y + hh, x, y, r); ctx.arcTo(x, y, x + ww, y, r); ctx.closePath();
  }
  function drawDocs() {
    const scanY = h * .45; // 이 높이를 지나면 'AI 처리 완료'로 바뀜
    // 스캔 라인
    const g = ctx.createLinearGradient(textBox && textBox.r < w * .75 ? textBox.r : 0, 0, w, 0);
    g.addColorStop(0, 'rgba(110,231,200,0)'); g.addColorStop(.5, 'rgba(110,231,200,.35)'); g.addColorStop(1, 'rgba(110,231,200,0)');
    const lineX = textBox && textBox.r < w * .75 ? Math.max(0, textBox.r) : 0; // 텍스트 영역 위로는 선을 긋지 않음
    ctx.fillStyle = g; ctx.fillRect(lineX, scanY, w - lineX, 1.5);

    for (const d of docs) {
      d.y -= d.vy; d.rot += d.vr; d.sway += .01;
      const x = d.x + Math.sin(d.sway) * 10;
      if (!d.done && d.y < scanY) { d.done = true; d.glow = 1; }
      d.glow *= .97;
      const ww = d.size * .78, hh = d.size;
      ctx.save();
      ctx.translate(x, d.y); ctx.rotate(d.rot);
      const fade = textFade(x, d.y, d.size);
      if (fade <= 0) { ctx.restore(); continue; }
      ctx.globalAlpha = Math.min(1, (h - d.y) / 120, (d.y + hh) / 140) * .9 * fade;
      // 카드 본체 (글래스)
      roundRect(-ww / 2, -hh / 2, ww, hh, 7);
      ctx.fillStyle = d.done ? 'rgba(18,168,138,.16)' : 'rgba(255,255,255,.06)';
      ctx.fill();
      ctx.strokeStyle = d.done ? `rgba(110,231,200,${.45 + d.glow * .5})` : 'rgba(255,255,255,.22)';
      ctx.lineWidth = 1.2; ctx.stroke();
      // 접힌 모서리
      ctx.beginPath(); ctx.moveTo(ww / 2 - 9, -hh / 2); ctx.lineTo(ww / 2, -hh / 2 + 9);
      ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.stroke();
      // 본문 줄
      ctx.fillStyle = 'rgba(255,255,255,.18)';
      for (let i = 0; i < 3; i++) ctx.fillRect(-ww / 2 + 7, -hh / 2 + 12 + i * 6, ww * (.7 - i * .15), 2);
      // 라벨 / 완료 체크
      ctx.font = `600 ${Math.max(9, d.size * .2)}px "IBM Plex Mono", monospace`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      if (d.done) {
        ctx.strokeStyle = '#6ee7c8'; ctx.lineWidth = 2.4; ctx.beginPath();
        ctx.moveTo(-ww * .18, hh * .16); ctx.lineTo(-ww * .02, hh * .3); ctx.lineTo(ww * .22, hh * .04); ctx.stroke();
      } else {
        ctx.fillStyle = d.tp.c; ctx.fillText(d.tp.label, 0, hh * .2);
      }
      ctx.restore();
      if (d.glow > .05) { // 처리 순간 퍼지는 링
        ctx.beginPath(); ctx.arc(x, d.y, d.size * (1.6 - d.glow * .6), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(110,231,200,${d.glow * .4 * fade})`; ctx.lineWidth = 1.5; ctx.stroke();
      }
    }
    docs = docs.filter(d => d.y > -d.size * 2);
    const target = Math.round(Math.min(26, Math.max(10, w / 70)));
    while (docs.length < target) docs.push(makeDoc(false));
  }

  // ---------- 초기화 · 루프 ----------
  function init() {
    t = 0;
    docs = Array.from({ length: Math.round(Math.min(26, Math.max(10, w / 70))) }, () => makeDoc(true));
  }
  function frame() {
    t += 1 / 60;
    ctx.clearRect(0, 0, w, h);
    if (mode === 'waves') drawWaves();
    else drawDocs();
    if (running) rafId = requestAnimationFrame(frame);
  }

  // 히어로가 보일 때만 재생 (성능)
  new IntersectionObserver(([e]) => {
    running = e.isIntersecting; cancelAnimationFrame(rafId);
    if (running) rafId = requestAnimationFrame(frame);
  }).observe(hero);

  // 포인터 상호작용
  hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; });
  hero.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });

  // 효과 전환 버튼
  const btn = document.getElementById('fxSwitch');
  const syncBtn = () => {
    hero.dataset.fxActive = mode;
    if (btn) btn.querySelector('span').textContent = LABEL[mode];
  };
  // 페이드 아웃 → 모드 변경 → 페이드 인
  let fading = false;
  function switchMode(next) {
    if (fading) return;
    fading = true;
    canvas.classList.add('is-fading');
    setTimeout(() => {
      mode = next ?? MODES[(MODES.indexOf(mode) + 1) % MODES.length];
      init(); syncBtn();
      canvas.classList.remove('is-fading');
      fading = false;
    }, 600);
  }
  let timer = setInterval(() => { if (running) switchMode(); }, ROTATE_MS);
  if (btn) btn.addEventListener('click', () => {
    clearInterval(timer);                       // 직접 누르면 타이머를 다시 시작
    switchMode();
    timer = setInterval(() => { if (running) switchMode(); }, ROTATE_MS);
  });

  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
  resize(); syncBtn();
})();
