// ───────────────────────────────────────────
// 업무 인수인계 보드 (프로토타입)
// 화면 3개: 업무 목록 → 업무 상세(절차 체크) → 인수인계서
// 데이터: data/data.js (TASKS, HOLIDAYS)
// 저장: 절차 체크는 이 브라우저(로컬 스토리지)에 남음
// ───────────────────────────────────────────

const STORE_KEY = "handover-board-checks";
const holidaySet = new Set(HOLIDAYS.map(function (h) { return h.date; }));

// 체크 기록 불러오기 / 저장하기 (로컬 스토리지)
function loadChecks() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch (e) { return {}; }
}
function saveChecks() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(checks)); } catch (e) { /* 저장이 막힌 브라우저는 그냥 넘어감 */ }
}
let checks = loadChecks();

// 날짜 도우미
function toDate(str) { const p = str.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
function fmt(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function isOffDay(d) { const w = d.getDay(); return w === 0 || w === 6 || holidaySet.has(fmt(d)); }

// 마감일이 주말·공휴일이면 그 전 근무일로 당겨서 실제 마감일을 구함
function realDue(task) {
  const d = toDate(task.due);
  let moved = false;
  while (isOffDay(d)) { d.setDate(d.getDate() - 1); moved = true; }
  const holiday = HOLIDAYS.find(function (h) { return h.date === task.due; });
  return { date: d, moved: moved, reason: holiday ? holiday.name : (moved ? "주말" : "") };
}

// 오늘부터 남은 날 (D-day)
function daysLeft(task) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.round((realDue(task).date - today) / 86400000);
}
// 오늘부터 마감까지 남은 근무일 (주말·공휴일 빼고 셈)
function workdaysLeft(task) {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  const end = realDue(task).date;
  let n = 0;
  while (d < end) { d.setDate(d.getDate() + 1); if (!isOffDay(d)) n++; }
  return n;
}
function holidaysBetween(task) {
  const today = fmt(new Date());
  const end = fmt(realDue(task).date);
  return HOLIDAYS.filter(function (h) { return h.date > today && h.date <= end; });
}

function ddayText(n) { return n === 0 ? "D-day" : n > 0 ? "D-" + n : "D+" + (-n); }
function ddayClass(n) { return n <= 3 ? "urgent" : n <= 7 ? "soon" : ""; }

// 체크 진행률
function doneCount(task) { return (checks[task.id] || []).filter(Boolean).length; }

// 글자 안전하게 넣기
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

// ── 화면 전환 ──
const views = { list: "view-list", detail: "view-detail", handover: "view-handover" };
function show(name) {
  Object.keys(views).forEach(function (k) { document.getElementById(views[k]).hidden = k !== name; });
  document.querySelectorAll(".tab").forEach(function (t) { t.classList.toggle("is-on", t.dataset.view === (name === "detail" ? "list" : name)); });
  window.scrollTo(0, 0);
}
document.querySelectorAll(".tab").forEach(function (t) {
  t.addEventListener("click", function () {
    if (t.dataset.view === "handover") renderHandover(); else renderList();
    show(t.dataset.view);
  });
});

// ── 화면 1: 업무 목록 ──
const searchInput = document.getElementById("search");
const roleSelect = document.getElementById("role");
const sortSelect = document.getElementById("sort");

// 직무 고르기 칸 채우기
Array.from(new Set(TASKS.map(function (t) { return t.role; }))).forEach(function (r) {
  const o = document.createElement("option"); o.textContent = r; roleSelect.appendChild(o);
});

function renderSummary() {
  const week = TASKS.filter(function (t) { const n = daysLeft(t); return n >= 0 && n <= 7; }).length;
  const done = TASKS.filter(function (t) { return doneCount(t) === t.steps.length; }).length;
  document.getElementById("summary").innerHTML =
    '<div class="stat"><b>' + TASKS.length + '</b><span>전체 업무</span></div>' +
    '<div class="stat warn"><b>' + week + '</b><span>7일 안에 마감</span></div>' +
    '<div class="stat"><b>' + done + '</b><span>절차를 다 따라 해 본 업무</span></div>';
}

function renderList() {
  renderSummary();
  const q = searchInput.value.trim();
  const role = roleSelect.value;
  let items = TASKS.filter(function (t) {
    const text = t.name + " " + t.steps.join(" ");
    return (!q || text.includes(q)) && (!role || t.role === role);
  });
  const sort = sortSelect.value;
  items.sort(function (a, b) {
    if (sort === "name") return a.name.localeCompare(b.name, "ko");
    if (sort === "minutes") return b.minutes - a.minutes;
    return daysLeft(a) - daysLeft(b);
  });

  document.getElementById("count").textContent = items.length;
  const list = document.getElementById("list");
  if (items.length === 0) {
    list.innerHTML = '<li class="empty">찾는 업무가 없습니다. 다른 말로 검색하거나 직무를 바꿔 보세요.</li>';
    return;
  }
  list.innerHTML = items.map(function (t) {
    const n = daysLeft(t);
    const due = realDue(t);
    const d = doneCount(t);
    return '<li class="task" tabindex="0" data-id="' + t.id + '">' +
      '<span class="dday ' + ddayClass(n) + '">' + ddayText(n) + '</span>' +
      '<div><h3>' + esc(t.name) + (due.moved ? '<span class="badge">' + esc(due.reason) + ' → 당김</span>' : '') + '</h3>' +
      '<p class="meta">' + esc(t.role) + ' · ' + esc(t.cycle) + ' · 마감 ' + fmt(due.date) + ' · 근무일 ' + workdaysLeft(t) + '일 남음' + (holidaysBetween(t).length ? ' (공휴일 ' + holidaysBetween(t).length + '일 포함 안 함)' : '') + '</p></div>' +
      '<span class="progress' + (d === t.steps.length ? ' done' : '') + '">' + d + ' / ' + t.steps.length + ' 단계</span>' +
    '</li>';
  }).join("");
}

document.getElementById("list").addEventListener("click", function (e) {
  const li = e.target.closest(".task"); if (li) openDetail(+li.dataset.id);
});
document.getElementById("list").addEventListener("keydown", function (e) {
  const li = e.target.closest(".task"); if (li && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openDetail(+li.dataset.id); }
});
[searchInput, roleSelect, sortSelect].forEach(function (el) { el.addEventListener("input", renderList); });

// ── 화면 2: 업무 상세 (절차 체크) ──
function openDetail(id) {
  const t = TASKS.find(function (x) { return x.id === id; });
  const due = realDue(t);
  const n = daysLeft(t);
  const state = checks[t.id] || [];
  document.getElementById("detail").innerHTML =
    '<article class="detail">' +
      '<span class="dday ' + ddayClass(n) + '" style="display:inline-grid;padding:0 12px">' + ddayText(n) + '</span>' +
      '<h2>' + esc(t.name) + '</h2>' +
      '<dl class="info">' +
        '<div><dt>직무</dt><dd>' + esc(t.role) + '</dd></div>' +
        '<div><dt>주기</dt><dd>' + esc(t.cycle) + '</dd></div>' +
        '<div><dt>마감</dt><dd>' + fmt(due.date) + (due.moved ? ' (' + esc(due.reason) + '로 당김)' : '') + '</dd></div>' +
        '<div><dt>남은 근무일</dt><dd>' + workdaysLeft(t) + '일' + (holidaysBetween(t).length ? ' · ' + esc(holidaysBetween(t).map(function (h) { return h.name; }).join(", ")) + ' 제외' : '') + '</dd></div>' +
        '<div><dt>소요 시간</dt><dd>약 ' + t.minutes + '분</dd></div>' +
        '<div><dt>관련 사이트</dt><dd>' + esc(t.site) + '</dd></div>' +
      '</dl>' +
      '<h3>절차</h3>' +
      '<ol class="steps">' + t.steps.map(function (s, i) {
        return '<li><label><input type="checkbox" data-i="' + i + '"' + (state[i] ? ' checked' : '') + '><span>' + (i + 1) + '. ' + esc(s) + '</span></label></li>';
      }).join("") + '</ol>' +
      '<p class="note"><b>주의할 점</b> ' + esc(t.caution) + '</p>' +
      '<div class="row-btns"><button type="button" class="primary" id="reset">체크 지우기</button></div>' +
    '</article>';

  document.querySelectorAll('#detail input[type="checkbox"]').forEach(function (box) {
    box.addEventListener("change", function () {
      const arr = checks[t.id] || [];
      arr[+box.dataset.i] = box.checked;
      checks[t.id] = arr; saveChecks();
    });
  });
  document.getElementById("reset").addEventListener("click", function () {
    delete checks[t.id]; saveChecks(); openDetail(t.id);
  });
  show("detail");
}
document.getElementById("back").addEventListener("click", function () { renderList(); show("list"); });

// ── 화면 3: 인수인계서 ──
function renderHandover() {
  const roles = Array.from(new Set(TASKS.map(function (t) { return t.role; })));
  document.getElementById("handover").innerHTML = roles.map(function (r) {
    const rows = TASKS.filter(function (t) { return t.role === r; })
      .sort(function (a, b) { return daysLeft(a) - daysLeft(b); });
    return '<section class="role-block"><h3>' + esc(r) + ' (' + rows.length + ')</h3>' +
      '<table class="sheet"><thead><tr><th>업무</th><th>주기</th><th>마감</th><th>절차</th><th>주의할 점</th></tr></thead><tbody>' +
      rows.map(function (t) {
        return '<tr><td><b>' + esc(t.name) + '</b></td><td>' + esc(t.cycle) + '</td><td>' + fmt(realDue(t).date) + '</td><td>' + esc(t.steps.join(" → ")) + '</td><td>' + esc(t.caution) + '</td></tr>';
      }).join("") + '</tbody></table></section>';
  }).join("");
}
document.getElementById("print").addEventListener("click", function () { window.print(); });

// JSON으로 내보내기: 다음 담당자에게 업무와 체크 기록을 파일로 넘김
document.getElementById("export").addEventListener("click", function () {
  const data = { exportedAt: new Date().toISOString(), tasks: TASKS, checks: checks };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "handover.json"; a.click();
  URL.revokeObjectURL(a.href);
});

// JSON 불러오기: 받은 파일의 체크 기록을 이어서 씀
document.getElementById("import").addEventListener("change", function (e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function () {
    try {
      const data = JSON.parse(reader.result);
      if (data.checks) { checks = data.checks; saveChecks(); }
      renderHandover(); renderSummary();
      alert("인수인계 파일을 불러왔습니다.");
    } catch (err) { alert("파일을 읽지 못했습니다. handover.json 파일인지 확인해 주세요."); }
  };
  reader.readAsText(file);
  e.target.value = "";
});

// 처음 열면 업무 목록
renderList();
