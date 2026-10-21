#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
교안 데이터 빌드 스크립트
- source/md/week-XX.md (Notion 교안 원문 markdown) → data/week-XX.js 로 변환함
- file:// 로 열어도 동작하도록 fetch 대신 <script> 로드 방식(JS 전역 변수)을 사용함
사용법:  python3 source/build.py   (webview 폴더에서 실행)
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "source" / "md"
OUT = ROOT / "data"
OUT.mkdir(exist_ok=True)

count = 0
for md in sorted(SRC.glob("week-*.md")):
    no = int(md.stem.split("-")[1])
    text = md.read_text(encoding="utf-8")
    js = (
        "/* 자동 생성 파일 — source/md/%s 를 수정한 뒤 build.py 를 다시 실행할 것 */\n"
        "window.WEEK_DATA = window.WEEK_DATA || {};\n"
        "window.WEEK_DATA[%d] = %s;\n" % (md.name, no, json.dumps(text, ensure_ascii=False))
    )
    (OUT / ("week-%02d.js" % no)).write_text(js, encoding="utf-8")
    count += 1

print("built %d week files → %s" % (count, OUT))
