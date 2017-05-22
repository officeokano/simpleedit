// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
} else {
  alert('The File APIs are not fully supported in this browser.');
}

var storage = localStorage;

document.title = "SimpleEdit(js)";

//Save text to local storage
function saveContent(){
    var textContent = document.getElementById("textarea");
    var key = "saveeditor";
    var value = textContent.innerText;
    storage.setItem(key, value);
}

//load text from local storage
function loadContent(){
    var loaded = storage.getItem("saveeditor");
    document.getElementById("textarea").innerText = loaded;
}

//clear textarea
function cleartextarea(){
        document.getElementById("textarea").innerText = "";
}