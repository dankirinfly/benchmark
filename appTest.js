var xmlDoc;
var index;
var checkRepeat;
var result;
function init() {
    index = 0;
    checkRepeat = new Array(4);
    result = new Array(5);
    xmlDoc = getxmlDoc('file/question.xml');
    var nodeContent = xmlDoc.getElementsByTagName("content");
    var nodeFirst = xmlDoc.getElementsByTagName("first");
    var nodeSecond = xmlDoc.getElementsByTagName("second");
    var nodeThird = xmlDoc.getElementsByTagName("third");
    var content = document.getElementById("content");
    var selector = document.getElementById("selector");
    var start = document.getElementById("start");
    var next = document.getElementById("next");
    var a = document.getElementById("a");
    var b = document.getElementById("b");
    var c = document.getElementById("c");
    selector.style.display = "block";
    start.style.display = "none";
    next.style.display = "block";
    content.innerHTML = nodeContent[0].innerHTML;
    a.innerHTML = nodeFirst[0].innerHTML;
    b.innerHTML = nodeSecond[0].innerHTML;
    c.innerHTML = nodeThird[0].innerHTML;    
}
function loadNext() {
    recordResult();
    if(!IsEnd()) {
        var nodeContent = xmlDoc.getElementsByTagName("content");
        var nodeFirst = xmlDoc.getElementsByTagName("first");
        var nodeSecond = xmlDoc.getElementsByTagName("second");
        var nodeThird = xmlDoc.getElementsByTagName("third");
        var content = document.getElementById("content");
        var a = document.getElementById("a");
        var b = document.getElementById("b");
        var c = document.getElementById("c");
        var ran = preventRepeat();
        content.innerHTML = nodeContent[ran].innerHTML;
        a.innerHTML = nodeFirst[ran].innerHTML;
        b.innerHTML = nodeSecond[ran].innerHTML;
        c.innerHTML = nodeThird[ran].innerHTML;
    }
}
function preventRepeat() {
    var ran = parseInt(Math.random()*8) + 1;
    for(var i = 0;i < checkRepeat.length;i++) {
        if(ran == checkRepeat[i])
            return preventRepeat();
    }
    checkRepeat.push(ran);
    return ran;
}
function recordResult() {
    var radios = document.getElementsByName("s");
    for(var i = 0;i < radios.length;i++) {
        if(radios[i].checked)
            result[index] = radios[i].value;
    }
    index++;
}
function IsEnd() {
    if(index == 5) {
        var sum = 0;
        for(var i = 0;i < result.length;i++) {
            if(result[i] == "a")
                sum++;
        }
        var content = document.getElementById("content");
        if(sum >= 3) 
            content.innerHTML = "あなたの性格はいい";
        else
            content.innerHTML = "あなたの性格は悪い";
        var next = document.getElementById("next");
        var selector = document.getElementById("selector");
        var restart = document.getElementById("restart");
        restart.style.display = "block";
        next.style.display = "none";
        selector.style.display = "none";
        return 1;
    }
    else 
        return 0;
    
}
function Restart() {
    index = null;
    checkRepeat = null;
    result = null;
    xmlDoc = null;
    var selector = document.getElementById("selector");
    var start = document.getElementById("start");
    var next = document.getElementById("next");
    var re = document.getElementById("restart");
    re.style.display = "none";
    selector.style.display = "none";
    start.style.display = "block";
    next.style.display = "none";
}
function getxmlDoc(url) {
    var request = new XMLHttpRequest();
    request.open("GET",url,false);
    request.send();
    return request.responseXML;
}
function primCharacterTest() {
    init();                                                     
    var doc = sendServer("question.xml");                         
    while(index != 5) {
        var generator = waitforEvent("next","onclick",loadNext);  
    }
                                                               
}
