function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeChar(c, i) {
    return `<img src="shorts/${c.toUpperCase()}/${c.toUpperCase()}${i}.png">`;
}
function makeChar2(c, i) {
    return `<img src="character/${c.toLowerCase()}/${c.toUpperCase()}${i}.png" style="transform: rotate(${rand(-1 * typoDeg, typoDeg)}deg) translateX(${rand(-typoLocation, typoLocation)}px);">`;
}
function makeChar4(c, i) {
    return `<img src="character/${c.toLowerCase()}/${c.toUpperCase()}${i}.png" style="transform: rotate(${rand(-1 * typoDeg, typoDeg)}deg) translateX(${rand(-typoLocation, typoLocation)}px) scale(${typoScale / 100});;">`;
}
function makeChar3(c, i) {
    return `<img src="character/${c.toLowerCase()}/${c.toUpperCase()}${i}.png" style="transform: rotate(${rand(-1 * typoDeg, typoDeg)}deg) translateX(${rand(-typoLocation2, typoLocation2)}px) scale(${typoScale / 100});">`;
}

const charCnt = {
    a:161,
    b:53,
    c:88,
    d:54,
    e:141,
    f:58,
    g:51,
    h:54,
    i:112,
    j:8,
    k:44,
    l:96,
    m:51,
    n:128,
    o:109,
    p:33,
    q:1,
    r:108,
    s:159,
    t:104,
    u:65,
    v:28,
    w:30,
    x:8,
    y:26,
    z:12
}

const missingChar = {
    e: new Set([69, 118]),
    m: new Set([34]),
    t: new Set([31])
};

function randCharIndex(c) {
    c = c.toLowerCase();
    let i = rand(1, charCnt[c]);
    while (missingChar[c] && missingChar[c].has(i)) {
        i = rand(1, charCnt[c]);
    }
    return i;
}

var num = 0;
var charList = "abcdefghijklmnopqrstuvwxyz";

var archive_text = document.getElementById("archive-text");
var typo_text = document.getElementById("typo-text");

function makeNav1(node) {
    var archiveChar = [randCharIndex('a'), randCharIndex('r'), randCharIndex('c'), randCharIndex('h'), randCharIndex('i'), randCharIndex('v'), randCharIndex('e')];
    node.innerHTML = "";

    const txt = "archive";
    for(var i = 0; i < txt.length; i ++) {
        node.innerHTML += makeChar4(txt[i], archiveChar[i]);
    }
}
function makeNav2(node) {
    var typoChar = [randCharIndex('t'), randCharIndex('y'), randCharIndex('p'), randCharIndex('o')];
    node.innerHTML = "";

    const txt = "typo";
    for(var i = 0; i < txt.length; i ++) {
        node.innerHTML += `<div>${makeChar3(txt[i], typoChar[i])}<div>`;
    }
}
makeNav1(archive_text);
makeNav2(typo_text);

var typo = document.getElementById("typo");

function insertChar(node, c) {
    for(var j = 1; j <= charCnt[c]; j ++) {
        node.innerHTML += makeChar(c, j);
    }
}

insertChar(typo, charList[0]);
var typoN = 1;
playAlert = setInterval(function() {
    if(typoN < charList.length) {
        insertChar(typo, charList[typoN]);
        typoN ++;
    }
}, 500);

