#!/usr/bin/env sh

# 當發生錯誤時中止腳本
set -e

# 構建
npm run build

# 進入構建檔案夾
cd dist

# 放置 .nojekyll 以繞過 Jekyll 的處理
touch .nojekyll

# 若要部署到自定義域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd - 