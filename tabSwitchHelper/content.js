function throttle (callback, limit) {
    var wait = false;                  // Initially, we're not waiting
    return function () {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            callback.call();           // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}

const throttledAltHandler = throttle(althandler, 100)
window.addEventListener('keyup', throttledAltHandler)
window.addEventListener('keydown', throttledAltHandler)
window.addEventListener('mousemove', throttledAltHandler)
browser.runtime.onMessage.addListener(requestHandler)

function requestHandler(request) {
    if(request.altdown) {
        setTitle(request.title)
    }
    else {
        resetTitle()
    }
}

function altHandler(e) {
    if (e.altKey) {
        browser.runtime.sendMessage("altdown")
    }
    else {
        browser.runtime.sendMessage("altup")
    }
}

function setTitle(title) {
    if(tabTitleIsOriginal) {
        originalTabTitle = document.title
        tabTitleIsOriginal = false
    }
    document.title = title
}

function resetTitle() {
    if(tabTitleIsOriginal){
        return
    } 
    document.title = originalTabTitle
    tabTitleIsOriginal = true
        
}

let tabTitleIsOriginal = true
let originalTabTitle = ""

