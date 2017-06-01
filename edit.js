// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
} else {
    alert('The File APIs are not fully supported in this browser.');
};

var storage = localStorage;
document.title = "SimpleEdit(js)";

function saveContent() {
    var textContent = document.getElementById("textarea");
    var key = "saveeditor";
    var value = textContent.innerText;
    storage.setItem(key, value);
    document.getElementById('textarea').focus();
};

function loadContent() {
    var loaded = storage.getItem("saveeditor");
    document.getElementById("textarea").innerText = loaded;
    document.getElementById('textarea').focus();
};

function cleartextarea() {
    document.getElementById("textarea").innerText = "";
    document.getElementById('textarea').focus();
};

window.onload = function() {
    loadContent();
    document.getElementById("textarea").addEventListener("dragover", onCancel, false);
    document.getElementById("textarea").addEventListener("dragenter", onCancel, false);
    document.getElementById("textarea").addEventListener("drop", onDropFile, false);
};

window.onbeforeunload = function() {
    saveContent();
};

var onDropFile = function(e) {
    e.preventDefault();
    // File オブジェクトを取得
    var file = e.dataTransfer.files[0];
    // ファイル読み込み
    readFile(file);
};

var onCancel = function(e) {
    if(e.preventDefault) { e.preventDefault(); }
    return false;
};

var readFile = function(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("textarea").innerText = e.target.result;
        document.getElementById('textarea').focus();
    };
    reader.readAsText(file);
};
