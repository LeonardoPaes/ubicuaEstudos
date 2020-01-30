const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer;


const notifyBtn = document.getElementById('notifyBtn')

var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')
var targetPriceVal

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=BRL')
        .then(res =>{
            const cryptos = res.data.BTC.BRL
            price.innerHTML = '$'+cryptos.toLocaleString('pt-br')

            if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.BRL){
                const myNotification = new window.Notification(notification.title, notification)
            }
        })
}

getBTC()
setInterval(getBTC, 10000);

notifyBtn.addEventListener('click', function(event){
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({
        width: 400, 
        height: 200,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true
        },
    })
    win.on('close',() => { win = null })
    win.loadURL(modalPath)
    win.show()
    win.webContents.openDevTools()

})

ipc.on('targetPriceVal', function(event, arg){
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('pt-br')
})