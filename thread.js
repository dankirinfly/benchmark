var READY = 1;
var WAITING = 0;
var DONE = 2;
var END = {"content": "finished"};
var current = -1;

function Task(generator) {
  this.continuation = generator;
  this.status = READY;
}
Task.prototype.getContinuation = function() {
    return this.continuation;
  }
Task.prototype.getStatus = function() {
    return this.status;
  }
Task.prototype.setStatus = function(status) {
    this.status = status;
  }
Task.prototype.startTask = function() {
    this.status = READY;
  }
Task.prototype.stopTask = function() {
    this.status = WAITING;
  }
Task.prototype.completeTask = function() {
    this.status = DONE;
  }

var TaskChain = {
    TaskList: new Array(),
    getTaskAt: function(index) {
        return this.TaskList[index];
    },
    addTask: function(task) {
        this.TaskList.push(task);
    },
    getLength: function() {
        return this.TaskList.length;
    },
    removeTask: function(index) {
        this.TaskList.splice(index,1);
    },
    findReadyTask: function() {
        for(var j = (scheduler.getCurrent() + 1) % this.TaskList.length,
    k = scheduler.getCurrent();this.TaskList.length > 0;j = (j + 1) % this.TaskList.length) {
          if(this.TaskList[j].getStatus() == READY) {
            scheduler.setCurrent(j);
            return 1;
          }
          else if(j == k || j == (k + 1) % this.TaskList.length)
            break;
        }
        return null;
    }   
}

var scheduler = {
  TaskChain: null,
  current: -1,
  getTaskChain: function() {
    return this.TaskChain;
  },
  setTaskChain: function(taskArray) {
    this.TaskChain = taskArray;
  },
  getCurrent: function() {
    return this.current;
  },
  setCurrent: function(index) {
    this.current = index;
  },
  switchTask: function() {
    var j = 0,k = 1,result = 0;
    while(scheduler.getTaskChain().getLength() != 0) {
        var isFound = scheduler.getTaskChain().findReadyTask();
        if(isFound) { 
            try {
	            result = scheduler.getTaskChain().getTaskAt(scheduler.getCurrent()).getContinuation().next();
	            if(result) {
                    scheduler.getTaskChain().getTaskAt(scheduler.getCurrent()).completeTask(); 
                    scheduler.getTaskChain().removeTask(scheduler.getCurrent());
                }  
            }
            catch(e) {      
            
            }
        }
        else if(!isFound) {
            break;
        }
    }  
  }
}


function sendServer(url) {  
    var request = new XMLHttpRequest();
    var localcurrent = scheduler.getCurrent();
    var timeout = false;
    var clearTo = setTimeout(function() {
        timeout = true;
    },100);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200)
      {
        clearTimeout(clearTo);      
        scheduler.getTaskChain().getTaskAt(localcurrent).startTask();
        scheduler.switchTask();
      } 
    };
    request.open("GET",url,true);
    request.send();
    scheduler.getTaskChain().getTaskAt(localcurrent).stopTask();
    yield;
    if(!timeout)
        yield request.responseXML;
}


function waitforEvent(id,event,func) {
  var localcurrent = scheduler.getCurrent();
  scheduler.getTaskChain().getTaskAt(localcurrent).stopTask();
  var btn = document.getElementById(id);
  
  var listener = function() {
    btn.removeEventListener(event,listener);
    scheduler.getTaskChain().getTaskAt(localcurrent).startTask();   
    scheduler.switchTask();
  };
  btn.addEventListener(event,listener);
  
  yield;
  var g = func;
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
