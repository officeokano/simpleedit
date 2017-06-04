// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
} else {
    alert('The File APIs are not fully supported in this browser.');
};

var storage = localStorage;

function saveContent() {
    var key = "saveeditor";
    var value = document.getElementById("textarea").innerText;
    storage.setItem(key, value);
    document.getElementById('textarea').focus();
};

function loadContent() {
    var loaded = storage.getItem("saveeditor");
    document.getElementById("textarea").innerText = loaded;
    document.getElementById('textarea').focus();
    document.title = "LocalStorage";
};

function cleartextarea() {
    document.getElementById("textarea").innerText = "";
    document.getElementById('textarea').focus();
};

window.onload = function() {
    loadContent();
    document.getElementById("open").addEventListener("change", onChangeFile, false);
    document.getElementById("save").addEventListener("click", downloadContent, false);
    document.getElementById("textarea").addEventListener("dragover", onCancel, false);
    document.getElementById("textarea").addEventListener("dragenter", onCancel, false);
    document.getElementById("textarea").addEventListener("drop", onDropFile, false);
};

window.onbeforeunload = function() {
    saveContent();
};

var onChangeFile = function(e) {
    var file = e.target.files[0];
    readFile(file);
};

var onDropFile = function(e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    readFile(file);
};

var onCancel = function(e) {
    if(e.preventDefault) { e.preventDefault(); }
    return false;
};

var readFile = function(file) {
    document.title = file.name;
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("textarea").innerText = e.target.result;
        document.getElementById('textarea').focus();
    };
    reader.readAsText(file);
};

var downloadContent = function() {
    var filename = document.title;
    var text = document.getElementById("textarea").innerText;
    var blob = new Blob([text], {type: "text/plain"});
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';
    a.download = filename;
    a.click();
};
