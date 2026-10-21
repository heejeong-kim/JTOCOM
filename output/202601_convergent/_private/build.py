#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
교안 데이터 빌드 스크립트 (교수자 전용 — _private 폴더는 절대 업로드하지 않음)

- _private/md/week-XX.md (원문) → data/week-XX.js 로 변환함
- 모든 주차 공개: 각 교안의 앞 약 20%(블록 경계 기준)는 평문 미리보기,
  나머지 80%는 AES-256-GCM 으로 암호화함
  · 키 유도: PBKDF2-HMAC-SHA256 (310,000회) + 빌드마다 새 salt
  · 비밀번호는 실행 시 입력받으며 어떤 파일에도 저장하지 않음
- 필요 패키지: pip install cryptography

사용법 (webview 폴더에서):
  python3 _private/build.py            # 비밀번호를 프롬프트로 입력
  VAULT_PW='비밀번호' python3 _private/build.py   # 환경변수로 전달
"""
import base64
import getpass
import json
import os
import pathlib
import secrets
import sys

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

PREVIEW_RATIO = 0.2        # 미리보기 비율 (assets/js/weeks.js 의 previewRatio 와 동일하게 유지)
ITERATIONS = 310_000

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent
SRC = HERE / "md"
OUT = ROOT / "data"
OUT.mkdir(exist_ok=True)

b64 = lambda b: base64.b64encode(b).decode()


def split_preview(text, ratio=PREVIEW_RATIO):
    """최상위 블록 경계에서 앞 ratio 만큼을 미리보기로 분리함
    (콜아웃·토글·표·코드블록·들여쓴 하위 블록 중간에서는 자르지 않음)"""
    lines = text.split("\n")
    total = max(1, len(text.replace("\n", "")))
    depth, fence, cum, cands = 0, False, 0, []
    for i, ln in enumerate(lines):
        t = ln.strip()
        top = depth == 0 and not fence and t and not ln.startswith(("\t", "  "))
        if top and i > 0:
            cands.append((i, cum, t.startswith("#") or t == "---"))
        if t.startswith("```"):
            fence = not fence
        elif not fence:
            for tag in ("callout", "details", "table"):
                if t.startswith("<" + tag):
                    depth += 1
                if t.startswith("</" + tag):
                    depth -= 1
        cum += len(ln)
    target = total * ratio
    cands = [c for c in cands if c[1] > 0]
    if not cands:
        return text, ""
    # 목표 지점(20%) 근처(0.7~1.5배)의 제목/구분선 경계를 우선, 없으면 목표에 가장 가까운 블록 경계
    heads = [c for c in cands if c[2] and target * .7 <= c[1] <= target * 1.5]
    pick = min(heads or cands, key=lambda c: abs(c[1] - target))
    i = pick[0]
    while i > 0 and lines[i - 1].strip() in ("---", ""):   # 잠금 직전 구분선은 잠금 영역으로
        i -= 1
    return "\n".join(lines[:i]), "\n".join(lines[i:])


def main():
    pw = os.environ.get("VAULT_PW") or getpass.getpass("잠금 비밀번호: ")
    if len(pw) < 8:
        sys.exit("비밀번호는 8자 이상이어야 함")
    salt = secrets.token_bytes(16)
    key = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=ITERATIONS).derive(pw.encode())
    aes = AESGCM(key)

    for md in sorted(SRC.glob("week-*.md")):
        no = int(md.stem.split("-")[1])
        text = md.read_text(encoding="utf-8")
        preview, rest = split_preview(text)
        iv = secrets.token_bytes(12)
        ct = aes.encrypt(iv, rest.encode("utf-8"), None)
        payload = json.dumps({
            "v": 2, "preview": preview,
            "lock": {"kdf": "PBKDF2-SHA256", "iter": ITERATIONS, "salt": b64(salt), "iv": b64(iv), "ct": b64(ct)}
        }, ensure_ascii=False)
        (OUT / ("week-%02d.js" % no)).write_text(
            "/* 자동 생성 파일 — 앞 20%%는 미리보기, 나머지는 암호화됨 */\nwindow.WEEK_DATA = window.WEEK_DATA || {};\nwindow.WEEK_DATA[%d] = %s;\n" % (no, payload),
            encoding="utf-8")
        print("W%02d preview %d%%" % (no, round(len(preview) / max(1, len(text)) * 100)))


if __name__ == "__main__":
    main()
