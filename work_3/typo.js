
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeChar(c, i) {
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
var isRed = false;
var typo = document.getElementById("typo");

function updateTypedSize() {
    const styles = getComputedStyle(typo);
    const pad = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    const available = Math.max(typo.clientWidth - pad, 120);
    const base = window.innerWidth <= 700 ? 117 : 180;
    const gapRatio = 0.08;
    const nextSize = num > 0
        ? Math.min(base, available / (num + Math.max(num - 1, 0) * gapRatio))
        : base;
    typo.style.setProperty("--typed-size", `${Math.max(nextSize, 18)}px`);
}

function focusTypo() {
    typo.focus({ preventScroll: true });
    typo.setAttribute("lang", "en");
}

focusTypo();
document.addEventListener("pointerdown", focusTypo);
document.addEventListener("click", focusTypo);

document.addEventListener("keydown", e => {
    if (e.isComposing || e.key === "Process") {
        e.preventDefault();
        typo.textContent = "";
        return;
    }
    if(charList.includes(e.key.toLowerCase())) {
        e.preventDefault();
        var img = makeChar(e.key, randCharIndex(e.key))
        typo.innerHTML += `<div>${img}</div>`;
        num += 1;
        updateTypedSize();
    } else {
        if(e.key == "Backspace" && num > 0) {
            e.preventDefault();
            var node = typo.lastChild;
            typo.removeChild(node);
            num -= 1;
            updateTypedSize();
        }
    }
});

typo.addEventListener("beforeinput", e => {
    e.preventDefault();
});

typo.addEventListener("compositionstart", e => {
    e.preventDefault();
    typo.blur();
    focusTypo();
});

typo.addEventListener("compositionupdate", e => {
    e.preventDefault();
    typo.textContent = "";
});

typo.addEventListener("compositionend", e => {
    e.preventDefault();
    typo.textContent = "";
});

typo.addEventListener("input", () => {
    Array.from(typo.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.remove();
    });
});

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

var resetBtn = document.getElementById("resetBtn");
resetBtn.onclick = function() {
    typo.innerHTML = ``;
    num = 0;
    updateTypedSize();
    if(isRed) {
        document.getElementById("nav").style.backgroundColor = "#161255";
        document.getElementById("footer").style.backgroundColor = "#161255";
        resetBtn.style.backgroundColor = "#b70216";
        isRed = false;
    } else {
        document.getElementById("nav").style.backgroundColor = "#b70216";
        document.getElementById("footer").style.backgroundColor = "#b70216";
        resetBtn.style.backgroundColor = "#161255";
        isRed = true;
    }
    makeNav1(archive_text);
    makeNav2(typo_text);
}

window.addEventListener("resize", updateTypedSize);
updateTypedSize();
