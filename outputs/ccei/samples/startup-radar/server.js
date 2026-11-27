// ───────────────────────────────────────────
// 강사 시연용 서버: K-Startup 사업공고 API를 대신 불러와 화면에 넘겨 줌
// 실행: node server.js  →  브라우저에서 http://localhost:3000
// 인증키는 .env 파일에만 두고, 화면·채팅·공유 파일에 붙여 넣지 않음
// Node.js 18 이상 (fetch 기본 내장), 설치할 패키지 없음
// ───────────────────────────────────────────
const http = require("http");
const fs = require("fs");
const path = require("path");

// .env 읽기 (KEY=VALUE 한 줄씩)
const env = {};
try {
  fs.readFileSync(path.join(__dirname, ".env"), "utf8").split(/\r?\n/).forEach(function (line) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  });
} catch (e) { console.log(".env 파일이 없어 가상 데이터로만 엽니다."); }

const PORT = env.PORT || 3000;
const KEY = env.DATA_GO_KR_KEY || "";
// 공공데이터포털 '활용신청 상세'에서 확인한 요청 주소로 바꿔 쓸 수 있음
const API_URL = env.KSTARTUP_URL || "https://apis.data.go.kr/B552735/kisedKstartupService02/getAnnouncementInformation02";

const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".csv": "text/csv; charset=utf-8", ".json": "application/json; charset=utf-8" };

// yyyyMMdd → yyyy-MM-dd
function day(s) { s = String(s || "").replace(/\D/g, ""); return s.length >= 8 ? s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8) : ""; }
function pick(o, names) { for (const n of names) if (o[n]) return String(o[n]); return ""; }
function stageOf(text) { return /예비/.test(text) && !/년/.test(text) ? "예비창업자" : /7년|10년/.test(text) ? "7년미만" : "3년미만"; }

// API 응답 한 건 → 화면에서 쓰는 모양으로 바꿈 (필드 이름이 달라도 최대한 맞춤)
function toProgram(o, i) {
  const name = pick(o, ["biz_pbanc_nm", "intg_pbanc_biz_nm", "pbanc_nm"]);
  const field = pick(o, ["supt_biz_clsfc"]) || "기타";
  const target = pick(o, ["aply_trgt", "aply_trgt_ctnt"]);
  const words = (name + " " + field + " " + pick(o, ["prfn_matr", "aply_trgt_ctnt"])).split(/[\s,·/()\[\]]+/).filter(function (w) { return w.length >= 2; }).slice(0, 6);
  return {
    id: "k" + (o.pbanc_sn || i), name: name, field: field,
    region: pick(o, ["supt_regin"]) || "전국", stage: stageOf(pick(o, ["biz_enyy"])), target: target || "일반인",
    start: day(pick(o, ["pbanc_rcpt_bgng_dt"])), end: day(pick(o, ["pbanc_rcpt_end_dt"])),
    org: pick(o, ["pbanc_ntrp_nm", "sprv_inst"]) || "K-Startup", keywords: Array.from(new Set(words)),
    benefit: pick(o, ["pbanc_ctnt", "supt_biz_intrd_info"]).slice(0, 80) || field, url: pick(o, ["detl_pg_url", "biz_aply_url"])
  };
}

async function programs() {
  if (!KEY) return null;
  const url = API_URL + "?serviceKey=" + encodeURIComponent(KEY) + "&page=1&perPage=100&returnType=json&cond[rcrt_prgs_yn::EQ]=Y";
  const res = await fetch(url);
  if (!res.ok) throw new Error("API 응답 " + res.status);
  const body = await res.json();
  return (body.data || []).map(toProgram).filter(function (p) { return p.name && p.start && p.end; });
}

http.createServer(async function (req, res) {
  const u = new URL(req.url, "http://localhost");
  if (u.pathname === "/api/programs") {
    try {
      const list = await programs();
      res.writeHead(list ? 200 : 204, { "Content-Type": TYPES[".json"] });
      return res.end(list ? JSON.stringify({ programs: list }) : "");
    } catch (e) {
      console.log("API 오류:", e.message);
      res.writeHead(502, { "Content-Type": TYPES[".json"] });
      return res.end(JSON.stringify({ error: "K-Startup API를 불러오지 못했습니다. 가상 데이터로 보여 줍니다." }));
    }
  }
  // 그 밖의 요청은 이 폴더의 파일을 그대로 보냄 (.env 같은 숨은 파일은 보내지 않음)
  const file = path.join(__dirname, u.pathname === "/" ? "index.html" : decodeURIComponent(u.pathname));
  if (!file.startsWith(__dirname) || path.basename(file).startsWith(".")) { res.writeHead(403); return res.end(); }
  fs.readFile(file, function (err, data) {
    if (err) { res.writeHead(404); return res.end("없는 파일입니다"); }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, function () {
  console.log("창업 지원사업 레이더: http://localhost:" + PORT + (KEY ? " (K-Startup API 사용)" : " (가상 데이터)"));
});
