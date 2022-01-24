---
title: Jpptr - 动作(Action)
toc: true
date: 2022-01-24
tags: jpptr 文档
categories: jpptr
permalink: /jpptr-docs/action/
widgets:
    - position: right
      type: toc
    - position: right
      type: links
      links:
          Jpptr文档: /jpptr-docs/
          动作(Action): /jpptr-docs/action/
          解析器(Parser): /jpptr-docs/parser/
          插件(Plugin): /jpptr-docs/plugin/
---

动作的执行是由 [解析器](/jpptr-docs/parser/) 和 [插件](/jpptr-docs/plugin/) 一起协作执行的。

如下动作

```json
["goto", "https://enncy.github.io/jpptr/test.html"]
```

ArrayParser 将其解析成

```json
{
    "use": "function",
    "name": "goto",
    "args": ["https://enncy.github.io/jpptr/test.html"]
}
```

最后再由 FunctionPlugin 去执行 puppeteer 方法

```js
page.goto("https://enncy.github.io/jpptr/test.html");
```

---

解析器和插件都由 jpptr 默认加载

你可以在动作文件中使用 register 参数进行新的解析器或者插件注册, 甚至可以覆盖原有的默认模块

```json
{
    "register":{
        "parsers":[
            {
                "name":"number-parser",
                "parser":"./number-parser.js"
            }
        ],
        "plugins":[
            {
                "name":"goto-plugin",
                "plugin":"./goto-plugin.js"
            }
        ]
    },


    "launch":{...},
    "actions":[]
}
```

```js number-parser.js
module.exports = function NumberParser(action) {
    if (typeof action === "number") {
        if (actions === 1) {
            return {
                use: "goto-plugin",
                href: "https://example.com",
            };
        }
    }
};
```

```js goto-plugin.js
module.exports = function GotoPlugin(options) {
    return [["goto", options.action.href]];
};
```

---

如果有以下动作列表

```json
{
    "actions": [1, 1]
}
```

使用自定义的 number-parser 和 goto-plugin 将会解析成

```json
{
    "actions": [
        {
            "use": "goto-plugin",
            "href": "https://example.com",
            "actions": [["goto", "https://example.com"]]
        },
        {
            "use": "goto-plugin",
            "href": "https://example.com",
            "actions": [["goto", "https://example.com"]]
        }
    ]
}
```

流程是这样的

1.jpptr 调用 number-parser

`1` 变成 `{use: "goto-plugin",href: "https://example.com"}`

2.jpptr 调用 goto-plugin

`{use: "goto-plugin",href: "https://example.com"}`
变成
```json
{
    "use": "goto-plugin",
    "href": "https://example.com",
    "actions": [["goto", "https://example.com"]]
}
```
****
原理就是，如果 插件 仅仅返回一个 动作列表 ，则 jpptr 会自动添加 `{"actions":[...]}` 的属性, 并且 jpptr 会执行 actions 里面的动作

****

更多详情请看 [插件](/jpptr-docs/plugin/)