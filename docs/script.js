const emoji = document.getElementById('emoji');
const emobg = document.getElementById('box-emoji');
const emocolor = document.getElementById('emocolor');
const bgcolor = document.getElementById('bgcolor');
const reset = document.getElementById('resetBtn')
const rdm = document.getElementById('rdmBtn');
const emoKeycolor = "#e6c81e";
const bgKeycolor = "#8f8f8f"

emocolor.oninput = function () {
    emoji.style.color = this.value;
}

bgcolor.oninput = function () {
    emobg.style.backgroundColor = this.value;
}

const sliders = document.querySelectorAll('.slider');
const sliderValues = document.querySelectorAll('.value')
const emotions = [sliders];


for (let i = 0; i < sliders.length; i++) {
    sliderValues[i].innerHTML = sliders[i].value;
}

sliders.forEach(function (slider) {
    const sliderIndex = slider.getAttribute("data-index");
    const output = document.querySelector(`.value[data-index="${sliderIndex}"]`);
    slider.oninput = function () {
        emoji.style.setProperty(`--${this.id}`, this.value);
        output.innerHTML = this.value * 2 / 100;
    };
});


let url = new URL(window.location);


// ロード時にパラメーターを読み込む
function loadParam() {
    const urlParam = url.searchParams
    // 色の設定
    if (urlParam.has(`em`)) {
        let emValue = urlParam.get(`em`);
        let bgValue = urlParam.get(`bg`);
        let emcValue = decodeURIComponent(emValue);
        let bgcValue = decodeURIComponent(bgValue);
        emoji.style.color = emcValue;
        emobg.style.backgroundColor = bgcValue;
        emocolor.value = emcValue;
        bgcolor.value = bgcValue;
    }
    if (urlParam.has(`joy`)) {
        sliders.forEach(function (emotion) {
            const sliderIndex = emotion.getAttribute("data-index");
            const output = document.querySelector(`.value[data-index="${sliderIndex}"]`);
            let emoVal = urlParam.get(emotion.id);
            emoji.style.setProperty(`--${emotion.id}`, emoVal);
            output.innerHTML = emoVal * 2 / 100;
            emotion.value = emoVal;
        })
    }
}

window.onload = loadParam();

function rdmColor() {
    let r = ('0' + Math.floor(Math.random() * 255).toString(16)).slice(-2);
    let g = ('0' + Math.floor(Math.random() * 255).toString(16)).slice(-2);
    let b = ('0' + Math.floor(Math.random() * 255).toString(16)).slice(-2);
    let color = '#' + r + g + b;
    return color;
}

rdm.onclick = function () {
    let rdmemColor = rdmColor();
    let rdmbgColor = rdmColor();
    emoji.style.color = rdmemColor;
    emobg.style.backgroundColor = rdmbgColor;
    emocolor.value = rdmemColor;
    bgcolor.value = rdmbgColor;

    sliders.forEach(function (emotion) {
        const sliderIndex = emotion.getAttribute("data-index");
        const output = document.querySelector(`.value[data-index="${sliderIndex}"]`);
        let rdmValue = 40 * Math.floor(10 * Math.random()) + 10 * Math.floor(10 * Math.random());
        emoji.style.setProperty(`--${emotion.id}`, rdmValue);
        output.innerHTML = rdmValue * 2 / 100;
        emotion.value = rdmValue;
    })
}

reset.onclick = function () {
    resetParam();
    emoji.style.color = emoKeycolor;
    emobg.style.backgroundColor = bgKeycolor;
    emocolor.value = emoKeycolor
    bgcolor.value = bgKeycolor;
    sliders.forEach(function (emotion) {
        const sliderIndex = emotion.getAttribute("data-index");
        const output = document.querySelector(`.value[data-index="${sliderIndex}"]`);
        emoji.style.setProperty(`--${emotion.id}`, 0);
        output.innerHTML = 0;
        emotion.value = 0;
    })
}

// パラメーターのリセット
function resetParam() {
    sliders.forEach(function (emotion) {
        url.searchParams.delete(emotion.id);
    })
    url.searchParams.delete("em");
    url.searchParams.delete("bg");
    return url.href
}


// シェアボタンの処理
function shareClick() {
    resetParam();
    for (let i = 0; i < sliders.length; i++) {
        let sliderId = sliders[i].id;
        let sliderValue = sliders[i].value;
        url.searchParams.append(sliderId, sliderValue);
    }
    let ecValue = emocolor.value;
    let bgValue = bgcolor.value;
    url.searchParams.append("em", ecValue);
    url.searchParams.append("bg", bgValue);
    return url.href;
}

const twBtn = document.getElementById('twitter');
const fbBtn = document.getElementById('facebook');
const liBtn = document.getElementById('line');


twBtn.onclick = function () {
    var shareURL = shareClick();
    var twHref = 'https://twitter.com/share?text=' + encodeURIComponent("いまの表情\n") + '&url=' + encodeURIComponent(shareURL) + '&hashtags=' + encodeURIComponent("variemoji");
    this.href = twHref;
}

fbBtn.onclick = function () {
    var shareURL = shareClick();
    var fbHref = 'http://www.facebook.com/share.php?u=' + encodeURIComponent(shareURL);
    this.href = fbHref;
}

liBtn.onclick = function () {
    var shareURL = shareClick();
    var liHref = 'https://line.me/R/msg/text/?' + encodeURIComponent("いまの表情") + ' ' + encodeURIComponent(shareURL);;
    this.href = liHref;
}