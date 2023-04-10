(() => {
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
        return Math.random() * (max - min) + min;
    };
    const percentageFunction = () => {
        if (percentage != 99) {
            percentage++;
            document.querySelector("#bsod .percent").textContent = percentage;
            setTimeout(percentageFunction, randomTimeout());
        }
    };
    const bind = () => {
        document.documentElement.requestPointerLock();
        document.documentElement.requestFullscreen();
    };

    const params = getParams();

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

    document.querySelector("#bsod .emoticon").textContent =
        params?.emoticon || ":(";
    document.querySelector("#bsod .main").textContent =
        params?.main ||
        "Your PC ran into a problem and needs to restart. We're just " +
            "collecting some error info, and then we'll restart for you.";
    document.querySelector("#bsod .complete").textContent =
        params?.complete || "% complete";
    document.querySelector("#bsod .support").textContent =
        params?.support ||
        "For more information about this issue and possible fixes, visit " +
            "https://windows.com/stopcode";
    document.querySelector("#bsod .stopcodeinfo").textContent =
        params?.stopcodeinfo ||
        "If you call a support person, give them this info:";
    document.querySelector("#bsod .stopcode").textContent =
        params?.stopcode || "Stop code: SYSTEM_SERVICE_EXCEPTION";

    if (params?.bg) {
        document.documentElement.style.setProperty(
            "--background-color",
            params.bg
        );
    }
    if (params?.font) {
        document.documentElement.style.setProperty(
            "--font-family",
            params.font
        );
    }
    if (params?.color) {
        document.documentElement.style.setProperty(
            "--font-color",
            params.color
        );
    }
})();
