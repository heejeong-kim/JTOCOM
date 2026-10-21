/* =========================================================
 * Notion Enhanced Markdown → HTML 렌더러 (의존성 없음)
 * 지원 블록: 제목(#~####), 구분선, 목록(중첩), 인용/실습/프롬프트 카드,
 *           <callout>, <details>(토글), <table>, 코드블록, 이미지,
 *           커스텀 다이어그램(<flowsymbols>, <flowmap>)
 * 들여쓰기: 탭 또는 공백 2칸 = 1단계
 * ========================================================= */
(function () {
  'use strict';

  /* ---------- 유틸 ---------- */
  const esc = s => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // 한 단계 들여쓰기 제거
  const dedent1 = l => l.replace(/^(\t| {2})/, '');
  const isIndented = l => /^(\t| {2})/.test(l);
  const slug = (() => { let n = 0; return () => 'sec-' + (++n); })();

  /* ---------- 수식($...$) 간이 변환 ---------- */
  function mathText(s) {
    return s
      .replace(/\\ge/g, '≥').replace(/\\le/g, '≤').replace(/\\times/g, '×')
      .replace(/\\sum/g, 'Σ').replace(/\\_/g, '_').replace(/\\\\/g, '\\');
  }

  /* ---------- 인라인 서식 ---------- */
  function inline(src, ctx) {
    const store = [];
    const keep = html => '\u0000' + (store.push(html) - 1) + '\u0000';
    let s = String(src);

    // 1) 코드 스팬 — 길면 복사 가능한 프롬프트 칩으로
    s = s.replace(/`([^`]+)`/g, (_, code) => {
      const txt = code.replace(/<br\s*\/?>/g, '\n');
      if (txt.length > 90 || txt.includes('\n')) {
        return keep('<span class="prompt-chip"><button class="copy-btn" type="button" data-copy>COPY</button><code>' + esc(txt) + '</code></span>');
      }
      return keep('<code>' + esc(txt) + '</code>');
    });
    // 2) 수식 → 데이터 칩
    s = s.replace(/\$([^$]+)\$/g, (_, m) => keep('<span class="formula">' + esc(mathText(m)) + '</span>'));
    // 3) 링크
    s = s.replace(/\[(.+?)\]\(((?:https?:\/\/|\?week=)[^)\s]+)\)/g, (_, text, url) => {
      const wk = url.match(/^\?week=(\d+)/);
      if (wk) return keep('<a href="' + (ctx.base || '') + 'lecture/index.html?week=' + window.pad2(+wk[1]) + '" class="ln">' + esc(text) + '</a>');
      return keep('<a href="' + esc(url) + '" target="_blank" rel="noopener" class="ln">' + esc(text) + '<span class="ln-ext">↗</span></a>');
    });

    // 4) 나머지 HTML 이스케이프 후 허용 태그 복원
    s = esc(s)
      .replace(/&lt;br\s*\/?&gt;/g, '<br>')
      .replace(/&lt;span color=&quot;(\w+)&quot;&gt;/g, '<span class="c-$1">')
      .replace(/&lt;\/span&gt;/g, '</span>');
    // 5) 굵게 / 기울임
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
         .replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>');
    // 6) 보관한 조각 복원
    return s.replace(/\u0000(\d+)\u0000/g, (_, i) => store[+i]);
  }

  /* ---------- 하위(들여쓴) 줄 수집 ---------- */
  function takeChildren(lines, start) {
    const kids = []; let j = start;
    while (j < lines.length) {
      const l = lines[j];
      if (l.trim() === '') { kids.push(''); j++; continue; }
      if (!isIndented(l)) break;
      kids.push(dedent1(l)); j++;
    }
    while (kids.length && kids[kids.length - 1] === '') kids.pop();
    return { kids, next: j };
  }

  /* ---------- 짝 태그 블록 수집 (<callout>, <details>) ---------- */
  function takeTagBlock(lines, start, open, close) {
    let depth = 0, j = start; const body = [];
    for (; j < lines.length; j++) {
      const t = lines[j].trim();
      if (t.startsWith(open)) { depth++; if (depth === 1) continue; }
      if (t.startsWith(close)) { depth--; if (depth === 0) break; }
      body.push(dedent1(lines[j]));
    }
    return { body, next: j + 1 };
  }

  /* ---------- 표 ---------- */
  function renderTable(raw, ctx) {
    const header = /header-row="true"/.test(raw);
    const rows = [];
    raw.replace(/<tr>([\s\S]*?)<\/tr>/g, (_, tr) => {
      const cells = []; tr.replace(/<td>([\s\S]*?)<\/td>/g, (__, td) => { cells.push(td.trim()); return ''; });
      rows.push(cells); return '';
    });
    if (!rows.length) return '';
    let h = '<div class="table-wrap"><table class="' + (header ? 'grid' : 'kv') + '">';
    rows.forEach((r, ri) => {
      const isHead = header && ri === 0;
      if (isHead) h += '<thead>';
      h += '<tr>' + r.map((c, ci) => {
        const tag = isHead || (!header && ci === 0) ? 'th' : 'td';
        return '<' + tag + '>' + inline(c, ctx) + '</' + tag + '>';
      }).join('') + '</tr>';
      if (isHead) h += '</thead><tbody>';
    });
    return h + (header ? '</tbody>' : '') + '</table></div>';
  }

  /* ---------- 이미지 ---------- */
  function renderImage(url, ctx) {
    if (/^notion-file-block:/.test(url)) {
      return '<figure class="img-ph"><div class="img-ph-in"><span class="img-ph-ico">◇</span>' +
        '<span>원본 교안 이미지 영역 (웹뷰 미포함)</span>' +
        '</div></figure>';
    }
    return '<figure class="img"><img loading="lazy" src="' + esc(url) + '" alt=""></figure>';
  }

  /* ---------- 커스텀 다이어그램 ---------- */
  const DIAGRAMS = {
    // 플로우차트 표준 기호 4종 (6주차)
    flowsymbols: () => `
<div class="diagram symbols">
  <figure><svg viewBox="0 0 160 90"><ellipse cx="80" cy="45" rx="66" ry="28"/><text x="80" y="50">START / END</text></svg><figcaption><b>터미널</b>시작·엔딩</figcaption></figure>
  <figure><svg viewBox="0 0 160 90"><rect x="14" y="17" width="132" height="56" rx="4"/><text x="80" y="50">PROCESS</text></svg><figcaption><b>프로세스</b>대사·전환·연산</figcaption></figure>
  <figure><svg viewBox="0 0 160 90"><polygon points="80,8 150,45 80,82 10,45"/><text x="80" y="50">DECISION</text></svg><figcaption><b>판단</b>선택·변수 판정</figcaption></figure>
  <figure><svg viewBox="0 0 160 90"><polygon points="34,17 150,17 126,73 10,73"/><text x="80" y="50">DATA</text></svg><figcaption><b>입출력</b>사용자 입력</figcaption></figure>
</div>`,
    // NEO-KONGJI 2099 씬 플로우 (14주차)
    flowmap: () => {
      const N = {
        S1: [70, 70, 's'], S2: [200, 70, 's'], S3: [330, 70, 's'], S4: [460, 70, 'd'],
        S5: [600, 200, 's'], S6: [740, 70, 's'], END_A: [905, 30, 'e'], END_B: [905, 115, 'e'],
        RE_S3: [420, 290, 'w'], G_OVER: [220, 290, 'x']
      };
      const E = [
        ['S1', 'S2', ''], ['S2', 'S3', ''], ['S3', 'S4', ''],
        ['S4', 'S6', 'A 기억 거래'], ['S4', 'S5', 'B 코어 난입'],
        ['S5', 'S6', 'A 사슬 절단'], ['S5', 'RE_S3', 'B 시퀀스 오류'],
        ['RE_S3', 'S3', 'A 백업 로드'], ['RE_S3', 'G_OVER', 'B 포맷 수용'],
        ['S6', 'END_A', 'A 리부트'], ['S6', 'END_B', 'B 진실 전파']
      ];
      const W = 104, H = 38;
      // 노드 경계에서 화살표가 끝나도록 선분 클리핑
      const clip = (x1, y1, x2, y2) => {
        const dx = x2 - x1, dy = y2 - y1;
        const t = Math.min(Math.abs((W / 2 + 6) / (dx || 1e-6)), Math.abs((H / 2 + 6) / (dy || 1e-6)), 0.5);
        return [x1 + dx * t, y1 + dy * t, x2 - dx * t, y2 - dy * t];
      };
      let edges = '', labels = '', nodes = '';
      E.forEach(([a, b, lab], i) => {
        const [x1, y1] = N[a], [x2, y2] = N[b];
        const [p, q, r, s] = clip(x1, y1, x2, y2);
        edges += `<line class="edge${lab.startsWith('B') ? ' b' : ''}" x1="${p}" y1="${q}" x2="${r}" y2="${s}" style="animation-delay:${i * -0.3}s"/>`;
        if (lab) labels += `<text class="elab" x="${(p + r) / 2}" y="${(q + s) / 2 - 6}">${lab}</text>`;
      });
      Object.entries(N).forEach(([k, [x, y, t]]) => {
        nodes += `<g class="node n-${t}"><rect x="${x - W / 2}" y="${y - H / 2}" width="${W}" height="${H}" rx="${t === 'e' || t === 'x' ? 19 : 6}"/><text x="${x}" y="${y + 5}">${k}</text></g>`;
      });
      return `<div class="diagram flowmap"><div class="diagram-head"><span>SCENE FLOW // NEO-KONGJI 2099</span><span class="legend"><i class="lg-a"></i>A 선택 <i class="lg-b"></i>B 선택</span></div>
<svg viewBox="0 0 1000 330" role="img" aria-label="NEO-KONGJI 씬 플로우 차트"><defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${edges}${labels}${nodes}</svg></div>`;
    }
  };

  /* ---------- 블록 파서 ---------- */
  function parse(lines, ctx) {
    let out = '', i = 0;
    while (i < lines.length) {
      const raw = lines[i], t = raw.trim();

      if (!t || t === '<empty-block/>') { i++; continue; }

      // 코드 블록
      if (t.startsWith('```')) {
        const lang = t.slice(3).trim() || 'text';
        const ind = raw.match(/^\s*/)[0].length;
        const code = []; i++;
        while (i < lines.length && lines[i].trim() !== '```') { code.push(lines[i].slice(Math.min(ind, lines[i].match(/^\s*/)[0].length))); i++; }
        i++;
        out += '<div class="codeblock"><div class="code-head"><span class="dots"><i></i><i></i><i></i></span><span class="lang">' + esc(lang === 'javascript' ? 'pseudo-code' : lang) + '</span><button class="copy-btn" type="button" data-copy>COPY</button></div><pre><code>' + esc(code.join('\n')) + '</code></pre></div>';
        continue;
      }

      // 커스텀 다이어그램
      const dg = t.match(/^<(flowsymbols|flowmap)><\/\1>$/);
      if (dg) { out += DIAGRAMS[dg[1]](); i++; continue; }

      // 콜아웃
      if (t.startsWith('<callout')) {
        const icon = (t.match(/icon="([^"]*)"/) || [])[1] || '💡';
        const color = ((t.match(/color="([^"]*)"/) || [])[1] || 'gray_bg').replace('_bg', '');
        const { body, next } = takeTagBlock(lines, i, '<callout', '</callout>');
        const label = { '💡': 'INSIGHT', '📌': 'NOTICE', '📁': 'FILE RULE', '⏱️': 'SCHEDULE' }[icon] || 'NOTE';
        out += '<aside class="callout tone-' + esc(color) + '"><div class="callout-head"><span class="callout-ico">' + icon + '</span><span class="tag">' + label + '</span></div><div class="callout-body">' + parse(body, ctx) + '</div></aside>';
        i = next; continue;
      }

      // 토글
      if (t.startsWith('<details')) {
        const { body, next } = takeTagBlock(lines, i, '<details', '</details>');
        let summary = '펼쳐보기';
        if (body.length && /<summary>/.test(body[0])) { summary = body.shift().replace(/<\/?summary>/g, '').trim(); }
        out += '<details class="toggle"><summary><span class="tg-ico">▸</span><span>' + inline(summary, ctx) + '</span><span class="tag">TOGGLE</span></summary><div class="toggle-body">' + parse(body, ctx) + '</div></details>';
        i = next; continue;
      }

      // 표
      if (t.startsWith('<table')) {
        const buf = [];
        while (i < lines.length) { buf.push(lines[i]); if (lines[i].trim().startsWith('</table>')) { i++; break; } i++; }
        out += renderTable(buf.join('\n'), ctx);
        continue;
      }

      // 제목
      const hm = t.match(/^(#{1,4})\s+(.*)$/);
      if (hm) {
        const lv = hm[1].length, text = hm[2];
        if (!ctx._skipped && /^\d+주차/.test(text.replace(/\*\*/g, ''))) { ctx._skipped = true; i++; continue; } // 히어로와 중복되는 주차 제목 생략
        const id = slug(), tag = 'h' + (lv + 1);
        const plain = text.replace(/\*\*/g, '').replace(/[`$]/g, '');
        ctx.toc.push({ lv, id, text: plain });
        if (lv === 1) ctx.secNo = (ctx.secNo || 0) + 1;
        out += '<' + tag + ' id="' + id + '" class="hd hd-' + lv + '">' + (lv === 1 ? '<span class="sec-no">§' + window.pad2(ctx.secNo) + '</span>' : '') + '<span>' + inline(text, ctx) + '</span></' + tag + '>';
        i++; continue;
      }

      // 구분선
      if (/^-{3,}$/.test(t)) { out += '<hr class="div">'; i++; continue; }

      // 이미지
      const im = t.match(/^!\[[^\]]*\]\(([^)]+)\)$/);
      if (im) { out += renderImage(im[1], ctx); i++; continue; }

      // 인용 / 실습 / 프롬프트
      if (t.startsWith('>')) {
        const first = t.replace(/^>\s?/, '');
        const { kids, next } = takeChildren(lines, i + 1);
        i = next;
        // 연속된 '>' 단일 줄은 하나의 인용으로 병합
        const extra = [];
        while (!kids.length && i < lines.length && /^>\s?\S/.test(lines[i].trim()) && !takeChildren(lines, i + 1).kids.length) {
          extra.push(lines[i].trim().replace(/^>\s?/, '')); i++;
        }
        if (/✅|\[실습\]/.test(first)) {
          ctx.labs++;
          out += '<section class="lab"><div class="lab-head"><span class="tag tag-lab">LAB · 실습</span><span class="lab-title">' + inline(first.replace('✅', '').trim(), ctx) + '</span><button class="copy-btn" type="button" data-copy-target>COPY</button></div>' +
            (kids.length ? '<div class="lab-body copy-src">' + parse(kids, ctx) + '</div>' : '') + '</section>';
        } else if (!first.trim()) {
          ctx.prompts++;
          out += '<section class="prompt"><div class="prompt-head"><span class="tag tag-prompt">PROMPT</span><span class="cursor">▍</span><button class="copy-btn" type="button" data-copy-target>COPY</button></div><div class="prompt-body copy-src">' + parse(kids, ctx) + '</div></section>';
        } else {
          out += '<blockquote class="quote"><p>' + [first].concat(extra).map(x => inline(x, ctx)).join('</p><p>') + '</p>' + (kids.length ? parse(kids, ctx) : '') + '</blockquote>';
        }
        continue;
      }

      // 목록
      const lm = t.match(/^(-|\d+\.)\s+(.*)$/);
      if (lm && !isIndented(raw)) {
        const ordered = lm[1] !== '-';
        let html = ordered ? '<ol class="ls">' : '<ul class="ls">';
        while (i < lines.length) {
          const m2 = lines[i].match(/^(-|\d+\.)\s+(.*)$/);
          if (!m2 || (m2[1] !== '-') !== ordered) break;
          const { kids, next } = takeChildren(lines, i + 1);
          html += '<li' + (ordered ? ' value="' + parseInt(m2[1], 10) + '"' : '') + '>' + inline(m2[2], ctx) + (kids.length ? parse(kids, ctx) : '') + '</li>';
          i = next;
        }
        out += html + (ordered ? '</ol>' : '</ul>');
        continue;
      }

      // 문단 (+ 들여쓴 하위 블록)
      const { kids, next } = takeChildren(lines, i + 1);
      out += '<p>' + inline(t, ctx) + '</p>' + (kids.length ? '<div class="nest">' + parse(kids, ctx) + '</div>' : '');
      i = next;
    }
    return out;
  }

  /* ---------- 공개 API ---------- */
  window.NotionRender = {
    render(md, opt) {
      const ctx = Object.assign({ toc: [], labs: 0, prompts: 0, base: '../' }, opt || {});
      const html = parse(String(md).replace(/\r/g, '').split('\n'), ctx);
      return { html, toc: ctx.toc, labs: ctx.labs, prompts: ctx.prompts };
    },
    inline
  };
})();
