browser.runtime.onMessage.addListener(listener)


function listener(message) {
    switch (message) {
        case "altdown":
            altdown()
            break
        case "altup":
            altup()
            break
    }
}

function altdown() {
    browser.tabs.query({}).then(tabs => {
        const firstTabs = tabs.slice(0, 8)
        const lastTab = tabs.slice(-1)[0]
        for (let tab of firstTabs) {
            sendAltDown(tab, '' + (tab.index + 1))
        }
        sendAltDown(lastTab, lastTab == firstTabs.slice(-1)[0] ? `${lastTab.index + 1}/9` : '9')
    })
}

function altup() {
    browser.tabs.query({}).then(tabs => tabs.forEach(t => sendAltUp(t)))
}

function sendAltDown(tab, title) {
    browser.tabs.sendMessage(
        tab.id,
        {
            altdown: true,
            title
        }
    )
}

function sendAltUp(tab) {
    browser.tabs.sendMessage(
        tab.id,
        {
            altdown: false
        }
    )
}

function onError(error) {
    console.error(`Error: ${error}`)
}