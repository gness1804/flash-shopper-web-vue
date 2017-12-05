#!/bin/bash

# thanks to the following source: https://unix.stackexchange.com/questions/141206/removing-a-specific-line-from-a-file

if test "$(git rev-parse --abbrev-ref HEAD)" != gh-pages; then
  echo Oops, you must be on the gh-pages branch to deploy. >&2
  exit 1
fi

rm -rf dist/
git merge master

# get rid of the build files
sed -i -e 's/<link href=dist\/static\/css\/app.[a-z|A-Z|0-9]*.css rel=stylesheet>//g' index.html
sed -i -e 's/<script type=text\/javascript src=dist\/static\/js\/manifest.[a-z|A-Z\0-9]*.js><\/script>//g' index.html
sed -i -e 's/<script type=text\/javascript src=dist\/static\/js\/vendor.[a-z|A-Z|0-9]*.js><\/script>//g' index.html
sed -i -e 's/<script type=text\/javascript src=dist\/static\/js\/app.[a-z|A-Z\0-9]*.js><\/script>//g' index.html

echo "Now ready to test locally."
