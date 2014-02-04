#!/bin/bash

# Bash Script for Building AkuruLK JS Client
# Uses uglify-js 
#  install it via `sudo npm install uglify-js -g`


#Clean and create the Dist Directory
rm dist -rf && mkdir dist

#Minify and Mix
echo "Minifying Started"

uglifyjs lib/prefix.js >> dist/akuru.min.js
uglifyjs lib/unicodeSinhala.js >> dist/akuru.min.js
uglifyjs lib/tokenizer.js >> dist/akuru.min.js
uglifyjs lib/converters/legacyConverter.js >> dist/akuru.min.js
uglifyjs lib/vendors/htmlparser.js >> dist/akuru.min.js
uglifyjs lib/akuru.js >> dist/akuru.min.js
uglifyjs lib/loader.js >> dist/akuru.min.js

echo "Copying additional files to dist"

cp lib/fonts dist -r
cp lib/vendors dist -r


		
