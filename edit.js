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
    key = "savetitle";
    value = document.title;
    storage.setItem(key, value);
    document.getElementById('textarea').focus();
};

function loadContent() {
    var loaded = storage.getItem("saveeditor");
    var loadtitle = storage.getItem("savetitle");
    document.getElementById("textarea").innerText = loaded;
    document.getElementById('textarea').focus();
    if (loadtitle == null) {
        document.title = "untilted";
        } else {
    document.title = loadtitle;
    }
};

window.onload = function() {
    loadContent();
    document.getElementById("open").addEventListener("change", onChangeFile, false);
    document.getElementById("save").addEventListener("click", downloadContent, false);
    document.getElementById("clear").addEventListener("click", cleartextarea, false);
    document.getElementById("textarea").addEventListener("dragover", onCancel, false);
    document.getElementById("textarea").addEventListener("dragenter", onCancel, false);
    document.getElementById("textarea").addEventListener("drop", onDropFile, false);
};

window.onbeforeunload = function() {
    saveContent();
};

function cleartextarea () {
    var conf = window.confirm('clear text?');
    if (conf == true) {
        document.getElementById("textarea").innerText = null;
        document.getElementById('textarea').focus();
        document.title = "untitled";
    }
};

function onChangeFile (e) {
    var file = e.target.files[0];
    readFile(file);
};

function onDropFile (e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    readFile(file);
};

function onCancel (e) {
    if(e.preventDefault) { e.preventDefault(); }
    return false;
};

function readFile (file) {
    document.title = file.name;
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("textarea").innerText = e.target.result;
        document.getElementById('textarea').focus();
    };
    reader.readAsText(file);
};

function downloadContent () {
    var filename = document.title;
    var text = document.getElementById("textarea").innerText;
    var blob = new Blob([text], {type: "text/plain"});
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    document.body.appendChild(a); // support firefox
    a.target = '_blank';
    a.download = filename;
    a.click();
};
