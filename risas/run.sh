#!/bin/bash
cd "$(dirname "$0")"

claude --print "read prompt.md in this folder and follow the instructions" --dangerously-skip-permissions --verbose
mv claude-opus-4-6.html ~/tmp/risas_claude.html
codex exec --yolo "read the file prompt.md and follow the instructions"
mv codex.html ~/tmp/risas_codex.html
grok --yolo -p "read the file prompt.md and follow the instructions"
mv ~/tmp/risas* .
git add *.html
git commit -m "new version"
echo "done"
