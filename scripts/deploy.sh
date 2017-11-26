#!/bin/bash

if test "$(git rev-parse --abbrev-ref HEAD)" != gh-pages; then
  echo Oops, you must be on the gh-pages branch to deploy. >&2
  exit 1
fi

npm run build
cp dist/index.html index.html

echo "Please change the root index.html to include 'dist/' in front of the source files and then enter 'y'."
read answer
if [ $answer == 'y' ]; then
  git add . && git commit --no-verify && git push origin
else
  echo 'Please make the correct changes and try again.'
  exit 1
fi
