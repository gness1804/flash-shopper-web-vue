#!/bin/bash

if test "$(git rev-parse --abbrev-ref HEAD)" != gh-pages; then
  echo Oops, you must be on the gh-pages branch to deploy. >&2
  exit 1
fi

rm -rf dist/
rm index.html
git merge master

echo "Now ready to test locally."
