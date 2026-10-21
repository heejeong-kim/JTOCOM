#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
주차별 썸네일(SVG) 생성 스크립트
- assets/img/thumbs/week-XX.svg (640x360) 15장을 생성함
- 단계(Phase) 색상 + 주차 주제를 상징하는 기하학 모티프로 구성함
사용법: python3 source/make_thumbs.py  (webview 폴더 기준)
"""
import math
import pathlib
import random

ROOT = pathlib.Path(__file__).resolve().parent.parent  # _private 의 상위 = webview 폴더
OUT = ROOT / "assets" / "img" / "thumbs"
OUT.mkdir(parents=True, exist_ok=True)

# 단계별 메인/보조 색상
PH = {
    "이해": ("#3ee9ff", "#a98bff", "UNDERSTAND"),
    "기획": ("#a98bff", "#ff5fd2", "DESIGN"),
    "제작": ("#ff5fd2", "#ffc857", "BUILD"),
    "완성": ("#b8ff5c", "#3ee9ff", "COMPLETE"),
    "시험": ("#ffc857", "#ff5a78", "EVALUATE"),
}

WEEKS = [
    (1, "이해", "ORIENTATION"), (2, "이해", "CONVERGENCE"), (3, "이해", "BRANCHING"),
    (4, "기획", "WORLD BUILD"), (5, "기획", "STORY TREE"), (6, "기획", "FLOWCHART"),
    (7, "기획", "BLUEPRINT"), (8, "시험", "MIDTERM"), (9, "제작", "SYSTEM SPEC"),
    (10, "제작", "CHARACTER REF"), (11, "제작", "CUT SEQUENCE"), (12, "제작", "DEPLOY"),
    (13, "제작", "MOTION"), (14, "완성", "FINAL BUILD"), (15, "시험", "FINAL EXAM"),
]

W, H = 640, 360
CX, CY = 430, 180  # 모티프 중심 (우측 배치, 좌측은 텍스트 영역)


def node(x, y, r=7, c="#fff", fill="#0b0d1c"):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{c}" stroke-width="2"/>'


def line(x1, y1, x2, y2, c, w=1.6, dash=None, op=1):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{c}" stroke-width="{w}" opacity="{op}"{d}/>'


# ---------- 주차별 모티프 ----------
def m1(a, b):  # OT: 궤도 링
    s = ""
    for i, r in enumerate([40, 75, 110, 145]):
        s += f'<ellipse cx="{CX}" cy="{CY}" rx="{r*1.25}" ry="{r*.55}" fill="none" stroke="{a if i%2==0 else b}" stroke-width="1.4" opacity="{.9-i*.15}" transform="rotate(-18 {CX} {CY})"/>'
    s += f'<circle cx="{CX}" cy="{CY}" r="26" fill="{a}" opacity=".9"/><circle cx="{CX}" cy="{CY}" r="44" fill="{a}" opacity=".15"/>'
    for ang, r in [(30, 75), (200, 110), (320, 145)]:
        t = math.radians(ang)
        x, y = CX + r*1.25*math.cos(t), CY + r*.55*math.sin(t)
        s += node(round(x), round(y), 6, b)
    return s


def m2(a, b):  # 융합: 3원 벤다이어그램 (인문·예술·공학)
    s = ""
    for (dx, dy, c, t) in [(-45, -25, a, "STORY"), (45, -25, b, "ART"), (0, 50, "#ffc857", "TECH")]:
        s += f'<circle cx="{CX+dx}" cy="{CY+dy}" r="78" fill="{c}" fill-opacity=".12" stroke="{c}" stroke-width="2"/>'
        s += f'<text x="{CX+dx*1.9}" y="{CY+dy*1.9+4}" fill="{c}" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="2">{t}</text>'
    s += f'<circle cx="{CX}" cy="{CY}" r="10" fill="#fff"/>'
    return s


def m3(a, b):  # 분기 구조: 이진 트리
    s = ""
    pts = [(310, 180)]
    lv = [(310, 180)]
    for d in range(3):
        nxt = []
        for (x, y) in lv:
            off = 80 / (d + 1)
            for k in (-1, 1):
                nx, ny = x + 85, y + k * off
                s += f'<path d="M{x} {y} C {x+45} {y}, {nx-45} {ny}, {nx} {ny}" fill="none" stroke="{a if k<0 else b}" stroke-width="1.8"/>'
                nxt.append((nx, ny))
        lv = nxt
        pts += nxt
    for (x, y) in pts:
        s += node(x, y, 6, a)
    return s


def m4(a, b):  # 세계관: 와이어프레임 지구
    s = f'<circle cx="{CX}" cy="{CY}" r="120" fill="{a}" fill-opacity=".06" stroke="{a}" stroke-width="2"/>'
    for k in range(1, 6):
        rx = 120 * math.cos(math.radians(k * 15))
        s += f'<ellipse cx="{CX}" cy="{CY}" rx="{rx:.1f}" ry="120" fill="none" stroke="{a}" stroke-width="1" opacity=".55"/>'
    for k in range(-3, 4):
        y = CY + k * 32
        rx = math.sqrt(max(0, 120**2 - (k*32)**2))
        s += f'<ellipse cx="{CX}" cy="{y}" rx="{rx:.1f}" ry="{rx*.12:.1f}" fill="none" stroke="{b}" stroke-width="1" opacity=".6"/>'
    s += f'<ellipse cx="{CX}" cy="{CY}" rx="175" ry="42" fill="none" stroke="{b}" stroke-width="1.6" transform="rotate(-20 {CX} {CY})"/>'
    s += node(CX + 150, CY - 70, 7, b)
    return s


def m5(a, b):  # 스토리 트리: 계층형
    s = ""
    levels = [[430], [350, 510], [310, 390, 470, 550]]
    ys = [70, 170, 270]
    for i in range(2):
        for j, x in enumerate(levels[i]):
            for x2 in levels[i+1][j*2:j*2+2]:
                s += f'<path d="M{x} {ys[i]+18} V {(ys[i]+ys[i+1])/2} H {x2} V {ys[i+1]-18}" fill="none" stroke="{a}" stroke-width="1.6"/>'
    for i, row in enumerate(levels):
        for x in row:
            s += f'<rect x="{x-32}" y="{ys[i]-18}" width="64" height="36" rx="6" fill="#0b0d1c" stroke="{b if i==1 else a}" stroke-width="2"/>'
    return s


def m6(a, b):  # 플로우차트 기호
    s = f'<ellipse cx="330" cy="180" rx="44" ry="24" fill="#0b0d1c" stroke="{a}" stroke-width="2"/>'
    s += f'<polygon points="440,128 492,180 440,232 388,180" fill="#0b0d1c" stroke="#ffc857" stroke-width="2"/>'
    s += f'<rect x="510" y="70" width="80" height="44" rx="5" fill="#0b0d1c" stroke="{b}" stroke-width="2"/>'
    s += f'<rect x="510" y="246" width="80" height="44" rx="5" fill="#0b0d1c" stroke="{b}" stroke-width="2"/>'
    s += line(374, 180, 388, 180, a, 2) + f'<path d="M492 180 H 550 V 114" fill="none" stroke="{a}" stroke-width="2" stroke-dasharray="6 5"/>'
    s += f'<path d="M440 232 V 268 H 510" fill="none" stroke="{a}" stroke-width="2" stroke-dasharray="6 5"/>'
    s += f'<text x="440" y="185" fill="#ffc857" font-family="monospace" font-size="14" font-weight="700" text-anchor="middle">IF</text>'
    return s


def m7(a, b):  # 기획 완성: 블루프린트 + 체크리스트
    s = f'<rect x="320" y="60" width="230" height="240" rx="10" fill="{a}" fill-opacity=".07" stroke="{a}" stroke-width="2"/>'
    for i in range(1, 6):
        s += line(320 + i*38, 60, 320 + i*38, 300, a, .8, op=.3) + line(320, 60 + i*40, 550, 60 + i*40, a, .8, op=.3)
    for i in range(4):
        y = 100 + i * 50
        s += f'<rect x="345" y="{y-12}" width="24" height="24" rx="5" fill="#0b0d1c" stroke="{b}" stroke-width="2"/>'
        s += f'<path d="M351 {y} l6 6 l10 -12" fill="none" stroke="{b}" stroke-width="2.6" stroke-linecap="round"/>' if i < 3 else ""
        s += f'<rect x="384" y="{y-5}" width="{130 - i*18}" height="10" rx="5" fill="{a}" opacity=".5"/>'
    return s


def hexagon(cx, cy, r):
    return " ".join(f"{cx + r*math.cos(math.radians(60*k-30)):.1f},{cy + r*math.sin(math.radians(60*k-30)):.1f}" for k in range(6))


def m8(a, b):  # 중간시험: 육각 배지
    s = f'<polygon points="{hexagon(CX, CY, 120)}" fill="{a}" fill-opacity=".08" stroke="{a}" stroke-width="2"/>'
    s += f'<polygon points="{hexagon(CX, CY, 88)}" fill="none" stroke="{b}" stroke-width="1.4" stroke-dasharray="5 5"/>'
    s += f'<text x="{CX}" y="{CY+18}" fill="{a}" font-family="Arial, sans-serif" font-size="56" font-weight="800" text-anchor="middle">MID</text>'
    return s


def m9(a, b):  # 시스템 설계: 아토믹 블록
    s = ""
    random.seed(9)
    for r in range(4):
        for c in range(5):
            x, y = 320 + c * 50, 80 + r * 52
            col = [a, b, "#3ee9ff"][(r + c) % 3]
            op = .9 if (r*5+c) % 4 == 0 else .35
            s += f'<rect x="{x}" y="{y}" width="40" height="40" rx="8" fill="{col}" fill-opacity="{op*.4:.2f}" stroke="{col}" stroke-width="1.6" opacity="{op+.1:.2f}"/>'
    return s


def m10(a, b):  # 캐릭터 레퍼런스: 실루엣 + 조리개 프레임
    s = f'<rect x="340" y="50" width="180" height="260" rx="14" fill="none" stroke="{a}" stroke-width="2"/>'
    for (x, y, dx, dy) in [(330, 40, 1, 1), (530, 40, -1, 1), (330, 320, 1, -1), (530, 320, -1, -1)]:
        s += f'<path d="M{x} {y+dy*24} V {y} H {x+dx*24}" fill="none" stroke="{b}" stroke-width="3"/>'
    s += f'<circle cx="430" cy="140" r="42" fill="{a}" fill-opacity=".22" stroke="{a}" stroke-width="2"/>'
    s += f'<path d="M360 300 C 360 220, 500 220, 500 300" fill="{a}" fill-opacity=".22" stroke="{a}" stroke-width="2"/>'
    s += f'<text x="430" y="30" fill="{b}" font-family="monospace" font-size="12" text-anchor="middle" letter-spacing="2">--cref</text>'
    return s


def m11(a, b):  # 컷 시퀀스: 필름 프레임
    s = ""
    for i in range(4):
        x = 300 + i * 78
        y = 90 + (i % 2) * 30
        s += f'<rect x="{x}" y="{y}" width="66" height="150" rx="6" fill="{[a,b][i%2]}" fill-opacity=".14" stroke="{[a,b][i%2]}" stroke-width="2"/>'
        for k in range(5):
            s += f'<rect x="{x+6}" y="{y+8+k*29}" width="6" height="12" rx="2" fill="{[a,b][i%2]}" opacity=".7"/>'
        s += f'<text x="{x+38}" y="{y+170}" fill="#c4cae8" font-family="monospace" font-size="11" text-anchor="middle">C0{i+1}</text>'
    return s


def m12(a, b):  # 배포: 클라우드 + 업로드
    s = f'<path d="M340 230 a50 50 0 0 1 20 -95 a70 70 0 0 1 130 -10 a55 55 0 0 1 20 105 z" fill="{a}" fill-opacity=".1" stroke="{a}" stroke-width="2"/>'
    s += f'<path d="M430 270 V 150 M395 185 L430 150 L465 185" fill="none" stroke="{b}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
    for i, t in enumerate(["NETLIFY", "GITHUB", "VERCEL"]):
        s += f'<text x="{340 + i*90}" y="320" fill="#c4cae8" font-family="monospace" font-size="11" text-anchor="middle" letter-spacing="1">{t}</text>'
    return s


def m13(a, b):  # 영상·음향: 재생 + 파형
    s = f'<circle cx="400" cy="160" r="70" fill="{a}" fill-opacity=".1" stroke="{a}" stroke-width="2"/>'
    s += f'<polygon points="380,125 380,195 440,160" fill="{a}"/>'
    random.seed(13)
    for i in range(30):
        h = 8 + abs(math.sin(i * .55)) * 46 + random.random() * 10
        s += f'<rect x="{300 + i*9}" y="{285 - h/2:.1f}" width="5" height="{h:.1f}" rx="2" fill="{b}" opacity=".8"/>'
    return s


def m14(a, b):  # 최종: 씬 그래프 + 스타 버스트
    s = ""
    for k in range(16):
        t = math.radians(k * 22.5)
        s += line(CX, CY, round(CX + 150*math.cos(t)), round(CY + 150*math.sin(t)), a, 1, op=.25)
    pts = [(330, 120), (380, 230), (450, 100), (500, 220), (560, 140)]
    for i in range(len(pts) - 1):
        s += line(*pts[i], *pts[i+1], b, 1.8, "6 5")
    for p in pts:
        s += node(*p, 8, a)
    s += f'<polygon points="{CX},{CY-34} {CX+10},{CY-10} {CX+34},{CY} {CX+10},{CY+10} {CX},{CY+34} {CX-10},{CY+10} {CX-34},{CY} {CX-10},{CY-10}" fill="{a}"/>'
    return s


def m15(a, b):  # 기말: 문서 스택 + 체크
    s = ""
    for i in range(3):
        s += f'<rect x="{350+i*16}" y="{70+i*16}" width="150" height="190" rx="10" fill="#0b0d1c" stroke="{[b,b,a][i]}" stroke-width="2" opacity="{.5+i*.25}"/>'
    for k in range(4):
        s += f'<rect x="402" y="{140 + k*22}" width="{90-k*12}" height="8" rx="4" fill="{a}" opacity=".5"/>'
    s += f'<circle cx="500" cy="270" r="30" fill="{a}"/><path d="M486 270 l10 10 l18 -20" fill="none" stroke="#05060d" stroke-width="4" stroke-linecap="round"/>'
    s += f'<text x="440" y="122" fill="{a}" font-family="monospace" font-size="11" text-anchor="middle">.PDF</text>'
    return s


MOTIFS = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15]


def svg(no, phase, label):
    a, b, en = PH[phase]
    random.seed(no * 7)
    stars = "".join(
        f'<circle cx="{random.randint(0, W)}" cy="{random.randint(0, H)}" r="{random.choice([.8, 1, 1.4])}" fill="#fff" opacity="{random.uniform(.2, .7):.2f}"/>'
        for _ in range(40)
    )
    grid = "".join(line(x, 0, x, H, a, .6, op=.08) for x in range(0, W + 1, 40)) + \
           "".join(line(0, y, W, y, a, .6, op=.08) for y in range(0, H + 1, 40))
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<defs>
  <radialGradient id="g1" cx="75%" cy="40%" r="65%"><stop offset="0" stop-color="{a}" stop-opacity=".35"/><stop offset="1" stop-color="{a}" stop-opacity="0"/></radialGradient>
  <radialGradient id="g2" cx="10%" cy="100%" r="60%"><stop offset="0" stop-color="{b}" stop-opacity=".28"/><stop offset="1" stop-color="{b}" stop-opacity="0"/></radialGradient>
  <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#05060d" stop-opacity=".85"/><stop offset=".55" stop-color="#05060d" stop-opacity="0"/></linearGradient>
</defs>
<rect width="{W}" height="{H}" fill="#07081a"/>
<rect width="{W}" height="{H}" fill="url(#g1)"/><rect width="{W}" height="{H}" fill="url(#g2)"/>
{grid}{stars}
<g>{MOTIFS[no-1](a, b)}</g>
<rect width="{W}" height="{H}" fill="url(#fade)"/>
<text x="36" y="70" fill="{a}" font-family="monospace" font-size="14" font-weight="700" letter-spacing="4">{en}</text>
<text x="30" y="210" fill="none" stroke="{a}" stroke-width="2" font-family="Arial, Helvetica, sans-serif" font-size="150" font-weight="800" letter-spacing="-6">{no:02d}</text>
<text x="36" y="250" fill="#e9ecff" font-family="monospace" font-size="15" font-weight="700" letter-spacing="3">{label}</text>
<rect x="36" y="268" width="56" height="3" fill="{a}"/>
<text x="36" y="326" fill="#8d95bb" font-family="monospace" font-size="11" letter-spacing="2">FUSION//LAB · W{no:02d}</text>
</svg>'''


for no, phase, label in WEEKS:
    (OUT / f"week-{no:02d}.svg").write_text(svg(no, phase, label), encoding="utf-8")
print("thumbs →", OUT)
