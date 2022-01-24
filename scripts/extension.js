// const { marked } = require("marked");
// hexo.extend.filter.register(
//     "marked:renderer",
//     function (
//         /** @type {marked.Renderer} */
//         renderer
//     ) {
//         renderer.paragraph = function (text) {
//             let regexp = /::: (.*)<br>(.*)<br>:::/;
//             let match = text.match(new RegExp(regexp, "g"));
//             if (match) {
//                 for (const item of match) {
//                     let [raw, args, content] = item.match(regexp);
//                     let [level, iconStyles] = args.split("|");
//                     if (["warning", "danger", "info", "success"].includes(level)) {
//                         let iconClass = iconStyles || `fas fa-${level}-circle mr-2`;
//                         let icon = `<i class="${iconClass}"></i>`;
//                         text = text.replace(item, `<p><article class="message message-immersive is-${level}"><div class="message-body">${icon}${content}</div></article></p>`);
//                     }
//                 }
//             }
//             return text;
//         };
//     }
// );

/**
 *
 * @param {markdownit} md
 */
module.exports = function (md) {
    const containers = ["warning", "danger", "info", "success"];
    const container = require("markdown-it-container");
    for (const c of containers) {
        md.use(container, c, {
            validate: function (params) {
                return params.trim().match(c);
            },

            render: function (tokens, idx) {
                var m = tokens[idx].info.trim().split(" ")
       
                if (tokens[idx].nesting === 1) {
                    let level = m[0];
                    let args = m[1];
                    let iconClass = args || `fas fa-${level}-circle mr-2`;
                    return `
                        <article class="message message-immersive is-${level}">
                            <div class="message-body">
                                <i class="${iconClass}" style="float: left;"></i>`;
                } else {
                    return "</div></article>\n";
                }
            },
        });
    }
};
