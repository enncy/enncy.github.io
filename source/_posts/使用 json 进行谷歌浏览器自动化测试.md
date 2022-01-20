---
title: 使用 json 进行谷歌浏览器自动化测试
date: 2022-01-19 20:08:13
tags:
categories:
  - Diary
  - Life
  - [test,test2]
  - Life2
---

自己开发的库 `jsonsep`
github : [https://github.com/enncy/jsonsep](https://github.com/enncy/jsonsep)
## 示例
> 只需要编写下面一样的 json ，就可以让浏览器自动运行，原理就是通过解析 json 进行浏览器的调用，底层通过 puppeteer 实现

<!-- more -->

```json
{
    "options": {
        "executablePath": "C:/Program Files/Google/Chrome/Application/chrome.exe",
        "defaultViewport": null,
        "headless": false
    },
    "actions": [
        ["goto", "https://enncy.github.io/jsonsep/test.html"],
        ["type", "#username", "myusername"],
        ["type", "#password", "123456"],
        ["click", "#submit"],
        ["waitForTimeout", 3000],
        ["click", "#example"],
        ["waitForTimeout", 3000],
        {
            "page": -1,
            "use": "function",
            "name": "evaluate",
            "args": ["alert('hello json')"],
            "wait": false,
            "actions": [
                {
                    "use": "module",
                    "path": "./close-dialog-plugin.js"
                },
                ["waitForTimeout", 3000],
                ["close"]
            ]
        },
        ["waitForTimeout", 3000],
        ["close"]
    ]
}
```