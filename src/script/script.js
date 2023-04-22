(() => {
    // Functions / Constants
    const getParams = () => {
        let obj = {};
        [...new URLSearchParams(location.search)].forEach(([key, value]) => {
            obj[key] = value;
        });
        return obj;
    };
    const randomTimeout = () => {
        const max = 120000;
        const min = 30000;
        return (Math.random() * (max - min) + min) / param("speed");
    };
    const percentageFunction = () => {
        if (percentage !== Number(param("stoppingPoint"))) {
            percentage++;
            document.querySelector("#bsod .percent").textContent = percentage;
            setTimeout(percentageFunction, randomTimeout());
        }
    };
    const param = (name) => {
        return params?.[name] || defaults[name];
    };
    const bind = () => {
        document.documentElement.requestPointerLock();
        document.documentElement.requestFullscreen();
    };
    const fillIn = (name, notBsod) => {
        if (!notBsod) {
            document.querySelector(`#bsod .${name}`).textContent = param(name);
        }
        document.querySelector(`#config [name=${name}]`).value = param(name);
    };

    const params = getParams();
    const defaults = {
        emoticon: ":(",
        main:
            "Your PC ran into a problem and needs to restart. We're just " +
            "collecting some error info, and then we'll restart for you.",
        complete: "% complete",
        support:
            "For more information about this issue and possible fixes, visit " +
            "https://windows.com/stopcode",
        stopCodeInfo: "If you call a support person, give them this info:",
        stopCode: "Stop code: SYSTEM_SERVICE_EXCEPTION",
        bg: "#0c7ed2",
        font: "Segoe UI",
        color: "#ffffff",
        speed: "1",
        stoppingPoint: "99",
        image: "/src/images/support.svg",
    };

    // Add functionality to buttons
    let percentage = 0;
    document.querySelector("#start-button").addEventListener("click", () => {
        document.documentElement.dataset.mode = "bsod";
        bind();
        setTimeout(percentageFunction, randomTimeout());
    });
    document.querySelector("#bsod").addEventListener("mousedown", bind);

    document.querySelector("#config-button").addEventListener("click", () => {
        document.querySelector("#config").showModal();
    });

    // Fill in config
    [
        "emoticon",
        "main",
        "complete",
        "support",
        "stopCodeInfo",
        "stopCode",
    ].forEach((n) => fillIn(n));
    ["bg", "font", "color", "speed", "stoppingPoint", "image"].forEach((n) =>
        fillIn(n, true)
    );

    document.documentElement.style.setProperty(
        "--background-color",
        param("bg")
    );
    document.documentElement.style.setProperty("--font-family", param("font"));
    document.documentElement.style.setProperty("--font-color", param("color"));
    document.querySelector("#bsod img").src = param("image");

    // Config submit and reset
    document.querySelector("#config").addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.target;
        const params = new URLSearchParams();
        Object.keys(defaults).forEach((key) => {
            const value = form.querySelector(`[name=${key}]`).value;
            if (value && value !== defaults[key]) {
                params.append(key, value);
            }
        });
        location.href = `/?${params}`;
    });
    document.querySelector("#reset-button").addEventListener("click", (e) => {
        if (!confirm("Reset this configuration to the default?")) {
            return;
        }
        const form = document.querySelector("#config form");
        Object.keys(defaults).forEach((key) => {
            form.querySelector(`[name=${key}]`).value = defaults[key];
        });
    });

    // Presets
    document
        .querySelector("#microsoft-support")
        .addEventListener("click", () => {
            document.querySelector("#config form [name=image]").value =
                "/src/images/support.svg";
        });
    document.querySelector("#nggyu").addEventListener("click", () => {
        document.querySelector("#config form [name=image]").value =
            "/src/images/nggyu.svg";
    });

    // Copy button
    document.querySelector("#copy-button").addEventListener("click", (e) => {
        e.target.textContent = "Copying config...";
        navigator.clipboard.writeText(new URL(location.href).toString());
        e.target.textContent = "Copied config!";
        setTimeout(() => {
            e.target.textContent = "Copy config";
        }, 1000);
    });
})();
