hexo.extend.renderer.register("md", "html", async function (data, options) {
    let match = data.text.match(/:::([\s\S]*?):::/g);
    if (match) {
        for (const item of match) {
            let [level, icon] = item.match(/::: (.*)\n/)[1].split(" ") || ["info", "fas fa-info-circle"];
            console.log([level, icon]);
            if (["warning", "danger", "info", "success"].includes(level)) {
                data.text = data.text.replace(
                    item,
                    `<article class="message message-immersive is-${level}">
                        <div class="message-body">
                            <i class="${icon} mr-2"></i>
                            ${item.match(/::: .*\n(.*)\n:::/)[1]}
                        </div>
                    </article>`
                );
            }
        }
    }
    return data.text;
});

// warning danger info success
