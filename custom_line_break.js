
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
      /*
      const properties = {
        key: event.key,
        code: event.code,
        location: event.location,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
        repeat: event.repeat,
        isComposing: event.isComposing,
        bubbles: event.bubbles,
        cancelable: event.cancelable,
        composed: event.composed
      };
      properties[postKey] = false;
      */
      
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
      let isInsideList = false;
      const selection = window.getSelection();
    
      if (selection && selection.rangeCount > 0) {
        let node = selection.focusNode;
      
        // get node type
        if (node && node.nodeType === Node.TEXT_NODE) {
          node = node.parentNode;
        }
      
        // is indide list tag
        if (node && node.nodeName && node.nodeName.toUpperCase() === 'LI') {
          isInsideList = true;
        }
      }
      if (isInsideList) {
        // create new bullet
        /*
        document.execCommand("insertParagraph");
        */
        return;
      } else {
        // linebreak
        document.execCommand("insertLineBreak");
      }
      /*
      document.execCommand("insertLineBreak");
      */
    }

    // Prevent default
    event.preventDefault();
    event.stopImmediatePropagation();
  }
