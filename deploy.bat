hexo clean
mkdir public
echo '# 此文件表明不需要 github 去使用 jekyll 构建本分支' >> public/.nojekyll
hexo deploy