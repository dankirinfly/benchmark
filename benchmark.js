var exectime = 0;
var xmlDoc;
var index;
var checkRepeat;
var result;


function primInit() {
    index = 0;
    checkRepeat = new Array(4);
    result = new Array(5);
    var nodeContent = xmlDoc.getElementsByTagName("content");
    var nodeFirst = xmlDoc.getElementsByTagName("first");
    var nodeSecond = xmlDoc.getElementsByTagName("second");
    var nodeThird = xmlDoc.getElementsByTagName("third");
    var content = document.getElementById("content");  
    var a = document.getElementById("a");
    var b = document.getElementById("b");
    var c = document.getElementById("c");
    content.innerHTML = nodeContent[0].innerHTML;
    a.innerHTML = nodeFirst[0].innerHTML;
    b.innerHTML = nodeSecond[0].innerHTML;
    c.innerHTML = nodeThird[0].innerHTML; 
}
function primLoadNext() {
    primrecordResult();
    var nodeContent = xmlDoc.getElementsByTagName("content");
    var nodeFirst = xmlDoc.getElementsByTagName("first");
    var nodeSecond = xmlDoc.getElementsByTagName("second");
    var nodeThird = xmlDoc.getElementsByTagName("third");
    var content = document.getElementById("content");  
    var a = document.getElementById("a");
    var b = document.getElementById("b");
    var c = document.getElementById("c");
    content.innerHTML = nodeContent[0].innerHTML;
    a.innerHTML = nodeFirst[0].innerHTML;
    b.innerHTML = nodeSecond[0].innerHTML;
    c.innerHTML = nodeThird[0].innerHTML; 
}
function primrecordResult() {
    var radios = document.getElementsByName("s");
    for(var i = 0;i < radios.length;i++) {
        if(radios[i].checked)
            result[index] = radios[i].value;
    }
    index++;
}
function primoutputResult() {
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
}
function getxmlDoc(url) {
    var request = new XMLHttpRequest();
    request.open("GET",url,false);
    request.send();
    return request.responseXML;
}

function oldPro() {
    var start = (new Date()).getTime();

    primInit();                                                                            
    while(index != 5) {
        primLoadNext();  
    }
    primoutputResult();
    var end = (new Date()).getTime();
    exectime += end - start;                                                           
}

function init() {
    index = 0;
    checkRepeat = new Array(4);
    result = new Array(5);
    var nodeContent = xmlDoc.getElementsByTagName("content");
    var nodeFirst = xmlDoc.getElementsByTagName("first");
    var nodeSecond = xmlDoc.getElementsByTagName("second");
    var nodeThird = xmlDoc.getElementsByTagName("third");
    var content = document.getElementById("content");
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
    content.innerHTML = nodeContent[0].innerHTML;
    a.innerHTML = nodeFirst[0].innerHTML;
    b.innerHTML = nodeSecond[0].innerHTML;
    c.innerHTML = nodeThird[0].innerHTML;
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
    yield END;
}

function transCharacterTest() {     var start = (new Date()).getTime()                             /*変換後*/
    var g = init();
    var result = 0;
    while(!result) {
        try {
            result = g.next();
            yield;
        } catch(e) {
            
        }
    }
    while(index != 5) {
        var g = loadNext();
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
    var end = (new Date()).getTime();
    exectime += end - start;  
    yield END;
}
function generatorPro() {
        TaskChain.addTask(new Task(transCharacterTest()));
        scheduler.setTaskChain(TaskChain);
        scheduler.switchTask();
}

function averagetime(funcname) {
    exectime = 0;
    xmlDoc = getxmlDoc('file/question.xml');
    var start = (new Date()).getTime();
    for(var i = 0;i < 1000;i++) {
        funcname();
    }
    var end = (new Date()).getTime();
    console.log(parseFloat(exectime/1000).toFixed(4));
}


averagetime(oldPro);
averagetime(generatorPro);
