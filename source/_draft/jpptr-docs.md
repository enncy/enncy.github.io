---
title: Jpptr 文档
toc: true
date: 2022-01-21 16:12:27
tags:
    - 文档
    - json
    - jpptr
    - puppeteer
categories:
    - 文档
permalink: /jpptr-docs/
widgets:
    - type: toc
      position: right
---

一个使用 json 语法糖去执行 puppeteer 的框架。
项目地址: [github.com/enncy/jpptr](github.com/enncy/jpptr)
 

<!-- more -->

## 快速开始

```shell
npm install jpptr
```

## 使用命令行

```shell
npx jpptr ./test.json
```

## 使用编程

```js
const {Jpptr} = require("jpptr")

const jpptr = Jpptr.from("./test.json")

```






