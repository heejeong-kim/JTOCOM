// =========================================================
// index.html 내장 강의교안 스크립트
// — 교시 아코디언, 목차 열기/닫기·현재 위치, 프롬프트 복사, 탭, 참고 법령 펼치기, 체크리스트
// — main.js와 이름이 겹치지 않도록 전체를 즉시 실행 함수로 감쌈
// =========================================================
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth <= 1024;

  // ===== 교시 아코디언: 카드·목차 링크로 이동하면 해당 교시를 펼침 =====
  const openLesson = id => {
    const d = document.getElementById(id);
    if (d && d.tagName === 'DETAILS') d.open = true;
    return d;
  };
  document.querySelectorAll('a[href^="#lesson-"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const d = openLesson(id);
      if (!d) return;
      e.preventDefault();
      d.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
    });
  });
  if (/^#lesson-\d$/.test(location.hash)) openLesson(location.hash.slice(1));

  // 교시마다 독립적으로 동작하도록 .lesson-scope 단위로 초기화
  document.querySelectorAll('.lesson-scope').forEach(scope => {
    // ===== 목차: 열기/닫기 =====
    const toc = scope.querySelector('.toc');
    const toggle = scope.querySelector('.toc-toggle');
    const layout = scope.querySelector('.l-layout');
    const setToc = open => {
      if (!toc || !toggle) return;
      toc.classList.toggle('is-closed', !open);
      layout.classList.toggle('toc-closed', !open && !isMobile());
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('span').textContent = open ? '닫기' : '열기';
      toggle.setAttribute('aria-label', open ? '목차 닫기' : '목차 열기');
      toggle.title = open ? '목차 닫기' : '목차 열기';
    };
    if (toc && toggle) {
      setToc(false); // 기본: 목차 닫힘
      toggle.addEventListener('click', () => setToc(toc.classList.contains('is-closed')));
      toc.querySelectorAll('.toc-list a').forEach(a => a.addEventListener('click', () => { if (isMobile()) setToc(false); }));
      let lastMobile = isMobile();
      window.addEventListener('resize', () => { if (isMobile() !== lastMobile) { lastMobile = isMobile(); setToc(false); } });
    }

    // ===== 교시 TOP: 해당 교시 첫 영역(아코디언 머리)으로 이동 =====
    const upBtn = scope.querySelector('.toc-up');
    if (upBtn) upBtn.addEventListener('click', () => {
      const head = scope.closest('details') || scope;
      head.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });

    // ===== 목차: 현재 읽는 섹션 강조 =====
    const links = [...scope.querySelectorAll('.toc-list a')];
    const targets = links.map(a => scope.querySelector(a.getAttribute('href'))).filter(Boolean);
    const setActive = id => {
      const link = links.find(a => a.getAttribute('href') === '#' + id);
      if (!link) return;
      const sub = link.closest('.toc-sub');
      const parent = sub ? link.closest('.toc-list > li').querySelector(':scope > a') : link;
      links.forEach(a => a.classList.remove('is-active'));
      parent.classList.add('is-active');
      if (sub) link.classList.add('is-active');
    };
    const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-30% 0px -60% 0px' });
    targets.forEach(t => spy.observe(t));

    // ===== 프롬프트 복사 =====
    scope.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const text = btn.closest('.prompt-box').querySelector('pre').innerText.trim();
        try { await navigator.clipboard.writeText(text); }
        catch {
          const ta = document.createElement('textarea');
          ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); } catch {}
          ta.remove();
        }
        btn.classList.add('is-done'); btn.setAttribute('aria-label', '복사됨');
        setTimeout(() => { btn.classList.remove('is-done'); btn.setAttribute('aria-label', '프롬프트 복사'); }, 1600);
      });
    });

    // ===== 탭 (+ data-autoplay: 자동 롤링) =====
    scope.querySelectorAll('[data-tabs]').forEach(box => {
      const tabs = [...box.querySelectorAll('[role="tab"]')];
      const list = tabs[0] && tabs[0].parentElement;
      let cur = Math.max(0, tabs.findIndex(t => t.getAttribute('aria-selected') === 'true'));
      const select = (tab, auto) => {
        cur = tabs.indexOf(tab);
        tabs.forEach(t => {
          const on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          const panel = scope.querySelector('#' + t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
        // 탭 목록만 가로로 스크롤해 현재 탭이 보이게 함 (페이지는 움직이지 않음)
        if (list && list.scrollWidth > list.clientWidth) {
          list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      };
      // 자동 롤링: 화면에 보이고, 마우스·포커스가 없을 때만 / 사용자가 직접 고르면 멈춤
      const delay = parseInt(box.dataset.autoplay, 10);
      let stopped = !delay || reduceMotion, hover = false, visible = false, timer = null;
      const tick = () => {
        if (stopped || hover || !visible || document.hidden) return;
        select(tabs[(cur + 1) % tabs.length], true);
      };
      if (!stopped) {
        new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; }), { threshold: 0.3 }).observe(box);
        box.addEventListener('mouseenter', () => { hover = true; });
        box.addEventListener('mouseleave', () => { hover = false; });
        box.addEventListener('focusin', () => { hover = true; });
        box.addEventListener('focusout', () => { hover = false; });
        timer = setInterval(tick, delay);
      }
      const stop = () => { stopped = true; if (timer) clearInterval(timer); box.classList.add('is-manual'); };
      tabs.forEach((t, i) => {
        t.addEventListener('click', () => { stop(); select(t); });
        t.addEventListener('keydown', e => {
          if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
          e.preventDefault(); stop();
          const n = tabs[(tabs.indexOf(t) + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
          select(n); n.focus();
        });
      });
    });

    // ===== 참고 법령 펼치기/접기 =====
    scope.querySelectorAll('.law-toggle').forEach(btn => {
      const body = scope.querySelector('#' + btn.getAttribute('aria-controls'));
      if (!body) return;
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(open));
        body.hidden = !open;
        btn.querySelector('span').textContent = open ? '접기' : '펼치기';
      });
    });

    // ===== 체크리스트: 이 브라우저에만 저장 =====
    scope.querySelectorAll('.check input[type="checkbox"]').forEach(cb => {
      const key = 'djbea-index-' + cb.id;
      try { cb.checked = localStorage.getItem(key) === '1'; } catch {}
      cb.addEventListener('change', () => { try { localStorage.setItem(key, cb.checked ? '1' : '0'); } catch {} });
    });
  });
})();
