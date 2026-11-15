#!/usr/bin/env python3
"""Change la version du jeu partout en une commande.

Usage :
  python bump-version.py 0.7.1 "Texte des nouveautés"   # applique
  python bump-version.py --check                        # vérifie que tout est cohérent

Fichiers touchés : version.json, app.js (APP_VERSION), sw.js (VERSION, NOTES, ?v=…), index.html (?v=…).
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SEMVER = r"\d+\.\d+\.\d+"


def read(name):
    return (ROOT / name).read_text(encoding="utf-8")


def write(name, text):
    (ROOT / name).write_text(text, encoding="utf-8")


def found_versions():
    out = {}
    out["version.json"] = {json.loads(read("version.json"))["version"]}
    out["app.js"] = set(re.findall(r"const APP_VERSION='(%s)'" % SEMVER, read("app.js")))
    sw = read("sw.js")
    out["sw.js"] = set(re.findall(r"const VERSION='(%s)'" % SEMVER, sw)) | set(re.findall(r"\?v=(%s)" % SEMVER, sw))
    out["index.html"] = set(re.findall(r"\?v=(%s)" % SEMVER, read("index.html")))
    return out


def check():
    found = found_versions()
    allv = set().union(*found.values())
    for name, vs in found.items():
        print("%-14s %s" % (name, ", ".join(sorted(vs)) or "(aucune)"))
    if len(allv) == 1 and all(found.values()):
        print("OK : version unique %s" % next(iter(allv)))
        return 0
    print("ERREUR : versions incohérentes ou manquantes")
    return 1


def bump(version, notes):
    if not re.fullmatch(SEMVER, version):
        sys.exit("Version attendue au format 1.2.3")
    write("version.json", json.dumps({"version": version, "notes": notes}, ensure_ascii=False, separators=(",", ":")))
    app = re.sub(r"const APP_VERSION='%s'" % SEMVER, "const APP_VERSION='%s'" % version, read("app.js"))
    write("app.js", app)
    sw = read("sw.js")
    sw = re.sub(r"const VERSION='%s'" % SEMVER, "const VERSION='%s'" % version, sw)
    sw = re.sub(r"const NOTES=(['\"]).*?\1;", lambda m: "const NOTES=%s;" % json.dumps(notes, ensure_ascii=False), sw)
    sw = re.sub(r"\?v=%s" % SEMVER, "?v=" + version, sw)
    write("sw.js", sw)
    write("index.html", re.sub(r"\?v=%s" % SEMVER, "?v=" + version, read("index.html")))
    print("Version %s appliquée." % version)
    return check()


if __name__ == "__main__":
    args = sys.argv[1:]
    if args == ["--check"]:
        sys.exit(check())
    if len(args) == 2:
        sys.exit(bump(args[0], args[1]))
    sys.exit(__doc__)
