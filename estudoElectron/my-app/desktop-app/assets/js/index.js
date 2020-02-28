const electron = require('electron');
const remote = electron.remote;

const closeBtn = document.getElementById('closeBtn');

closeBtn.addEventListener('click', function(event){
    var window = remote.getCurrentWindow();
    window.close();
});

const minBtn = document.getElementById('minBtn');

minBtn.addEventListener('click', function(event){
    var window = remote.getCurrentWindow();
    window.minimize();
});

const maxBtn = document.getElementById('maxBtn');

maxBtn.addEventListener('click', function(event){
    var window = remote.getCurrentWindow();
    
    if (window.isMaximized()) {
        console.log("foi")
        window.unmaximize();
    }else{
        console.log("foi2")
       window.maximize();
    }
    
});