 

/**
 *
 * @param {markdownit} md
 */
module.exports = function (md) {
    const containers = ["warning", "danger", "info", "success"];
    const icons = {
        warning: "fas fa-exclamation-triangle",
        danger: "fas fa-times-circle",
        info: "fas fa-info-circle",
        success: "fas fa-check-circle",
    };
    const container = require("markdown-it-container");
    for (const c of containers) {
        md.use(container, c, {
            validate: function (params) {
                return params.trim().match(c);
            },

            render: function (tokens, idx) {
                var m = tokens[idx].info.trim().split(" ");

                if (tokens[idx].nesting === 1) {
                    let level = m[0];
                    let args = m[1];
                    let iconClass = args || `${icons[level]} mr-2`;
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
