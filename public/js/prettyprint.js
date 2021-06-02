var ugly = document.getElementById('textarea').value;
var obj = JSON.parse(ugly);
var pretty = JSON.stringify(obj, undefined, 2);
document.getElementById('textarea').value = pretty;
