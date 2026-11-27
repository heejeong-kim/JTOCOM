// ───────────────────────────────────────────
// 창업 지원사업 레이더 (프로토타입)
// 화면 3개: 레이더(관심 키워드 + 알림) → 공고 상세(맞는 입주기업 + 안내 문구) → 주간 브리핑
// 데이터: data/data.js (PROGRAMS·STARTUPS·HOLIDAYS, 가상)
//        강사용: server.js로 열면 /api/programs에서 K-Startup 공고를 불러옴
// 저장: 관심 키워드·스크랩·안내 보낸 기록은 이 브라우저(로컬 스토리지)에 남음
// ───────────────────────────────────────────

const STORE_KEY = "startup-radar";
const holidaySet = new Set(HOLIDAYS.map(function (h) { return h.date; }));
let programs = PROGRAMS.slice();

// ── 저장·불러오기 (로컬 스토리지) ──
function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || null; } catch (e) { return null; }
}
let state = load() || { keywords: ["AI", "제조", "청년", "로봇"], scraps: [], sent: {} };
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* 저장이 막힌 브라우저는 넘어감 */ }
}

// ── 날짜 도우미 ──
function toDate(s) { const p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
function fmt(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function today() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
function isOff(d) { const w = d.getDay(); return w === 0 || w === 6 || holidaySet.has(fmt(d)); }

// 마감일이 주말·공휴일이면 그 전 근무일로 당겨서 실제로 준비해야 할 날을 구함
function realEnd(p) {
  const d = toDate(p.end); let moved = false;
  while (isOff(d)) { d.setDate(d.getDate() - 1); moved = true; }
  const h = HOLIDAYS.find(function (x) { return x.date === p.end; });
  return { date: d, moved: moved, reason: h ? h.name : (moved ? "주말" : "") };
}
function daysLeft(p) { return Math.round((toDate(p.end) - today()) / 86400000); }
function workdaysLeft(p) {
  const d = today(); const end = realEnd(p).date; let n = 0;
  while (d < end) { d.setDate(d.getDate() + 1); if (!isOff(d)) n++; }
  return n;
}
function isOpen(p) { return toDate(p.start) <= today() && daysLeft(p) >= 0; }
function ddayText(n) { return n < 0 ? "마감" : n === 0 ? "D-day" : "D-" + n; }
function ddayClass(n) { return n < 0 ? "closed" : n <= 3 ? "hot" : n <= 7 ? "soon" : ""; }

// ── 키워드 맞추기 ──
function hits(p) {
  const text = (p.name + " " + p.keywords.join(" ") + " " + p.benefit).toLowerCase();
  return state.keywords.filter(function (k) { return text.includes(k.toLowerCase()); });
}

// 입주기업 자격: 지역·창업 단계가 맞고, 관심 키워드가 하나 이상 겹치는 기업
const STAGE = { "예비창업자": 0, "3년미만": 1, "7년미만": 2 };
const CHUNGCHEONG = ["대전", "세종", "충남", "충북"];
function regionOk(p, s) { return p.region === "전국" || p.region === s.region || (p.region === "충청권" && CHUNGCHEONG.includes(s.region)); }
function stageOk(p, s) { return p.stage === "예비창업자" ? s.stage === "예비창업자" : STAGE[s.stage] <= STAGE[p.stage]; }
function fits(p) {
  return STARTUPS.filter(function (s) {
    return regionOk(p, s) && stageOk(p, s) && s.keywords.some(function (k) { return p.keywords.includes(k); });
  });
}

// 글자 안전하게 넣기
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("on"); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("on"); }, 1800);
}

// ── 화면 전환 ──
const VIEWS = { radar: "view-radar", detail: "view-detail", brief: "view-brief" };
function show(name) {
  Object.keys(VIEWS).forEach(function (k) { document.getElementById(VIEWS[k]).hidden = k !== name; });
  document.querySelectorAll(".tab").forEach(function (t) { t.classList.toggle("is-on", t.dataset.view === (name === "detail" ? "radar" : name)); });
  window.scrollTo(0, 0);
}
document.querySelectorAll(".tab").forEach(function (t) {
  t.addEventListener("click", function () { if (t.dataset.view === "brief") renderBrief(); else renderRadar(); show(t.dataset.view); });
});

// ── 화면 1: 레이더 ──
const fField = document.getElementById("f-field"), fRegion = document.getElementById("f-region"),
      fStage = document.getElementById("f-stage"), fOpen = document.getElementById("f-open"), sortSel = document.getElementById("sort");

function fillOptions() {
  [[fField, "field"], [fRegion, "region"], [fStage, "stage"]].forEach(function (pair) {
    const sel = pair[0], key = pair[1], keep = sel.value;
    sel.length = 1;
    Array.from(new Set(programs.map(function (p) { return p[key]; }))).filter(Boolean).sort().forEach(function (v) {
      const o = document.createElement("option"); o.textContent = v; sel.appendChild(o);
    });
    sel.value = keep;
  });
}

function renderKeywords() {
  document.getElementById("kw-list").innerHTML = state.keywords.map(function (k, i) {
    return '<span class="chip">' + esc(k) + '<button type="button" data-i="' + i + '" aria-label="' + esc(k) + ' 지우기">×</button></span>';
  }).join("") || '<span class="muted">키워드를 추가하면 맞는 공고만 알려 드립니다.</span>';
}
document.getElementById("kw-list").addEventListener("click", function (e) {
  const b = e.target.closest("button"); if (!b) return;
  state.keywords.splice(+b.dataset.i, 1); save(); renderRadar();
});
document.getElementById("kw-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("kw-input");
  input.value.split(",").map(function (s) { return s.trim(); }).filter(Boolean).forEach(function (k) {
    if (!state.keywords.includes(k)) state.keywords.push(k);
  });
  input.value = ""; save(); renderRadar();
});

function matched() {
  return programs.filter(function (p) {
    return hits(p).length > 0 &&
      (!fField.value || p.field === fField.value) &&
      (!fRegion.value || p.region === fRegion.value) &&
      (!fStage.value || p.stage === fStage.value) &&
      (!fOpen.checked || isOpen(p));
  });
}

function renderSummary() {
  const open = programs.filter(isOpen);
  const caught = open.filter(function (p) { return hits(p).length; });
  const week = caught.filter(function (p) { return daysLeft(p) <= 7; });
  document.getElementById("summary").innerHTML =
    '<div class="stat"><b>' + open.length + '</b><span>접수 중인 공고</span></div>' +
    '<div class="stat main"><b>' + caught.length + '</b><span>관심 키워드에 걸린 공고</span></div>' +
    '<div class="stat hot"><b>' + week.length + '</b><span>7일 안에 마감</span></div>' +
    '<div class="stat"><b>' + state.scraps.length + '</b><span>스크랩</span></div>';
}

function renderRadar() {
  renderKeywords(); renderSummary();
  const items = matched();
  items.sort(function (a, b) {
    if (sortSel.value === "match") return hits(b).length - hits(a).length || daysLeft(a) - daysLeft(b);
    if (sortSel.value === "new") return toDate(b.start) - toDate(a.start);
    return daysLeft(a) - daysLeft(b);
  });
  document.getElementById("count").textContent = items.length;
  const feed = document.getElementById("feed");
  if (!items.length) { feed.innerHTML = '<li class="empty">걸린 공고가 없습니다. 관심 키워드를 더하거나 조건을 넓혀 보세요.</li>'; return; }
  feed.innerHTML = items.map(function (p, i) {
    const n = daysLeft(p), h = hits(p), f = fits(p), on = state.scraps.includes(p.id), end = realEnd(p);
    return '<li class="item" tabindex="0" data-id="' + p.id + '" style="animation-delay:' + Math.min(i, 12) * 0.03 + 's">' +
      '<span class="dday ' + ddayClass(n) + '">' + ddayText(n) + '</span>' +
      '<div><h3>' + esc(p.name) + '</h3>' +
      '<p class="meta">' + esc(p.org) + ' · ' + esc(p.field) + ' · ' + esc(p.region) + ' · ' + esc(p.stage) +
      ' · 마감 ' + fmt(end.date) + (end.moved ? ' (' + esc(end.reason) + '로 당김)' : '') + ' · 근무일 ' + workdaysLeft(p) + '일</p>' +
      '<div class="tags">' + p.keywords.map(function (k) { return '<span' + (h.includes(k) ? ' class="hit"' : '') + '>' + esc(k) + '</span>'; }).join("") + '</div></div>' +
      '<div class="side"><button type="button" class="star' + (on ? ' on' : '') + '" data-star="' + p.id + '" aria-pressed="' + on + '" aria-label="스크랩">★</button>' +
      (f.length ? '<span class="fit">입주기업 ' + f.length + '곳</span>' : '') + '</div>' +
    '</li>';
  }).join("");
}

document.getElementById("feed").addEventListener("click", function (e) {
  const star = e.target.closest("[data-star]");
  if (star) { toggleScrap(star.dataset.star); renderRadar(); return; }
  const li = e.target.closest(".item"); if (li) openDetail(li.dataset.id);
});
document.getElementById("feed").addEventListener("keydown", function (e) {
  const li = e.target.closest(".item");
  if (li && e.target === li && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openDetail(li.dataset.id); }
});
[fField, fRegion, fStage, fOpen, sortSel].forEach(function (el) { el.addEventListener("input", renderRadar); });

function toggleScrap(id) {
  const i = state.scraps.indexOf(id);
  if (i >= 0) state.scraps.splice(i, 1); else state.scraps.push(id);
  save(); toast(i >= 0 ? "스크랩을 지웠습니다" : "스크랩했습니다");
}

// ── 화면 2: 공고 상세 ──
function message(p, s) {
  return "[지원사업 안내] " + s.name + " 대표님께\n\n" +
    "관심 분야(" + s.keywords.filter(function (k) { return p.keywords.includes(k); }).join(", ") + ")에 맞는 공고가 있어 안내드립니다.\n\n" +
    "· 공고명: " + p.name + "\n· 주관: " + p.org + "\n· 지원 내용: " + p.benefit + "\n· 접수: " + p.start + " ~ " + fmt(realEnd(p).date) + "\n\n" +
    "신청 전 공고문 원문에서 자격 요건을 꼭 확인해 주세요.";
}

function openDetail(id) {
  const p = programs.find(function (x) { return x.id === id; });
  const n = daysLeft(p), end = realEnd(p), f = fits(p), sent = state.sent[p.id] || [];
  document.getElementById("detail").innerHTML =
    '<div class="detail">' +
      '<article class="box">' +
        '<span class="dday ' + ddayClass(n) + '" style="display:inline-grid;padding:0 12px">' + ddayText(n) + '</span>' +
        '<h2>' + esc(p.name) + '</h2><p class="muted">' + esc(p.benefit) + '</p>' +
        '<dl class="info">' +
          '<div><dt>주관기관</dt><dd>' + esc(p.org) + '</dd></div>' +
          '<div><dt>지원 분야</dt><dd>' + esc(p.field) + '</dd></div>' +
          '<div><dt>지역 · 대상</dt><dd>' + esc(p.region) + ' · ' + esc(p.target) + '</dd></div>' +
          '<div><dt>창업 단계</dt><dd>' + esc(p.stage) + '</dd></div>' +
          '<div><dt>접수 기간</dt><dd>' + p.start + ' ~ ' + p.end + '</dd></div>' +
          '<div><dt>준비 마감</dt><dd>' + fmt(end.date) + (end.moved ? ' (' + esc(end.reason) + ')' : '') + ' · 근무일 ' + workdaysLeft(p) + '일</dd></div>' +
        '</dl>' +
        '<div class="tags">' + p.keywords.map(function (k) { return '<span' + (hits(p).includes(k) ? ' class="hit"' : '') + '>' + esc(k) + '</span>'; }).join("") + '</div>' +
        '<p style="margin-top:16px"><button type="button" class="btn" id="d-star">' + (state.scraps.includes(p.id) ? "★ 스크랩됨" : "☆ 스크랩") + '</button>' +
        (p.url ? ' <a class="btn" href="' + esc(p.url) + '" target="_blank" rel="noopener">공고 원문 열기</a>' : '') + '</p>' +
      '</article>' +
      '<aside class="box">' +
        '<h3>맞는 입주기업 ' + f.length + '곳</h3>' +
        (f.length ? f.map(function (s, i) {
          return '<div class="co"><div><b>' + esc(s.name) + '</b><small>' + esc(s.field) + ' · ' + esc(s.stage) + ' · ' + esc(s.region) + '</small></div>' +
            '<div style="display:flex;gap:8px;align-items:center"><button type="button" class="btn" data-msg="' + i + '">안내 문구</button>' +
            '<label><input type="checkbox" data-sent="' + esc(s.name) + '"' + (sent.includes(s.name) ? ' checked' : '') + '>보냄</label></div></div>';
        }).join("") : '<p class="muted">조건이 맞는 입주기업이 없습니다.</p>') +
        '<textarea class="msg" id="msg" aria-label="안내 문구" placeholder="\'안내 문구\'를 누르면 기업별 안내 문구가 만들어집니다."></textarea>' +
        '<button type="button" class="btn fill" id="copy">문구 복사</button>' +
      '</aside>' +
    '</div>';

  document.getElementById("d-star").addEventListener("click", function () { toggleScrap(p.id); openDetail(p.id); });
  document.querySelectorAll("[data-msg]").forEach(function (b) {
    b.addEventListener("click", function () { document.getElementById("msg").value = message(p, f[+b.dataset.msg]); });
  });
  document.querySelectorAll("[data-sent]").forEach(function (box) {
    box.addEventListener("change", function () {
      const list = state.sent[p.id] || [];
      const name = box.dataset.sent, i = list.indexOf(name);
      if (box.checked && i < 0) list.push(name); if (!box.checked && i >= 0) list.splice(i, 1);
      state.sent[p.id] = list; save();
    });
  });
  document.getElementById("copy").addEventListener("click", function () {
    const t = document.getElementById("msg").value;
    if (!t) { toast("먼저 '안내 문구'를 눌러 주세요"); return; }
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () { toast("복사했습니다"); }, function () {
      document.getElementById("msg").select(); toast("문구를 선택했습니다. Ctrl+C로 복사하세요");
    });
  });
  show("detail");
}
document.getElementById("back").addEventListener("click", function () { renderRadar(); show("radar"); });

// ── 화면 3: 주간 브리핑 ──
function renderBrief() {
  document.getElementById("brief-title").textContent = fmt(today()) + " 주간 지원사업 브리핑";
  const caught = programs.filter(function (p) { return isOpen(p) && hits(p).length; })
    .sort(function (a, b) { return daysLeft(a) - daysLeft(b); });
  const row = function (p) {
    const sent = (state.sent[p.id] || []).length, f = fits(p).length;
    return '<tr><td><b>' + esc(p.name) + '</b>' + (state.scraps.includes(p.id) ? ' ★' : '') + '</td><td class="nw">' + esc(p.field) + '</td><td class="nw">' + fmt(realEnd(p).date) + ' (' + ddayText(daysLeft(p)) + ')</td><td>' + esc(hits(p).join(", ")) + '</td><td class="nw">' + (f ? f + '곳 중 ' + sent + '곳 안내' : '—') + '</td></tr>';
  };
  const table = function (list) {
    return list.length ? '<table class="sheet"><thead><tr><th>공고</th><th>분야</th><th>준비 마감</th><th>걸린 키워드</th><th>입주기업 안내</th></tr></thead><tbody>' + list.map(row).join("") + '</tbody></table>' : '<p class="muted">해당 공고가 없습니다.</p>';
  };
  const week = caught.filter(function (p) { return daysLeft(p) <= 7; });
  const rest = caught.filter(function (p) { return daysLeft(p) > 7; });
  const byCo = STARTUPS.map(function (s) {
    const list = caught.filter(function (p) { return fits(p).includes(s); });
    return list.length ? '<tr><td><b>' + esc(s.name) + '</b></td><td class="nw">' + esc(s.field) + '</td><td>' + list.map(function (p) { return esc(p.name); }).join(" · ") + '</td></tr>' : "";
  }).join("");
  document.getElementById("brief").innerHTML =
    '<section class="brief-block"><h3>이번 주 마감 (' + week.length + ')</h3>' + table(week) + '</section>' +
    '<section class="brief-block"><h3>접수 중 (' + rest.length + ')</h3>' + table(rest) + '</section>' +
    '<section class="brief-block"><h3>입주기업별 추천</h3>' + (byCo ? '<table class="sheet"><thead><tr><th>기업</th><th>분야</th><th>추천 공고</th></tr></thead><tbody>' + byCo + '</tbody></table>' : '<p class="muted">추천할 공고가 없습니다.</p>') + '</section>';
}
document.getElementById("print").addEventListener("click", function () { window.print(); });

// JSON 내보내기: 관심 키워드·스크랩·안내 기록을 동료에게 넘김
document.getElementById("export").addEventListener("click", function () {
  const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), radar: state }, null, 2)], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "radar-briefing.json"; a.click(); URL.revokeObjectURL(a.href);
});
// JSON 불러오기: 받은 파일로 이어서 씀
document.getElementById("import").addEventListener("change", function (e) {
  const file = e.target.files[0]; if (!file) return;
  const r = new FileReader();
  r.onload = function () {
    try { const d = JSON.parse(r.result); if (d.radar && Array.isArray(d.radar.keywords)) { state = d.radar; save(); renderBrief(); toast("브리핑 파일을 불러왔습니다"); } else throw 0; }
    catch (err) { toast("radar-briefing.json 파일인지 확인해 주세요"); }
  };
  r.readAsText(file); e.target.value = "";
});

// ── 강사용: server.js로 열었을 때 K-Startup API 공고 불러오기 ──
function loadLive() {
  if (!/^https?:$/.test(location.protocol)) return Promise.resolve(false);
  return fetch("/api/programs").then(function (res) { return res.ok ? res.json() : null; }).then(function (data) {
    if (!data || !Array.isArray(data.programs) || !data.programs.length) return false;
    programs = data.programs;
    const src = document.getElementById("source"); src.textContent = "K-Startup 실시간"; src.classList.add("live");
    return true;
  }).catch(function () { return false; });
}

// 처음 열기
fillOptions(); renderRadar();
loadLive().then(function (ok) { if (ok) { fillOptions(); renderRadar(); } });
