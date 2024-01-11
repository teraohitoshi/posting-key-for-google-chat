
// Get extension option setting
var postKey;
chrome.storage.sync.get("option").then((result) => {
  postKey = result.option;
});

window.addEventListener("keydown", handler, true);

function handler(event) {
  if (!postKey || postKey == 'enter') {
    // Default setting
    return;
  }
  if (event.key !== "Enter") {
    // Enter is not being pressed
    return;
  }
  if (event.isModified) {
    // Prevent loop
    return;
  }
  if (event.target.attributes.getNamedItem("aria-owns")) {
    let areaOwner = document.getElementById(event.target.attributes.getNamedItem("aria-owns").value);
    if (areaOwner && areaOwner.attributes.getNamedItem("data-renderer")) {
      // Input area is not being focused
      return;
    }
  }

  if (event[postKey]) {
    // postKey + Enter
    // Post message
    const properties = [];
    for (const key in event) {
      properties[key] = event[key];
    }
    properties.shiftKey = false;
    const modifiedEvent = new KeyboardEvent("keydown", properties);
    modifiedEvent.isModified = true;
    event.target.dispatchEvent(modifiedEvent);
  } else if (!(event.isComposing || event.key === 'Process' || event.keyCode === 229)) {
    // Enter
    // IME is not composing
    document.execCommand("insertLineBreak");
  }

  // Prevent default
  event.preventDefault();
  event.stopImmediatePropagation();
}
