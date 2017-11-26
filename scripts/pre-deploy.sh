#!/bin/bash

if test "$(git rev-parse --abbrev-ref HEAD)" != gh-pages; then
  echo Oops, you must be on the gh-pages branch to deploy. >&2
  exit 1
fi

rm -rf dist/
git merge master

# gets rid of build-related script tags in index.html
grep -v "<script" index.html > index2.html
mv index2.html index.html

# gets rid of build-related link (css) tags in index.html
grep -v "<link href=dist/static/css/" index.html > index2.html
mv index2.html index.html

echo "Now ready to test locally."
