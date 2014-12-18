

var xmlDoc;
var index;
var checkRepeat;
var result;
function init() {
    index = 0;
    checkRepeat = new Array(4);
    result = new Array(5);
    var nodeContent = xmlDoc.getElementsByTagName("content");
    var nodeFirst = xmlDoc.getElementsByTagName("first");
    var nodeSecond = xmlDoc.getElementsByTagName("second");
    var nodeThird = xmlDoc.getElementsByTagName("third");
    var content = document.getElementById("content");
    var selector = document.getElementById("selector");
    var start = document.getElementById("start");
    var next = document.getElementById("next");
    selector.style.display = "block";
    start.style.display = "none";
    next.style.display = "block";
    var a = document.getElementById("a");
    var b = document.getElementById("b");
    var c = document.getElementById("c");
    content.innerHTML = nodeContent[0].innerHTML;
    a.innerHTML = nodeFirst[0].innerHTML;
    b.innerHTML = nodeSecond[0].innerHTML;
    c.innerHTML = nodeThird[0].innerHTML;
    yield END;
}
function loadNext() {
    var g = recordResult();
    var result = 0;
    while(!result) {
        try {
             result = g.next();
            yield;
        } catch(e) {
            
        }
    }
    var nodeContent = xmlDoc.getElementsByTagName("content");
    var nodeFirst = xmlDoc.getElementsByTagName("first");
    var nodeSecond = xmlDoc.getElementsByTagName("second");
    var nodeThird = xmlDoc.getElementsByTagName("third");
    var content = document.getElementById("content");
    var a = document.getElementById("a");
    var b = document.getElementById("b");
    var c = document.getElementById("c");
    var ran;
    var g = preventRepeat();
    while(!ran) {
        try {
            ran = g.next();
            yield;
        } catch(e) {
            
        }
    }
    content.innerHTML = nodeContent[ran].innerHTML;
    a.innerHTML = nodeFirst[ran].innerHTML;
    b.innerHTML = nodeSecond[ran].innerHTML;
    c.innerHTML = nodeThird[ran].innerHTML;
    yield END;
}
function preventRepeat() {
    var ran = parseInt(Math.random()*8) + 1;
    for(var i = 0;i < checkRepeat.length;i++) {
        if(ran == checkRepeat[i]) {
            var g = preventRepeat();
            var result = 0;
            while(!result) {
                try {
                    result = g.next();
                    yield result;
                } catch(e) {
                    
                }
            }
        }
    }
    checkRepeat.push(ran);
    yield ran;
    yield END;
}
function recordResult() {
    var radios = document.getElementsByName("s");
    for(var i = 0;i < radios.length;i++) {
        if(radios[i].checked)
            result[index] = radios[i].value;
    }
    index++;
    yield END;
}
function outputResult() {
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
    next.style.display = "none";
    selector.style.display = "none";
    yield END;
}
function primCharacterTest() {                                                    
    var xmlDoc = sendServer("file/question.xml");                         
    waitforEvent("start","click",init());        
    while(index != 5) {
        waitforEvent("next","click",loadNext());    
    }
    outputResult();                                                
}
function transCharacterTest() {                                  /*変換後*/
    var g = sendServer("file/question.xml");
    while(!xmlDoc) {
        try {
            xmlDoc = g.next();
            yield;
        } catch(e) {
            
        }
    }
    var g = waitforEvent("start","click",init());
    var result = 0;
    while(!result) {
        try {
            result = g.next();
            yield;
        } catch(e) {
            
        }
    }
    while(index != 5) {
        var g = waitforEvent("next","click",loadNext());
        var result = 0;
        while(!result) {
            try {
                result = g.next();
                yield;
            } catch(e) {
                
            }
        }
    }
    var g = outputResult();
    var result = 0;
    while(!result) {
        try {
            result = g.next();
            yield;
        } catch(e) {
            
        }
    }
    yield END;
}
TaskChain.addTask(new Task(transCharacterTest()));
scheduler.setTaskChain(TaskChain);
window.onload = scheduler.switchTask();

function ge() {
    var app = document.getElementById("appct");
    app.innerHTML += ".";
    yield;
    app.innerHTML += ".";
    yield;
    app.innerHTML += ".";
    yield;
}

