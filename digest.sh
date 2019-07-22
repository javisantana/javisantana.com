#!/bin/bash

export DIGEST_BRANCH=digest_`date +"%d-%m-%Y"`

# configure git
git config --global user.email "no@javisantana.com"
git config --global user.name "Javi santana bot"

git checkout -b $DIGEST_BRANCH

# create the markdown with the digest
echo "---" > _digest/$DIGEST_BRANCH.md
echo "layout: micro_post" >> _digest/$DIGEST_BRANCH.md
echo "ublished: true" >> _digest/$DIGEST_BRANCH.md
echo "name: Javisantana.com, resumen `date +"%d-%m-%Y"`" >> _digest/$DIGEST_BRANCH.md
echo "---" >> _digest/$DIGEST_BRANCH.md
echo "" >> _digest/$DIGEST_BRANCH.md
echo "# Resumen semana" >> _digest/$DIGEST_BRANCH.md

git log --since=1.week --reverse --grep="^D:" --pretty=format:'## %s%n%b ' >> _digest/$DIGEST_BRANCH.md

git add _digest/$DIGEST_BRANCH.md
git commit -m "digest for `date +"%d-%m-%Y"`"
git push origin $DIGEST_BRANCH
#git request-pull -p origin/gh-pages $DIGEST_BRANCH 
#https://github.com/javisantana/javisantana.com
git checkout gh-pages

