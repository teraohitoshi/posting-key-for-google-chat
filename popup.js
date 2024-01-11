chrome.storage.sync.get("option").then((result) => {
    var option = result.option != undefined ? result.option : 'enter';
    document.getElementsByName("submitKey").forEach((e, k, p) => {
        if (e.value == option) {
            e.checked = true;
        }
        e.addEventListener("change", (event) => {
            chrome.storage.sync.set({ "option": event.target.value });
        });
    });
});