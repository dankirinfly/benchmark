function tak(x,y,z){
var tmp1,tmp2,tmp3,tmp4;
if(x <= y) return z;
tmp1 = tak(x-1,y,z);j++;
tmp2 = tak(y-1,z,x);j++;
tmp3 = tak(z-1,x,y);j++;
tmp4 = tak(tmp1,tmp2,tmp3);j++;
return tmp4;

}

var index = 0;

function Ytak(x,y,z){
var tmp1,tmp2,tmp3,tmp4;
if(x <= y) {yield z;}
 var g = Ytak(x-1,y,z);
 while(!tmp1) {
        try {
            tmp1 = g.next();
            yield;
        } catch(e) {       
        }
    }
var g = Ytak(y-1,z,x);
 while(!tmp2) {
        try {
            tmp2 = g.next();
            yield;
        } catch(e) {       
        }
    }
var g = Ytak(z-1,x,y);
 while(!tmp3) {
        try {
            tmp3 = g.next();
            yield;
        } catch(e) {        
        }
    }
var g = Ytak(tmp1,tmp2,tmp3);
 while(!tmp4) {
        try {
            tmp4 = g.next();
            yield;
        } catch(e) {       
        }
    }
yield tmp4;
yield END;
}

var j = 0;
var END = 999;
function Ymain() {
console.time("a");
var g = Ytak(9,6,3);
var ans;
 while(!ans) {
        try {
            ans = g.next();
        } catch(e) {
            break;
        }
    }
console.timeEnd("a");
}

function main() {
console.time("a");

var ans = tak(24,16,8);

console.timeEnd("a");

document.body.innerHTML =  "  " + j;
j = 0;

}


function cpstak(x, y, z) {
function trampoline(fun) {
try {
while (true) {
fun = fun();
}
} catch (e) {
return e;
}
}

function tak(x, y, z, k) {
if (! (y < x)) {
return function () { return k(z)};
} else {
return function() {
return tak(x - 1, y, z,
function(v1) {
return tak(y - 1, z, x,
function(v2) {
return tak(z - 1, x, y,
function(v3) {
return tak(v1, v2, v3, k);
})
})
})};
}
}
return trampoline(function() { return tak(x, y, z, function(x) {
throw x; })});
}

function doIt() {
var ans;
ans = cpstak(18,12,6);
return ans;
}

function Cmain(){
console.time("a");
try {
cpstak(12,8,4, function(result){
document.body.innerHTML += result;
});
}catch(e){
alert(e);
}
console.timeEnd("a");
}

function test() {
console.time("a");
  for(var i = 0;i < 1;i++)
    main();
console.timeEnd("a");
}
