#!/bin/bash

if test "$(git rev-parse --abbrev-ref HEAD)" != gh-pages; then
  echo Oops, you must be on the gh-pages branch to deploy. >&2
  exit 1
fi

npm run build
cp dist/index.html index.html

sed -i -e 's/src=/src=dist/g' index.html
sed -i -e 's/href=\/static/href=dist\/static/g' index.html
rm index.html-e

git add . && git commit --no-verify && git push origin
echo "Successfully deployed to gh pages."
