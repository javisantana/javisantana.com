#!/bin/bash
cd "$(dirname "$0")"

claude --print "read prompt.md in this folder and follow the instructions" --dangerously-skip-permissions --verbose
mv claude-opus-4-6.html ~/tmp
codex exec --yolo "read the file prompt.md and follow the instructions"
mv codex.html ~/tmp
grok --yolo -p "read the file prompt.md and follow the instructions"
mv ~/tmp/claude-opus-4-6.html .
mv ~/tmp/codex.html .
git add *.html
git commit -m "new version of javisantana.com/risas"
echo "done"
