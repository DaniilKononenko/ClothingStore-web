let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setParams({"color": "E0FFFF"})


Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData("some string that we need to send")
})

let btn = document.getElementById("btn")
btn.addEventListener("click", function() {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide()
    }
    else {
        tg.MainButton.show()
    }
})

let btnED = doument.getElementById("btnED")
btnED.addEventListener("click", function() {
    if (tg.MainButton.isActive) {
        tg.MainButton.setParams({"color": "E0FFFF"})
        tg.MainButton.disable()
    }
    else {
        tg.MainButton.setParams({"color": "#143F6B"})
        tg.MainButton.enable()
    }
})