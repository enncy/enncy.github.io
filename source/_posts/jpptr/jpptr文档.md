---
title: Jpptr文档
toc: true
date: 2022-01-24
tags: jpptr 文档
categories: jpptr
permalink: /jpptr-docs/
widgets:
    -
        position: right
        type: toc
    -
        position: right
        type: links
        links:
            Jpptr文档: /jpptr-docs/
            动作(Action): /jpptr-docs/action/
            解析器(Parser): /jpptr-docs/parser/
            插件(Plugin): /jpptr-docs/plugin/
---

> 一个使用 json 语法糖去执行 puppeteer 的框架。
> 你可以使用 json 去执行 puppeteer , 就像使用 javascript 去执行 puppeteer 一样

<!-- more -->

::: warning
本项目默认您已经了解 [puppeteer](https://pptr.dev) 以及 [nodejs](https://nodejs.org) 等框架。
:::

## 安装

```shell
npm install jpptr
```

## 使用命令行

```shell
# 执行 jpptr 的配置文件
npx jpptr <file> [options]
# 执行单个带有动作的文件
npx jpptr exec <file> [options]
# 查看帮助
npx jpptr -h
```

启动[配置文件](#配置文件)

```shell
# 启动配置文件, 默认的文件为 jpptr.config.json
npx jpptr
# 如果配置文件不存在，请给出路径
npx jpptr ./src/jpptr.config.json
```

启动单个[动作文件](#动作文件)

```shell
npx jpptr exec ./test.json
```

## ESM

启动配置文件

````ts
import { Jpptr } from "jpptr";
import path from "path";

(async () => {
    /**
     * 启动配置文件
     * 如果你的配置文件不是在根目录，请添加 __dirname 去定位文件的路径
     * 或者使用 cwd 选项
     * ```js
     * await Jpptr.launch("./jpptr.config.json",{cwd:__dirname});
     * ```
     */
    await Jpptr.launch("./jpptr.config.json");
})();
````

启动单个文件

````ts
import { Jpptr } from "jpptr";
import path from "path";

async function start() {
    /**
     * 实例化 jpptr
     * 如果你的json动作文件不是在根目录，请添加 __dirname 去定位文件的路径
     * 或者使用 cwd 选项
     * ```js
     * const jpptr = Jpptr.from("./test.json",{cwd:__dirname});
     * ```
     */
    const jpptr = Jpptr.from("./test.json");
    /** 启动浏览器 */
    const execute = await jpptr.createExecutor();
    /** 执行全部动作 */
    await execute.executeAll();
}

start();
````

## commonjs

使用 require ， 其余操作跟 ESM 一样

```js
// @ts-check
const { Jpptr } = require("jpptr");
const path = require("path");
```

## 配置文件

> 配置文件用于指定需要执行的动作文件，以及一些全局配置

```json jpptr.config.json
{
    "name": "my jpptr config",
    "version": "1.0.0",
    "include": ["./src/**/*.json", "./test.json"],
    "exclude": ["node_modules/**/*"]
}
```

## 动作文件

> 一般带有 launch 启动参数，以及 actions 动作列表，的 json 文件，我们称为动作文件

-   launch : puppeteer 启动参数

-   actions : 动作列表

```json
{
    /** puppeteer 启动参数 */
    "launch": {
        "executablePath": "C:/Program Files/Google/Chrome/Application/chrome.exe",
        "defaultViewport": null,
        "headless": false
    },
    "actions": [
        /** 跳转网址 */
        ["goto", "https://enncy.github.io/jpptr/test.html"],
        /** 填写表单 */
        ["type", "#username", "enncy"],
        /** 填写表单 */
        ["type", "#password", "123456"],
        /** 提交表单 */
        ["click", "#submit"],
        /** 等待3秒 */
        ["waitForTimeout", 3000]
        /** 关闭浏览器 */
        ["close"]
    ]
}
```

## 动作(Actions)

> 动作是 jpptr 的核心事件

一个动作对应着浏览器中的操作，例如点击，输入，跳转

动作可以表示成一个数组 ： \[puppeteer 方法, ...方法的其余参数\]

```json
["goto", "https://enncy.github.io/jpptr/test.html"]
```

jpptr 会使用 [ArrayParser](#ArrayParser) 将其解析成可以执行的动作对象

```json
{
    "use": "function",
    "name": "goto",
    "args": ["https://enncy.github.io/jpptr/test.html"]
}
```

其中

-   `use` : 是使用插件
-   `function` : 是 [方法插件](#方法插件) 专门执行 puppeteer 的方法
-   `name` : 是 puppeteer 的方法名
-   `args` : 是 puppeteer 方法名的参数列表

详细文档 : [/jpptr-docs/action/](/jpptr-docs/action/)

## 解析器(Parser)

解析器用于解析 [动作文件](#动作文件)

详细文档 : [/jpptr-docs/parser/](/jpptr-docs/parser/)

## 插件(Plugin)

-   插件也可以解析 [动作文件](#动作文件)
-   插件有控制 puppeteer 的权限, 例如 browser, page, frame 等
-   插件可以返回新的 browser, page, frame 以及 actions(子动作)
-   jpptr 会根据返回的 actions 继续生成新的动作，并且执行

详细文档 : [/jpptr-docs/plugin/](/jpptr-docs/plugin/)
